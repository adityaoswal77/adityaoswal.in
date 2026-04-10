"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

// --- Gallery Data ---
// To add/remove items: edit this array.
// 'span' can be 1, 2, or 3 for column width in the masonry grid.
// 'tall' makes a card taller.

const GALLERY_ITEMS = [
  // Network School
  {
    id: 9,
    src: "/assets/network-school/IMG_8335.jpg",
    alt: "Network School sign through bushes",
    label: "Network School",
    tag: "Photography",
    tall: false,
    span: 2,
  },
  {
    id: 10,
    src: "/assets/network-school/IMG_8822.jpg",
    alt: "Grand venue lobby with chandelier",
    label: "Late night at Cafe",
    tag: "Photography",
    tall: true,
    span: 1,
  },
  {
    id: 11,
    src: "/assets/network-school/IMG_9120.jpg",
    alt: "Laptop open in a moody lounge with light-up trees",
    label: "Work @ Network School",
    tag: "Photography",
    tall: false,
    span: 2,
  },
  {
    id: 12,
    src: "/assets/network-school/IMG_9219.jpg",
    alt: "Welcome to the World of Design glass door",
    label: "Red Dot Design Museum Singapore",
    tag: "Photography",
    tall: true,
    span: 1,
  },
  {
    id: 13,
    src: "/assets/network-school/IMG_9399.jpg",
    alt: "Gardens by the Bay supertrees lit up at night",
    label: "Gardens by the Bay",
    tag: "Photography",
    tall: false,
    span: 2,
  },
  {
    id: 14,
    src: "/assets/network-school/IMG_9577.jpg",
    alt: "Grain bowl with chickpeas and avocado",
    label: "Lunch @ Network School",
    tag: "Photography",
    tall: true,
    span: 1,
  },
  {
    id: 15,
    src: "/assets/network-school/IMG_9724.jpg",
    alt: "Singapore CBD skyline reflected in the water at night",
    label: "Singapore Skyline",
    tag: "Photography",
    tall: false,
    span: 3,
  },
  {
    id: 16,
    src: "/assets/network-school/IMG_9765.jpg",
    alt: "Latte art with bold illustration mural in background",
    label: "Coffee @Apartment Singapore",
    tag: "Photography",
    tall: true,
    span: 1,
  },
  {
    id: 17,
    src: "/assets/network-school/IMG_9800.jpg",
    alt: "Latte in a grey ceramic mug",
    label: "Coffee @Kurasu Singapore",
    tag: "Photography",
    tall: true,
    span: 1,
  },
  {
    id: 18,
    src: "/assets/network-school/IMG_9987.jpeg",
    alt: "Forest City Marina Hotel with sea view and lush greenery",
    label: "Network School stay",
    tag: "Photography",
    tall: false,
    span: 2,
  },
  {
    id: 19,
    src: "/assets/network-school/7B8566F6-F28F-4695-A934-E2EAABA2CD65.jpg",
    alt: "Hot chocolate with Malaysia Semai menu card",
    label: "Apartment Coffee",
    tag: "Photography",
    tall: true,
    span: 1,
  },
  // Singapore — drop images into public/assets/singapore/
  {
    id: 20,
    src: "/assets/singapore/01.jpg",
    alt: "Singapore",
    label: "Singapore",
    tag: "Singapore",
    tall: false,
    span: 2,
  },
  {
    id: 21,
    src: "/assets/singapore/02.jpg",
    alt: "Singapore",
    label: "Singapore",
    tag: "Singapore",
    tall: true,
    span: 1,
  },
  {
    id: 22,
    src: "/assets/singapore/03.jpg",
    alt: "Singapore",
    label: "Singapore",
    tag: "Singapore",
    tall: false,
    span: 1,
  },
  {
    id: 23,
    src: "/assets/singapore/04.jpg",
    alt: "Singapore",
    label: "Singapore",
    tag: "Singapore",
    tall: false,
    span: 2,
  },
];

// --- Lightbox ---

function Lightbox({
  item,
  onClose,
}: {
  item: (typeof GALLERY_ITEMS)[0] | null;
  onClose: () => void;
}) {
  if (!item) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '80vh' }}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">{item.label}</p>
              <p className="text-white/40 text-sm font-mono uppercase tracking-widest">{item.tag}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Gallery Item Card ---

function GalleryCard({
  item,
  onClick,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  onClick: () => void;
}) {
  const spanClass =
    item.span === 2
      ? "md:col-span-2"
      : item.span === 3
        ? "md:col-span-3"
        : "col-span-1";

  const heightClass = item.tall ? "md:row-span-2" : "row-span-1";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${spanClass} ${heightClass} group cursor-pointer relative overflow-hidden rounded-lg bg-[var(--card)]`}
      onClick={onClick}
    >
      <div className="relative w-full h-full min-h-[240px]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400" />

        {/* Label — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 font-mono">
            {item.tag}
          </span>
          <p className="text-white font-bold text-lg leading-tight mt-1">{item.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Page ---

export default function PlaygroundPage() {
  const [lightboxItem, setLightboxItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filtered = GALLERY_ITEMS;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
            Playground
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-normal leading-[0.85] text-[var(--foreground)]">
              All
              <br />
              <span className="italic font-light text-[var(--primary)]">Works</span>
            </h1>
            <p className="mt-6 text-xl text-[var(--muted)] font-medium max-w-lg">
              A collection of design explorations — mockups, illustrations, motion, and experiments.
            </p>
          </div>


        </div>
      </div>

      {/* Side Projects */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">Side Projects</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              href: "/playground/freshfolios",
              title: "Freshfolios",
              desc: "A curated platform for designers to build and share work that gets noticed.",
              tag: "Web Design & Dev",
              accent: "group-hover:text-rose-400",
              dot: "bg-rose-400",
            },
            {
              href: "/playground/interestingplaces",
              title: "Interesting Places",
              desc: "A curated atlas of the world's most fascinating and overlooked locations.",
              tag: "Web Design & Dev",
              accent: "group-hover:text-emerald-400",
              dot: "bg-emerald-400",
            },
          ].map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="group flex items-start justify-between gap-6 p-8 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)]/20 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${project.dot}`} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--muted)]">
                    {project.tag}
                  </span>
                </div>
                <h3 className={`text-2xl font-black uppercase tracking-tight text-[var(--foreground)] transition-colors duration-300 ${project.accent}`}>
                  {project.title}
                </h3>
                <p className="text-[var(--muted)] font-medium leading-relaxed text-sm max-w-sm">
                  {project.desc}
                </p>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] group-hover:border-transparent transition-all duration-300 mt-1">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">Gallery</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setLightboxItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-[var(--muted)]">
            <p className="text-2xl font-bold uppercase tracking-tighter">Nothing here yet</p>
            <p className="text-sm mt-2 font-mono">Check back soon</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </div>
  );
}
