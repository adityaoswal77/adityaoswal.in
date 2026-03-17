"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CaseStudyPlaceholder from '@/components/fancy/case-study-placeholder';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Shared Styles ---
const STYLES = {
  paragraph: "text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80",
  headingSmall: "text-[14px] font-bold uppercase tracking-[0.2em] mb-12 text-[var(--muted)] text-center",
  card: "p-8 bg-[var(--card)] rounded-[0.25rem] border border-[var(--border)] shadow-sm relative overflow-hidden",
  cardTitle: "text-lg md:text-xl font-bold text-[var(--foreground)] uppercase tracking-[0.05em]",
  cardText: "text-[var(--muted)] font-medium leading-relaxed z-10 relative",
  badge: "w-12 h-12 flex items-center justify-center font-bold text-xl rounded-[0.5em] mb-6 z-10 relative",
};

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

// --- Main Component ---
export default function GuestEKGRecording() {

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        {/* <CaseStudyPlaceholder /> */}

        <Section title="Context">
          <div className="space-y-12">
            <p className={`${STYLES.paragraph} max-w-4xl`}>
              Kardia is a leading personal electrocardiogram (EKG) device and app that empowers users to monitor their heart health. This project focused on improving the user experience for a specific feature: guest EKG recording.
            </p>
            <p className={`${STYLES.paragraph} max-w-4xl`}>
              What was the need for Guest Mode? The absence of Guest Mode limited the experience for shared users, making it harder to design for real-world use cases and show inclusive, growth-oriented thinking.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Missed Opportunity', desc: 'Missed Opportunity to acquire potential users.' },
                { title: 'Negative Experience', desc: 'Users not able to save recordings for others thereby creating negative shared experiences.' },
                { title: 'Data Integrity', desc: 'Need for better shared experiences and more polished data for the primary user.' }
              ].map((item, i) => (
                <div key={i} className={`${STYLES.card} group`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  <div className={`${STYLES.badge} bg-indigo-500/10 text-indigo-400`}>0{i + 1}</div>
                  <h4 className={`${STYLES.cardTitle} mb-4 relative z-10 text-[14px]`}>{item.title}</h4>
                  <p className={STYLES.cardText}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Current State" className="bg-[var(--foreground)]/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <p className={STYLES.paragraph}>
                Currently, the user can only save the recording from the Instant analysis screen.
              </p>

              <h3 className="text-[16px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4">The Bottleneck</h3>
              <p className="text-xl text-[var(--muted)] font-medium leading-relaxed">
                By forcing a "Save & Close" action at the end of a personal medical analysis, the app failed to account for shared users (guests), forcing them to pollute the primary user's data or abandon the flow entirely.
              </p>

            </div>
            <ImageSection
              src="/guest-mode-deck/guest-mode-0_page-0005.jpg"
              alt="Current State - Instant Analysis Screen"
              className="shadow-2xl"
            />
          </div>
        </Section>

        <Section title="The Problem">
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                {/* <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[var(--foreground)]">
                  Negative Shared Experience
                </h3> */}
                <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed">
                  Negative Shared Experience. The friction between the guest user and the Kardia system creates a disconnect, highlighting the need for a better shared experience.
                </p>
              </div>
              <div className="flex-1 w-full bg-[var(--card)] p-12 rounded-[2.5rem] border border-[var(--border)] relative aspect-video flex items-center justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5" />
                <div className="relative z-10 p-6 bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold tracking-widest uppercase text-[14px] rounded-xl shadow-2xl">
                  Guest
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 relative z-10" />
                <div className="relative z-10 p-6 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold tracking-widest uppercase text-[14px] rounded-xl shadow-2xl">
                  Kardia
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-16">
              <h3 className={STYLES.headingSmall + " !text-left"}>Solving For</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.05em]">Low Visibility</h4>
                  <p className={STYLES.cardText}>Users were often unaware that guest recording was even an option.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.05em]">Inaccurate Data</h4>
                  <p className={STYLES.cardText}>EKGs recorded by guests without proper identification compromised the accuracy and personalization of the app&apos;s insights for the primary user.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-indigo-400 uppercase tracking-[0.05em]">Missed Opportunities</h4>
                  <p className={STYLES.cardText}>The existing flow did not effectively capture information about guest users, hindering potential future marketing and user acquisition efforts which would add to business revenue.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Solution Space" className="bg-[var(--foreground)]/5">
          <div className="space-y-16">
            <div>
              <h3 className={STYLES.headingSmall}>Design Principles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {['Clarity and Simplicity', 'Building Trust', 'Minimal Friction', 'Value The User'].map((text, i) => (
                  <div key={i} className={`p-8 ${i % 2 === 0 ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-pink-500/5 border-pink-500/20'} rounded-[2rem] border flex items-center justify-center min-h-[160px]`}>
                    <h4 className={`text-lg font-bold ${i % 2 === 0 ? 'text-indigo-400' : 'text-pink-400'} uppercase tracking-[0.05em] text-center`}>{text}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="The Solution">
          <div className="space-y-12">

            <ImageSection src="/guest-mode-deck/guest-mode-0_page-0011.jpg" alt="The Solution - Create one seamless experience" className="shadow-2xl max-w-5xl mx-auto" />
          </div>
        </Section>

        <Section title="Process" className="bg-[var(--foreground)]/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className={`${STYLES.badge} bg-indigo-500/10 text-indigo-400`}>1</div>
              <h4 className={STYLES.cardTitle}>Quantitative Research</h4>
              <p className={STYLES.cardText}>Understanding the Kardia user base and identifying that Guest Users are typically spouses, significant others, family, and friends.</p>
            </div>
            <div>
              <div className={`${STYLES.badge} bg-pink-500/10 text-pink-400`}>2</div>
              <h4 className={STYLES.cardTitle}>Explorations</h4>
              <p className={STYLES.cardText}>Iterating through various mobile UI screens, integrating medical-grade accuracy with consumer-friendly aesthetics.</p>
            </div>
            <div>
              <div className={`${STYLES.badge} bg-indigo-500/10 text-indigo-400`}>3</div>
              <h4 className={STYLES.cardTitle}>Usability Testing</h4>
              <p className={STYLES.cardText}>Reiterating on feedback through user flows, brainstorming sessions, and ideations for the guest recording experience.</p>
            </div>
          </div>
        </Section>

        <Section title="Narrowing the playfield">
          <div className="space-y-16">
            <div className="space-y-6 max-w-4xl">
              <p className={STYLES.paragraph}>
                The user can potentially be identified at three different stages. All of these involve user to confirm via User Input based identification or Biometric identification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-6 relative">
                <div className="p-8 bg-red-500/5 rounded-[0.5rem] border border-red-500/20 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 rounded-[0.25rem] bg-red-500" />
                    <h3 className="text-[14px] font-bold uppercase tracking-widest text-red-500">Before Recording</h3>
                  </div>
                  <p className={STYLES.cardText}>
                    From the research, it was clear that asking users who is recording the EKG before the recording even begins has faced resistance historically & does not serve the best user experience.
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative">
                <div className="p-8 bg-yellow-500/5 rounded-[0.5rem] border border-yellow-500/20 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 rounded-[0.25rem] bg-yellow-500" />
                    <h3 className="text-[14px] font-bold uppercase tracking-widest text-yellow-500">During Recording</h3>
                  </div>
                  <p className={STYLES.cardText}>
                    Not the most ideal place to get an interaction in because at this point, users are connecting the Kardia device with the mobile, and hands are engaged with recording EKG.
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative md:-mt-8">
                <div className="p-8 bg-green-500/10 backdrop-blur-md rounded-[.5rem] border border-green-500/20 h-full shadow-[0_0_40px_rgba(34,197,94,0.15)] relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                    <h3 className="text-[14px] font-bold uppercase tracking-widest text-green-500">Post Recording</h3>
                  </div>
                  <p className={STYLES.cardText + " !text-[var(--foreground)]"}>
                    Ideal to confirm who has recorded the EKG.
                  </p>
                </div>
              </div>
            </div>

            <ImageSection
              src="/guest-mode-deck/guest-mode-0_page-0014.jpg"
              alt="Narrowing the playfield - UI Flows"
              className="mt-16 shadow-2xl"
            />
          </div>
        </Section>

        <Section title="Ideations & Testing" className="bg-[var(--foreground)]/5">
          <div className="space-y-24">
            <div>
              <h3 className={STYLES.headingSmall}>UI Ideations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className={`${STYLES.card} text-center`}>
                  <h4 className={STYLES.cardTitle + " mb-6"}>Ideation 1</h4>
                  <p className={STYLES.cardText}>Checkbox at the bottom of the result page before saving.</p>
                </div>
                <div className={`${STYLES.card} text-center`}>
                  <h4 className={STYLES.cardTitle + " mb-6"}>Ideation 2</h4>
                  <p className={STYLES.cardText}>Mid-page context box integrated with the clinical data.</p>
                </div>
                <div className="bg-[var(--background)] p-8 rounded-[2rem] border border-indigo-500/50 space-y-6 text-center shadow-[0_0_40px_rgba(99,102,241,0.15)] relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">Winning Design</div>
                  <h4 className={STYLES.cardTitle + " !text-indigo-400"}>Ideation 3</h4>
                  <p className={STYLES.cardText + " !text-[var(--foreground)]"}>Explicit assignment via a clear dropdown selector before the primary action.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className={STYLES.headingSmall}>Usability Test Outcomes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="p-8 bg-green-500/5 rounded-[2rem] border border-green-500/20">
                    <h4 className="text-[14px] font-bold text-green-500 uppercase tracking-widest mb-6">Ideation 3 (Winning Flow)</h4>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-4xl md:text-5xl font-black text-[var(--foreground)]">96.8%</div>
                        <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Success Rate</div>
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-black text-[var(--foreground)]">3.2%</div>
                        <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Drop-off</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-red-500/5 rounded-[2rem] border border-red-500/20">
                    <h4 className="text-[14px] font-bold text-red-500 uppercase tracking-widest mb-6">Existing Flow</h4>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-4xl md:text-5xl font-black text-[var(--foreground)]">36.7%</div>
                        <div className="text-[12px] text-[var(--muted)] uppercase tracking-widest font-bold mt-2">Success Rate</div>
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-black text-[var(--foreground)]">63.3%</div>
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

        <Section title="Outcome">
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
              <h3 className={STYLES.headingSmall}>Before & After</h3>
              <div className="grid grid-cols-1">
                <ImageSection src="/guest-mode-deck/guest-mode-0_page-0022.jpg" alt="Before and After Comparison" className="shadow-xl max-w-5xl mx-auto" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Results" className="bg-[var(--foreground)]/5">
          <div className="space-y-12 text-center">
            <p className={STYLES.headingSmall + " !mb-0"}>Guest recording over time (avg. figures, since Q3 2024)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="p-12 bg-green-500/10 border border-green-500/20 rounded-[2rem] shadow-[0_0_40px_rgba(34,197,94,0.1)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                <div className="relative z-10 text-5xl md:text-7xl font-black text-green-500 mb-6">+2.5%</div>
                <div className="relative z-10 text-[14px] font-bold uppercase tracking-widest text-[var(--foreground)]">iOS Users</div>
              </div>
              <div className="p-12 bg-green-500/10 border border-green-500/20 rounded-[2rem] shadow-[0_0_40px_rgba(34,197,94,0.1)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                <div className="relative z-10 text-5xl md:text-7xl font-black text-green-500 mb-6">+3.8%</div>
                <div className="relative z-10 text-[14px] font-bold uppercase tracking-widest text-[var(--foreground)]">Android Users</div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Learnings & Challenges">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className={STYLES.card}>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-4 text-indigo-400">Mental Models</h4>
                  <p className={STYLES.cardText}>User mental models are important to understand as they dictate how users will navigate through a flow.</p>
                </div>
                <div className={STYLES.card}>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-4 text-pink-400">Business Alignment</h4>
                  <p className={STYLES.cardText}>Understanding the constraints and business goals early on goes a long way in shaping the optimal design.</p>
                </div>
                <div className={STYLES.card}>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-4 text-indigo-400">Reduce Friction</h4>
                  <p className={STYLES.cardText}>Better UI should not come at the cost of worse UX. Reducing friction is paramount.</p>
                </div>
              </div>
              <div className="space-y-8 h-full">
                <div className="p-12 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/20 h-full flex flex-col justify-center shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="text-9xl font-serif">"</span>
                  </div>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest mb-8 text-indigo-500">The Pre-Recording Dilemma</h4>
                  <p className="text-xl md:text-2xl text-[var(--foreground)] font-medium leading-relaxed relative z-10">
                    I believe identifying a guest <span className="text-indigo-400 italic font-bold">even before the recording begins</span> needs to be tested more. The intent for a user before recording is vastly different than a user who just wants to view the result post-recording.
                  </p>
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
  );
}
