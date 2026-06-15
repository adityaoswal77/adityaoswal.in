"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
                Design System
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Alivecor / 2025 - 2026
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-tight uppercase text-[var(--foreground)]"
          >
            Kardia
            <br />
            <span className="italic font-light text-[var(--muted)]">Design System</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-2xl"
          >
            Architecting a unified design language for heart health, bridging the gap between medical precision and human-centric interaction.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Role</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Lead Designer</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Timeline</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">4 Months</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Impact</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Scalability & Consistency</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Kardia
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const elementsToAnimate = [contentRef.current].filter(Boolean);
      if (titleRef.current) {
        elementsToAnimate.unshift(titleRef.current);
      }

      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
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
      className={`px-6 py-16 md:py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase tracking-[0.01em] text-[var(--foreground)] mb-16 leading-[0.9]"
          >
            {title}
          </h2>
        )}
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
};

const ProblemStatement = () => {
  return (
    <Section title="The Problem">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-12">
          <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
            Fragmented design systems across mobile platforms were creating friction for developers and a disjointed experience for users.
          </p>
          <div className="space-y-0">
            {[
              "Inconsistent UI patterns across iOS and Android left teams rebuilding the same components in isolation.",
              "Slow development velocity due to lack of reusable, documented components shared between squads.",
              "Accessibility gaps affecting medical compliance and excluding users with visual or motor impairments.",
            ].map((text, i) => (
              <p key={i} className="border-t border-[var(--border)] py-5 text-[var(--muted)] font-medium leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </div>
        <div className="self-start space-y-6">
          <p className="text-[var(--foreground)] text-xl md:text-2xl font-bold leading-relaxed italic border-l-2 border-[var(--border)] pl-6">
            &quot;We needed a single source of truth that could scale with our product while maintaining the precision required for medical grade hardware.&quot;
          </p>
          <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] pl-6">
            Product Design Lead
          </p>
        </div>
      </div>
    </Section>
  );
};

const Approach = () => {
  return (
    <Section title="Approach">
      <div className="space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {[
            { step: '01', title: 'Research', desc: 'Audited existing components across iOS and Android codebases, mapped fragmented patterns, and ran stakeholder interviews to surface pain points and alignment gaps.' },
            { step: '02', title: 'Systemize', desc: 'Created foundational design tokens — spacing, color, typography, radius — then built a modular component library in Figma with documented usage rules and variant logic.' },
            { step: '03', title: 'Implement', desc: 'Shipped React Native components with TypeScript for full type-safety, wired design tokens to code via Style Dictionary, and established a contribution workflow for ongoing team adoption.' }
          ].map((item, i) => (
            <div key={i} className="space-y-5 py-8 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
              <span className="text-[13px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] block">{item.step}</span>
              <h3 className="text-2xl font-bold uppercase tracking-tighter text-[var(--foreground)]">{item.title}</h3>
              <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-24 border-t border-[var(--border)]">
          <h3 className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-16">Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-4 uppercase tracking-[0.05em]">Accessibility First</h4>
              <p className="text-[var(--muted)] font-medium leading-relaxed">
                Every component meets WCAG 2.1 AA standards. Healthcare applications demand absolute clarity and inclusive design — there is no room for ambiguity when a user is reading their heart data.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-4 uppercase tracking-[0.05em]">Precision</h4>
              <p className="text-[var(--muted)] font-medium leading-relaxed">
                Mathematical rhythm and consistent grids lead to predictable experiences that build user trust in medical data. Every spacing value, type scale, and touch target is deliberate and documented.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-4 uppercase tracking-[0.05em]">Token-Driven</h4>
              <p className="text-[var(--muted)] font-medium leading-relaxed">
                Design decisions live in tokens, not component code. This keeps Figma and production in sync and allows theming — dark mode, high contrast, future brand variants — without touching component logic.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-[var(--foreground)] mb-4 uppercase tracking-[0.05em]">Contributor-Friendly</h4>
              <p className="text-[var(--muted)] font-medium leading-relaxed">
                Clear documentation, naming conventions, and a contribution checklist mean any engineer or designer can extend the system without breaking existing patterns or introducing inconsistency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Components = () => {
  const components = [
    { name: "Tokens", count: "32 variables", detail: "Color, spacing, radius, shadow, motion" },
    { name: "Buttons", count: "12 variants", detail: "Primary, ghost, destructive, loading states" },
    { name: "Forms", count: "8 types", detail: "Input, select, toggle, date, range, OTP" },
    { name: "Cards", count: "6 layouts", detail: "Stat, media, list, action, ECG strip, alert" },
    { name: "Navigation", count: "4 patterns", detail: "Tab bar, drawer, bottom sheet, breadcrumb" },
    { name: "Typography", count: "10 scales", detail: "Display, heading, body, label, mono, caption" },
    { name: "Icons", count: "200+ assets", detail: "Custom medical set + Lucide base library" },
    { name: "Data Viz", count: "React Charts", detail: "ECG, heart rate trend, histogram, gauge" },
  ];

  return (
    <Section title="Library">
      <div className="space-y-16">
        <p className="text-xl text-[var(--muted)] font-medium max-w-2xl leading-relaxed">
          A comprehensive suite of React Native and Figma components built for scalability and medical-grade reliability. Every component ships with usage docs, accessibility notes, and Storybook stories — so engineers can ship confidently and designers can prototype at full fidelity.
        </p>

        <div className="border-t border-[var(--border)]">
          {components.map((component, index) => (
            <div
              key={component.name}
              className="grid grid-cols-[auto,1fr,auto] items-baseline gap-8 border-b border-[var(--border)] py-5"
            >
              <span className="text-[13px] font-bold text-[var(--muted)] w-6 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <span className="text-lg font-black uppercase tracking-tighter text-[var(--foreground)]">{component.name}</span>
                <span className="ml-4 text-[14px] text-[var(--muted)] font-medium">{component.detail}</span>
              </div>
              <span className="text-[13px] font-bold uppercase tracking-widest text-[var(--muted)] whitespace-nowrap">{component.count}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Impact = () => {
  const metrics = [
    { value: "40%", label: "Faster Dev" },
    { value: "95%", label: "Consistency" },
    { value: "60+", label: "Features Shipped" },
    { value: "AA", label: "WCAG Level" },
  ];

  return (
    <Section title="Impact">
      <div className="space-y-20">
        <div className="border-t border-b border-[var(--border)] divide-x divide-[var(--border)] grid grid-cols-2 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-8 py-10 first:pl-0 last:pr-0">
              <div className="text-5xl md:text-6xl font-black text-[var(--foreground)] mb-2 tabular-nums">
                {metric.value}
              </div>
              <p className="text-[13px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          <div className="md:pr-10 pb-10 md:pb-0 space-y-4">
            <h4 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-[0.1em]">For Designers</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">
              Reduced design debt by 70% and cut prototyping time significantly with synced design-to-code tokens. Designers went from rebuilding components each sprint to composing screens from a shared Figma library that matched production exactly.
            </p>
          </div>
          <div className="md:px-10 py-10 md:py-0 space-y-4">
            <h4 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-[0.1em]">For Developers</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">
              Achieved a 40% reduction in component code duplication across mobile apps with zero accessibility regression. TypeScript types and Storybook stories eliminated entire categories of implementation questions at code review.
            </p>
          </div>
          <div className="md:pl-10 pt-10 md:pt-0 space-y-4">
            <h4 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-[0.1em]">For the Product</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">
              Shipped 60+ features in the system&apos;s lifetime without breaking existing surfaces. Enabled confident expansion to new form factors — tablet, watch, web — because the token layer abstracted platform differences cleanly.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const NextProject = () => {
  return (
    <section className="px-6 py-40 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Link href="/work" className="group block">
          <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-8 block">Next Exploration</p>
          <div className="flex items-center justify-between">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-normal text-[var(--foreground)] group-hover:italic transition-all duration-500 group-hover:opacity-70">
              Year In Review
            </h2>
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] group-hover:scale-110 transition-transform duration-500">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
        </Link>
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

export default function KardiaDesignSystem() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <ComingSoon />
      </div>
    </div>
  );
}
