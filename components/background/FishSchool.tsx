/* eslint-disable react/no-unknown-property */
"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useInView, useReducedMotion } from "framer-motion";
import { COMMON_GLSL, DitherCanvas, ScenePlane } from "./ditherCanvas";

// Underwater scene: a murky water column with light falling from the surface, and a school of
// fish swimming across it. Everything is drawn as smooth gradients here — the Bayer dither pass
// downstream is what turns the whole frame into dots, so the fish end up made of dots too.
const sceneFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec3 waterColor;
uniform vec3 baseColor;
uniform vec3 fishColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float fishCount;
uniform float fishScale;
uniform float swimSpeed;

const int MAX_FISH = 20;

${COMMON_GLSL}

// Fish silhouette in local space — nose at +x, roughly 1.0 long and 0.35 tall.
// Returns .x = distance to the body + caudal fin, .y = distance to the eye.
vec2 fishShape(vec2 p, float beat) {
  // The spine undulates, with the sway growing from nothing at the nose to full at the tail.
  float taper = 1.0 - smoothstep(-0.45, 0.5, p.x);
  float sway = sin(p.x * 7.5 - beat) * 0.05 * taper;
  float dy = p.y - sway;

  // Thickness profile: zero at the nose, widest about a third of the way back, zero again at
  // the peduncle where the tail fin takes over.
  float u = clamp((0.5 - p.x) / 0.92, 0.0, 1.0);
  float r = 0.155 * sin(pow(u, 0.62) * PI);
  float body = abs(dy) - r;
  body = max(body, p.x - 0.5);
  body = max(body, -0.42 - p.x);

  // Caudal fin — a wedge hinged at the peduncle, swinging a quarter-beat behind the body.
  float tipY = sin(-0.42 * 7.5 - beat) * 0.05;
  float hinge = cos(-0.42 * 7.5 - beat) * 0.45;
  vec2 q = rot(hinge) * (p - vec2(-0.42, tipY));
  float fin = abs(q.y) - (0.015 - q.x * 0.62);
  fin = max(fin, -q.x - 0.22);
  fin = max(fin, q.x - 0.01);

  float eye = length((p - vec2(0.3, 0.05)) * vec2(1.0, 1.15)) - 0.032;
  return vec2(min(body, fin), eye);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / resolution.y;
  vec2 p = uv - 0.5;
  p.x *= aspect;

  // Water column — brighter toward the surface, with a slow drifting murk.
  float surface = pow(clamp(uv.y, 0.0, 1.0), 1.3);
  float murk = fbm(p * 2.1 + vec2(time * 0.015, time * 0.008));
  // The dither pass subtracts a 0.2 bias before quantizing, so anything dimmer than that lands on
  // pure black — the murk has to carry real range or the frame reads as an empty void with a lit
  // strip along the top.
  vec3 col = mix(baseColor, waterColor, 0.06 + surface * 0.12 + murk * 0.72);

  // Light shafts drifting down from the surface.
  float rx = p.x * 2.3 + sin(time * 0.05) * 0.4;
  float rays = pow(max(sin(rx), 0.0), 14.0) + pow(max(sin(rx * 0.63 + 2.1), 0.0), 20.0);
  col += waterColor * rays * smoothstep(-0.4, 0.5, p.y) * 0.11;

  vec2 mouse = vec2(0.0);
  if (enableMouseInteraction == 1) {
    mouse = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouse.x *= aspect;
  }

  for (int i = 0; i < MAX_FISH; i++) {
    if (float(i) >= fishCount) break;
    float fi = float(i);
    float r1 = hash11(fi + 0.37);
    float r2 = hash11(fi + 11.13);
    float r3 = hash11(fi + 27.71);
    float r4 = hash11(fi + 51.29);
    float r5 = hash11(fi + 73.91);

    // Depth comes from the loop index, not a hash, so later fish are always the nearer ones —
    // that makes the paint order double as depth sorting.
    float depth = mix(0.55, 1.0, (fi + 0.5) / fishCount);
    float dir = r1 < 0.5 ? -1.0 : 1.0;
    float size = fishScale * depth;
    float vel = swimSpeed * depth * mix(0.75, 1.3, r3);
    float span = aspect + size * 2.4;

    // Both axes are stratified rather than left to the hashes. At a handful of fish raw hashes
    // clump — three of them can land in the same half of the frame, or two can start on top of
    // each other — which is invisible in a crowd and glaring when the school is this small.
    // Each fish gets its own horizontal band and its own slice of the wrap cycle, jittered inside
    // the slice — jitter across the whole cycle would swamp the stagger and let slices overlap.
    // The band index is the loop index folded into a permutation (0,2,4,..,5,3,1) so that the
    // depth ordering above does not also stack the near fish along the bottom of the frame.
    float band = fi * 2.0 < fishCount ? fi * 2.0 : (fishCount - 1.0 - fi) * 2.0 + 1.0;
    float lane = (band + 0.15 + r5 * 0.7) / fishCount;
    float phase = (fi + r4) / fishCount;

    float x = mod(phase * span + time * vel * dir, span) - span * 0.5;
    float bobRate = mix(0.3, 0.7, r3);
    float bobPhase = r1 * 6.283;
    float y = (lane - 0.5) * 0.88 + sin(time * bobRate + bobPhase) * 0.045;
    vec2 fp = vec2(x, y);

    // The school parts around the pointer.
    if (enableMouseInteraction == 1) {
      vec2 away = fp - mouse;
      float dist = length(away);
      float push = (1.0 - smoothstep(0.0, mouseRadius, dist)) * mouseRadius * 0.55;
      fp += normalize(away + vec2(0.0001)) * push;
    }

    // Nose tips up or down with the bob, so a fish never looks like it is sliding sideways.
    float tilt = cos(time * bobRate + bobPhase) * bobRate * 0.14 * dir;
    vec2 lp = rot(-tilt) * (p - fp) / size;
    lp.x *= dir;

    vec2 d = fishShape(lp, time * mix(5.0, 7.5, r3) + r2 * 6.283);

    float mask = 1.0 - smoothstep(-0.045, 0.045, d.x);
    // Countershading — dark back, pale belly — so the body half-tones into dots instead of
    // flat-filling into a blob.
    float shade = mix(0.62, 1.12, 1.0 - smoothstep(-0.16, 0.16, lp.y));
    vec3 fc = fishColor * shade * mix(0.5, 1.0, depth);
    col = mix(col, fc, mask);
    col = mix(col, baseColor, (1.0 - smoothstep(0.0, 0.02, d.y)) * mask);
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

interface SceneUniforms {
  [key: string]: THREE.Uniform<any>;
  time: THREE.Uniform<number>;
  resolution: THREE.Uniform<THREE.Vector2>;
  waterColor: THREE.Uniform<THREE.Color>;
  baseColor: THREE.Uniform<THREE.Color>;
  fishColor: THREE.Uniform<THREE.Color>;
  mousePos: THREE.Uniform<THREE.Vector2>;
  enableMouseInteraction: THREE.Uniform<number>;
  mouseRadius: THREE.Uniform<number>;
  fishCount: THREE.Uniform<number>;
  fishScale: THREE.Uniform<number>;
  swimSpeed: THREE.Uniform<number>;
}

interface SceneProps {
  waterColor: [number, number, number];
  baseColor: [number, number, number];
  fishColor: [number, number, number];
  swimSpeed: number;
  paused: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function FishScene({
  waterColor,
  baseColor,
  fishColor,
  swimSpeed,
  paused,
  enableMouseInteraction,
  mouseRadius,
}: SceneProps) {
  const { size, gl } = useThree();
  const mouseTarget = useRef(new THREE.Vector2());
  const hasPointer = useRef(false);

  // Four fish in the wrap cycle, not four on screen: the cycle is a viewport wide plus a fish
  // length of run-off at each edge, so a phone (where that run-off is a big share of a narrow
  // frame) usually shows two or three, and a desktop three or four. Each one is proportionally
  // larger on a phone to stay recognisable once the dither pass chunks it into dots.
  const isCompact = size.width < 640;
  const fishCount = 4;
  const fishScale = isCompact ? 0.16 : 0.15;

  const uniforms = useRef<SceneUniforms>({
    time: new THREE.Uniform(0),
    resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
    waterColor: new THREE.Uniform(new THREE.Color(...waterColor)),
    baseColor: new THREE.Uniform(new THREE.Color(...baseColor)),
    fishColor: new THREE.Uniform(new THREE.Color(...fishColor)),
    mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
    enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
    mouseRadius: new THREE.Uniform(mouseRadius),
    fishCount: new THREE.Uniform(fishCount),
    fishScale: new THREE.Uniform(fishScale),
    swimSpeed: new THREE.Uniform(swimSpeed),
  });

  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const width = Math.floor(size.width * dpr);
    const height = Math.floor(size.height * dpr);
    const res = uniforms.current.resolution.value;
    if (res.x !== width || res.y !== height) res.set(width, height);
    // Park the pointer off-frame until it actually moves, so the school is not permanently
    // parted around the top-left corner on load or on a touch device.
    if (!hasPointer.current) {
      mouseTarget.current.set(width * 0.5, height * 2.0);
      uniforms.current.mousePos.value.copy(mouseTarget.current);
    }
  }, [size, gl]);

  useFrame((_, delta) => {
    const u = uniforms.current;

    if (!paused) u.time.value += delta;

    u.waterColor.value.setRGB(...waterColor);
    u.baseColor.value.setRGB(...baseColor);
    u.fishColor.value.setRGB(...fishColor);
    u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
    u.mouseRadius.value = mouseRadius;
    u.fishCount.value = fishCount;
    u.fishScale.value = fishScale;
    u.swimSpeed.value = swimSpeed;

    // Ease toward the pointer instead of snapping to it — the school should look like it is
    // reacting to something moving past, not teleporting out of the way.
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

interface FishSchoolProps {
  waterColor?: [number, number, number];
  baseColor?: [number, number, number];
  fishColor?: [number, number, number];
  swimSpeed?: number;
  colorNum?: number;
  pixelSize?: number;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export function FishSchool({
  waterColor = [0.3, 0.4, 0.5],
  baseColor = [0, 0, 0],
  fishColor = [0.62, 0.76, 0.86],
  swimSpeed = 0.045,
  colorNum = 8,
  pixelSize = 2,
  enableMouseInteraction = true,
  mouseRadius = 0.22,
}: FishSchoolProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const reducedMotion = useReducedMotion();
  const paused = !isInView || !!reducedMotion;

  // The output is quantized into blocks anyway, so a phone can render the scene below its own
  // pixel ratio and lose nothing but fill cost. Read once at mount — this component is imported
  // with ssr: false, so there is no server render to mismatch.
  const dpr = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? 0.75 : 1),
    []
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <DitherCanvas
        colorNum={colorNum}
        pixelSize={pixelSize}
        ditherBias={0.2}
        dpr={dpr}
        paused={paused}
      >
        <FishScene
          waterColor={waterColor}
          baseColor={baseColor}
          fishColor={fishColor}
          swimSpeed={swimSpeed}
          paused={paused}
          enableMouseInteraction={enableMouseInteraction && !reducedMotion}
          mouseRadius={mouseRadius}
        />
      </DitherCanvas>
    </div>
  );
}
