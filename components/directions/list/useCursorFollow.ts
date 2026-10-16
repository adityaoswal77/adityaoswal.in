import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";
import { useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";

export const PREVIEW_W = 340;
export const PREVIEW_H = 255;

const SPRING = { stiffness: 170, damping: 22, mass: 0.7 };
const EDGE = 16;
const GAP = 36;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));

export function useCursorFollow(reduced: boolean) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const tilt = useSpring(useTransform(useVelocity(sx), [-1400, 1400], [-9, 9]), { stiffness: 180, damping: 18 });
  const fresh = useRef(true);

  const place = useCallback(
    (x: number, y: number) => {
      mx.set(x);
      my.set(y);
      if (fresh.current) {
        sx.jump(x);
        sy.jump(y);
        fresh.current = false;
      }
    },
    [mx, my, sx, sy]
  );

  const onPointerEnter = useCallback(() => {
    fresh.current = true;
  }, []);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (reduced || e.pointerType !== "mouse") return;
      let x = e.clientX + GAP;
      if (x + PREVIEW_W > window.innerWidth - EDGE) x = e.clientX - PREVIEW_W - GAP;
      place(Math.max(EDGE, x), clamp(e.clientY - PREVIEW_H / 2, EDGE, window.innerHeight - PREVIEW_H - EDGE));
    },
    [place, reduced]
  );

  const placeAtRow = useCallback(
    (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      fresh.current = true;
      place(
        clamp(r.left + r.width * 0.55, EDGE, window.innerWidth - PREVIEW_W - EDGE),
        clamp(r.top + r.height / 2 - PREVIEW_H / 2, EDGE, window.innerHeight - PREVIEW_H - EDGE)
      );
    },
    [place]
  );

  return { x: reduced ? mx : sx, y: reduced ? my : sy, tilt, onPointerEnter, onPointerMove, placeAtRow };
}
