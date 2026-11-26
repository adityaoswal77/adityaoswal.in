"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FlaskConical,
  Folder,
  LayoutDashboard,
  Link2,
  Map as MapIcon,
  Menu,
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
  activityByMonth,
  formatDay,
  monthLabel,
  type PageId,
  type PostSummary,
  type WorkKind,
} from "./data";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18280E] focus-visible:ring-offset-2";
const CARD = "rounded-2xl border border-[#E2EADA] bg-white";
const LABEL = "font-mono text-[11px] uppercase tracking-[0.12em] text-[#4A5B38]";
const ICONS: Record<PageId, typeof User> = {
  home: LayoutDashboard,
  work: Briefcase,
  projects: Folder,
  writing: BookOpen,
  about: User,
  playground: FlaskConical,
  career: MapIcon,
  changelog: ScrollText,
  links: Link2,
};

function Corners() {
  const c = "absolute h-2 w-2 border-[#18280E]";
  return (
    <span aria-hidden>
      <span className={`${c} -left-px -top-px border-l border-t`} />
      <span className={`${c} -right-px -top-px border-r border-t`} />
      <span className={`${c} -bottom-px -left-px border-b border-l`} />
      <span className={`${c} -bottom-px -right-px border-b border-r`} />
    </span>
  );
}

function Panel({ title, action, className = "", children }: { title: string; action?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={`${CARD} p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className={LABEL}>{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className={`relative ${CARD} p-5`}>
      <Corners />
      <p className={LABEL}>{label}</p>
      <p className="mt-3 font-[family-name:var(--font-glyphic)] text-[40px] leading-none">{value}</p>
      <p className="mt-2 text-[13px] text-[#4A5B38]">{sub}</p>
    </div>
  );
}

function ActivityChart() {
  const data = activityByMonth();
  const [hover, setHover] = useState<number | null>(null);
  const W = 560;
  const H = 180;
  const pad = { l: 24, r: 8, t: 12, b: 24 };
  const max = Math.max(...data.map((d) => d.count), 1);
  const top = Math.ceil(max / 2) * 2;
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const step = iw / data.length;
  const bw = Math.min(16, step * 0.36);
  const y = (v: number) => pad.t + ih - (v / top) * ih;
  const ticks = [0, top / 2, top];
  const bar = (x: number, v: number) => {
    const yt = y(v);
    const base = pad.t + ih;
    const r = Math.min(4, (base - yt) / 2, bw / 2);
    return `M${x},${base}V${yt + r}Q${x},${yt} ${x + r},${yt}H${x + bw - r}Q${x + bw},${yt} ${x + bw},${yt + r}V${base}Z`;
  };
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Site updates per month, from the changelog">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#E2EADA" strokeWidth={1} />
            <text x={pad.l - 8} y={y(t) + 3.5} textAnchor="end" className="fill-[#4A5B38] font-mono text-[8px]">
              {t}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad.l + i * step + (step - bw) / 2;
          return (
            <g key={d.key} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={pad.l + i * step} y={pad.t} width={step} height={ih} fill="transparent" />
              {d.count > 0 && <path d={bar(x, d.count)} fill={hover === i ? "#4A7A23" : "#18280E"} />}
              <text x={x + bw / 2} y={H - 6} textAnchor="middle" className="fill-[#4A5B38] font-mono text-[8px]">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-[#18280E] px-2.5 py-1.5 text-[12px] text-white shadow-lg"
          style={{ left: `${((pad.l + hover * step + step / 2) / W) * 100}%`, top: `${(y(data[hover].count) / H) * 100}%`, marginTop: -6 }}
        >
          {data[hover].label} {data[hover].key.slice(0, 4)} · <b className="font-semibold text-[#B2EB76]">{data[hover].count}</b> {data[hover].count === 1 ? "update" : "updates"}
        </div>
      )}
      <table className="sr-only">
        <caption>Site updates per month</caption>
        <tbody>
          {data.map((d) => (
            <tr key={d.key}>
              <th scope="row">{d.key}</th>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Timeline() {
  const min = Math.min(...EXPERIENCE.map((e) => e.start));
  const max = Math.max(...EXPERIENCE.map((e) => e.end)) + 1;
  const pct = (m: number) => ((m - min) / (max - min)) * 100;
  const years: number[] = [];
  for (let yr = Math.ceil(min / 12); yr * 12 < max; yr++) years.push(yr);
  return (
    <div>
      <div className="relative ml-[38%] h-5 sm:ml-[34%]">
        {years.map((yr) => (
          <span key={yr} className="absolute -translate-x-1/2 font-mono text-[10px] text-[#4A5B38]" style={{ left: `${pct(yr * 12)}%` }}>
            {yr}
          </span>
        ))}
      </div>
      <ul>
        {EXPERIENCE.map((e) => (
          <li key={e.role + e.period} className="grid grid-cols-[38%_1fr] items-center border-t border-[#EEF3E8] py-2 sm:grid-cols-[34%_1fr]">
            <span className="min-w-0 pr-3">
              <span className="block truncate text-[13px] font-semibold">{e.role}</span>
              <span className="block truncate text-[12px] text-[#4A5B38]">{e.company}</span>
            </span>
            <span className="relative h-6">
              {years.map((yr) => (
                <span key={yr} className="absolute inset-y-0 w-px bg-[#EEF3E8]" style={{ left: `${pct(yr * 12)}%` }} aria-hidden />
              ))}
              <span
                role="img"
                aria-label={`${monthLabel(e.start)} to ${monthLabel(e.end)}`}
                title={`${monthLabel(e.start)} – ${monthLabel(e.end)}`}
                className="absolute top-1/2 h-2.5 min-w-[6px] -translate-y-1/2 rounded-[4px] bg-[#18280E] transition-colors hover:bg-[#4A7A23]"
                style={{ left: `${pct(e.start)}%`, width: `${pct(e.end + 1) - pct(e.start)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const KIND_TINT: Record<WorkKind, string> = {
  "Case study": "bg-[#E6F0DA]",
  Concept: "bg-[#F3EDD8] text-[#5B4A1C]",
  "Side project": "bg-[#B2EB76]",
};

export function Overview({ posts }: { posts: PostSummary[] }) {
  const [page, setPage] = useState<PageId>("home");
  const [filter, setFilter] = useState<WorkKind | "All">("All");
  const [navOpen, setNavOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: PROFILE.timezone }));
      setToday(now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: PROFILE.timezone }));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const go = (p: PageId) => {
    setPage(p);
    setNavOpen(false);
  };
  const live = SIDE_PROJECTS.filter((p) => p.status === "Live").length;
  const firstMonth = ACTIVITY.length ? formatDay(ACTIVITY[ACTIVITY.length - 1].date).split(" ").slice(1).join(" ") : "";
  const current = PAGES.find((p) => p.id === page)!;
  const workCards = (list: typeof WORK) => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {list.map((w) => (
        <Link key={w.id} href={w.href} className={`group overflow-hidden ${CARD} transition-colors hover:border-[#18280E]/40 ${FOCUS}`}>
          <span className="relative block h-44 overflow-hidden bg-[#F4FAED]">
            <Image src={w.mockup} alt="" fill sizes="(min-width: 1280px) 380px, 50vw" className={`transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none ${w.phone ? "object-cover object-top" : "object-cover object-left-top"}`} />
          </span>
          <span className="block p-4">
            <span className="flex items-center justify-between gap-2">
              <span className="text-[15px] font-semibold">{w.title}</span>
              <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] ${KIND_TINT[w.kind]}`}>{w.kind}</span>
            </span>
            <span className="mt-1 block text-[13px] leading-relaxed text-[#4A5B38]">{w.description}</span>
          </span>
        </Link>
      ))}
    </div>
  );

  const statusCard = (
    <section className={`relative ${CARD} flex flex-col p-5`}>
      <Corners />
      <h2 className={LABEL}>Status</h2>
      <p className="mt-3 flex items-center gap-2 text-[22px] font-semibold">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#5FA82B] opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#5FA82B]" />
        </span>
        {PROFILE.status}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-y-3 text-[13px]">
        <dt className="text-[#4A5B38]">Open to</dt>
        <dd className="font-semibold">{PROFILE.statusDetail}</dd>
        <dt className="text-[#4A5B38]">Based in</dt>
        <dd className="font-semibold">{PROFILE.location}</dd>
        <dt className="text-[#4A5B38]">Local time</dt>
        <dd className="font-semibold">{clock ? `${clock} IST` : "IST"}</dd>
      </dl>
      <div className="mt-auto flex gap-2 pt-5">
        <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className={`flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#18280E] py-2.5 font-mono text-[13px] text-[#B2EB76] hover:bg-black ${FOCUS}`}>
          Résumé <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
        <a href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer" className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E2EADA] py-2.5 text-[13px] hover:bg-[#F4FAED] ${FOCUS}`}>
          LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </section>
  );

  const content = (() => {
    switch (page) {
      case "work":
        return (
          <>
            <div role="group" aria-label="Filter work" className="mb-5 flex flex-wrap gap-2">
              {(["All", ...WORK_GROUPS.map((g) => g.kind)] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={filter === k}
                  onClick={() => setFilter(k)}
                  className={`rounded-full px-4 py-1.5 font-mono text-[12px] transition-colors ${FOCUS} ${filter === k ? "bg-[#18280E] text-[#B2EB76]" : "border border-[#E2EADA] bg-white hover:bg-[#F4FAED]"}`}
                >
                  {k === "All" ? "All" : WORK_GROUPS.find((g) => g.kind === k)?.label} · {k === "All" ? WORK.length : WORK.filter((w) => w.kind === k).length}
                </button>
              ))}
            </div>
            {workCards(filter === "All" ? WORK : WORK.filter((w) => w.kind === filter))}
          </>
        );
      case "projects":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            {SIDE_PROJECTS.map((p) => (
              <a key={p.slug} href={p.url} target="_blank" rel="noopener noreferrer" className={`relative flex flex-col ${CARD} p-5 transition-colors hover:border-[#18280E]/40 ${FOCUS}`}>
                <Corners />
                <span className="flex items-center justify-between">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${p.status === "Live" ? "bg-[#B2EB76]" : "bg-[#F3EDD8] text-[#5B4A1C]"}`}>{p.status}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#4A5B38]" aria-hidden />
                </span>
                <span className="mt-6 font-[family-name:var(--font-glyphic)] text-[24px] leading-tight">{p.title}</span>
                <span className="mt-1 text-[13.5px] text-[#4A5B38]">{p.summary}</span>
                <span className="mt-4 font-mono text-[11px] text-[#4A5B38]">{p.url.replace(/^https?:\/\//, "")}</span>
              </a>
            ))}
          </div>
        );
      case "writing":
        return (
          <section className={CARD}>
            <ul>
              {posts.map((p) => (
                <li key={p.slug} className="border-b border-[#EEF3E8] last:border-0">
                  <Link href={`/writing/${p.slug}`} className={`flex items-center gap-4 rounded-2xl px-5 py-4 hover:bg-[#FBFDF8] ${FOCUS}`}>
                    <span className="w-24 shrink-0 font-mono text-[11px] text-[#4A5B38]">{formatDay(p.date)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold">{p.title}</span>
                      <span className="block truncate text-[13px] text-[#4A5B38]">{p.description}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#4A5B38]" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      case "about":
      case "career":
        return (
          <div className="grid gap-4 xl:grid-cols-3">
            <Panel title="Experience" className="xl:col-span-2">
              <Timeline />
            </Panel>
            <div className="flex flex-col gap-4">
              {statusCard}
              <Panel title="Toolstack">
                <div className="flex flex-wrap gap-1.5">
                  {TOOLS.map((t) => (
                    <span key={t} className="rounded-full bg-[#F4FAED] px-2.5 py-1 text-[12.5px]">
                      {t}
                    </span>
                  ))}
                </div>
              </Panel>
            </div>
            {page === "about" && (
              <Panel title="Skills" className="xl:col-span-3">
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS.map((s) => (
                    <span key={s} className="rounded-full border border-[#E2EADA] px-3 py-1 text-[13px]">
                      {s}
                    </span>
                  ))}
                </div>
              </Panel>
            )}
          </div>
        );
      case "playground":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {PLAYGROUND.map((p) => (
              <Link key={p.href} href={p.href} className={`relative ${CARD} p-6 transition-colors hover:border-[#18280E]/40 ${FOCUS}`}>
                <Corners />
                <span className="block font-[family-name:var(--font-glyphic)] text-[26px]">{p.title}</span>
                <span className="mt-1 block text-[14px] text-[#4A5B38]">{p.description}</span>
                <span className="mt-6 inline-flex items-center gap-1 font-mono text-[12px]">
                  Read the story <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        );
      case "changelog":
        return (
          <div className="grid gap-4 xl:grid-cols-3">
            <Panel title="Updates per month" className="xl:col-span-2">
              <ActivityChart />
            </Panel>
            <Stat label="Updates logged" value={ACTIVITY.length} sub={`Since ${firstMonth}`} />
            <section className={`${CARD} xl:col-span-3`}>
              <ul>
                {ACTIVITY.map((a, i) => (
                  <li key={a.hash + i} className="flex gap-4 border-b border-[#EEF3E8] px-5 py-3 last:border-0">
                    <span className="w-24 shrink-0 font-mono text-[11px] leading-5 text-[#4A5B38]">{formatDay(a.date)}</span>
                    <span className="text-[14px]">{a.title}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        );
      case "links":
        return (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[...SOCIALS, { label: "Résumé", handle: "Google Doc", href: PROFILE.resume }, { label: "Bookmarks", handle: "Tools and communities", href: "/links" }].map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") || s.href === PROFILE.resume ? "_blank" : undefined} rel="noopener noreferrer" className={`relative ${CARD} p-5 transition-colors hover:border-[#18280E]/40 ${FOCUS}`}>
                <Corners />
                <span className={LABEL}>{s.label}</span>
                <span className="mt-3 flex items-center justify-between text-[15px] font-semibold">
                  {s.handle} <ArrowUpRight className="h-4 w-4 text-[#4A5B38]" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        );
      default:
        return (
          <div className="grid gap-4 xl:grid-cols-4">
            <div className="grid grid-cols-2 gap-4 xl:col-span-4 xl:grid-cols-4">
            <Stat label="Work" value={WORK.length} sub={WORK_GROUPS.map((g) => `${g.items.length} ${g.label.toLowerCase()}`).join(" · ")} />
            <Stat label="Side projects" value={SIDE_PROJECTS.length} sub={`${live} live, ${SIDE_PROJECTS.length - live} in progress`} />
            <Stat label="Posts" value={posts.length} sub="On side projects and shipping" />
            <Stat label="Site updates" value={ACTIVITY.length} sub={`Logged since ${firstMonth}`} />
            </div>

            <Panel
              title="Site updates per month"
              className="xl:col-span-3"
              action={
                <button type="button" onClick={() => go("changelog")} className={`rounded font-mono text-[11px] underline-offset-2 hover:underline ${FOCUS}`}>
                  Changelog
                </button>
              }
            >
              <ActivityChart />
            </Panel>
            {statusCard}

            <Panel
              title="Experience"
              className="xl:col-span-3"
              action={
                <button type="button" onClick={() => go("about")} className={`rounded font-mono text-[11px] underline-offset-2 hover:underline ${FOCUS}`}>
                  About
                </button>
              }
            >
              <Timeline />
            </Panel>
            <Panel title="Latest writing">
              <ul className="-mt-2">
                {posts.slice(0, 3).map((p) => (
                  <li key={p.slug} className="border-b border-[#EEF3E8] last:border-0">
                    <Link href={`/writing/${p.slug}`} className={`block py-3 ${FOCUS}`}>
                      <span className="block text-[14px] font-semibold leading-snug">{p.title}</span>
                      <span className="mt-1 block font-mono text-[11px] text-[#4A5B38]">{formatDay(p.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>

            <div className="xl:col-span-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className={LABEL}>Featured work</h2>
                <button type="button" onClick={() => go("work")} className={`rounded font-mono text-[11px] underline-offset-2 hover:underline ${FOCUS}`}>
                  All work
                </button>
              </div>
              {workCards(WORK.slice(0, 3))}
            </div>
          </div>
        );
    }
  })();

  const sidebar = (
    <aside className="flex h-full w-[236px] flex-col border-r border-[#E2EADA] bg-white px-3 py-4">
      <div className="flex items-center gap-2.5 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18280E] font-mono text-[12px] font-semibold text-[#B2EB76]">AO</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold">{PROFILE.name}</span>
          <span className="block truncate text-[11.5px] text-[#4A5B38]">adityaoswal.in</span>
        </span>
        <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className={`rounded-lg p-1 hover:bg-[#F4FAED] lg:hidden ${FOCUS}`}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className={`mt-6 px-2 ${LABEL}`}>Menu</p>
      <nav aria-label="Pages" className="mt-2 flex flex-col gap-0.5">
        {PAGES.map((p) => {
          const Icon = ICONS[p.id];
          const active = page === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => go(p.id)}
              className={`relative flex h-9 items-center gap-3 rounded-lg px-2.5 text-[14px] transition-colors ${FOCUS} ${active ? "bg-[#F4FAED] font-semibold" : "text-[#2E3D22] hover:bg-[#F7FAF3]"}`}
            >
              {active && <span className="absolute -left-3 h-5 w-[3px] rounded-r bg-[#18280E]" aria-hidden />}
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {p.id === "home" ? "Overview" : p.label}
            </button>
          );
        })}
      </nav>
      <div className="relative mt-auto rounded-xl border border-[#E2EADA] p-3">
        <Corners />
        <p className={LABEL}>Status</p>
        <p className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#5FA82B]" aria-hidden /> {PROFILE.status}
        </p>
      </div>
    </aside>
  );

  return (
    <div className="flex h-[100dvh] bg-[#F6F8F3] text-[#090F05] [font-family:var(--font-geist)]">
      {navOpen && <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className="fixed inset-0 z-30 bg-[#090F05]/30 lg:hidden" />}
      <div className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 motion-reduce:transition-none lg:static lg:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</div>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[#E2EADA] bg-white/70 px-4 backdrop-blur sm:px-6">
          <button type="button" aria-label="Open menu" onClick={() => setNavOpen(true)} className={`rounded-lg p-1.5 hover:bg-[#F4FAED] lg:hidden ${FOCUS}`}>
            <Menu className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-[family-name:var(--font-glyphic)] text-[22px] leading-tight">{page === "home" ? "Overview" : current.label}</h1>
            <p className="hidden truncate text-[12.5px] text-[#4A5B38] sm:block">
              {page === "home" ? `${PROFILE.role} · ${PROFILE.location}` : `adityaoswal.in${current.href}`}
            </p>
          </div>
          {today && <span className="hidden rounded-full border border-[#E2EADA] bg-white px-3 py-1.5 font-mono text-[11.5px] text-[#4A5B38] md:block">{today}</span>}
          {page !== "home" && (
            <Link href={current.href} className={`hidden items-center gap-1 rounded-full border border-[#E2EADA] bg-white px-3 py-1.5 text-[13px] hover:bg-[#F4FAED] sm:flex ${FOCUS}`}>
              Full page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          )}
          <a href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer" className={`rounded-full bg-[#18280E] px-4 py-2 font-mono text-[12.5px] text-[#B2EB76] hover:bg-black ${FOCUS}`}>
            Get in touch
          </a>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div key={page} className="dir-fade mx-auto max-w-[1280px] p-4 sm:p-6">
            {content}
          </div>
        </div>
      </main>
    </div>
  );
}
