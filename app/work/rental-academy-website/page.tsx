"use client";

import React, { useRef, useLayoutEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ZoomableImage } from "@/components/ZoomableImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ASSET_DIR = "/assets/rental-academy-website";

const SHOTS = {
  desktopHero: {
    src: `${ASSET_DIR}/desktop-hero.webp`,
    width: 2880,
    height: 1780,
    alt: "Landing page top: announcement bar, navigation, an intro line, and two stacked doors, Launch your first unit and Scale into a company, with an email capture bar below.",
  },
  doors: {
    src: `${ASSET_DIR}/doors.webp`,
    width: 2880,
    height: 1688,
    alt: "Two side-by-side cards explaining each path: a light card for people leaving a 9-to-5 and a dark green card for early operators, each with a bullet list and a call to action.",
  },
  comparison: {
    src: `${ASSET_DIR}/comparison.webp`,
    width: 2880,
    height: 1718,
    alt: "Dark section with a headline and a comparison table of free videos, online courses, masterminds and the programme, using the same rows for each.",
  },
  curriculum: {
    src: `${ASSET_DIR}/curriculum.webp`,
    width: 2880,
    height: 1232,
    alt: "Numbered curriculum modules in two columns under the heading The playbook, module by module.",
  },
  finalCta: {
    src: `${ASSET_DIR}/final-cta.webp`,
    width: 2880,
    height: 1080,
    alt: "Closing call to action split in two: a yellow panel to launch safely and a green panel to scale seriously, above a dark footer.",
  },
  callStep1: {
    src: `${ASSET_DIR}/call-step-1.webp`,
    width: 1472,
    height: 1574,
    alt: "Booking modal step 1 of 3: choice chips for units run today and the target, city and budget fields, name and email, and a Pick a time button.",
  },
  callStep2: {
    src: `${ASSET_DIR}/call-step-2.webp`,
    width: 2112,
    height: 1304,
    alt: "Booking modal step 2 of 3: a green summary panel with the user's answers beside a month calendar and a list of time slots, with one slot selected.",
  },
  callStep3: {
    src: `${ASSET_DIR}/call-step-3.webp`,
    width: 1432,
    height: 1258,
    alt: "Booking modal step 3 of 3: a You're booked confirmation with the date tile, Google, Apple and Outlook calendar buttons, and a short prep checklist.",
  },
  mobileHero: {
    src: `${ASSET_DIR}/mobile-hero.webp`,
    width: 780,
    height: 1688,
    alt: "The mobile landing page top: announcement bar, logo and register button, intro line, and the two stacked doors.",
  },
  mobileCallStep1: {
    src: `${ASSET_DIR}/mobile-call-step-1.webp`,
    width: 780,
    height: 1688,
    alt: "Booking form step 1 on a phone: answer chips, city and budget fields, and a disabled Continue button until a city and a budget band are filled in.",
  },
};

type ListItem = { label: string; desc: string };

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// --- Shared building blocks ---

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
      tl.from(metaRef.current, { y: 30, opacity: 0, duration: 0.8 })
        .from(titleRef.current, { y: 100, skewY: 5, opacity: 0 }, "-=0.6")
        .from(descriptionRef.current, { y: 30, opacity: 0 }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Project hero section"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 pt-32 pb-12 overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
    >
      <div className="atmospheric-glow opacity-50" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Work</span>
        </Link>

        <div className="space-y-12">
          <div ref={metaRef} className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Web Design
              </span>
            </div>
            <div className="h-px w-8 bg-[var(--border)]" />
            <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
              Concept / 2026
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[9.5rem] font-bold leading-[0.85] tracking-normal uppercase text-[var(--foreground)]"
          >
            Rental
            <br />
            <span className="italic font-light text-[var(--muted)]">Academy</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            A landing page and booking flow for a short-term rental education business with two programmes for two audiences. Designed for desktop and mobile, then built as a working front end.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Users</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">People starting or growing a short-term rental business</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Platform</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Responsive web</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Focus</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Landing page and booking flow</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Status</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Concept, not shipped</dd>
            </div>
          </dl>
        </div>
      </div>

      <div aria-hidden="true" className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Academy
        </span>
      </div>
    </section>
  );
};

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = `section-${slugify(title)}`;

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const elementsToAnimate = [titleRef.current, contentRef.current].filter(Boolean);
      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={id}
      className={`px-6 py-16 md:py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id={id}
          ref={titleRef}
          className="text-5xl md:text-7xl font-black uppercase tracking-[0.01em] text-[var(--foreground)] mb-12 md:mb-20 leading-[0.9]"
        >
          {title}
        </h2>
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
};

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium max-w-4xl">
    {children}
  </p>
);

const List = ({ items }: { items: ListItem[] }) => (
  <ul className="list-disc pl-5 divide-y divide-[var(--border)] marker:text-[var(--muted)] max-w-4xl">
    {items.map((item) => (
      <li key={item.label} className="py-4 first:pt-0 last:pb-0 text-lg leading-relaxed text-[var(--muted)] font-medium">
        <span className="font-bold text-[var(--foreground)]">{item.label}.</span> {item.desc}
      </li>
    ))}
  </ul>
);

const Shot = ({
  shot,
  sizes,
  label,
  caption,
  className = "",
  frameClassName = "rounded-2xl",
}: {
  shot: { src: string; width: number; height: number; alt: string };
  sizes: string;
  label: string;
  caption: string;
  className?: string;
  frameClassName?: string;
}) => (
  <figure className={`space-y-4 ${className}`}>
    <div
      className={`overflow-hidden border border-[#090F05]/10 bg-white shadow-sm dark:border-white/15 dark:bg-zinc-900 dark:shadow-none ${frameClassName}`}
    >
      <ZoomableImage
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        loading="lazy"
        className="h-auto w-full"
        wrapperClassName="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#18280E] dark:focus-visible:ring-white"
      />
    </div>
    <figcaption className="text-base leading-relaxed text-[var(--muted)] font-medium">
      <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]">{label}.</span> {caption}
    </figcaption>
  </figure>
);

const FULL_WIDTH_SIZES = "(min-width: 1200px) 1152px, calc(100vw - 48px)";

// --- Sections ---

const ContextSection = () => (
  <Section title="Context">
    <div className="space-y-12">
      <Lead>
        A new education business teaches people how to start and grow a short-term rental company. It has two programmes for two different audiences. The website is its front door.
      </Lead>
      <List
        items={[
          { label: "The brief", desc: "Design a landing page that explains both programmes, earns trust and makes the next step easy to find. Logo and brand system work were out of scope." },
          { label: "Two programmes", desc: "Launch is for people starting out. Scale is for people who already run rentals and want to grow into a real company." },
          { label: "What I made", desc: "A responsive landing page and a booking flow, designed first and then built in code." },
          { label: "My role", desc: "All of it: the page structure, the visual design and the front-end code." },
        ]}
      />
    </div>
  </Section>
);

const AudienceSection = () => (
  <Section title="Audience">
    <div className="space-y-12">
      <Lead>
        One page has to work for two kinds of people. Both are busy, and both have seen plenty of guru courses, so they are sceptical. Before they commit, they compare against free videos, cheap online courses and masterminds.
      </Lead>
      <List
        items={[
          { label: "The 9-to-5 leaver", desc: "Has a job and no units yet, or just one. Wants an income they own, without betting their savings on guesswork. This is the larger audience." },
          { label: "The early operator", desc: "Already runs a few units. Manual work, thin margins and no time are keeping them from growing into a real company." },
          { label: "Different needs", desc: "Newcomers are usually still working out whether and how to start. People already running units deal with day-to-day operations, pricing and costs. They need different help." },
          { label: "Same doubts", desc: "Buyers in this space have seen a lot of overpromising. Income promises, countdown pressure and glowing customer stories can read as warning signs." },
        ]}
      />
    </div>
  </Section>
);

const ProblemSection = () => (
  <Section title="The Problem">
    <div className="space-y-12">
      <Lead>
        The page has to do a lot for visitors who are not convinced yet. I framed the problem as three jobs.
      </Lead>
      <List
        items={[
          { label: "Know who it is for", desc: "A visitor should see which programme is theirs at a glance, without reading through a catalogue." },
          { label: "Trust it quickly", desc: "The page is specific about what each programme includes and who it is for. It stays away from income promises." },
          { label: "Act from anywhere", desc: "The next step should be there whenever a visitor is ready. The buttons appear in the header, on the doors, on the programme cards and again at the bottom." },
        ]}
      />
    </div>
  </Section>
);

const StructureSection = () => (
  <Section title="Page Structure">
    <div className="space-y-12">
      <Lead>
        The order follows the questions a sceptical visitor asks. Who is this for? What is behind each option? How does it compare with what I already know? What will I learn? What do I do next? The order is my own call, not an industry rule.
      </Lead>
      <List
        items={[
          { label: "Two doors", desc: "Launch and Scale sit at the top, one above the other. Each has a short line on who it is for and a button." },
          { label: "What is behind each door", desc: "Two cards, one per audience, with what is included and the main button for that path." },
          { label: "An honest comparison", desc: "The programme next to free videos, online courses and masterminds, using the same rows for each so it is quick to scan." },
          { label: "The curriculum", desc: "Laid out module by module, so people can see what they would learn and in what order." },
          { label: "FAQ", desc: "An accordion for the questions a sceptical buyer is likely to have, written plainly." },
          { label: "Final call to action", desc: "A closing panel split in two, one half for each path, so the next step is there again at the bottom." },
        ]}
      />

      <div className="space-y-12 pt-8">
        <Shot
          shot={SHOTS.desktopHero}
          sizes={FULL_WIDTH_SIZES}
          label="Two doors"
          caption="The top of the page. Launch is yellow and Scale is green."
        />
        <Shot
          shot={SHOTS.doors}
          sizes={FULL_WIDTH_SIZES}
          label="Behind each door"
          caption="One card per audience, with what is included and the main button."
        />
        <Shot
          shot={SHOTS.comparison}
          sizes={FULL_WIDTH_SIZES}
          label="Comparison"
          caption="The comparison section, with the same rows for every option."
        />
        <Shot
          shot={SHOTS.curriculum}
          sizes={FULL_WIDTH_SIZES}
          label="Curriculum"
          caption="The playbook, module by module."
        />
        <Shot
          shot={SHOTS.finalCta}
          sizes={FULL_WIDTH_SIZES}
          label="Final call to action"
          caption="The closing panel. The FAQ accordion sits between the curriculum and this panel."
        />
      </div>
    </div>
  </Section>
);

const DecisionsSection = () => (
  <Section title="Key Decisions">
    <div className="space-y-12">
      <Lead>
        A few decisions shaped everything else on the page.
      </Lead>
      <List
        items={[
          { label: "Two doors, two colours", desc: "Launch is yellow and Scale is green. The first headline says Launch your first unit, so it is clear straight away that the door is for people who are not in the rental business yet. The second is for people who already run rentals." },
          { label: "Yellow leads", desc: "People who are not in the business yet are the larger audience. So yellow leads across the whole page, and green marks the path for people who already run rentals." },
          { label: "A different button for each door", desc: "The first door has a register button. The second has a book a strategy call button. Each one fits where that person is." },
          { label: "An honest comparison", desc: "Visitors compare against free videos, online courses and masterminds anyway. So the page does it for them, side by side. The rows cover who teaches, whether there is a plan in order, templates, software and access to the people behind it." },
          { label: "A simple wordmark", desc: "Logo work was out of scope, so the wordmark stays plain and the page does the talking." },
          { label: "A quiet option for people who are not ready", desc: "Under the doors, an email box offers a free checklist to visitors who are not ready to register or book a call." },
        ]}
      />
    </div>
  </Section>
);

const BookingSection = () => (
  <Section title="Booking Flow">
    <div className="space-y-12">
      <Lead>
        The strategy call is a three-step flow in a modal. It asks a few simple questions, moves to a calendar, and ends with a confirmation.
      </Lead>
      <List
        items={[
          { label: "Step 1, a few questions", desc: "How many units the person runs today and what they are aiming for, as choice chips. Then their city and a budget band, so the team knows where they are and what they expect. Then a first name and an email." },
          { label: "Step 2, pick a time", desc: "A calendar and a list of time slots. A summary panel repeats the answers and lets the person edit them. The time zone is shown next to the slots." },
          { label: "Step 3, confirmation", desc: "A confirmation that says what was booked and when, with add-to-calendar buttons for the common calendar apps and a short prep list." },
          { label: "Back works", desc: "The person can go back a step at any point and change their answers or their time." },
          { label: "Only what helps the call", desc: "The questions are there to help prepare the conversation, so the flow keeps them short." },
        ]}
      />

      <div className="space-y-12 pt-8">
        <div className="grid grid-cols-1 gap-12 md:items-start md:gap-8 md:[grid-template-columns:935fr_1620fr]">
          <Shot
            shot={SHOTS.callStep1}
            sizes="(min-width: 768px) 420px, calc(100vw - 48px)"
            label="Step 1"
            caption="A few questions about the business."
          />
          <Shot
            shot={SHOTS.callStep2}
            sizes="(min-width: 768px) 720px, calc(100vw - 48px)"
            label="Step 2"
            caption="Pick a time. The green panel repeats the answers."
          />
        </div>
        <Shot
          shot={SHOTS.callStep3}
          sizes="(min-width: 768px) 520px, calc(100vw - 48px)"
          label="Step 3"
          caption="The confirmation, with add-to-calendar buttons."
          className="md:w-[calc((100%_-_2rem)_*_0.4454)]"
        />
      </div>
    </div>
  </Section>
);

const MobileSection = () => (
  <Section title="Mobile">
    <div className="space-y-12">
      <Lead>
        The whole booking flow also works on a phone. The doors stay stacked, and the questions are split across two screens so each one has fewer fields.
      </Lead>
      <List
        items={[
          { label: "Same flow", desc: "Nothing is cut for mobile. All three steps of the strategy call work on a small screen." },
          { label: "Two screens for the questions", desc: "The first step is split into two screens, with fewer fields on each." },
          { label: "Bigger touch targets", desc: "Chips and fields are larger, so they are easy to tap." },
          { label: "Continue waits for the answers", desc: "On the first question screen, the button stays disabled until a city and a budget band are filled in." },
        ]}
      />

      <div className="mx-auto grid max-w-[600px] grid-cols-2 gap-4 pt-8 md:gap-8">
        <Shot
          shot={SHOTS.mobileHero}
          sizes="(min-width: 768px) 300px, 45vw"
          label="Landing page"
          caption="The top of the page on a phone."
          frameClassName="rounded-[1.75rem]"
        />
        <Shot
          shot={SHOTS.mobileCallStep1}
          sizes="(min-width: 768px) 300px, 45vw"
          label="Booking"
          caption="The first screen of the questions."
          frameClassName="rounded-[1.75rem]"
        />
      </div>
    </div>
  </Section>
);

const VisualSystemSection = () => (
  <Section title="Visual System">
    <div className="space-y-12">
      <Lead>
        The look is simple: two typefaces, two colours that each have a job, and restrained motion.
      </Lead>
      <List
        items={[
          { label: "Type", desc: "Archivo, a bold grotesque, for display. Inter, a clean sans, for detail." },
          { label: "Yellow", desc: "Momentum and action. It marks highlights, selected states and the launch path." },
          { label: "Deep green", desc: "The scale path and the more operational content." },
          { label: "Motion", desc: "Buttons and links move a little, not a lot: a small lift, an arrow that nudges forward and underlines in the navigation." },
          { label: "Focus and reduced motion", desc: "Focus rings are visible for keyboard users, and reduced-motion settings are respected." },
        ]}
      />
    </div>
  </Section>
);

const BuiltSection = () => (
  <Section title="Built in Code">
    <div className="space-y-12">
      <Lead>
        I built the page as a working front end rather than leaving it as static screens. It has not been shipped. The hosted copy is trimmed: it leaves out prices, people and quotes.
      </Lead>
      <List
        items={[
          { label: "Stack", desc: "React, TypeScript, Vite, Tailwind and React Router." },
          { label: "Routes", desc: "Pages are split by route and loaded when they are needed." },
          { label: "The flow", desc: "The strategy call is a real multi-step modal. Back works, the calendar works and the add-to-calendar buttons create the calendar event." },
          { label: "Accessibility", desc: "Labelled fields, keyboard dismissal for the modal, visible focus rings and reduced-motion support." },
          { label: "Why build it", desc: "So the whole flow could be tried end to end, on desktop and on mobile." },
        ]}
      />
      <a
        href="https://rental-academy-prototype.pages.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[14px] uppercase tracking-widest text-[var(--foreground)] underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--foreground)] transition-colors"
      >
        Open the live prototype
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </Section>
);

const TestFirstSection = () => (
  <Section title="What I'd Test First">
    <div className="space-y-12">
      <Lead>
        The page rests on a guess about who it will attract. Real data and testing would show who to target, so that is the first thing I would test. I have not run any tests, so there are no results here.
      </Lead>
      <List
        items={[
          { label: "Do visitors pick the right door", desc: "Do people choose the door that fits them, or do many hesitate or pick the wrong one? If they do, the door wording or the comparison needs work." },
          { label: "Do the short questions help or hurt", desc: "Do the qualifying questions make the call better, or do they put people off booking? If they hurt, I would cut fields first." },
          { label: "Who actually shows up", desc: "Yellow leads because the launch audience is the larger one. Real traffic would show whether that holds." },
        ]}
      />
    </div>
  </Section>
);

const StatusSection = () => (
  <Section title="Status">
    <div className="space-y-12">
      <Lead>
        Concept work from a written brief. Not shipped, not tested with users.
      </Lead>
      <List
        items={[
          { label: "Constraints", desc: "I worked alone from a written brief and the existing brand material, in a short fixed window, without access to users." },
          { label: "Copy", desc: "Most of the FAQ and placeholder copy was drafted with AI and needs real answers." },
          { label: "People", desc: "Real founder photos and real customer words were not available, so this version has no people section and no customer praise." },
          { label: "Numbers", desc: "The numbers and claims in the first version came from public material. They are left out here." },
          { label: "Not built", desc: "The register path for the first programme is a button only. The sign-up flow itself was not built." },
        ]}
      />
    </div>
  </Section>
);

const Closing = () => (
  <section className="px-6 py-24 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300">
    <div className="max-w-6xl mx-auto">
      <Link
        href="/work"
        className="inline-flex items-center gap-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>All work</span>
      </Link>
    </div>
  </section>
);

// --- Main ---

export default function RentalAcademyWebsite() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <ContextSection />
        <AudienceSection />
        <ProblemSection />
        <StructureSection />
        <DecisionsSection />
        <BookingSection />
        <MobileSection />
        <VisualSystemSection />
        <BuiltSection />
        <TestFirstSection />
        <StatusSection />
        <Closing />
      </div>
    </div>
  );
}
