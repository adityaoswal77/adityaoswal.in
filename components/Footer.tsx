"use client";

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_COLS = [
  [
    { label: "Work", href: "/work", external: false },
    { label: "About", href: "/aboutme", external: false },
    { label: "Playground", href: "/playground", external: false },
    { label: "Links", href: "/links", external: false },
  ],
  [
    { label: "Resume", href: "https://docs.google.com/document/d/1zTrAxlCX6HjjZGu-QBHbUE5juLPsb6di2kZlzeWj_Is/edit?usp=sharing", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/oswaladitya", external: true },
    { label: "GitHub", href: "https://github.com/adityaoswal77", external: true },
    { label: "Twitter", href: "https://x.com/oswaluxd", external: true },
  ],
];

const BOTTOM_STRIP = [
  { label: "Studio", value: `© ${new Date().getFullYear()} Aditya Oswal` },
  { label: "Location", value: "Bangalore, IN" },
  { label: "Role", value: "Product Designer" },
  { label: "Built with", value: "Next.js · Vercel" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "oswaluxd@gmail.com";
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!headingRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = headingRef.current.querySelectorAll<HTMLElement>(".word-reveal");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
    words.forEach((word, i) => {
      tl.fromTo(word, { y: "110%" }, { y: "0%", ease: "power3.out", duration: 0.6 }, i * 0.12);
    });
    return () => { tl.kill(); };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--background)] border-t border-[var(--border)]">
      {/* Warm radial gradient — matches 108 Supply aesthetic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(160,80,20,0.45),transparent)] dark:opacity-100 opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-10">

        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 md:gap-16 items-start pb-12 md:pb-24">

          {/* Left: headline + email CTA */}
          <div className="space-y-10">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-7xl xl:text-[6rem] font-black uppercase leading-[0.9] tracking-tight text-[var(--foreground)]"
            >
              {["Let's", "build"].map((word) => (
                <span key={word} className="overflow-hidden inline-block align-bottom mr-[0.22em]">
                  <span className="word-reveal inline-block">{word}</span>
                </span>
              ))}
              <br />
              <span className="italic font-light text-[var(--muted)]">
                {["something", "crazy."].map((word) => (
                  <span key={word} className="overflow-hidden inline-block align-bottom mr-[0.22em] last:mr-0 pb-[0.15em]">
                    <span className="word-reveal inline-block">{word}</span>
                  </span>
                ))}
              </span>
            </h2>

            <button
              type="button"
              onClick={handleCopy}
              className="group flex items-center gap-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300"
            >
              <span className="font-mono text-sm tracking-widest">{email}</span>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Check className="w-4 h-4 text-emerald-500" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Right: nav columns */}
          <div className="flex gap-16 pt-2">
            {NAV_COLS.map((col, i) => (
              <nav key={i} className="flex flex-col gap-5">
                {col.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-[var(--border)] pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {BOTTOM_STRIP.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] opacity-50 mb-1.5">
                {label}
              </p>
              <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--muted)]">
                {value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
}
