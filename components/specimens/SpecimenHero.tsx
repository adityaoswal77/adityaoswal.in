"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const Dither = dynamic(() => import("@/components/background/Dither"), { ssr: false });

const PROOF = ["Currently at AliveCor", "Healthcare", "Design systems", "Side projects"];

export function SpecimenHero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme !== "light";

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-44">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 dark:hidden">
          <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#CBD5FF] opacity-70 blur-3xl" />
          <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[#FFD6E0] opacity-70 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#FFE8A3] opacity-70 blur-3xl" />
        </div>
        {isDark && (
          <div className="absolute inset-0 opacity-60">
            <Dither
              baseColor={[0, 0, 0]}
              waveColor={[0.3, 0.4, 0.5]}
              hoverColor={[0, 0, 0]}
              waveSpeed={0.01}
              waveFrequency={3}
              waveAmplitude={0.6}
              colorNum={8}
              pixelSize={2}
              enableMouseInteraction={false}
            />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <p className="inline-block -rotate-2 rounded-full bg-[#FFE8A3] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#2A2438] dark:rotate-0 dark:rounded-md dark:border dark:border-white/15 dark:bg-transparent dark:font-mono dark:font-medium dark:text-white/60">
          Bangalore
        </p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-[#2A2438] dark:text-white sm:text-7xl md:text-8xl">
          Aditya Oswal
        </h1>
        <p className="mt-4 text-xl font-semibold text-[#2A2438] dark:text-white sm:text-2xl">Product designer at AliveCor</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          I design and build healthcare products and design systems. Every project below has a small working piece of it.
          Try them.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5C39] px-6 py-3 text-sm font-bold text-[#2A2438] shadow-[0_8px_0_-3px_rgba(255,92,57,0.35)] transition-transform hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 dark:rounded-lg dark:bg-white dark:font-mono dark:text-black dark:shadow-none dark:hover:rotate-0 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black motion-reduce:transition-none"
          >
            See work <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/oswaladitya/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#2A2438] px-6 py-[10px] text-sm font-bold text-[#2A2438] transition-colors hover:bg-[#2A2438] hover:text-[#FDFBF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 dark:rounded-lg dark:border dark:border-white/25 dark:font-mono dark:text-white dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
          >
            LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href="/r"
            className="px-2 py-3 text-sm font-semibold text-[var(--muted)] underline decoration-[#FF5C39] decoration-2 underline-offset-4 hover:text-[#2A2438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] dark:font-mono dark:decoration-white/40 dark:hover:text-white dark:focus-visible:ring-white"
          >
            Resume
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Focus areas">
          {PROOF.map((item, i) => (
            <li
              key={item}
              className={`rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs font-semibold text-[#2A2438] dark:rounded-md dark:bg-white/5 dark:font-mono dark:font-medium dark:text-white/70 ${
                i % 2 === 0 ? "-rotate-1" : "rotate-1"
              } dark:rotate-0`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
