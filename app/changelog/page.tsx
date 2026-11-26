import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CHANGELOG, type ChangeType } from "@/lib/changelog";

const TYPE_STYLES: Record<ChangeType, { label: string; className: string }> = {
  fix:      { label: "fix",      className: "text-orange-400 border-orange-400/30 bg-orange-400/5" },
  feat:     { label: "feat",     className: "text-indigo-400 border-indigo-400/30 bg-indigo-400/5" },
  refactor: { label: "refactor", className: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
  perf:     { label: "perf",     className: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5" },
  content:  { label: "content",  className: "text-teal-400   border-teal-400/30   bg-teal-400/5"   },
  seo:      { label: "seo",      className: "text-green-400  border-green-400/30  bg-green-400/5"  },
  security: { label: "security", className: "text-red-400    border-red-400/30    bg-red-400/5"    },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
      <div className="max-w-3xl mx-auto px-6 py-32">

        {/* Header */}
        <div className="mb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-12 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[13px] uppercase tracking-widest"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-[var(--muted)]">
              adityaoswal.in
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[var(--foreground)] leading-[0.9] mb-6">
            Changelog
          </h1>
          <p className="text-[var(--muted)] font-medium text-lg max-w-xl leading-relaxed">
            A running log of updates, fixes, and improvements to this site.
            Synced with git commits.
          </p>
        </div>

        {/* Entries */}
        <div className="space-y-0">
          {CHANGELOG.map((entry, i) => (
            <div key={entry.hash} className="relative">
              {/* Timeline line */}
              {i < CHANGELOG.length - 1 && (
                <div className="absolute left-[7px] top-10 bottom-0 w-px bg-[var(--border)]" />
              )}

              <div className="flex gap-6 pb-16">
                {/* Dot */}
                <div className="flex-none mt-2.5">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[var(--foreground)] bg-[var(--background)]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-4">
                    <time
                      dateTime={entry.date}
                      className="font-mono text-[13px] text-[var(--muted)] tracking-wider"
                    >
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <a
                      href={`https://github.com/adityaoswal77/adityaoswal.in/commit/${entry.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[12px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {entry.hash}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>

                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-5 leading-snug">
                    {entry.title}
                  </h2>

                  <ul className="space-y-3">
                    {entry.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3">
                        {change.type && (
                          <span
                            className={`flex-none mt-0.5 font-mono text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${TYPE_STYLES[change.type].className}`}
                          >
                            {TYPE_STYLES[change.type].label}
                          </span>
                        )}
                        <span className="text-[var(--muted)] text-[15px] leading-relaxed font-medium">
                          {change.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="border-t border-[var(--border)] pt-12 mt-4">
          <p className="font-mono text-[13px] text-[var(--muted)] tracking-wider">
            Older commits available on{" "}
            <a
              href="https://github.com/adityaoswal77/adityaoswal.in/commits/main"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:opacity-70 transition-opacity inline-flex items-center gap-1"
            >
              GitHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
