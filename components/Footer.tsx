"use client";

import React from 'react';
import { Twitter, Linkedin, Github, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative flex min-h-[70vh] flex-col justify-between px-6 py-24 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)] overflow-hidden transition-colors duration-300">
      <div className="atmospheric-glow opacity-30" />

      <div className="relative z-10 flex flex-col gap-12 pt-12">
        <h2 className="max-w-5xl text-6xl md:text-9xl lg:text-[11rem] font-black uppercase leading-[0.8] tracking-tighter text-[var(--foreground)]">
          Let&apos;s build <br />
          <span
            className="cursor-pointer italic font-light text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-500 underline decoration-indigo-500 decoration-[6px] underline-offset-8"
          >
            something crazy.
          </span>
        </h2>
      </div>

      <div className="relative z-10 mt-32 flex flex-col items-start justify-between gap-16 border-t border-[var(--border)] pt-16 md:flex-row md:items-end">
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">
            Say Hello
          </span>
          <a
            href="mailto:oswaluxd@gmail.com"
            className="flex items-center gap-4 text-3xl font-bold text-[var(--foreground)] transition-all hover:text-indigo-400 md:text-5xl tracking-tighter"
          >
            <Mail className="h-8 w-8 text-indigo-500" />
            oswaluxd@gmail.com
          </a>
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

        <div className="text-right space-y-2">
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
