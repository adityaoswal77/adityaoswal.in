"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const BLOBS = [
  { color: "#FFE8A3", size: "max(48vw, 320px)", top: "-12%", left: "-10%", depth: 28, drift: 26, duration: 18, opacity: 0.6 },
  { color: "#CBD5FF", size: "max(42vw, 300px)", top: "-2%", left: "56%", depth: 46, drift: 34, duration: 22, opacity: 0.55 },
  { color: "#FFD6E0", size: "max(40vw, 290px)", top: "44%", left: "6%", depth: 38, drift: 30, duration: 20, opacity: 0.55 },
  { color: "#D3EEC8", size: "max(36vw, 260px)", top: "52%", left: "58%", depth: 22, drift: 22, duration: 24, opacity: 0.5 },
  { color: "#FF5C39", size: "max(16vw, 140px)", top: "34%", left: "44%", depth: 60, drift: 40, duration: 16, opacity: 0.16 },
];

type Blob = (typeof BLOBS)[number];

const PastelBlob = ({
  blob,
  mx,
  my,
  still,
}: {
  blob: Blob;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  still: boolean;
}) => {
  const x = useTransform(mx, (v) => v * -blob.depth);
  const y = useTransform(my, (v) => v * -blob.depth);

  return (
    <motion.div
      className="absolute"
      style={{ top: blob.top, left: blob.left, width: blob.size, height: blob.size, x, y }}
    >
      <motion.div
        className="h-full w-full rounded-full"
        style={{ backgroundColor: blob.color, opacity: blob.opacity, filter: "blur(72px)" }}
        animate={
          still
            ? undefined
            : {
                x: [0, blob.drift, -blob.drift * 0.6, 0],
                y: [0, -blob.drift * 0.8, blob.drift * 0.5, 0],
              }
        }
        transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export function PastelField() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 20 });
  const my = useSpring(rawY, { stiffness: 50, damping: 20 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, rawX, rawY]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {BLOBS.map((blob) => (
        <PastelBlob key={blob.color} blob={blob} mx={mx} my={my} still={!!reducedMotion} />
      ))}
    </div>
  );
}
