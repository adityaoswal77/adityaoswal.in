"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { SpecimenCard } from "./SpecimenCard";

export function SpecimenWork() {
  const [selected, setSelected] = useState("All");
  const reduce = useReducedMotion();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => (Array.isArray(p.category) ? p.category : [p.category]))))],
    []
  );

  const filtered = useMemo(
    () =>
      selected === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => (Array.isArray(p.category) ? p.category : [p.category]).includes(selected)),
    [selected]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pt-40">
      <h1 className="text-4xl font-black tracking-tight text-[#090F05] dark:text-white md:text-6xl">Work</h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        Each project comes with a small working piece of it. Filter by type, try it, then read the case study.
      </p>

      <div role="group" aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
        {categories.map((category, i) => (
          <button
            key={category}
            type="button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:rounded-md dark:font-mono dark:focus-visible:ring-white ${
              selected === category
                ? "-rotate-1 border-[#090F05] bg-[#B2EB76] text-[#090F05] dark:rotate-0 dark:border-white dark:bg-white dark:text-black"
                : `${i % 2 ? "rotate-1" : "-rotate-1"} border-[var(--border)] bg-white/70 text-[#4A5B38] hover:text-[#090F05] dark:rotate-0 dark:bg-transparent dark:text-zinc-400 dark:hover:text-white`
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            >
              <SpecimenCard project={project} size="lg" index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
