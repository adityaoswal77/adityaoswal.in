import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type ChangeType = "fix" | "feat" | "refactor" | "perf" | "content" | "seo" | "security";

interface Change {
  description: string;
  type?: ChangeType;
}

interface Entry {
  date: string;
  hash: string;
  title: string;
  changes: Change[];
}

const CHANGELOG: Entry[] = [
  {
    date: "2026-05-03",
    hash: "utm-redirects",
    title: "UTM tracking short links",
    changes: [
      { type: "feat", description: "Add /linkedin, /twitter, /instagram, /github, /luma, /resume short links — each redirects to /?utm_source=<platform>&utm_medium=<type> for Vercel Analytics tracking" },
      { type: "seo", description: "utm_medium set per platform type (social, profile, event, document) for richer traffic segmentation in analytics" },
    ],
  },
  {
    date: "2026-04-27",
    hash: "86ac50a",
    title: "Adi.Os — security, rate limiting, logging & content updates",
    changes: [
      { type: "feat", description: "Persist chat logs to Vercel Blob (logs/YYYY-MM-DD/*.json) — permanent storage, zero cost, fire-and-forget so it never slows the stream" },
      { type: "feat", description: "Protected /api/admin/logs endpoint — filter by date, paginate, and purge old entries via DELETE" },
      { type: "feat", description: "10-message session rate limit with X/10 counter in the UI; input swaps to a friendly note when the limit is hit" },
      { type: "security", description: "XSS fix: renderWithLinks now only allows https:// URLs, blocking javascript: and data: URI injection from model output" },
      { type: "security", description: "Server-side request validation: reject malformed bodies, cap message history to 10, truncate each message to 500 chars" },
      { type: "security", description: "System prompt hardened against prompt injection, persona switching, jailbreaks, and system prompt disclosure" },
      { type: "fix", description: "Resume link in chatbot now renders as a clickable hyperlink; Navbar resume button fixed from stale Google Drive folder to correct Google Doc URL" },
      { type: "content", description: "Certifications in Adi.Os system prompt updated from LinkedIn — 9 certs with issuers and dates (was 3-item stub)" },
    ],
  },
  {
    date: "2026-04-27",
    hash: "09b1440",
    title: "WanderingCharacter — pause toggle & ambient speech bubbles",
    changes: [
      { type: "feat", description: "Add pause/resume button (top-right, desktop only) — docks the pixel character to the bottom-center of the screen and stops wandering" },
      { type: "feat", description: "Pulsing ping ring on the pause button until first click; expands to show '— click to stop Adi.Os' for the first few seconds" },
      { type: "feat", description: "Character shows an intro speech bubble on mount: 'you can pause me by clicking on the top right'" },
      { type: "feat", description: "Character randomly pops a speech bubble every 8–15 s while wandering (suppressed when paused, hovering, or chatting)" },
      { type: "fix", description: "Clear random-exclamation state when opening chat so bubble can't flash back after drawer closes" },
      { type: "fix", description: "Reposition docked character on window resize so it stays centred at the bottom" },
    ],
  },
  {
    date: "2026-04-25",
    hash: "8434654",
    title: "Adi.Os — Claude-powered chat drawer",
    changes: [
      { type: "feat", description: "Add Adi.Os chat drawer — click the wandering pixel character to open a Claude Haiku-powered side panel and ask questions about Aditya" },
      { type: "feat", description: "Streaming responses via Vercel AI SDK v6 (TextStreamChatTransport + streamText)" },
      { type: "feat", description: "Resizable drawer on desktop — drag the left edge between 260–620px" },
      { type: "feat", description: "Mobile FAB at bottom-right opens the chat drawer on small screens" },
      { type: "feat", description: "Suggested prompts shown before first message; suggestions submit directly" },
      { type: "feat", description: "Playful error state: 'Aditya stepped out for coffee ☕'" },
      { type: "feat", description: "iOS safe-area-inset-bottom on drawer footer" },
    ],
  },
  {
    date: "2026-04-25",
    hash: "8266276",
    title: "Wandering character, hover letter images, footer redesign & site polish",
    changes: [
      { type: "feat", description: "Add pixel art WanderingCharacter — roams all pages, pauses on hover with a speech bubble and random exclamations" },
      { type: "feat", description: "Add AdityaHoverText — each letter in 'Aditya' on the hero crossfades to its corresponding image on hover, alternating between two versions" },
      { type: "feat", description: "Redesign Footer — 108 Supply-inspired layout with warm amber radial gradient, nav columns (Work/About/Playground/Links + Resume/LinkedIn/GitHub/Twitter), and a 4-column bottom info strip" },
      { type: "feat", description: "Light mode now uses a warm beige palette (#FAF8F5 bg, #1A1208 fg, #8A7B6F muted) instead of plain white" },
      { type: "refactor", description: "Toolstack section on About page: remove nested GlassIcons and GSAP animation, direct icon + label grid" },
      { type: "refactor", description: "Core Skills: physics view restored with monochrome pills; toggle added back between physics and clean pill-tag list view" },
      { type: "content", description: "WorkExperience descriptions synced with resume — added $100K savings metric, 21% CTR, DNG Technologies client, veritaslogistics.com, TypeScript in Frontend Intern entry" },
      { type: "content", description: "Updated skills list with current HR/ATS keywords: Design Tokens, Component Architecture, 0-to-1 Product Design, AI-Assisted Design, Healthcare UX, etc." },
      { type: "fix", description: "Resume link updated from Google Drive folder to correct Google Doc" },
    ],
  },
  {
    date: "2026-03-17",
    hash: "911e503",
    title: "Code quality pass, SEO & sitemap",
    changes: [
      { type: "fix", description: "Replace CDN-loaded GSAP with direct npm imports across all case study pages — eliminates flash of unanimated content" },
      { type: "fix", description: "Remove nested <main> tags in all work pages (layout already provides the landmark)" },
      { type: "fix", description: "Move gsap.registerPlugin(ScrollTrigger) to module level; remove per-component re-registration" },
      { type: "fix", description: "Remove unused Footer import, redundant ternaries, and dead commented code from homepage" },
      { type: "fix", description: "Fix scroll CTA button to use getElementById instead of querySelector('.bento-grid-section')" },
      { type: "fix", description: "Typo: 'Reachout' → 'reach out'" },
      { type: "refactor", description: "Move @types/three from dependencies to devDependencies; remove duplicate tailwind.config.js" },
      { type: "seo", description: "Add sitemap.ts and robots.ts for crawler discoverability" },
      { type: "seo", description: "Enrich layout metadata: keywords targeting UX Designer, Product Designer, Design Engineer, Nocode Developer searches" },
      { type: "seo", description: "Add JSON-LD Person schema with jobTitle, knowsAbout, worksFor, address, and sameAs social links" },
      { type: "seo", description: "Add OG image and Twitter card image to root metadata" },
      { type: "seo", description: "Create per-route layout.tsx for all 5 case study pages with targeted title, description, and canonical URL" },
    ],
  },
  {
    date: "2026-02-21",
    hash: "60be38b",
    title: "About me page, logos, collaborations, bug fixes",
    changes: [
      { type: "content", description: "Updated logos and collaboration data on homepage" },
      { type: "content", description: "Revised about me page copy and layout" },
      { type: "fix", description: "Updated favicon" },
      { type: "fix", description: "Fixed apostrophe lint error (&apos)" },
    ],
  },
  {
    date: "2026-02-18",
    hash: "ad1d475",
    title: "Interactive skills & collaborations sections",
    changes: [
      { type: "feat", description: "Added interactive skills section with physics-based gravity component to about me page" },
      { type: "feat", description: "Added collaborations section to about me page" },
    ],
  },
  {
    date: "2026-02-17",
    hash: "4b26d09",
    title: "Dither background mouse interaction & project card polish",
    changes: [
      { type: "feat", description: "Dither background now reacts to mouse movement" },
      { type: "refactor", description: "Refactored project data into a centralized data file" },
      { type: "fix", description: "Refined project card styling and hover states" },
    ],
  },
  {
    date: "2026-02-17",
    hash: "33ac7d4",
    title: "Full website redevelopment",
    changes: [
      { type: "feat", description: "Rebuilt entire site from scratch using Next.js 15, Framer Motion, Tailwind CSS, and Three.js" },
      { type: "feat", description: "New homepage with GSAP scroll animations and dithered background" },
      { type: "feat", description: "Case study pages for Kardia guest mode, design system, Neon Fintech, and website redesign" },
    ],
  },
];

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
