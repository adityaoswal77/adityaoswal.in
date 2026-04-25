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
            A personalized year-end retrospective for KardiaCare Premium subscribers — turning clinical ECG data into an emotive, shareable narrative that drives retention and organic growth.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Segment</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Premium Subscribers</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Platform</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">KardiaApp iOS</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Focus</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Growth & Retention</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Impact</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Social Growth Loop</dd>
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

const PhoneMockup = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <figure className="flex flex-col items-center gap-6">
    <div className="relative w-[280px] md:w-[320px] overflow-hidden rounded-[2.5rem] border border-[var(--border)] shadow-2xl shadow-black/40 bg-zinc-900">
      <div className="relative w-full aspect-[9/19.5]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="320px"
        />
      </div>
    </div>
    {caption && (
      <figcaption className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] text-center">
        {caption}
      </figcaption>
    )}
  </figure>
);

// --- Sections ---

const Challenge = () => (
  <Section title="The Challenge">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
      <div className="space-y-12">
        <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
          KardiaCare Premium delivers real clinical value — clinician reviews, telehealth consultations, advanced ECG analysis. But most users never see that value reflected back to them.
        </p>
        <ul className="space-y-10">
          {[
            { label: 'Invisible Value', desc: "Subscribers couldn't easily see what their membership had delivered across the year — reviews used, money saved, milestones hit." },
            { label: 'Clinical ≠ Emotional', desc: 'Raw ECG data is medically meaningful but emotionally flat. We needed to make heart health data feel personal and worth sharing.' },
            { label: 'Retention at Risk', desc: 'Year-end is the highest churn window. A compelling recap would reinforce subscription worth right before renewal.' },
          ].map((item, i) => (
            <li key={i} className="space-y-2">
              <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[13px] block">{item.label}</span>
              <span className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-l border-[var(--border)] pl-12 flex flex-col justify-center gap-8">
        <p className="text-[var(--foreground)] text-xl md:text-2xl font-bold leading-relaxed italic">
          &quot;Year-end reviews are the ultimate opportunity to transition from a product to a partner in our users&apos; health journey.&quot;
        </p>
        <span className="text-[13px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
          Growth Design Lead
        </span>
      </div>
    </div>
  </Section>
);

const Strategy = () => (
  <Section title="The Strategy">
    <div className="space-y-24">
      <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 font-medium max-w-4xl leading-relaxed">
        A cinematic, scroll-driven experience inside the app. Dark navy with a star-field backdrop — celestial, premium, personal. Each section builds towards a shareable moment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {[
          { step: '01', title: 'Excavate', desc: 'Surface meaningful moments buried in clinical telemetry — total ECGs, recording habits, device usage, clinician reviews ordered.' },
          { step: '02', title: 'Narrate', desc: 'Arrange the data into a rhythm that builds emotional momentum. From stats to value to gratitude to future action.' },
          { step: '03', title: 'Amplify', desc: 'Design shareable data cards that turn personal milestones into organic social content — a built-in growth loop.' },
        ].map((item, i) => (
          <div key={i} className="py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0 space-y-6">
            <span className="text-[13px] font-bold text-[var(--muted)] uppercase tracking-widest">{item.step}</span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--foreground)]">{item.title}</h3>
            <p className="text-[var(--muted)] font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-20 border-t border-[var(--border)]">
        <h3 className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)] mb-14">Design Principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
          {[
            { title: 'Celebratory', desc: 'Every data point feels like a victory, not a clinical record.' },
            { title: 'Personal', desc: 'Hyper-specific stats that feel one-to-one, not templated.' },
            { title: 'Premium', desc: 'Visual polish that makes the $10/month feel obviously worth it.' },
            { title: 'Shareable', desc: 'Built-in social share flow — every card is export-ready.' },
          ].map((p, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-[14px] font-black uppercase tracking-widest text-[var(--foreground)]">{p.title}</h4>
              <p className="text-[var(--muted)] text-[14px] font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const TheDesign = () => (
  <Section title="The Experience">
    <div className="space-y-40">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">01 — Opening</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">2025 Recap</h3>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            A full-screen cinematic landing — deep navy blue, a star field, and a heart with a live ECG trace. Bold type sets the stage: <em>&quot;Scroll to view your Kardia stats for the year.&quot;</em> The entry creates anticipation before a single number is shown.
          </p>
        </div>
        <div className="flex justify-center">
          <PhoneMockup
            src="/assets/year-in-review/01-hero.png"
            alt="Year in Review opening screen — 2025 Recap with dark navy background and heart illustration"
            caption="Opening Screen"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <PhoneMockup
            src="/assets/year-in-review/02-ekg-profile.png"
            alt="EKG Profile screen showing donut chart with 300 total EKGs"
            caption="Your EKG Profile"
          />
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">02 — Your EKG Profile</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">By the Numbers</h3>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            A donut chart shows total ECGs taken across all devices, followed by a breakdown of recording habits — most active days (Monday &amp; Friday), peak times (9AM &amp; 10PM), and monthly trends over the year. Clinical data, reframed as personal achievements.
          </p>
          <ul className="space-y-3 text-[var(--muted)] font-medium text-sm pt-2">
            {['Total ECGs across all Kardia devices', 'Most active recording days and times', 'Month-by-month recording trend chart'].map((s, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[var(--muted)] shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">03 — Heart Stats</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">Heart Rate &amp; Blood Pressure</h3>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            Average readings over the year (108/74 mmHg), trend lines, and streak data — surfaced as milestones, not clinical reports. Positively framed even when readings are routine, celebrating consistency as a health win.
          </p>
        </div>
        <div className="flex justify-center">
          <PhoneMockup
            src="/assets/year-in-review/03-heart-stats.png"
            alt="Heart Rate and Blood Pressure stats screen"
            caption="Heart Stats"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <PhoneMockup
            src="/assets/year-in-review/04-kardia-care-value.png"
            alt="KardiaCare value section showing $507 in Clinician Reviews and TeleConnect consultations"
            caption="Your KardiaCare Value"
          />
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">04 — KardiaCare Value</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">What You Got</h3>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            The highest-stakes section for retention. A dollar-value breakdown of every premium benefit used — Clinician Reviews ($507 in value, 13 reviews) and TeleConnect Consultations ($138, 2 sessions). Progress bars make the value tangible.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[var(--border)]">
            {[
              { value: '$507', label: 'Clinician Review Value' },
              { value: '$138', label: 'TeleConnect Value' },
            ].map((m, i) => (
              <div key={i} className="pt-6 space-y-1">
                <div className="text-3xl font-black text-[var(--foreground)]">{m.value}</div>
                <p className="text-[13px] font-bold uppercase tracking-widest text-[var(--muted)]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">05 — Product Story</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">A Year in Kardia</h3>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            A curated look at what the Kardia team shipped in 2025 — new tools that made managing heart health simpler. Positions the product as a living, improving partner rather than a static device companion. Builds brand affinity ahead of renewal.
          </p>
        </div>
        <div className="flex justify-center">
          <PhoneMockup
            src="/assets/year-in-review/05-year-in-kardia.png"
            alt="A Year in Kardia section showing 2025 product updates"
            caption="A Year in Kardia"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <PhoneMockup
            src="/assets/year-in-review/06-resources.png"
            alt="Resources screen with heart health articles and links for 2026"
            caption="Resources"
          />
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">06 — Looking Forward</span>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">Resources for 2026</h3>
          <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">
            The retrospective ends with a forward look — curated heart health resources and articles to carry momentum into the new year. Ends on an aspirational note, not a hard sell.
          </p>
        </div>
      </div>

    </div>
  </Section>
);

const Impact = () => {
  const metrics = [
    { value: "73,718", label: "Impressions", desc: "Unique users who saw the Year in Review card" },
    { value: "21.90%", label: "CTR", desc: "Click-through rate on the campaign card" },
    { value: "16,145", label: "Clicks", desc: "Unique users who tapped through to the experience" },
    { value: "9,224", label: "Dismissals", desc: "Users who dismissed — informing future targeting" },
  ];

  return (
    <Section title="The Impact">
      <div className="space-y-24">
        <p className="text-2xl text-[var(--foreground)] opacity-80 font-medium max-w-4xl leading-relaxed">
          Year in Review moved from a scheduled feature to an annual ritual — something premium subscribers now anticipate. The campaign drove a 21.9% CTR across 73,718 impressions with zero paid spend.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--border)] border-t border-b border-[var(--border)] py-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-8 first:pl-0 last:pr-0 space-y-3">
              <div className="text-4xl md:text-5xl font-black text-[var(--foreground)] tabular-nums">{metric.value}</div>
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]">{metric.label}</p>
              <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h4 className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">Retention</h4>
            <ul className="space-y-6">
              {[
                'Definitive increase in annual premium renewals post-launch',
                'High replay value — many users revisited the experience multiple times',
                'Became a benchmark internally for future growth design initiatives',
              ].map((s, i) => (
                <li key={i} className="text-[var(--muted)] font-medium leading-relaxed border-t border-[var(--border)] pt-6 first:border-0 first:pt-0">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">Growth</h4>
            <ul className="space-y-6">
              {[
                'Viral social cards drove new premium trial sign-ups through organic loops',
                'Positive community response elevated brand sentiment heading into Q1',
                'Shared cards outperformed all paid acquisition creative that quarter',
              ].map((s, i) => (
                <li key={i} className="text-[var(--muted)] font-medium leading-relaxed border-t border-[var(--border)] pt-6 first:border-0 first:pt-0">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Reflection = () => (
  <Section title="What I Learned">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
      <div className="space-y-8">
        <p className="text-xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
          The hardest design constraint was trust. Healthcare data is sensitive — users needed to feel seen, not surveilled. Every choice of language and framing mattered more than the visual design.
        </p>
        <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
          The project also taught me that growth design doesn&apos;t have to be extractive. The most effective retention mechanism we built was simply showing users the value they&apos;d already received — no dark patterns, no manufactured urgency. Just honest reflection.
        </p>
      </div>
      <div className="space-y-0">
        {[
          { label: 'Tone over aesthetics', desc: 'We spent more time on copy direction than visual polish. The warmth of the language did more to drive completion than the animation.' },
          { label: 'Data ≠ insight', desc: '300 ECGs is a number. "You recorded most on Mondays" is a story. The translation layer was the design challenge.' },
          { label: 'Share triggers are earned', desc: 'Users shared because the data was genuinely surprising and personal — not because we added a share button.' },
        ].map((item, i) => (
          <div key={i} className="py-8 border-t border-[var(--border)] space-y-2">
            <span className="text-[var(--foreground)] font-bold uppercase tracking-widest text-[13px] block">{item.label}</span>
            <span className="text-[var(--muted)] font-medium text-sm leading-relaxed">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const NextProject = () => (
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

// --- Main ---

export default function YearInReview() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <Challenge />
        <Strategy />
        <TheDesign />
        <Impact />
        <Reflection />
        <NextProject />
      </div>
    </div>
  );
}
