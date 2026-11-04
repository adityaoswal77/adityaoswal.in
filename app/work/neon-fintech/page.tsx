"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CaseStudyPlaceholder from '@/components/fancy/case-study-placeholder';
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
      className="relative flex min-h-screen w-full flex-col justify-center px-5 pt-20 pb-12 md:pt-32 md:px-12 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <Link
          href="/work"
          aria-label="Navigate back to work page"
          className="inline-flex items-center gap-2 mb-8 md:mb-12 text-[#1A1A1A]/60 hover:text-[#1A1A1A] focus:text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 focus:ring-offset-[#F9F8F6] rounded transition-colors font-mono text-[14px] uppercase tracking-widest min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back</span>
        </Link>

        <div ref={metaRef} className="mb-6 md:mb-8 flex flex-wrap items-center gap-3 md:gap-6 text-[14px]">
          <span
            className="font-mono text-[14px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-black/10 bg-[#FFFFFF] text-[#1A1A1A]"
            aria-label="Project category: Mobile App"
          >
            Mobile App
          </span>
          <span className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60" aria-label="Industry: FinTech">
            FinTech
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-[2.5rem] sm:text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-[var(--foreground)] mb-6 md:mb-8"
        >
          NEON <br /> FINTECH
        </h1>

        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-[#1A1A1A]/80 max-w-3xl"
        >
          Product design for a mobile banking app.
        </p>
      </div>
    </section>
  );
};

// --- Main Component ---

export default function NeonFinTech() {

  return (
    <div className="font-sans antialiased text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white min-h-screen bg-[var(--background)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1A1A1A] focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <div className="w-full overflow-hidden">
        <Hero />
        <CaseStudyPlaceholder />
      </div>
    </div>
  );
}
