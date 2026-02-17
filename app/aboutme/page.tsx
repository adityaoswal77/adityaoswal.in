"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import VariableFontHoverByRandomLetter from "@/fancy/components/text/variable-font-hover-by-random-letter";
import Gravity, { MatterBody } from "@/components/fancy/physics/gravity";

// --- Type Declarations ---
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

// --- Components ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

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
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter uppercase text-[var(--foreground)]"
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
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 group grayscale hover:grayscale-0 transition-all duration-700">
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

const Section = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

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
          <h2
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase tracking-[0.01em] text-[var(--foreground)] mb-16 leading-[0.9]"
          >
            {title}
          </h2>
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
            I build digital experiences that feel human. By blending technical precision with creative experimentation, I create solutions that simplify complex challenges.
          </p>
          <p className="text-lg text-[var(--muted)] leading-relaxed font-medium">
            Currently at Alivecor, I lead design initiatives for heart health monitoring systems. My goal is to bridge the gap between advanced medical technology and intuitive user experiences.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-bold text-indigo-500 mb-6 underline underline-offset-8">What I Do</h3>
            <p className="text-lg text-[var(--muted)] font-medium">
              Specialized in Healthcare UX, Product Architecture, and Interactive Design Systems. I enjoy tackling problems that require both analytical and visual thinking.
            </p>
          </div>

          <div>
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-bold text-indigo-500 mb-6 underline underline-offset-8">Mission</h3>
            <p className="text-lg text-[var(--muted)] font-medium">
              To create clarity in chaos and craft realities that empower users through thoughtful, human-centric design.
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
      description: "Led design for enterprise healthcare tools like KardiaRX and KardiaComplete used by major partners like CVS/Walgreens."
    },
    {
      role: "UX Faculty",
      company: "MIT Pune - Avantika University",
      period: "Jul '24",
      description: "Taught foundational 'Introduction to UX' course for 2nd-year B.Tech students."
    },
    {
      role: "Freelance Design Engineer",
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
      <div className="flex-col gap-4 my-2">
        {experience.map((exp, i) => (
          <div key={i} className="p-8 bg-[var(--card)] rounded-[.5rem] border border-[var(--border)] hover:border-indigo-500/30 transition-all duration-500 group relative overflow-hidden mt-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-4 block">
              {exp.period}
            </span>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-1 group-hover:text-indigo-400 transition-colors">
              {exp.role}
            </h3>
            <p className="text-[14px] font-bold uppercase tracking-widest text-indigo-500/80 mb-6">
              {exp.company}
            </p>
            <p className="text-[var(--muted)] text-sm font-medium leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const InteractiveSkills = () => {
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

  return (
    <Section title="Core Skills">
      <div className="relative w-full h-[90vh] min-h-[800px] rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden">
        {/* Instructions */}
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
    </Section>
  );
};

const Toolstack = () => {
  const tools = [
    { name: "Figma", icon: "🎨" },
    { name: "Maze", icon: "🧪" },
    { name: "Claude", icon: "🤖" },
    { name: "Adobe Suite", icon: "🎭" },
    { name: "Webflow", icon: "🌊" },
    { name: "VS Code", icon: "💻" },
    { name: "Framer", icon: "⚡" },
    { name: "Origami Studio", icon: "📐" }
  ];

  return (
    <Section title="Toolstack">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-3xl bg-gradient-to-br from-[var(--card)] to-[var(--card)]/50 border border-[var(--border)] hover:border-indigo-500/50 transition-all duration-500 overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] text-center">
                {tool.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const EducationAndRecognition = () => {
  const education = {
    school: "MIT Pune - Avantika University",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2018 - 2022"
  };

  const certifications = [
    "Enterprise Design Thinking Practitioner (IBM)",
    "Foundations of User Experience Design (Google/Coursera)",
    "Product Management: Building a Product Roadmap (LinkedIn Learning)"
  ];

  const achievement = "2nd Runner Up | CodeOffDuty Hackathon (Google DSC Wow | Dec '20)";

  return (
    <Section title="Education & More">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="p-8 bg-indigo-500/5 rounded-[2.5rem] border border-indigo-500/20">
          <h3 className="text-[12px] uppercase tracking-[0.2em] font-bold text-indigo-500 mb-6">Education</h3>
          <p className="text-xl font-bold text-[var(--foreground)] mb-2">{education.school}</p>
          <p className="text-[var(--muted)] font-medium mb-4">{education.degree}</p>
          <span className="text-[14px] font-bold text-indigo-500/60 uppercase tracking-widest">{education.period}</span>
        </div>

        <div className="p-8 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)]">
          <h3 className="text-[12px] uppercase tracking-[0.2em] font-bold text-indigo-500 mb-6">Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((cert, i) => (
              <li key={i} className="text-[15px] font-medium text-[var(--muted)] border-l-2 border-indigo-500/30 pl-4">
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-[var(--card)] rounded-[2.5rem] border border-[var(--border)]">
          <h3 className="text-[12px] uppercase tracking-[0.2em] font-bold text-indigo-500 mb-6">Achievements</h3>
          <p className="text-lg font-bold text-[var(--foreground)] leading-tight italic">
            &quot;{achievement}&quot;
          </p>
        </div>
      </div>
    </Section>
  );
};

// --- Utils ---
const useGsapLoader = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const load = async () => {
      if (window.gsap && window.ScrollTrigger) {
        setReady(true);
        return;
      }
      const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js");
        window.gsap?.registerPlugin(window.ScrollTrigger);
        setReady(true);
      } catch (err) {
        console.error("Failed to load GSAP", err);
        setReady(true); // Continue even if GSAP fails
      }
    };
    load();
  }, []);
  return ready;
};

// --- Main Component ---

export default function AboutPage() {
  const isGsapReady = useGsapLoader();

  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white min-h-screen transition-colors duration-300">
      <main id="main-content" className="w-full relative" role="main">
        <Hero />
        <AboutOverview />
        <InteractiveSkills />
        <Toolstack />
        <WorkExperience />
        {/* <EducationAndRecognition /> */}
      </main>
    </div>
  );
}
