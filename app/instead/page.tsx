import Link from "next/link";
import { ArrowRight, ArrowUpRight, Figma, Play, Presentation } from "lucide-react";

const LOOM_URL = "";
const PRESENTATION_URL =
  "https://docs.google.com/presentation/d/1TZURlb3_cpXzvMrEApRGSUkpryuZ_R8yJksIymIpoWA/edit?usp=sharing";
const FIGMA_URL = "https://www.figma.com/design/wNo5GKzuE5zmNkeB0PB5A5/Instead?node-id=40-3245";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24282C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F0]";

const LINKS = [
  { label: "Walkthrough video", hint: "A short Loom tour", href: LOOM_URL, Icon: Play },
  { label: "Presentation", hint: "Slides for the exercise", href: PRESENTATION_URL, Icon: Presentation },
  { label: "Figma file", hint: "Final design and exploration", href: FIGMA_URL, Icon: Figma },
];

export default function InsteadLanding() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col justify-center px-4 py-16 md:px-10 md:py-24">
      <p className="text-xs font-bold tracking-[0.14em] text-[#24282C]/60">
        INSTEAD · PRODUCT DESIGNER EXERCISE
      </p>
      <h1 className="mt-5 max-w-[16ch] font-[family-name:var(--font-baskerville)] text-[40px] leading-[1.08] md:text-[72px]">
        Reimagining how a Pro lands in Instead
      </h1>
      <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[#24282C]/75">
        A chat-first home where a Pro sees who needs them, what&apos;s running, and can start typing straight away.
      </p>
      <p className="mt-4 text-sm text-[#24282C]/60">Aditya Oswal · November 2026</p>

      <Link
        href="/instead/prototype"
        className={`group mt-10 flex items-center justify-between gap-4 rounded-[28px] bg-[#24282C] p-6 text-[#C2EF72] transition-colors hover:bg-black md:p-8 ${FOCUS}`}
      >
        <span>
          <span className="block font-[family-name:var(--font-baskerville)] text-2xl md:text-3xl">
            Open the prototype
          </span>
          <span className="mt-1 block text-sm text-[#C2EF72]/75">A clickable version of the final home screen</span>
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C2EF72] text-[#24282C] transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
          <ArrowRight className="h-5 w-5" aria-hidden />
        </span>
      </Link>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {LINKS.map(({ label, hint, href, Icon }) => {
          const disabled = !href;
          const body = (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-[#D6D5CB] bg-[#F7F6F0]">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="mt-6 block text-base font-bold">{label}</span>
              <span className="mt-1 block text-sm text-[#24282C]/60">{disabled ? "Coming soon" : hint}</span>
              {!disabled && (
                <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-[#24282C]/50" aria-hidden />
              )}
            </>
          );
          const base = "relative block rounded-[24px] border-[0.5px] border-[#D6D5CB] bg-[#FBFBF7] p-5";
          return disabled ? (
            <div key={label} aria-disabled="true" className={`${base} cursor-not-allowed opacity-60`}>
              {body}
            </div>
          ) : (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${base} transition-colors hover:border-[#24282C]/40 hover:bg-white motion-reduce:transition-none ${FOCUS}`}
            >
              {body}
            </a>
          );
        })}
      </div>
    </main>
  );
}
