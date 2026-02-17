"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

/* ----------------------------------------
   Types & Components
---------------------------------------- */

interface MilestoneProps {
  year: string;
  title: string;
  description: string;
  image?: string;
  isBottom?: boolean;
}

function MilestoneCard({ year, title, description, image, isBottom = false }: MilestoneProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: isBottom ? 50 : -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center group ${isBottom ? 'pt-12' : 'pb-12'}`}
    >
      {/* Node Dot */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${isBottom ? 'top-0' : 'bottom-0'} w-4 h-4 rounded-full z-10 transition-transform duration-300 group-hover:scale-150`}
        style={{ backgroundColor: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }}
      />

      {/* Connecting Stem */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 ${isBottom ? 'top-4' : 'bottom-4'} w-[2px] h-8 bg-gradient-to-b from-[var(--primary)] to-transparent opacity-30`}
      />

      {/* Content Stack */}
      <div className={`flex flex-col items-center gap-4 ${isBottom ? 'flex-col' : 'flex-col-reverse'}`}>
        {/* Text Content */}
        <div className="relative w-56 md:w-72 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] backdrop-blur-md transition-all duration-500 group-hover:border-[var(--primary)]/50 whitespace-normal text-center z-10">
          <span
            className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 block"
            style={{ color: 'var(--primary)' }}
          >
            {year}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* Cinematic Image Reveal (Above or Below) */}
        <div className="relative w-56 md:w-72 overflow-hidden rounded-2xl">
          <AnimatePresence>
            {isHovered && image && (
              <motion.div
                initial={{ height: 0, opacity: 0, scale: 1.1 }}
                animate={{ height: 180, opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-0 border border-white/10"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------------------
   Data
---------------------------------------- */

const MILESTONES: MilestoneProps[] = [
  {
    year: "2018",
    title: "The Initial Spark",
    description: "Started my journey into the world of design and engineering, curious about how things feel and function.",
    image: "/assets/odyssey-2019.png",
    isBottom: false,
  },
  {
    year: "2020",
    title: "The Great Pivot",
    description: "Navigated the challenges of a remote world, shifting focus towards digital-first healthcare solutions.",
    image: "/assets/odyssey-2021.png",
    isBottom: true,
  },
  {
    year: "2020 B",
    title: "Creative Coding",
    description: "Began experimenting with generative art and creative computation to bridge the gap between art and logic.",
    image: "/assets/odyssey-2022.png",
    isBottom: false,
  },
  {
    year: "2021",
    title: "Project Foundation",
    description: "Deepened my focus on human-centered design, building several early-stage health-tech prototypes.",
    image: "/assets/odyssey-2021.png",
    isBottom: true,
  },
  {
    year: "2021 B",
    title: "First Studio Win",
    description: "Landed my first major freelance collaboration, designing a wellness app that hit 10k users.",
    image: "/assets/odyssey-2022.png",
    isBottom: false,
  },
  {
    year: "2022",
    title: "Studio Immersion",
    description: "Joined Wolffkraft Design Studio as a UX Intern. Learned the ropes of professional product development.",
    image: "/assets/odyssey-2022.png",
    isBottom: true,
  },
  {
    year: "2022 B",
    title: "Design Systems",
    description: "Lead the creation of a unified design system for a portfolio of health apps.",
    image: "/assets/odyssey-2023.png",
    isBottom: false,
  },
  {
    year: "2023",
    title: "Healthcare Odyssey",
    description: "Joined Alivecor as a Product Designer. Engineering clarity into chaotic heart health monitoring.",
    image: "/assets/odyssey-2023.png",
    isBottom: true,
  },
  {
    year: "2023 B",
    title: "Visualizing Life",
    description: "Created real-time ECG visualizations that simplified complex medical data for thousands of users.",
    image: "/assets/odyssey-2024.png",
    isBottom: false,
  },
  {
    year: "2024",
    title: "AI & Innovation",
    description: "Exploring the intersection of generative AI and intuitive user journey mapping.",
    image: "/assets/odyssey-2024.png",
    isBottom: true,
  },
  {
    year: "2024 B",
    title: "Future of Web",
    description: "Experimenting with spatial UI and immersive 3D web experiences that push browser boundaries.",
    image: "/assets/odyssey-2024.png",
    isBottom: false,
  },
  {
    year: "Soon",
    title: "Work Together?",
    description: "Keeping eyes & mind open, the Design landscape keeps on changing every week ",
    image: "/assets/odyssey-2024.png",
    isBottom: true,
  },
];

/* ----------------------------------------
   Main Page
---------------------------------------- */

export default function CareerOdysseyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -contentWidth + (typeof window !== 'undefined' ? window.innerWidth : 0) * 0.8]);

  const pathProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      ref={containerRef}
      className="relative h-[1500vh] bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white font-sans overflow-x-clip transition-colors duration-300"
    >
      <style jsx global>{`
        .w-max {
          width: max-content;
        }
      `}</style>

      <div className="atmospheric-glow opacity-50" />

      {/* Narrative Content */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Background Atmosphere */}
        <motion.div
          style={{ x: bgX }}
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]" />
          <motion.div
            style={{ rotate: orbitRotate }}
            className="absolute -top-[50%] -left-[25%] w-[150%] h-[200%] border-[1px] border-white/5 rounded-full"
          />
        </motion.div>

        <div className="relative z-10 w-full h-full flex items-center">
          <motion.div
            ref={contentRef}
            style={{ x: xTranslate }}
            className="flex items-center gap-[200px] md:gap-[400px] px-[10vw] md:px-[20vw] w-max"
          >
            {/* Intro Section */}
            <div className="flex flex-col gap-4 w-[85vw] md:w-[45vw] flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-4 py-1.5 w-fit rounded-full border border-[var(--border)] bg-[var(--foreground)]/5 backdrop-blur-sm flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                  The Journey
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl md:text-[10rem] font-black tracking-normal leading-[0.85] uppercase text-[var(--foreground)]"
              >
                Career
                <br />
                <span className="italic tracking-tighter font-light text-[var(--muted)]">Odyssey</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-[var(--muted)] max-w-lg font-medium whitespace-normal mt-12"
              >
                A visual walkthrough of my path, milestones, and the evolving craft of building digital experiences.
              </motion.p>
            </div>

            {/* Milestones Container */}
            <div className="relative flex items-center h-[600px] flex-shrink-0">
              {/* The Path Line */}
              <svg
                className="absolute left-[-300px] top-1/2 -translate-y-1/2 w-[11000px] h-[400px] z-0 overflow-visible"
                viewBox="0 0 10000 400"
                fill="none"
              >
                <motion.path
                  d="M 0 200 Q 250 100 500 200 T 1000 200 T 1500 200 T 2000 200 T 2500 200 T 3000 200 T 3500 200 T 4000 200 T 4500 200 T 5000 200 T 5500 200 T 6000 200 T 6500 200 T 7000 200 T 7500 200 T 8000 200 T 8500 200 T 9000 200 T 9500 200 T 10000 200 T 10500 200 T 11000 -300"
                  stroke="var(--border)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <motion.path
                  style={{ pathLength: pathProgress }}
                  d="M 0 200 Q 250 100 500 200 T 1000 200 T 1500 200 T 2000 200 T 2500 200 T 3000 200 T 3500 200 T 4000 200 T 4500 200 T 5000 200 T 5500 200 T 6000 200 T 6500 200 T 7000 200 T 7500 200 T 8000 200 T 8500 200 T 9000 200 T 9500 200 T 10000 200 T 10500 200 T 11000 -300"
                  stroke="currentColor"
                  className="text-[var(--primary)] text-primary drop-shadow-[0_0_20px_var(--primary)]"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              {/* Milestones */}
              <div className="relative flex items-center gap-[300px] md:gap-[600px] px-[100px] md:px-[300px]">
                {MILESTONES.map((milestone, index) => (
                  <div key={index} className="flex-shrink-0">
                    <MilestoneCard
                      {...milestone}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Outro Section */}
            <div className="flex flex-col gap-6 w-[80vw] md:w-[45vw] flex-shrink-0">
              <h3 className="text-5xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase text-[var(--foreground)]">
                Story
                <br />
                <span className="italic font-light text-[var(--muted)]">Continues</span>
              </h3>
              <Link
                href="/work"
                className="group flex items-center gap-6 font-bold uppercase tracking-[0.3em] text-sm md:text-xl mt-16 text-[var(--foreground)]"
              >
                <span>Explore My Work</span>
                <div className="w-12 md:w-24 h-px bg-indigo-500 group-hover:w-40 transition-all duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Navigation Help */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-12 w-[1px] bg-indigo-500"
        />
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 text-indigo-500">
          Scroll to view my journey
        </span>
      </div>
    </div>
  );
}
