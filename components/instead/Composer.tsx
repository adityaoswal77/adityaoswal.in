"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  FileText,
  Loader2,
  Mic,
  Paperclip,
  SlidersHorizontal,
  Table2,
  Workflow as WorkflowIcon,
  X,
} from "lucide-react";
import { CHIPS, CLIENTS } from "./data";
import { CountPill, FOCUS, LINE, formatSize, type Attached } from "./ui";

const TRANSCRIPT = "Which clients still owe a Q4 estimate, and who hasn't paid yet?";
const BARS = Array.from({ length: 34 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7)));
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: (text: string, files: Attached[], scope: string) => void;
  onFiles: (files: Attached[], scope: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  scope: string;
  count?: number;
  compact?: boolean;
};

export function Composer({ value, onChange, onSend, onFiles, inputRef, scope, count, compact }: Props) {
  const [files, setFiles] = useState<Attached[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [mention, setMention] = useState<{ start: number; query: string } | null>(null);
  const [mIdx, setMIdx] = useState(0);
  const dismissed = useRef<string | null>(null);
  const [pop, setPop] = useState<null | "opts" | "wf">(null);
  const [rec, setRec] = useState<"idle" | "rec" | "busy">("idle");
  const [secs, setSecs] = useState(0);
  const [answer, setAnswer] = useState<"quick" | "thorough">("thorough");
  const [docs, setDocs] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scopeLabel = mentions.length ? mentions.join(", ") : scope;
  const matches = mention
    ? CLIENTS.filter((c) => c.name.toLowerCase().includes(mention.query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const el = inputRef.current;
    const caret = el && document.activeElement === el && el.selectionStart != null ? el.selectionStart : value.length;
    const m = /@([^\s@]*)$/.exec(value.slice(0, caret));
    if (!m || dismissed.current === value) {
      setMention(null);
      return;
    }
    setMention({ start: caret - m[0].length, query: m[1] });
    setMIdx(0);
  }, [value, inputRef]);

  useEffect(() => {
    if (rec !== "rec") return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [rec]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!pop) return;
    const down = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-pop]")) setPop(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPop(null);
    };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("keydown", key);
    };
  }, [pop]);

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onSend(v, files, scopeLabel);
    setFiles([]);
    setMentions([]);
    setMention(null);
  };

  const pick = (name: string) => {
    if (!mention) return;
    const start = mention.start;
    const caret = start + 1 + mention.query.length;
    onChange(`${value.slice(0, start)}@${name} ${value.slice(caret)}`);
    setMentions((m) => (m.includes(name) ? m : [...m, name]));
    setMention(null);
    const pos = start + name.length + 2;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

  const finishRecording = () => {
    setRec("busy");
    timers.current.push(
      setTimeout(() => {
        setRec("idle");
        onChange(value ? `${value} ${TRANSCRIPT}` : TRANSCRIPT);
        requestAnimationFrame(() => inputRef.current?.focus());
      }, 800),
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mention) {
      if (e.key === "Escape") {
        e.preventDefault();
        dismissed.current = value;
        setMention(null);
        return;
      }
      if (matches.length) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setMIdx((i) => (i + 1) % matches.length);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setMIdx((i) => (i - 1 + matches.length) % matches.length);
          return;
        }
        if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          pick(matches[mIdx].name);
          return;
        }
      }
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []).map((f) => ({ name: f.name, size: formatSize(f.size) }));
    e.target.value = "";
    if (!list.length) return;
    setFiles((p) => [...p, ...list]);
    onFiles(list, scopeLabel);
  };

  const iconBtn = `flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F1EA] text-[#24282C] transition-colors hover:bg-[#E8E7DE] active:bg-[#DDDCD1] ${FOCUS}`;
  const iconOn = "!bg-[#24282C] !text-[#C2EF72]";
  const canSend = value.trim().length > 0;
  const recording = rec !== "idle";

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {mentions.length === 0 ? (
          <div className={`inline-flex items-center gap-2 rounded-full ${LINE} bg-[#FBFBF7] py-1.5 pl-3 pr-2 text-sm`}>
            <Table2 className="h-4 w-4" aria-hidden />
            {scope}
            {count !== undefined && <CountPill n={count} />}
          </div>
        ) : (
          mentions.map((m) => (
            <div key={m} className={`inline-flex items-center gap-2 rounded-full ${LINE} bg-[#FBFBF7] py-1 pl-3 pr-1 text-sm`}>
              {m}
              <button
                type="button"
                aria-label={`Remove ${m}`}
                onClick={() => setMentions((l) => l.filter((x) => x !== m))}
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className={`relative rounded-[28px] ${LINE} bg-[#FBFBF7] px-5 pb-3 pt-4 focus-within:border-[#24282C]/40 ${rec === "rec" ? "!border-[#C4311B]/50" : ""}`}>
        {files.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className={`flex items-center gap-2 rounded-full ${LINE} bg-white py-1 pl-3 pr-1 text-xs`}>
                <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="max-w-[160px] truncate">{f.name}</span>
                <span className="text-[#24282C]/55">{f.size}</span>
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => setFiles((l) => l.filter((_, j) => j !== i))}
                  className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="composer" className="sr-only">
          Message Instead
        </label>
        <textarea
          id="composer"
          ref={inputRef}
          rows={compact ? 1 : 2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Give Instead a task or question to work on…"
          className="w-full resize-none bg-transparent text-base leading-6 outline-none placeholder:text-[#24282C]/45"
        />

        {mention && matches.length > 0 && (
          <ul
            role="listbox"
            aria-label="Clients"
            className={`absolute left-4 z-30 w-[300px] overflow-hidden rounded-2xl ${LINE} bg-[#FBFBF7] p-1 shadow-lg ${compact ? "bottom-[calc(100%+6px)]" : "top-[calc(100%-44px)]"}`}
          >
            {matches.map((c, i) => (
              <li key={c.name} role="option" aria-selected={i === mIdx}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(c.name)}
                  onMouseEnter={() => setMIdx(i)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm ${i === mIdx ? "bg-[#EFEEE6]" : ""}`}
                >
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-xs text-[#24282C]/55">{c.badge}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {recording ? (
          <div className="mt-2 flex h-9 items-center gap-3">
            {rec === "rec" ? (
              <>
                <span className="inst-pulse flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBE4E0] text-[#C4311B]" role="img" aria-label="Recording">
                  <Mic className="h-4 w-4" />
                </span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#C4311B]" aria-hidden />
                <span className="w-10 shrink-0 text-sm tabular-nums">{fmt(secs)}</span>
                <div className="flex h-8 min-w-0 flex-1 items-center gap-[3px] overflow-hidden" aria-hidden>
                  {BARS.map((h, i) => (
                    <span
                      key={i}
                      className="inst-bar h-full w-[3px] shrink-0 rounded-full bg-[#24282C]/70"
                      style={{ transform: `scaleY(${h})`, animationDelay: `${-(i % 9) * 0.1}s`, animationDuration: `${0.7 + (i % 5) * 0.13}s` }}
                    />
                  ))}
                </div>
                <button type="button" aria-label="Cancel recording" onClick={() => setRec("idle")} className={iconBtn}>
                  <X className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Finish recording" onClick={finishRecording} className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#C2EF72] text-[#24282C] transition-colors hover:bg-[#B3E45C] ${FOCUS}`}>
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <span role="status" className="flex items-center gap-2 text-sm text-[#24282C]/70">
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
                Transcribing…
              </span>
            )}
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <input ref={fileRef} type="file" multiple className="hidden" onChange={onPickFiles} aria-label="Attach files" tabIndex={-1} />
            <button type="button" aria-label="Attach a file" onClick={() => fileRef.current?.click()} className={iconBtn}>
              <Paperclip className="h-4 w-4" />
            </button>

            <div data-pop className="relative">
              <button type="button" aria-label="Answer options" aria-expanded={pop === "opts"} onClick={() => setPop(pop === "opts" ? null : "opts")} className={`${iconBtn} ${pop === "opts" ? iconOn : ""}`}>
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              {pop === "opts" && (
                <div role="dialog" aria-label="Answer options" className={`absolute bottom-full left-0 z-30 mb-2 w-64 rounded-2xl ${LINE} bg-[#FBFBF7] p-3 shadow-lg`}>
                  <p className="text-xs font-bold text-[#24282C]/60">Answer style</p>
                  <div role="radiogroup" aria-label="Answer style" className="mt-2 flex gap-1 rounded-full bg-[#EFEEE6] p-1">
                    {(["quick", "thorough"] as const).map((o) => (
                      <button key={o} type="button" role="radio" aria-checked={answer === o} onClick={() => setAnswer(o)} className={`flex-1 rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${FOCUS} ${answer === o ? "bg-[#24282C] font-bold text-[#C2EF72]" : "hover:bg-[#E3E2D8]"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                  <button type="button" role="switch" aria-checked={docs} onClick={() => setDocs((d) => !d)} className={`mt-3 flex w-full items-center justify-between rounded-xl px-1 py-1.5 text-sm ${FOCUS}`}>
                    Use client documents
                    <span className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${docs ? "bg-[#24282C]" : "bg-[#D6D5CB]"}`}>
                      <span className={`h-4 w-4 rounded-full bg-[#C2EF72] transition-transform motion-reduce:transition-none ${docs ? "translate-x-4" : "bg-white"}`} />
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div data-pop className="relative">
              <button type="button" aria-label="Workflow templates" aria-expanded={pop === "wf"} onClick={() => setPop(pop === "wf" ? null : "wf")} className={`${iconBtn} ${pop === "wf" ? iconOn : ""}`}>
                <WorkflowIcon className="h-4 w-4" />
              </button>
              {pop === "wf" && (
                <div role="menu" aria-label="Workflow templates" className={`absolute bottom-full left-0 z-30 mb-2 w-64 rounded-2xl ${LINE} bg-[#FBFBF7] p-1.5 shadow-lg`}>
                  <p className="px-3 pb-1 pt-2 text-xs font-bold text-[#24282C]/60">Start a workflow</p>
                  {CHIPS.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onChange(c.prompt);
                        setPop(null);
                        inputRef.current?.focus();
                      }}
                      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-[#EFEEE6] ${FOCUS}`}
                    >
                      <WorkflowIcon className="h-4 w-4 shrink-0" aria-hidden />
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="flex-1" />
            <button
              type="button"
              aria-label="Dictate"
              onClick={() => {
                setPop(null);
                setSecs(0);
                setRec("rec");
              }}
              className={iconBtn}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={submit}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${FOCUS} ${canSend ? "bg-[#C2EF72] text-[#24282C] hover:bg-[#B3E45C]" : "cursor-not-allowed bg-[#E8E7DE] text-[#24282C]/35"}`}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
