/* eslint-disable react/no-unknown-property */
"use client";

import { ReactNode, forwardRef } from "react";
import { Canvas, useThree, ThreeEvent } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";

// Shared shell for the dithered hero backdrops. A scene draws itself as smooth gradients into a
// fullscreen plane; this pixelates and Bayer-dithers the result, which is what turns the whole
// frame — scene and subjects alike — into dots.

export const sceneVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

// Noise, rotation, hashing and the 2D SDF primitives both scenes build their subjects from.
export const COMMON_GLSL = `
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

float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// Smooth union — welds limbs and body into one silhouette instead of a pile of parts.
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
uniform float ditherBias;
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
  // The bias pushes the whole frame toward the darker quantization steps. A scene on black wants
  // it (it keeps the dim end from muddying into grey); a scene on cream wants none of it, or the
  // light half of the palette collapses.
  color = clamp(color - ditherBias, 0.0, 1.0);
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
      ["ditherBias", new THREE.Uniform(0.2)],
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
  set ditherBias(value: number) {
    this.uniforms.get("ditherBias")!.value = value;
  }
  get ditherBias(): number {
    return this.uniforms.get("ditherBias")!.value;
  }
}

const WrappedRetroEffect = wrapEffect(RetroEffectImpl);

const RetroEffect = forwardRef<
  RetroEffectImpl,
  { colorNum: number; pixelSize: number; ditherBias: number }
>(({ colorNum, pixelSize, ditherBias }, ref) => (
  <WrappedRetroEffect
    ref={ref}
    colorNum={colorNum}
    pixelSize={pixelSize}
    ditherBias={ditherBias}
  />
));

RetroEffect.displayName = "RetroEffect";

interface DitherCanvasProps {
  children: ReactNode;
  colorNum: number;
  pixelSize: number;
  ditherBias: number;
  dpr: number;
  paused: boolean;
}

export function DitherCanvas({
  children,
  colorNum,
  pixelSize,
  ditherBias,
  dpr,
  paused,
}: DitherCanvasProps) {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 6] }}
      dpr={dpr}
      // No MSAA (the output is quantized by the dither pass, so there are no edges to smooth) and
      // no preserved drawing buffer (nothing reads the canvas back) — both cost a full-framebuffer
      // allocation and resolve on every frame.
      gl={{ antialias: false, preserveDrawingBuffer: false, alpha: true }}
      frameloop={paused ? "demand" : "always"}
    >
      {children}
      <EffectComposer>
        <RetroEffect colorNum={colorNum} pixelSize={pixelSize} ditherBias={ditherBias} />
      </EffectComposer>
    </Canvas>
  );
}

interface ScenePlaneProps {
  fragmentShader: string;
  uniforms: { [key: string]: THREE.Uniform<any> };
  onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
}

export function ScenePlane({ fragmentShader, uniforms, onPointerMove }: ScenePlaneProps) {
  const { viewport } = useThree();

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={sceneVertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      <mesh
        onPointerMove={onPointerMove}
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
