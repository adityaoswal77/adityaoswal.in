"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Building2,
  Check,
  ChevronRight,
  FileText,
  Library,
  ListFilter,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRight,
  Plus,
  Search,
  SlidersHorizontal,
  Table2,
  Workflow as WorkflowIcon,
  X,
} from "lucide-react";
import {
  CHIPS,
  CLIENTS,
  DECISIONS,
  GROUPS,
  NEEDS,
  THREADS,
  WORKFLOWS,
  type Client,
  type Group,
  type Workflow,
} from "./data";
import { Composer } from "./Composer";
import { RightPanel, toUpload, type PanelTab, type Upload } from "./RightPanel";
import { Badge, FOCUS, LINE, type Attached } from "./ui";

type Tab = "needs" | "workflows" | "clients";
type Msg = { from: "you" | "instead"; text: string; files?: Attached[] };
type Thread = { id: string; title: string; scope: string; msgs: Msg[]; special?: "decisions" };

const DOT: Record<Group, string> = {
  needs: "bg-[#E5A50A]",
  waiting: "border border-[#9A998F] bg-transparent",
  working: "bg-[#8ED14B]",
  uptodate: "bg-[#C4C3B8]",
};

function RoundArrow() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#24282C] transition-colors group-hover:bg-[#EFEEE6]">
      <ArrowRight className="h-4 w-4" aria-hidden />
    </span>
  );
}

function ClientRow({ c, onOpen }: { c: Client; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-[14.5px] transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}
    >
      <Building2 className="h-4 w-4 shrink-0" aria-hidden />
      <span className="min-w-0 flex-1 truncate">{c.name}</span>
      <Badge>{c.badge}</Badge>
    </button>
  );
}

export function Prototype() {
  const [tab, setTab] = useState<Tab>("needs");
  const [open, setOpen] = useState<Record<string, boolean>>({ needs: true });
  const [showAllUp, setShowAllUp] = useState(false);
  const [thread, setThread] = useState<Thread | null>(null);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [decisions, setDecisions] = useState<Record<string, "approved" | "change">>({});
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);
  const [panelTab, setPanelTab] = useState<PanelTab>("workflows");
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sorted, setSorted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.innerWidth >= 1280) setRightOpen(true);
    return () => {
      clearTimeout(replyTimer.current);
      clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread?.msgs.length, typing]);

  const toast = (m = "Not in this prototype yet") => {
    setToastMsg(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200);
  };

  const openThread = (t: Thread) => {
    clearTimeout(replyTimer.current);
    setTyping(false);
    setThread(t);
    setText("");
  };
  const goHome = () => {
    clearTimeout(replyTimer.current);
    setTyping(false);
    setThread(null);
    setText("");
  };
  const openClient = (c: Client) =>
    openThread({
      id: c.name,
      title: c.name,
      scope: c.name,
      msgs: [
        {
          from: "instead",
          text: `${c.status}. ${c.group === "needs" ? "I put what I found together so you can decide quickly." : "Nothing is blocked on you right now. Ask me anything about this client."}`,
        },
      ],
    });
  const openNeed = (n: (typeof NEEDS)[number]) =>
    openThread({
      id: n.id,
      title: n.title,
      scope: n.scope,
      special: n.special,
      msgs: n.special ? [] : [{ from: "instead", text: n.detail }],
    });
  const openWorkflow = (w: Workflow) =>
    openThread({
      id: w.id,
      title: w.name,
      scope: w.scope,
      msgs: [{ from: "instead", text: `${w.name} is ${w.status === "Running" ? "running" : w.status === "Paused" ? "paused" : "waiting on you"}. ${w.done} of ${w.total} ${w.unit}. ${w.next}.` }],
    });

  const send = (v: string, files: Attached[], scope: string) => {
    const userMsg: Msg = { from: "you", text: v, files: files.length ? files : undefined };
    if (thread) {
      clearTimeout(replyTimer.current);
      setThread({ ...thread, msgs: [...thread.msgs, userMsg] });
    } else {
      openThread({ id: `new-${Date.now()}`, title: v.length > 48 ? `${v.slice(0, 48)}…` : v, scope, msgs: [userMsg] });
    }
    setText("");
    setTyping(true);
    replyTimer.current = setTimeout(() => {
      setThread((t) =>
        t ? { ...t, msgs: [...t.msgs, { from: "instead", text: `On it. I'll scope this to ${scope} and come back with a plan.` }] } : t,
      );
      setTyping(false);
    }, 1000);
  };

  const addFiles = (files: Attached[], scope: string) =>
    setUploads((u) => [...files.map((f, i) => toUpload(f, scope, i)), ...u]);

  const askAboutFile = (name: string) => {
    setText(`About @${name}: `);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const openPanel = (t: PanelTab) => {
    setPanelTab(t);
    setRightOpen(true);
  };

  const toggle = (g: string) => setOpen((o) => ({ ...o, [g]: !o[g] }));
  const rowsFor = (g: Group) => {
    const list = CLIENTS.filter((c) => c.group === g);
    return sorted ? [...list].sort((x, y) => x.name.localeCompare(y.name)) : list;
  };
  const q = query.trim().toLowerCase();
  const found = q ? CLIENTS.filter((c) => c.name.toLowerCase().includes(q)) : [];
  const ICON_BTN = `flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[#EFEEE6] active:bg-[#E3E2D8] ${FOCUS}`;
  const ROUND_BTN = `flex h-10 w-10 items-center justify-center rounded-full ${LINE} bg-[#FBFBF7] transition-colors hover:bg-white active:bg-[#EFEEE6] ${FOCUS}`;

  const sidebar = (
    <aside className="flex h-full w-[296px] shrink-0 flex-col overflow-y-auto p-5">
      <div className="flex items-center gap-2">
        <Link href="/instead" aria-label="Back to overview" title="Back to overview" className={`-ml-1 ${ICON_BTN}`}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </Link>
        <span className="text-[26px] font-black leading-none tracking-tight">instead</span>
        <span className="rounded-full bg-[#C2EF72] px-2 py-0.5 text-[11px] font-bold">Pro</span>
        <button type="button" aria-label="Collapse sidebar" onClick={() => setLeftOpen(false)} className={`ml-auto ${ICON_BTN}`}>
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            goHome();
            setTab("workflows");
            openPanel("workflows");
          }}
          className={`flex h-10 flex-1 items-center gap-2 rounded-full ${LINE} bg-[#FBFBF7] px-4 text-[15px] transition-colors hover:bg-white ${FOCUS}`}
        >
          <WorkflowIcon className="h-4 w-4" aria-hidden />
          <span className="flex-1 text-left">Workflows</span>
          <span className="text-sm text-[#24282C]/60">7</span>
        </button>
        <button type="button" aria-label="Library" onClick={() => openPanel("files")} className={ROUND_BTN}>
          <Library className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="New chat"
          onClick={() => {
            goHome();
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          className={ROUND_BTN}
        >
          <MessageSquarePlus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between px-1">
        <span className="text-xs tracking-[0.08em] text-[#24282C]/60">CLIENTS</span>
        <span className="flex items-center gap-1 text-[#24282C]">
          <button type="button" aria-label="Search clients" aria-pressed={searchOpen} onClick={() => { setSearchOpen((o) => !o); setQuery(""); }} className={`${ICON_BTN} ${searchOpen ? "bg-[#E3E2D8]" : ""}`}>
            <Search className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Sort clients A to Z" aria-pressed={sorted} onClick={() => setSorted((v) => !v)} className={`${ICON_BTN} ${sorted ? "bg-[#E3E2D8]" : ""}`}>
            <ArrowUpDown className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Filter clients" onClick={() => toast()} className={ICON_BTN}>
            <ListFilter className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Add client" onClick={() => toast()} className={ICON_BTN}>
            <Plus className="h-4 w-4" />
          </button>
        </span>
      </div>

      {searchOpen && (
        <label className={`mt-2 flex items-center gap-2 rounded-full ${LINE} bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-[#24282C]`}>
          <Search className="h-4 w-4 shrink-0 text-[#24282C]/60" aria-hidden />
          <span className="sr-only">Search clients</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchOpen(false);
                setQuery("");
              }
            }}
            placeholder="Search clients"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#24282C]/45"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className={`flex h-5 w-5 items-center justify-center rounded-full hover:bg-[#EFEEE6] ${FOCUS}`}>
              <X className="h-3 w-3" />
            </button>
          )}
        </label>
      )}

      <button
        type="button"
        onClick={() => {
          goHome();
          setTab("clients");
        }}
        className={`mt-2 flex h-11 items-center gap-3 rounded-full bg-[#EFEEE6] px-3.5 text-[15px] transition-colors hover:bg-[#E8E7DE] ${FOCUS}`}
      >
        <Table2 className="h-4 w-4" aria-hidden />
        <span className="flex-1 text-left">All clients</span>
        <span className="text-sm text-[#24282C]/60">46</span>
      </button>

      {q ? (
        <div className="mt-3 flex flex-col">
          {found.length === 0 && <p className="px-3 py-2 text-sm text-[#24282C]/60">No clients match</p>}
          {found.map((c) => (
            <ClientRow key={c.name} c={c} onOpen={() => openClient(c)} />
          ))}
        </div>
      ) : (
      <div className="mt-3 flex flex-col gap-0.5">
        {GROUPS.map((g) => {
          const isOpen = !!open[g.id];
          const rows = rowsFor(g.id).slice(0, 5);
          return (
            <div key={g.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(g.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[#EFEEE6] ${FOCUS} ${g.id === "needs" ? "font-bold" : "text-[#24282C]/70"}`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${DOT[g.id]}`} aria-hidden />
                <span className="flex-1 text-left">{g.label}</span>
                <span className="text-[#24282C]/60">{g.count}</span>
                <ChevronRight className={`h-4 w-4 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-90" : ""}`} aria-hidden />
              </button>
              {isOpen && (
                <div className="mt-0.5 flex flex-col">
                  {rows.map((c) => (
                    <ClientRow key={c.name} c={c} onOpen={() => openClient(c)} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}

      <button type="button" onClick={() => toast()} className={`mt-3 flex h-11 items-center gap-3 rounded-full border border-dashed border-[#B9B8AD] px-3.5 text-[15px] text-[#24282C]/80 transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}>
        <Plus className="h-4 w-4" aria-hidden />
        Add new client
      </button>

      <div className="mt-6 flex items-center justify-between px-1">
        <span className="text-xs tracking-[0.08em] text-[#24282C]/60">THREADS</span>
        <button type="button" aria-label="New thread" onClick={() => toast()} className={ICON_BTN}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-1 flex flex-col">
        {THREADS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() =>
              openThread({
                id: t.id,
                title: t.title,
                scope: t.scope,
                special: t.special,
                msgs: t.special ? [] : [{ from: "instead", text: t.detail }],
              })
            }
            className={`flex items-center gap-2 rounded-xl px-2 py-2 text-left text-[14.5px] transition-colors hover:bg-[#EFEEE6] ${FOCUS} ${thread?.id === t.id ? "bg-[#EFEEE6]" : ""}`}
          >
            <span className="flex-1 truncate">{t.title}</span>
            {t.needs && <span className="h-2.5 w-2.5 rounded-full bg-[#E5A50A]" aria-label="Needs you" />}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-[20px] bg-[#EFEEE6] p-4">
          <p className="font-[family-name:var(--font-baskerville)] text-lg leading-tight">Aditya Oswal</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBFBF7] text-[11px] font-bold">AO</span>
            <span className="flex-1 text-sm text-[#24282C]/75">Oswal Tax Advisory</span>
            <button type="button" aria-label="Account settings" onClick={() => toast()} className={ICON_BTN}>
              <SlidersHorizontal className="h-4 w-4 text-[#24282C]/70" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );

  const tabBtn = (id: Tab, label: string, n: number) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === id}
      onClick={() => setTab(id)}
      className={`-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 pt-1 text-[17px] transition-colors ${FOCUS} ${tab === id ? "border-[#24282C] font-bold" : "border-transparent text-[#24282C]/60 hover:text-[#24282C]"}`}
    >
      {label}
      <span className="text-sm font-normal text-[#24282C]/60">{n}</span>
    </button>
  );

  const home = (
    <div className="mx-auto flex min-h-full w-full max-w-[760px] flex-col px-6 pb-6 pt-8">
      <h1 className="text-center font-[family-name:var(--font-baskerville)] text-[34px] leading-tight">
        How can I support your firm today?
      </h1>
      <p className="mt-3 text-center text-base text-[#24282C]/65">
        Monday, Nov 16 · 5 clients need you · 7 workflows running
      </p>

      <div className="mt-8">
        <Composer value={text} onChange={setText} onSend={send} onFiles={addFiles} inputRef={inputRef} scope="All clients" count={46} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-[#24282C]/65">Start a workflow</span>
        {CHIPS.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => {
              setText(c.prompt);
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
            className={`rounded-full ${LINE} bg-[#FBFBF7] px-4 py-2 text-[15px] transition-colors hover:border-[#24282C]/40 hover:bg-white ${FOCUS}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <div role="tablist" className="flex items-end gap-7 border-b-[0.5px] border-[#D6D5CB]">
          {tabBtn("needs", "Needs you", 5)}
          {tabBtn("workflows", "Workflows", 7)}
          {tabBtn("clients", "Clients", 46)}
          <span className="ml-auto pb-3 text-sm text-[#24282C]/60">Sorted by due date</span>
        </div>

        {tab === "needs" && (
          <ul>
            {NEEDS.map((n) => (
              <li key={n.id} className="border-b-[0.5px] border-[#D6D5CB]">
                <button type="button" onClick={() => openNeed(n)} className={`group flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition-colors hover:bg-[#FBFBF7] ${FOCUS}`}>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#E5A50A]" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-bold leading-snug">{n.title}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-sm text-[#24282C]/65">
                      {n.kind === "client" ? <Building2 className="h-4 w-4" aria-hidden /> : <WorkflowIcon className="h-4 w-4" aria-hidden />}
                      {n.scope}
                      {n.badge && <Badge>{n.badge}</Badge>}
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-sm text-[#24282C]/70">{n.due}</span>
                  <RoundArrow />
                </button>
              </li>
            ))}
          </ul>
        )}

        {tab === "workflows" && (
          <ul>
            {WORKFLOWS.map((w) => (
              <li key={w.id} className="border-b-[0.5px] border-[#D6D5CB]">
                <button type="button" onClick={() => openWorkflow(w)} className={`group flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition-colors hover:bg-[#FBFBF7] ${FOCUS}`}>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[17px] font-bold leading-snug">{w.name}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-sm text-[#24282C]/65">
                      <WorkflowIcon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="truncate">{w.scope}</span>
                    </span>
                  </span>
                  <span className="w-[104px] shrink-0">
                    <span className="block h-1.5 overflow-hidden rounded-full bg-[#E8E7DE]">
                      <span className="block h-full rounded-full bg-[#24282C]" style={{ width: `${(w.done / w.total) * 100}%` }} />
                    </span>
                    <span className="mt-1 block text-xs text-[#24282C]/65">
                      {w.done} of {w.total} {w.unit}
                    </span>
                  </span>
                  <span className="flex w-[124px] shrink-0 flex-col items-end gap-1">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${w.status === "Waiting on you" ? "bg-[#F6E8CC] text-[#6B5320]" : w.status === "Running" ? "bg-[#E3F4C4] text-[#3F5A12]" : "bg-[#EFEEE6] text-[#24282C]/70"}`}>
                      {w.status}
                    </span>
                    <span className="text-xs text-[#24282C]/65">{w.next}</span>
                  </span>
                  <RoundArrow />
                </button>
              </li>
            ))}
          </ul>
        )}

        {tab === "clients" && (
          <div>
            {GROUPS.map((g) => {
              const rows = rowsFor(g.id);
              const shown = g.id === "uptodate" && !showAllUp ? rows.slice(0, 4) : rows;
              return (
                <section key={g.id} className="pt-5">
                  <h2 className="flex items-center gap-3 px-2 text-sm font-bold">
                    <span className={`h-2.5 w-2.5 rounded-full ${DOT[g.id]}`} aria-hidden />
                    {g.label}
                    <span className="font-normal text-[#24282C]/60">{g.count}</span>
                  </h2>
                  <ul className="mt-1">
                    {shown.map((c) => (
                      <li key={c.name} className="border-b-[0.5px] border-[#D6D5CB]">
                        <button type="button" onClick={() => openClient(c)} className={`group flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition-colors hover:bg-[#FBFBF7] ${FOCUS}`}>
                          <Building2 className="h-4 w-4 shrink-0" aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2 text-[17px] font-bold leading-snug">
                              {c.name}
                              <Badge>{c.badge}</Badge>
                            </span>
                            <span className="block text-sm text-[#24282C]/65">{c.status}</span>
                          </span>
                          <RoundArrow />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {g.id === "uptodate" && !showAllUp && (
                    <button type="button" onClick={() => setShowAllUp(true)} className={`mt-3 rounded-full ${LINE} bg-[#FBFBF7] px-4 py-2 text-sm transition-colors hover:bg-white ${FOCUS}`}>
                      Show all 34
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-auto pt-10 text-center text-xs text-[#24282C]/55">AI can make mistakes. Please double-check responses.</p>
    </div>
  );

  const threadView = thread && (
    <div className="mx-auto flex h-full w-full max-w-[760px] flex-col px-6">
      <header className="flex items-center gap-3 border-b-[0.5px] border-[#D6D5CB] py-4">
        <button
          type="button"
          onClick={goHome}
          className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2 pr-3 text-sm transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Home
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-[17px] font-bold">{thread.title}</h1>
        <span className={`flex items-center gap-2 rounded-full ${LINE} bg-[#FBFBF7] px-3 py-1.5 text-sm`}>
          <Building2 className="h-4 w-4" aria-hidden />
          <span className="max-w-[180px] truncate">{thread.scope}</span>
        </span>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6">
        <div className="flex flex-col gap-4">
          {thread.special === "decisions" && (
            <div className="max-w-[88%]">
              <p className="text-[15px] leading-relaxed">
                The 2026 tax plan for Aditya &amp; Oswal Partners is ready. Three decisions need your approval before year end. Each one is a recommendation, and you can change any of them.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {DECISIONS.map((d, i) => {
                  const state = decisions[d.id];
                  return (
                    <div key={d.id} className={`rounded-2xl ${LINE} bg-[#FBFBF7] p-4`}>
                      <p className="text-xs text-[#24282C]/60">Decision {i + 1} of 3</p>
                      <p className="mt-1 text-[15px] font-bold">{d.title}</p>
                      <p className="mt-1 text-sm text-[#24282C]/70">{d.body}</p>
                      <div className="mt-3 flex items-center gap-2">
                        {state === "approved" ? (
                          <span className="flex items-center gap-1.5 rounded-full bg-[#C2EF72] px-4 py-2 text-sm font-bold">
                            <Check className="h-4 w-4" aria-hidden /> Approved
                          </span>
                        ) : (
                          <button type="button" onClick={() => setDecisions((s) => ({ ...s, [d.id]: "approved" }))} className={`rounded-full bg-[#24282C] px-4 py-2 text-sm font-bold text-[#C2EF72] transition-colors hover:bg-black ${FOCUS}`}>
                            Approve
                          </button>
                        )}
                        {state === "change" ? (
                          <span className="rounded-full bg-[#EFEEE6] px-4 py-2 text-sm">Change requested</span>
                        ) : (
                          state !== "approved" && (
                            <button type="button" onClick={() => setDecisions((s) => ({ ...s, [d.id]: "change" }))} className={`rounded-full ${LINE} bg-[#FBFBF7] px-4 py-2 text-sm transition-colors hover:bg-white ${FOCUS}`}>
                              Change
                            </button>
                          )
                        )}
                        {state && (
                          <button type="button" onClick={() => setDecisions((s) => { const n = { ...s }; delete n[d.id]; return n; })} className={`rounded-full px-3 py-2 text-sm text-[#24282C]/60 underline-offset-2 hover:underline ${FOCUS}`}>
                            Undo
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {thread.msgs.map((m, i) =>
            m.from === "you" ? (
              <div key={i} className="ml-auto flex max-w-[80%] flex-col items-end gap-1.5">
                {m.files?.map((f, j) => (
                  <span key={j} className={`inline-flex max-w-full items-center gap-1.5 rounded-full ${LINE} bg-[#FBFBF7] px-2.5 py-1 text-xs`}>
                    <FileText className="h-3 w-3 shrink-0" aria-hidden />
                    <span className="truncate">{f.name}</span>
                    <span className="text-[#24282C]/55">{f.size}</span>
                  </span>
                ))}
                <div className="rounded-[20px] bg-[#EFEEE6] px-4 py-2.5 text-[15px]">{m.text}</div>
              </div>
            ) : (
              <p key={i} className="inst-fade max-w-[88%] text-[15px] leading-relaxed">
                {m.text}
              </p>
            ),
          )}
          {typing && (
            <div role="status" aria-label="Instead is typing" className="flex h-6 items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="inst-dot h-2 w-2 rounded-full bg-[#24282C]/60" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pb-6 pt-2">
        <Composer value={text} onChange={setText} onSend={send} onFiles={addFiles} inputRef={inputRef} scope={thread.scope} compact />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-[#F7F6F0] text-[#24282C]">
      <p className="bg-[#24282C] px-4 py-2 text-center text-sm text-[#C2EF72] lg:hidden">Best viewed on a laptop or desktop</p>
      <div className="relative flex min-h-0 flex-1 overflow-x-auto">
        <div className="flex min-w-[1024px] flex-1">
          <div
            inert={!leftOpen}
            className={`h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-out motion-reduce:transition-none ${leftOpen ? "w-[296px]" : "w-0"}`}
          >
            {sidebar}
          </div>
          <main className="flex h-full min-w-0 flex-1 flex-col">
            <div className="flex h-12 shrink-0 items-center gap-2 px-3">
              {!leftOpen && (
                <>
                  <Link href="/instead" aria-label="Back to overview" title="Back to overview" className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#EFEEE6] active:bg-[#E3E2D8] ${FOCUS}`}>
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </Link>
                  <button type="button" aria-label="Open sidebar" onClick={() => setLeftOpen(true)} className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#EFEEE6] active:bg-[#E3E2D8] ${FOCUS}`}>
                    <PanelLeftOpen className="h-4 w-4" />
                  </button>
                </>
              )}
              <span className="flex-1" />
              <button
                type="button"
                aria-label={rightOpen ? "Close side panel" : "Open side panel"}
                aria-pressed={rightOpen}
                onClick={() => setRightOpen((o) => !o)}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#EFEEE6] active:bg-[#E3E2D8] ${FOCUS} ${rightOpen ? "bg-[#EFEEE6]" : ""}`}
              >
                <PanelRight className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{thread ? threadView : home}</div>
          </main>
          <div
            inert={!rightOpen}
            className={`h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-out motion-reduce:transition-none ${rightOpen ? "w-[320px]" : "w-0"}`}
          >
            <RightPanel tab={panelTab} onTab={setPanelTab} uploads={uploads} onUpload={addFiles} onOpenWorkflow={openWorkflow} onAsk={askAboutFile} />
          </div>
        </div>
      </div>
      {toastMsg && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
          <div role="status" className="inst-fade rounded-full bg-[#24282C] px-4 py-2 text-sm text-[#C2EF72] shadow-lg">
            {toastMsg}
          </div>
        </div>
      )}
    </div>
  );
}
