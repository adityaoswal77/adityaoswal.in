"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { isPhone, isVideo, type Project } from "./shared";

function MockupVideo({ src, className, label }: { src: string; className: string; label: string }) {
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

  return <video ref={ref} src={src} aria-label={label} className={className} preload="none" loop muted playsInline />;
}

export function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  const phone = isPhone(project);
  const label = `${project.title} interface preview`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] border border-[#2A2438]/10 bg-[var(--pastel)] dark:border-white/10 dark:bg-[var(--tint)]">
      {phone ? (
        <div className="absolute inset-x-[26%] top-[12%] bottom-0">
          <Image src={project.mockup} alt={label} fill sizes={sizes} className="object-cover object-top" />
        </div>
      ) : (
        <div className="absolute inset-[7%]">
          {isVideo(project) ? (
            <MockupVideo src={project.mockup} label={label} className="h-full w-full object-contain" />
          ) : (
            <Image src={project.mockup} alt={label} fill sizes={sizes} className="object-contain" />
          )}
        </div>
      )}
    </div>
  );
}
