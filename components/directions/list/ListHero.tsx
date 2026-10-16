import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactiveName } from "./ReactiveName";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] dark:focus-visible:ring-white";

const META_CARD =
  "rounded-2xl px-5 py-4 dark:rounded-none dark:bg-transparent dark:px-0 dark:pt-4 dark:pb-0 dark:border-t dark:border-white/15 dark:rotate-0";

export function ListHero() {
  return (
    <section className="relative mx-auto max-w-[90rem] px-6 pb-16 pt-32 md:pb-24 md:pt-40">
      <ReactiveName className="text-[clamp(5rem,24vw,17rem)] font-normal leading-[0.82] tracking-[-0.03em] text-[#2A2438] dark:text-white" />

      <div className="mt-10 grid gap-10 md:mt-16 lg:grid-cols-12">
        <p className="mb-0 text-xl leading-snug text-[#2A2438] md:text-3xl lg:col-span-7 dark:text-white">
          Product designer at AliveCor. I design and build healthcare products and design systems. Based in
          Bangalore.
        </p>
        <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
          <a
            href="https://www.linkedin.com/in/oswaladitya/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full bg-[#FF5C39] px-6 py-3 font-semibold text-[#2A2438] shadow-[0_10px_30px_-10px_rgba(255,92,57,0.6)] transition-transform hover:-rotate-1 dark:bg-white dark:text-black dark:shadow-none dark:hover:rotate-0 ${FOCUS}`}
          >
            LinkedIn
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href="/r"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border border-[#2A2438]/30 px-6 py-3 font-semibold text-[#2A2438] transition-transform hover:-rotate-1 dark:border-white/25 dark:text-white dark:hover:rotate-0 ${FOCUS}`}
          >
            Resume
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>

      <dl className="mt-14 grid gap-4 sm:grid-cols-3 md:mt-20">
        <div className={`bg-[#FFE8A3] -rotate-1 ${META_CARD}`}>
          <dt className="text-sm text-[#2A2438]/60 dark:font-mono dark:uppercase dark:tracking-[0.12em] dark:text-white/50">
            Currently
          </dt>
          <dd className="m-0 mt-1 text-lg font-medium text-[#2A2438] dark:text-white">AliveCor</dd>
        </div>
        <div className={`bg-[#CBD5FF] rotate-1 ${META_CARD}`}>
          <dt className="text-sm text-[#2A2438]/60 dark:font-mono dark:uppercase dark:tracking-[0.12em] dark:text-white/50">
            Based
          </dt>
          <dd className="m-0 mt-1 text-lg font-medium text-[#2A2438] dark:text-white">Bangalore</dd>
        </div>
        <div className={`bg-[#FFD6E0] -rotate-[0.5deg] ${META_CARD}`}>
          <dt className="text-sm text-[#2A2438]/60 dark:font-mono dark:uppercase dark:tracking-[0.12em] dark:text-white/50">
            Also
          </dt>
          <dd className="m-0 mt-1 text-lg font-medium text-[#2A2438] dark:text-white">
            <Link
              href="/projects"
              className="underline decoration-[#2A2438]/40 underline-offset-4 hover:decoration-[#2A2438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] dark:decoration-white/40 dark:hover:decoration-white dark:focus-visible:ring-white"
            >
              Side projects
            </Link>{" "}
            &amp;{" "}
            <Link
              href="/writing"
              className="underline decoration-[#2A2438]/40 underline-offset-4 hover:decoration-[#2A2438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] dark:decoration-white/40 dark:hover:decoration-white dark:focus-visible:ring-white"
            >
              writing
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}
