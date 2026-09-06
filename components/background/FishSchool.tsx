/* eslint-disable react/no-unknown-property */
"use client";

import { useRef, useEffect, forwardRef, useMemo } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";
import { useInView, useReducedMotion } from "framer-motion";

const sceneVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

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
const float PI = 3.14159265;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  for (int i = 0; i < 2; i++) {
    value += amp * abs(cnoise(p));
    p *= 2.4;
    amp *= 0.55;
  }
  return value;
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

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

    float x = mod(r4 * span + time * vel * dir, span) - span * 0.5;
    float bobRate = mix(0.3, 0.7, r3);
    float bobPhase = r1 * 6.283;
    float y = (r5 - 0.5) * 0.88 + sin(time * bobRate + bobPhase) * 0.045;
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

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
uniform vec2 resolution;

const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  float stepVal = 1.0 / (colorNum - 1.0);
  color += threshold * stepVal;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uv, color.rgb);
  outputColor = color;
}
`;

class RetroEffectImpl extends Effect {
  public uniforms: Map<string, THREE.Uniform<any>>;

  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ["colorNum", new THREE.Uniform(4.0)],
      ["pixelSize", new THREE.Uniform(2.0)],
      ["resolution", new THREE.Uniform(new THREE.Vector2())],
    ]);
    super("RetroEffect", ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }

  update(renderer: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget) {
    const resolution = this.uniforms.get("resolution")!.value;
    resolution.set(inputBuffer.width, inputBuffer.height);
  }

  set colorNum(value: number) {
    this.uniforms.get("colorNum")!.value = value;
  }
  get colorNum(): number {
    return this.uniforms.get("colorNum")!.value;
  }
  set pixelSize(value: number) {
    this.uniforms.get("pixelSize")!.value = value;
  }
  get pixelSize(): number {
    return this.uniforms.get("pixelSize")!.value;
  }
}

const WrappedRetroEffect = wrapEffect(RetroEffectImpl);

const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>(
  ({ colorNum, pixelSize }, ref) => (
    <WrappedRetroEffect ref={ref} colorNum={colorNum} pixelSize={pixelSize} />
  )
);

RetroEffect.displayName = "RetroEffect";

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
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

function FishScene({
  waterColor,
  baseColor,
  fishColor,
  swimSpeed,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius,
}: SceneProps) {
  const { viewport, size, gl } = useThree();
  const mouseTarget = useRef(new THREE.Vector2());
  const hasPointer = useRef(false);

  // A narrow phone viewport fits far fewer fish before it reads as soup, and each one needs to be
  // proportionally larger to stay recognisable once the dither pass chunks it into dots.
  const isCompact = size.width < 640;
  const fishCount = isCompact ? 10 : 14;
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

    if (!disableAnimation) u.time.value += delta;

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
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={sceneVertexShader}
          fragmentShader={sceneFragmentShader}
          uniforms={uniforms.current}
        />
      </mesh>

      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} />
      </EffectComposer>

      <mesh
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.01]}
        scale={[viewport.width, viewport.height, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
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

  // The output is quantized into blocks anyway, so a phone can render the scene below its own
  // pixel ratio and lose nothing but fill cost. Read once at mount — this component is imported
  // with ssr: false, so there is no server render to mismatch.
  const dpr = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 640 ? 0.75 : 1),
    []
  );

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6] }}
        dpr={dpr}
        gl={{ antialias: false, preserveDrawingBuffer: false, alpha: true }}
        frameloop={isInView && !reducedMotion ? "always" : "demand"}
      >
        <FishScene
          waterColor={waterColor}
          baseColor={baseColor}
          fishColor={fishColor}
          swimSpeed={swimSpeed}
          colorNum={colorNum}
          pixelSize={pixelSize}
          disableAnimation={!isInView || !!reducedMotion}
          enableMouseInteraction={enableMouseInteraction && !reducedMotion}
          mouseRadius={mouseRadius}
        />
      </Canvas>
    </div>
  );
}
