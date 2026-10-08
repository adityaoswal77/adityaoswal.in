import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

const EMBED_URL = "https://adi-os.neetorecord.com/embeds/162f1ea8-fcd6-40d5-b03d-032c44dfccae";

const LINKS = [
  {
    label: "Live website",
    description: "The finished site",
    url: "https://flex-academy-aditya-oswal.figma.site/",
  },
  {
    label: "Walkthrough recording",
    description: "Recording of my walkthrough",
    url: "https://adi-os.neetorecord.com/watch/245bc47ef4656e5bc089",
  },
  {
    label: "Figma file",
    description: "Design file with all the assets",
    url: "https://www.figma.com/design/8WB6IBaP5E26i35GE8PAzk/Aditya-Oswal-for-Flex?node-id=0-1",
  },
];

export const metadata: Metadata = {
  title: "Flex Assignment",
  description: "Live website, walkthrough recording and Figma file for the Flex assignment.",
  robots: { index: false, follow: false },
};

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function FlexPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-24 pt-32 md:pt-40">
      <p className="mb-3 text-sm text-[var(--muted)]">Aditya Oswal</p>
      <h1 className="mb-4 font-sans text-4xl font-semibold leading-tight tracking-tight text-[var(--foreground)] md:text-5xl">
        Flex assignment
      </h1>
      <p className="mb-12 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
        The live website, a recording walking through it, and the Figma file with all the assets.
      </p>

      <div className="mb-8 aspect-video w-full overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] dark:rounded-2xl">
        <iframe
          src={EMBED_URL}
          title="Flex assignment walkthrough recording"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>

      <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] dark:rounded-2xl">
        {LINKS.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[#2A2438]/[0.03] dark:hover:bg-white/[0.04]"
            >
              <span className="min-w-0">
                <span className="block font-semibold text-[var(--foreground)]">{link.label}</span>
                <span className="block text-sm text-[var(--muted)]">{link.description}</span>
                <span className="mt-1 block truncate text-xs text-[var(--muted)]">
                  {getDomain(link.url)}
                </span>
              </span>
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[#2A2438]/5 transition-colors group-hover:bg-[#2A2438] group-hover:text-[#FDFBF7] dark:bg-white/5 dark:group-hover:bg-white dark:group-hover:text-black">
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
