"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowUp } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport, type UIMessage } from "ai";

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)|https?:\/\/\S+/g;

function renderWithLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const label = match[1];
    const url = match[1] ? match[2] : match[0];
    // Only allow https:// links — blocks javascript: and data: URIs
    if (!url.startsWith("https://")) { last = match.index + match[0].length; continue; }
    parts.push(
      <a key={match.index} href={url} target="_blank" rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-70 transition-opacity">
        {label ?? url}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

const SUGGESTED = [
  "What does Aditya do?",
  "What's his stack?",
  "Is he open to work?",
  "Which project should I see first?",
];

const INTRO = "Hey! I'm Adi.Os, the little pixel guy from the globe. Ask me anything about Aditya. ✦";

const MESSAGE_LIMIT = 10;

const ASSISTANT_BUBBLE =
  "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-[#F4FAED] px-4 py-3 text-[14px] leading-relaxed text-[#090F05] dark:bg-white/[0.06] dark:text-white";

function MiniChar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 10"
      style={{ imageRendering: "pixelated" }}
      className={`text-[var(--foreground)] ${className}`}
      aria-hidden="true"
    >
      <rect x="2" y="0" width="4" height="3.5" fill="currentColor" />
      <rect x="2.5" y="1.2" width="1" height="1" style={{ fill: "var(--background)" }} />
      <rect x="4.5" y="1.2" width="1" height="1" style={{ fill: "var(--background)" }} />
      <rect x="1" y="3.5" width="6" height="3.5" fill="currentColor" />
      <rect x="1.5" y="7" width="2" height="3" fill="currentColor" />
      <rect x="4.5" y="7" width="2" height="3" fill="currentColor" />
    </svg>
  );
}

interface AdiOsProps {
  open: boolean;
  onClose: () => void;
}

export function AdiOs({ open, onClose }: AdiOsProps) {
  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
  });
  const reduceMotion = useReducedMotion();
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const atLimit = userMessageCount >= MESSAGE_LIMIT;
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 260);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, isLoading, error, reduceMotion]);

  const handleSuggestion = (text: string) => {
    if (atLimit) return;
    sendMessage({ text });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || atLimit) return;
    const text = input;
    setInput("");
    sendMessage({ text });
  };

  const getMessageText = (m: UIMessage) =>
    m.parts
      .filter((p): p is { type: "text"; text: string; state?: "streaming" | "done" } => p.type === "text")
      .map((p) => p.text)
      .join("");

  const cardMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 12, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.97 },
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="adios-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[998] bg-black/25 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {open && (
        <motion.div
          key="adios-card"
          role="dialog"
          aria-label="Chat with Adi.Os"
          aria-modal="false"
          {...cardMotion}
          className="fixed z-[999] flex flex-col overflow-hidden origin-bottom-right rounded-2xl border border-[#E2EADA] bg-white shadow-[0_24px_60px_-20px_rgba(24,40,14,0.25)] dark:border-white/10 dark:bg-black/80 dark:backdrop-blur-xl dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[75dvh] md:left-auto md:right-6 md:bottom-[8rem] md:w-[25rem] md:max-h-[min(35rem,calc(100dvh-10rem))]"
        >
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#E2EADA] px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F4FAED] dark:bg-white/[0.08]">
                <MiniChar className="h-[26px] w-[21px]" />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="text-[15px] font-medium text-[var(--foreground)]">Adi.Os</p>
                <p className="mt-0.5 truncate text-[12px] text-[var(--muted)]">
                  Aditya&apos;s pixel guy · knows a few things
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition-colors hover:bg-[#F4FAED] hover:text-[var(--foreground)] dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className={ASSISTANT_BUBBLE}>{INTRO}</div>

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestion(s)}
                    className="rounded-full border border-[#18280E]/15 bg-transparent px-3.5 py-1.5 text-sm text-[var(--foreground)] transition-colors duration-150 hover:bg-[#F4FAED] dark:border-white/15 dark:hover:bg-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m: UIMessage) => {
              const text = getMessageText(m);
              if (!text) return null;
              return m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-[#18280E] px-4 py-2.5 text-[14px] leading-relaxed text-white dark:bg-white/15">
                    {renderWithLinks(text)}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex">
                  <div className={ASSISTANT_BUBBLE}>{renderWithLinks(text)}</div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex">
                <div
                  className="flex gap-1 rounded-2xl bg-[#F4FAED] px-4 py-3.5 dark:bg-white/[0.06]"
                  role="status"
                  aria-label="Adi.Os is typing"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[#4A5B38] motion-safe:animate-bounce dark:bg-zinc-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && !isLoading && (
              <div className="flex">
                <div className={`${ASSISTANT_BUBBLE} !text-[var(--muted)]`}>
                  Aditya stepped out for coffee ☕ — try again in a bit?
                </div>
              </div>
            )}
          </div>

          <div
            className="flex-shrink-0 border-t border-[#E2EADA] px-4 pt-3 dark:border-white/10"
            style={{ paddingBottom: "0.75rem" }}
          >
            {atLimit ? (
              <div className="space-y-1 px-1 py-2 text-center">
                <p className="font-mono text-[12px] font-semibold text-[var(--foreground)]">Session limit reached</p>
                <p className="text-[11px] text-[var(--muted)]">Reopen the chat to start a fresh conversation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#18280E]/15 px-3.5 py-2.5 transition-colors focus-within:border-[#18280E]/40 dark:border-white/15 dark:focus-within:border-white/40">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Adi.Os about Aditya…"
                    aria-label="Message Adi.Os"
                    maxLength={500}
                    className="min-w-0 flex-1 bg-transparent text-[16px] text-[var(--foreground)] placeholder:text-[#4A5B38]/70 focus:outline-none md:text-[14px] dark:placeholder:text-zinc-500"
                  />
                  <span className="flex-shrink-0 font-mono text-[10px] text-[var(--muted)] opacity-70">
                    {userMessageCount}/{MESSAGE_LIMIT}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#18280E] text-[#B2EB76] transition-colors hover:opacity-85 disabled:cursor-not-allowed disabled:bg-[#E2EADA] disabled:text-[#4A5B38]/50 disabled:hover:opacity-100 dark:bg-white dark:text-black dark:disabled:bg-white/10 dark:disabled:text-white/30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </form>
            )}
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-[var(--muted)] opacity-60">
              Powered by Claude
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
