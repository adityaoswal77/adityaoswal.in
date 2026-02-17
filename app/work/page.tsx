'use client';

import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function WorkPage() {
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
          <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-normal leading-[0.85] text-[var(--foreground)]">
            Selected
            <br />
            <span className="italic font-light text-[var(--muted)]">Works</span>
          </h1>
          <p className="mt-12 text-xl text-[var(--muted)] font-medium max-w-lg">
            A deep dive into my process, from initial concepts to polished digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => {
            const CardContent = (
              <div className="relative h-full w-full p-10 flex flex-col justify-end overflow-hidden group">
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 z-0 bg-gradient-to-br ${project.color} to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out`} />

                {/* Commented out Background Image for future use */}
                {/* 
                <div className={`absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 ${project.color} opacity-40`} />
                */}

                {/* Overlay Gradient (static) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:opacity-50 transition-opacity duration-700" />

                <div className="relative z-20">
                  {/* Refined Pill Container */}
                  <div className="mb-4 w-fit px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-white">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-4xl font-black uppercase leading-none tracking-tighter text-white group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 duration-300 translate-y-2 group-hover:translate-y-0 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-xl">
                    <ArrowUpRight className="w-7 h-7" />
                  </div>
                </div>
              </div>
            );

            return (
              <Link
                key={project.id}
                href={project.href || "#"}
                className={`block relative h-[550px] overflow-hidden rounded-[.5rem] border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[var(--foreground)]/20 hover:shadow-2xl ${project.span}`}
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
