"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Lanyard from "@/components/fancy/lanyard";
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
                Product Design
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Alivecor / 2024
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            Enhancing
            <br />
            <span className="italic font-light text-[var(--muted)]">Guest EKG</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            Streamlining the guest recording experience within the Kardia app to increase visibility and capture accurate health insights.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Platform</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">iOS & Android</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Timeline</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">3 Months</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Collaborators</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">1 PM, 2 Devs</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Background Decorative Text */}
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

const Introduction = () => {
  return (
    <Section title="Introduction">
      <div className="space-y-12">
        <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--foreground)] opacity-80 max-w-4xl">
          Kardia is a leading personal electrocardiogram (EKG) device and app that empowers users to monitor their heart health. This project focused on improving the user experience for a specific feature: guest EKG recording.
        </p>
        <div className="p-10 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm">
          <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
            Historically, it was difficult to identify whether the Primary user recorded an EKG or a Guest user. Properly delineating these recordings is critical for accurate health insights and medical data integrity.
          </p>
        </div>
      </div>
    </Section>
  );
};

const GuestRecordingFlow = () => {
  return (
    <Section title="The Flow" className="bg-[var(--foreground)]/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-8">
          <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
            The existing guest recording flow was cumbersome, often leading to misattributed data.
          </p>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            In the Kardia app, a guest is anybody other than the account owner. We found that many users share devices with spouses, family, and friends, making easy identification essential.
          </p>
        </div>
        <div className="bg-[var(--card)] p-12 rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm">
          <h3 className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-10">User Ecosystem</h3>
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full border-4 border-indigo-500/50 bg-indigo-500/10 flex items-center justify-center backdrop-blur-sm">
                  <span className="font-black uppercase tracking-widest text-indigo-400">Owner</span>
                </div>
              </div>

              {[
                { label: 'Spouse', pos: 'top-0 left-0' },
                { label: 'Family', pos: 'top-0 right-0' },
                { label: 'Friend', pos: 'bottom-0 left-0' },
                { label: 'Guest', pos: 'bottom-0 right-0' }
              ].map((guest, i) => (
                <div key={i} className={`absolute ${guest.pos} w-24 h-24 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[14px] font-bold uppercase tracking-widest text-[var(--muted)] shadow-2xl`}>
                  {guest.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Why = () => {
  return (
    <Section title="Why">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4 md:space-y-6">
          <p className="text-base md:text-lg leading-relaxed text-[var(--foreground)] opacity-80">
            The existing Kardia app had several challenges regarding guest recordings:
          </p>
          <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-[var(--muted)]" role="list">
            <li className="flex items-start gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0 pt-0.5" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <div>
                <span className="font-bold">Low Visibility:</span> Users were often unaware that guest recording was even an option.
              </div>
            </li>
            <li className="flex items-start gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0 pt-0.5" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <div>
                <span className="font-bold">Cumbersome Process:</span> The steps required to initiate a guest recording were unintuitive and time-consuming.
              </div>
            </li>
            <li className="flex items-start gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0 pt-0.5" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <div>
                <span className="font-bold">Inaccurate Data:</span> EKGs recorded by guests without proper identification compromised the accuracy and personalization of the app&apos;s insights for the primary user.
              </div>
            </li>
            <li className="flex items-start gap-3" role="listitem">
              <span className="font-bold text-lg md:text-xl leading-none flex-shrink-0 pt-0.5" style={{ color: 'var(--primary)' }} aria-hidden="true">•</span>
              <div>
                <span className="font-bold">Missed Opportunities:</span> The existing flow did not effectively capture information about guest users, hindering potential future marketing and user acquisition efforts.
              </div>
            </li>
          </ul>
        </div>
        <blockquote className="bg-[var(--card)] p-6 md:p-8 rounded-none border border-[var(--border)]">
          <p className="text-[var(--foreground)] text-base md:text-lg leading-relaxed mb-4">
            &quot;In our current Kardia Flow, it is sometimes hard to ask for user names quickly when deciding to record an EKG in a fast-paced clinical visit. We need to ensure that we save patient data safely, while also providing valuable EKG information to the guest user.&quot;
          </p>
          <footer className="text-[var(--muted)] font-mono text-[14px] uppercase tracking-widest">
            — Product Design Lead
          </footer>
        </blockquote>
      </div>
    </Section>
  );
};

const HowMightWe = () => {
  return (
    <Section title="How Might We?">
      <div className="space-y-12">
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 text-[var(--foreground)]">How might we identify a Guest user?</h3>
          <p className="text-lg text-[var(--muted)] mb-8">
            There were a few different ways to do so. The hero question had to be done properly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-[var(--card)] p-6 md:p-8 border border-[var(--border)]">
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: 'var(--primary)' }}>User Input Based Identification</h4>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-3 md:mb-4">
              Through popups, dropdowns, toggles, input fields, buttons, etc. This method allows users to explicitly indicate when a guest is recording.
            </p>
            <ul className="space-y-2 text-[var(--muted)] text-xs md:text-sm" role="list">
              <li role="listitem">• Popups and modals</li>
              <li role="listitem">• Dropdown menus</li>
              <li role="listitem">• Toggle switches</li>
              <li role="listitem">• Input fields</li>
              <li role="listitem">• Action buttons</li>
            </ul>
          </div>
          <div className="bg-[var(--card)] p-6 md:p-8 border border-[var(--border)]">
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{ color: 'var(--primary)' }}>Biometric Confirmation</h4>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-3 md:mb-4">
              Using device biometrics (Face ID, Touch ID, fingerprint) to confirm the user identity before recording.
            </p>
            <ul className="space-y-2 text-[var(--muted)] text-xs md:text-sm" role="list">
              <li role="listitem">• Face ID recognition</li>
              <li role="listitem">• Touch ID / Fingerprint</li>
              <li role="listitem">• Automatic user detection</li>
              <li role="listitem">• Secure authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const StagesOfIdentification = () => {
  return (
    <Section title="Stages of User Identification">
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-[var(--muted)] max-w-4xl">
          There was also the question of whether we want to ensure the user before the recording is even taken, during the recording, or after. Different user cases required different approaches.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl md:text-2xl" style={{ backgroundColor: 'var(--primary)', color: 'white' }} aria-hidden="true">
              1
            </div>
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-[var(--foreground)]">Before Recording</h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Identify the user before they start recording. Ensures accurate data from the start but may interrupt the flow.
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl md:text-2xl" style={{ backgroundColor: 'var(--primary)', color: 'white' }} aria-hidden="true">
              2
            </div>
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-[var(--foreground)]">During Recording</h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Prompt for user identification while the recording is in progress. Balances flow with data accuracy.
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl md:text-2xl" style={{ backgroundColor: 'var(--primary)', color: 'white' }} aria-hidden="true">
              3
            </div>
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-[var(--foreground)]">After Recording</h3>
            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
              Allow recording first, then identify the user. Least intrusive but may lead to data inaccuracy.
            </p>
          </div>
        </div>

        <ImageSection
          src="/assets/img1.jpg"
          alt="Old Flow Diagram"
          className="mt-12"
        />
      </div>
    </Section>
  );
};

const DesignPrinciples = () => {
  return (
    <Section title="Principles">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {[
          { title: 'Minimize Friction', desc: 'Identification should not interrupt the natural pulse of recording an EKG.' },
          { title: 'Data Integrity', desc: 'Medical precision requires absolute attribution to the correct user.' },
          { title: 'Transparent UX', desc: 'The system must clearly signal whose health data is being captured.' },
          { title: 'Inclusive Flow', desc: 'Adapting to clinical visits, shared devices, and emergency scenarios.' }
        ].map((item, i) => (
          <div key={i} className="space-y-4">
            <h4 className="text-xl font-bold text-indigo-400 uppercase tracking-[0.05em]">{item.title}</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Iterations = () => {
  return (
    <Section title="Process" className="bg-[var(--foreground)]/5">
      <div className="space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-[var(--muted)] font-medium">
          <div className="space-y-6">
            <h3 className="text-[var(--foreground)] text-[14px] font-bold uppercase tracking-tighter">Prototyping</h3>
            <p className="leading-relaxed">
              We developed rapid, low-fidelity experiments to test the cognitive load of various entry points—toggles vs. modals vs. automated triggers.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-[var(--foreground)] text-[14px] font-bold uppercase tracking-tighter">Verification</h3>
            <p className="leading-relaxed">
              Usability testing across varying age groups ensured the guest flow was discoverable without being obtrusive to daily health routines.
            </p>
          </div>
        </div>

        <ImageSection
          src="/assets/img2.jpg"
          alt="Iterative process visualization"
          className="opacity-80"
        />
      </div>
    </Section>
  );
};

const MetricsAndImpact = () => {
  return (
    <Section title="Discovery">
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="space-y-16">
          <div>
            <span className="text-indigo-400 font-black text-[14px] uppercase tracking-[0.3em] mb-6 block">Micro Level</span>
            <ul className="space-y-6 text-[var(--muted)] font-medium">
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Guest identification completion rate</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Identification speed (TTI)</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>New guest profile conversion</span>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-indigo-400 font-black text-[14px] uppercase tracking-[0.3em] mb-6 block">Macro Level</span>
            <ul className="space-y-6 text-[var(--muted)] font-medium">
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Medical data integrity score</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>NPS boost for shared accounts</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Reduced misattribution errors</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-12 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)] backdrop-blur-sm">
          <p className="text-[var(--foreground)] text-xl md:text-2xl font-bold leading-relaxed mb-8">
            The solution successfully bridged the gap between rapid clinical usage and long-term health tracking precision.
          </p>
          <div className="h-px w-full bg-[var(--border)] my-10" />
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-4xl font-black text-[var(--primary)]">92%</div>
              <div className="text-[14px] uppercase tracking-widest font-bold text-[var(--muted)] mt-2">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[var(--primary)]">45k+</div>
              <div className="text-[14px] uppercase tracking-widest font-bold text-[var(--muted)] mt-2">Profiles</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Collaboration = () => {
  return (
    <Section title="Ecosystem" className="bg-[var(--foreground)]/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Product', desc: 'Syncing feature roadmaps with technical feasibility.' },
          { title: 'Engineering', desc: 'Implementing type-safe user attribution logic.' },
          { title: 'Medical', desc: 'Ensuring compliance with health data standards.' }
        ].map((item, i) => (
          <div key={i} className="p-10 bg-[var(--card)] rounded-[2rem] border border-[var(--border)]">
            <h4 className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[14px] mb-4">{item.title}</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const NextSteps = () => {
  return (
    <Section title="Vision">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {[
          { title: 'Smart Sync', desc: 'Using ML to predict guest identity based on EKG waveform patterns.' },
          { title: 'Biometric Skip', desc: 'Seamlessly detecting user switches via integrated device biometrics.' },
          { title: 'Family Hub', desc: 'Unified health dashboard for household management.' },
          { title: 'Onboarding', desc: 'Streamlined Guest-to-Owner conversion funnels.' }
        ].map((item, i) => (
          <div key={i} className="space-y-4">
            <h4 className="text-xl font-bold text-indigo-400 uppercase tracking-tighter">{item.title}</h4>
            <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
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

export default function GuestEKGRecording() {
  const isGsapReady = useGsapLoader();

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <main id="main-content" className="w-full relative" role="main">
        <Hero />
        <CaseStudyPlaceholder />
        {/*
        <Introduction />
        <GuestRecordingFlow />
        <Why />
        <HowMightWe />
        <StagesOfIdentification />
        <DesignPrinciples />
        <Iterations />
        <MetricsAndImpact />
        <Collaboration />
        <NextSteps />
        <NextProject />
        */}
      </main>
    </div>
  );
}
