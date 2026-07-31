"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import { ArrowUpRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import VariableFontHoverByRandomLetter from "@/fancy/components/text/variable-font-hover-by-random-letter";
import BreathingText from "@/components/fancy/text/breathing-text";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";
import { WorkCard } from "@/components/WorkCard";
import { WarpBackground } from "@/components/ui/warp-background";

gsap.registerPlugin(ScrollTrigger);
import Collaborations from "@/components/Collaborations";

const Dither = dynamic(() => import("@/components/background/Dither"), {
  ssr: false,
});

// --- Sub-Components ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;
  const isLight = mounted && currentTheme === "light";

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 },
      });

      tl.from(badgeRef.current, { y: 20, opacity: 0 })
        .from(headingRef.current, { y: 40, opacity: 0 }, "-=0.6")
        .from(actionsRef.current, { y: 20, opacity: 0 }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {!mounted ? null : isLight ? (
          <WarpBackground
            className="h-full w-full rounded-none border-0 p-0 bg-[var(--background)]"
            gridColor="var(--border)"
            perspective={120}
            beamsPerSide={4}
            beamDuration={4}
          />
        ) : (
          <Dither
            baseColor={[0, 0, 0]}
            waveColor={[0.3, 0.4, 0.5]}
            hoverColor={[0, 0, 0]}
            waveSpeed={0.01}
            waveFrequency={3}
            waveAmplitude={0.6}
            colorNum={8}
            pixelSize={2}
            enableMouseInteraction={true}
            mouseRadius={0.4}
          />
        )}
      </div>
      <div className="atmospheric-glow z-[1] hidden dark:block" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl pointer-events-none">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-8 px-3 sm:px-4 py-1.5 rounded-full border border-[#2A2438]/15 bg-[#FFE8A3]/70 dark:border-white/10 dark:bg-white/[0.08] backdrop-blur-lg flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#2554EB] dark:bg-violet-900 motion-safe:animate-pulse" />
          <span className="text-[14px] uppercase tracking-tight sm:tracking-[0.1em] font-bold text-[var(--foreground)] dark:text-[var(--muted)]">
            <span className="sm:hidden">Bangalore · Worldwide</span>
            <span className="hidden sm:inline">Based in Bangalore · Working Globally</span>
          </span>
        </div>

        {/* Headline */}
        <div ref={headingRef} className="mb-8">
          <h1 className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[8rem] font-semibold leading-[0.9] tracking-wide text-[var(--foreground)]">
            I&apos;m Aditya,
            <br />
            <span className="italic font-light text-[var(--muted)] tracking-normal capitalize">
              {" "}
              <span className="text-[#2554EB] dark:text-inherit">Product designer</span> + Engineer
            </span>
          </h1>
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <Link
            href="/#work"
            className="group relative flex items-center gap-2 bg-[#2554EB] text-white dark:bg-[var(--foreground)] dark:text-[var(--background)] px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold uppercase text-[14px] tracking-wider hover:opacity-90 hover:-rotate-1 dark:hover:rotate-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2554EB] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
          >
            View My Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/oswaladitya/"
            className="flex items-center gap-2 bg-[#2A2438]/5 dark:bg-white/5 backdrop-blur-md border border-[var(--border)] text-[var(--foreground)] px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold uppercase text-[14px] tracking-wider hover:bg-[#2A2438]/10 dark:hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
          >
            Contact Me
          </Link>
        </div>

      </div>

      <button
        type="button"
        title="Scroll to projects"
        aria-label="Scroll to projects"
        onClick={() => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-10 motion-safe:animate-bounce text-[var(--muted)] hover:text-[var(--foreground)] transition-colors z-20 pointer-events-auto"
      >
        <ArrowDown className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Frosted glass transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_60%,black_100%)]" />
        <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent_30%,black_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF7]/30 dark:via-black/30 to-[var(--background)]" />
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      if (headingRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const words = headingRef.current.querySelectorAll<HTMLElement>(".word-reveal");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 1,
          },
        });
        words.forEach((word, i) => {
          tl.fromTo(word, { y: "110%" }, { y: "0%", ease: "power3.out", duration: 0.5 }, i * 0.2);
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="bento-grid-section px-6 py-16 md:py-32 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4 block">
              Selected Work
            </span>
            <h2
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] text-[var(--foreground)]"
            >
              {["Past", "&", "Current", "Projects"].map((word) => (
                <span key={word} className="overflow-hidden inline-block align-bottom mr-[0.22em] last:mr-0">
                  <span className="word-reveal inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-xs text-[var(--muted)] font-medium md:text-right">
            Some projects are work in progress, reach out to know more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              className={`project-card ${project.span}`}
              heightClassName="h-[380px] md:h-[500px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main Application ---

export default function Home() {

  return (
    <div className="font-sans antialiased text-[var(--foreground)] selection:bg-[#FF5C39] selection:text-[#2A2438] dark:selection:bg-indigo-500 dark:selection:text-white">
      <Hero />
      <Collaborations />
      <BentoGrid />
    </div>
  );
}