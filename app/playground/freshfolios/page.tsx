"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
          href="/playground"
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Playground</span>
        </Link>

        <div className="space-y-12">
          <div ref={metaRef} className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Side Project
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Web Design & Dev
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            Fresh
            <br />
            <span className="italic font-light text-[var(--muted)]">Folios</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            A curated platform for designers to build and share work that actually gets noticed — not another cluttered portfolio graveyard.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Type</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Side Project</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Role</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Design & Dev</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Status</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Live</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">URL</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">
                <a
                  href="https://freshfolios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-rose-400 transition-colors"
                >
                  freshfolios.com
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Fresh
        </span>
      </div>
    </section>
  );
};

const Section = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elementsToAnimate = [contentRef.current].filter(Boolean);
      if (titleRef.current) elementsToAnimate.unshift(titleRef.current);
      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      className={`px-6 py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase tracking-[0.01em] text-[var(--foreground)] mb-20 leading-[0.9]"
          >
            {title}
          </h2>
        )}
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
};

export default function Freshfolios() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />

        <Section title="Why I Built It">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
                Every designer I know has the same problem — great work, terrible visibility. Most portfolio platforms are either too generic or too complex to maintain. I wanted to fix that.
              </p>
              <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
                Freshfolios started from a simple frustration: the tools designers use to show their work rarely reflect the quality of the work itself. I wanted a platform that felt as considered as the portfolios it hosts.
              </p>
            </div>
            <div className="space-y-0">
              {[
                { label: 'Discovery', desc: 'Most designer portfolios are invisible — buried in links, never found by the right people.' },
                { label: 'Presentation', desc: 'Generic website builders force designers into templates that dilute their identity rather than amplify it.' },
                { label: 'Curation', desc: 'The best work deserves a context that makes it shine — not a wall of thumbnails.' },
              ].map((item, i) => (
                <div key={i} className="py-8 border-t border-[var(--border)] space-y-2">
                  <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[13px] block">{item.label}</span>
                  <span className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="The Product" className="bg-[var(--foreground)]/5">
          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
              {[
                { step: '01', title: 'Build', desc: 'Designers create focused, structured portfolios with an editor built for showcasing process — not just final screens.' },
                { step: '02', title: 'Curate', desc: 'Projects are organized to tell a story. The platform guides designers to present context, decisions, and outcomes.' },
                { step: '03', title: 'Share', desc: 'A clean public profile and shareable case study links — built to impress recruiters and clients at first glance.' },
              ].map((item, i) => (
                <div key={i} className="py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0 space-y-6">
                  <span className="text-[13px] font-bold text-[var(--muted)] uppercase tracking-widest">{item.step}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--foreground)]">{item.title}</h3>
                  <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Mockup placeholder — drop your image at /assets/freshfolios-mockup.png */}
            <figure className="relative w-full overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-zinc-900/50">
              <div className="relative aspect-video w-full">
                <Image
                  src="/assets/freshfolios-mockup.png"
                  alt="Freshfolios platform mockup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>
            </figure>
          </div>
        </Section>

        <Section title="What I Learned">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-8">
              <p className="text-xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
                Building a product solo forces you to make tradeoffs at every turn. Freshfolios taught me to ship sharp and iterate based on real signals rather than hypothetical needs.
              </p>
              <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
                Wearing both the designer and developer hat sharpened my instincts for what is actually feasible without losing design integrity.
              </p>
            </div>
            <div className="space-y-0">
              {[
                { label: 'Scope ruthlessly', desc: 'The v1 that ships beats the v2 that never does. Cutting scope early made the difference between a live product and a side project that stalled.' },
                { label: 'Design for the user you have', desc: 'The designers signing up early cared about simplicity and speed — not feature depth. Their feedback shaped every iteration.' },
                { label: 'Dev constraints sharpen design', desc: 'Building it myself meant every design decision had to survive contact with implementation. That friction made the product better.' },
              ].map((item, i) => (
                <div key={i} className="py-8 border-t border-[var(--border)] space-y-2">
                  <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[13px] block">{item.label}</span>
                  <span className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <section className="px-6 py-40 bg-[var(--background)] border-t border-[var(--border)]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4">Live at</p>
              <a
                href="https://freshfolios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:italic transition-all duration-500 group-hover:opacity-70">
                  freshfolios.com
                </span>
                <div className="w-16 h-16 rounded-full bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <ArrowUpRight className="w-8 h-8" />
                </div>
              </a>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Playground
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
