"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Hand, Sparkles } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { DESK_ONLY, FOCUS_RING } from "./desk-utils";
import { DeskIntro } from "./DeskIntro";
import { Polaroid } from "./Polaroid";
import { StickyNote } from "./StickyNote";
import {
  FlowerSticker,
  HelloSticker,
  PencilSticker,
  RulerSticker,
  SmileySticker,
  StarSticker,
} from "./Stickers";

type DeskItem = {
  id: string;
  left: string;
  top: string;
  rotate: number;
  width: string;
  z: number;
  node: ReactNode;
};

const POLAROID_POSITIONS = [
  { left: "33%", top: "4%", rotate: 3 },
  { left: "64%", top: "8%", rotate: -3 },
  { left: "36%", top: "54%", rotate: -2.5 },
  { left: "66%", top: "56%", rotate: 2 },
];

const POLAROID_WIDTH = "clamp(210px,23vw,300px)";

const ITEMS: DeskItem[] = [
  ...PROJECTS.map((project, i) => ({
    id: `project-${project.id}`,
    ...POLAROID_POSITIONS[i % POLAROID_POSITIONS.length],
    width: POLAROID_WIDTH,
    z: 10 + i,
    node: <Polaroid project={project} variant="canvas" />,
  })),
  {
    id: "note",
    left: "5%",
    top: "32%",
    rotate: -3,
    width: "clamp(230px,22vw,300px)",
    z: 20,
    node: <StickyNote />,
  },
  { id: "star", left: "28%", top: "36%", rotate: 12, width: "72px", z: 30, node: <StarSticker /> },
  { id: "flower", left: "90%", top: "4%", rotate: -10, width: "84px", z: 30, node: <FlowerSticker /> },
  { id: "smiley", left: "54%", top: "86%", rotate: 8, width: "76px", z: 30, node: <SmileySticker /> },
  { id: "hello", left: "6%", top: "84%", rotate: -8, width: "130px", z: 30, node: <HelloSticker /> },
  { id: "pencil", left: "74%", top: "88%", rotate: -14, width: "200px", z: 30, node: <PencilSticker /> },
  { id: "ruler", left: "18%", top: "93%", rotate: 4, width: "220px", z: 30, node: <RulerSticker /> },
];

const KEY_STEP = 24;

function DraggableItem({
  item,
  canvasRef,
  resetSignal,
  zIndex,
  reduced,
  onRaise,
}: {
  item: DeskItem;
  canvasRef: RefObject<HTMLDivElement | null>;
  resetSignal: number;
  zIndex: number;
  reduced: boolean;
  onRaise: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const didDrag = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (resetSignal === 0) return;
    if (reduced) {
      x.set(0);
      y.set(0);
      return;
    }
    const spring = { type: "spring", stiffness: 160, damping: 24 } as const;
    const controls = [animate(x, 0, spring), animate(y, 0, spring)];
    return () => controls.forEach((c) => c.stop());
  }, [resetSignal, reduced, x, y]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!event.shiftKey) return;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    };
    const step = delta[event.key];
    const canvas = canvasRef.current;
    const el = ref.current;
    if (!step || !canvas || !el) return;
    event.preventDefault();
    onRaise(item.id);
    const c = canvas.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    x.set(clamp(x.get() + step[0], x.get() - (r.left - c.left), x.get() + (c.right - r.right)));
    y.set(clamp(y.get() + step[1], y.get() - (r.top - c.top), y.get() + (c.bottom - r.bottom)));
  };

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={canvasRef}
      dragElastic={reduced ? 0 : 0.08}
      dragMomentum={false}
      whileDrag={reduced ? undefined : { scale: 1.05 }}
      data-dragging={dragging}
      onPointerDown={() => {
        didDrag.current = false;
        onRaise(item.id);
      }}
      onDragStart={() => {
        didDrag.current = true;
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
      onClickCapture={(event) => {
        if (didDrag.current) {
          event.preventDefault();
          event.stopPropagation();
          didDrag.current = false;
        }
      }}
      onKeyDown={handleKeyDown}
      className="group/item absolute cursor-grab active:cursor-grabbing"
      style={{ left: item.left, top: item.top, width: item.width, x, y, rotate: item.rotate, zIndex }}
    >
      {item.node}
    </motion.div>
  );
}

export function DeskCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const topZ = useRef(100);
  const [resetSignal, setResetSignal] = useState(0);
  const [tidied, setTidied] = useState(false);
  const [zMap, setZMap] = useState<Record<string, number>>({});

  const raise = useCallback((id: string) => {
    topZ.current += 1;
    const next = topZ.current;
    setZMap((prev) => ({ ...prev, [id]: next }));
    setTidied(false);
  }, []);

  const tidy = () => {
    setResetSignal((n) => n + 1);
    setZMap({});
    topZ.current = 100;
    setTidied(true);
  };

  return (
    <section
      aria-label="Desk"
      className={`${DESK_ONLY} relative overflow-x-clip pt-28 [background-image:radial-gradient(#E2EADA_1.4px,transparent_1.4px)] [background-size:24px_24px] dark:[background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] dark:[background-size:40px_40px]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.07] mix-blend-screen dark:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div ref={canvasRef} className="relative mx-auto h-[max(130vh,1080px)] max-w-[1440px]">
        <DeskIntro className="absolute left-[5%] top-[3%] z-[1] w-[28%]" />

        <div className="absolute right-4 top-0 z-[200] flex items-center gap-2">
          <p className="flex items-center gap-1.5 rounded-full border border-[#090F05]/15 bg-white/80 px-3 py-1.5 text-xs font-bold text-[#090F05] dark:rounded-md dark:border-white/15 dark:bg-black/70 dark:font-mono dark:text-white/80">
            <Hand className="h-3.5 w-3.5" aria-hidden="true" />
            Drag things around
          </p>
          <button
            type="button"
            onClick={tidy}
            className={`flex items-center gap-1.5 rounded-full bg-[#B2EB76] px-3.5 py-1.5 text-xs font-bold text-[#090F05] hover:-rotate-1 motion-reduce:hover:rotate-0 dark:rounded-md dark:border dark:border-violet-400/50 dark:bg-violet-500/10 dark:font-mono dark:text-violet-200 dark:hover:bg-violet-500/25 ${FOCUS_RING}`}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Tidy up
          </button>
          <span role="status" className="sr-only">
            {tidied ? "Desk tidied" : ""}
          </span>
        </div>

        <p className="sr-only">Focus a polaroid or the note and press Shift with an arrow key to move it.</p>

        {ITEMS.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            canvasRef={canvasRef}
            resetSignal={resetSignal}
            zIndex={zMap[item.id] ?? item.z}
            reduced={reduced}
            onRaise={raise}
          />
        ))}
      </div>
    </section>
  );
}
