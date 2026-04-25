"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXCLAMATIONS = [
  "Designing the future ✦",
  "Need coffee ☕",
  "Based in Bangalore!",
  "Still prototyping...",
  "404: rest not found",
  "I made this!",
  "*furiously wireframing*",
  "Check my work →",
  "Hello there!",
  "Pixel by pixel 🎨",
  "Open to new things?",
  "Built with Next.js!",
  "Figma is open...",
  "UX or bust 🚀",
];

const SPEED = 1.2;
const NAV_HEIGHT = 80;
const CHAR_W = 32;
const CHAR_H = 48;

// Pixel art character — 8×12 grid, scale ×4 = 32×48px
function PixelChar({ facingRight, isWalking }: { facingRight: boolean; isWalking: boolean }) {
  return (
    <>
      <style>{`
        @keyframes leg-l { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-2px) } }
        @keyframes leg-r { 0%,100% { transform: translateY(-2px) } 50% { transform: translateY(0px) } }
        .leg-l { transform-box: fill-box; transform-origin: center bottom; animation: ${isWalking ? "leg-l 0.35s steps(1) infinite" : "none"}; }
        .leg-r { transform-box: fill-box; transform-origin: center bottom; animation: ${isWalking ? "leg-r 0.35s steps(1) infinite" : "none"}; }
      `}</style>
      <svg
        width={CHAR_W}
        height={CHAR_H}
        viewBox="0 0 8 12"
        style={{
          imageRendering: "pixelated",
          transform: facingRight ? "none" : "scaleX(-1)",
          display: "block",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
        }}
      >
        {/* Head */}
        <rect x="2" y="0" width="4" height="4" fill="currentColor" />
        {/* Eyes */}
        <rect x="2.5" y="1.5" width="1" height="1" fill="var(--background)" />
        <rect x="4.5" y="1.5" width="1" height="1" fill="var(--background)" />
        {/* Body */}
        <rect x="1" y="4" width="6" height="4" fill="currentColor" />
        {/* Arm / pencil */}
        <rect x="7" y="5" width="1" height="2" fill="currentColor" opacity="0.6" />
        <rect x="7" y="7" width="1" height="1" fill="#f59e0b" />
        {/* Left leg */}
        <rect className="leg-l" x="1.5" y="8" width="2" height="3" fill="currentColor" />
        {/* Right leg */}
        <rect className="leg-r" x="4.5" y="8" width="2" height="3" fill="currentColor" />
      </svg>
    </>
  );
}

export function WanderingCharacter() {
  const charRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 160, y: 300 });
  const targetRef = useRef({ x: 160, y: 300 });
  const stateRef = useRef<"walking" | "idle" | "hovering">("idle");
  const rafRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [exclamation, setExclamation] = useState("");
  const [mounted, setMounted] = useState(false);

  const pickNewTarget = () => {
    const margin = 60;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = margin + Math.random() * (vw - margin * 2 - CHAR_W);
    const y = NAV_HEIGHT + margin + Math.random() * (vh - NAV_HEIGHT - margin * 2 - CHAR_H);
    targetRef.current = { x, y };
    stateRef.current = "walking";
    setIsWalking(true);
  };

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Random start
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    posRef.current = {
      x: 80 + Math.random() * (vw - 160),
      y: NAV_HEIGHT + 60 + Math.random() * (vh - NAV_HEIGHT - 200),
    };
    if (charRef.current) {
      charRef.current.style.left = `${posRef.current.x}px`;
      charRef.current.style.top = `${posRef.current.y}px`;
    }

    // Kick off after 1s
    const kickoff = setTimeout(() => pickNewTarget(), 1000);

    const loop = () => {
      if (stateRef.current === "walking" && charRef.current) {
        const dx = targetRef.current.x - posRef.current.x;
        const dy = targetRef.current.y - posRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < SPEED + 1) {
          // Arrived
          posRef.current = { ...targetRef.current };
          stateRef.current = "idle";
          setIsWalking(false);
          charRef.current.style.left = `${posRef.current.x}px`;
          charRef.current.style.top = `${posRef.current.y}px`;

          idleTimerRef.current = setTimeout(
            () => { if (stateRef.current === "idle") pickNewTarget(); },
            2000 + Math.random() * 3000
          );
        } else {
          posRef.current.x += (dx / dist) * SPEED;
          posRef.current.y += (dy / dist) * SPEED;
          charRef.current.style.left = `${posRef.current.x}px`;
          charRef.current.style.top = `${posRef.current.y}px`;

          // Only update React state when direction changes (avoids constant re-renders)
          const newFacingRight = dx > 0;
          setFacingRight((prev) => (prev !== newFacingRight ? newFacingRight : prev));
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      clearTimeout(kickoff);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    stateRef.current = "hovering";
    setIsWalking(false);
    setIsHovered(true);
    setExclamation(EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)]);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    resumeTimerRef.current = setTimeout(() => {
      if (stateRef.current === "hovering") pickNewTarget();
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-40">
      <div
        ref={charRef}
        className="absolute pointer-events-auto"
        style={{ left: posRef.current.x, top: posRef.current.y }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
            >
              <div className="relative px-3 py-1.5 rounded-full bg-[var(--card)] border border-[var(--border)] backdrop-blur-sm shadow-lg">
                <span className="text-[11px] font-mono text-[var(--foreground)]">{exclamation}</span>
                {/* Bubble tail */}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid var(--border)",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character */}
        <div className="text-[var(--foreground)] cursor-pointer hover:scale-110 transition-transform duration-150">
          <PixelChar facingRight={facingRight} isWalking={isWalking} />
        </div>
      </div>
    </div>
  );
}
