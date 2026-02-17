"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import VariableFontHoverByRandomLetter from '@/fancy/components/text/variable-font-hover-by-random-letter';
import CircularText from '@/components/CircularText';

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
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.from(titleRef.current, { y: 100, skewY: 5, opacity: 0 }, "-=0.6")
        .from(descriptionRef.current, { y: 30, opacity: 0 }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Playground hero section"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 pt-32 pb-12 overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
    >
      <div className="atmospheric-glow opacity-50" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Lab & Experiments
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase text-[var(--foreground)]"
          >
            Play
            <br />
            <span className="italic font-light text-[var(--muted)] text-[0.85em]">ground</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-2xl"
          >
            My space for design experiments, interactive prototypes, and testing out technical edge of my creative process.
          </p>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-20 -right-1 pointer-events-none opacity-[0.04] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Lab
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

const VariableFontExperiment = () => {
  return (
    <Section title="Dynamic Type">
      <div className="grid lg:grid-cols-[1fr,1.5fr] gap-20 items-center">
        <div className="space-y-8">
          <p className="text-xl text-[var(--muted)] leading-relaxed font-medium">
            An experiment in fluid typography. Using variable font weights and interactive delays to create a text component that feels alive and responsive to user presence.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">React Bits</span>
            <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">GSAP</span>
            <span className="px-4 py-1.5 rounded-full border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">Variable Fonts</span>
          </div>
        </div>

        <div className="bg-[var(--card)] p-12 md:p-24 rounded-[3rem] border border-[var(--border)] backdrop-blur-sm min-h-[400px] flex items-center justify-center group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="text-center relative z-10">
            <VariableFontHoverByRandomLetter
              label="MORPH"
              fromFontVariationSettings="'wght' 300, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase tracking-tighter text-[var(--foreground)] cursor-pointer select-none"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const InteractiveGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gridItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    title: `Experiment ${i + 1}`,
    description: "Coming soon",
  }));

  return (
    <Section title="Experiments Grid">
      <div className="space-y-8 md:space-y-12">
        <p className="text-base md:text-lg leading-relaxed text-[var(--muted)] max-w-4xl">
          A grid of experimental components and design explorations. More experiments coming soon.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-[var(--card)] border border-[var(--border)] p-4 md:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[var(--foreground)]/20 hover:shadow-lg group"
              onMouseEnter={() => setHoveredIndex(item.id)}
              onMouseLeave={() => setHoveredIndex(null)}
              role="button"
              tabIndex={0}
              aria-label={`${item.title} - ${item.description}`}
            >
              <div className="text-3xl md:text-4xl font-black text-[var(--foreground)]/10 group-hover:text-[var(--foreground)]/20 transition-colors">
                {String(item.id + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold uppercase tracking-tighter text-[var(--foreground)] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--muted)] font-mono">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const ColorPalette = () => {
  const colors = [
    { name: "Primary", value: "var(--primary)", hex: "#1A1A1A" },
    { name: "Background", value: "#F9F8F6", hex: "#F9F8F6" },
    { name: "White", value: "#FFFFFF", hex: "#FFFFFF" },
    { name: "Text", value: "#1A1A1A", hex: "#1A1A1A" },
    { name: "Text Muted", value: "#1A1A1A/60", hex: "#1A1A1A" },
  ];

  return (
    <Section title="Color Palette">
      <div className="space-y-8 md:space-y-12">
        <p className="text-base md:text-lg leading-relaxed text-[var(--muted)] max-w-4xl">
          The color system used across the portfolio. Each color is carefully chosen to maintain consistency and accessibility.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {colors.map((color) => (
            <div
              key={color.name}
              className="bg-[var(--card)] border border-[var(--border)] p-6 md:p-8"
            >
              <div
                className="w-full h-24 md:h-32 mb-4 border border-[var(--border)]"
                style={{ backgroundColor: color.value }}
                aria-label={`${color.name} color sample`}
              />
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter mb-2 text-[var(--foreground)]">
                {color.name}
              </h3>
              <p className="text-sm md:text-base text-[var(--muted)] font-mono">
                {color.hex}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const TypographyShowcase = () => {
  return (
    <Section title="Typography">
      <div className="space-y-12 md:space-y-16">
        <div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 text-[var(--foreground)]">
            Heading Styles
          </h3>
          <div className="space-y-6 md:space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[var(--foreground)] mb-2">
                Heading 1
              </h1>
              <p className="text-sm md:text-base text-[var(--muted)] font-mono">
                font-black • uppercase • tracking-tighter
              </p>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[var(--foreground)] mb-2">
                Heading 2
              </h2>
              <p className="text-sm md:text-base text-[var(--muted)] font-mono">
                font-black • uppercase • tracking-tighter
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter text-[var(--foreground)] mb-2">
                Heading 3
              </h3>
              <p className="text-sm md:text-base text-[var(--muted)] font-mono">
                font-bold • uppercase • tracking-tighter
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 text-[var(--foreground)]">
            Body Text
          </h3>
          <div className="space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-[var(--foreground)] opacity-80">
              This is body text with regular weight. It&apos;s designed for readability and comfortable reading across all devices. The line height is relaxed to ensure proper spacing between lines.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-[var(--muted)] font-mono">
              This is monospace text, typically used for code, metadata, or technical information.
            </p>
          </div>
        </div>
      </div>
    </Section>
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
        setReady(true); // Continue even if GSAP fails
      }
    };
    load();
  }, []);
  return ready;
};

// --- Main Component ---

export default function PlaygroundPage() {
  const isGsapReady = useGsapLoader();

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <main id="main-content" className="w-full relative" role="main">
        <Hero />
        <VariableFontExperiment />
      </main>
    </div>
  );
}

