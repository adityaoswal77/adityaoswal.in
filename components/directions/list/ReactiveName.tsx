"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { useHoverCapable } from "./shared";

const LINES = ["Aditya", "Oswal"];
const OFFSCREEN = -9999;

function Letter({
  char,
  lean,
  mx,
  my,
  enabled,
}: {
  char: string;
  lean: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  enabled: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const raw = useMotionValue(0);
  const n = useSpring(raw, { stiffness: 220, damping: 20, mass: 0.6 });
  const y = useTransform(n, [0, 1], ["0%", "-9%"]);
  const rotate = useTransform(n, [0, 1], [0, lean]);
  const scale = useTransform(n, [0, 1], [1, 1.05]);

  useEffect(() => {
    if (!enabled) {
      raw.set(0);
      return;
    }
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = mx.get() - (r.left + r.width / 2);
      const dy = my.get() - (r.top + r.height / 2);
      raw.set(Math.max(0, 1 - Math.hypot(dx, dy) / (r.height * 1.1)));
    };
    const offX = mx.on("change", update);
    const offY = my.on("change", update);
    return () => {
      offX();
      offY();
    };
  }, [enabled, mx, my, raw]);

  const style = { y, rotate, scale, "--n": n } as unknown as MotionStyle;

  return (
    <span ref={ref} className="inline-block">
      <motion.span
        style={style}
        className="inline-block will-change-transform [color:color-mix(in_srgb,#B2EB76_calc(var(--n,0)*100%),#090F05)] dark:[color:#fff] dark:[text-shadow:0_0_calc(var(--n,0)*36px)_rgba(255,255,255,calc(var(--n,0)*0.55))]"
      >
        {char}
      </motion.span>
    </span>
  );
}

export function ReactiveName({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const enabled = hoverCapable && !reduced;
  const mx = useMotionValue(OFFSCREEN);
  const my = useMotionValue(OFFSCREEN);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const reset = () => {
      mx.set(OFFSCREEN);
      my.set(OFFSCREEN);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", reset);
      window.removeEventListener("blur", reset);
      reset();
    };
  }, [enabled, mx, my]);

  return (
    <h1 aria-label="Aditya Oswal" className={className}>
      {LINES.map((line, li) => (
        <span
          key={line}
          aria-hidden="true"
          className={`block ${li === 1 ? "italic md:pl-[10vw]" : ""}`}
        >
          {line.split("").map((char, i) => (
            <Letter
              key={`${line}-${i}`}
              char={char}
              lean={(i + li) % 2 === 0 ? 5 : -5}
              mx={mx}
              my={my}
              enabled={enabled}
            />
          ))}
        </span>
      ))}
    </h1>
  );
}
