"use client";

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Palette, TestTube2, Cpu, PenTool, Wind, Code2, Zap, Triangle, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import VariableFontHoverByRandomLetter from "@/fancy/components/text/variable-font-hover-by-random-letter";
import Gravity, { MatterBody } from "@/components/fancy/physics/gravity";
import GlassIcons from '@/components/GlassIcons';
import Collaborations from '@/components/Collaborations';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.from(metaRef.current, { y: 30, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 100, skewY: 5, opacity: 0 }, "-=0.6")
        .from(descriptionRef.current, { y: 30, opacity: 0 }, "-=0.8")
        .from(imageRef.current, { scale: 0.9, opacity: 0 }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="About hero section"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 pt-32 pb-12 overflow-visible bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
    >
      <div className="atmospheric-glow opacity-50" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="grid lg:grid-cols-[1fr,auto] gap-20 items-center">

          <div className="space-y-12">
            <div ref={metaRef} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                About Me
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-wide  text-[var(--foreground)]"
            >
              Aditya Oswal
            </h1>


            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-12 border-t border-[var(--border)]">
              <div ref={descriptionRef}>
                <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Current Role</dt>
                <dd className="text-xl font-bold text-[var(--foreground)]">Designer @ Alivecor</dd>
              </div>
              <div>
                <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Location</dt>
                <dd className="text-xl font-bold text-[var(--foreground)]">Bangalore, IN</dd>
              </div>
              <div>
                <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Philosophy</dt>
                <dd className="text-xl font-bold text-[var(--foreground)]">Experimentation</dd>
              </div>
            </dl>
          </div>


          <div
            ref={imageRef}
            className="relative w-full lg:w-[400px] xl:w-[500px] aspect-square flex justify-center items-center"
          >
            {/* Profile Image */}
            <div className="relative w-full h-full rounded-[.5rem] overflow-hidden border border-white/10 group grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="/assets/aditya.jpg"
                alt="Aditya Oswal"
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Section = ({ title, children, className = "", rightHeader }: { title?: string; children: React.ReactNode; className?: string; rightHeader?: React.ReactNode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      const elementsToAnimate = [contentRef.current].filter(Boolean);
      if (titleRef.current) {
        elementsToAnimate.unshift(titleRef.current);
      }

      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      className={`px-6 py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2
              id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
              ref={titleRef}
              className="text-5xl md:text-7xl font-black uppercase tracking-[0.01em] text-[var(--foreground)] leading-[0.9]"
            >
              {title}
            </h2>
            {rightHeader && (
              <div className="flex items-center">
                {rightHeader}
              </div>
            )}
          </div>
        )}
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
};

const AboutOverview = () => {
  return (
    <Section title="">
      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-20">
        <div className="space-y-8">
          <p className="text-2xl md:text-3xl font-medium leading-[1.3] text-[var(--foreground)] opacity-80">
            My background in engineering and design has shaped my approach to problem-solving. I believe in creating solutions that are both functional and beautiful.
          </p>
          <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
            If not working, you will find me exploring the cafe culture in Bangalore, planning my next workout split, the next trip or geeking out over the latest AI developments.
          </p>
        </div>

        <div className="space-y-12 pt-2">
          <div>
            <p className="text-[13px] uppercase tracking-[0.15em] font-bold text-[var(--muted)] mb-3">What I Do</p>
            <p className="text-lg text-[var(--foreground)]/70 font-medium leading-relaxed">
              Specialize in Product Design & Design Systems. I enjoy solving problems that require both analytical and visual thinking.
            </p>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-[0.15em] font-bold text-[var(--muted)] mb-3">Quote to live by</p>
            <p className="text-lg text-[var(--foreground)]/70 font-medium leading-relaxed italic">
              &ldquo;Thinking about design is hard, but not thinking about it can be disastrous.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const WorkExperience = () => {
  const experience = [
    {
      role: "Product Designer",
      company: "AliveCor Inc.",
      period: "March '25 - Present",
      description: "Leading end-to-end design for KardiaStation Mobile and maintaining the design system for mobile apps."
    },
    {
      role: "Associate Product Designer",
      company: "AliveCor Inc.",
      period: "Nov '23 - March '25",
      description: "Led design for enterprise healthcare tools like KardiaRX and KardiaComplete used by major partners like Pfizer, CVS, Walgreens."
    },
    {
      role: "UX Faculty",
      company: "MIT Pune - Avantika University",
      period: "Jul '24",
      description: "Taught foundational 'Introduction to UX' course for 2nd-year B.Tech students."
    },
    {
      role: "Design Engineer",
      company: "Self-Employed",
      period: "Jul '23 - Dec '23",
      description: "Redesigned and implemented client websites (Shiftlinkapp, Aibiliti.co, Dualite.dev) focusing on performance."
    },
    {
      role: "UX Intern",
      company: "Wolffkraft Design Studio",
      period: "Aug '22 - Dec '22",
      description: "Delivered complex client sites using Webflow and supported UX research across varied projects."
    },
    {
      role: "Frontend Intern",
      company: "Embed Design Studio",
      period: "Jun '21 - Jul '21",
      description: "Developed and maintained company website using Next.js, React, and Tailwind CSS."
    },
    {
      role: "Research & Web Dev Intern",
      company: "Gyrix Technolabs",
      period: "Dec '19 - Jan '20",
      description: "Analyzed organizational needs and proposed roadmaps for adopting Webflow."
    }
  ];

  return (
    <Section title="Experience">
      <div className="divide-y divide-[var(--border)]">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
            className="group py-8 grid grid-cols-1 md:grid-cols-[1fr,auto] gap-3 md:gap-16 items-start"
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">{exp.role}</h3>
                <span className="text-sm text-[var(--muted)] font-medium">@ {exp.company}</span>
              </div>
              <p className="text-[var(--muted)] leading-relaxed">{exp.description}</p>
            </div>
            <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap md:pt-1.5 opacity-60">
              {exp.period}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const InteractiveSkills = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const skills = [
    "Product Design", "UX Strategy", "User Research", "Interaction Design",
    "Wireframing", "Prototyping", "Figma", "Design Systems",
    "Usability Testing", "Information Architecture", "Visual Design",
    "Motion Design", "Frontend Development", "React", "Next.js",
    "Tailwind CSS", "TypeScript", "JavaScript", "HTML/CSS",
    "Git", "Agile", "Problem Solving", "Collaboration", "Empathy",
  ];

  const colors = [
    "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500",
    "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500",
    "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500",
    "bg-pink-500", "bg-rose-500",
  ];

  const Toggle = () => (
    <button
      onClick={() => setIsInteractive(!isInteractive)}
      className="group flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border)] hover:border-indigo-500/50 transition-all duration-300 bg-[var(--card)]"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] group-hover:text-indigo-500 transition-colors">
        {isInteractive ? "Static View" : "Physics View"}
      </span>
      <div className={`w-8 h-4 rounded-full p-1 transition-colors duration-300 ${isInteractive ? 'bg-indigo-500' : 'bg-[var(--border)]'}`}>
        <div className={`w-2 h-2 rounded-full bg-white transition-transform duration-300 ${isInteractive ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </button>
  );

  return (
    <Section
      title="Core Skills"
      rightHeader={<div className="hidden md:block"><Toggle /></div>}
    >
      {/* Desktop View */}
      <div className="hidden md:block">
        {isInteractive ? (
          <div className="relative w-full h-[90vh] min-h-[800px] rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
            <div className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 pointer-events-none">
              <p className="text-sm font-bold uppercase tracking-wider text-white/90">
                ✨ Drag & throw the skills around
              </p>
            </div>

            <Gravity
              debug={false}
              gravity={{ x: 0, y: 1 }}
              resetOnResize={true}
              grabCursor={true}
              addTopWall={true}
              autoStart={true}
              className="w-full h-full"
            >
              {skills.map((skill, i) => (
                <MatterBody
                  key={i}
                  bodyType="rectangle"
                  isDraggable={true}
                  x={`${20 + (i % 3) * 25}%`}
                  y={`${10 + Math.floor(i / 3) * 10}%`}
                  angle={Math.random() * 20 - 10}
                  matterBodyOptions={{
                    friction: 0.3,
                    restitution: 0.6,
                    density: 0.005,
                    isStatic: false,
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <div
                    className={`px-8 py-4 rounded-full ${colors[i % colors.length]} border-2 border-white/20 text-white text-xl font-bold uppercase tracking-wider shadow-2xl whitespace-nowrap backdrop-blur-sm transform transition-transform hover:scale-105`}
                  >
                    {skill}
                  </div>
                </MatterBody>
              ))}
            </Gravity>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-[var(--border)]">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="group p-8 border-r border-b border-[var(--border)] hover:bg-indigo-500/[0.02] transition-colors duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${colors[i % colors.length]} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  <span className="text-lg font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Simplified View */}
      <div className="md:hidden flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <div
            key={i}
            className={`px-5 py-2.5 rounded-full ${colors[i % colors.length]} text-white text-sm font-bold uppercase tracking-wider border border-white/10 shadow-lg leading-none`}
          >
            {skill}
          </div>
        ))}
      </div>
    </Section>
  );
};

const Toolstack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tools = [
    { name: "Figma", icon: Palette },
    { name: "Maze", icon: TestTube2 },
    { name: "Claude", icon: Cpu },
    { name: "Adobe Suite", icon: PenTool },
    { name: "Webflow", icon: Wind },
    { name: "VS Code", icon: Code2 },
    { name: "Framer", icon: Zap },
    { name: "Origami Studio", icon: Triangle }
  ];

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.tool-item');
      if (items && items.length > 0) {
        gsap.fromTo(items,
          { y: -30, opacity: 0 }, // Changed y from 30 to -30 based on instruction context
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section title="Toolstack">
      <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[var(--border)]">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              className="tool-item group relative p-12 flex flex-col items-center justify-center gap-6 border-r border-b border-[var(--border)] hover:bg-indigo-500/[0.02] transition-colors duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/[0.03] transition-colors duration-700" />

              <div className="relative">
                <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] group-hover:border-indigo-500/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-indigo-500/10">
                  <GlassIcons items={[{ icon: <Icon className="w-8 h-8 text-[var(--muted)] group-hover:text-indigo-500 transition-colors duration-500" />, color: "blue", label: tool.name }]} />
                </div>
              </div>

              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-500">
                {tool.name}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

// --- Main Component ---

export default function AboutPage() {

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <AboutOverview />
        <Collaborations />
        <Toolstack />
        <WorkExperience />
        <InteractiveSkills />
      </div>
    </div>
  );
}
