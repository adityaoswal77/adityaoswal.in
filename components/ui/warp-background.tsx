"use client";

import React, { useCallback, useMemo, type HTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
  beamColors?: string[];
}

// Light-persona beams: tangerine pop first, then the pastel family (see CLAUDE.md palette).
const LIGHT_BEAM_COLORS = [
  "#FF5C39", // tangerine pop
  "#FFD666", // butter
  "#CBD5FF", // periwinkle
  "#FFD6E0", // blush
  "#D3EEC8", // pistachio
  "#C7E4FF", // sky
  "#C9F0DC", // mint
];

const Beam = ({
  width,
  x,
  delay,
  duration,
  color,
  aspectRatio,
  animate,
}: {
  width: string | number;
  x: string | number;
  delay: number;
  duration: number;
  color: string;
  aspectRatio: number;
  animate: boolean;
}) => {
  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${aspectRatio}`,
          "--background": `linear-gradient(${color}, transparent)`,
        } as React.CSSProperties
      }
      className="absolute top-0 left-[var(--x)] aspect-[1/var(--aspect-ratio)] w-[var(--width)] [background:var(--background)]"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={animate ? { y: "-100%", x: "-50%" } : { y: "0%", x: "-50%" }}
      transition={
        animate
          ? { duration, delay, repeat: Infinity, ease: "linear" }
          : { duration: 0 }
      }
    />
  );
};

// v3-compatible grid background: two crossing linear-gradients sized to the beam cell.
const gridBg =
  "[background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%/var(--beam-size)_var(--beam-size)] [background-size:var(--beam-size)_var(--beam-size)] [container-type:inline-size] [transform-style:preserve-3d]";

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  beamColors = LIGHT_BEAM_COLORS,
  ...props
}) => {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const generateBeams = useCallback(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      // Deterministic delay/aspect/color so SSR and client render identically.
      const delay =
        beamDelayMin +
        ((i + 1) / (beamsPerSide + 1)) * (beamDelayMax - beamDelayMin);
      const aspectRatio = ((i * 3) % 9) + 2;
      const color = beamColors[i % beamColors.length];
      beams.push({ x, delay, aspectRatio, color });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin, beamColors]);

  const topBeams = useMemo(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(), [generateBeams]);

  const renderBeams = (
    beams: { x: number; delay: number; aspectRatio: number; color: string }[],
    prefix: string,
  ) =>
    beams.map((beam, index) => (
      <Beam
        key={`${prefix}-${index}`}
        width={`${beamSize}%`}
        x={`${beam.x * beamSize}%`}
        delay={beam.delay}
        duration={beamDuration}
        color={beam.color}
        aspectRatio={beam.aspectRatio}
        animate={animate}
      />
    ));

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
      >
        {/* top side */}
        <div
          className={cn(
            "absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] [transform:rotateX(-90deg)]",
            gridBg,
          )}
        >
          {renderBeams(topBeams, "top")}
        </div>
        {/* bottom side */}
        <div
          className={cn(
            "absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] [transform:rotateX(-90deg)]",
            gridBg,
          )}
        >
          {renderBeams(bottomBeams, "bottom")}
        </div>
        {/* left side */}
        <div
          className={cn(
            "absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] [transform:rotate(90deg)_rotateX(-90deg)]",
            gridBg,
          )}
        >
          {renderBeams(leftBeams, "left")}
        </div>
        {/* right side */}
        <div
          className={cn(
            "absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]",
            gridBg,
          )}
        >
          {renderBeams(rightBeams, "right")}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
