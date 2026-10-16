"use client";

import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectMedia } from "./ProjectMedia";
import { indexLabel, projectVars, type Project } from "./shared";

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={projectVars(project)}
          >
            <Link
              href={project.href}
              className="group block h-full rounded-[1.75rem] border border-[var(--border)] bg-[var(--card)] p-3 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:-rotate-1 hover:[box-shadow:0_28px_50px_-20px_var(--sh-l)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0 dark:rounded-2xl dark:hover:rotate-0 dark:hover:[box-shadow:0_0_50px_-14px_var(--sh-d)] dark:focus-visible:ring-white"
            >
              <div className="aspect-[4/3] w-full rounded-[1.25rem] dark:rounded-xl">
                <ProjectMedia project={project} sizes="(max-width: 768px) 90vw, 45vw" />
              </div>
              <div className="px-3 pb-3 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm tabular-nums text-[var(--muted)]" aria-hidden="true">
                    {indexLabel(project)}
                  </span>
                  <span className="inline-block rounded-full bg-[var(--pastel)] px-3 py-1 text-sm font-medium text-[#2A2438] -rotate-2 dark:rotate-0 dark:rounded-none dark:bg-transparent dark:px-0 dark:py-0 dark:font-mono dark:uppercase dark:tracking-[0.12em] dark:text-white/60">
                    {project.category}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="text-3xl font-semibold leading-[1] tracking-[-0.04em] text-[#2A2438] md:text-4xl dark:text-white [font-family:var(--font-geist)]">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 h-6 w-6 shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2A2438] motion-reduce:transition-none dark:group-hover:text-white"
                  />
                </div>
                <p className="mb-0 mt-3 text-sm text-[var(--muted)] md:text-base">{project.description}</p>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </MotionConfig>
  );
}
