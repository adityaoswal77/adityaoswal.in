import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

const LOOM_URL = "";
const WEBSITE_URL = "";

export const metadata: Metadata = {
  title: "Flex Assignment",
  description: "Loom walkthrough and live website for the Flex assignment.",
  robots: { index: false, follow: false },
};

function getLoomEmbedUrl(url: string): string | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (!/(^|\.)loom\.com$/.test(hostname)) return null;
    const match = pathname.match(/^\/(?:share|embed)\/([a-zA-Z0-9]+)/);
    return match ? `https://www.loom.com/embed/${match[1]}` : null;
  } catch {
    return null;
  }
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function FlexPage() {
  const embedUrl = LOOM_URL ? getLoomEmbedUrl(LOOM_URL) : null;

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-32 md:pt-40">
      <p className="mb-3 text-sm text-[var(--muted)]">Aditya Oswal</p>
      <h1 className="mb-4 font-sans text-4xl font-semibold leading-tight tracking-tight text-[var(--foreground)] md:text-5xl">
        Flex assignment
      </h1>
      <p className="mb-12 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
        A walkthrough of my approach and the live website.
      </p>

      <section aria-labelledby="flex-loom" className="mb-12">
        <h2
          id="flex-loom"
          className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-[var(--muted)]"
        >
          Walkthrough
        </h2>
        {embedUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] dark:rounded-2xl">
            <iframe
              src={embedUrl}
              title="Flex assignment walkthrough on Loom"
              allowFullScreen
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--card)] text-sm text-[var(--muted)] dark:rounded-2xl">
            Loom walkthrough coming soon
          </div>
        )}
      </section>

      <section aria-labelledby="flex-website">
        <h2
          id="flex-website"
          className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-[var(--muted)]"
        >
          Website
        </h2>
        {WEBSITE_URL ? (
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[#2A2438]/30 dark:rounded-2xl dark:hover:border-white/30"
          >
            <span className="min-w-0">
              <span className="block truncate font-semibold text-[var(--foreground)]">
                {getDomain(WEBSITE_URL)}
              </span>
              <span className="block text-sm text-[var(--muted)]">Open the live site</span>
            </span>
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[#2A2438]/5 transition-colors group-hover:bg-[#2A2438] group-hover:text-[#FDFBF7] dark:bg-white/5 dark:group-hover:bg-white dark:group-hover:text-black">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)] dark:rounded-2xl">
            Website link coming soon
          </div>
        )}
      </section>
    </div>
  );
}
