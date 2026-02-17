"use client";

import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const CaseStudyPlaceholder = () => {
    return (
        <section className="px-6 py-32 bg-[var(--background)] border-t border-[var(--border)] min-h-[60vh] flex items-center justify-center overflow-hidden relative">
            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none whitespace-nowrap">
                <span className="text-[15rem] md:text-[25rem] font-black leading-none tracking-tight italic uppercase">
                    Refinement
                </span>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Case Study In Progress</span>
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-normal leading-[0.9] text-[var(--foreground)] mb-12">
                    REFINING THE STORY
                </h2>

                <p className="text-lg md:text-xl font-medium leading-relaxed text-[var(--muted)] mb-16 max-w-2xl mx-auto">
                    I&apos;m currently refining this story to share the full design process, research, and impact. I care about the details, so it takes a little time to get them right.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href="mailto:contact@adityaoswal.in"
                        className="group relative flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Talk to me</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <Link
                        href="/work"
                        className="text-sm font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                        Back to all work
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CaseStudyPlaceholder;
