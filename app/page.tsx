"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import { ArrowUpRight, ArrowDown, Earth, Club, Component } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import VariableFontHoverByRandomLetter from "@/fancy/components/text/variable-font-hover-by-random-letter";
import BreathingText from "@/components/fancy/text/breathing-text";
import GradientBlinds from "@/components/GradientBlinds";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";
import Collaborations from "@/components/Collaborations";

const Dither = dynamic(() => import("@/components/background/Dither"), {
  ssr: false,
});

// --- Sub-Components ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;
  const isLight = mounted && currentTheme === "light";

  // Dither colors
  const baseColor: [number, number, number] = isLight ? [0.976, 0.973, 0.965] : [0, 0, 0]; // #f9f8f6 vs #000000
  const waveColor: [number, number, number] = isLight ? [0.45, 0.45, 0.45] : [0.3, 0.4, 0.5]; // darker gray for visibility
  const hoverColor: [number, number, number] = isLight ? [1, 1, 1] : [0, 0, 0]; // White in light, black in dark

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 },
      });

      tl.from(badgeRef.current, { y: 20, opacity: 0 })
        .from(headingRef.current, { y: 40, opacity: 0 }, "-=0.6")
        .from(descriptionRef.current, { y: 20, opacity: 0 }, "-=0.6")
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
        <Dither
          baseColor={baseColor}
          waveColor={waveColor}
          hoverColor={hoverColor}
          waveSpeed={0.01}
          waveFrequency={isLight ? 3 : 3}
          waveAmplitude={isLight ? 0.6 : 0.6}
          colorNum={8}
          pixelSize={2}
          enableMouseInteraction={true}
          mouseRadius={0.4}
        />
      </div>
      <div className="atmospheric-glow z-[1]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl pointer-events-none">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/8 backdrop-blur-lg flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-violet-900 animate-pulse" />
          <span className="text-[14px]  uppercase tracking-[0.1em] font-bold text-[var(--muted)]">
            Based in Bangalore | Pune
          </span>
        </div>

        {/* Headline */}
        <div ref={headingRef} className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-semibold leading-[0.9] tracking-wide text-[var(--foreground)]">
            I&apos;m Aditya,
            <br />
            <span className="italic font-light text-[var(--muted)] tracking-normal capitalize"> Product designer + Engineer</span>
          </h1>
        </div>

        {/* Description */}
        {/* <p
          ref={descriptionRef}
          className="text-lg md:text-xl text-[var(--foreground)] max-w-2xl mb-12 font-medium"
        >
          Based in Bangalore
        </p> */}
        {/* <p
          ref={descriptionRef}
          className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mb-12 font-medium"
        >
          Senior UI/UX Designer & Frontend Architect specialized in building high-end interfaces that define the future of the web.
        </p> */}
        {/* Actions */}
        <div ref={actionsRef} className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <Link
            href="/#work"
            className="group relative flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-8 py-4 rounded-2xl font-bold uppercase text-[14px] tracking-wider hover:opacity-90 transition-all"
          >
            View My Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/oswaladitya/"
            className="flex items-center gap-2 bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--border)] text-[var(--foreground)] px-8 py-4 rounded-2xl font-bold uppercase text-[14px] tracking-wider hover:bg-[var(--foreground)]/10 transition-all"
          >
            Contact Me
          </Link>
        </div>

        {/* Social Icons Overlay (optional hint from design)
        <div className="mt-12 flex items-center gap-6 text-[var(--muted)]">
          <Link href="/work" className="hover:text-white transition-colors"><Club className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Earth className="w-5 h-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><ArrowUpRight className="w-5 h-5" /></Link>
        </div> */}
      </div>

      <button
        onClick={() => {
          const bentoGrid = document.querySelector(".bento-grid-section");
          bentoGrid?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-10 animate-bounce text-[var(--muted)] hover:text-[var(--foreground)] transition-colors z-20 pointer-events-auto"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

const BentoGrid = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="bento-grid-section px-6 py-32 bg-[var(--background)] border-t border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4 block">
              Selected Work
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] text-[var(--foreground)]">
              Past & Current Projects
            </h2>
          </div>
          <p className="max-w-xs text-[var(--muted)] font-medium md:text-right">
            Some projects are work in progress, Reachout to know more!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => {
            const CardContent = (

              <div className="relative h-full w-full p-8 flex flex-col justify-end overflow-hidden group">
                {/* Background Color Base */}
                <div className={`absolute inset-0 z-0 bg-[var(--card)] transition-colors duration-700`} />

                {/* Hover Gradient Background - Increased z-index and removed blend mode for visibility */}
                <div className={`absolute inset-0 z-0 bg-gradient-to-br ${project.color} to-transparent opacity-[0.2] group-hover:opacity-100 transition-all duration-700 ease-out`} />
                {/* Secondary Glowing Effect on Hover */}
                <div className={`absolute -inset-[100%] z-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`} />

                {/* Static Overlay Gradient - Moved to z-10 so it's behind the hover gradient */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700" />

                <div className="relative z-30">
                  {/* Refined Pill Container */}
                  <div className="mb-4 w-fit px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-white">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black uppercase leading-none tracking-tighter text-white group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );

            return (
              <Link
                key={project.id}
                href={project.href || "#"}
                className={`project-card block relative h-[500px] overflow-hidden rounded-[1rem] border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[var(--foreground)]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${project.span}`}
              >
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  {CardContent}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const skills = [
    { name: "UI/UX Design", level: 95 },
    { name: "Frontend Architecture", level: 90 },
    { name: "System Engineering", level: 85 },
    { name: "Product Design", level: 88 },
  ];

  return (
    <section className="px-6 py-32 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="flex-1">
          <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4 block">
            My Expertise
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-[var(--foreground)] mb-12">
            I Build Solutions
            <br />
            That Scale
          </h2>

          <div className="space-y-10">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-indigo-400 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[var(--muted)] font-mono">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--foreground)]/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-indigo-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="relative p-10 bg-[var(--card)] rounded-[3rem] border border-[var(--border)] backdrop-blur-sm h-full">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Growth Matrix</h3>
                <p className="text-[var(--muted)] text-[14px]">Project delivery efficiency over time</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <ArrowUpRight className="w-6 h-6 rotate-45" />
              </div>
            </div>

            {/* Simple SVG Chart Representation */}
            <div className="h-64 flex items-end gap-2 mb-12">
              {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-indigo-900/40 to-indigo-500/40 rounded-t-lg"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-[var(--foreground)]/5 rounded-3xl border border-[var(--border)]">
                <span className="text-[var(--muted)] text-[14px] font-bold uppercase tracking-widest block mb-2">Completed</span>
                <span className="text-4xl font-black text-[var(--foreground)]">124+</span>
              </div>
              <div className="p-6 bg-[var(--foreground)]/5 rounded-3xl border border-[var(--border)]">
                <span className="text-[var(--muted)] text-[14px] font-bold uppercase tracking-widest block mb-2">Satisfaction</span>
                <span className="text-4xl font-black text-[var(--foreground)]">99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="px-6 py-32 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4 block">
          Get in touch
        </span>
        <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.9] tracking-tighter text-[var(--foreground)] mb-8">
          Start A Project
        </h2>
        <p className="text-xl text-[var(--muted)] font-medium mb-16">
          Got a great idea? Let&apos;s turn it into reality. Send me a message and I&apos;ll get back to you within 24 hours.
        </p>

        <form className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[14px] uppercase tracking-widest font-bold text-[var(--muted)] ml-4">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-[var(--foreground)]/5 border border-[var(--border)] rounded-[2rem] px-8 py-5 text-[var(--foreground)] focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[14px] uppercase tracking-widest font-bold text-[var(--muted)] ml-4">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-[var(--foreground)]/5 border border-[var(--border)] rounded-[2rem] px-8 py-5 text-[var(--foreground)] focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[14px] uppercase tracking-widest font-bold text-[var(--muted)] ml-4">Message</label>
            <textarea
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full bg-[var(--foreground)]/5 border border-[var(--border)] rounded-[2rem] px-8 py-6 text-[var(--foreground)] focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--foreground)] text-[var(--background)] font-black uppercase tracking-widest py-6 rounded-[2rem] hover:opacity-90 transition-all mt-8"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};


// --- Main Application ---

export default function Home() {

  return (
    <div className="font-sans antialiased text-[var(--foreground)] selection:bg-indigo-500 selection:text-white" >
      <main className="w-full">
        <Hero />
        <Collaborations />
        <BentoGrid />
        {/* <Expertise /> */}
        {/* <Contact /> */}
      </main>
    </div >
  );
}