import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DIRECTIONS = [
  {
    href: "/directions/specimens",
    title: "A. Live specimens",
    description: "Each project card holds a small working piece of the real thing.",
  },
  {
    href: "/directions/list",
    title: "B. Editorial index",
    description: "A big typographic list with cursor-following previews.",
  },
  {
    href: "/directions/desk",
    title: "C. Desk",
    description: "Draggable project polaroids, sticky notes and stickers on one canvas.",
  },
];

export default function DirectionsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 pt-36 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-sans text-4xl md:text-5xl font-semibold tracking-tight">Design directions</h1>
        <p className="mt-4 text-[var(--muted)]">
          Three versions of the homepage and work page. Each one works in light and dark.
        </p>
        <ul className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {DIRECTIONS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex items-center justify-between gap-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] dark:focus-visible:ring-white rounded"
              >
                <div>
                  <p className="text-xl font-semibold">{d.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d.description}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Work page: <span className="underline underline-offset-2">{d.href}/work</span>
                  </p>
                </div>
                <ArrowUpRight
                  className="w-5 h-5 shrink-0 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
