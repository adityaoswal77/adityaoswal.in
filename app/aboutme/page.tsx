"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Gravity, { MatterBody } from "@/components/fancy/physics/gravity";
import { ArrowLeft, ArrowUpRight, Palette, TestTube2, Cpu, PenTool, Wind, Code2, Zap, Triangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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

const SideProjects = () => {
  const projects = [
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
  ];

  return (
    <Section title="Side Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
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
    </Section>
  );
};

const WorkExperience = () => {
  const experience = [
    {
      role: "Product Designer",
      company: "AliveCor Inc.",
      period: "Mar '25 – Present",
      description: "Leading end-to-end design for KardiaStation Mobile and owning the design system across mobile apps. Redesigned EKG report templates resulting in $100K+ in annual savings. Conceived and shipped Kardia Year in Review, driving a 21% click-through rate."
    },
    {
      role: "Associate Product Designer",
      company: "AliveCor Inc.",
      period: "Nov '23 – Mar '25",
      description: "Led design of KardiaRX (clinical study platform) and KardiaComplete (B2B2C wellness platform) used by Pfizer, CVS, and Walgreens. Shaped onboarding, adherence tracking, and care coordination experiences."
    },
    {
      role: "UX Faculty",
      company: "MIT Pune – Avantika University",
      period: "Jul '24",
      description: "Designed and taught an 'Introduction to UX' course for 2nd-year B.Tech students, culminating in final presentations of app ideas and prototypes."
    },
    {
      role: "Freelance Design Engineer",
      company: "Independent",
      period: "Jul '23 – Dec '23",
      description: "Led redesign and Webflow implementation for Shiftlinkapp, Aibiliti.co, Dualite.dev, and DNG Technologies — boosting performance and driving higher lead conversions."
    },
    {
      role: "UX Intern",
      company: "Wolffkraft Design Studio",
      period: "Aug '22 – Dec '22",
      description: "Delivered veritaslogistics.com using Webflow, combining no-code development with high-fidelity design and animations. Supported UX research and execution across varied client projects."
    },
    {
      role: "Frontend Intern",
      company: "Embed Design Studio",
      period: "Jun '21 – Jul '21",
      description: "Developed and maintained the company website using Next.js, React, TypeScript, and Tailwind CSS, deployed on Vercel for optimised performance."
    },
    {
      role: "Research & Web Dev Intern",
      company: "Gyrix Technolabs",
      period: "Dec '19 – Jan '20",
      description: "Shipped a landing page for a co-working space using Webflow and proposed a strategic roadmap for Webflow adoption across the organisation."
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
  const [isPhysics, setIsPhysics] = useState(false);
  const skills = [
    "Product Design", "UX Design", "Design Systems", "Interaction Design",
    "User Research", "Usability Testing", "Heuristic Evaluation",
    "Rapid Prototyping", "Accessibility (WCAG)", "Information Architecture",
    "Design Tokens", "Component Architecture", "Motion Design",
    "0-to-1 Product Design", "AI-Assisted Design", "Prompt Engineering",
    "Data-Informed Design", "Cross-functional Collaboration",
    "Stakeholder Management", "Agile / Scrum",
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Webflow",
    "Figma", "Framer", "Origami Studio",
  ];

  const Toggle = () => (
    <button
      type="button"
      onClick={() => setIsPhysics((p) => !p)}
      className="flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)]/20 transition-colors duration-200"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
        {isPhysics ? "Simple" : "Physics"}
      </span>
      <div className={`w-8 h-4 rounded-full p-[3px] transition-colors duration-300 ${isPhysics ? "bg-[var(--foreground)]" : "bg-[var(--border)]"}`}>
        <div className={`w-2.5 h-2.5 rounded-full bg-[var(--background)] transition-transform duration-300 ${isPhysics ? "translate-x-3.5" : "translate-x-0"}`} />
      </div>
    </button>
  );

  return (
    <Section title="Core Skills" rightHeader={<Toggle />}>
      {isPhysics ? (
        <div className="relative w-full h-[70vh] min-h-[500px] rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
          <p className="absolute top-5 left-5 z-10 text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--muted)] pointer-events-none">
            Drag to interact
          </p>
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
                x={`${15 + (i % 4) * 20}%`}
                y={`${5 + Math.floor(i / 4) * 12}%`}
                angle={Math.random() * 10 - 5}
                matterBodyOptions={{
                  friction: 0.3,
                  restitution: 0.4,
                  density: 0.004,
                  isStatic: false,
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--background)] text-[11px] font-bold uppercase tracking-widest text-[var(--foreground)] whitespace-nowrap select-none">
                  {skill}
                </div>
              </MatterBody>
            ))}
          </Gravity>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-[12px] font-bold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/20 transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </Section>
  );
};

const Toolstack = () => {
  const tools = [
    { name: "Figma", icon: Palette },
    { name: "Maze", icon: TestTube2 },
    { name: "Claude", icon: Cpu },
    { name: "Adobe Suite", icon: PenTool },
    { name: "Webflow", icon: Wind },
    { name: "VS Code", icon: Code2 },
    { name: "Framer", icon: Zap },
    { name: "Origami Studio", icon: Triangle },
  ];

  return (
    <Section title="Toolstack">
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-[var(--border)]">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              className="group p-10 flex flex-col items-center justify-center gap-4 border-r border-b border-[var(--border)] hover:bg-[var(--card)] transition-colors duration-300"
            >
              <Icon className="w-6 h-6 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-300" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-300">
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
        <SideProjects />
        <Collaborations />
        <Toolstack />
        <WorkExperience />
        <InteractiveSkills />
      </div>
    </div>
  );
}
