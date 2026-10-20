"use client";

import { useId, useRef, useState } from "react";
import type { FocusEvent } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { CursorPreview } from "./CursorPreview";
import { ProjectMedia } from "./ProjectMedia";
import {
  HIDE_ON_HOVER_DEVICES,
  SHOW_ON_HOVER_DEVICES,
  indexLabel,
  projectVars,
  useHoverCapable,
  type Project,
} from "./shared";
import { useCursorFollow } from "./useCursorFollow";

const TITLE_SIZE = {
  home: "text-[clamp(2.5rem,7.2vw,6rem)]",
  page: "text-[clamp(2.75rem,9vw,8rem)]",
};

function CategoryChip({ category, className = "" }: { category: string; className?: string }) {
  return (
    <span
      className={`inline-block w-fit whitespace-nowrap rounded-full bg-[var(--pastel)] px-3 py-1 text-sm font-medium text-[#090F05] -rotate-2 dark:rotate-0 dark:rounded-none dark:bg-transparent dark:px-0 dark:py-0 dark:font-mono dark:uppercase dark:tracking-[0.12em] dark:text-white/60 ${className}`}
    >
      {category}
    </span>
  );
}

function Row({
  project,
  size,
  isActive,
  dimmed,
  canHover,
  reduced,
  animateIn,
  onActivate,
  onFocusRow,
}: {
  project: Project;
  size: "home" | "page";
  isActive: boolean;
  dimmed: boolean;
  canHover: boolean;
  reduced: boolean;
  animateIn: boolean;
  onActivate: (id: number, el: HTMLElement) => void;
  onFocusRow: (id: number, el: HTMLElement) => void;
}) {
  const [open, setOpen] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);
  const panelId = useId();
  const showPanel = open && !canHover;

  return (
    <motion.li
      ref={liRef}
      initial={animateIn ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-active={isActive ? "true" : "false"}
      style={projectVars(project)}
      className="group"
      onPointerEnter={(e) => {
        if (!canHover || e.pointerType !== "mouse") return;
        const el = liRef.current;
        if (el) onActivate(project.id, el);
      }}
      onFocus={(e: FocusEvent<HTMLLIElement>) => {
        if (!canHover || !e.target.matches(":focus-visible")) return;
        const el = liRef.current;
        if (el) onFocusRow(project.id, el);
      }}
    >
      <div className="relative flex items-start gap-4 py-7 md:grid md:grid-cols-[4.5rem_minmax(0,1fr)_auto_3rem] md:items-center md:gap-x-6 md:py-10">
        <span
          aria-hidden="true"
          className="hidden font-mono text-sm tabular-nums text-[var(--muted)] transition-[color,text-shadow] duration-300 group-data-[active=true]:text-[#090F05] md:block dark:group-data-[active=true]:[color:color-mix(in_srgb,var(--accent)_55%,white)] dark:group-data-[active=true]:[text-shadow:0_0_18px_var(--accent)]"
        >
          {indexLabel(project)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-3 md:hidden">
            <span aria-hidden="true" className="font-mono text-sm tabular-nums text-[var(--muted)]">
              {indexLabel(project)}
            </span>
            <CategoryChip category={project.category} />
          </div>
          <h3 className={`${TITLE_SIZE[size]} font-semibold leading-[0.98] tracking-[-0.045em] [font-family:var(--font-geist)]`}>
            <Link
              href={project.href}
              className="text-[#090F05] outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-[#090F05] dark:text-white dark:focus-visible:after:ring-white dark:group-data-[active=true]:[text-shadow:0_0_36px_var(--accent)]"
            >
              <span className="bg-no-repeat transition-[background-size] duration-500 ease-out [-webkit-box-decoration-break:clone] [background-image:linear-gradient(var(--pastel),var(--pastel))] [background-position:0_88%] [background-size:0%_58%] [box-decoration-break:clone] group-data-[active=true]:[background-size:100%_58%] motion-reduce:transition-none dark:[background-image:none]">
                {project.title}
              </span>
            </Link>
          </h3>
          <p className="mb-0 mt-3 max-w-xl text-sm text-[var(--muted)] md:text-base">{project.description}</p>
        </div>

        <CategoryChip category={project.category} className="hidden md:inline-block" />

        <div className="flex shrink-0 items-center justify-end">
          <ArrowUpRight
            aria-hidden="true"
            className={`${SHOW_ON_HOVER_DEVICES} h-7 w-7 text-[var(--muted)] transition-[transform,color] duration-300 group-data-[active=true]:-translate-y-1 group-data-[active=true]:translate-x-1 group-data-[active=true]:text-[#090F05] md:h-9 md:w-9 dark:group-data-[active=true]:text-white`}
          />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className={`relative z-10 ${HIDE_ON_HOVER_DEVICES} grid h-11 w-11 place-items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] dark:focus-visible:ring-white ${
              open
                ? "border-transparent bg-[#B2EB76] text-[#090F05] dark:bg-white dark:text-black"
                : "border-[#090F05]/25 text-[#090F05] dark:border-white/25 dark:text-white"
            }`}
          >
            <Plus
              aria-hidden="true"
              className={`h-5 w-5 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-45" : ""}`}
            />
            <span className="sr-only">
              {open ? "Hide" : "Show"} preview of {project.title}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showPanel && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pl-[6rem]">
              <div className="relative aspect-[4/3] w-full max-w-md -rotate-1 rounded-[1.5rem] [box-shadow:0_24px_50px_-20px_var(--sh-l)] dark:rotate-0 dark:rounded-2xl dark:[box-shadow:0_0_50px_-14px_var(--sh-d)]">
                <ProjectMedia project={project} sizes="(max-width: 768px) 90vw, 448px" />
              </div>
              <Link
                href={project.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B2EB76] px-5 py-3 text-sm font-semibold text-[#090F05] transition-transform hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] dark:bg-white dark:text-black dark:hover:rotate-0 dark:focus-visible:ring-white"
              >
                Read case study
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function WorkIndex({
  projects,
  size = "home",
  animateIn = false,
}: {
  projects: Project[];
  size?: "home" | "page";
  animateIn?: boolean;
}) {
  const reduced = !!useReducedMotion();
  const canHover = useHoverCapable();
  const follow = useCursorFollow(reduced);
  const [activeId, setActiveId] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

  const activate = (id: number, el: HTMLElement) => {
    setActiveId(id);
    if (reduced) follow.placeAtRow(el);
  };

  const focusRow = (id: number, el: HTMLElement) => {
    setActiveId(id);
    follow.placeAtRow(el);
  };

  return (
    <MotionConfig reducedMotion="user">
      <ul
        ref={listRef}
        className="divide-y divide-[var(--border)] border-y border-[var(--border)]"
        onPointerEnter={follow.onPointerEnter}
        onPointerMove={follow.onPointerMove}
        onPointerLeave={() => setActiveId(null)}
        onBlur={(e) => {
          if (!listRef.current?.contains(e.relatedTarget as Node | null)) setActiveId(null);
        }}
      >
        {projects.map((project) => (
          <Row
            key={project.id}
            project={project}
            size={size}
            isActive={project.id === activeId}
            dimmed={canHover && activeId !== null && project.id !== activeId}
            canHover={canHover}
            reduced={reduced}
            animateIn={animateIn}
            onActivate={activate}
            onFocusRow={focusRow}
          />
        ))}
      </ul>
      {canHover && <CursorPreview project={active} x={follow.x} y={follow.y} tilt={follow.tilt} reduced={reduced} />}
    </MotionConfig>
  );
}
