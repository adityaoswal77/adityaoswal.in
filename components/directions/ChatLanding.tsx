"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FileText,
  FlaskConical,
  Folder,
  Link2,
  Map as MapIcon,
  Menu,
  MessageCircle,
  ScrollText,
  SquarePen,
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
  WORK,
  WORK_GROUPS,
  formatDay,
  monthLabel,
  type PageId,
  type PostSummary,
  type WorkItem,
} from "./data";
import { MESSAGE_LIMIT, RichText, messageText } from "./ChatThread";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18280E] focus-visible:ring-offset-1";
const LINK_CLASS = "underline decoration-[#18280E]/30 underline-offset-2 hover:decoration-[#18280E]";

type SidePage = Exclude<PageId, "home">;
const ICONS: Record<SidePage, typeof User> = {
  about: User,
  work: Briefcase,
  projects: Folder,
  playground: FlaskConical,
  writing: BookOpen,
  career: MapIcon,
  changelog: ScrollText,
  links: Link2,
};
const SIDE_ORDER: SidePage[] = ["about", "work", "projects", "playground", "writing", "career", "changelog", "links"];

type Topic = "work" | "alivecor" | "side" | "contact";
const TOPICS: { id: Topic; prompt: string }[] = [
  { id: "work", prompt: "Show me your work" },
  { id: "alivecor", prompt: "What did you do at AliveCor?" },
  { id: "side", prompt: "What are you building on the side?" },
  { id: "contact", prompt: "How do I reach you?" },
];

type Item =
  | { id: string; from: "me"; text: string }
  | { id: string; from: "aditya"; text: string; card?: Topic | "recent" }
  | { id: string; from: "ai"; n: number };

const SEED: Item[] = [
  { id: "s1", from: "aditya", text: "Hey, I’m Aditya." },
  { id: "s2", from: "aditya", text: `I’m a ${PROFILE.role.toLowerCase()} in Bangalore. I design products end to end and build the front end myself.` },
  { id: "s3", from: "aditya", text: "Right now I’m open to work: freelance projects or a new full-time role." },
  { id: "s4", from: "aditya", text: "Here’s some of my recent work.", card: "recent" },
  { id: "s5", from: "aditya", text: "Ask me anything below, or open a page from the sidebar." },
];

function Avatar({ size = 28 }: { size?: number }) {
  return (
    <span className="relative shrink-0 overflow-hidden rounded-full" style={{ width: size, height: size }}>
      <Image src={PROFILE.photo} alt="" fill sizes={`${size}px`} className="object-cover" />
    </span>
  );
}

function WorkCard({ w }: { w: WorkItem }) {
  return (
    <Link href={w.href} className={`group block w-[220px] shrink-0 overflow-hidden rounded-2xl border border-[#E2EADA] bg-white transition-colors hover:border-[#18280E]/30 ${FOCUS}`}>
      <span className="relative block h-[124px] bg-[#F4FAED]">
        <Image src={w.mockup} alt="" fill sizes="220px" className={w.phone ? "object-cover object-top" : "object-cover object-left-top"} />
      </span>
      <span className="block p-3">
        <span className="block text-[14px] font-semibold leading-snug">{w.title}</span>
        <span className="mt-0.5 block text-[12.5px] text-[#4A5B38]">{w.kind}</span>
      </span>
    </Link>
  );
}

function Card({ topic }: { topic: Topic | "recent" }) {
  if (topic === "recent" || topic === "work") {
    const list = topic === "recent" ? WORK.slice(0, 4) : WORK;
    return (
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
        {list.map((w) => (
          <WorkCard key={w.id} w={w} />
        ))}
      </div>
    );
  }
  if (topic === "side") {
    return (
      <div className="flex flex-col gap-2">
        {SIDE_PROJECTS.map((p) => (
          <a key={p.slug} href={p.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 rounded-2xl border border-[#E2EADA] bg-white px-4 py-3 transition-colors hover:border-[#18280E]/30 ${FOCUS}`}>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold">{p.title}</span>
              <span className="block truncate text-[13px] text-[#4A5B38]">{p.summary}</span>
            </span>
            <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] ${p.status === "Live" ? "bg-[#B2EB76]" : "bg-[#F3EDD8] text-[#5B4A1C]"}`}>{p.status}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#4A5B38]" aria-hidden />
          </a>
        ))}
      </div>
    );
  }
  if (topic === "contact") {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[...SOCIALS, { label: "Résumé", handle: "Google Doc", href: PROFILE.resume }].map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`rounded-2xl border border-[#E2EADA] bg-white px-3 py-2.5 transition-colors hover:border-[#18280E]/30 ${FOCUS}`}>
            <span className="flex items-center justify-between text-[14px] font-semibold">
              {s.label} <ArrowUpRight className="h-3.5 w-3.5 text-[#4A5B38]" aria-hidden />
            </span>
            <span className="block truncate text-[12.5px] text-[#4A5B38]">{s.handle}</span>
          </a>
        ))}
      </div>
    );
  }
  if (topic === "alivecor") {
    return (
      <div className="flex flex-col gap-2">
        {EXPERIENCE.filter((e) => e.company === "AliveCor Inc.").map((e) => (
          <div key={e.role} className="rounded-2xl border border-[#E2EADA] bg-white px-4 py-3">
            <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-[14px] font-semibold">
              {e.role} <span className="text-[12.5px] font-normal text-[#4A5B38]">{e.period}</span>
            </p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-[#2E3D22]">{e.description}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

const ANSWERS: Record<Topic, string> = {
  work: "Here’s everything. Case studies first, then concepts and side projects. Tap one to open it.",
  alivecor: (() => {
    const roles = EXPERIENCE.filter((e) => e.company === "AliveCor Inc.");
    const first = roles[roles.length - 1];
    const last = roles[0];
    return `I was at AliveCor from ${monthLabel(first.start)} to ${monthLabel(last.end)}, first as an ${first.role}, then as a ${last.role}.`;
  })(),
  side: "A few things I run on my own time:",
  contact: "LinkedIn is the fastest. Here’s everything:",
};

export function ChatLanding({ posts }: { posts: PostSummary[] }) {
  const reduce = useRef(false);
  const [shown, setShown] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<SidePage | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [text, setText] = useState("");
  const [pendingScripted, setPendingScripted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const seedTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const transport = useMemo(() => new TextStreamChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({ transport });
  const aiReplies = messages.filter((m) => m.role === "assistant");
  const aiAsks = items.filter((i) => i.from === "ai").length;
  const loading = status === "submitted" || status === "streaming";
  const atLimit = messages.filter((m) => m.role === "user").length >= MESSAGE_LIMIT;

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) {
      setShown(SEED.length);
      return;
    }
    SEED.forEach((_, i) => seedTimers.current.push(setTimeout(() => setShown(i + 1), 350 + i * 650)));
    const seeds = seedTimers.current;
    const replies = timers.current;
    return () => [...seeds, ...replies].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && !page) el.scrollTo({ top: el.scrollHeight, behavior: reduce.current ? "auto" : "smooth" });
  }, [shown, items, messages, pendingScripted, page]);

  const seedDone = shown >= SEED.length;
  const finishSeed = () => {
    seedTimers.current.forEach(clearTimeout);
    setShown(SEED.length);
  };

  const askTopic = (t: Topic) => {
    const prompt = TOPICS.find((x) => x.id === t)?.prompt ?? "";
    setPage(null);
    setNavOpen(false);
    finishSeed();
    setItems((list) => [...list, { id: `me-${Date.now()}`, from: "me", text: prompt }]);
    setPendingScripted(true);
    timers.current.push(
      setTimeout(
        () => {
          setPendingScripted(false);
          setItems((list) => [...list, { id: `ad-${Date.now()}`, from: "aditya", text: ANSWERS[t], card: t }]);
        },
        reduce.current ? 0 : 700,
      ),
    );
  };

  const askFree = (q: string) => {
    if (loading || atLimit) return;
    const hit = TOPICS.find((t) => t.prompt.toLowerCase() === q.toLowerCase());
    setText("");
    if (hit) return askTopic(hit.id);
    setPage(null);
    finishSeed();
    setItems((list) => [...list, { id: `me-${Date.now()}`, from: "me", text: q }, { id: `ai-${Date.now()}`, from: "ai", n: aiAsks }]);
    sendMessage({ text: q });
  };

  const restart = () => {
    setItems([]);
    setPage(null);
    setNavOpen(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const asked = new Set(items.filter((i) => i.from === "me").map((i) => (i as { text: string }).text));
  const chips = TOPICS.filter((t) => !asked.has(t.prompt));

  const bubble = (item: Item, first: boolean) => {
    if (item.from === "me") {
      return (
        <div key={item.id} className="dir-fade ml-auto max-w-[80%] rounded-[20px] rounded-br-md bg-[#18280E] px-4 py-2.5 text-[15px] text-white">
          {item.text}
        </div>
      );
    }
    if (item.from === "ai") {
      const reply = aiReplies[item.n];
      const body = reply ? messageText(reply) : "";
      return (
        <div key={item.id} className="dir-fade flex max-w-[88%] items-end gap-2.5">
          <Avatar />
          <div className="min-w-0">
            <p className="mb-1 text-[11.5px] text-[#4A5B38]">Adi.Os · AI answer from my resume</p>
            <div className="rounded-[20px] rounded-bl-md bg-[#F4FAED] px-4 py-2.5 text-[15px] leading-relaxed">
              {body ? (
                <span className="whitespace-pre-wrap">
                  <RichText text={body} linkClass={LINK_CLASS} />
                </span>
              ) : error && item.n === aiAsks - 1 ? (
                "Something went wrong. Try again in a moment."
              ) : (
                <Dots />
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={item.id} className="dir-fade flex flex-col gap-2">
        <div className="flex max-w-[88%] items-end gap-2.5">
          {first ? <Avatar /> : <span className="w-7 shrink-0" />}
          <div className="rounded-[20px] rounded-bl-md bg-[#F4FAED] px-4 py-2.5 text-[15px] leading-relaxed">{item.text}</div>
        </div>
        {item.card && (
          <div className="pl-[38px]">
            <Card topic={item.card} />
          </div>
        )}
      </div>
    );
  };

  const thread = [...SEED.slice(0, shown), ...items];

  const sidebar = (
    <aside className="flex h-full w-[264px] flex-col bg-[#F7F9F4] p-3">
      <div className="flex items-center gap-2 px-2 pt-1">
        <span className="text-[17px] font-bold tracking-tight">aditya.chat</span>
        <span className="flex-1" />
        <button type="button" aria-label="New chat" title="New chat" onClick={restart} className={`rounded-lg p-1.5 hover:bg-[#E9F0E0] ${FOCUS}`}>
          <SquarePen className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className={`rounded-lg p-1.5 hover:bg-[#E9F0E0] lg:hidden ${FOCUS}`}>
          <X className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          setPage(null);
          setNavOpen(false);
        }}
        aria-current={!page ? "page" : undefined}
        className={`mt-4 flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[14px] ${FOCUS} ${!page ? "bg-[#E4EDD8] font-semibold" : "hover:bg-[#E9F0E0]"}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Chat with me
      </button>

      <p className="mt-5 px-2.5 text-[12px] font-semibold text-[#4A5B38]">Pages</p>
      <nav aria-label="Pages" className="mt-1 flex flex-col gap-px">
        {SIDE_ORDER.map((id) => {
          const Icon = ICONS[id];
          const label = PAGES.find((p) => p.id === id)?.label;
          return (
            <button
              key={id}
              type="button"
              aria-current={page === id ? "page" : undefined}
              onClick={() => {
                setPage(id);
                setNavOpen(false);
                scrollRef.current?.scrollTo({ top: 0 });
              }}
              className={`flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[14px] ${FOCUS} ${page === id ? "bg-[#E4EDD8] font-semibold" : "hover:bg-[#E9F0E0]"}`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {label}
            </button>
          );
        })}
      </nav>

      <p className="mt-5 px-2.5 text-[12px] font-semibold text-[#4A5B38]">Ask me about</p>
      <div className="mt-1 flex flex-col gap-px">
        {TOPICS.map((t) => (
          <button key={t.id} type="button" onClick={() => askTopic(t.id)} className={`truncate rounded-lg px-2.5 py-2 text-left text-[14px] text-[#2E3D22] hover:bg-[#E9F0E0] ${FOCUS}`}>
            {t.prompt}
          </button>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2.5 rounded-xl px-2 py-2">
        <Avatar size={32} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold">{PROFILE.name}</span>
          <span className="flex items-center gap-1.5 text-[12px] text-[#4A5B38]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5FA82B]" aria-hidden /> {PROFILE.status}
          </span>
        </span>
        <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" aria-label="Résumé" title="Résumé" className={`rounded-lg p-1.5 hover:bg-[#E9F0E0] ${FOCUS}`}>
          <FileText className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );

  const pageView = page && (
    <div className="dir-fade mx-auto w-full max-w-[720px] px-5 pb-16 pt-6">
      <button type="button" onClick={() => setPage(null)} className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2 pr-3 text-sm hover:bg-[#F4FAED] ${FOCUS}`}>
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to chat
      </button>
      <div className="mt-4 flex items-end justify-between gap-4 border-b border-[#E2EADA] pb-4">
        <h1 className="font-[family-name:var(--font-glyphic)] text-[30px] leading-tight">{PAGES.find((p) => p.id === page)?.label}</h1>
        <Link href={PAGES.find((p) => p.id === page)?.href ?? "/"} className={`flex items-center gap-1 rounded-full border border-[#E2EADA] px-3 py-1.5 text-sm hover:bg-[#F4FAED] ${FOCUS}`}>
          Full page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      {page === "about" && (
        <>
          <div className="mt-6 flex items-center gap-4">
            <Avatar size={64} />
            <div>
              <p className="text-[18px] font-semibold">{PROFILE.name}</p>
              <p className="text-[14px] text-[#4A5B38]">
                {PROFILE.role} · {PROFILE.location}
              </p>
            </div>
          </div>
          <h2 className="mt-8 text-[13px] font-semibold text-[#4A5B38]">Experience</h2>
          <ul className="mt-2">
            {EXPERIENCE.map((e) => (
              <li key={e.role + e.period} className="border-b border-[#E2EADA] py-3">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-[15px] font-semibold">
                    {e.role} <span className="font-normal text-[#4A5B38]">· {e.company}</span>
                  </span>
                  <span className="text-[13px] text-[#4A5B38]">{e.period}</span>
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-[#2E3D22]">{e.description}</p>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-[13px] font-semibold text-[#4A5B38]">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SKILLS.map((s) => (
              <span key={s} className="rounded-full bg-[#F4FAED] px-3 py-1 text-[13px]">
                {s}
              </span>
            ))}
          </div>
        </>
      )}
      {page === "work" &&
        WORK_GROUPS.map((g) => (
          <section key={g.kind} className="mt-6">
            <h2 className="text-[13px] font-semibold text-[#4A5B38]">{g.label}</h2>
            <div className="mt-2 flex flex-wrap gap-3">
              {g.items.map((w) => (
                <WorkCard key={w.id} w={w} />
              ))}
            </div>
          </section>
        ))}
      {page === "projects" && (
        <div className="mt-6">
          <Card topic="side" />
        </div>
      )}
      {page === "playground" && (
        <ul className="mt-4">
          {PLAYGROUND.map((p) => (
            <li key={p.href} className="border-b border-[#E2EADA]">
              <Link href={p.href} className={`flex items-center gap-3 py-3 ${FOCUS}`}>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">{p.title}</span>
                  <span className="block text-[14px] text-[#4A5B38]">{p.description}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#4A5B38]" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {page === "writing" && (
        <ul className="mt-4">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-[#E2EADA]">
              <Link href={`/writing/${p.slug}`} className={`block py-3 ${FOCUS}`}>
                <span className="block text-[15px] font-semibold">{p.title}</span>
                <span className="mt-0.5 block text-[14px] text-[#4A5B38]">{p.description}</span>
                <span className="mt-1 block text-[12.5px] text-[#4A5B38]">{formatDay(p.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {page === "career" && (
        <ol className="mt-4">
          {[...EXPERIENCE].reverse().map((e) => (
            <li key={e.role + e.period} className="flex gap-4 border-b border-[#E2EADA] py-3">
              <span className="w-20 shrink-0 text-[13px] text-[#4A5B38]">{e.period.split("–")[0].trim()}</span>
              <span className="text-[15px]">
                <b className="font-semibold">{e.role}</b> at {e.company}
              </span>
            </li>
          ))}
        </ol>
      )}
      {page === "changelog" && (
        <ul className="mt-4">
          {ACTIVITY.slice(0, 15).map((a, i) => (
            <li key={a.hash + i} className="flex gap-4 border-b border-[#E2EADA] py-3">
              <span className="w-24 shrink-0 text-[13px] text-[#4A5B38]">{formatDay(a.date)}</span>
              <span className="text-[15px]">{a.title}</span>
            </li>
          ))}
        </ul>
      )}
      {page === "links" && (
        <div className="mt-6">
          <Card topic="contact" />
          <Link href="/links" className={`mt-4 inline-flex items-center gap-1 text-[14px] ${LINK_CLASS}`}>
            Bookmarks and communities <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-[100dvh] bg-white text-[#090F05] [font-family:var(--font-geist)]">
      {navOpen && <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className="fixed inset-0 z-30 bg-[#090F05]/30 lg:hidden" />}
      <div className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 motion-reduce:transition-none lg:static lg:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</div>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#EEF3E8] px-4">
          <button type="button" aria-label="Open menu" onClick={() => setNavOpen(true)} className={`rounded-lg p-1.5 hover:bg-[#F4FAED] lg:hidden ${FOCUS}`}>
            <Menu className="h-4 w-4" />
          </button>
          <Avatar size={32} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight">{PROFILE.name}</p>
            <p className="flex items-center gap-1.5 truncate text-[12.5px] text-[#4A5B38]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5FA82B]" aria-hidden />
              {PROFILE.status} · {PROFILE.role}
            </p>
          </div>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className={`hidden items-center gap-1.5 rounded-full bg-[#18280E] px-4 py-2 font-mono text-[13px] text-[#B2EB76] hover:bg-black sm:flex ${FOCUS}`}>
            Résumé <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          {page ? (
            pageView
          ) : (
            <div className="mx-auto flex min-h-full w-full max-w-[720px] flex-col px-5 pt-8">
              <p className="mb-6 text-center text-[12px] text-[#4A5B38]">Today</p>
              <div className="flex flex-col gap-2.5" aria-live="polite">
                {thread.map((item, i) => bubble(item, item.from === "aditya" && (i === 0 || thread[i - 1].from !== "aditya")))}
                {(!seedDone || pendingScripted) && (
                  <div className="flex items-end gap-2.5">
                    <Avatar />
                    <div className="rounded-[20px] rounded-bl-md bg-[#F4FAED] px-4 py-3">
                      <Dots />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1" />
              <div className="sticky bottom-0 bg-white pb-5 pt-6">
                {seedDone && chips.length > 0 && (
                  <div className="mb-3 flex flex-wrap justify-end gap-2">
                    {chips.map((c) => (
                      <button key={c.id} type="button" onClick={() => askTopic(c.id)} className={`rounded-full border border-[#18280E]/20 px-3.5 py-1.5 text-[14px] transition-colors hover:bg-[#F4FAED] ${FOCUS}`}>
                        {c.prompt}
                      </button>
                    ))}
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (text.trim()) askFree(text.trim());
                  }}
                  className="flex items-end gap-2 rounded-[26px] border border-[#E2EADA] bg-white p-2 pl-4 shadow-[0_8px_30px_-18px_rgba(24,40,14,0.35)] focus-within:border-[#18280E]/40"
                >
                  <label htmlFor="chat-input" className="sr-only">
                    Message Aditya
                  </label>
                  <textarea
                    id="chat-input"
                    ref={inputRef}
                    rows={1}
                    value={text}
                    disabled={atLimit}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (text.trim()) askFree(text.trim());
                      }
                    }}
                    placeholder={atLimit ? "That’s the 10-message limit for this session" : "Message Aditya…"}
                    className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent py-2 text-[15px] outline-none placeholder:text-[#4A5B38]/70"
                  />
                  <button type="submit" aria-label="Send" disabled={!text.trim() || loading || atLimit} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#18280E] text-[#B2EB76] disabled:opacity-35 ${FOCUS}`}>
                    <ArrowUp className="h-4 w-4" aria-hidden />
                  </button>
                </form>
                <p className="mt-2 text-center text-[11.5px] text-[#4A5B38]">Typed questions are answered by Adi.Os, an AI trained on my resume. It can get things wrong.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Dots() {
  return (
    <span role="status" aria-label="Typing" className="flex h-5 items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="dir-dot h-1.5 w-1.5 rounded-full bg-[#18280E]/60" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}
