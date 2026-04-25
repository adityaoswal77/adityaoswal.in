"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport, type UIMessage } from "ai";

const SUGGESTED = [
  "What does Aditya do?",
  "What's his stack?",
  "Is he open to work?",
];

const INTRO = "Hey! I'm Adi.Os — the little pixel guy from the globe. Ask me anything about Aditya. ✦";

// Tiny pixel character for the drawer header
function MiniChar() {
  return (
    <svg width="28" height="36" viewBox="0 0 8 10" style={{ imageRendering: "pixelated" }} className="text-[var(--foreground)]">
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
  const [input, setInput] = useState("");
  const isLoading = status === "streaming" || status === "submitted";
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSuggestion = (text: string) => {
    sendMessage({ text });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    sendMessage({ text });
  };

  const getMessageText = (m: UIMessage) =>
    m.parts
      .filter((p): p is { type: "text"; text: string; state?: "streaming" | "done" } => p.type === "text")
      .map((p) => p.text)
      .join("");

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop (mobile only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-[999] w-full md:w-80 flex flex-col bg-[var(--background)] border-l border-[var(--border)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <MiniChar />
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-[var(--foreground)]">Adi.Os</p>
                  <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest">Ask me anything</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {/* Intro */}
              <div className="flex gap-2.5 items-start">
                <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                  <MiniChar />
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                  <p className="text-[13px] text-[var(--foreground)] leading-relaxed">{INTRO}</p>
                </div>
              </div>

              {/* Suggestions (only before first message) */}
              {messages.length === 0 && (
                <div className="flex flex-col gap-2 pl-8">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSuggestion(s)}
                      className="text-left text-[12px] font-medium text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--foreground)]/20 rounded-xl px-3 py-2 transition-colors duration-150"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat messages */}
              {messages.map((m: UIMessage) => {
                const text = getMessageText(m);
                if (!text) return null;
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {m.role === "assistant" && (
                      <div className="flex-shrink-0 w-6 h-6 mt-0.5"><MiniChar /></div>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] text-[13px] leading-relaxed break-words whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-[var(--foreground)] text-[var(--background)] rounded-tr-sm"
                          : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] rounded-tl-sm"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5"><MiniChar /></div>
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl rounded-tl-sm px-3.5 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && !isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5"><MiniChar /></div>
                  <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                    <p className="text-[13px] text-[var(--muted)] leading-relaxed">
                      Aditya stepped out for coffee ☕ — try again in a bit?
                    </p>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-4 border-t border-[var(--border)]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Aditya..."
                className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]/20 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)] disabled:opacity-30 hover:opacity-80 transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Footer */}
            <div
              className="flex-shrink-0 px-4 pt-1"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <p className="text-[10px] font-mono text-[var(--muted)] opacity-40 text-center uppercase tracking-widest">
                Powered by Claude · adityaoswal.in
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
