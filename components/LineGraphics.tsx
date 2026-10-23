"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type LineCardTone = "light" | "dark";

const CARD_TONES: Record<LineCardTone, { box: string; tick: string; label: string }> = {
  light: {
    box: "border-[#18280E]/20 bg-white/75 text-[#090F05] backdrop-blur-[2px]",
    tick: "border-[#18280E]/60",
    label: "text-[#4A5B38]",
  },
  dark: {
    box: "border-white/20 bg-black/50 text-zinc-100 backdrop-blur",
    tick: "border-white/50",
    label: "text-violet-300/80",
  },
};

export function LineCard({
  label,
  value,
  className = "",
  tone = "light",
}: {
  label: string;
  value: string;
  className?: string;
  tone?: LineCardTone;
}) {
  const { box, tick, label: labelColor } = CARD_TONES[tone];

  return (
    <div className={`relative border px-3.5 py-2.5 font-mono ${box} ${className}`}>
      <span aria-hidden="true" className={`absolute -left-px -top-px h-2 w-2 border-l border-t ${tick}`} />
      <span aria-hidden="true" className={`absolute -right-px -top-px h-2 w-2 border-r border-t ${tick}`} />
      <span aria-hidden="true" className={`absolute -bottom-px -left-px h-2 w-2 border-b border-l ${tick}`} />
      <span aria-hidden="true" className={`absolute -bottom-px -right-px h-2 w-2 border-b border-r ${tick}`} />
      <p className={`m-0 text-[11px] uppercase tracking-[0.12em] ${labelColor}`}>
        <span aria-hidden="true">▸ </span>
        {label}
      </p>
      <p className="m-0 mt-0.5 text-[13px] tracking-tight text-inherit">{value}</p>
    </div>
  );
}

function EdgeRuler({ side }: { side: "left" | "right" }) {
  const align = side === "left" ? "left-0 bg-left" : "right-0 bg-right";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 hidden w-6 md:block ${side === "left" ? "left-0" : "right-0"}`}>
      <div
        className={`absolute inset-y-0 w-2 ${align}`}
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, #090F05 0 1px, transparent 1px 22px)" }}
      />
      <div
        className={`absolute inset-y-0 w-3.5 ${align}`}
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, #090F05 0 1px, transparent 1px 110px)" }}
      />
      <span
        className={`absolute top-1/2 -translate-y-1/2 h-0 w-0 border-y-[6px] border-y-transparent ${
          side === "left" ? "left-0 border-l-[9px] border-l-[#090F05]" : "right-0 border-r-[9px] border-r-[#090F05]"
        }`}
      />
    </div>
  );
}

const HERO_FACTS = [
  { label: "Role", value: "Product designer", depth: 1 },
  { label: "Currently", value: "AliveCor", depth: 0.6 },
  { label: "Focus", value: "Healthcare · Design systems", depth: 0.8 },
  { label: "Based", value: "Bangalore", depth: 1.2 },
];

const HERO_CARD_POS: Record<LineCardTone, string[]> = {
  light: ["left-[9%] top-[19%]", "right-[9%] top-[23%]", "left-[11%] top-[74%]", "right-[12%] top-[78%]"],
  dark: ["left-[2.5%] top-[17%]", "right-[2.5%] top-[22%]", "left-[3%] top-[72%]", "right-[3.5%] top-[77%]"],
};

const HERO_CARDS = HERO_FACTS.map((fact, i) => ({
  ...fact,
  light: HERO_CARD_POS.light[i],
  dark: HERO_CARD_POS.dark[i],
}));

const PLUS_MARKS = ["left-[24%] top-[34%]", "right-[26%] top-[40%]", "left-[30%] top-[86%]", "right-[22%] top-[64%]"];

type HeroMotion = {
  scrollY: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduce: boolean;
};

function useHeroMotion(): HeroMotion {
  const reduce = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return { scrollY, pointerX, pointerY, reduce };
}

function HeroCard({
  card,
  tone,
  scrollY,
  pointerX,
  pointerY,
  reduce,
}: HeroMotion & {
  card: (typeof HERO_CARDS)[number];
  tone: LineCardTone;
}) {
  const scrollShift = useTransform(scrollY, [0, 800], [0, -140 * card.depth]);
  const px = useTransform(pointerX, (v) => v * 10 * card.depth);
  const py = useTransform(pointerY, (v) => v * 8 * card.depth);
  const y = useTransform([scrollShift, py], ([a, b]: number[]) => a + b);

  return (
    <motion.div className={`absolute ${card[tone]}`} style={reduce ? undefined : { x: px, y }}>
      <LineCard label={card.label} value={card.value} tone={tone} className={tone === "dark" ? "max-w-[11rem]" : ""} />
    </motion.div>
  );
}

export function HeroCardsDark() {
  const motionProps = useHeroMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[11] hidden xl:block">
      {HERO_CARDS.map((card) => (
        <HeroCard key={card.label} card={card} tone="dark" {...motionProps} />
      ))}
    </div>
  );
}

export function HeroPanel() {
  const motionProps = useHeroMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <EdgeRuler side="left" />
      <EdgeRuler side="right" />
      <div className="absolute inset-x-3 bottom-3 top-24 overflow-hidden rounded-[1.25rem] border border-[#18280E]/[0.06] bg-[var(--mint)] md:inset-x-8">
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_center,black_20%,transparent_90%)] [-webkit-mask-image:radial-gradient(ellipse_75%_70%_at_center,black_20%,transparent_90%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(24,40,14,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,40,14,0.07) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {PLUS_MARKS.map((pos) => (
          <span key={pos} className={`absolute hidden font-mono text-sm leading-none text-[#18280E]/30 lg:block ${pos}`}>
            +
          </span>
        ))}
        <div className="hidden xl:block">
          {HERO_CARDS.map((card) => (
            <HeroCard key={card.label} card={card} tone="light" {...motionProps} />
          ))}
        </div>
      </div>
    </div>
  );
}
