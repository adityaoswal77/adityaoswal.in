'use client';

import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SPOTLIGHT_COLORS: Record<string, string> = {
  "from-amber-600":   "#d97706",
  "from-indigo-600":  "#4f46e5",
  "from-blue-600":    "#2563eb",
  "from-lime-600":    "#65a30d",
  "from-emerald-600": "#059669",
  "from-rose-600":    "#e11d48",
};

function WorkCard({ project }: { project: typeof PROJECTS[number] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const accentColor = SPOTLIGHT_COLORS[project.color] ?? "#ffffff";

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !spotlightRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background =
      `radial-gradient(500px circle at ${x}px ${y}px, ${accentColor}55, transparent 70%)`;
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  };

  const categories = Array.isArray(project.category) ? project.category : [project.category];

  return (
    <Link
      ref={cardRef}
      href={project.href || "#"}
      {...('external' in project && project.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block relative h-[400px] md:h-[550px] overflow-hidden rounded-[.5rem] border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[var(--foreground)]/20 hover:shadow-2xl group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full p-10 flex flex-col justify-end overflow-hidden">
        {/* Mouse-tracking spotlight */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ opacity: 0, transition: "opacity 0.4s ease" }}
        />

        {/* Subtle always-on base tint */}
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${project.color} to-transparent opacity-10`} />

        {/* Bottom overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-700" />

        <div className="relative z-[3]">
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div key={cat} className="w-fit px-3 py-1 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md flex items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                  {cat}
                </span>
              </div>
            ))}
          </div>

          {/* Description — hidden by default, slides up on hover */}
          <p className="text-sm text-white/60 font-medium mb-3 leading-relaxed max-w-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            {project.description}
          </p>

          <h3 className="text-4xl font-black uppercase leading-none tracking-tighter text-white group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </h3>
        </div>

        <div className="absolute top-10 right-10 z-[3] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-xl">
            <ArrowUpRight className="w-7 h-7" />
          </div>
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      <div className="atmospheric-glow opacity-50" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
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
                  className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${selectedCategory === category
                    ? "border-violet-500/50 bg-violet-500/10 text-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    : "border-[var(--border)] bg-transparent text-[var(--muted)] hover:border-[var(--foreground)]/20 hover:text-[var(--foreground)]"
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
