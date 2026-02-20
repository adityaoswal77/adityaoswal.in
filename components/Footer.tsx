"use client";

import React, { useState } from 'react';
import { Twitter, Linkedin, Github, Instagram, Mail, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "oswaluxd@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative flex min-h-[70vh] flex-col justify-between px-6 py-24 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)] overflow-hidden transition-colors duration-300">
      <div className="atmospheric-glow opacity-30" />

      <div className="relative z-10 flex flex-col gap-12 pt-12">
        <h2 className="max-w-5xl text-6xl md:text-9xl lg:text-[11rem] font-black uppercase leading-[1.1] tracking-tight text-[var(--foreground)]">
          Let&apos;s build <br />
          <span
            className="cursor-pointer italic font-light text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-500 underline decoration-indigo-500 decoration-[6px] underline-offset-8"
          >
            something crazy.
          </span>
        </h2>
      </div>

      <div className="relative z-10 mt-32 flex flex-col items-center justify-between gap-16 border-t border-[var(--border)] pt-16 md:flex-row md:items-end">
        <div className="flex flex-col gap-6 items-center md:items-start group/email">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">
            Say Hello
          </span>
          <div className="relative">
            <a
              href={`mailto:${email}`}
              onClick={handleCopy}
              className="group flex items-center gap-4 text-3xl font-bold text-[var(--foreground)] transition-all hover:text-indigo-400 md:text-5xl tracking-tighter"
            >
              <Mail className="h-8 w-8 text-indigo-500 transition-transform group-hover:scale-110" />
              {email}
              <div className="hidden md:flex ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-indigo-500" />}
              </div>
            </a>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 10, x: "-50%" }}
                  className="absolute -top-12 left-1/2 bg-indigo-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg pointer-events-none whitespace-nowrap"
                >
                  Email Copied!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/email:opacity-100 transition-opacity pointer-events-none">
              {!copied && <span className="text-[10px] font-mono tracking-widest text-indigo-500 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Click to copy</span>}
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {[
            { icon: Twitter, label: "Twitter", href: "https://x.com/oswaluxd" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/oswaladitya" },
            { icon: Github, label: "GitHub", href: "https://github.com/adityaoswal77" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${social.label} profile`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-md transition-all duration-500 group-hover:-translate-y-3 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50">
                <social.icon size={24} className="text-[var(--foreground)] transition-colors group-hover:text-indigo-400" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)] opacity-0 transition-all duration-300 group-hover:opacity-100">
                {social.label}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center md:text-right space-y-2">
          <p className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">
            © {new Date().getFullYear()} Aditya Oswal
          </p>
          <p className="font-mono text-[10px] text-[var(--muted)] opacity-60 uppercase tracking-widest">
            Engineered with <span className="text-indigo-500">♥</span> & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
