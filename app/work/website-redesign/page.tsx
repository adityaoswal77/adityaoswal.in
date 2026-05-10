"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
                Design & Development
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Webflow / 2024
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            REVAMPING
            <br />
            <span className="italic font-light text-[var(--muted)]"> STARTUP WEBSITE </span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            A complete digital transformation for a software company, merging high-convertng strategy with premium aesthetic execution.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Service</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Branding & Development</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Timeline</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">4 Months</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Stack</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Webflow CMS</dd>
            </div>
          </dl>
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
    <Section title="The Problem">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-10">
          <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
            A static heritage in a dynamic software market.
          </p>
          <ul className="divide-y divide-[var(--border)] text-[var(--muted)] font-medium">
            {[
              { label: 'Outdated Identity', desc: 'Design language failed to communicate technical sophistication.' },
              { label: 'Conversion Gaps', desc: 'Fragmented flows leading to high bounce rates on key product pages.' },
              { label: 'Stiff Architecture', desc: 'Marketing team unable to pivot content without engineering debt.' }
            ].map((item, i) => (
              <li key={i} className="py-6">
                <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[14px] block mb-1">{item.label}</span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <blockquote className="border-l-2 border-[var(--border)] pl-8">
            <p className="text-[var(--foreground)] text-xl md:text-2xl font-bold leading-relaxed mb-10 italic">
              &quot;We needed a digital storefront that reflected our evolution from a utility to a category leader.&quot;
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-10 h-px bg-[var(--border)]" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Marketing Director
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </Section>
  );
};

const Approach = () => {
  return (
    <Section title="The Strategy" className="bg-[var(--foreground)]/5">
      <div className="space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {[
            { step: '01', title: 'Discovery', desc: 'Stakeholder alignment and competitive terrain mapping.' },
            { step: '02', title: 'Design', desc: 'Developing a conversion-first visual design system.' },
            { step: '03', title: 'Dev', desc: 'High-fidelity Webflow build with custom interactions.' }
          ].map((item, i) => (
            <div key={i} className="space-y-8 py-10 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0">
              <span className="text-sm font-bold text-[var(--muted)] block leading-none">{item.step}</span>
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--foreground)]">{item.title}</h3>
                <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ImageSection
          src="/assets/img4.jpg"
          alt="Technical workflow"
          className="opacity-80"
        />

        <div className="pt-24 border-t border-[var(--border)]">
          <h3 className="text-[14px] uppercase tracking-[0.3em] font-bold text-[var(--muted)] mb-16">Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Conversion', desc: 'Every pixel serving a business objective.' },
              { title: 'Clarity', desc: 'Scanable hierarchy for complex technical data.' },
              { title: 'Impact', desc: 'Premium aesthetics to build stakeholder trust.' },
              { title: 'Scale', desc: 'Modular components for future marketing growth.' }
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
    <Section title="The Outcome">
      <div className="space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {[
            { title: 'Homepage', desc: 'A conversion-optimized entrance that communicates value within 3 seconds.', src: '/assets/img1.jpg' },
            { title: 'Product Ecosystem', desc: 'Modular product pages with clear feature breakdowns and tiered pricing.', src: '/assets/img2.jpg' },
            { title: 'Culture & Narrative', desc: 'Building trust through transparency and people-first storytelling.', src: '/assets/img3.jpg' },
            { title: 'Resource Hub', desc: 'SEO-driven library powered by Webflow CMS for rapid content updates.', src: '/assets/img4.jpg' }
          ].map((feature, i) => (
            <div key={i} className="space-y-10 group">
              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:opacity-70 transition-opacity">{feature.title}</h3>
                <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">{feature.desc}</p>
              </div>
              <ImageSection src={feature.src} alt={feature.title} />
            </div>
          ))}
        </div>

        <div className="pt-24 border-t border-[var(--border)]">
          <h3 className="text-[14px] uppercase tracking-[0.3em] font-bold text-[var(--muted)] mb-16">Technical Highlights</h3>
          <div className="divide-y divide-[var(--border)]">
            {[
              { title: 'CMS Architecture', desc: 'Dynamic logic for global resources and blog systems.' },
              { title: 'Custom Motion', desc: 'High-performance interactions that enhance the user experience.' },
              { title: 'Responsive Edge', desc: 'Native-feel experience across all device breakpoints.' }
            ].map((item, i) => (
              <div key={i} className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                <h4 className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[14px] sm:w-48 shrink-0">{item.title}</h4>
                <p className="text-[var(--muted)] text-[14px] font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const Impact = () => {
  const metrics = [
    { value: "42%", label: "Conversion Lift" },
    { value: "58%", label: "Load Speed-up" },
    { value: "35%", label: "Bounce Reduction" },
    { value: "67%", label: "Session Growth" },
  ];

  return (
    <Section title="The Result" className="bg-[var(--foreground)]/5">
      <div className="space-y-24">
        <p className="text-2xl text-[var(--foreground)] opacity-80 font-medium max-w-4xl leading-relaxed">
          The transformation delivered immediate business value, turning the website into a primary driver for lead generation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)] border border-[var(--border)]">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-4 p-8">
              <div className="text-4xl md:text-6xl font-black text-[var(--foreground)]">
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
            <div className="space-y-6">
              <h4 className="text-[14px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">User Experience</h4>
              <ul className="divide-y divide-[var(--border)] text-[var(--muted)] font-medium">
                <li className="py-4">Fluid navigation and intuitive IA</li>
                <li className="py-4">Mobile-first conversion funnels</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[14px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">Business Growth</h4>
              <ul className="divide-y divide-[var(--border)] text-[var(--muted)] font-medium">
                <li className="py-4">Significant increase in organic SEO</li>
                <li className="py-4">Reduced marketing operational overhead</li>
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
        <Link href="/work" className="group block text-center">
          <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-8 block">End of Study</p>
          <div className="flex flex-col items-center gap-12">
            <h2 className="text-5xl md:text-9xl font-black uppercase tracking-normal text-[var(--foreground)] group-hover:italic transition-all duration-500 group-hover:opacity-70">
              Return to All
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
