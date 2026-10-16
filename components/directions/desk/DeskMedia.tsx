"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { isPhoneMockup, isVideoMockup, type DeskProject } from "./desk-utils";

function MockupVideo({ src, label, className }: { src: string; label: string; className: string }) {
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

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      className={className}
      preload="none"
      loop
      muted
      playsInline
      draggable={false}
    />
  );
}

export function DeskMedia({ project, sizes }: { project: DeskProject; sizes: string }) {
  const fit = isPhoneMockup(project) ? "object-cover object-top" : "object-contain object-center";
  const label = `${project.title} interface preview`;

  if (isVideoMockup(project)) {
    return <MockupVideo src={project.mockup} label={label} className={`absolute inset-0 h-full w-full ${fit}`} />;
  }

  return <Image src={project.mockup} alt={label} fill sizes={sizes} draggable={false} className={fit} />;
}
