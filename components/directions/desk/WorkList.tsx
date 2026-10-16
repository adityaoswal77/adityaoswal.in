import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { FOCUS_RING, getCategories } from "./desk-utils";

export function WorkList() {
  return (
    <section aria-labelledby="work-heading" className="px-6 pb-24 pt-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between gap-6">
          <h2
            id="work-heading"
            className="text-3xl font-black tracking-tight text-[#2A2438] md:text-5xl dark:font-semibold dark:text-white"
          >
            Work
          </h2>
          <Link
            href="/directions/desk/work"
            className={`inline-flex items-center gap-1 rounded-full text-sm font-bold text-[#2A2438] underline decoration-[#FF5C39] decoration-2 underline-offset-4 dark:rounded-md dark:font-mono dark:text-white dark:decoration-violet-400 ${FOCUS_RING}`}
          >
            See the pinboard
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-[#E9E2F2] border-y border-[#E9E2F2] dark:divide-white/10 dark:border-white/10">
          {PROJECTS.map((project) => (
            <li key={project.id} className="grid gap-3 py-6 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#2A2438] dark:text-white">{project.title}</h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6E6580] dark:font-mono dark:text-white/60">
                  {getCategories(project).join(" / ")}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[#2A2438]/75 dark:text-white/65">{project.description}</p>
              <Link
                href={project.href}
                aria-label={`Open ${project.title}`}
                className={`inline-flex items-center gap-1 justify-self-start rounded-full text-sm font-bold text-[#2A2438] underline decoration-[#FF5C39] decoration-2 underline-offset-4 dark:rounded-md dark:font-mono dark:text-white dark:decoration-violet-400 ${FOCUS_RING}`}
              >
                Open
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
