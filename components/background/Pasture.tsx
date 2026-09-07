/* eslint-disable react/no-unknown-property */
"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useInView, useReducedMotion } from "framer-motion";
import { COMMON_GLSL, DitherCanvas, ScenePlane } from "./ditherCanvas";

// The light persona's counterpart to the dark hero's fish: a grass field under a cream sky with
// sheep and cows ambling across it. Same Bayer dither pass, but with no darkening bias, so it
// resolves into ink dots on paper rather than lit dots on black — a risograph, not a night dive.
const sceneFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec3 skyColor;
uniform vec3 skyTopColor;
uniform vec3 grassFarColor;
uniform vec3 grassNearColor;
uniform vec3 hideColor;
uniform vec3 markColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float herdCount;
uniform float herdScale;
uniform float walkSpeed;

const int MAX_HERD = 12;
const float HORIZON = -0.08;

${COMMON_GLSL}

// A walking quadruped in local space: hooves on y = 0, nose toward +x, about 1.0 long.
// isCow picks the build. Returns .x = silhouette, .y = the darker markings on it.
vec2 quadruped(vec2 p, float gait, float graze, bool isCow) {
  // Diagonal gait — a foreleg swings with the opposite hind leg.
  float swingA = sin(gait) * 0.085;
  float swingB = sin(gait + PI) * 0.085;
  float legTop = isCow ? 0.29 : 0.22;
  float legR = isCow ? 0.037 : 0.028;

  float legs = sdCapsule(p, vec2(-0.27, legTop), vec2(-0.27 + swingA, 0.0), legR);
  legs = min(legs, sdCapsule(p, vec2(-0.19, legTop), vec2(-0.19 + swingB, 0.0), legR));
  legs = min(legs, sdCapsule(p, vec2(0.15, legTop), vec2(0.15 + swingB, 0.0), legR));
  legs = min(legs, sdCapsule(p, vec2(0.23, legTop), vec2(0.23 + swingA, 0.0), legR));

  float sil;
  float marks;

  if (isCow) {
    // Long boxy barrel on tall legs, head slung forward on a thick neck.
    float bodyY = 0.42;
    float headY = bodyY + 0.05 - graze * 0.34;
    float body = sdRoundBox(p - vec2(-0.02, bodyY), vec2(0.30, 0.145), 0.085);
    float neck = sdCapsule(p, vec2(0.20, bodyY + 0.06), vec2(0.41, headY), 0.072);
    float head = sdRoundBox(p - vec2(0.47, headY - 0.01), vec2(0.085, 0.068), 0.045);
    float ear = sdCapsule(p, vec2(0.41, headY + 0.06), vec2(0.33, headY + 0.10), 0.020);
    float tail = sdCapsule(p, vec2(-0.31, bodyY + 0.07), vec2(-0.365, 0.17), 0.014);
    float tuft = length(p - vec2(-0.368, 0.148)) - 0.032;

    sil = smin(body, neck, 0.06);
    sil = smin(sil, head, 0.03);
    sil = min(sil, min(legs, min(ear, min(tail, tuft))));

    // The patches are what separate a cow from a horse at this size.
    // ("patch" is a reserved word in GLSL ES — hence "spots".)
    float spots = length((p - vec2(-0.17, bodyY + 0.05)) / vec2(1.0, 0.85)) - 0.10;
    spots = smin(spots, length((p - vec2(-0.07, bodyY - 0.03)) / vec2(1.0, 0.9)) - 0.075, 0.05);
    spots = min(spots, length((p - vec2(0.13, bodyY - 0.04)) / vec2(1.2, 1.0)) - 0.075);
    spots = min(spots, length(p - vec2(-0.29, bodyY + 0.02)) - 0.05);
    marks = max(spots, body + 0.012);
    marks = min(marks, length(p - vec2(0.495, headY + 0.02)) - 0.019);
  } else {
    // Fleece is a lumpy ellipse — the bumpy perimeter is the whole read at dot scale — on short
    // legs, with the dark face and stockings sheep actually have.
    float bodyY = 0.36;
    float headY = bodyY + 0.02 - graze * 0.30;
    vec2 q = p - vec2(-0.02, bodyY);
    float ang = atan(q.y, q.x);
    float fleece = length(q / vec2(1.18, 1.0))
      - (0.215 + 0.017 * sin(ang * 7.0) + 0.008 * sin(ang * 12.0 + 1.7));
    float head = length((p - vec2(0.255, headY)) / vec2(1.0, 1.15)) - 0.080;
    float ear = sdCapsule(p, vec2(0.225, headY + 0.05), vec2(0.165, headY + 0.10), 0.019);
    float tail = length(p - vec2(-0.26, bodyY + 0.05)) - 0.045;

    sil = smin(fleece, head, 0.035);
    sil = min(sil, min(legs, min(ear, tail)));
    marks = min(head, max(legs, p.y - 0.13));
  }

  return vec2(sil, marks);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / resolution.y;
  vec2 p = uv - 0.5;
  p.x *= aspect;

  // Sky: cream at the horizon lifting to a pale blue overhead, with slow soft cloud.
  vec3 col = mix(skyColor, skyTopColor, smoothstep(-0.05, 0.5, p.y));
  float cloud = fbm(p * 1.6 + vec2(time * 0.012, 0.0));
  col = mix(col, skyColor, smoothstep(0.3, 0.85, cloud) * smoothstep(0.02, 0.4, p.y) * 0.45);

  // Rolling horizon — a ruler-straight one reads as a chart axis, not a field.
  float hill = HORIZON + 0.028 * sin(p.x * 1.7) + 0.018 * sin(p.x * 3.1 + 1.0);
  float onGrass = smoothstep(hill + 0.004, hill - 0.004, p.y);

  // Ground recedes: paler and flatter toward the horizon, richer underfoot.
  float near = clamp((hill - p.y) / 0.46, 0.0, 1.0);
  vec3 grass = mix(grassFarColor, grassNearColor, near);
  // Blade stipple — high frequency across, low along, so it streaks vertically like grass.
  float blades = fbm(vec2(p.x * 130.0, p.y * 16.0) + vec2(time * 0.01, 0.0));
  grass += (blades - 0.5) * 0.22 * near;
  col = mix(col, grass, onGrass);

  vec2 mouse = vec2(0.0);
  if (enableMouseInteraction == 1) {
    mouse = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouse.x *= aspect;
  }

  for (int i = 0; i < MAX_HERD; i++) {
    if (float(i) >= herdCount) break;
    float fi = float(i);
    float r1 = hash11(fi + 0.37);
    float r2 = hash11(fi + 11.13);
    float r3 = hash11(fi + 27.71);
    float r4 = hash11(fi + 51.29);

    // On a ground plane depth *is* the vertical position, so one stratified value drives distance,
    // size and standing height together — and since it climbs with the loop index, paint order
    // doubles as depth sorting with no extra work.
    float t = mix(0.3, 1.0, (fi + 0.5) / herdCount);
    float feetY = mix(HORIZON - 0.10, -0.46, t);
    float scale = herdScale * mix(0.42, 1.0, t);
    bool isCow = mod(fi, 2.0) > 0.5;

    float dir = r1 < 0.5 ? -1.0 : 1.0;
    float vel = walkSpeed * mix(0.8, 1.25, r3) * (isCow ? 0.85 : 1.0);
    float span = aspect + scale * 2.4;
    float phase = (fi + r4) / herdCount;
    float fx = mod(phase * span + time * vel * dir, span) - span * 0.5;

    // A slow head-down spell, so the herd is grazing rather than marching.
    float graze = smoothstep(0.55, 0.95, sin(time * 0.13 + r2 * 6.283));

    // They shy away from the pointer along the ground — sideways only, since they are standing
    // on it rather than swimming through it.
    if (enableMouseInteraction == 1) {
      float dx = fx - mouse.x;
      float prox = 1.0 - smoothstep(0.0, mouseRadius, length(vec2(dx, feetY - mouse.y)));
      fx += (dx < 0.0 ? -1.0 : 1.0) * prox * mouseRadius * 0.35;
    }

    // The gait bobs the body a little; feet stay planted on the ground line.
    float gait = time * mix(7.0, 9.0, r3) * (1.0 - graze * 0.75) + r1 * 6.283;
    vec2 lp = (p - vec2(fx, feetY)) / scale;
    lp.x *= dir;
    lp.y -= abs(sin(gait)) * 0.02;

    // Bounding-box reject before the full SDF. The animals cover a small share of the frame, so
    // most tiles of pixels skip the whole body of work coherently.
    if (abs(lp.x) > 0.8 || lp.y < -0.25 || lp.y > 0.9) continue;

    // Contact shadow on the grass, before the animal itself.
    float shadow = length((lp - vec2(0.02, 0.0)) / vec2(0.44, 0.06)) - 1.0;
    col = mix(col, col * 0.84, (1.0 - smoothstep(-0.2, 0.5, shadow)) * 0.8 * onGrass);

    vec2 d = quadruped(lp, gait, graze, isCow);

    float e = 0.035;
    float mask = 1.0 - smoothstep(-e, e, d.x);
    // Underside shading, so a body half-tones into dots instead of flat-filling the top step.
    float lit = mix(0.86, 1.05, smoothstep(0.0, 0.55, lp.y));
    // Far animals sit back into the haze of the field.
    vec3 hide = mix(mix(grassFarColor, hideColor, 0.72), hideColor, t) * lit;
    col = mix(col, hide, mask);
    col = mix(col, markColor, (1.0 - smoothstep(-e, e, d.y)) * mask);
    // Contour. A cream hide on a pale field has almost no edge of its own — this is what makes
    // the animal read as a drawn figure, and the dither breaks it into a dotted line.
    float outline = 1.0 - smoothstep(0.010, 0.042, abs(d.x));
    col = mix(col, markColor, outline * 0.55);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

type RGB = [number, number, number];

// These colours are authored as sRGB — they come straight off the light-persona hex tokens — but
// three treats a bare Color as already being in the working (linear) space and the renderer then
// applies its own linear-to-sRGB step on output. Without this conversion every value lands a full
// gamma step too bright and the field washes out to near-paper.
const srgb = ([r, g, b]: RGB) => new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace);

interface SceneUniforms {
  [key: string]: THREE.Uniform<any>;
}

interface SceneProps {
  skyColor: RGB;
  skyTopColor: RGB;
  grassFarColor: RGB;
  grassNearColor: RGB;
  hideColor: RGB;
  markColor: RGB;
  walkSpeed: number;
  paused: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function PastureScene({
  skyColor,
  skyTopColor,
  grassFarColor,
  grassNearColor,
  hideColor,
  markColor,
  walkSpeed,
  paused,
  enableMouseInteraction,
  mouseRadius,
}: SceneProps) {
  const { size, gl } = useThree();
  const mouseTarget = useRef(new THREE.Vector2());
  const hasPointer = useRef(false);

  // Four in the wrap cycle — alternating sheep and cow — which puts two or three on screen at a
  // time. They are proportionally smaller on a phone: at desktop scale a near cow would span most
  // of a 390px frame.
  const isCompact = size.width < 640;
  const herdCount = 4;
  const herdScale = isCompact ? 0.19 : 0.26;

  const uniforms = useRef<SceneUniforms>({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
    skyColor: new THREE.Uniform(srgb(skyColor)),
    skyTopColor: new THREE.Uniform(srgb(skyTopColor)),
    grassFarColor: new THREE.Uniform(srgb(grassFarColor)),
    grassNearColor: new THREE.Uniform(srgb(grassNearColor)),
    hideColor: new THREE.Uniform(srgb(hideColor)),
    markColor: new THREE.Uniform(srgb(markColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius),
    herdCount: new THREE.Uniform(herdCount),
    herdScale: new THREE.Uniform(herdScale),
    walkSpeed: new THREE.Uniform(walkSpeed),
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const width = Math.floor(size.width * dpr);
    const height = Math.floor(size.height * dpr);
    const res = uniforms.current.resolution.value;
    if (res.x !== width || res.y !== height) res.set(width, height);
    // Park the pointer off-frame until it actually moves, so the herd is not permanently shying
    // away from the top-left corner on load or on a touch device.
    if (!hasPointer.current) {
      mouseTarget.current.set(width * 0.5, height * 2.0);
      uniforms.current.mousePos.value.copy(mouseTarget.current);
    }
  }, [size, gl]);

  useFrame((_, delta) => {
    const u = uniforms.current;

    if (!paused) u.time.value += delta;

    u.skyColor.value.setRGB(...skyColor, THREE.SRGBColorSpace);
    u.skyTopColor.value.setRGB(...skyTopColor, THREE.SRGBColorSpace);
    u.grassFarColor.value.setRGB(...grassFarColor, THREE.SRGBColorSpace);
    u.grassNearColor.value.setRGB(...grassNearColor, THREE.SRGBColorSpace);
    u.hideColor.value.setRGB(...hideColor, THREE.SRGBColorSpace);
    u.markColor.value.setRGB(...markColor, THREE.SRGBColorSpace);
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;
    u.herdCount.value = herdCount;
    u.herdScale.value = herdScale;
    u.walkSpeed.value = walkSpeed;

    u.mousePos.value.lerp(mouseTarget.current, Math.min(1, delta * 4));
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!enableMouseInteraction) return;
    const rect = gl.domElement.getBoundingClientRect();
    const dpr = gl.getPixelRatio();
    hasPointer.current = true;
    mouseTarget.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
  };

  return (
    <ScenePlane
      fragmentShader={sceneFragmentShader}
      uniforms={uniforms.current}
      onPointerMove={handlePointerMove}
    />
  );
}

interface PastureProps {
  skyColor?: RGB;
  skyTopColor?: RGB;
  grassFarColor?: RGB;
  grassNearColor?: RGB;
  hideColor?: RGB;
  markColor?: RGB;
  walkSpeed?: number;
  colorNum?: number;
  pixelSize?: number;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export function Pasture({
  // #FDFBF7 gallery white, #C7E4FF sky, #D3EEC8 pistachio, a deeper grass green,
  // #FDFBF7 hides and #2A2438 ink markings.
  skyColor = [0.992, 0.984, 0.969],
  skyTopColor = [0.78, 0.894, 1.0],
  grassFarColor = [0.827, 0.933, 0.784],
  grassNearColor = [0.435, 0.647, 0.325],
  hideColor = [0.992, 0.984, 0.969],
  markColor = [0.165, 0.141, 0.22],
  walkSpeed = 0.035,
  // Fewer levels and a chunkier block than the dark scene: cream values sit near the top of
  // the ramp, where 8 levels produce almost no visible dot pattern at all.
  colorNum = 6,
  pixelSize = 3,
  enableMouseInteraction = true,
  mouseRadius = 0.22,
}: PastureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const reducedMotion = useReducedMotion();
  const paused = !isInView || !!reducedMotion;

  const dpr = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? 0.75 : 1),
    []
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <DitherCanvas
        colorNum={colorNum}
        pixelSize={pixelSize}
        // No darkening bias here — the dark scene needs it to keep its dim end from muddying,
        // but on cream it would crush the whole light half of the palette to grey.
        ditherBias={0}
        dpr={dpr}
        paused={paused}
      >
        <PastureScene
          skyColor={skyColor}
          skyTopColor={skyTopColor}
          grassFarColor={grassFarColor}
          grassNearColor={grassNearColor}
          hideColor={hideColor}
          markColor={markColor}
          walkSpeed={walkSpeed}
          paused={paused}
          enableMouseInteraction={enableMouseInteraction && !reducedMotion}
          mouseRadius={mouseRadius}
        />
      </DitherCanvas>
    </div>
  );
}
