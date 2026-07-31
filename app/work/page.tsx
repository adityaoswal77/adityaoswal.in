'use client';

import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SKELETON_CHIPS = ["w-16", "w-24", "w-12", "w-20", "w-14", "w-24"];

function SkeletonScreen({ accent, tint }: { accent: string; tint: string }) {
  return (
    <div aria-hidden="true" className="h-full w-full bg-white dark:bg-zinc-900 px-6 pt-5 flex flex-col gap-4">
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <div className="h-2 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-2 w-3 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
      {/* Progress */}
      <div className="h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      {/* Heading lines */}
      <div className="mt-2 space-y-2.5">
        <div className="h-4 w-4/5 rounded-md opacity-80" style={{ backgroundColor: accent }} />
        <div className="h-4 w-3/5 rounded-md opacity-80" style={{ backgroundColor: accent }} />
      </div>
      {/* Chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {SKELETON_CHIPS.map((w, i) => (
          <div
            key={i}
            className={`h-9 ${w} rounded-xl`}
            style={{ backgroundColor: i % 3 === 0 ? accent : tint }}
          />
        ))}
      </div>
      {/* CTA */}
      <div className="mt-auto mb-0 h-11 w-full rounded-xl" style={{ backgroundColor: accent }} />
    </div>
  );
}

function WorkCard({ project }: { project: typeof PROJECTS[number] }) {
  const categories = Array.isArray(project.category) ? project.category : [project.category];
  const isVideoMockup = /\.(mov|mp4|webm)$/i.test(project.mockup);

  return (
    <Link
      href={project.href || "#"}
      {...('external' in project && project.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block relative h-[400px] md:h-[550px] overflow-hidden rounded-[1.5rem] dark:rounded-[1rem] border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[#2A2438]/30 dark:hover:border-white/30 hover:shadow-[0_24px_60px_rgba(42,36,56,0.18)] dark:hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 dark:focus-visible:ring-white"
    >
      {/* Light: flat pastel base + deeper pastel on hover */}
      <div className="absolute inset-0 dark:hidden" style={{ backgroundColor: project.pastel }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out dark:hidden" style={{ backgroundColor: project.pastelHover }} />

      {/* Dark: surface + subtle accent tint */}
      <div className="absolute inset-0 hidden dark:block bg-[var(--card)]" />
      <div className={`absolute inset-0 hidden dark:block bg-gradient-to-br ${project.color} to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />

      {/* Mockup screen — rises and sharpens on hover */}
      <div className="absolute inset-x-10 md:inset-x-14 top-[44%] bottom-0 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-4 motion-reduce:transition-none">
        <div className="relative mx-auto h-full w-full max-w-[440px] overflow-hidden rounded-t-[1.75rem] border border-[#2A2438]/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-[0_-16px_48px_rgba(42,36,56,0.16)] dark:shadow-[0_-16px_48px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 blur-[3px] group-hover:blur-0 transition-[filter] duration-500 ease-out motion-reduce:transition-none">
            {project.mockup && isVideoMockup ? (
              <video
                src={project.mockup}
                className="h-full w-full object-cover object-top"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : project.mockup ? (
              <Image
                src={project.mockup}
                alt={`${project.title} interface preview`}
                fill
                sizes="(max-width: 768px) 80vw, 440px"
                className="object-cover object-top"
              />
            ) : (
              <SkeletonScreen accent={project.accent} tint={project.pastel} />
            )}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="relative z-20 p-8 md:p-10 pr-24">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-bold uppercase tracking-[0.15em] text-[#2A2438]/60 dark:text-white/50">
          {categories.map((cat, i) => (
            <span key={cat} className="flex items-center gap-2">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden="true" />}
              {cat}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[#2A2438] dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 mb-0 text-sm font-medium leading-relaxed max-w-sm text-[#2A2438]/70 dark:text-white/60 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out motion-reduce:transition-none">
          {project.description}
        </p>
      </div>

      <div className="absolute top-8 right-8 z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 motion-reduce:transition-none">
        <div className="w-12 h-12 rounded-full bg-[#2A2438] text-[#FDFBF7] dark:bg-white dark:text-black flex items-center justify-center shadow-lg">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!headingRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = headingRef.current.querySelectorAll<HTMLElement>(".word-reveal");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
    });
    words.forEach((word, i) => {
      tl.fromTo(word, { y: "110%" }, { y: "0%", ease: "power3.out", duration: 0.5 }, i * 0.25);
    });
    return () => { tl.kill(); };
  }, []);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(PROJECTS.flatMap(p => Array.isArray(p.category) ? p.category : [p.category])))];
  }, []);

  const filteredProjects = useMemo(() => {
    return selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter(p => (Array.isArray(p.category) ? p.category : [p.category]).includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#FF5C39] selection:text-[#2A2438] dark:selection:bg-indigo-500 dark:selection:text-white transition-colors duration-300">
      <div className="atmospheric-glow opacity-50" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C39] dark:bg-violet-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Portfolio
            </span>
          </div>
          <h1
            ref={headingRef}
            className="text-[2.5rem] sm:text-6xl md:text-[8rem] font-black uppercase tracking-normal leading-[0.85] text-[var(--foreground)]"
          >
            <span className="overflow-hidden inline-block align-bottom mr-[0.2em]">
              <span className="word-reveal inline-block">Selected</span>
            </span>
            <br />
            <span className="overflow-hidden inline-block align-bottom italic font-light text-[var(--muted)]">
              <span className="word-reveal inline-block">projects</span>
            </span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-12">
            <p className="text-xl text-[var(--muted)] font-medium max-w-lg">
              A deep dive into my process, from initial concepts to polished digital products.
            </p>

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] dark:focus-visible:ring-white ${selectedCategory === category
                    ? "border-[#2A2438] bg-[#2A2438] text-[#FDFBF7] -rotate-1 dark:rotate-0 dark:border-violet-500/50 dark:bg-violet-500/10 dark:text-violet-500 dark:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    : "border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[#2A2438]/30 dark:hover:border-white/20 hover:text-[var(--foreground)]"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`${project.span}`}
              >
                <WorkCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
