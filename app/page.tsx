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

const FishSchool = dynamic(
  () => import("@/components/background/FishSchool").then((m) => m.FishSchool),
  { ssr: false }
);

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
      // minHeight is inline so 100svh wins where it is supported and silently falls back to the
      // class's 100vh where it is not — on mobile Safari the two differ by the whole URL bar.
      style={{ minHeight: "100svh" }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-20 pb-24 overflow-hidden"
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
          <FishSchool
            baseColor={[0, 0, 0]}
            waterColor={[0.26, 0.36, 0.46]}
            fishColor={[0.66, 0.79, 0.88]}
            swimSpeed={0.045}
            colorNum={8}
            pixelSize={2}
            enableMouseInteraction={true}
            mouseRadius={0.22}
          />
        )}
        {/* Light: soften the grid's hard frame edge — blur ring, then fade to page background */}
        {isLight && (
          <>
            {/* The mask already keeps the center 35%-of-ellipse fully transparent — backdrop-filter
                still computes over that dead area first, since mask-image is applied after the filter
                pass. clip-path cuts that guaranteed-invisible center out of the element's paint bounds
                before the blur runs, so the browser has less backdrop to sample/blur — a genuine (if
                bounded, since the falloff itself spans most of the box) reduction in work, not just a
                different way of hiding it. The clip rectangle (34%-66%) is inset from the mask's true
                transparent ellipse (~22.75% half-extent) so it never eats into the visible gradient. */}
            <div
              className="absolute inset-0 pointer-events-none backdrop-blur-md [mask-image:radial-gradient(ellipse_65%_65%_at_center,transparent_35%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_65%_65%_at_center,transparent_35%,black_100%)]"
              style={{
                clipPath:
                  "polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 34% 34%, 34% 66%, 66% 66%, 66% 34%, 34% 34%, 0% 0%)",
                WebkitClipPath:
                  "polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 34% 34%, 34% 66%, 66% 66%, 66% 34%, 34% 34%, 0% 0%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 65% at center, transparent 40%, var(--background) 100%)",
              }}
            />
          </>
        )}
        {/* Dark: readability scrim. The school swims directly behind the headline, and on a phone
            the type sits over the busiest, brightest part of the frame — this keeps the copy the
            first thing read without flattening the scene out on wider screens. */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block sm:opacity-70"
          style={{
            background:
              "radial-gradient(105% 42% at 50% 44%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.34) 50%, rgba(0,0,0,0) 82%)",
          }}
        />
      </div>
      <div className="atmospheric-glow z-[1] hidden dark:block" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl pointer-events-none">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-6 sm:mb-8 px-3 sm:px-4 py-1.5 rounded-full border border-[#2A2438]/15 bg-[#FFE8A3]/70 dark:border-white/10 dark:bg-white/[0.08] backdrop-blur-lg flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#2554EB] dark:bg-violet-900 motion-safe:animate-pulse" />
          <span className="text-[14px] uppercase tracking-tight sm:tracking-[0.1em] font-bold text-[var(--foreground)] dark:text-[var(--muted)]">
            <span className="sm:hidden">Bangalore · Worldwide</span>
            <span className="hidden sm:inline">Based in Bangalore · Working Globally</span>
          </span>
        </div>

        {/* Headline */}
        <div ref={headingRef} className="mb-7 sm:mb-8">
          <h1 className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[8rem] font-semibold leading-[0.95] sm:leading-[0.9] tracking-tight sm:tracking-wide text-[var(--foreground)] dark:[text-shadow:0_2px_28px_rgba(0,0,0,0.6)]">
            I&apos;m Aditya,
            <br />
            <span className="italic font-light text-[var(--muted)] tracking-normal capitalize">
              {" "}
              <span className="text-[#2554EB] dark:text-inherit">Product designer</span> + Engineer
            </span>
          </h1>
        </div>

        {/* Actions */}
        <div ref={actionsRef} className="w-full max-w-[320px] sm:max-w-none flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pointer-events-auto">
          <Link
            href="/#work"
            className="group relative w-full sm:w-auto justify-center flex items-center gap-2 bg-[#2554EB] text-white dark:bg-[var(--foreground)] dark:text-[var(--background)] px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold uppercase text-[14px] tracking-wider hover:opacity-90 hover:-rotate-1 dark:hover:rotate-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2554EB] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
          >
            View My Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/oswaladitya/"
            className="w-full sm:w-auto justify-center flex items-center gap-2 bg-[#2A2438]/5 dark:bg-white/5 backdrop-blur-md border border-[var(--border)] text-[var(--foreground)] px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold uppercase text-[14px] tracking-wider hover:bg-[#2A2438]/10 dark:hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
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
        className="absolute bottom-6 sm:bottom-10 p-2 motion-safe:animate-bounce text-[var(--muted)] hover:text-[var(--foreground)] transition-colors z-20 pointer-events-auto"
      >
        <ArrowDown className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Frosted glass transition */}
      {/* Was two stacked backdrop-blur layers (2xl + md) over the same band — each a full
          backdrop-filter pass on the same 192px-tall area. Blurring an already-blurred backdrop
          compounds roughly in quadrature (sqrt(40^2+12^2) ≈ 41.8px vs 40px alone), so the second
          layer bought a ~4.5% larger effective radius concentrated near the bottom edge, where the
          solid-color gradient below already carries most of the visual transition. One blur pass
          instead of two halves the backdrop-filter cost for this band with no visible seam. */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-2xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_60%,black_100%)]" />
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