"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { gsap } from "gsap";

// --- Components ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.from(metaRef.current, { y: 30, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 100, skewY: 5, opacity: 0 }, "-=0.6")
        .from(descriptionRef.current, { y: 30, opacity: 0 }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Project hero section"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 pt-32 pb-12 overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
    >
      <div className="atmospheric-glow opacity-50" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Work</span>
        </Link>

        <div className="space-y-12">
          <div ref={metaRef} className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Design & Development
              </span>
            </div>
          </div>

          <h1
            ref={titleRef}
            className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            REVAMPING
            <br />
            <span className="italic font-light text-[var(--muted)]">STARTUP WEBSITE</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            A redesign of a software company&apos;s marketing website.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.03] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Digital
        </span>
      </div>
    </section>
  );
};

const ComingSoon = () => (
  <section className="px-6 py-40 bg-[var(--background)] border-t border-[var(--border)]">
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <p className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">Case Study</p>
      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[var(--foreground)] leading-[0.9]">
        Writing in<br /><span className="italic font-light text-[var(--muted)]">Progress</span>
      </h2>
      <p className="text-lg text-[var(--muted)] font-medium max-w-xl leading-relaxed">
        This case study is being documented. Check back soon — or reach out directly if you&apos;d like to hear about the project.
      </p>
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[13px] uppercase tracking-widest mt-4 w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Work
      </Link>
    </div>
  </section>
);

// --- Main Component ---

export default function WebsiteRedesign() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <ComingSoon />
      </div>
    </div>
  );
}
