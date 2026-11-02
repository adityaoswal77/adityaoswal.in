"use client";

import { useEffect, useRef } from "react";
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

// `autoPlay` fetches and decodes the whole file during the landing-page load even though the card
// sits below the fold, and keeps decoding once scrolled past. Fetch and run it only while on screen.
function MockupVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.preload = "metadata";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} src={src} className={className} preload="none" loop muted playsInline />;
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
      className={`group block relative ${heightClassName} overflow-hidden rounded-[1.5rem] dark:rounded-[1rem] border border-[var(--border)] bg-[var(--card)] transition-all duration-700 hover:border-[#090F05]/15 dark:hover:border-white/15 hover:shadow-[0_20px_48px_-24px_rgba(9,15,5,0.22)] dark:hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#090F05] focus-visible:ring-offset-2 dark:focus-visible:ring-white ${className}`}
    >
      {/* Light: soft per-project pastel gradient, slowly adrift, a touch quicker on hover, faint accent inset border.
          The drift is a transform on an oversized child rather than an animated background-position, so it
          composites instead of repainting the full card every frame on every card at once. The clip is on the
          layer itself so the hover scale self-clips rather than bleeding past the parent's rounded corner —
          a Chromium transform+clip rendering quirk. */}
      <div className="absolute inset-0 dark:hidden overflow-hidden rounded-[1.5rem] group-hover:scale-[1.008] transition-transform duration-1000 ease-out motion-reduce:transition-none">
        <div
          className="absolute left-0 top-[-60%] h-[220%] w-[220%] animate-[gradient-drift_14s_ease-in-out_infinite] group-hover:[animation-duration:9s] motion-reduce:animate-none"
          style={{
            backgroundImage: `linear-gradient(120deg, color-mix(in srgb, ${project.pastel} 55%, #FFFFFF) 0%, color-mix(in srgb, ${project.pastel} 22%, #FFFFFF) 50%, color-mix(in srgb, ${project.pastel} 55%, #FFFFFF) 100%)`,
          }}
        />
      </div>
      <div
        className="absolute inset-0 dark:hidden rounded-[1.5rem] pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px #18280E14" }}
      />
      <div
        className="absolute inset-0 dark:hidden rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px #18280E33" }}
      />

      {/* Dark: black glass surface + faint accent glow — same motion language as the light gradient above,
          recolored for the black-base persona, same composited-drift structure. */}
      <div className="absolute inset-0 hidden dark:block bg-[var(--card)]" />
      <div className="absolute inset-0 hidden dark:block overflow-hidden rounded-[1rem] group-hover:scale-[1.008] transition-transform duration-1000 ease-out motion-reduce:transition-none">
        <div
          className="absolute left-0 top-[-60%] h-[220%] w-[220%] animate-[gradient-drift_14s_ease-in-out_infinite] group-hover:[animation-duration:9s] motion-reduce:animate-none"
          style={{
            backgroundImage: `linear-gradient(120deg, ${project.accent}26 0%, ${project.accent}0a 50%, ${project.accent}26 100%)`,
          }}
        />
      </div>
      <div
        className="absolute inset-0 hidden dark:block rounded-[1rem] pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}1f` }}
      />
      <div
        className="absolute inset-0 hidden dark:block rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}4d` }}
      />

      {/* Mockup screen — eases up slightly and sharpens on hover.
          Phone mockups get their own top offset per breakpoint (not one %, since the
          card itself is a different height on mobile vs desktop — h-[400px] md:h-[550px] —
          and the reserved text-block height above the fold doesn't scale with it). */}
      <div className={`absolute z-10 origin-bottom-right transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${hasMockupBg
        ? "inset-x-10 md:inset-x-14 top-[60%] bottom-0 group-hover:-translate-y-8 group-hover:scale-[1.02]"
        : isPhoneMockup
          ? "inset-x-10 top-[58%] md:top-[46%] -bottom-24 md:-bottom-32 group-hover:-translate-y-6 group-hover:scale-[1.02]"
          : "inset-x-6 md:inset-x-10 top-[62%] -bottom-[25rem] group-hover:-translate-y-10 group-hover:scale-[1.015]"
        }`}>
        <div
          className={`relative ml-auto h-full w-full ${hasMockupBg ? "max-w-[440px]" : isPhoneMockup ? "max-w-none" : "max-w-[520px]"} overflow-hidden ${mockupRadius} ${hasMockupBg
            ? "border border-[#090F05]/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-[0_-16px_48px_rgba(9,15,5,0.16)] dark:shadow-[0_-16px_48px_rgba(0,0,0,0.6)]"
            : ""
            }`}
        >
          <div className="absolute inset-0 blur-[2px] group-hover:blur-0 [@media(hover:none)]:blur-0 transition-[filter] duration-700 ease-out motion-reduce:transition-none">
            {project.mockup && isVideoMockup ? (
              <MockupVideo
                src={project.mockup}
                className={`h-full w-full ${isPhoneMockup ? "object-cover object-top" : "object-contain object-right-top"}`}
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-bold uppercase tracking-[0.15em] text-[#090F05]/60 dark:text-white/50">
          {categories.map((cat, i) => (
            <span key={cat} className="flex items-center gap-2">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-current opacity-60" aria-hidden="true" />}
              {cat}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[#090F05] dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 mb-0 text-sm font-medium leading-relaxed max-w-sm text-[#090F05]/70 dark:text-white/60 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 transition-all duration-700 ease-out motion-reduce:transition-none">
          {project.description}
        </p>
      </div>

      <div className="absolute top-8 right-8 z-20 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 transition-all duration-500 motion-reduce:transition-none">
        <div className="w-10 h-10 rounded-full border border-[#090F05]/10 bg-[#FFFFFF]/80 text-[#090F05] backdrop-blur-sm dark:border-white/15 dark:bg-white/10 dark:text-white flex items-center justify-center">
          <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
