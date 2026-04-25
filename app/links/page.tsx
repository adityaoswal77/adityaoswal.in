"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Search,
  Link2,
  Layers,
  Code2,
  Wrench,
  BookOpen,
  Sparkles,
  Bot,
  Users,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import {
  BOOKMARKS,
  COMMUNITIES,
  BOOKMARK_CATEGORIES,
  type BookmarkCategory,
  type Community,
} from "@/lib/links";
import AnimatedGradient from "@/components/fancy/background/animated-gradient-with-svg";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICONS: Record<BookmarkCategory, React.ReactNode> = {
  Design: <Layers className="w-3.5 h-3.5" />,
  Engineering: <Code2 className="w-3.5 h-3.5" />,
  Tools: <Wrench className="w-3.5 h-3.5" />,
  Reading: <BookOpen className="w-3.5 h-3.5" />,
  Inspiration: <Sparkles className="w-3.5 h-3.5" />,
  AI: <Bot className="w-3.5 h-3.5" />,
};

const CATEGORY_COLORS: Record<BookmarkCategory, string> = {
  Design: "bg-violet-500/10 text-violet-400 border-violet-500/20 hover:border-violet-500/50",
  Engineering: "bg-sky-500/10 text-sky-400 border-sky-500/20 hover:border-sky-500/50",
  Tools: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:border-amber-500/50",
  Reading: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50",
  Inspiration: "bg-pink-500/10 text-pink-400 border-pink-500/20 hover:border-pink-500/50",
  AI: "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:border-orange-500/50",
};

const CATEGORY_ACTIVE: Record<BookmarkCategory, string> = {
  Design: "bg-violet-500 text-white border-violet-500",
  Engineering: "bg-sky-500 text-white border-sky-500",
  Tools: "bg-amber-500 text-white border-amber-500",
  Reading: "bg-emerald-500 text-white border-emerald-500",
  Inspiration: "bg-pink-500 text-white border-pink-500",
  AI: "bg-orange-500 text-white border-orange-500",
};

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinksPage() {
  const [activeCategory, setActiveCategory] = useState<
    BookmarkCategory | "All"
  >("All");
  const [search, setSearch] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });
      tl.from(".bm-header-badge", { y: 20, opacity: 0 })
        .from(".bm-header-title", { y: 40, opacity: 0 }, "-=0.6")
        .from(".bm-header-desc", { y: 20, opacity: 0 }, "-=0.6")
        .from(".bm-filter-bar", { y: 20, opacity: 0 }, "-=0.5");
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Animate grid when filters change
  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".bookmark-card");
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" }
    );
  }, [activeCategory, search]);

  const filtered = BOOKMARKS.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.tags?.some((t) => t.toLowerCase().includes(q)) ||
      b.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const filteredCommunities = COMMUNITIES.filter((c) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Group by category for the "All" view
  const grouped: Record<string, typeof filtered> = {};
  filtered.forEach((b) => {
    if (!grouped[b.category]) grouped[b.category] = [];
    grouped[b.category].push(b);
  });

  return (
    <div className="min-h-screen bg-[var(--background)] pt-28 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-5xl mx-auto px-6">
        <div className="bm-header-badge mb-8 w-fit px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center gap-2">
          <Link2 className="w-3.5 h-3.5 text-[var(--muted)]" />
          <span className="text-[14px] uppercase tracking-[0.1em] font-bold text-[var(--muted)]">
            Links
          </span>
        </div>

        <h1 className="bm-header-title text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-[var(--foreground)] mb-6">
          Resources &{" "}
          <span className="italic font-light text-[var(--muted)] normal-case">References</span>
        </h1>

        <p className="bm-header-desc max-w-xl text-[var(--muted)] font-medium text-lg leading-relaxed mb-12">
          A curated collection of tools, articles, and links I keep coming back
          to — organized by topic.
        </p>

        {/* Search + Filter bar */}
        <div className="bm-filter-bar flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-14">
          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              id="bookmarks-search"
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              id="filter-all"
              onClick={() => setActiveCategory("All")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${activeCategory === "All"
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                : "bg-[var(--card)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30"
                }`}
            >
              All
              <span className="text-xs opacity-60">{BOOKMARKS.length}</span>
            </button>

            {BOOKMARK_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = BOOKMARKS.filter((b) => b.category === cat).length;
              return (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${isActive
                    ? CATEGORY_ACTIVE[cat]
                    : `${CATEGORY_COLORS[cat]} bg-[var(--card)] hover:bg-[var(--card)]`
                    }`}
                >
                  {CATEGORY_ICONS[cat]}
                  {cat}
                  <span className="text-xs opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Communities Section */}
      {activeCategory === "All" && filteredCommunities.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-lime-700/20 bg-lime-700/10 text-lime-600 text-sm font-semibold">
              <Users className="w-3.5 h-3.5" />
              Communities
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs text-[var(--muted)] opacity-60 font-medium">DM me for a Referral</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCommunities.map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6" ref={gridRef}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Search className="w-10 h-10 text-[var(--muted)] mb-4 opacity-40" />
            <p className="text-[var(--muted)] text-lg font-medium">
              No bookmarks found
            </p>
            <p className="text-[var(--muted)] text-sm mt-1 opacity-60">
              Try a different search or category
            </p>
          </div>
        ) : activeCategory === "All" ? (
          // Grouped view
          <div className="space-y-14">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-sm font-semibold ${CATEGORY_COLORS[cat as BookmarkCategory]
                      }`}
                  >
                    {CATEGORY_ICONS[cat as BookmarkCategory]}
                    {cat}
                  </div>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((bm) => (
                    <BookmarkCard key={bm.id} bookmark={bm} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Flat grid view for single category
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((bm) => (
              <BookmarkCard key={bm.id} bookmark={bm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BookmarkCard({
  bookmark,
}: {
  bookmark: (typeof BOOKMARKS)[number];
}) {
  const domain = getDomain(bookmark.url);

  return (
    <a
      id={`bookmark-${bookmark.id}`}
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bookmark-card group relative flex flex-col justify-between gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between gap-4 h-full">
        {/* Top: title + arrow */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-[var(--foreground)] text-[15px] leading-snug group-hover:text-white transition-colors">
              {bookmark.title}
            </p>
            <p className="text-xs text-[var(--muted)] mt-0.5 font-mono opacity-60 group-hover:text-zinc-500 transition-colors">
              {domain}
            </p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--foreground)]/5 border border-[var(--border)] flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors">
          {bookmark.description}
        </p>

        {/* Tags */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[var(--foreground)]/5 border border-[var(--border)] text-xs text-[var(--muted)] font-medium group-hover:border-white/10 group-hover:bg-white/5 group-hover:text-zinc-300 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <div
      id={`community-${community.id}`}
      className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-lime-500/20 bg-[var(--card)] hover:border-lime-500/40 hover:shadow-[0_8px_40px_rgba(132,204,22,0.12)] transition-all duration-300 overflow-hidden"
    >
      {/* Background Layers */}
      {/* Lime Tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/[0.05] via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

      {/* 2. Special Effect: Animated Gradient */}
      <AnimatedGradient
        colors={["#84cc16", "#10b981", "#06b6d4"]}
        speed={10}
        blur="medium"
        className="opacity-0 group-hover:opacity-40 transition-opacity duration-500"
      />

      {/* 3. Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-lime-500/8 to-transparent pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-[var(--foreground)] text-lg leading-none transition-colors">
                {community.title}
              </p>
              <span className="px-2 py-0.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-800 text-[11px] font-bold uppercase tracking-wider group-hover:bg-lime-500 group-hover:text-white group-hover:border-lime-500 transition-colors">
                {community.memberBadge}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] italic transition-colors">{community.tagline}</p>
          </div>
          <a
            href={community.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${community.title}`}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--foreground)]/5 border border-[var(--border)] flex items-center justify-center hover:bg-lime-500 hover:border-lime-500 transition-all duration-300 group/btn"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[var(--muted)] group-hover/btn:text-white transition-colors" />
          </a>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] leading-relaxed transition-colors">
          {community.description}
        </p>

        {/* Tags + DM CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {community.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[var(--foreground)]/5 border border-[var(--border)] text-xs text-[var(--muted)] font-medium transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={community.inviteUrl || "https://x.com/oswaluxd"}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-600 text-xs font-semibold hover:bg-lime-500 hover:text-white hover:border-lime-500 transition-all duration-200"
          >
            {community.inviteUrl ? (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Join link
              </>
            ) : (
              <>
                <MessageCircle className="w-3.5 h-3.5" />
                DM for invite
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
