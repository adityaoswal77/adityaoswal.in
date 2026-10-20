import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { ListHero } from "@/components/directions/list/ListHero";
import { WorkIndex } from "@/components/directions/list/WorkIndex";

export default function ListHomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--foreground)] selection:bg-[#B2EB76] selection:text-[#090F05] dark:selection:bg-white dark:selection:text-black">
      <ListHero />

      <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-[90rem] scroll-mt-24 px-6 pb-28">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="work-heading" className="text-5xl tracking-tight text-[#090F05] md:text-7xl dark:text-white">
            Work
          </h2>
          <Link
            href="/directions/list/work"
            className="group inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-medium text-[#090F05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] dark:text-white dark:focus-visible:ring-white"
          >
            All work
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
        <WorkIndex projects={PROJECTS} />
      </section>
    </main>
  );
}
