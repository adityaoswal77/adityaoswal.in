"use client";

import React, { useRef, useLayoutEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ASSET_DIR = "/assets/ai-tax-workspace";
const SHOT_SIZES = "(min-width: 1200px) 1152px, calc(100vw - 48px)";

type Item = { label: string; desc: string };

type Direction = {
  number: string;
  name: string;
  tag?: string;
  file: string;
  alt: string;
  items: Item[];
};

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
          className="inline-flex items-center gap-2 mb-16 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono text-[14px] uppercase tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Work</span>
        </Link>

        <div className="space-y-12">
          <div ref={metaRef} className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
              <span className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)]">
                Product Design
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
            AI Tax
            <br />
            <span className="italic font-light text-[var(--muted)]">Workspace</span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-lg md:text-2xl font-medium leading-relaxed text-[var(--muted)] max-w-3xl"
          >
            A concept for the home screen of an AI workspace for tax professionals. Chat is the main way in, and the work runs behind it as workflows.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 border-t border-[var(--border)]">
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Users</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Tax pros (CPAs, enrolled agents, firm owners)</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Platform</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Web app, desktop</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Focus</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Home screen, chat and workflows</dd>
            </div>
            <div>
              <dt className="text-[14px] uppercase tracking-[0.2em] font-bold text-[var(--muted)] mb-3">Status</dt>
              <dd className="text-xl font-bold text-[var(--foreground)]">Concept, not shipped</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.02] select-none" aria-hidden="true">
        <span className="text-[25rem] font-black leading-none tracking-tighter italic uppercase">
          Tax
        </span>
      </div>
    </section>
  );
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const Section = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const elementsToAnimate = [contentRef.current].filter(Boolean);
      if (titleRef.current) elementsToAnimate.unshift(titleRef.current);
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
      aria-labelledby={title ? `section-${slugify(title)}` : undefined}
      className={`px-6 py-16 md:py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2
            id={`section-${slugify(title)}`}
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase tracking-[0.01em] text-[var(--foreground)] mb-20 leading-[0.9]"
          >
            {title}
          </h2>
        )}
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
};

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 leading-relaxed font-medium">{children}</p>
);

const List = ({ items }: { items: Item[] }) => (
  <ul className="list-disc pl-5 space-y-4 marker:text-[var(--muted)]">
    {items.map((item) => (
      <li key={item.label} className="text-lg leading-relaxed text-[var(--muted)] font-medium">
        <span className="font-bold text-[var(--foreground)]">{item.label}.</span> {item.desc}
      </li>
    ))}
  </ul>
);

const Shot = ({
  file,
  alt,
  width = 2880,
  height = 1800,
  label,
  caption,
}: {
  file: string;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
  caption?: string;
}) => (
  <figure className="space-y-4">
    <div className="overflow-hidden rounded-[1.5rem] dark:rounded-[1rem] border border-[#090F05]/15 dark:border-white/15 bg-[#090F05]/[0.03] dark:bg-white/[0.04] shadow-[0_24px_60px_-32px_rgba(9,15,5,0.35)] dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]">
      <Image
        src={`${ASSET_DIR}/${file}`}
        alt={alt}
        width={width}
        height={height}
        sizes={SHOT_SIZES}
        loading="lazy"
        className="h-auto w-full"
      />
    </div>
    {(label || caption) && (
      <figcaption className="flex flex-col gap-1 max-w-4xl">
        {label && (
          <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]">{label}</span>
        )}
        {caption && <span className="text-base text-[var(--muted)] font-medium leading-relaxed">{caption}</span>}
      </figcaption>
    )}
  </figure>
);

// --- Content ---

const CONTEXT: Item[] = [
  {
    label: "Users",
    desc: "Tax pros: CPAs, enrolled agents and firm owners. They prepare returns for many clients and can speak for those clients to the tax authority.",
  },
  {
    label: "Chat first",
    desc: "A pro mostly talks to the product to get work done. They ask questions, start workflows and pull up client info. Chat is not a support widget on a dashboard. It is the main screen.",
  },
  {
    label: "Workflows",
    desc: "A workflow is one unit of tax work, like onboarding a client, gathering documents or preparing an extension. It can run across many clients at once or inside one client.",
  },
  {
    label: "The ask",
    desc: "In the first few seconds, a pro should see every client, the whole book, and who needs attention. They should see the workflows that are running, and be able to start working in chat.",
  },
  {
    label: "The hard part",
    desc: "The client list matters, but it should not push chat into a sliver. Hiding it too well is also wrong. It has to hold at two clients and at two hundred.",
  },
];

const PROBLEM: Item[] = [
  {
    label: "Who needs me",
    desc: "A pro has to tell at a glance which clients need something right now, without opening each one.",
  },
  {
    label: "What is running",
    desc: "AI work takes time and can run while you do something else. If the screen does not say what is running, what finished and what is waiting on you, you cannot decide what to do next. That is the first of the usability heuristics I checked the home screen against.",
  },
  {
    label: "Two scopes",
    desc: "Some workflows run across all clients and some run inside one. The pro should move between the two without losing their place.",
  },
  {
    label: "Staying responsible",
    desc: "Tax professionals stay responsible for what goes out under their name, including work an AI helped draft. So in this concept the assistant drafts and prepares, and a person reviews before anything reaches a client or a filing.",
  },
  {
    label: "Lists are not enough",
    desc: "Practice tools usually organise work by status, with a due date on each item, and many can show which clients still owe documents. In my view that is a list of clients. It is not a place to ask for something and get it done.",
  },
];

const HEURISTICS: Item[] = [
  {
    label: "Which client needs me",
    desc: "The home does not say which client needs the pro right now.",
  },
  {
    label: "Running work",
    desc: "It is not on the home. It sits behind a Workflows button.",
  },
  {
    label: "The client list",
    desc: "Opening a client replaces the firm sidebar, so the client list disappears.",
  },
  {
    label: "Two layouts",
    desc: "The product has two different home layouts, depending on how you land. The older one has a darker sidebar. The newer one has a lighter sidebar and is cleaner. I could not tell why it changes, so I looked at both.",
  },
  {
    label: "What already works",
    desc: "Chat is the centre of the newer home. Inside a client, the message box shows which client it is scoped to. And the chat asks before it guesses.",
  },
];

const APPROACH: Item[] = [
  {
    label: "Claude",
    desc: "The message box is the home. Past chats stay in the sidebar and never compete with it.",
  },
  {
    label: "ChatGPT and Codex",
    desc: "The message box is on top, with tasks listed right under it in tabs. You can see parallel work without leaving the page.",
  },
  {
    label: "Attio",
    desc: "A greeting and a message box come first. What needs you today sits underneath. I also liked its sidebar.",
  },
  {
    label: "Other products",
    desc: "Clay, Trello, Asana, GitHub’s project boards and Figma’s chat panel are not in this space. They still gave me ideas to test, like timeline views, boards you move cards around, and a chat panel with a bottom bar.",
  },
  {
    label: "Suggested starts",
    desc: "Most AI products open on a big input box, a few suggested things to try, and recent work nearby. Typing from a blank box takes effort, so suggested starts help. For a tax pro, I think the starts should be their own work, like a client to open or a task to run.",
  },
];

const DESIGN_SYSTEM: Item[] = [
  { label: "Colour", desc: "A dark neutral, a warm off-white and one bright accent." },
  { label: "Type", desc: "A serif for headings and a sans for the interface." },
  { label: "Shape", desc: "Hairline borders and fully rounded pill shapes." },
  { label: "Icons", desc: "An open-source icon set." },
  { label: "In Figma", desc: "17 colour variables and 5 components, with auto layout on every frame." },
];

const DIRECTIONS: Direction[] = [
  {
    number: "01",
    name: "Ask first",
    tag: "Taken forward",
    file: "direction-1-ask-first.webp",
    alt: "Home screen with a large message box in the centre, a row of workflow shortcuts below it, and tabs for Needs you, Workflows and Clients above a list of five clients and workflows waiting on a decision, with a client sidebar on the left.",
    items: [
      {
        label: "Idea",
        desc: "Keep today’s home. The message box stays in the middle, and tabs under it (Needs you, Workflows and Clients) answer the brief. The sidebar groups clients by who needs what, so it reads the same with 2 clients or 200.",
      },
      { label: "Gives up", desc: "Seeing the whole book without a click." },
    ],
  },
  {
    number: "02",
    name: "Morning brief",
    file: "direction-2-morning-brief.webp",
    alt: "Home screen opening with a morning greeting from the assistant, three finished tasks, and a numbered list of four decisions, with a right-hand panel listing workflows grouped into across clients and single client.",
    items: [
      {
        label: "Idea",
        desc: "The assistant speaks first. Home is a thread that opens with what changed overnight and one numbered decision card. Workflows sit in a rail on the right, split into across clients and single client.",
      },
      { label: "Gives up", desc: "A blank message box. The pro reads before they type." },
    ],
  },
  {
    number: "03",
    name: "Workflow tabs",
    file: "direction-3-workflow-tabs.webp",
    alt: "Home screen with a row of tabs across the top for the firm thread and four cross-client workflows, a client sidebar with single-client workflows nested under their clients, and a chat thread showing a workflow card.",
    items: [
      {
        label: "Idea",
        desc: "Clients run down the left, and cross-client workflows run across the top as tabs. Single-client workflows sit under their client. Starting a workflow in chat adds a tab, so the pro never loses the firm thread.",
      },
      { label: "Gives up", desc: "Room for more than about five workflow tabs before they overflow." },
    ],
  },
  {
    number: "04",
    name: "Chat and live book",
    file: "direction-4-chat-and-book.webp",
    alt: "Split screen with a chat on the left and a table of eleven clients on the right, with one column per cross-client workflow showing each client’s status at a glance.",
    items: [
      {
        label: "Idea",
        desc: "Chat on the left, and the book of clients on the right as a table the chat can sort and filter. Each cross-client workflow is a column, so one row shows where a client stands across everything.",
      },
      { label: "Gives up", desc: "The calm of a single column. It is the densest of the five." },
    ],
  },
  {
    number: "05",
    name: "Decision queue",
    file: "direction-5-decision-queue.webp",
    alt: "Home screen with a book health bar across the top, a queue of five items waiting on a decision on the left, and the first item open as a thread with three decisions ready to confirm.",
    items: [
      {
        label: "Idea",
        desc: "Home is the list of things only the pro can decide, from clients and workflows alike. Each item opens as a thread with the decision ready. A bar at the top shows the health of the whole book.",
      },
      { label: "Gives up", desc: "Browsing. Clients who need nothing are one click away." },
    ],
  },
];

const OTHER_EXPLORATIONS: Item[] = [
  {
    label: "Cards with chat in a sidebar",
    desc: "Cards were the main thing and chat sat beside them. I did not like it.",
  },
  {
    label: "Chat first, cards on the right",
    desc: "So I flipped it. Chat leads, and the cards sit on the right, where the pro can look across clients and decide what to do.",
  },
  {
    label: "Overview on top, chat below",
    desc: "The overview took the main space and chat sat in the bottom half.",
  },
  {
    label: "A client table",
    desc: "For a big book of clients: a table where you can edit many clients at once.",
  },
  {
    label: "A firm-level dashboard",
    desc: "An overview of everything happening across the firm. I think it is more useful for an admin who oversees several pros than for the pro.",
  },
  {
    label: "A node editor",
    desc: "An idea borrowed from 3D tools. Everything is visual, and you connect nodes to run workflows. It was an interesting way to do it.",
  },
  {
    label: "A board view",
    desc: "Styled like a project tracker, so you can look across clients and see where each one is on its timeline. I do not know how it scales, but it could be one view inside the product.",
  },
  {
    label: "A card-moving board",
    desc: "Cards move between columns, in the style of Trello and Asana. I also tried a more minimal version that keeps the sidebar the product already has.",
  },
  {
    label: "A chat panel with a bottom bar",
    desc: "Taken from the way Figma lays out its chat. I think it could have worked, but I did not have enough context to explore it further.",
  },
  {
    label: "Dark sidebar variants",
    desc: "A few more passes on the same layout, with a dark sidebar and rounder shapes.",
  },
];

const FINAL_DIRECTION: Item[] = [
  {
    label: "Message box first",
    desc: "It stays the priority. Everything runs through chat, typed or by voice.",
  },
  {
    label: "Clients by status",
    desc: "The sidebar groups clients by status, so the list reads the same with a few clients or a lot.",
  },
  {
    label: "Needs you",
    desc: "A list under the message box shows the items waiting on the pro.",
  },
  {
    label: "Workflows one tab away",
    desc: "Running and waiting workflows sit in a tab right next to it, and in a panel on the right.",
  },
  {
    label: "Scoped to one client",
    desc: "Inside a client, the header and the message box both show which client you are in.",
  },
  {
    label: "Decisions stay with the pro",
    desc: "Opening an item from Needs you shows a short message and decision cards, each with Approve and Change. The assistant prepares, and the pro decides.",
  },
  {
    label: "It holds at two clients or two hundred",
    desc: "Needs you stays on top, so a long client list never pushes the work down.",
  },
];

const SMALL_DETAILS: Item[] = [
  {
    label: "Voice",
    desc: "A mic button, as a small interaction to try. I added it because the live product has no voice input.",
  },
  {
    label: "Attachments",
    desc: "You can attach files from the message box.",
  },
  {
    label: "Starting workflows",
    desc: "Shortcuts under the message box start a workflow, or you can open the Workflows tab from the sidebar.",
  },
  {
    label: "Files",
    desc: "A files view lists everything a pro has uploaded.",
  },
];

const TRADEOFFS: Item[] = [
  {
    label: "Ask first",
    desc: "It gives up seeing the whole book without a click. I took that trade because Needs you answers the first question, who needs me, and the sidebar still lists everyone.",
  },
  {
    label: "Morning brief",
    desc: "The pro reads before they type, so chat is no longer the first thing.",
  },
  {
    label: "Workflow tabs",
    desc: "Fine for a few workflows, but tabs overflow past about five. That does not hold as the work grows.",
  },
  {
    label: "Chat and live book",
    desc: "The table is useful, but it is the densest of the five, and a table that big competes with chat for space.",
  },
  {
    label: "Decision queue",
    desc: "It is clear about what needs a decision, but it makes browsing harder.",
  },
  {
    label: "Boards and dashboards",
    desc: "A board might work as one view, but I do not know how it scales. The firm dashboard speaks to admins more than to the pro, so I left both out of the home.",
  },
  {
    label: "Files panel",
    desc: "I think the files have a better place, maybe on the left. But for that, something has to go.",
  },
];

const HOW_I_USED_AI: Item[] = [
  {
    label: "Researcher",
    desc: "I asked Claude to check screenshots of the live product against the usability heuristics, with no product context. It let me stress test the product without digging into every detail.",
  },
  {
    label: "Context",
    desc: "I gave it all the screenshots, so it had the product in front of it while I explored.",
  },
  {
    label: "Rapid prototyping",
    desc: "I made a lot of variations with Claude. I tried each one for one or two clients, and for many.",
  },
  {
    label: "Generating from context",
    desc: "For some of them I had Claude generate screens using what it knew about the product, like the board view.",
  },
  {
    label: "A clickable prototype",
    desc: "I also made a clickable prototype in code. You can select a client, unselect it, run a workflow, then approve or undo. It has a few small differences from the Figma screens.",
  },
  {
    label: "The calls were mine",
    desc: "I chose the final direction, and I decided what to keep and what to drop.",
  },
];

const NEXT_STEPS: Item[] = [
  {
    label: "Learn the field",
    desc: "Learn about the subject matter and get context on how tax work really runs.",
  },
  {
    label: "Learn the users",
    desc: "Sit with product, research and design to find out who the primary and secondary users are.",
  },
  {
    label: "Watch pros work",
    desc: "Watch a few pros work, and test whether Needs you matches how they pick what to open first.",
  },
  {
    label: "Test at scale",
    desc: "Check the layout with real data at 200 clients.",
  },
  {
    label: "What I did not know",
    desc: "Who the users are in detail, how product managers think about the product, what is expected of it, what the business outcomes are and what the north star is.",
  },
];

const STATUS: Item[] = [
  {
    label: "Constraints",
    desc: "I worked alone from a written brief and the existing product and brand material, in a short fixed window, without access to users.",
  },
];

// --- Sections ---

const ContextSection = () => (
  <Section title="Context">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        The product is an AI workspace that tax professionals use to run their practice. It already exists and works. The brief was to rethink how a pro lands and gets oriented when they open it. A few ground rules came with it.
      </Lead>
      <List items={CONTEXT} />
    </div>
  </Section>
);

const ProblemSection = () => (
  <Section title="The Problem">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        The work does not stop after the main filing date. Extensions move the filing date but not the payment date, and clients who owe estimated payments have something due several times a year. Letters from the tax authority arrive by mail, and each one has its own reply date. A pro with many clients is always tracking someone’s deadline.
      </Lead>
      <List items={PROBLEM} />
    </div>
  </Section>
);

const HeuristicSection = () => (
  <Section title="Heuristic Review">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        I got a short trial of the live product, with one client in it. I took screenshots of the screens and the workflows I could reach. Then I used Claude as a researcher. I asked it to check the screenshots against the usability heuristics, with no context about the product. It came back with a few useful findings.
      </Lead>
      <List items={HEURISTICS} />
    </div>
  </Section>
);

const ApproachSection = () => (
  <Section title="Approach">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        The brief made it clear that chat is the main way in. The open question was how a pro gets an overview of what is happening. So I looked at products that treat chat as the main screen but have a lot going on behind it. Most are not in the same space, but they answer the same questions. I asked each one three things: where does chat sit on the home, how do you see work that is already running, and how do you know what the chat is scoped to?
      </Lead>
      <List items={APPROACH} />
    </div>
  </Section>
);

const DesignSystemSection = () => (
  <Section title="Design System">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        The design system came with the brief, so I built on it rather than inventing a new look. This is what it is made of.
      </Lead>
      <List items={DESIGN_SYSTEM} />
    </div>
  </Section>
);

const DirectionsSection = () => (
  <Section title="Directions Explored">
    <div className="space-y-24">
      <div className="space-y-10 max-w-4xl">
        <Lead>
          I did a lot of rapid prototyping with Claude. I made many variations quickly, and looked at each one with one or two clients and with many. These are the five I kept. Each one answers the same question in a different way: what does the pro see first?
        </Lead>
      </div>

      {DIRECTIONS.map((direction) => (
        <article key={direction.number} className="space-y-8">
          <div className="space-y-3 max-w-4xl">
            <span className="text-[13px] uppercase tracking-[0.3em] font-bold text-[var(--muted)]">
              {direction.number}{direction.tag ? ` — ${direction.tag}` : ""}
            </span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">
              {direction.name}
            </h3>
          </div>
          <Shot file={direction.file} alt={direction.alt} height={1920} />
          <div className="max-w-4xl">
            <List items={direction.items} />
          </div>
        </article>
      ))}

      <div className="space-y-10 max-w-4xl">
        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Other Explorations
        </h3>
        <Lead>
          I tried a few more ideas along the way. They did not make the final cut. This is what each one was.
        </Lead>
        <List items={OTHER_EXPLORATIONS} />
      </div>
    </div>
  </Section>
);

const FinalDirectionSection = () => (
  <Section title="Final Direction">
    <div className="space-y-24">
      <div className="space-y-10 max-w-4xl">
        <Lead>
          I went with Ask first. It is not far from today’s home, but it has a lot of small differences. The message box stays in the middle, clients are grouped by status in the sidebar, a Needs you list sits under the message box, and workflows are one tab away.
        </Lead>
        <List items={FINAL_DIRECTION} />
      </div>

      <div className="space-y-16">
        <Shot
          file="home.webp"
          alt="The default home screen of a chat-first workspace for tax professionals: a client sidebar on the left, a large message box under a heading that asks how it can support your firm today, workflow shortcut chips, a list of five items that need the user, and a panel of running workflows on the right."
          label="Home"
          caption="The message box in the middle, workflow shortcuts under it, the Needs you list, and running workflows on the right."
        />
        <Shot
          file="needs-you-thread.webp"
          alt="A thread opened from a Needs you item, showing a short message and three decision cards, each with Approve and Change buttons, above a message box scoped to the same client."
          label="A Needs you item, opened"
          caption="A short message and decision cards. The pro approves or changes each one."
        />
        <Shot
          file="workflows-tab.webp"
          alt="The home screen with the Workflows tab selected, listing running and waiting workflows with progress bars, status pills and next dates, beside the same workflows in the right panel."
          label="Workflows tab"
          caption="Running and waiting workflows with progress, status and the next date."
        />
        <Shot
          file="client-scoped.webp"
          alt="A single client’s thread with a short status message from the assistant, where both the header and the message box are scoped to that one client rather than all clients."
          label="Inside one client"
          caption="The header and the message box both show which client the chat is about."
        />
        <Shot
          file="start-workflow-menu.webp"
          alt="The message box’s start-workflow menu open above the input, listing five workflow templates such as onboarding a client, gathering documents and preparing an extension."
          label="Starting a workflow"
          caption="The menu in the message box lists workflow templates, like onboarding a client or preparing an extension."
        />
      </div>

      <div className="space-y-10 max-w-4xl">
        <Lead>
          A few smaller details I explored on top of the layout.
        </Lead>
        <List items={SMALL_DETAILS} />
      </div>
    </div>
  </Section>
);

const TradeoffsSection = () => (
  <Section title="Tradeoffs">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        Every direction gave something up. This is what each one cost.
      </Lead>
      <List items={TRADEOFFS} />
    </div>
  </Section>
);

const HowIUsedAiSection = () => (
  <Section title="How I Used AI">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        I used Claude for research and for prototyping. It helped me look at the product, and it helped me try ideas fast.
      </Lead>
      <List items={HOW_I_USED_AI} />
    </div>
  </Section>
);

const NextSection = () => (
  <Section title="What I’d Do Next">
    <div className="space-y-10 max-w-4xl">
      <Lead>
        I designed this as a new user, without talking to a single pro, so parts of it could be wrong. This is what I would do first.
      </Lead>
      <List items={NEXT_STEPS} />
    </div>
  </Section>
);

const StatusSection = () => (
  <Section title="Status">
    <div className="space-y-10 max-w-4xl">
      <Lead>Concept work from a written brief. Not shipped, not tested with users.</Lead>
      <List items={STATUS} />
    </div>
  </Section>
);

// --- Main ---

export default function AiTaxWorkspace() {
  return (
    <div className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] min-h-screen transition-colors duration-300">
      <div className="w-full relative">
        <Hero />
        <ContextSection />
        <ProblemSection />
        <HeuristicSection />
        <ApproachSection />
        <DesignSystemSection />
        <DirectionsSection />
        <FinalDirectionSection />
        <TradeoffsSection />
        <HowIUsedAiSection />
        <NextSection />
        <StatusSection />
      </div>
    </div>
  );
}
