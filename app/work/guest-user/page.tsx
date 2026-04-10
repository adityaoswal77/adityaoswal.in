"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
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
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
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
      id={id}
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

// --- Stages Sidebar ---
const STAGES = [
  { id: 'context',        label: 'Context' },
  { id: 'current-state',  label: 'Current State' },
  { id: 'problem',        label: 'Problem' },
  { id: 'solution-space', label: 'Solution Space' },
  { id: 'solution',       label: 'Solution' },
  { id: 'process',        label: 'Process' },
  { id: 'narrowing',      label: 'Narrowing' },
  { id: 'ideations',      label: 'Ideations' },
  { id: 'outcome',        label: 'Outcome' },
  { id: 'results',        label: 'Results' },
  { id: 'learnings',      label: 'Learnings' },
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
                className={`font-mono text-[14px] uppercase tracking-[0.15em] leading-none motion-safe:transition-all motion-safe:duration-300 ${
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

// --- Main Component ---
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
              Kardia is a leading personal electrocardiogram (EKG) device and app that empowers users to monitor their heart health. This project focused on improving the user experience for a specific feature: guest EKG recording.
            </p>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80 max-w-4xl">
              What was the need for Guest Mode? The absence of Guest Mode limited the experience for shared users, making it harder to design for real-world use cases and show inclusive, growth-oriented thinking.
            </p>
            <div className="space-y-0">
              {[
                { title: 'Missed Opportunity', desc: 'Missed Opportunity to acquire potential users.' },
                { title: 'Negative Experience', desc: 'Users not able to save recordings for others thereby creating negative shared experiences.' },
                { title: 'Data Integrity', desc: 'Need for better shared experiences and more polished data for the primary user.' }
              ].map((item, i) => (
                <div key={i} className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:w-48 shrink-0">0{i + 1} — {item.title}</span>
                  <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Current State" id="current-state" className="bg-[var(--foreground)]/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80">
                Currently, the user can only save the recording from the Instant analysis screen.
              </p>

              <h3 className="text-[16px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4">The Bottleneck</h3>
              <p className="text-xl text-[var(--muted)] font-medium leading-relaxed">
                By forcing a &ldquo;Save &amp; Close&rdquo; action at the end of a personal medical analysis, the app failed to account for shared users (guests), forcing them to pollute the primary user&apos;s data or abandon the flow entirely.
              </p>

            </div>
            <ImageSection
              src="/guest-mode-deck/guest-mode-0_page-0005.jpg"
              alt="Current State - Instant Analysis Screen"
              className="shadow-2xl"
            />
          </div>
        </Section>

        <Section title="The Problem" id="problem">
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed">
                  Negative Shared Experience. The friction between the guest user and the Kardia system creates a disconnect, highlighting the need for a better shared experience.
                </p>
              </div>
              <div className="flex-1 w-full flex items-center justify-center gap-6 py-12">
                <span className="font-bold tracking-widest uppercase text-[var(--foreground)] text-lg">Guest</span>
                <span className="text-[var(--muted)] text-2xl">&#8212;</span>
                <span className="font-bold tracking-widest uppercase text-[var(--foreground)] text-lg">Kardia</span>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-16">
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)]">Solving For</h3>
              <div className="space-y-0">
                {[
                  { title: 'Low Visibility', desc: 'Users were often unaware that guest recording was even an option.' },
                  { title: 'Inaccurate Data', desc: 'EKGs recorded by guests without proper identification compromised the accuracy and personalization of the app\'s insights for the primary user.' },
                  { title: 'Missed Opportunities', desc: 'The existing flow did not effectively capture information about guest users, hindering potential future marketing and user acquisition efforts which would add to business revenue.' },
                ].map((item, i) => (
                  <div key={i} className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                    <h4 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-[0.05em] md:w-48 shrink-0">{item.title}</h4>
                    <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Solution Space" id="solution-space" className="bg-[var(--foreground)]/5">
          <div className="space-y-16">
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)]">Design Principles</h3>
              <div className="space-y-0">
                {['Clarity and Simplicity', 'Building Trust', 'Minimal Friction', 'Value The User'].map((text, i) => (
                  <div key={i} className="border-t border-[var(--border)] py-8">
                    <h4 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-[0.05em]">{text}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="The Solution" id="solution">
          <div className="space-y-12">

            <ImageSection src="/guest-mode-deck/guest-mode-0_page-0011.jpg" alt="The Solution - Create one seamless experience" className="shadow-2xl max-w-5xl mx-auto" />
          </div>
        </Section>

        <Section title="Process" id="process" className="bg-[var(--foreground)]/5">
          <div className="space-y-0">
            {[
              { num: '1', title: 'Quantitative Research', desc: 'Understanding the Kardia user base and identifying that Guest Users are typically spouses, significant others, family, and friends.' },
              { num: '2', title: 'Explorations', desc: 'Iterating through various mobile UI screens, integrating medical-grade accuracy with consumer-friendly aesthetics.' },
              { num: '3', title: 'Usability Testing', desc: 'Reiterating on feedback through user flows, brainstorming sessions, and ideations for the guest recording experience.' },
            ].map((item) => (
              <div key={item.num} className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:w-8 shrink-0">{item.num}</span>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-[var(--foreground)] uppercase tracking-[0.05em] mb-2">{item.title}</h4>
                  <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Narrowing the playfield" id="narrowing">
          <div className="space-y-16">
            <div className="space-y-6 max-w-4xl">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80">
                The user can potentially be identified at three different stages. All of these involve user to confirm via User Input based identification or Biometric identification.
              </p>
            </div>

            <div className="space-y-0">
              <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-rose-400/70 md:w-48 shrink-0">1 — Before Recording</span>
                <p className="text-[var(--muted)] font-medium leading-relaxed">
                  From the research, it was clear that asking users who is recording the EKG before the recording even begins has faced resistance historically &amp; does not serve the best user experience.
                </p>
              </div>

              <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-yellow-500/60 md:w-48 shrink-0">2 — During Recording</span>
                <p className="text-[var(--muted)] font-medium leading-relaxed">
                  Not the most ideal place to get an interaction in because at this point, users are connecting the Kardia device with the mobile, and hands are engaged with recording EKG.
                </p>
              </div>

              <div className="border-t border-[var(--border)] py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-emerald-400/80 md:w-48 shrink-0">3 — Post Recording <span className="font-normal normal-case tracking-normal opacity-60">(selected)</span></span>
                <p className="text-[var(--foreground)] font-medium leading-relaxed">
                  Ideal to confirm who has recorded the EKG.
                </p>
              </div>
            </div>

            <ImageSection
              src="/guest-mode-deck/guest-mode-0_page-0014.jpg"
              alt="Narrowing the playfield - UI Flows"
              className="mt-16 shadow-2xl"
            />
          </div>
        </Section>

        <Section title="Ideations & Testing" id="ideations" className="bg-[var(--foreground)]/5">
          <div className="space-y-24">
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)]">UI Ideations</h3>
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
                  <p className="text-[var(--foreground)] font-medium leading-relaxed">Explicit assignment via a clear dropdown selector before the primary action.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)]">Usability Test Outcomes</h3>
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
                <ImageSection src="/guest-mode-deck/guest-mode-0_page-0020.jpg" alt="Ideation 3 UI" className="shadow-2xl" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Outcome" id="outcome">
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-xl md:text-5xl font-sans uppercase tracking-tighter text-[var(--foreground)]">
                  The Sticky Bottom Selection
                </h3>
                <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed">
                  Based on internal discussions and the future roadmap, we selected Ideation 3. It reduced friction for existing users while keeping options open for Guest users by providing an explicit, inline selection before the primary action.
                </p>
              </div>
              <ImageSection src="/guest-mode-deck/guest-mode-0_page-0021.jpg" alt="Selected Outcome - Ideation 3" className="shadow-2xl" />
            </div>

            <div className="pt-16 border-t border-[var(--border)]">
              <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)] text-center">Before &amp; After</h3>
              <div className="grid grid-cols-1">
                <ImageSection src="/guest-mode-deck/guest-mode-0_page-0022.jpg" alt="Before and After Comparison" className="shadow-xl max-w-5xl mx-auto" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Results" id="results" className="bg-[var(--foreground)]/5">
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

        <Section title="Learnings & Challenges" id="learnings">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-0">
                <div className="border-t border-[var(--border)] py-8">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-4 text-[var(--foreground)]">Mental Models</h4>
                  <p className="text-[var(--muted)] font-medium leading-relaxed">User mental models are important to understand as they dictate how users will navigate through a flow.</p>
                </div>
                <div className="border-t border-[var(--border)] py-8">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-4 text-[var(--foreground)]">Business Alignment</h4>
                  <p className="text-[var(--muted)] font-medium leading-relaxed">Understanding the constraints and business goals early on goes a long way in shaping the optimal design.</p>
                </div>
                <div className="border-t border-[var(--border)] py-8">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-4 text-[var(--foreground)]">Reduce Friction</h4>
                  <p className="text-[var(--muted)] font-medium leading-relaxed">Better UI should not come at the cost of worse UX. Reducing friction is paramount.</p>
                </div>
              </div>
              <div className="space-y-8 h-full">
                <div className="h-full flex flex-col justify-center">
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-8 text-[var(--muted)]">The Pre-Recording Dilemma</h4>
                  <blockquote className="border-l-2 border-[var(--border)] pl-6">
                    <p className="text-xl md:text-2xl text-[var(--foreground)] font-medium leading-relaxed italic">
                      I believe identifying a guest even before the recording begins needs to be tested more. The intent for a user before recording is vastly different than a user who just wants to view the result post-recording.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <section className="px-6 py-40 bg-[var(--background)] border-t border-[var(--border)]">
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
