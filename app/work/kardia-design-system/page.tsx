"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { ZoomableImage } from '@/components/ZoomableImage';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dark "band" sections use a bespoke near-navy (#182c3d), close to the
// Kardia brand-blue family, rather than an arbitrary hex or the site's
// persona-flipped --foreground — so the rhythm reads as "this project's
// dark," not site chrome.
const DARK_BG = "#182c3d";
const DARK_BORDER = "#2f3d47";

// Real export: pre-DS tutorial popup, eight variants found side by side in the file.
const EXHIBIT_IMAGE = "/assets/kardia-ds/popups/tutorial.png";

// Real exports from the Kardia DS Figma file.
const BUTTONS_BEFORE_IMAGE = "/assets/kardia-ds/Action_Button/Button_Fill.png";
const BUTTONS_AFTER_IMAGE = "/assets/kardia-ds/Buttons.png";
const COLOR_BEFORE_DEFAULT = "/assets/kardia-ds/old-light-default.png";
const COLOR_BEFORE_PREMIUM = "/assets/kardia-ds/old-light-premium.png";
const COLOR_AFTER_BRAND = "/assets/kardia-ds/new-brand.png";
const COLOR_AFTER_PREMIUM = "/assets/kardia-ds/new-premium.png";

// --- Shared building blocks ---

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
              Alivecor / 2025
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-tight uppercase text-[var(--foreground)]"
          >
            Design
            <br />
            <span className="italic font-light text-[var(--muted)]">System</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-2xl"
          >
            A custom design system for a cardiac health app — built from scratch to unify a product that had outgrown itself.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Role</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Lead Designer</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Timeline</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">4 Weeks</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Delivered</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Foundations & Components</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Design
        </span>
      </div>
    </section>
  );
};

const Section = ({
  title,
  dark = false,
  children,
  className = "",
}: {
  title?: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
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
      style={dark ? { backgroundColor: DARK_BG, borderColor: DARK_BORDER } : undefined}
      className={`px-6 py-24 md:py-40 border-t transition-colors duration-300 ${
        dark ? "text-white" : "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
      } ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            ref={titleRef}
            className={`text-3xl md:text-5xl font-bold tracking-tight mb-14 md:mb-20 leading-[1.05] ${dark ? "text-white" : "text-[var(--foreground)]"}`}
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

const Quote = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <blockquote
    className={`border-l-2 pl-6 text-xl md:text-2xl italic font-medium leading-relaxed ${
      dark ? "border-[#478fe1] text-white/80" : "border-[#113a69] text-[var(--foreground)] opacity-80"
    }`}
  >
    {children}
  </blockquote>
);

const List = ({ items, dark = false }: { items: { label: string; desc: string }[]; dark?: boolean }) => (
  <ul className={`list-disc pl-5 space-y-4 ${dark ? "marker:text-white/30" : "marker:text-[var(--muted)]"}`}>
    {items.map((item) => (
      <li key={item.label} className={`text-lg leading-relaxed ${dark ? "text-white/60" : "text-[var(--muted)] font-medium"}`}>
        <span className={`font-bold ${dark ? "text-white" : "text-[var(--foreground)]"}`}>{item.label}.</span> {item.desc}
      </li>
    ))}
  </ul>
);

const Code = ({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "error" }) => (
  <pre
    className={`font-mono text-[12px] leading-relaxed p-5 rounded-xl overflow-x-auto whitespace-pre-wrap ${
      tone === "error"
        ? "bg-[#cc3d3f0d] text-[#a32e30] dark:bg-[#cc3d3f1a] dark:text-[#f4a8a8]"
        : "bg-[var(--foreground)]/[0.04] text-[var(--foreground)] dark:bg-white/[0.06]"
    }`}
  >
    {children}
  </pre>
);

// --- Context ---

const ContextSection = () => (
  <Section title="Context">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80">
          Kardia by AliveCor is a consumer cardiac health app — patients record ECGs, share results with a cardiologist, and track heart rhythm over time. The interface has to feel calm for an anxious patient, while staying precise enough for a clinical read.
        </p>
        <List
          items={[
            { label: "Years of organic growth", desc: "no shared component library, so every sprint added its own headers, buttons, and fonts." },
            { label: "Not a rebrand", desc: "the Kardia DS is infrastructure — a shared language the product could scale on without repeating old debt." },
          ]}
        />
        <Quote>
          A design system for a cardiac health app has to earn trust twice: once with the patient who needs to feel calm, and again with the clinician who needs the data to be unambiguous.
        </Quote>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-[var(--border)]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-5">Team</p>
          <div className="space-y-4">
            {[
              { name: "Aditya", role: "Lead Designer" },
              { name: "Sprint Partner", role: "Design Contractor" },
              { name: "Katie", role: "Product" },
              { name: "Anuj", role: "Engineering Lead" },
              { name: "Alyssa", role: "Marketing" },
            ].map((person) => (
              <div key={person.name} className="flex items-baseline justify-between gap-4">
                <span className="font-bold text-[var(--foreground)]">{person.name}</span>
                <span className="text-[13px] text-[var(--muted)] whitespace-nowrap">{person.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-5">Scope</p>
          <ul className="space-y-3">
            {[
              "Foundations — color, type, spacing, elevation",
              "Cross-platform token architecture",
              "Core component library in Figma",
              "Handoff-ready for iOS, Android, Web",
            ].map((item) => (
              <li key={item} className="text-[15px] font-medium text-[var(--foreground)] opacity-80">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Section>
);

// --- The Problem ---

const ProblemStatement = () => (
  <Section title="The Problem">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80">
          The Kardia Consumer App grew screen by screen, with no shared component library. It worked — patients used it, cardiologists relied on it — but the debt was real and it was accumulating.
        </p>
        <List
          items={[
            { label: "No single source of truth", desc: "15+ workflows lived in disconnected Figma files, with no way to propagate a change across screens." },
            { label: "iOS-only fonts in cross-platform designs", desc: "SF Pro Display and SF Compact Text are Apple system fonts — Android and Web had no equivalent." },
            { label: "No token handoff", desc: "every platform reimplemented color, spacing, and radius independently. Values drifted across iOS, Android, and Web." },
          ]}
        />
        <p className="text-[15px] text-[var(--muted)] font-medium">
          An audit that catalogued every workflow into one file made the inconsistency impossible to ignore — six typefaces in active use across 15 workflows, none of them cross-platform, and six header patterns, none sharing a component or token.
        </p>
        <ul className="space-y-2.5 pt-2">
          {[
            "SF Pro Display Bold — account deletion, onboarding headers (iOS only)",
            "SF Compact Text Regular — body copy, confirmation dialogs (renders differently per OS)",
            "SF Pro Rounded Medium — KardiaMobile setup screens (inconsistent with the rest of the product)",
            "SF Compact Text Medium — input fields, form labels (mixed with SF Pro Display on the same screen)",
            "Helvetica Neue — older onboarding flows, legacy fallback",
            "System UI — web product pages, undeclared, browser decides",
          ].map((item) => (
            <li key={item} className="text-[14px] text-[var(--muted)] font-medium">{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-5 pt-4 max-w-2xl">
        <h3 className="text-xl font-bold text-[var(--foreground)]">Tutorial Popup</h3>
        <p className="text-[var(--muted)] font-medium leading-relaxed">
          The onboarding tutorial popup showed the same debt from a different angle — eight variants of the same component turned up side by side in the file, each one solving step navigation on its own.
        </p>
        <p className="text-[var(--muted)] font-medium leading-relaxed">
          Half use a chevron-and-slider pattern with a live step counter; the other half collapse it to a single button still labeled{" "}
          <code className="font-mono text-[13px] bg-[var(--foreground)]/[0.06] px-1.5 py-0.5 rounded">TEXT</code> — a placeholder that was never filled in. Whether the close affordance or the illustration block shows up depends on which copy of the component someone happened to duplicate.
        </p>
        <Code tone="error">{`Variants found in the file: 8
Navigation patterns: 2 — chevron+slider vs single button
Button label reading literal "TEXT": 4 of 8
Close (X) affordance: present on 4 of 8, missing on the rest`}</Code>
      </div>
      <div className="relative rounded-lg overflow-hidden border border-[var(--border)] bg-white">
        <ZoomableImage src={EXHIBIT_IMAGE} alt="Eight variants of the KardiaCard tutorial popup found side by side in the pre-DS file, each with different navigation, close, and image-placeholder treatment" width={2988} height={1986} className="w-full h-auto" />
      </div>
    </div>
  </Section>
);

// --- The System ---

const SystemSection = () => (
  <Section dark title="The System">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg text-white/70 leading-relaxed">
          Off-the-shelf kits don&apos;t fit cardiac health — color semantics can&apos;t conflict with accessibility rules for error and warning states, and the tone has to read as both calm and precise.
        </p>
        <List
          dark
          items={[
            { label: "Foundations first", desc: "color, type, spacing, radius, and elevation, locked before a single component was touched." },
            { label: "Components second", desc: "starting with buttons — the highest-frequency element, and the one that stress-tests every semantic variant at once." },
          ]}
        />
        <Quote dark>
          Foundations first. You cannot build stable components on top of an unstable token system.
        </Quote>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-white/10">
        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-white/40 mb-5">What shipped</p>
          <div className="space-y-4">
            {[
              { title: "Design Tokens", desc: "color, spacing, radius, type, shadow" },
              { title: "Component Library", desc: "buttons, inputs, modals, cards, nav" },
              { title: "Foundations", desc: "type ramp, spacing scale, elevation, grid" },
              { title: "Cross-platform handoff", desc: "one JSON source → SwiftUI, Compose, CSS" },
            ].map((p) => (
              <div key={p.title} className="flex items-baseline justify-between gap-4">
                <span className="font-bold text-white">{p.title}</span>
                <span className="text-[13px] text-white/40 text-right">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-white/40 mb-5">Sprint timeline</p>
          <div className="space-y-4">
            {[
              ["Week 1", "Color, typography"],
              ["Week 2", "Spacing, radius, elevation"],
              ["Week 3", "Buttons, inputs, forms"],
              ["Week 4", "Navigation, modals, docs"],
            ].map(([week, detail]) => (
              <div key={week} className="flex items-baseline justify-between gap-4">
                <span className="font-bold text-white">{week}</span>
                <span className="text-[13px] text-white/40 text-right">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// --- Color Foundations ---

const TOKEN_CHAIN = [
  { layer: "Primitive", tag: "Source of truth", token: "brand/600", ref: "#113A69", desc: "Raw value. Never used directly in components." },
  { layer: "Semantic", tag: "Intent layer", token: "color.primary.bg", ref: "→ brand/600", desc: "Assigns meaning to a primitive. Component-agnostic." },
  { layer: "Component", tag: "Usage layer", token: "button.primary.bg", ref: "→ color.primary.bg", desc: "Wires semantic to a specific component context." },
];

const PALETTES: { name: string; swatches: { step: string; hex: string }[] }[] = [
  {
    name: "Brand — primitive scale",
    swatches: [
      { step: "0", hex: "#f8fbfe" }, { step: "100", hex: "#f2f7fd" },
      { step: "200", hex: "#b9d4f3" }, { step: "300", hex: "#478fe1" },
      { step: "400", hex: "#206dc5" }, { step: "500", hex: "#174e8c" },
      { step: "600", hex: "#113a69" }, { step: "700", hex: "#0c2746" },
      { step: "800", hex: "#061323" }, { step: "900", hex: "#030a12" },
    ],
  },
  {
    name: "Premium — primitive scale",
    swatches: [
      { step: "0", hex: "#f8f4fa" }, { step: "100", hex: "#ebe4f3" },
      { step: "200", hex: "#d9c7e6" }, { step: "300", hex: "#c2a0d9" },
      { step: "400", hex: "#a77bca" }, { step: "500", hex: "#885fa5" },
      { step: "600", hex: "#6b4983" }, { step: "700", hex: "#573d6a" },
      { step: "800", hex: "#3e2550" }, { step: "900", hex: "#1b1023" },
    ],
  },
];

const ColorFoundations = () => (
  <Section title="Color Foundations">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80">
          The old system used loosely defined semantic tokens named after moods —{" "}
          <code className="font-mono text-[13px] bg-[var(--foreground)]/[0.06] px-1.5 py-0.5 rounded">Mindful Blue</code>{" "}
          — with no primitive scale underneath. The new system starts from a structured 0–900 primitive ramp with AA contrast ratios at every stop, before any semantic meaning is assigned.
        </p>
        <List
          items={[
            { label: "Primitive first", desc: "brand and premium each get a full 0–900 ramp — every step carries a documented AA contrast score, not just a color guess." },
            { label: "Two identities, not one", desc: "brand (blue) carries the core product; premium (purple) is reserved for KardiaCare, the membership upsell, so the two never compete for attention." },
          ]}
        />
      </div>

      <div className="pt-4 space-y-8">
        <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">Before / after — the color system</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-[#cc3d3f0d] dark:bg-[#cc3d3f1a]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#a32e30] dark:text-[#f4a8a8] mb-1">Before — old DS</p>
              <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed">Semantic tokens named after colors. No primitive scale. No contrast ratios documented.</p>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[var(--border)]">
              <ZoomableImage src={COLOR_BEFORE_DEFAULT} alt="Old light-theme default color tokens — Mindful Blue, named ad hoc with no primitive scale" width={1000} height={1400} className="w-full h-auto" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-[#0a95490d] dark:bg-[#0a95491a]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#07773a] dark:text-[#5fd38e] mb-1">After — Kardia DS</p>
              <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed">0–900 primitive scale. AA contrast ratios at every stop. Semantic tokens reference primitives.</p>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[var(--border)]">
              <ZoomableImage src={COLOR_AFTER_BRAND} alt="New brand color primitive scale, 0 to 900, each step with a documented AA contrast score" width={1600} height={520} className="w-full h-auto" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-[#cc3d3f0d] dark:bg-[#cc3d3f1a]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#a32e30] dark:text-[#f4a8a8] mb-1">Before — premium theme</p>
              <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed">Flat semantic tokens. Premium Purple #885FA5 with opacity variants. No scale.</p>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[var(--border)]">
              <ZoomableImage src={COLOR_BEFORE_PREMIUM} alt="Old light-theme premium color tokens — Premium Purple, flat with opacity variants" width={1000} height={1400} className="w-full h-auto" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-[#0a95490d] dark:bg-[#0a95491a]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#07773a] dark:text-[#5fd38e] mb-1">After — premium palette</p>
              <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed">Full 0–900 primitive scale. Premium features draw from the same token architecture as brand.</p>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[var(--border)]">
              <ZoomableImage src={COLOR_AFTER_PREMIUM} alt="New premium color primitive scale, 0 to 900, each step with a documented AA contrast score" width={1600} height={520} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-5">Primitive → semantic → component</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOKEN_CHAIN.map((row) => (
            <div key={row.layer} className="rounded-xl border border-[var(--border)] p-5 space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-[var(--foreground)]">{row.layer}</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{row.tag}</span>
              </div>
              <p className="font-mono text-[13px] font-bold text-[#113a69] dark:text-[#478fe1]">{row.token}</p>
              {row.ref && <p className="font-mono text-[12px] text-[var(--muted)]">{row.ref}</p>}
              <p className="text-[13px] text-[var(--muted)] font-medium leading-relaxed pt-1">{row.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-14 pt-4">
        {PALETTES.map((palette) => (
          <div key={palette.name}>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[var(--muted)] mb-4">{palette.name}</p>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {palette.swatches.map((s) => (
                <div key={s.step} className="space-y-1.5">
                  <div className="aspect-square rounded-lg border border-[var(--border)]" style={{ backgroundColor: s.hex }} />
                  <p className="text-[10px] font-mono text-[var(--muted)] leading-tight">{s.hex}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

// --- Typography ---

const TYPE_RAMP = [
  { label: "Display", spec: "40 / 700", sample: "Track your heart health, every day.", size: "text-3xl md:text-4xl font-bold" },
  { label: "H1", spec: "28 / 700", sample: "Recent Recordings", size: "text-2xl font-bold" },
  { label: "H2", spec: "22 / 600", sample: "Account Settings", size: "text-xl font-semibold" },
  { label: "H3", spec: "18 / 600", sample: "Notification Preferences", size: "text-lg font-semibold" },
  { label: "Body", spec: "16 / 400", sample: "Your ECG results will be reviewed by a certified cardiologist within 24 hours.", size: "text-base font-normal" },
  { label: "Label", spec: "13 / 500", sample: "NORMAL SINUS RHYTHM", size: "text-[13px] font-medium tracking-wide" },
  { label: "Caption", spec: "12 / 400", sample: "Recorded 14 Jul 2025 · 9:41 AM", size: "text-[12px] font-normal" },
];

const Typography = () => (
  <Section dark title="Typography">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg text-white/70 leading-relaxed">
          Designers reached for Apple system fonts because Figma bundles them and they preview well on a Mac — but SF Pro doesn&apos;t exist on Android or Web. Engineers improvised, and the product looked different on every platform.
        </p>
        <List
          dark
          items={[
            { label: "DM Sans", desc: "a variable font on every platform via Google Fonts, geometric-humanist, legible from label to display size." },
            { label: "Plus Jakarta Sans", desc: "the structural companion — narrower, higher x-height — for metadata and UI chrome." },
          ]}
        />
      </div>

      <div className="pt-4">
        <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-white/40 mb-6">Type ramp — DM Sans, cross-platform</p>
        <div className="divide-y divide-white/10">
          {TYPE_RAMP.map((row) => (
            <div key={row.label} className="grid grid-cols-1 md:grid-cols-[100px,1fr] gap-2 md:gap-8 py-5 first:pt-0 last:pb-0">
              <p className="text-[13px] font-bold text-white/40 uppercase tracking-wide">{row.label} · {row.spec}</p>
              <p className={`text-white/90 ${row.size}`}>{row.sample}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

// --- Components · Buttons ---

const DO_ITEMS = [
  "Use Destructive Primary for anything that permanently removes data",
  "Stack buttons vertically with Primary on top in mobile contexts",
  "Match a button's role to the action, not the visual weight you want",
  "Use Ghost buttons for inline contextual actions within content",
  "Pair a Primary with at most one Secondary or Ghost counterpart",
];

const DONT_ITEMS = [
  "Hardcode a fill color — always reference a semantic token",
  "Use Brand Primary for a destructive action because it looks bolder",
  "Place two Primary buttons side-by-side at the same hierarchy level",
  "Re-skin a button with a custom fill outside the token system",
  "Use more than two action buttons in a single bottom action area",
];

const Components = () => (
  <Section title="Buttons">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80">
          Buttons came first because they carry the highest semantic weight in the product. The system defines four roles — Brand, Destructive, Success, Neutral — each with three hierarchy levels and five documented states.
        </p>
        <List
          items={[
            { label: "Brand is blue, not a mood", desc: "the primary role resolves to the brand primitive scale — a systematic 0–900 ramp, not a hand-picked hex like the old Pill_CTA_Green or Ghost_Link_Blue." },
            { label: "Naming carries the role", desc: "Action_Button/OLDandCrusty became Button / Destructive / Primary — the semantic role is explicit in the name, not the hex." },
          ]}
        />
      </div>

      <div className="space-y-3 pt-4">
        <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#113a69] dark:text-[#478fe1]">After — Kardia DS, full specification</p>
        <p className="text-[13px] text-[var(--muted)] font-medium">Every role across solid, tinted, outline, and disabled states.</p>
        <div className="relative rounded-lg overflow-hidden border border-[var(--border)] bg-white">
          <ZoomableImage src={BUTTONS_AFTER_IMAGE} alt="Kardia DS button specification — brand, premium, neutral, success, warning, and destructive roles across solid, tinted, outline, and disabled states" width={1914} height={634} className="w-full h-auto" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">Before — Action_Button, pre-DS</p>
        <p className="text-[13px] text-[var(--muted)] font-medium">Hand-recolored per screen, no semantic naming behind the fills.</p>
        <div className="relative aspect-[3/1] rounded-lg overflow-hidden border border-[var(--border)] bg-white">
          <ZoomableImage src={BUTTONS_BEFORE_IMAGE} alt="Pre-DS Action_Button component — hand-picked fill colors with no semantic role or token behind them" fill className="object-cover scale-[1.03]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4 border-t border-[var(--border)]">
        <div className="pt-8">
          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#0a9549] mb-4">Do</p>
          <ul className="space-y-3">
            {DO_ITEMS.map((item) => (
              <li key={item} className="text-[15px] font-medium text-[var(--foreground)] opacity-80">{item}</li>
            ))}
          </ul>
        </div>
        <div className="pt-8">
          <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#cc3d3f] mb-4">Don&apos;t</p>
          <ul className="space-y-3">
            {DONT_ITEMS.map((item) => (
              <li key={item} className="text-[15px] font-medium text-[var(--foreground)] opacity-80">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Section>
);

// --- Design Tokens in Code ---

const TOKEN_TABLE = [
  { token: "color.brand.600", value: "#113A69", usage: "Primary CTA background" },
  { token: "color.error.600", value: "#cc3d3f", usage: "Destructive action, error state" },
  { token: "color.neutral.900", value: "#182c3d", usage: "Body text, headings" },
  { token: "color.neutral.300", value: "#c6ccd2", usage: "Borders, dividers" },
  { token: "color.premium.600", value: "#6B4983", usage: "Premium feature surfaces" },
  { token: "radius.sm", value: "4px", usage: "Button, input, small card" },
  { token: "radius.md", value: "8px", usage: "Modal, sheet, overlay" },
  { token: "shadow.elevation.1", value: "0 1px 4px rgba(0,0,0,.10)", usage: "Card lift, floating element" },
  { token: "font.heading1", value: "DM Sans / 700 / 28px", usage: "Page title, screen header" },
  { token: "font.body", value: "DM Sans / 400 / 16px", usage: "Body copy, descriptions" },
];

const CSS_SNIPPET = `:root {
  --color-brand-600: #113a69;
  --color-error-600: #cc3d3f;
  --color-neutral-900: #182c3d;
  --color-premium-600: #6b4983;
  --radius-sm: 4px;
  --font-body: 'DM Sans', sans-serif;
}`;

const SWIFT_SNIPPET = `extension Color {
  static let brandPrimary =
    Color(hex: "#113A69")
  // color.brand.600

  static let destructive =
    Color(hex: "#cc3d3f")
  // color.error.600

  static let premium =
    Color(hex: "#6B4983")
  // color.premium.600
}`;

const COMPOSE_SNIPPET = `val KardiaColors =
  lightColorScheme(
    primary =
      Color(0xFF113A69),
    // color.brand.600

    error =
      Color(0xFFCC3D3F),
    // color.error.600

    tertiary =
      Color(0xFF6B4983),
    // color.premium.600
  )`;

const TokensInCode = () => (
  <Section title="Tokens in Code">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80">
          Before the DS, the same color was defined three times — a Figma fill, a Swift constant, an Android XML value — and they drifted apart with no shared reference.
        </p>
        <List
          items={[
            { label: "Tokens live once, as JSON", desc: "a build step resolves them to SwiftUI, Compose, and CSS, so what designers see is what engineers ship." },
            { label: "Named at the semantic level", desc: "not the primitive — so component code stays stable when the underlying value changes." },
          ]}
        />
      </div>

      <div className="pt-4">
        <div className="hidden md:grid grid-cols-[1fr,1fr,1.4fr] px-0 py-3 border-b border-[var(--border)]">
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--muted)]">Token</span>
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--muted)]">Value</span>
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--muted)]">Usage</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {TOKEN_TABLE.map((row) => (
            <div key={row.token} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1.4fr] gap-1 md:gap-4 py-4">
              <code className="font-mono text-[13px] font-bold text-[#113a69] dark:text-[#478fe1]">{row.token}</code>
              <span className="text-[13px] font-mono text-[var(--foreground)] flex items-center gap-2">
                {/^#/.test(row.value) && <span className="w-3 h-3 rounded-sm border border-[var(--border)] inline-block" style={{ backgroundColor: row.value }} />}
                {row.value}
              </span>
              <span className="text-[13px] text-[var(--muted)]">{row.usage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div>
          <p className="text-[12px] font-bold text-[var(--muted)] mb-2">SwiftUI · iOS</p>
          <Code>{SWIFT_SNIPPET}</Code>
        </div>
        <div>
          <p className="text-[12px] font-bold text-[var(--muted)] mb-2">Android · Compose</p>
          <Code>{COMPOSE_SNIPPET}</Code>
        </div>
        <div>
          <p className="text-[12px] font-bold text-[var(--muted)] mb-2">React · CSS Tokens</p>
          <Code>{CSS_SNIPPET}</Code>
        </div>
      </div>
    </div>
  </Section>
);

// --- Process ---

const PHASES = [
  {
    n: "1", status: "Complete", title: "Foundation", when: "Weeks 1–2",
    items: ["All Screens audit", "Brand color alignment", "Primitive token scale, 0–900", "Semantic token mapping", "DM Sans type ramp", "Spacing · radius · elevation", "Engineering token review"],
  },
  {
    n: "2", status: "Complete", title: "Components", when: "Weeks 3–4",
    items: ["Button system — 4 roles × 3 levels × 5 states", "Text input and form fields", "Modal and alert sheet", "Bottom navigation", "Card and surface", "Usage guidelines", "Engineering handoff spec"],
  },
  {
    n: "3", status: "In Progress", title: "Adoption", when: "Ongoing",
    items: ["iOS token implementation", "Android token implementation", "Web CSS token implementation", "Kardia app redesign rollout", "Contribution model", "Version and changelog"],
  },
];

const Process = () => (
  <Section title="Process">
    <div className="space-y-16">
      <div className="space-y-8 max-w-2xl">
        <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80">
          The sprint rule was strict: no component work until color, type, and spacing were locked. Starting components before the token system is stable means either building twice or shipping components that reference values that change underneath them.
        </p>
        <List
          items={[
            { label: "Engineering was involved early", desc: "Anuj reviewed the token naming in Week 1 and caught a naming conflict with an existing Android convention — that conversation saved days of re-work in Phase 3." },
            { label: "Week 1 was audit and decisions only", desc: "no Figma components built. That discipline paid off in Weeks 3 and 4 — not a single component revision was triggered by a foundation-level change." },
          ]}
        />
        <p className="text-[15px] text-[var(--muted)] font-medium">
          Phase 3 is ongoing. The system is built; adoption — engineering token implementation, app redesign rollout, contribution model — is where the ROI materializes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8 border-t border-[var(--border)]">
        {PHASES.map((phase) => (
          <div key={phase.n} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-[var(--muted)]">{phase.n}</span>
              <span
                className={`text-[11px] font-bold uppercase tracking-widest ${
                  phase.status === "In Progress" ? "text-[#8a5700] dark:text-[#ffc640]" : "text-[#0a9549] dark:text-[#5fd38e]"
                }`}
              >
                {phase.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">{phase.title}</h3>
            <p className="text-[13px] font-mono text-[var(--muted)]">{phase.when}</p>
            <ul className="space-y-1.5 pt-1">
              {phase.items.map((item) => (
                <li key={item} className="text-[13px] text-[var(--muted)] font-medium leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

// --- Impact ---

const Impact = () => (
  <Section dark title="Impact">
    <div className="space-y-16">
      <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
        What the system enables, by function.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8 border-t border-white/10">
        {[
          {
            title: "Product",
            items: ["Shared components ship in hours, not days", "Brand consistency without per-screen review", "Foundation for product expansion without new debt"],
          },
          {
            title: "Design",
            items: ["One library, one source of truth — no drift between files", "Update a token, not 40 component instances", "More time on interaction design, less on visual QA"],
          },
          {
            title: "Engineering",
            items: ["Accelerated development across iOS and Android", "Token handoff eliminates interpretation drift between platforms", "Shared naming convention reduces designer–engineer friction"],
          },
        ].map((col) => (
          <div key={col.title} className="space-y-3">
            <h4 className="text-[13px] font-bold text-white uppercase tracking-[0.1em]">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item} className="text-[14px] text-white/60 leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

// --- Learnings ---

const LEARNINGS = [
  "Bring more stakeholders in from the beginning so everyone is on the same page before any decisions are made.",
  "Marketing has to be involved from the start — brand color and voice decisions made without them create re-work later.",
  "Engineering brings essential context for decision-making. Token naming, platform constraints, and feasibility calls are better made together, not handed over.",
  "Have clear, agreed-upon goals from Business, Product, and Engineering before the system work begins. A design system without a shared north star serves no one.",
  "Chase the north star. The system is infrastructure, not a deliverable. Keep the long-term product goal visible so every foundation and component decision points toward it.",
];

const Learnings = () => (
  <Section title="Learnings">
    <div className="space-y-16">
      <p className="text-lg font-medium leading-relaxed text-[var(--foreground)] opacity-80 max-w-2xl">
        What this sprint taught me about building a design system inside an org.
      </p>

      <div className="divide-y divide-[var(--border)]">
        {LEARNINGS.map((item, i) => (
          <div key={item} className="py-8 first:pt-0 last:pb-0 flex items-baseline gap-4">
            <span className="text-[13px] font-bold text-[var(--muted)] opacity-50 tabular-nums shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-[15px] text-[var(--muted)] font-medium leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const NextProject = () => (
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

// --- Main Component ---

export default function KardiaDesignSystem() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <ContextSection />
        <ProblemStatement />
        <SystemSection />
        <ColorFoundations />
        <Typography />
        <Components />
        <TokensInCode />
        <Process />
        <Impact />
        <Learnings />
        <NextProject />
      </div>
    </div>
  );
}
