import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DeskMedia } from "./DeskMedia";
import { HAND, getCategories, projectVars, type DeskProject } from "./desk-utils";

export function Polaroid({
  project,
  variant,
}: {
  project: DeskProject;
  variant: "canvas" | "stack";
}) {
  const categories = getCategories(project).join(" / ");
  const isStack = variant === "stack";

  return (
    <article
      style={projectVars(project)}
      className="relative select-none rounded-[1.5rem] dark:rounded-[1rem] bg-white p-3 pb-4 dark:bg-zinc-950 dark:border dark:border-white/10 [box-shadow:var(--sh)] dark:[box-shadow:var(--shd)] motion-safe:transition-shadow motion-safe:duration-300 group-data-[dragging=true]/item:[box-shadow:var(--shl)] dark:group-data-[dragging=true]/item:[box-shadow:var(--shdl)]"
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 rounded-[3px] border border-[#090F05]/10 bg-[var(--pastel)] opacity-90 dark:hidden"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-8 top-0 hidden h-px bg-[var(--accent)] shadow-[0_0_14px_2px_var(--accent)] dark:block"
      />

      <div className="relative aspect-[5/6] overflow-hidden rounded-[1rem] dark:rounded-[0.5rem] bg-[var(--pastel)] dark:bg-black dark:shadow-[inset_0_0_40px_-10px_var(--accent)]">
        <DeskMedia
          project={project}
          sizes={isStack ? "(max-width: 768px) 80vw, 320px" : "320px"}
        />
      </div>

      <div className="mt-3 px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#4A5B38] dark:font-mono dark:text-white/60">
          {categories}
        </p>
        <h3 className={`mt-1 text-xl leading-tight text-[#090F05] dark:text-base dark:text-white ${HAND}`}>
          {project.title}
        </h3>
        {isStack && (
          <p className="mt-2 text-sm leading-relaxed text-[#090F05]/75 dark:text-white/65">
            {project.description}
          </p>
        )}
        <Link
          href={project.href}
          draggable={false}
          aria-label={`Open ${project.title}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#090F05] underline decoration-[#B2EB76] decoration-2 underline-offset-4 focus-visible:outline-none after:absolute after:inset-0 after:rounded-[1.5rem] dark:after:rounded-[1rem] focus-visible:after:ring-2 focus-visible:after:ring-[#090F05] focus-visible:after:ring-offset-2 dark:text-white dark:decoration-[var(--accent)] dark:font-mono dark:focus-visible:after:ring-white dark:focus-visible:after:ring-offset-black"
        >
          Open
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
