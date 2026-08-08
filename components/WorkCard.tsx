"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";

const SKELETON_CHIPS = ["w-16", "w-24", "w-12", "w-20", "w-14", "w-24"];

export function SkeletonScreen({ accent, tint }: { accent: string; tint: string }) {
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

export function WorkCard({
  project,
  className = "",
  heightClassName = "h-[400px] md:h-[550px]",
}: {
  project: typeof PROJECTS[number];
  className?: string;
  heightClassName?: string;
}) {
  const categories = Array.isArray(project.category) ? project.category : [project.category];
  const isVideoMockup = /\.(mov|mp4|webm)$/i.test(project.mockup);
  const hasMockupBg = !('mockupBg' in project) || project.mockupBg !== false;
  const mockupRadius = 'mockupRadius' in project && project.mockupRadius ? project.mockupRadius : "rounded-t-[1.75rem]";
  const isPhoneMockup = 'mockupFit' in project && project.mockupFit === 'phone';

  return (
    <Link
      href={project.href || "#"}
      {...('external' in project && project.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group block relative ${heightClassName} overflow-hidden rounded-[1.5rem] dark:rounded-[1rem] border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[#2A2438]/30 dark:hover:border-white/30 hover:shadow-[0_24px_60px_rgba(42,36,56,0.18)] dark:hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A2438] focus-visible:ring-offset-2 dark:focus-visible:ring-white ${className}`}
    >
      {/* Light: vibrant per-project gradient, always adrift + surges faster on hover, accent-tinted inset border.
          Rounded on itself (matching the card radius) so the hover scale-transform self-clips instead of
          bleeding past the parent's overflow-hidden corner — a Chromium transform+clip rendering quirk. */}
      <div
        className="absolute inset-0 dark:hidden rounded-[1.5rem] dark:rounded-[1rem] [background-size:220%_220%] animate-[background-gradient_9s_ease-in-out_infinite] group-hover:[animation-duration:2.2s] group-hover:scale-[1.015] transition-transform duration-700 ease-out motion-reduce:animate-none motion-reduce:transition-none"
        style={{
          backgroundImage: `linear-gradient(120deg, ${project.pastelHover} 0%, color-mix(in srgb, ${project.pastel} 65%, #FDFBF7) 50%, ${project.pastelHover} 100%)`,
          boxShadow: `inset 0 0 0 1px ${project.accent}33`,
        }}
      />
      <div
        className="absolute inset-0 dark:hidden rounded-[1.5rem] dark:rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${project.accent}66` }}
      />

      {/* Dark: black glass surface + vibrant accent glow, always adrift + surges faster on hover — same motion
          language as the light gradient above, recolored for the black-base persona. Rounded on itself for the
          same self-clip reason as the light layer. */}
      <div className="absolute inset-0 hidden dark:block bg-[var(--card)]" />
      <div
        className="absolute inset-0 hidden dark:block rounded-[1rem] [background-size:220%_220%] animate-[background-gradient_9s_ease-in-out_infinite] group-hover:[animation-duration:2.2s] group-hover:scale-[1.015] transition-transform duration-700 ease-out motion-reduce:animate-none motion-reduce:transition-none"
        style={{
          backgroundImage: `linear-gradient(120deg, ${project.accent}4d 0%, ${project.accent}14 50%, ${project.accent}4d 100%)`,
          boxShadow: `inset 0 0 0 1px ${project.accent}4d`,
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${project.accent}99` }}
      />

      {/* Mockup screen — slides up with a spring pop and sharpens on hover.
          Phone mockups get their own top offset per breakpoint (not one %, since the
          card itself is a different height on mobile vs desktop — h-[400px] md:h-[550px] —
          and the reserved text-block height above the fold doesn't scale with it). */}
      <div className={`absolute z-10 origin-bottom-right transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${hasMockupBg
        ? "inset-x-10 md:inset-x-14 top-[60%] bottom-0 group-hover:-translate-y-12 group-hover:scale-[1.04]"
        : isPhoneMockup
          ? "inset-x-10 top-[58%] md:top-[46%] -bottom-24 md:-bottom-32 group-hover:-translate-y-8 group-hover:scale-[1.03]"
          : "inset-x-6 md:inset-x-10 top-[62%] -bottom-[25rem] group-hover:-translate-y-16 group-hover:scale-[1.03]"
        }`}>
        <div
          className={`relative ml-auto h-full w-full ${hasMockupBg ? "max-w-[440px]" : isPhoneMockup ? "max-w-none" : "max-w-[520px]"} overflow-hidden ${mockupRadius} ${hasMockupBg
            ? "border border-[#2A2438]/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-[0_-16px_48px_rgba(42,36,56,0.16)] dark:shadow-[0_-16px_48px_rgba(0,0,0,0.6)]"
            : ""
            }`}
        >
          <div className="absolute inset-0 blur-[2px] group-hover:blur-0 transition-[filter] duration-500 ease-out motion-reduce:transition-none">
            {project.mockup && isVideoMockup ? (
              <video
                src={project.mockup}
                className={`h-full w-full ${isPhoneMockup ? "object-cover object-top" : "object-contain object-right-top"}`}
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
                className={hasMockupBg || isPhoneMockup ? "object-cover object-top" : "object-contain object-right-top"}
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
