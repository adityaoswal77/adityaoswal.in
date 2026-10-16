"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { DeskMedia } from "./DeskMedia";
import {
  FOCUS_RING,
  HAND,
  getAllCategories,
  getCategories,
  projectVars,
  type DeskProject,
} from "./desk-utils";

const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

function Pin() {
  return (
    <>
      <svg
        viewBox="0 0 32 40"
        aria-hidden="true"
        className="absolute -top-4 left-1/2 z-10 h-10 w-8 -translate-x-1/2 drop-shadow-[0_6px_4px_rgba(255,92,57,0.35)] dark:hidden"
      >
        <path d="M16 30v9" stroke="#2A2438" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="14" r="12" fill="#FF5C39" stroke="#2A2438" strokeWidth="2.5" />
        <circle cx="12" cy="10" r="3.5" fill="#FDFBF7" opacity="0.7" />
      </svg>
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_3px_var(--accent)] dark:block"
      />
    </>
  );
}

function PinCard({ project, index }: { project: DeskProject; index: number }) {
  return (
    <article
      style={projectVars(project)}
      className={`relative rounded-[1.5rem] dark:rounded-[1rem] bg-white p-3 pb-5 dark:border dark:border-white/10 dark:bg-zinc-950 [box-shadow:var(--sh)] dark:[box-shadow:var(--shd)] ${TILTS[index % TILTS.length]} motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-2 hover:rotate-0 hover:[box-shadow:var(--shl)] focus-within:-translate-y-2 focus-within:rotate-0 focus-within:[box-shadow:var(--shl)] dark:hover:[box-shadow:var(--shdl)] dark:focus-within:[box-shadow:var(--shdl)]`}
    >
      <Pin />
      <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-[1rem] dark:rounded-[0.5rem] bg-[var(--pastel)] dark:bg-black dark:shadow-[inset_0_0_40px_-10px_var(--accent)]">
        <DeskMedia project={project} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px" />
      </div>
      <div className="mt-4 px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6E6580] dark:font-mono dark:text-white/60">
          {getCategories(project).join(" / ")}
        </p>
        <h2 className={`mt-1 text-xl leading-tight text-[#2A2438] dark:text-base dark:text-white ${HAND}`}>
          {project.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#2A2438]/75 dark:text-white/65">{project.description}</p>
        <Link
          href={project.href}
          aria-label={`Open ${project.title}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2A2438] underline decoration-[#FF5C39] decoration-2 underline-offset-4 focus-visible:outline-none after:absolute after:inset-0 after:rounded-[1.5rem] dark:after:rounded-[1rem] focus-visible:after:ring-2 focus-visible:after:ring-[#2A2438] focus-visible:after:ring-offset-2 dark:font-mono dark:text-white dark:decoration-[var(--accent)] dark:focus-visible:after:ring-white dark:focus-visible:after:ring-offset-black"
        >
          Open
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function Pinboard() {
  const [selected, setSelected] = useState("All");
  const categories = useMemo(() => ["All", ...getAllCategories()], []);
  const filtered = useMemo(
    () => (selected === "All" ? PROJECTS : PROJECTS.filter((p) => getCategories(p).includes(selected))),
    [selected]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.9] tracking-tight text-[#2A2438] dark:font-semibold dark:text-white">
              Work
            </h1>
            <p className="mt-4 max-w-md text-base font-medium text-[#6E6580] dark:font-mono dark:text-sm dark:text-white/60">
              Everything pinned in one place. Pick a category to filter the board.
            </p>
          </div>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = selected === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(category)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors dark:rounded-md dark:font-mono ${FOCUS_RING} ${
                    active
                      ? "-rotate-1 border-[#2A2438] bg-[#FF5C39] text-[#2A2438] dark:rotate-0 dark:border-violet-400/60 dark:bg-violet-500/15 dark:text-violet-200"
                      : "border-[#2A2438]/25 bg-white/70 text-[#2A2438] hover:border-[#2A2438] dark:border-white/15 dark:bg-transparent dark:text-white/70 dark:hover:border-white/40"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <p role="status" className="sr-only">
          Showing {filtered.length} of {PROJECTS.length} projects
        </p>

        <div className="mt-12 rounded-[1.5rem] border border-[#2A2438]/10 bg-[#F1E1C0] p-6 shadow-[0_24px_50px_-24px_rgba(255,92,57,0.45)] [background-image:radial-gradient(rgba(150,110,60,0.22)_1px,transparent_1.2px),radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1.2px)] [background-position:0_0,9px_11px] [background-size:18px_18px,23px_23px] md:p-10 dark:rounded-[1rem] dark:border-white/10 dark:bg-black dark:shadow-none dark:[background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:[background-position:0_0] dark:[background-size:40px_40px]">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <PinCard project={project} index={index} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </MotionConfig>
  );
}
