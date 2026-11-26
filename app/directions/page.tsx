import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DIRECTIONS = [
  {
    href: "/directions/chat",
    name: "Chat",
    line: "Chat is the landing page. A short intro plays as messages, with quick replies that answer with work, projects and contact cards. Typed questions go to Adi.Os. Every page sits in the sidebar.",
  },
  {
    href: "/directions/workspace",
    name: "Workspace",
    line: "Closest to Instead. A sidebar with pages, work grouped by type and posts. Home is a greeting, the Adi.Os composer and tabbed lists. A profile panel sits on the right.",
  },
  {
    href: "/directions/console",
    name: "Console",
    line: "Dark and keyboard-first, like Linear. Work as a table or board with a peek panel, a ⌘K command menu, G + key to jump, a split view for writing and an experience timeline.",
  },
  {
    href: "/directions/overview",
    name: "Overview",
    line: "An analytics-style dashboard in the green light theme. Stat tiles, site updates per month from the changelog, an experience timeline, status card and work cards.",
  },
];

export default function DirectionsIndex() {
  return (
    <div className="min-h-screen bg-[#F6F8F3] px-5 py-16 text-[#090F05] [font-family:var(--font-geist)]">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#4A5B38]">Prototype · not linked from the site</p>
        <h1 className="mt-3 font-[family-name:var(--font-glyphic)] text-[40px] leading-tight">Dashboard directions</h1>
        <p className="mt-3 text-[16px] text-[#4A5B38]">The site as a product: every page is a tab in a sidebar. All four use the site’s real data.</p>
        <ul className="mt-10 flex flex-col gap-3">
          {DIRECTIONS.map((d, i) => (
            <li key={d.href}>
              <Link href={d.href} className="group flex gap-5 rounded-2xl border border-[#E2EADA] bg-white p-5 transition-colors hover:border-[#18280E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18280E]">
                <span className="font-mono text-[13px] text-[#4A5B38]">0{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[18px] font-semibold">
                    {d.name} <ArrowUpRight className="h-4 w-4 text-[#4A5B38] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-[#2E3D22]">{d.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
