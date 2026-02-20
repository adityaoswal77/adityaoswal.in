"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// --- Gallery Data ---
// To add/remove items: edit this array.
// 'span' can be 1, 2, or 3 for column width in the masonry grid.
// 'tall' makes a card taller.

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/assets/img1.jpg",
    alt: "EKG Guest User Flow",
    label: "Guest EKG Flow",
    tag: "Mobile Design",
    tall: true,
    span: 2,
  },
  {
    id: 2,
    src: "/assets/img2.jpg",
    alt: "Year In Review",
    label: "Year In Review",
    tag: "Growth Design",
    tall: false,
    span: 1,
  },
  {
    id: 3,
    src: "/assets/img3.jpg",
    alt: "Kardia Design System",
    label: "Design System Tokens",
    tag: "Design System",
    tall: false,
    span: 1,
  },
  {
    id: 4,
    src: "/assets/img4.jpg",
    alt: "Website Redesign",
    label: "Website Redesign",
    tag: "Web Design",
    tall: true,
    span: 2,
  },
  {
    id: 5,
    src: "/assets/img1.jpg",
    alt: "Exploration",
    label: "Motion Exploration",
    tag: "Motion",
    tall: false,
    span: 1,
  },
  {
    id: 6,
    src: "/assets/img2.jpg",
    alt: "Illustration",
    label: "Brand Illustration",
    tag: "Illustration",
    tall: true,
    span: 1,
  },
  {
    id: 7,
    src: "/assets/img3.jpg",
    alt: "Prototype",
    label: "Interactive Prototype",
    tag: "Mobile Design",
    tall: false,
    span: 2,
  },
  {
    id: 8,
    src: "/assets/img4.jpg",
    alt: "3D Render",
    label: "3D Exploration",
    tag: "3D",
    tall: false,
    span: 1,
  },
];

const ALL_TAGS = ["All", ...Array.from(new Set(GALLERY_ITEMS.map((i) => i.tag)))];

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
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full overflow-hidden rounded-2xl">
            <Image
              src={item.src}
              alt={item.alt}
              width={1400}
              height={900}
              className="w-full h-auto object-contain"
              priority
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
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filtered =
    activeTag === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.tag === activeTag);

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

      {/* Masonry Gallery */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
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
