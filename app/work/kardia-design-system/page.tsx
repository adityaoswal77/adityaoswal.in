"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CaseStudyPlaceholder from '@/components/fancy/case-study-placeholder';
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
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Design System
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Alivecor / 2023 - 2025
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-tight uppercase text-[var(--foreground)]"
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
              <dd className="text-xl font-bold text-[var(--foreground)]">Lead Design Engineer</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Timeline</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">24 Months</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Impact</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Global Scalability</dd>
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
      className={`px-6 py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
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
        <div className="space-y-8">
          <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
            Fragmented design systems across mobile platforms were creating friction for developers and a disjointed experience for users.
          </p>
          <ul className="space-y-6 text-[var(--muted)] font-medium">
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Inconsistent UI patterns across iOS and Android</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Slow development velocity due to lack of reusable components</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Accessibility gaps affecting medical compliance</span>
            </li>
          </ul>
        </div>
        <div className="bg-[var(--card)] p-12 rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm self-start">
          <p className="text-[var(--foreground)] text-xl md:text-2xl font-bold leading-relaxed mb-10 italic">
            &quot;We needed a single source of truth that could scale with our product while maintaining the precision required for medical grade hardware.&quot;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-indigo-500" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Product Design Lead
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Approach = () => {
  return (
    <Section title="Approach" className="bg-[var(--foreground)]/5">
      <div className="space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Research', desc: 'Audited existing components and identified fragmented patterns across platforms.' },
            { step: '02', title: 'Systemize', desc: 'Created foundational tokens and a modular component library in Figma.' },
            { step: '03', title: 'Implement', desc: 'Built React Native components with TypeScript for maximum type-safety.' }
          ].map((item, i) => (
            <div key={i} className="space-y-6">
              <span className="text-4xl md:text-6xl font-black text-indigo-500 opacity-20 block">{item.step}</span>
              <h3 className="text-2xl font-bold uppercase tracking-tighter text-[var(--foreground)]">{item.title}</h3>
              <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-24 border-t border-[var(--border)]">
          <h3 className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-16 font-geist">Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h4 className="text-xl font-bold text-indigo-400 mb-4 uppercase tracking-[0.05em]">Accessibility First</h4>
              <p className="text-[var(--muted)] font-medium leading-relaxed">
                Every component meets WCAG 2.1 AA standards. Healthcare applications demand absolute clarity and inclusive design.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-indigo-400 mb-4 uppercase tracking-[0.05em]">Precision</h4>
              <p className="text-[var(--muted)] font-medium leading-relaxed">
                Mathematical rhythm and consistent grids lead to predictable experiences that build user trust in medical data.
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
    { name: "Tokens", count: "32 variables" },
    { name: "Buttons", count: "12 variants" },
    { name: "Forms", count: "8 types" },
    { name: "Cards", count: "6 layouts" },
    { name: "Nav", count: "4 patterns" },
    { name: "Typo", count: "10 scales" },
    { name: "Icons", count: "200+ assets" },
    { name: "Data", count: "React Charts" },
  ];

  return (
    <Section title="Library">
      <div className="space-y-16">
        <p className="text-xl text-[var(--muted)] font-medium max-w-2xl leading-relaxed">
          A comprehensive suite of React Native and Figma components, built for scalability and medical-grade reliability.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {components.map((component, index) => (
            <div
              key={component.name}
              className="p-8 bg-[var(--card)] rounded-[2rem] border border-[var(--border)] hover:border-[var(--foreground)]/10 transition-all group"
            >
              <span className="text-[14px] font-bold text-indigo-500 opacity-40 mb-4 block group-hover:opacity-100 transition-opacity">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="text-xl font-black uppercase tracking-tighter text-[var(--foreground)] transition-transform group-hover:translate-x-1">{component.name}</h4>
              <p className="text-[14px] font-bold uppercase tracking-widest text-[var(--muted)] mt-1">{component.count}</p>
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
    { value: "60+", label: "Features" },
    { value: "AA", label: "WCAG Level" },
  ];

  return (
    <Section title="Impact" className="bg-[var(--foreground)]/5">
      <div className="grid lg:grid-cols-[1fr,auto] gap-20">
        <div className="grid grid-cols-2 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-10 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)]">
              <div className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-2">
                {metric.value}
              </div>
              <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
        <div className="max-w-md space-y-12">
          <div>
            <h4 className="text-lg font-bold text-[var(--foreground)] mb-4 uppercase tracking-[0.1em]">For Designers</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">
              Reduced design debt by 70% and accelerated prototyping time with synced design-to-code tokens.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-[var(--foreground)] mb-4 uppercase tracking-[0.1em]">For Developers</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">
              Achieved 40% reduction in code duplication across mobile apps, with zero accessibility regression.
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

// --- Main Component ---

export default function KardiaDesignSystem() {

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <CaseStudyPlaceholder />
        {/*
        <ProblemStatement />
        <Approach />
        <Components />
        <Impact />
        <NextProject />
        */}
      </div>
    </div>
  );
}
