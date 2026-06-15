"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
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
          href="/work"
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-[14px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Work</span>
        </Link>

        <div className="space-y-12">
          <div ref={metaRef} className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Product Design
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Alivecor
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            Guest Mode
            <br />
            <span className="italic font-light text-[var(--muted)]">vs Ghost Mode</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            Delineating EKG data for users. The absence of Guest Mode limits the experience for shared users, making it harder to design for real-world use cases and show inclusive, growth-oriented thinking.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Role</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Product Designer</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Timeline</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">3 Months</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Team</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">1 PM, 2 Devs</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Metric</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Customer Retention</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Guest
        </span>
      </div>
    </section>
  );
};

const Section = ({ title, id, children, className = "" }: { title?: string; id?: string; children: React.ReactNode; className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const elementsToAnimate = [contentRef.current].filter(Boolean);
      if (titleRef.current) elementsToAnimate.unshift(titleRef.current);

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
      id={id}
      ref={sectionRef}
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      className={`px-6 py-16 md:py-32 bg-[var(--background)] transition-colors duration-300 ${className}`}
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
    <figure className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        className="w-full h-auto"
        priority={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
      />
      {alt && <figcaption className="sr-only">{alt}</figcaption>}
    </figure>
  );
};

const STAGES = [
  { id: 'context',       label: 'Context' },
  { id: 'current-state', label: 'Current State' },
  { id: 'problem',       label: 'Problem' },
  { id: 'solution',      label: 'Solution' },
  { id: 'process',       label: 'Process' },
  { id: 'narrowing',     label: 'Narrowing' },
  { id: 'ideations',     label: 'Ideations' },
  { id: 'outcome',       label: 'Outcome' },
  { id: 'results',       label: 'Results' },
  { id: 'learnings',     label: 'Learnings' },
];

const StagesSidebar = () => {
  const [activeSection, setActiveSection] = useState('context');
  const intersectingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingRef.current.add(entry.target.id);
          } else {
            intersectingRef.current.delete(entry.target.id);
          }
        });
        const active = STAGES.find((s) => intersectingRef.current.has(s.id));
        if (active) setActiveSection(active.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    STAGES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Design process stages"
      className="hidden lg:block self-start sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto px-6 py-8"
    >
      <div className="flex flex-col gap-5">
        {STAGES.map((stage) => {
          const isActive = activeSection === stage.id;
          return (
            <button
              key={stage.id}
              aria-label={stage.label}
              aria-current={isActive ? 'step' : undefined}
              type="button"
              onClick={() =>
                document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-left group"
            >
              <span
                className={`text-[14px] uppercase tracking-[0.15em] leading-none motion-safe:transition-all motion-safe:duration-300 ${
                  isActive
                    ? 'text-[var(--foreground)] opacity-100'
                    : 'text-[var(--muted)] opacity-40 group-hover:opacity-70'
                }`}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default function GuestEKGRecording() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />

        <div className="relative lg:grid lg:grid-cols-[200px_1fr]">
          <StagesSidebar />
          <div className="min-w-0">

            <Section title="Context" id="context">
              <div className="space-y-12">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80 max-w-4xl">
                  Kardia is a leading personal EKG device and app. This project focused on closing a specific gap: guest EKG recording.
                </p>
                <div className="space-y-0">
                  {[
                    { title: 'Missed Opportunity', desc: 'Missed opportunity to acquire potential users.' },
                    { title: 'Negative Experience', desc: 'Users unable to save recordings for others, creating friction in shared use.' },
                    { title: 'Data Integrity', desc: 'Guest recordings polluted primary user data, reducing insight accuracy.' },
                  ].map((item, i) => (
                    <div key={i} className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                      <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:w-48 shrink-0">0{i + 1} — {item.title}</span>
                      <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="Current State" id="current-state">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80">
                    The user could only save a recording from the Instant Analysis screen — with no way to attribute it to a guest.
                  </p>
                  <p className="text-xl text-[var(--muted)] font-medium leading-relaxed">
                    By forcing a &ldquo;Save &amp; Close&rdquo; action at the end of a personal medical analysis, the app failed to account for shared users, forcing them to pollute the primary user&apos;s data or abandon the flow entirely.
                  </p>
                </div>
                <ImageSection
                  src="/assets/projects/guest-ekg/before-IA.png"
                  alt="Current State - Instant Analysis Screen"
                  className="max-w-xs mx-auto" 
                />
              </div>
            </Section>

            <Section title="The Problem" id="problem">
              <div className="space-y-0">
                {[
                  { title: 'Low Visibility', desc: 'Users were often unaware that guest recording was even an option.' },
                  { title: 'Inaccurate Data', desc: 'EKGs recorded by guests without proper identification compromised the accuracy of the app\u2019s insights for the primary user.' },
                  { title: 'Missed Opportunities', desc: 'The existing flow did not capture guest user information, hindering future user acquisition.' },
                ].map((item, i) => (
                  <div key={i} className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] md:w-48 shrink-0">{item.title}</h3>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="The Solution" id="solution">
              <div className="space-y-12">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80 max-w-4xl">
                  One seamless guest recording experience, embedded in the existing flow — no separate mode, no disruption.
                </p>
                <ImageSection
                  src="/assets/projects/guest-ekg/before-after.png"
                  alt="The Solution - Before and after comparison"
                />
              </div>
            </Section>

            <Section title="Process" id="process">
              <div className="space-y-0">
                {[
                  { num: '1', title: 'Quantitative Research', desc: 'Understanding the Kardia user base. Guest users are typically spouses, family, and friends.' },
                  { num: '2', title: 'Explorations', desc: 'Iterating through mobile UI screens, integrating medical-grade accuracy with consumer-friendly aesthetics.' },
                  { num: '3', title: 'Usability Testing', desc: 'Reiterating on feedback through user flows and brainstorming sessions.' },
                ].map((item) => (
                  <div key={item.num} className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:w-8 shrink-0">{item.num}</span>
                    <div>
                      <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] mb-2">{item.title}</h3>
                      <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Narrowing" id="narrowing">
              <div className="space-y-16">
                <div className="space-y-0">
                  <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-rose-400/70 md:w-48 shrink-0">1 — Before Recording</span>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">
                      Asking users who is recording before it begins has faced resistance historically and doesn&apos;t serve the best experience.
                    </p>
                  </div>
                  <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-yellow-500/60 md:w-48 shrink-0">2 — During Recording</span>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">
                      Not ideal — hands are engaged with the Kardia device during recording.
                    </p>
                  </div>
                  <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-emerald-400/80 md:w-48 shrink-0">3 — Post Recording <span className="font-normal normal-case tracking-normal opacity-60">(selected)</span></span>
                    <p className="text-[var(--foreground)] font-medium leading-relaxed">
                      Ideal. Confirm who recorded the EKG after the fact.
                    </p>
                  </div>
                </div>
                <ImageSection
                  src="/assets/projects/guest-ekg/three-solutions.png"
                  alt="Narrowing the playfield"
                  
                />
              </div>
            </Section>

            <Section title="Ideations & Testing" id="ideations">
              <div className="space-y-24">
                <div className="space-y-0">
                  <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:w-48 shrink-0">Ideation 1</span>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">Checkbox at the bottom of the result page before saving.</p>
                  </div>
                  <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:w-48 shrink-0">Ideation 2</span>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">Mid-page context box integrated with the clinical data.</p>
                  </div>
                  <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)] md:w-48 shrink-0">Ideation 3 <span className="text-[var(--muted)] font-normal normal-case tracking-normal">(winner)</span></span>
                    <p className="text-[var(--foreground)] font-medium leading-relaxed">Explicit assignment via a dropdown selector before the primary action.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-0">
                    <div className="border-t border-[var(--border)] py-6">
                      <p className="text-[14px] font-bold uppercase tracking-widest text-emerald-400/80 mb-6">Ideation 3 — Winning Flow</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-4xl md:text-5xl font-black text-emerald-400">96.8%</div>
                          <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Success Rate</div>
                        </div>
                        <div>
                          <div className="text-4xl md:text-5xl font-black text-[var(--foreground)]">3.2%</div>
                          <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Drop-off</div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-[var(--border)] py-6">
                      <p className="text-[14px] font-bold uppercase tracking-widest text-rose-400/70 mb-6">Existing Flow</p>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-4xl md:text-5xl font-black text-rose-400/80">36.7%</div>
                          <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Success Rate</div>
                        </div>
                        <div>
                          <div className="text-4xl md:text-5xl font-black text-rose-400/80">63.3%</div>
                          <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Drop-off</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ImageSection src="/assets/projects/guest-ekg/guest-1.png" alt="Ideation 3 UI" />
                </div>
              </div>
            </Section>

            <Section title="Outcome" id="outcome">
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-5xl font-black uppercase tracking-[0.01em] text-[var(--foreground)]">
                      The Sticky Bottom Selection
                    </h3>
                    <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed">
                      We selected Ideation 3. It reduced friction for existing users while keeping options open for Guest users — an explicit, inline selection before the primary action.
                    </p>
                  </div>
                  <ImageSection src="/assets/projects/guest-ekg/after.png" alt="Selected Outcome - Ideation 3" />
                </div>

                <div className="pt-16 border-t border-[var(--border)]">
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)] text-center">Before &amp; After</h3>
                  <ImageSection src="/assets/projects/guest-ekg/before-after.png" alt="Before and After Comparison" className="max-w-5xl mx-auto" />
                </div>
              </div>
            </Section>

            <Section title="Results" id="results">
              <div className="space-y-12">
                <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Guest recording over time (avg. figures, since Q3 2024)</p>
                <div className="space-y-0">
                  <div className="border-t border-[var(--border)] py-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <div className="text-5xl md:text-7xl font-black text-emerald-400">+2.5%</div>
                    <div className="text-[14px] font-bold uppercase tracking-widest text-[var(--muted)]">iOS Users</div>
                  </div>
                  <div className="border-t border-[var(--border)] py-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <div className="text-5xl md:text-7xl font-black text-emerald-400">+3.8%</div>
                    <div className="text-[14px] font-bold uppercase tracking-widest text-[var(--muted)]">Android Users</div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Learnings" id="learnings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-0">
                  {[
                    { title: 'Mental Models', desc: 'User mental models dictate how users navigate through a flow.' },
                    { title: 'Business Alignment', desc: 'Understanding constraints and goals early on shapes the optimal design.' },
                    { title: 'Reduce Friction', desc: 'Better UI should not come at the cost of worse UX.' },
                  ].map((item, i) => (
                    <div key={i} className="border-t border-[var(--border)] py-8">
                      <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-4 text-[var(--foreground)]">{item.title}</h3>
                      <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <blockquote className="border-l-2 border-[var(--border)] pl-6">
                    <p className="text-xl md:text-2xl text-[var(--foreground)] font-medium leading-relaxed italic">
                      I believe identifying a guest even before the recording begins needs to be tested more. The intent for a user before recording is vastly different than a user who just wants to view the result post-recording.
                    </p>
                  </blockquote>
                </div>
              </div>
            </Section>

            <section className="px-6 py-40 bg-[var(--background)]">
              <div className="max-w-6xl mx-auto">
                <Link href="/work" className="group block text-center">
                  <p className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-8 block">End of Study</p>
                  <div className="flex flex-col items-center gap-12">
                    <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-[var(--foreground)] group-hover:italic transition-all duration-500 group-hover:opacity-70">
                      Return to All
                    </h2>
                    <div className="w-20 h-20 rounded-full bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] group-hover:scale-110 transition-transform duration-500">
                      <ArrowUpRight className="w-10 h-10" />
                    </div>
                  </div>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
