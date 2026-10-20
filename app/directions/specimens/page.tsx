import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { SpecimenHero } from "@/components/specimens/SpecimenHero";
import { SpecimenCard } from "@/components/specimens/SpecimenCard";

export default function SpecimensHomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#B2EB76] selection:text-[#090F05] dark:selection:bg-indigo-500 dark:selection:text-white">
      <SpecimenHero />

      <section id="work" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Work</h2>
            <p className="mt-2 text-[var(--muted)]">Use each piece, then read the case study behind it.</p>
          </div>
          <Link
            href="/directions/specimens/work"
            className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#B2EB76] decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:font-mono dark:decoration-white/40 dark:focus-visible:ring-white"
          >
            All work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <SpecimenCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
