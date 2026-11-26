"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  FileText,
  FlaskConical,
  Folder,
  Home,
  Link2,
  Map as MapIcon,
  Menu,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRight,
  ScrollText,
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
  type PageId,
  type PostSummary,
  type WorkItem,
  type WorkKind,
} from "./data";
import { MESSAGE_LIMIT, RichText, messageText } from "./ChatThread";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18280E] focus-visible:ring-offset-1 active:scale-[0.98] motion-reduce:active:transform-none";
const LINE = "border-[0.5px] border-[#D3DFC6]";
const ICON_BTN = `flex h-8 w-8 items-center justify-center rounded-full text-[#090F05] transition-colors hover:bg-[#E6F0DA] ${FOCUS}`;
const ROUND_BTN = `flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${LINE} bg-white transition-colors hover:bg-[#FBFDF8] ${FOCUS}`;
const LINK_CLASS = "underline decoration-[#18280E]/30 underline-offset-2 hover:decoration-[#18280E]";

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

const DOT: Record<WorkKind, string> = {
  "Case study": "bg-[#18280E]",
  Concept: "border border-[#4A5B38] bg-transparent",
  "Side project": "bg-[#8ED14B]",
};

const CHIPS = [
  "Walk me through your best case study",
  "What did you do at AliveCor?",
  "Are you open to freelance?",
  "What side projects are you running?",
];

function Pill({ children, tone = "mint" }: { children: React.ReactNode; tone?: "mint" | "lime" | "sand" }) {
  const cls = tone === "lime" ? "bg-[#B2EB76] text-[#090F05]" : tone === "sand" ? "bg-[#F3EDD8] text-[#5B4A1C]" : "bg-[#E6F0DA] text-[#2E3D22]";
  return <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] leading-none ${cls}`}>{children}</span>;
}

function RoundArrow({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-[#E6F0DA]">
      <Icon className="h-4 w-4" aria-hidden />
    </span>
  );
}

function Row({
  title,
  meta,
  right,
  lead,
  onClick,
  href,
}: {
  title: string;
  meta?: React.ReactNode;
  right?: React.ReactNode;
  lead?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const external = !!href?.startsWith("http");
  const inner = (
    <>
      {lead}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-bold leading-snug">{title}</span>
        {meta && <span className="mt-0.5 flex min-w-0 items-center gap-2 text-sm text-[#4A5B38]">{meta}</span>}
      </span>
      {right}
      <RoundArrow external={external} />
    </>
  );
  const cls = `group flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition-colors hover:bg-[#FBFDF8] ${FOCUS}`;
  return (
    <li className="border-b-[0.5px] border-[#D3DFC6]">
      {href ? (
        <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={cls}>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={cls}>
          {inner}
        </button>
      )}
    </li>
  );
}

function Thumb({ item }: { item: WorkItem }) {
  return (
    <span className="relative hidden h-11 w-16 shrink-0 overflow-hidden rounded-md bg-[#F4FAED] sm:block">
      <Image src={item.mockup} alt="" fill sizes="64px" className={item.phone ? "object-cover object-top" : "object-cover object-left-top"} />
    </span>
  );
}

function ViewHeader({ title, sub, href }: { title: string; sub: string; href?: string }) {
  return (
    <header className="flex items-end justify-between gap-4 border-b-[0.5px] border-[#D3DFC6] pb-4">
      <div>
        <h1 className="font-[family-name:var(--font-glyphic)] text-[30px] leading-tight">{title}</h1>
        <p className="mt-1 text-[15px] text-[#4A5B38]">{sub}</p>
      </div>
      {href && (
        <Link href={href} className={`flex shrink-0 items-center gap-1 rounded-full ${LINE} px-3 py-1.5 text-sm transition-colors hover:bg-[#F4FAED] ${FOCUS}`}>
          Full page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      )}
    </header>
  );
}

function Composer({
  value,
  onChange,
  onSend,
  disabled,
  compact,
  inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: (v: string) => void;
  disabled?: boolean;
  compact?: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const submit = () => {
    const v = value.trim();
    if (v && !disabled) onSend(v);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className={`rounded-[24px] ${LINE} bg-white p-3 shadow-[0_8px_30px_-18px_rgba(24,40,14,0.35)] focus-within:border-[#18280E]/40`}
    >
      <label className="sr-only" htmlFor="ws-composer">
        Ask Adi.Os
      </label>
      <textarea
        id="ws-composer"
        ref={inputRef}
        rows={compact ? 1 : 2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={disabled ? "That's the 10-message limit for this session" : "Ask about my work, process or availability"}
        disabled={disabled}
        className="w-full resize-none bg-transparent px-2 py-1 text-[16px] outline-none placeholder:text-[#4A5B38]/70 disabled:cursor-not-allowed"
      />
      <div className="mt-1 flex items-center justify-between gap-3 px-1">
        <span className="text-xs text-[#4A5B38]">Adi.Os · answers from my resume</span>
        <button
          type="submit"
          aria-label="Send"
          disabled={disabled || !value.trim()}
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#18280E] text-[#B2EB76] transition-opacity disabled:opacity-35 ${FOCUS}`}
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}

export function Workspace({ posts }: { posts: PostSummary[] }) {
  const [page, setPage] = useState<PageId | "chat">("home");
  const [detail, setDetail] = useState<WorkItem | null>(null);
  const [homeTab, setHomeTab] = useState<"work" | "projects" | "writing">("work");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ "Case study": true });
  const [leftOpen, setLeftOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [desktop, setDesktop] = useState(true);
  const [wide, setWide] = useState(true);
  const [text, setText] = useState("");
  const [today, setToday] = useState("");
  const [clock, setClock] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(() => new TextStreamChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({ transport });
  const loading = status === "submitted" || status === "streaming";
  const atLimit = messages.filter((m) => m.role === "user").length >= MESSAGE_LIMIT;

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const xl = window.matchMedia("(min-width: 1280px)");
    const sync = () => {
      setDesktop(lg.matches);
      setWide(xl.matches);
    };
    sync();
    setRightOpen(xl.matches);
    lg.addEventListener("change", sync);
    xl.addEventListener("change", sync);
    const tick = () => {
      const now = new Date();
      setToday(now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", timeZone: PROFILE.timezone }));
      setClock(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: PROFILE.timezone }));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => {
      lg.removeEventListener("change", sync);
      xl.removeEventListener("change", sync);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && page === "chat") el.scrollTop = el.scrollHeight;
  }, [messages, loading, page]);

  const go = (p: PageId | "chat") => {
    setPage(p);
    setDetail(null);
    setNavOpen(false);
    scrollRef.current?.scrollTo({ top: 0 });
  };
  const openWork = (w: WorkItem) => {
    setPage("work");
    setDetail(w);
    setNavOpen(false);
    scrollRef.current?.scrollTo({ top: 0 });
  };
  const ask = (q: string) => {
    if (loading || atLimit) return;
    sendMessage({ text: q });
    setText("");
    setPage("chat");
    setDetail(null);
  };
  const newChat = () => {
    go(messages.length ? "chat" : "home");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const counts: Partial<Record<PageId, number>> = {
    work: WORK.length,
    projects: SIDE_PROJECTS.length,
    writing: posts.length,
    playground: 2,
  };
  const current = PAGES.find((p) => p.id === page);
  const crumb = page === "chat" ? "Adi.Os" : detail ? `Work / ${detail.title}` : current?.label;
  const sidebarHidden = desktop ? !leftOpen : !navOpen;
  const panelOverlay = rightOpen && !wide;

  const sidebar = (
    <aside className="flex h-full w-[288px] flex-col overflow-y-auto bg-[#F4FAED] p-5">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => go("home")} className={`rounded-md text-[24px] font-black leading-none tracking-tight ${FOCUS}`}>
          aditya oswal
        </button>
        <button
          type="button"
          aria-label="Collapse sidebar"
          onClick={() => (desktop ? setLeftOpen(false) : setNavOpen(false))}
          className={`ml-auto ${ICON_BTN}`}
        >
          {desktop ? <PanelLeftClose className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-10 flex-1 items-center gap-2 rounded-full ${LINE} bg-white px-4 text-[15px] transition-colors hover:bg-[#FBFDF8] ${FOCUS}`}
        >
          <FileText className="h-4 w-4" aria-hidden />
          <span className="flex-1 text-left">Résumé</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-[#4A5B38]" aria-hidden />
        </a>
        <button type="button" aria-label="Chat with Adi.Os" title="Chat with Adi.Os" onClick={newChat} className={ROUND_BTN}>
          <MessageSquarePlus className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-6 px-1 text-xs tracking-[0.08em] text-[#4A5B38]">PAGES</p>
      <nav aria-label="Pages" className="mt-1 flex flex-col gap-0.5">
        {PAGES.map((p) => {
          const Icon = ICONS[p.id];
          const active = page === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => go(p.id)}
              className={`flex h-10 items-center gap-3 rounded-full px-3.5 text-[15px] transition-colors ${FOCUS} ${active ? "bg-[#E1EDD3] font-bold" : "hover:bg-[#E6F0DA]"}`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="flex-1 text-left">{p.label}</span>
              {counts[p.id] !== undefined && <span className="text-sm font-normal text-[#4A5B38]">{counts[p.id]}</span>}
            </button>
          );
        })}
      </nav>

      <p className="mt-6 px-1 text-xs tracking-[0.08em] text-[#4A5B38]">WORK</p>
      <div className="mt-1 flex flex-col gap-0.5">
        {WORK_GROUPS.map((g) => {
          const isOpen = !!openGroups[g.kind];
          return (
            <div key={g.kind}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenGroups((o) => ({ ...o, [g.kind]: !o[g.kind] }))}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[#E6F0DA] ${FOCUS}`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${DOT[g.kind]}`} aria-hidden />
                <span className="flex-1 text-left">{g.label}</span>
                <span className="text-[#4A5B38]">{g.items.length}</span>
                <ChevronRight className={`h-4 w-4 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-90" : ""}`} aria-hidden />
              </button>
              {isOpen && (
                <div className="flex flex-col">
                  {g.items.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => openWork(w)}
                      className={`truncate rounded-xl py-2 pl-[34px] pr-2 text-left text-[14.5px] transition-colors hover:bg-[#E6F0DA] ${FOCUS} ${detail?.id === w.id ? "bg-[#E1EDD3]" : ""}`}
                    >
                      {w.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 px-1 text-xs tracking-[0.08em] text-[#4A5B38]">WRITING</p>
      <div className="mt-1 flex flex-col">
        {posts.map((p) => (
          <Link key={p.slug} href={`/writing/${p.slug}`} className={`truncate rounded-xl px-2 py-2 text-[14.5px] transition-colors hover:bg-[#E6F0DA] ${FOCUS}`}>
            {p.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-[20px] bg-[#E6F0DA] p-4">
          <p className="font-[family-name:var(--font-glyphic)] text-lg leading-tight">{PROFILE.name}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image src={PROFILE.photo} alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span className="flex flex-1 items-center gap-1.5 text-sm text-[#2E3D22]">
              <span className="h-2 w-2 rounded-full bg-[#5FA82B]" aria-hidden />
              {PROFILE.status}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );

  const home = (
    <div className="mx-auto flex min-h-full w-full max-w-[760px] flex-col px-5 pb-6 pt-6 sm:px-6 sm:pt-10">
      <h1 className="text-center font-[family-name:var(--font-glyphic)] text-[28px] leading-tight sm:text-[34px]">
        Hi, I’m Aditya. What would you like to see?
      </h1>
      <p className="mt-3 text-center text-[15px] text-[#4A5B38]">
        {today && `${today} · `}
        {PROFILE.status} · {WORK.length} projects · {posts.length} posts
      </p>

      <div className="mt-8">
        <Composer value={text} onChange={setText} onSend={ask} disabled={atLimit || loading} inputRef={inputRef} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-[#4A5B38]">Start with</span>
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => ask(c)}
            className={`rounded-full ${LINE} bg-white px-4 py-2 text-[14.5px] transition-colors hover:border-[#18280E]/40 hover:bg-[#FBFDF8] ${FOCUS}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <div role="tablist" aria-label="Browse" className="flex items-end gap-6 border-b-[0.5px] border-[#D3DFC6]">
          {(
            [
              ["work", "Work", WORK.length],
              ["projects", "Projects", SIDE_PROJECTS.length],
              ["writing", "Writing", posts.length],
            ] as const
          ).map(([id, label, n]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={homeTab === id}
              onClick={() => setHomeTab(id)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 pt-1 text-[16px] transition-colors ${FOCUS} ${homeTab === id ? "border-[#18280E] font-bold" : "border-transparent text-[#4A5B38] hover:text-[#090F05]"}`}
            >
              {label}
              <span className="text-sm font-normal text-[#4A5B38]">{n}</span>
            </button>
          ))}
        </div>

        {homeTab === "work" && (
          <ul>
            {WORK.map((w) => (
              <Row
                key={w.id}
                title={w.title}
                lead={<span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DOT[w.kind]}`} aria-hidden />}
                meta={
                  <>
                    <span className="truncate">{w.tags.join(" · ")}</span>
                    <Pill tone={w.kind === "Concept" ? "sand" : "mint"}>{w.kind}</Pill>
                  </>
                }
                onClick={() => openWork(w)}
              />
            ))}
          </ul>
        )}
        {homeTab === "projects" && (
          <ul>
            {SIDE_PROJECTS.map((p) => (
              <Row key={p.slug} title={p.title} meta={<span className="truncate">{p.summary}</span>} right={<Pill tone={p.status === "Live" ? "lime" : "sand"}>{p.status}</Pill>} href={p.url} />
            ))}
          </ul>
        )}
        {homeTab === "writing" && (
          <ul>
            {posts.map((p) => (
              <Row key={p.slug} title={p.title} meta={<span className="truncate">{p.description}</span>} right={<span className="hidden whitespace-nowrap text-sm text-[#4A5B38] sm:block">{formatDay(p.date)}</span>} href={`/writing/${p.slug}`} />
            ))}
          </ul>
        )}
      </div>
      <p className="mt-auto pt-10 text-center text-xs text-[#4A5B38]">Adi.Os is an AI trained on my resume. It can get things wrong.</p>
    </div>
  );

  const workDetail = detail && (
    <div className="dir-fade mx-auto w-full max-w-[760px] px-5 pb-12 pt-4 sm:px-6">
      <button type="button" onClick={() => setDetail(null)} className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2 pr-3 text-sm transition-colors hover:bg-[#F4FAED] ${FOCUS}`}>
        <ArrowLeft className="h-4 w-4" aria-hidden /> All work
      </button>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${DOT[detail.kind]}`} aria-hidden />
        <span className="text-sm text-[#4A5B38]">{detail.kind}</span>
        {detail.tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
      <h1 className="mt-2 font-[family-name:var(--font-glyphic)] text-[34px] leading-tight">{detail.title}</h1>
      <p className="mt-2 text-[17px] leading-relaxed text-[#2E3D22]">{detail.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={detail.href} className={`flex items-center gap-2 rounded-full bg-[#18280E] px-5 py-2.5 font-mono text-sm text-[#B2EB76] transition-colors hover:bg-black ${FOCUS}`}>
          Open case study <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={() => ask(`Tell me about the ${detail.title} project`)}
          disabled={atLimit || loading}
          className={`rounded-full ${LINE} bg-white px-5 py-2.5 text-sm transition-colors hover:bg-[#F4FAED] disabled:opacity-40 ${FOCUS}`}
        >
          Ask Adi.Os about it
        </button>
      </div>
      <div className="relative mt-8 h-[420px] overflow-hidden rounded-[24px] bg-[#F4FAED]">
        <Image
          src={detail.mockup}
          alt={`${detail.title} preview`}
          fill
          sizes="(min-width: 768px) 712px, 100vw"
          className={detail.phone ? "object-contain object-bottom pt-8" : "object-cover object-left-top pl-8 pt-8"}
        />
      </div>
      <div className="mt-8">
        <p className="text-xs tracking-[0.08em] text-[#4A5B38]">MORE WORK</p>
        <ul className="mt-1">
          {WORK.filter((w) => w.id !== detail.id)
            .slice(0, 3)
            .map((w) => (
              <Row key={w.id} title={w.title} meta={<span className="truncate">{w.description}</span>} lead={<Thumb item={w} />} onClick={() => openWork(w)} />
            ))}
        </ul>
      </div>
    </div>
  );

  const view = (() => {
    const wrap = (children: React.ReactNode) => <div className="dir-fade mx-auto w-full max-w-[760px] px-5 pb-12 pt-4 sm:px-6">{children}</div>;
    switch (page) {
      case "work":
        return (
          workDetail ||
          wrap(
            <>
              <ViewHeader title="Work" sub="Case studies, concepts and the things I build on the side." href="/work" />
              {WORK_GROUPS.map((g) => (
                <section key={g.kind} className="pt-6">
                  <h2 className="flex items-center gap-3 px-2 text-sm font-bold">
                    <span className={`h-2.5 w-2.5 rounded-full ${DOT[g.kind]}`} aria-hidden />
                    {g.label}
                    <span className="font-normal text-[#4A5B38]">{g.items.length}</span>
                  </h2>
                  <ul className="mt-1">
                    {g.items.map((w) => (
                      <Row key={w.id} title={w.title} lead={<Thumb item={w} />} meta={<span className="truncate">{w.description}</span>} onClick={() => openWork(w)} />
                    ))}
                  </ul>
                </section>
              ))}
            </>,
          )
        );
      case "projects":
        return wrap(
          <>
            <ViewHeader title="Projects" sub="Small products I run on my own time." href="/projects" />
            <ul className="mt-2">
              {SIDE_PROJECTS.map((p) => (
                <Row key={p.slug} title={p.title} meta={<span className="truncate">{p.summary}</span>} right={<Pill tone={p.status === "Live" ? "lime" : "sand"}>{p.status}</Pill>} href={p.url} />
              ))}
            </ul>
          </>,
        );
      case "writing":
        return wrap(
          <>
            <ViewHeader title="Writing" sub="Notes on shipping side projects and what I learn." href="/writing" />
            <ul className="mt-2">
              {posts.map((p) => (
                <Row
                  key={p.slug}
                  title={p.title}
                  meta={
                    <>
                      <span className="truncate">{p.description}</span>
                      {p.draft && <Pill tone="sand">Draft</Pill>}
                    </>
                  }
                  right={<span className="hidden whitespace-nowrap text-sm text-[#4A5B38] sm:block">{formatDay(p.date)}</span>}
                  href={`/writing/${p.slug}`}
                />
              ))}
            </ul>
          </>,
        );
      case "about":
        return wrap(
          <>
            <ViewHeader title="About" sub={`${PROFILE.role} · ${PROFILE.location}`} href="/aboutme" />
            <section className="pt-6">
              <h2 className="px-2 text-sm font-bold">Experience</h2>
              <ul className="mt-1">
                {EXPERIENCE.map((e) => (
                  <li key={e.role + e.period} className="flex gap-4 border-b-[0.5px] border-[#D3DFC6] px-2 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-bold leading-snug">{e.role}</span>
                      <span className="mt-0.5 block text-sm text-[#4A5B38]">{e.company}</span>
                    </span>
                    <span className="whitespace-nowrap pt-0.5 text-sm text-[#4A5B38]">{e.period}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="pt-6">
              <h2 className="px-2 text-sm font-bold">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2 px-2">
                {SKILLS.map((s) => (
                  <span key={s} className={`rounded-full ${LINE} px-3 py-1 text-sm`}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </>,
        );
      case "playground":
        return wrap(
          <>
            <ViewHeader title="Playground" sub="The longer stories behind my side projects." href="/playground" />
            <ul className="mt-2">
              {PLAYGROUND.map((p) => (
                <Row key={p.href} title={p.title} meta={<span className="truncate">{p.description}</span>} href={p.href} />
              ))}
            </ul>
          </>,
        );
      case "career":
        return wrap(
          <>
            <ViewHeader title="Career Odyssey" sub="How I got here, year by year." href="/career-odyssey" />
            <ul className="mt-2">
              {[...EXPERIENCE].reverse().map((e) => (
                <li key={e.role + e.period} className="flex gap-4 border-b-[0.5px] border-[#D3DFC6] px-2 py-3">
                  <span className="w-20 shrink-0 font-mono text-sm text-[#4A5B38]">{e.period.split("–")[0].trim()}</span>
                  <span className="min-w-0 flex-1 text-[15px]">
                    <b>{e.role}</b> at {e.company}
                  </span>
                </li>
              ))}
            </ul>
          </>,
        );
      case "changelog":
        return wrap(
          <>
            <ViewHeader title="Changelog" sub="Every change to this site, newest first." href="/changelog" />
            <ul className="mt-2">
              {ACTIVITY.slice(0, 12).map((a) => (
                <li key={a.hash + a.title} className="flex gap-4 border-b-[0.5px] border-[#D3DFC6] px-2 py-3">
                  <span className="w-24 shrink-0 text-sm text-[#4A5B38]">{formatDay(a.date)}</span>
                  <span className="min-w-0 flex-1 text-[15px]">{a.title}</span>
                </li>
              ))}
            </ul>
          </>,
        );
      case "links":
        return wrap(
          <>
            <ViewHeader title="Links" sub="Where to find me, plus bookmarks and communities." href="/links" />
            <ul className="mt-2">
              {SOCIALS.map((s) => (
                <Row key={s.label} title={s.label} meta={s.handle} href={s.href} />
              ))}
              <Row title="Résumé" meta="Google Doc" href={PROFILE.resume} />
              <Row title="Bookmarks and communities" meta="The full links page" href="/links" />
            </ul>
          </>,
        );
      case "chat":
        return (
          <div className="mx-auto flex h-full w-full max-w-[760px] flex-col px-5 sm:px-6">
            <div className="flex-1 py-6">
              <div className="flex flex-col gap-4">
                {messages.map((m) =>
                  m.role === "user" ? (
                    <div key={m.id} className="ml-auto max-w-[80%] rounded-[20px] bg-[#E6F0DA] px-4 py-2.5 text-[15px]">
                      {messageText(m)}
                    </div>
                  ) : (
                    <p key={m.id} className="dir-fade max-w-[88%] whitespace-pre-wrap text-[15px] leading-relaxed">
                      <RichText text={messageText(m)} linkClass={LINK_CLASS} />
                    </p>
                  ),
                )}
                {status === "submitted" && (
                  <div role="status" aria-label="Adi.Os is typing" className="flex h-6 items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="dir-dot h-2 w-2 rounded-full bg-[#18280E]/60" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                )}
                {error && <p className="text-sm text-[#8A2C12]">Something went wrong. Try again in a moment.</p>}
              </div>
            </div>
            <div className="sticky bottom-0 bg-white pb-6 pt-2">
              <Composer value={text} onChange={setText} onSend={ask} disabled={atLimit || loading} compact inputRef={inputRef} />
            </div>
          </div>
        );
      default:
        return home;
    }
  })();

  return (
    <div className="flex h-[100dvh] bg-white text-[#090F05] [font-family:var(--font-inter)]">
      {navOpen && !desktop && <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className="fixed inset-0 z-30 bg-[#090F05]/30" />}
      <div
        inert={sidebarHidden}
        className={`fixed inset-y-0 left-0 z-40 w-[288px] transition-transform duration-300 ease-out motion-reduce:transition-none lg:static lg:z-auto lg:shrink-0 lg:translate-x-0 lg:overflow-hidden lg:transition-[width] ${navOpen ? "translate-x-0" : "-translate-x-full"} ${leftOpen ? "lg:w-[288px]" : "lg:w-0"}`}
      >
        {sidebar}
      </div>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2 px-3">
          {(!desktop || !leftOpen) && (
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => (desktop ? setLeftOpen(true) : setNavOpen(true))}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F4FAED] ${FOCUS}`}
            >
              {desktop ? <PanelLeftOpen className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          )}
          {page !== "home" && (
            <button type="button" onClick={() => go("home")} className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2 pr-3 text-sm transition-colors hover:bg-[#F4FAED] ${FOCUS}`}>
              <ArrowLeft className="h-4 w-4" aria-hidden /> Home
            </button>
          )}
          <span className="min-w-0 flex-1 truncate text-center text-[15px] font-bold">{page === "home" ? "" : crumb}</span>
          <button
            type="button"
            aria-label={rightOpen ? "Close profile panel" : "Open profile panel"}
            aria-pressed={rightOpen}
            onClick={() => setRightOpen((o) => !o)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F4FAED] ${FOCUS} ${rightOpen ? "bg-[#F4FAED]" : ""}`}
          >
            <PanelRight className="h-4 w-4" />
          </button>
        </div>
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          {view}
        </div>
      </main>

      {panelOverlay && <button type="button" aria-label="Close profile panel" onClick={() => setRightOpen(false)} className="fixed inset-0 z-30 bg-[#090F05]/30" />}
      <div
        inert={!rightOpen}
        className={`fixed inset-y-0 right-0 z-40 w-[320px] max-w-[88vw] bg-white transition-transform duration-300 ease-out motion-reduce:transition-none xl:static xl:z-auto xl:shrink-0 xl:overflow-hidden xl:transition-[width] ${rightOpen ? "translate-x-0 xl:w-[320px]" : "translate-x-full xl:w-0 xl:translate-x-0"}`}
      >
        <aside aria-label="Profile" className="flex h-full w-[320px] max-w-[88vw] flex-col overflow-y-auto border-l-[0.5px] border-[#D3DFC6] p-5">
          <div className="flex items-start gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
              <Image src={PROFILE.photo} alt={PROFILE.name} fill sizes="56px" className="object-cover" />
            </span>
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-glyphic)] text-xl leading-tight">{PROFILE.name}</p>
              <p className="mt-0.5 text-sm text-[#4A5B38]">{PROFILE.role}</p>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#D3DFC6] text-sm">
            {[
              ["Status", PROFILE.status],
              ["Open to", PROFILE.statusDetail],
              ["Based in", PROFILE.location],
              ["Local time", clock ? `${clock} IST` : "IST"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#F4FAED] p-3">
                <dt className="text-xs text-[#4A5B38]">{k}</dt>
                <dd className="mt-0.5 font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex gap-2">
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className={`flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#18280E] px-4 py-2.5 font-mono text-sm text-[#B2EB76] hover:bg-black ${FOCUS}`}>
              Résumé <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer" className={`flex flex-1 items-center justify-center gap-1.5 rounded-full ${LINE} px-4 py-2.5 text-sm hover:bg-[#F4FAED] ${FOCUS}`}>
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <p className="text-xs tracking-[0.08em] text-[#4A5B38]">RECENTLY SHIPPED</p>
            <button type="button" onClick={() => go("changelog")} className={`rounded-full px-2 py-1 text-xs underline-offset-2 hover:underline ${FOCUS}`}>
              All
            </button>
          </div>
          <ol className="mt-2 flex flex-col">
            {ACTIVITY.slice(0, 5).map((a) => (
              <li key={a.hash + a.title} className="flex gap-3 border-b-[0.5px] border-[#D3DFC6] py-2.5 last:border-0">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8ED14B]" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] leading-snug">{a.title}</span>
                  <span className="mt-0.5 block text-xs text-[#4A5B38]">{formatDay(a.date)}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-7 text-xs tracking-[0.08em] text-[#4A5B38]">TOOLSTACK</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full bg-[#F4FAED] px-2.5 py-1 text-xs">
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
