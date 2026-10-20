"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { WorkGrid } from "./WorkGrid";
import { WorkIndex } from "./WorkIndex";

type View = "list" | "grid";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] dark:focus-visible:ring-white";

export function WorkExplorer() {
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<View>("list");

  const categories = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))], []);
  const projects = useMemo(
    () => (category === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === category)),
    [category]
  );

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-[transform,colors] dark:font-mono dark:uppercase dark:tracking-[0.1em] ${FOCUS} ${
                  on
                    ? "-rotate-1 border-transparent bg-[#B2EB76] text-[#090F05] dark:rotate-0 dark:border-white dark:bg-white dark:text-black"
                    : "border-[#090F05]/25 text-[#090F05] hover:border-[#090F05] dark:border-white/20 dark:text-white/70 dark:hover:border-white/50 dark:hover:text-white"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div
          role="group"
          aria-label="View"
          className="inline-flex w-fit rounded-full border border-[#090F05]/25 p-1 dark:border-white/20"
        >
          {(
            [
              { id: "list", label: "List", Icon: List },
              { id: "grid", label: "Grid", Icon: LayoutGrid },
            ] as const
          ).map(({ id, label, Icon }) => {
            const on = view === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setView(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors dark:font-mono dark:uppercase dark:tracking-[0.1em] ${FOCUS} ${
                  on
                    ? "bg-[#090F05] text-[#FFFFFF] dark:bg-white dark:text-black"
                    : "text-[#090F05] hover:bg-[#090F05]/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" role="status">
        Showing {projects.length} {projects.length === 1 ? "project" : "projects"}
      </p>

      {view === "list" ? (
        <WorkIndex key={`list-${category}`} projects={projects} size="page" animateIn />
      ) : (
        <WorkGrid key={`grid-${category}`} projects={projects} />
      )}
    </div>
  );
}
