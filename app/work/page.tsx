'use client';

import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkCard } from '@/components/WorkCard';

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
