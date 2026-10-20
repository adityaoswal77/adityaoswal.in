"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { GuestStepper } from "./GuestStepper";
import { TokenPlayground } from "./TokenPlayground";
import { PlacesMini } from "./PlacesMini";
import { BrowserScroller } from "./BrowserScroller";

type Project = (typeof PROJECTS)[number];

function Specimen({ project, size }: { project: Project; size: "sm" | "lg" }) {
  switch (project.href) {
    case "/work/guest-user":
      return <GuestStepper size={size} accent={project.accent} />;
    case "/work/kardia-design-system":
      return <TokenPlayground size={size} />;
    case "/playground/interestingplaces":
      return <PlacesMini video={project.mockup} size={size} />;
    case "/playground/freshfolios":
      return <BrowserScroller src={project.mockup} size={size} />;
    default:
      return null;
  }
}

export function SpecimenCard({ project, size = "sm", index = 0 }: { project: Project; size?: "sm" | "lg"; index?: number }) {
  const categories = Array.isArray(project.category) ? project.category : [project.category];
  const tilt = index % 2 === 0 ? "-rotate-2" : "rotate-1";

  const vars = {
    "--sp-pastel": project.pastel,
    "--sp-line": `${project.accent}40`,
    "--sp-shadow": `${project.accent}59`,
  } as CSSProperties;

  const text = (
    <div className={size === "lg" ? "lg:max-w-xs lg:pt-2" : ""}>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`${tilt} inline-block rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#090F05] shadow-[0_3px_0_var(--sp-shadow)] dark:rotate-0 dark:rounded-md dark:border dark:border-white/15 dark:bg-transparent dark:font-mono dark:font-medium dark:text-white/60 dark:shadow-none`}
          >
            {cat}
          </span>
        ))}
      </div>
      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#090F05] dark:text-white md:text-3xl">{project.title}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-[#090F05]/75 dark:text-white/60">{project.description}</p>
    </div>
  );

  const link = (
    <Link
      href={project.href}
      className="inline-flex items-center gap-2 self-start rounded-full bg-[#B2EB76] px-5 py-2.5 text-sm font-bold text-[#090F05] shadow-[0_6px_0_-2px_var(--sp-shadow)] transition-transform hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 dark:rounded-lg dark:bg-white dark:font-mono dark:text-black dark:shadow-none dark:hover:rotate-0 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black motion-reduce:transition-none"
    >
      Read case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only"> for {project.title}</span>
    </Link>
  );

  return (
    <article
      style={vars}
      className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--sp-line)] bg-[var(--sp-pastel)] p-5 shadow-[0_24px_50px_-26px_var(--sp-shadow)] dark:rounded-[1rem] dark:border-white/10 dark:bg-[var(--card)] dark:shadow-none sm:p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ backgroundImage: `radial-gradient(60% 45% at 0% 0%, ${project.accent}26, transparent)` }}
        aria-hidden="true"
      />
      <div className={`relative flex flex-1 flex-col gap-5 ${size === "lg" ? "lg:flex-row lg:items-stretch lg:gap-10" : ""}`}>
        <div className={`flex flex-col justify-between gap-5 ${size === "lg" ? "lg:w-72 lg:shrink-0" : ""}`}>
          {text}
          {size === "lg" && <div className="hidden lg:block">{link}</div>}
        </div>
        <div className="min-w-0 flex-1 rounded-[1.25rem] border border-white/70 bg-white/60 dark:rounded-[0.75rem] dark:border-white/10 dark:bg-black/40">
          <Specimen project={project} size={size} />
        </div>
        <div className={size === "lg" ? "lg:hidden" : ""}>{link}</div>
      </div>
    </article>
  );
}
