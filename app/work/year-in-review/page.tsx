"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CaseStudyPlaceholder from '@/components/fancy/case-study-placeholder';

// --- Type Declarations ---
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

// --- Components ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

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
                Growth Design
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Premium Feature / 2024
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-[9.5rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            Year In
            <br />
            <span className="italic font-light text-[var(--muted)]">Review</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            A personalized retrospective celebrating user milestones through high-impact data visualization and emotive storytelling.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Segment</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Premium Subscribers</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Focus</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Growth & Engagement</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Impact</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Social Growth</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Review
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
    const gsap = window.gsap;
    if (!gsap) return;

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

const ImageSection = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  return (
    <figure className={`relative w-full overflow-hidden rounded-[2.5rem] border border-[var(--border)] ${className}`}>
      <div className="relative aspect-video w-full bg-zinc-900">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      </div>
      {alt && <figcaption className="sr-only">{alt}</figcaption>}
    </figure>
  );
};

const ProblemStatement = () => {
  return (
    <Section title="The Challenge">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-10">
          <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
            Bridging the gap between utility and emotional investment.
          </p>
          <ul className="space-y-8 text-[var(--muted)] font-medium">
            {[
              { label: 'Retention Lift', desc: 'Rewarding Premium subscribers with exclusive value at the fiscal year-end.' },
              { label: 'Brand Love', desc: 'Turning clinical health data into emotive, shareable narratives.' },
              { label: 'Growth Catalyst', desc: 'Leveraging organic social loops to drive new premium trial conversions.' }
            ].map((item, i) => (
              <li key={i} className="flex gap-6 group">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 group-hover:scale-150 transition-transform" />
                <div className="space-y-1">
                  <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[14px] block">{item.label}</span>
                  <span>{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[var(--card)] p-12 rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm">
          <p className="text-[var(--foreground)] text-xl md:text-2xl font-bold leading-relaxed mb-10 italic">
            &quot;Year-end reviews are the ultimate opportunity to transition from a product to a partner in our users&apos; health journey.&quot;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-indigo-500" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Growth Design Lead
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Approach = () => {
  return (
    <Section title="The Strategy" className="bg-[var(--foreground)]/5">
      <div className="space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Extraction', desc: 'Sifting through millions of events to find milestones that matter.' },
            { step: '02', title: 'Narrative', desc: 'Crafting a rhythmic flow that builds towards a personalized climax.' },
            { step: '03', title: 'Synthesis', desc: 'Rendering complex healthcare data into minimal, premium visualizations.' }
          ].map((item, i) => (
            <div key={i} className="space-y-8 p-10 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm">
              <span className="text-5xl font-black text-indigo-500 opacity-20 block leading-none">{item.step}</span>
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--foreground)]">{item.title}</h3>
                <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ImageSection
          src="/assets/img3.jpg"
          alt="Visual design system"
          className="opacity-80"
        />

        <div className="pt-24 border-t border-[var(--border)]">
          <h3 className="text-[14px] uppercase tracking-[0.3em] font-bold text-indigo-500 mb-16">Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Celebratory', desc: 'Every data point should feel like a victory for the user.' },
              { title: 'Personal', desc: 'Hyper-tailored experiences that feel one-to-one.' },
              { title: 'Momentum', desc: 'High-paced, shareable slides optimized for social stories.' },
              { title: 'Premium', desc: 'Visual excellence that justifies the subscription value.' }
            ].map((principle, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-[14px] font-black uppercase tracking-widest text-[var(--foreground)]">{principle.title}</h4>
                <p className="text-[var(--muted)] text-[14px] font-medium leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const Features = () => {
  return (
    <Section title="The Experience">
      <div className="space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {[
            { title: 'The Opening', desc: 'A cinematic entrance that builds anticipation through motion and personalized greetings.', src: '/assets/img4.jpg' },
            { title: 'The Stat Hub', desc: 'Transforming clinical telemetry into high-impact, celebratory data visualizations.', src: '/assets/img1.jpg' },
            { title: 'Life Milestones', desc: 'Visualizing the "Firsts" and "Bests" to create lasting emotional product affinity.', src: '/assets/img2.jpg' },
            { title: 'The Share Loop', desc: 'Branded data cards optimized for rapid social dispersal and growth loops.', src: '/assets/img3.jpg' }
          ].map((feature, i) => (
            <div key={i} className="space-y-10 group">
              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">{feature.desc}</p>
              </div>
              <ImageSection src={feature.src} alt={feature.title} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Impact = () => {
  const metrics = [
    { value: "78%", label: "Completion" },
    { value: "45%", label: "Social Share" },
    { value: "23%", label: "Churn Drop" },
    { value: "12k", label: "Organic Loop" },
  ];

  return (
    <Section title="The Impact" className="bg-[var(--foreground)]/5">
      <div className="space-y-24">
        <p className="text-2xl text-[var(--foreground)] opacity-80 font-medium max-w-4xl leading-relaxed">
          The feature transcended utility, becoming an annual ritual that solidified the premium value proposition.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-4 p-8 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm">
              <div className="text-4xl md:text-6xl font-black text-indigo-400">
                {metric.value}
              </div>
              <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-24 border-t border-[var(--border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <h4 className="text-[14px] uppercase tracking-[0.3em] font-bold text-indigo-500">Player Engagement</h4>
              <ul className="space-y-6 text-[var(--muted)] font-medium">
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>High replay value and session duration</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Emotive feedback from the community</span>
                </li>
              </ul>
            </div>
            <div className="space-y-10">
              <h4 className="text-[14px] uppercase tracking-[0.3em] font-bold text-indigo-500">Subscription Growth</h4>
              <ul className="space-y-6 text-[var(--muted)] font-medium">
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Definitive increase in annual renewals</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Viral top-of-funnel brand awareness</span>
                </li>
              </ul>
            </div>
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
        <Link href="/work/website-redesign" className="group block text-center">
          <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-8 block">Next Story</p>
          <div className="flex flex-col items-center gap-12">
            <h2 className="text-5xl md:text-9xl font-black uppercase tracking-normal text-[var(--foreground)] group-hover:italic transition-all duration-500 group-hover:opacity-70">
              Website Redesign
            </h2>
            <div className="w-20 h-20 rounded-full bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] group-hover:scale-110 transition-transform duration-500">
              <ArrowUpRight className="w-10 h-10" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

// --- Utils ---
const useGsapLoader = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const load = async () => {
      if (window.gsap && window.ScrollTrigger) {
        setReady(true);
        return;
      }
      const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
        window.gsap?.registerPlugin(window.ScrollTrigger);
        setReady(true);
      } catch (err) {
        console.error("Failed to load GSAP", err);
        setReady(true);
      }
    };
    load();
  }, []);
  return ready;
};

// --- Main Component ---

export default function YearInReview() {
  const isGsapReady = useGsapLoader();

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <main id="main-content" className="w-full relative" role="main">
        <Hero />
        <CaseStudyPlaceholder />
        {/*
        <ProblemStatement />
        <Approach />
        <Features />
        <Impact />
        <NextProject />
        */}
      </main>
    </div>
  );
}
