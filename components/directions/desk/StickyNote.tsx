import { ArrowUpRight } from "lucide-react";
import { HAND, LINKEDIN_URL, RESUME_URL } from "./desk-utils";

const LINK =
  "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8F3DA] dark:rounded-md dark:font-mono dark:focus-visible:ring-white dark:focus-visible:ring-offset-black";

export function StickyNote() {
  return (
    <div className="relative select-none rounded-[1.5rem] rounded-br-[2.5rem] dark:rounded-[1rem] bg-[#E8F3DA] p-6 pt-8 shadow-[0_22px_34px_-14px_rgba(255,92,57,0.5)] dark:border dark:border-violet-400/40 dark:bg-black dark:p-0 dark:shadow-[0_0_44px_-8px_rgba(139,92,246,0.6)]">
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 rounded-[3px] border border-[#090F05]/10 bg-[#FFD6E0] opacity-90 dark:hidden"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-10 w-10 rounded-br-[2.5rem] [background:linear-gradient(135deg,transparent_50%,rgba(255,92,57,0.28)_50%)] dark:hidden"
      />
      <div
        aria-hidden="true"
        className="hidden items-center gap-1.5 border-b border-violet-400/30 px-4 py-2.5 dark:flex"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-violet-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet-400/30" />
        <span className="ml-2 font-mono text-[11px] text-violet-300/80">hello.txt</span>
      </div>
      <div className="dark:p-5">
        <p className={`text-lg leading-snug text-[#090F05] dark:text-sm dark:leading-relaxed dark:text-white ${HAND}`}>
          <span aria-hidden="true" className="hidden text-violet-300 dark:inline">
            &gt;{" "}
          </span>
          Hi, I&apos;m Aditya — product designer at AliveCor. I design and build healthcare products and design
          systems.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            className={`${LINK} bg-[#B2EB76] text-[#090F05] dark:border dark:border-violet-400/50 dark:bg-violet-500/10 dark:text-violet-200 dark:hover:bg-violet-500/25`}
          >
            LinkedIn
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            className={`${LINK} border-2 border-[#090F05] text-[#090F05] dark:border dark:border-white/30 dark:text-white dark:hover:bg-white/10`}
          >
            Resume
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
