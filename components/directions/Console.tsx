"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Columns3,
  CornerDownLeft,
  FileText,
  FlaskConical,
  Folder,
  Home,
  Link2,
  List,
  Map as MapIcon,
  Menu,
  ScrollText,
  Search,
  User,
  X,
} from "lucide-react";
import {
  ACTIVITY,
  EXPERIENCE,
  PAGES,
  PLAYGROUND,
  PROFILE,
  SIDE_PROJECTS,
  SKILLS,
  SOCIALS,
  TOOLS,
  WORK,
  WORK_GROUPS,
  formatDay,
  monthLabel,
  type PageId,
  type PostSummary,
  type WorkItem,
  type WorkKind,
} from "./data";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]/70";
const ICONS: Record<PageId, typeof Home> = {
  home: Home,
  work: Briefcase,
  projects: Folder,
  writing: BookOpen,
  about: User,
  playground: FlaskConical,
  career: MapIcon,
  changelog: ScrollText,
  links: Link2,
};
const KIND_DOT: Record<WorkKind, string> = {
  "Case study": "bg-[#A78BFA]",
  Concept: "bg-[#FCD34D]",
  "Side project": "bg-[#B2EB76]",
};

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-px font-mono text-[10.5px] text-zinc-400">{children}</kbd>;
}

function domain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

export function Console({ posts }: { posts: PostSummary[] }) {
  const [page, setPage] = useState<PageId>("home");
  const [workView, setWorkView] = useState<"list" | "board">("list");
  const [kindFilter, setKindFilter] = useState<WorkKind | null>(null);
  const [cursor, setCursor] = useState(0);
  const [peek, setPeek] = useState<WorkItem | null>(null);
  const [postIdx, setPostIdx] = useState(0);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [pIdx, setPIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [pendingG, setPendingG] = useState(false);
  const paletteInput = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const workRows = useMemo(() => (kindFilter ? WORK.filter((w) => w.kind === kindFilter) : WORK), [kindFilter]);

  const go = useCallback((p: PageId, kind: WorkKind | null = null) => {
    setPage(p);
    setKindFilter(kind);
    setPeek(null);
    setCursor(0);
    setNavOpen(false);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      ...PAGES.map((p) => ({ id: `page-${p.id}`, group: "Jump to", label: p.label, hint: `G ${p.key}`, run: () => go(p.id) })),
      ...WORK.map((w) => ({ id: `work-${w.id}`, group: "Work", label: w.title, hint: w.code, run: () => { go("work"); setPeek(w); } })),
      ...posts.map((p, i) => ({ id: `post-${p.slug}`, group: "Writing", label: p.title, run: () => { go("writing"); setPostIdx(i); } })),
      ...SIDE_PROJECTS.map((p) => ({ id: `proj-${p.slug}`, group: "Projects", label: p.title, hint: domain(p.url), run: () => window.open(p.url, "_blank", "noopener") })),
      { id: "resume", group: "Actions", label: "Open résumé", hint: "↗", run: () => window.open(PROFILE.resume, "_blank", "noopener") },
      ...SOCIALS.map((s) => ({ id: `social-${s.label}`, group: "Actions", label: `Open ${s.label}`, hint: s.handle, run: () => window.open(s.href, "_blank", "noopener") })),
    ],
    [go, posts],
  );
  const q = query.trim().toLowerCase();
  const results = q ? commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q)) : commands;

  const openPalette = () => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setPalette(true);
    setQuery("");
    setPIdx(0);
    requestAnimationFrame(() => paletteInput.current?.focus());
  };
  const closePalette = () => {
    setPalette(false);
    lastFocus.current?.focus?.();
  };

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: PROFILE.timezone }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let gTimer: ReturnType<typeof setTimeout> | undefined;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (palette) closePalette();
        else openPalette();
        return;
      }
      const t = e.target as HTMLElement;
      if (palette || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (pendingG) {
        const target = PAGES.find((p) => p.key.toLowerCase() === k);
        setPendingG(false);
        if (target) {
          e.preventDefault();
          go(target.id);
        }
        return;
      }
      if (k === "g") {
        setPendingG(true);
        gTimer = setTimeout(() => setPendingG(false), 1200);
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        openPalette();
        return;
      }
      if (e.key === "Escape" && peek) {
        setPeek(null);
        return;
      }
      if (page === "work" && workView === "list") {
        if (k === "j" || e.key === "ArrowDown") {
          e.preventDefault();
          setCursor((c) => Math.min(c + 1, workRows.length - 1));
        } else if (k === "k" || e.key === "ArrowUp") {
          e.preventDefault();
          setCursor((c) => Math.max(c - 1, 0));
        } else if (e.key === "Enter" && t.tagName !== "BUTTON" && t.tagName !== "A") {
          setPeek(workRows[cursor]);
        }
      }
      if (page === "writing") {
        if (k === "j" || e.key === "ArrowDown") {
          e.preventDefault();
          setPostIdx((i) => Math.min(i + 1, posts.length - 1));
        } else if (k === "k" || e.key === "ArrowUp") {
          e.preventDefault();
          setPostIdx((i) => Math.max(i - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(gTimer);
    };
  });

  const counts: Partial<Record<PageId, number>> = { work: WORK.length, projects: SIDE_PROJECTS.length, writing: posts.length, playground: PLAYGROUND.length, changelog: ACTIVITY.length };
  const pageLabel = PAGES.find((p) => p.id === page)?.label ?? "";

  const sidebar = (
    <aside className="flex h-full w-[240px] flex-col border-r border-white/[0.06] bg-[#0E0F11] px-3 pb-3 pt-3">
      <div className="flex items-center gap-2 px-1.5">
        <span className="relative h-5 w-5 overflow-hidden rounded-[5px]">
          <Image src={PROFILE.photo} alt="" fill sizes="20px" className="object-cover" />
        </span>
        <span className="flex-1 truncate text-[13px] font-semibold text-zinc-100">Aditya Oswal</span>
        <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className={`rounded p-1 text-zinc-500 hover:bg-white/[0.06] md:hidden ${FOCUS}`}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={openPalette}
        className={`mt-3 flex h-8 items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.02] px-2 text-[13px] text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-300 ${FOCUS}`}
      >
        <Search className="h-3.5 w-3.5" aria-hidden />
        <span className="flex-1 text-left">Search or jump to…</span>
        <Kbd>⌘K</Kbd>
      </button>

      <nav aria-label="Pages" className="mt-4 flex flex-col gap-px">
        {PAGES.map((p) => {
          const Icon = ICONS[p.id];
          const active = page === p.id && !kindFilter;
          return (
            <button
              key={p.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => go(p.id)}
              className={`group flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors ${FOCUS} ${active ? "bg-white/[0.07] text-zinc-100" : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"}`}
            >
              <Icon className="h-[15px] w-[15px] shrink-0" aria-hidden />
              <span className="flex-1 text-left">{p.label}</span>
              <span className="hidden items-center gap-0.5 group-hover:flex">
                <Kbd>G</Kbd>
                <Kbd>{p.key}</Kbd>
              </span>
              {counts[p.id] !== undefined && <span className="font-mono text-[11px] text-zinc-600 group-hover:hidden">{counts[p.id]}</span>}
            </button>
          );
        })}
      </nav>

      <p className="mt-5 px-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-zinc-600">Views</p>
      <div className="mt-1 flex flex-col gap-px">
        {WORK_GROUPS.map((g) => (
          <button
            key={g.kind}
            type="button"
            onClick={() => go("work", g.kind)}
            className={`flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors ${FOCUS} ${page === "work" && kindFilter === g.kind ? "bg-white/[0.07] text-zinc-100" : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"}`}
          >
            <span className={`ml-1 h-2 w-2 rounded-full ${KIND_DOT[g.kind]}`} aria-hidden />
            <span className="flex-1 pl-1 text-left">{g.label}</span>
            <span className="font-mono text-[11px] text-zinc-600">{g.items.length}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
        <p className="flex items-center gap-2 text-[13px] text-zinc-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#B2EB76] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B2EB76]" />
          </span>
          {PROFILE.status}
        </p>
        <p className="mt-1 text-[12px] text-zinc-500">{PROFILE.statusDetail}</p>
        <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className={`mt-3 flex items-center justify-center gap-1.5 rounded-md bg-zinc-100 py-1.5 text-[12.5px] font-medium text-black transition-colors hover:bg-white ${FOCUS}`}>
          <FileText className="h-3.5 w-3.5" aria-hidden /> Résumé
        </a>
      </div>
    </aside>
  );

  const th = "px-3 py-2 text-left font-mono text-[10.5px] font-normal uppercase tracking-[0.12em] text-zinc-600";

  const workList = (
    <table className="w-full table-fixed border-collapse text-[13px]">
      <thead className="sticky top-0 z-10 bg-[#08090A]">
        <tr className="border-b border-white/[0.06]">
          <th className={`${th} w-[84px]`}>ID</th>
          <th className={th}>Title</th>
          <th className={`${th} hidden w-[130px] sm:table-cell`}>Type</th>
          <th className={`${th} hidden w-[170px] lg:table-cell`}>Tags</th>
          <th className={`${th} w-[52px]`}>
            <span className="sr-only">Open</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {workRows.map((w, i) => (
          <tr
            key={w.id}
            onClick={() => {
              setCursor(i);
              setPeek(w);
            }}
            className={`group cursor-pointer border-b border-white/[0.04] transition-colors ${cursor === i ? "bg-white/[0.045]" : "hover:bg-white/[0.025]"} ${peek?.id === w.id ? "!bg-[#C4B5FD]/[0.08]" : ""}`}
          >
            <td className="px-3 py-2.5 font-mono text-[12px] text-zinc-500">{w.code}</td>
            <td className="px-3 py-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCursor(i);
                  setPeek(w);
                }}
                className={`flex max-w-full items-center gap-2 rounded text-left text-zinc-100 ${FOCUS}`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${KIND_DOT[w.kind]} sm:hidden`} aria-hidden />
                <span className="truncate">{w.title}</span>
                <span className="hidden truncate text-zinc-500 xl:inline">— {w.description}</span>
              </button>
            </td>
            <td className="hidden px-3 py-2.5 sm:table-cell">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-2 py-0.5 text-[12px] text-zinc-300">
                <span className={`h-1.5 w-1.5 rounded-full ${KIND_DOT[w.kind]}`} aria-hidden />
                {w.kind}
              </span>
            </td>
            <td className="hidden truncate whitespace-nowrap px-3 py-2.5 text-zinc-500 lg:table-cell">{w.tags.join(", ")}</td>
            <td className="px-3 py-2.5 text-right">
              <Link href={w.href} aria-label={`Open ${w.title}`} onClick={(e) => e.stopPropagation()} className={`inline-flex rounded p-1 text-zinc-600 transition-colors hover:bg-white/[0.06] hover:text-zinc-200 ${FOCUS}`}>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const workBoard = (
    <div className="grid gap-3 p-4 md:grid-cols-3">
      {WORK_GROUPS.filter((g) => !kindFilter || g.kind === kindFilter).map((g) => (
        <section key={g.kind} aria-label={g.label} className="rounded-lg bg-white/[0.02] p-2">
          <h2 className="flex items-center gap-2 px-1.5 pb-2 pt-1 text-[12.5px] text-zinc-300">
            <span className={`h-2 w-2 rounded-full ${KIND_DOT[g.kind]}`} aria-hidden />
            {g.label}
            <span className="font-mono text-[11px] text-zinc-600">{g.items.length}</span>
          </h2>
          <div className="flex flex-col gap-2">
            {g.items.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setPeek(w)}
                className={`overflow-hidden rounded-md border border-white/[0.07] bg-[#111214] text-left transition-colors hover:border-white/15 ${FOCUS} ${peek?.id === w.id ? "border-[#C4B5FD]/50" : ""}`}
              >
                <span className="relative block h-28 bg-[#16171A]">
                  <Image src={w.mockup} alt="" fill sizes="320px" className={w.phone ? "object-cover object-top opacity-90" : "object-cover object-left-top opacity-90"} />
                </span>
                <span className="block p-3">
                  <span className="font-mono text-[11px] text-zinc-600">{w.code}</span>
                  <span className="mt-0.5 block text-[13px] text-zinc-100">{w.title}</span>
                  <span className="mt-1 block text-[12px] text-zinc-500">{w.tags.join(" · ")}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const peekPanel = peek && (
    <aside aria-label={`${peek.title} details`} className="dir-fade absolute inset-y-0 right-0 z-20 flex w-full max-w-[420px] flex-col border-l border-white/[0.06] bg-[#0E0F11] shadow-[-24px_0_48px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="font-mono text-[12px] text-zinc-500">{peek.code}</span>
        <span className="flex-1" />
        <Kbd>Esc</Kbd>
        <button type="button" aria-label="Close details" onClick={() => setPeek(null)} className={`rounded p-1 text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200 ${FOCUS}`}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <h2 className="text-[20px] font-semibold text-zinc-50">{peek.title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">{peek.description}</p>
        <dl className="mt-5 grid grid-cols-[96px_1fr] gap-y-2.5 text-[13px]">
          <dt className="text-zinc-500">Type</dt>
          <dd className="flex items-center gap-1.5 text-zinc-200">
            <span className={`h-2 w-2 rounded-full ${KIND_DOT[peek.kind]}`} aria-hidden />
            {peek.kind}
          </dd>
          <dt className="text-zinc-500">Tags</dt>
          <dd className="text-zinc-200">{peek.tags.join(", ")}</dd>
          <dt className="text-zinc-500">Route</dt>
          <dd className="font-mono text-[12px] text-zinc-300">{peek.href}</dd>
        </dl>
        <div className="relative mt-5 h-64 overflow-hidden rounded-lg border border-white/[0.06] bg-[#16171A]">
          <Image src={peek.mockup} alt={`${peek.title} preview`} fill sizes="380px" className={peek.phone ? "object-contain object-bottom pt-4" : "object-cover object-left-top"} />
        </div>
        <Link href={peek.href} className={`mt-5 flex items-center justify-center gap-2 rounded-md bg-[#C4B5FD] py-2 text-[13px] font-medium text-black transition-colors hover:bg-[#D6CCFE] ${FOCUS}`}>
          Open case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </aside>
  );

  const span = { min: Math.min(...EXPERIENCE.map((e) => e.start)), max: Math.max(...EXPERIENCE.map((e) => e.end)) + 1 };
  const years: number[] = [];
  for (let y = Math.ceil(span.min / 12); y * 12 < span.max; y++) years.push(y);
  const pct = (m: number) => ((m - span.min) / (span.max - span.min)) * 100;

  const timeline = (
    <div className="rounded-lg border border-white/[0.06]">
      <div className="grid grid-cols-[minmax(0,220px)_1fr] border-b border-white/[0.06] text-[11px]">
        <span className="px-3 py-2 font-mono uppercase tracking-[0.12em] text-zinc-600">Role</span>
        <span className="relative h-full">
          {years.map((y) => (
            <span key={y} className="absolute top-2 -translate-x-1/2 font-mono text-zinc-600" style={{ left: `${pct(y * 12)}%` }}>
              {String(y).slice(2)}
            </span>
          ))}
        </span>
      </div>
      {EXPERIENCE.map((e) => (
        <div key={e.role + e.period} className="grid grid-cols-[minmax(0,220px)_1fr] border-b border-white/[0.04] last:border-0">
          <span className="min-w-0 px-3 py-2.5">
            <span className="block truncate text-[13px] text-zinc-100">{e.role}</span>
            <span className="block truncate text-[12px] text-zinc-500">{e.company}</span>
          </span>
          <span className="relative">
            {years.map((y) => (
              <span key={y} className="absolute inset-y-0 w-px bg-white/[0.04]" style={{ left: `${pct(y * 12)}%` }} aria-hidden />
            ))}
            <span
              role="img"
              aria-label={`${e.role}, ${monthLabel(e.start)} to ${monthLabel(e.end)}`}
              title={`${monthLabel(e.start)} – ${monthLabel(e.end)}`}
              className="absolute top-1/2 h-2 min-w-[6px] -translate-y-1/2 rounded bg-[#C4B5FD]"
              style={{ left: `${pct(e.start)}%`, width: `${pct(e.end + 1) - pct(e.start)}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  );

  const simpleTable = (rows: { key: string; a: React.ReactNode; b?: React.ReactNode; c?: React.ReactNode; href?: string }[], heads: string[]) => (
    <table className="w-full table-fixed border-collapse text-[13px]">
      <thead>
        <tr className="border-b border-white/[0.06]">
          {heads.map((h, i) => (
            <th key={h} className={`${th} ${i === 1 ? "hidden sm:table-cell" : ""} ${i === 2 ? "w-[160px]" : ""}`}>
              {h}
            </th>
          ))}
          <th className={`${th} w-[52px]`}>
            <span className="sr-only">Open</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-b border-white/[0.04] hover:bg-white/[0.025]">
            <td className="truncate px-3 py-2.5 text-zinc-100">{r.a}</td>
            {heads.length > 1 && <td className="hidden truncate px-3 py-2.5 text-zinc-500 sm:table-cell">{r.b}</td>}
            {heads.length > 2 && <td className="truncate px-3 py-2.5 text-zinc-400">{r.c}</td>}
            <td className="px-3 py-2.5 text-right">
              {r.href && (
                <Link href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label="Open" className={`inline-flex rounded p-1 text-zinc-600 hover:bg-white/[0.06] hover:text-zinc-200 ${FOCUS}`}>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const post = posts[postIdx];

  const content = (() => {
    switch (page) {
      case "work":
        return workView === "list" ? workList : workBoard;
      case "projects":
        return simpleTable(
          SIDE_PROJECTS.map((p) => ({
            key: p.slug,
            a: p.title,
            b: p.summary,
            c: (
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${p.status === "Live" ? "bg-[#B2EB76]" : "bg-[#FCD34D]"}`} aria-hidden />
                {p.status}
              </span>
            ),
            href: p.url,
          })),
          ["Name", "Summary", "Status"],
        );
      case "writing":
        return (
          <div className="flex h-full min-h-0">
            <ul className="w-full shrink-0 overflow-y-auto border-r border-white/[0.06] md:w-[360px]">
              {posts.map((p, i) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => setPostIdx(i)}
                    aria-current={i === postIdx ? "true" : undefined}
                    className={`block w-full border-b border-white/[0.04] px-4 py-3 text-left transition-colors ${FOCUS} ${i === postIdx ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"}`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate text-[13px] text-zinc-100">{p.title}</span>
                      {p.draft && <span className="shrink-0 rounded border border-[#FCD34D]/30 px-1 font-mono text-[10px] text-[#FCD34D]">DRAFT</span>}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] text-zinc-600">{formatDay(p.date)}</span>
                  </button>
                </li>
              ))}
            </ul>
            {post && (
              <article key={post.slug} className="dir-fade hidden min-w-0 flex-1 overflow-y-auto p-8 md:block">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-600">{formatDay(post.date)}</p>
                <h2 className="mt-3 max-w-[560px] text-[26px] font-semibold leading-tight text-zinc-50">{post.title}</h2>
                <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-zinc-400">{post.description}</p>
                <Link href={`/writing/${post.slug}`} className={`mt-6 inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-[13px] text-zinc-200 hover:bg-white/[0.05] ${FOCUS}`}>
                  Read post <CornerDownLeft className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </article>
            )}
          </div>
        );
      case "about":
        return (
          <div className="mx-auto max-w-[880px] p-6">
            <div className="flex items-center gap-4">
              <span className="relative h-14 w-14 overflow-hidden rounded-lg">
                <Image src={PROFILE.photo} alt={PROFILE.name} fill sizes="56px" className="object-cover" />
              </span>
              <div>
                <h2 className="text-[20px] font-semibold text-zinc-50">{PROFILE.name}</h2>
                <p className="text-[13px] text-zinc-500">
                  {PROFILE.role} · {PROFILE.location}
                </p>
              </div>
            </div>
            <h3 className="mb-2 mt-8 font-mono text-[10.5px] font-normal uppercase tracking-[0.12em] text-zinc-600">Experience</h3>
            {timeline}
            <h3 className="mb-2 mt-8 font-mono text-[10.5px] font-normal uppercase tracking-[0.12em] text-zinc-600">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map((s) => (
                <span key={s} className="rounded border border-white/[0.08] px-2 py-0.5 text-[12px] text-zinc-300">
                  {s}
                </span>
              ))}
            </div>
            <h3 className="mb-2 mt-8 font-mono text-[10.5px] font-normal uppercase tracking-[0.12em] text-zinc-600">Toolstack</h3>
            <div className="flex flex-wrap gap-1.5">
              {TOOLS.map((s) => (
                <span key={s} className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[12px] text-zinc-400">
                  {s}
                </span>
              ))}
            </div>
          </div>
        );
      case "playground":
        return simpleTable(PLAYGROUND.map((p) => ({ key: p.href, a: p.title, b: p.description, href: p.href })), ["Name", "Story"]);
      case "career":
        return (
          <div className="mx-auto max-w-[880px] p-6">
            {timeline}
            <Link href="/career-odyssey" className={`mt-4 inline-flex items-center gap-1.5 text-[13px] text-[#C4B5FD] hover:underline ${FOCUS}`}>
              The long version <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        );
      case "changelog":
        return (
          <ol className="mx-auto max-w-[880px] p-6">
            {ACTIVITY.map((a, i) => (
              <li key={a.hash + a.title + i} className="grid grid-cols-[96px_16px_1fr] gap-3">
                <span className="pt-0.5 text-right font-mono text-[11px] text-zinc-600">{formatDay(a.date)}</span>
                <span className="relative flex justify-center" aria-hidden>
                  <span className="absolute inset-y-0 w-px bg-white/[0.07]" />
                  <span className="relative mt-1.5 h-2 w-2 rounded-full border border-[#C4B5FD]/70 bg-[#08090A]" />
                </span>
                <span className="pb-4 text-[13px] text-zinc-200">
                  {a.title} <span className="font-mono text-[11px] text-zinc-600">{a.hash}</span>
                </span>
              </li>
            ))}
          </ol>
        );
      case "links":
        return simpleTable(
          [
            ...SOCIALS.map((s) => ({ key: s.label, a: s.label, b: s.handle, href: s.href })),
            { key: "resume", a: "Résumé", b: "Google Doc", href: PROFILE.resume },
            { key: "links", a: "Bookmarks and communities", b: "The full links page", href: "/links" },
          ],
          ["Name", "Handle"],
        );
      default:
        return (
          <div className="mx-auto max-w-[880px] p-6">
            <div className="rounded-lg border border-white/[0.07] bg-[#0E0F11]">
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2 font-mono text-[11.5px] text-zinc-500">
                <FileText className="h-3.5 w-3.5" aria-hidden /> README.md
              </div>
              <div className="p-5">
                <h1 className="text-[26px] font-semibold text-zinc-50">{PROFILE.name}</h1>
                <p className="mt-1 text-[14px] text-zinc-400">
                  {PROFILE.role}. I design products end to end and build the front end myself.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-md bg-black/40 p-3 font-mono text-[12.5px] leading-relaxed text-zinc-400">
                  <span className="text-zinc-600">status</span>    <span className="text-[#B2EB76]">{PROFILE.status.toLowerCase().replace(/ /g, "_")}</span>
                  {"\n"}
                  <span className="text-zinc-600">open_to</span>   {PROFILE.statusDetail.toLowerCase()}
                  {"\n"}
                  <span className="text-zinc-600">based_in</span>  {PROFILE.location} <span className="text-zinc-600">({clock || "--:--"} IST)</span>
                  {"\n"}
                  <span className="text-zinc-600">stack</span>     figma, next.js, tailwind, supabase, vercel
                </pre>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-zinc-600">Pinned</h2>
              <button type="button" onClick={() => go("work")} className={`rounded text-[12px] text-zinc-500 hover:text-zinc-200 ${FOCUS}`}>
                All work <Kbd>G</Kbd> <Kbd>W</Kbd>
              </button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {WORK.slice(0, 4).map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    go("work");
                    setPeek(w);
                  }}
                  className={`flex items-start gap-3 rounded-lg border border-white/[0.07] p-3 text-left transition-colors hover:border-white/15 hover:bg-white/[0.02] ${FOCUS}`}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${KIND_DOT[w.kind]}`} aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[13px] text-zinc-100">{w.title}</span>
                    <span className="mt-0.5 block truncate text-[12px] text-zinc-500">{w.description}</span>
                  </span>
                </button>
              ))}
            </div>
            <h2 className="mb-2 mt-8 font-mono text-[10.5px] uppercase tracking-[0.12em] text-zinc-600">Activity</h2>
            <ul className="rounded-lg border border-white/[0.06]">
              {ACTIVITY.slice(0, 6).map((a, i) => (
                <li key={a.hash + i} className="flex items-center gap-3 border-b border-white/[0.04] px-3 py-2 text-[13px] last:border-0">
                  <span className="w-[92px] shrink-0 whitespace-nowrap font-mono text-[11px] text-zinc-600">{formatDay(a.date)}</span>
                  <span className="truncate text-zinc-300">{a.title}</span>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  })();

  let lastGroup = "";

  return (
    <div className="flex h-[100dvh] flex-col bg-[#08090A] text-zinc-300 [color-scheme:dark] [font-family:var(--font-geist)]">
      <div className="flex min-h-0 flex-1">
        {navOpen && <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className="fixed inset-0 z-30 bg-black/60 md:hidden" />}
        <div className={`fixed inset-y-0 left-0 z-40 transition-transform duration-200 motion-reduce:transition-none md:static md:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</div>

        <main className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/[0.06] px-3">
            <button type="button" aria-label="Open menu" onClick={() => setNavOpen(true)} className={`rounded p-1.5 text-zinc-400 hover:bg-white/[0.06] md:hidden ${FOCUS}`}>
              <Menu className="h-4 w-4" />
            </button>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 font-mono text-[12px]">
              <button type="button" onClick={() => go("home")} className={`rounded text-zinc-500 hover:text-zinc-200 ${FOCUS}`}>
                adityaoswal.in
              </button>
              <span className="text-zinc-700">/</span>
              <span className="truncate text-zinc-200">{pageLabel}</span>
              {page === "work" && kindFilter && (
                <>
                  <span className="text-zinc-700">/</span>
                  <span className="truncate text-zinc-400">{kindFilter}</span>
                </>
              )}
            </nav>
            <span className="flex-1" />
            {page === "work" && (
              <div role="group" aria-label="Layout" className="flex rounded-md border border-white/[0.07] p-0.5">
                {(
                  [
                    ["list", List, "List"],
                    ["board", Columns3, "Board"],
                  ] as const
                ).map(([id, Icon, label]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={workView === id}
                    onClick={() => {
                      setWorkView(id);
                      setPeek(null);
                    }}
                    className={`flex items-center gap-1.5 rounded px-2 py-1 text-[12px] ${FOCUS} ${workView === id ? "bg-white/[0.08] text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden /> <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            )}
            {PAGES.find((p) => p.id === page)?.href && page !== "home" && (
              <Link href={PAGES.find((p) => p.id === page)!.href} className={`hidden items-center gap-1 rounded-md border border-white/[0.07] px-2 py-1 text-[12px] text-zinc-400 hover:text-zinc-100 sm:flex ${FOCUS}`}>
                Full page <ArrowUpRight className="h-3 w-3" aria-hidden />
              </Link>
            )}
          </div>
          <div className={`min-h-0 flex-1 ${page === "writing" ? "" : "overflow-y-auto"}`}>{content}</div>
          {peekPanel}
        </main>
      </div>

      <footer className="flex h-7 shrink-0 items-center gap-4 border-t border-white/[0.06] bg-[#0E0F11] px-3 font-mono text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B2EB76]" aria-hidden />
          {PROFILE.status.toLowerCase()}
        </span>
        <span className="hidden sm:inline">bangalore · {clock || "--:--"} ist</span>
        <span className="flex-1" />
        {pendingG ? <span className="text-[#C4B5FD]">g → choose a page…</span> : <span className="hidden md:inline">⌘K search · G + key jump · J/K move · Enter open</span>}
      </footer>

      {palette && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[14vh]" onMouseDown={closePalette}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            className="dir-fade w-full max-w-[560px] overflow-hidden rounded-xl border border-white/10 bg-[#111214] shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.07] px-4">
              <Search className="h-4 w-4 text-zinc-500" aria-hidden />
              <input
                ref={paletteInput}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPIdx(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setPIdx((i) => Math.min(i + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setPIdx((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && results[pIdx]) {
                    e.preventDefault();
                    results[pIdx].run();
                    setPalette(false);
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    closePalette();
                  }
                }}
                placeholder="Search pages, work, writing…"
                aria-label="Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-results"
                aria-activedescendant={results[pIdx] ? `cmd-${results[pIdx].id}` : undefined}
                className="h-12 flex-1 bg-transparent text-[14px] text-zinc-100 outline-none placeholder:text-zinc-600"
              />
              <Kbd>Esc</Kbd>
            </div>
            <ul id="cmd-results" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-[13px] text-zinc-500">No results</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                return (
                  <li key={c.id} role="presentation">
                    {header && <p className="px-3 pb-1 pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-zinc-600">{header}</p>}
                    <div
                      id={`cmd-${c.id}`}
                      role="option"
                      aria-selected={i === pIdx}
                      onMouseEnter={() => setPIdx(i)}
                      onClick={() => {
                        c.run();
                        setPalette(false);
                      }}
                      className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-[13.5px] ${i === pIdx ? "bg-white/[0.07] text-zinc-50" : "text-zinc-300"}`}
                    >
                      <span className="flex-1 truncate">{c.label}</span>
                      {c.hint && <span className="font-mono text-[11px] text-zinc-600">{c.hint}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
