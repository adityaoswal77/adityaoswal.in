"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
          <time className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60" dateTime="2023/2024">
            2023 - 2024
          </time>
          <span className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60" aria-label="Industry: FinTech">
            FinTech
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-[var(--foreground)] mb-6 md:mb-8"
        >
          NEON <br /> FINTECH
        </h1>

        <p
          ref={descriptionRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-[#1A1A1A]/80 max-w-3xl"
        >
          Banking for the cyberpunk generation. A mobile-first financial platform that combines cutting-edge design with powerful fintech capabilities.
        </p>
        <dl className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-[14px]">
          <div>
            <dt className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60 mb-2">Platform</dt>
            <dd className="font-medium text-lg text-[#1A1A1A]">iOS and Android App Experience</dd>
          </div>
          <div>
            <dt className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60 mb-2">Timeline</dt>
            <dd className="font-medium text-lg text-[#1A1A1A]">July &apos;24 - Sept &apos;24</dd>
          </div>
          <div>
            <dt className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60 mb-2">Collaborators</dt>
            <dd className="font-medium text-lg text-[#1A1A1A]">1 PM, 2 Devs</dd>
          </div>
        </dl>
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
      className={`px-5 py-16 md:py-24 md:px-12 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-8 md:mb-12"
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
    <figure className={`relative w-full ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden bg-[#F9F8F6]">
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
    <Section title="The Problem" className="bg-[#FFFFFF]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[#1A1A1A]/80">
            Traditional banking apps feel outdated and disconnected from the digital-native generation. Users wanted a financial platform that matched their aesthetic sensibilities while providing powerful tools for managing money.
          </p>
          <ul className="space-y-4 text-lg text-[#1A1A1A]/80" role="list">
            <li className="flex items-baseline gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <span>Outdated UI patterns that don&apos;t resonate with younger users</span>
            </li>
            <li className="flex items-baseline gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <span>Complex navigation making basic tasks feel cumbersome</span>
            </li>
            <li className="flex items-baseline gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <span>Lack of visual feedback and engaging interactions</span>
            </li>
            <li className="flex items-baseline gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <span>No sense of identity or brand personality in the experience</span>
            </li>
          </ul>
        </div>
        <div className="bg-[#F9F8F6] p-8 rounded-none border border-black/10">
          <p className="text-[#1A1A1A] text-lg leading-relaxed mb-4">
            &quot;We needed to create a banking experience that felt as modern and exciting as the apps users love, while maintaining the trust and security required for financial services.&quot;
          </p>
          <p className="text-[#1A1A1A]/60 font-mono text-[14px] uppercase tracking-widest">
            — Product Lead
          </p>
        </div>
      </div>
    </Section>
  );
};

const Approach = () => {
  return (
    <Section title="The Approach" className="bg-[#F9F8F6]">
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl bg-[#FFFFFF] border border-black/10 text-[#1A1A1A]">
              1
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">Research</h3>
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              Conducted user interviews and competitive analysis to understand what makes fintech apps successful and where they fall short.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl bg-[#FFFFFF] border border-black/10 text-[#1A1A1A]">
              2
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">Design</h3>
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              Created a bold visual language with neon accents, dark themes, and fluid animations that feel premium yet approachable.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl bg-[#FFFFFF] border border-black/10 text-[#1A1A1A]">
              3
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">Build</h3>
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              Developed React Native app with custom animations, micro-interactions, and a robust design system for consistency.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-black/10">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>Bold & Distinctive</h4>
              <p className="text-[#1A1A1A]/80 leading-relaxed">
                Stand out from the sea of generic banking apps with a unique visual identity that users remember.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>Fluid Interactions</h4>
              <p className="text-[#1A1A1A]/80 leading-relaxed">
                Every interaction should feel smooth and delightful, turning mundane tasks into engaging experiences.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>Trust Through Design</h4>
              <p className="text-[#1A1A1A]/80 leading-relaxed">
                Balance bold aesthetics with clear information hierarchy to maintain user confidence in financial decisions.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>Mobile First</h4>
              <p className="text-[#1A1A1A]/80 leading-relaxed">
                Optimize every screen for mobile use, ensuring one-handed operation and quick access to key features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Features = () => {
  return (
    <Section title="Key Features" className="bg-[#FFFFFF]">
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Dashboard</h3>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              A personalized home screen that provides at-a-glance insights into spending, savings, and investments. Customizable widgets let users prioritize what matters most.
            </p>
            <ImageSection
              src="/assets/img3.jpg"
              alt="Neon FinTech Dashboard"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Transactions</h3>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              Beautiful transaction history with smart categorization, search, and filtering. Visual patterns help users understand their spending habits at a glance.
            </p>
            <ImageSection
              src="/assets/img4.jpg"
              alt="Transaction History"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Payments</h3>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              Streamlined payment flows with biometric authentication and instant confirmations. Send money, pay bills, and split expenses with friends effortlessly.
            </p>
            <ImageSection
              src="/assets/img1.jpg"
              alt="Payment Interface"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Investments</h3>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              Intuitive investment tracking with real-time portfolio visualization. Make informed decisions with clear charts and performance metrics.
            </p>
            <ImageSection
              src="/assets/img2.jpg"
              alt="Investment Dashboard"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const Impact = () => {
  const metrics = [
    { value: "4.8★", label: "App Store rating" },
    { value: "65%", label: "Increase in daily active users" },
    { value: "2.5x", label: "Faster transaction completion" },
    { value: "89%", label: "User satisfaction score" },
  ];

  return (
    <Section title="Impact" className="bg-[#F9F8F6]">
      <div className="space-y-16">
        <p className="text-xl text-[#1A1A1A]/80 max-w-3xl">
          Neon FinTech transformed how users interact with their finances. Here&apos;s what changed:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="text-5xl md:text-6xl font-black" style={{ color: 'var(--primary)' }}>
                {metric.value}
              </div>
              <p className="text-[14px] font-mono uppercase tracking-widest text-[#1A1A1A]/60">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>User Experience</h4>
              <ul className="space-y-3 text-[#1A1A1A]/80" role="list">
                <li className="flex items-baseline gap-3" role="listitem">
                  <span className="font-bold flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  <span>Reduced time to complete common tasks by 40%</span>
                </li>
                <li className="flex items-baseline gap-3" role="listitem">
                  <span className="font-bold flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  <span>Increased feature discovery through intuitive navigation</span>
                </li>
                <li className="flex items-baseline gap-3" role="listitem">
                  <span className="font-bold flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  <span>Higher engagement with financial planning tools</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Business Impact</h4>
              <ul className="space-y-3 text-[#1A1A1A]/80" role="list">
                <li className="flex items-baseline gap-3" role="listitem">
                  <span className="font-bold flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  <span>Significant increase in user retention rates</span>
                </li>
                <li className="flex items-baseline gap-3" role="listitem">
                  <span className="font-bold flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  <span>Positive brand perception in target demographic</span>
                </li>
                <li className="flex items-baseline gap-3" role="listitem">
                  <span className="font-bold flex-shrink-0" style={{ color: 'var(--primary)' }} aria-hidden="true">→</span>
                  <span>Reduced support tickets through clearer UX</span>
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
    <section className="px-5 py-16 md:py-24 md:px-12 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 border-t border-black/10 pt-8 md:pt-12">
          <div>
            <p className="font-mono text-[14px] uppercase tracking-widest text-[#1A1A1A]/60 mb-3 md:mb-4">Next Project</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#1A1A1A]">
              Year In Review
            </h2>
            <p className="text-base md:text-lg text-[#1A1A1A]/80 mt-3 md:mt-4">Year in review design for Premium subscribers.</p>
          </div>
          <Link
            href="/work/year-in-review"
            aria-label="Navigate to Year In Review case study"
            className="group inline-flex items-center gap-3 px-6 py-4 min-h-[44px] border border-black/10 hover:border-black/30 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 transition-all bg-[#F9F8F6]"
          >
            <span className="font-mono text-[14px] font-bold uppercase tracking-widest">View Case Study</span>
            <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
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
      <main id="main-content" className="w-full overflow-hidden" role="main">
        <Hero />
        <CaseStudyPlaceholder />
        {/*
        <ProblemStatement />
        <Approach />
        <Features />
        <Impact />
        <NextProject />
        */}
      </div>
    </div>
  );
}

