"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Tone = "light" | "band";

export function LineCard({
  label,
  value,
  tone = "light",
  className = "",
}: {
  label: string;
  value: string;
  tone?: Tone;
  className?: string;
}) {
  const box =
    tone === "light"
      ? "border-[#18280E]/20 bg-white/75 text-[#090F05] backdrop-blur-[2px]"
      : "border-white/20 bg-[#18280E]/60 text-white/85 dark:border-white/15 dark:bg-black/60";
  const tick = tone === "light" ? "border-[#18280E]/60" : "border-[#B2EB76]/70 dark:border-white/50";
  const labelColor = tone === "light" ? "text-[#4A5B38]" : "text-[#B2EB76]/80 dark:text-violet-300/80";

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

const HERO_CARDS = [
  { label: "Role", value: "Product designer", pos: "left-[9%] top-[19%]", depth: 1 },
  { label: "Currently", value: "AliveCor", pos: "right-[9%] top-[23%]", depth: 0.6 },
  { label: "Focus", value: "Healthcare · Design systems", pos: "left-[11%] top-[74%]", depth: 0.8 },
  { label: "Based", value: "Bangalore", pos: "right-[12%] top-[78%]", depth: 1.2 },
];

const PLUS_MARKS = ["left-[24%] top-[34%]", "right-[26%] top-[40%]", "left-[30%] top-[86%]", "right-[22%] top-[64%]"];

function HeroCard({
  card,
  scrollY,
  pointerX,
  pointerY,
  reduce,
}: {
  card: (typeof HERO_CARDS)[number];
  scrollY: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  reduce: boolean;
}) {
  const scrollShift = useTransform(scrollY, [0, 800], [0, -140 * card.depth]);
  const px = useTransform(pointerX, (v) => v * 10 * card.depth);
  const py = useTransform(pointerY, (v) => v * 8 * card.depth);
  const y = useTransform([scrollShift, py], ([a, b]: number[]) => a + b);

  return (
    <motion.div className={`absolute ${card.pos}`} style={reduce ? undefined : { x: px, y }}>
      <LineCard label={card.label} value={card.value} />
    </motion.div>
  );
}

export function HeroPanel() {
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
            <HeroCard key={card.label} card={card} scrollY={scrollY} pointerX={pointerX} pointerY={pointerY} reduce={reduce} />
          ))}
        </div>
      </div>
    </div>
  );
}

const BAND_CARDS = [
  { label: "Role", value: "Product designer", pos: "left-[6%] top-[12%]", from: 160 },
  { label: "Company", value: "AliveCor", pos: "right-[8%] top-[10%]", from: 220 },
  { label: "Product", value: "KardiaMobile", pos: "left-[14%] top-[30%]", from: 120 },
  { label: "System", value: "Kardia design system", pos: "right-[5%] top-[34%]", from: 260 },
  { label: "Side project", value: "Interesting Places", pos: "left-[5%] top-[70%]", from: 300 },
  { label: "Studio", value: "Freshfolios", pos: "right-[12%] top-[72%]", from: 180 },
  { label: "Based", value: "Bangalore", pos: "left-[40%] top-[86%]", from: 240 },
];

function BandCard({
  card,
  progress,
  reduce,
}: {
  card: (typeof BAND_CARDS)[number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useTransform(progress, [0, 0.5, 1], [card.from, 0, -card.from * 0.6]);
  const opacity = useTransform(progress, [0.1, 0.35, 0.75, 0.95], [0, 1, 1, 0]);
  return (
    <motion.div className={`absolute ${card.pos}`} style={reduce ? undefined : { y, opacity }}>
      <LineCard label={card.label} value={card.value} tone="band" />
    </motion.div>
  );
}

export function ScrollBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="px-3 py-10 md:px-8 md:py-16 bg-[var(--background)]">
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#18280E] px-6 py-24 dark:rounded-[1rem] dark:border dark:border-white/10 dark:bg-zinc-950 md:min-h-[90vh]">
        <div
          aria-hidden="true"
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_center,black_30%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_80%_70%_at_center,black_30%,transparent_95%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div aria-hidden="true" className="hidden md:block">
          {BAND_CARDS.map((card) => (
            <BandCard key={card.label} card={card} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>

        <motion.div className="relative z-10 max-w-3xl text-center" style={reduce ? undefined : { y: textY }}>
          <h2 className="m-0 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
            I design healthcare products at AliveCor,{" "}
            <span className="text-[#B2EB76] dark:text-violet-300">and I build what I design.</span>
          </h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-2 md:hidden">
            {BAND_CARDS.slice(0, 4).map((card) => (
              <li key={card.label}>
                <LineCard label={card.label} value={card.value} tone="band" />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
