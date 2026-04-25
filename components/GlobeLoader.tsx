"use client";

/**
 * GlobeLoader — 200×200 monochrome spinning globe with whirl effect.
 *
 * Usage:
 *   import GlobeLoader from "@/components/GlobeLoader";
 *   <GlobeLoader />
 *
 * Dependencies:
 *   npm i topojson-client
 *
 * Fetches a ~100 KB simplified world topology once (cached by the browser)
 * from the world-atlas CDN. Renders with a custom orthographic projection
 * so countries only draw on the front-facing hemisphere — no three.js, no
 * d3-geo. Self-adapts to the current CSS color via `currentColor`, so it
 * respects the site's light/dark theme.
 */

import { useEffect, useRef, useState } from "react";
// @ts-ignore — no types shipped
import * as topojson from "topojson-client";

const CX = 100;
const CY = 100;
const R = 78;
const TILT = (-20 * Math.PI) / 180;
const COS_T = Math.cos(TILT);
const SIN_T = Math.sin(TILT);
const PERIOD_MS = 11000;

type Ring = [number, number][];
type Feature = { geometry: { type: string; coordinates: any } | null };

function project(lonDeg: number, latDeg: number, lambda: number) {
  const lon = (lonDeg * Math.PI) / 180 + lambda;
  const lat = (latDeg * Math.PI) / 180;
  const cl = Math.cos(lat);
  const x = cl * Math.sin(lon);
  const y = Math.sin(lat);
  const z = cl * Math.cos(lon);
  const y2 = y * COS_T - z * SIN_T;
  const z2 = y * SIN_T + z * COS_T;
  return [CX + x * R, CY - y2 * R, z2] as const;
}

function buildGraticule(lambda: number): string {
  let d = "";
  for (let lonD = -180; lonD < 180; lonD += 30) {
    let started = false;
    for (let latD = -80; latD <= 80; latD += 4) {
      const p = project(lonD, latD, lambda);
      if (p[2] < 0) { started = false; continue; }
      d += (started ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2);
      started = true;
    }
  }
  for (let latD = -60; latD <= 60; latD += 30) {
    let started = false;
    for (let lonD = -180; lonD <= 180; lonD += 4) {
      const p = project(lonD, latD, lambda);
      if (p[2] < 0) { started = false; continue; }
      d += (started ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2);
      started = true;
    }
  }
  return d;
}

function buildLand(features: Feature[], lambda: number): string {
  let d = "";
  for (const f of features) {
    const geom = f.geometry;
    if (!geom) continue;
    const polys: Ring[][] = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
    for (const poly of polys) {
      for (const ring of poly) {
        let started = false;
        let moved = false;
        for (let i = 0; i < ring.length; i++) {
          const [lon, lat] = ring[i];
          const p = project(lon, lat, lambda);
          if (p[2] < 0) { started = false; continue; }
          if (!started) {
            d += "M" + p[0].toFixed(2) + " " + p[1].toFixed(2);
            started = true; moved = true;
          } else {
            d += "L" + p[0].toFixed(2) + " " + p[1].toFixed(2);
          }
        }
        if (moved) d += "Z";
      }
    }
  }
  return d;
}

// Module-level cache so navigating between pages reuses the fetch.
let CACHED: Feature[] | null = null;
let CACHE_PROMISE: Promise<Feature[]> | null = null;

async function loadLand(): Promise<Feature[]> {
  if (CACHED) return CACHED;
  if (CACHE_PROMISE) return CACHE_PROMISE;
  CACHE_PROMISE = fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
    .then((r) => r.json())
    .then((topo) => {
      const geo = topojson.feature(topo, topo.objects.land);
      const features: Feature[] = geo.features || [geo];
      CACHED = features;
      return features;
    });
  return CACHE_PROMISE;
}

export default function GlobeLoader({
  size = 200,
  className,
  ariaLabel = "Loading",
  phase = "loading",
}: {
  size?: number;
  className?: string;
  ariaLabel?: string;
  phase?: "loading" | "fading" | "done";
}) {
  const landRef = useRef<SVGPathElement>(null);
  const gratRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let raf = 0;
    let t0: number | null = null;
    let features: Feature[] = [];

    loadLand().then((f) => {
      features = f;
      setReady(true);
    });

    const tick = (ts: number) => {
      if (t0 === null) t0 = ts;
      const lambda = (((ts - t0) / PERIOD_MS) % 1) * Math.PI * 2;
      if (gratRef.current) gratRef.current.setAttribute("d", buildGraticule(lambda));
      if (landRef.current && features.length)
        landRef.current.setAttribute("d", buildLand(features, lambda));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-block",
        color: "currentColor", // inherits theme text color
      }}
    >
      {/* Slow dotted whirl */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          transformOrigin: "50% 50%",
          animation: "gl-spin 7s linear infinite reverse",
          opacity: 0.55,
        }}
        aria-hidden="true"
      >
        <circle
          cx="100" cy="100" r="94" fill="none"
          stroke="currentColor" strokeOpacity="0.38" strokeWidth="0.9"
          strokeDasharray="1 7" strokeLinecap="round"
        />
      </svg>

      {/* Globe */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          overflow: "visible",
          opacity: ready ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      >
        <defs>
          <clipPath id="gl-disc"><circle cx="100" cy="100" r="78" /></clipPath>
          <radialGradient id="gl-shade" cx="32%" cy="28%" r="85%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="65%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.22" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1.2" />

        <g clipPath="url(#gl-disc)">
          <path ref={gratRef} fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
          <path ref={landRef} fill="currentColor" fillOpacity="0.86" stroke="none" />
        </g>

        <circle cx="100" cy="100" r="78" fill="url(#gl-shade)" pointerEvents="none" />

        {/* Pixel character standing on the globe */}
        <g
          style={{
            transformBox: "fill-box",
            transformOrigin: "center bottom",
            animation: phase === "fading"
              ? "char-jump 0.55s cubic-bezier(0.33,0,0.66,1) forwards"
              : "char-idle 1.4s ease-in-out infinite",
          }}
        >
          {/* Head */}
          <rect x="94" y="152" width="12" height="11" fill="currentColor" rx="1" />
          {/* Eyes */}
          <rect x="96.5" y="155" width="2.5" height="2.5" style={{ fill: "var(--background)" }} />
          <rect x="101" y="155" width="2.5" height="2.5" style={{ fill: "var(--background)" }} />
          {/* Body */}
          <rect x="91" y="163" width="18" height="10" fill="currentColor" rx="1" />
          {/* Pencil arm */}
          <rect x="109" y="165" width="3" height="6" fill="currentColor" opacity="0.6" />
          <rect x="109" y="171" width="3" height="2" fill="#f59e0b" />
          {/* Left leg */}
          <rect x="92" y="173" width="6" height="5" fill="currentColor" />
          {/* Right leg */}
          <rect x="102" y="173" width="6" height="5" fill="currentColor" />
        </g>
      </svg>

      {/* Fast comet whirl */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          overflow: "visible",
          transformOrigin: "50% 50%",
          animation: "gl-spin 2.4s linear infinite",
        }}
        aria-hidden="true"
      >
        <circle
          cx="100" cy="100" r="90" fill="none"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          pathLength={1000} strokeDasharray="120 880"
          transform="rotate(-90 100 100)"
        />
        <circle
          cx="100" cy="100" r="90" fill="none"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          pathLength={1000} strokeDasharray="8 992"
          transform="rotate(120 100 100)"
        />
        <circle cx="190" cy="100" r="1.8" fill="currentColor" />
      </svg>

      <style jsx global>{`
        @keyframes gl-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes char-idle {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes char-jump {
          0%   { transform: translateY(0px)    rotate(0deg);  }
          18%  { transform: translateY(5px)    rotate(0deg);  }
          100% { transform: translateY(-260px) rotate(12deg); }
        }
      `}</style>
    </div>
  );
}
