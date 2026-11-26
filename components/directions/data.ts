import { PROJECTS, SIDE_PROJECTS } from "@/lib/data";
import { CHANGELOG } from "@/lib/changelog";

export type PostSummary = { slug: string; title: string; description: string; date: string; draft?: boolean };

export type PageId = "home" | "work" | "projects" | "writing" | "about" | "playground" | "career" | "changelog" | "links";

export const PAGES: { id: PageId; label: string; href: string; key: string }[] = [
  { id: "home", label: "Home", href: "/", key: "H" },
  { id: "work", label: "Work", href: "/work", key: "W" },
  { id: "projects", label: "Projects", href: "/projects", key: "P" },
  { id: "writing", label: "Writing", href: "/writing", key: "R" },
  { id: "about", label: "About", href: "/aboutme", key: "A" },
  { id: "playground", label: "Playground", href: "/playground", key: "G" },
  { id: "career", label: "Career Odyssey", href: "/career-odyssey", key: "O" },
  { id: "changelog", label: "Changelog", href: "/changelog", key: "C" },
  { id: "links", label: "Links", href: "/links", key: "L" },
];

export const PROFILE = {
  name: "Aditya Oswal",
  role: "Product Designer & Design Engineer",
  location: "Bangalore, IN",
  timezone: "Asia/Kolkata",
  status: "Open to work",
  statusDetail: "Freelance · New roles",
  photo: "/assets/aditya.jpg",
  resume: "/r",
};

export const SOCIALS = [
  { label: "LinkedIn", handle: "oswaladitya", href: "https://linkedin.com/in/oswaladitya" },
  { label: "GitHub", handle: "adityaoswal77", href: "https://github.com/adityaoswal77" },
  { label: "X", handle: "@oswaluxd", href: "https://x.com/oswaluxd" },
];

export type WorkKind = "Case study" | "Concept" | "Side project";

export type WorkItem = {
  id: string;
  code: string;
  title: string;
  kind: WorkKind;
  tags: string[];
  description: string;
  href: string;
  mockup: string;
  phone: boolean;
};

const KIND_ORDER: WorkKind[] = ["Case study", "Concept", "Side project"];

function kindOf(category: string | string[]): WorkKind {
  const list = Array.isArray(category) ? category : [category];
  if (list.includes("Concept")) return "Concept";
  if (list.includes("Side Project")) return "Side project";
  return "Case study";
}

export const WORK: WorkItem[] = PROJECTS.map((p) => {
  const tags = (Array.isArray(p.category) ? p.category : [p.category]).filter((t) => t !== "Concept" && t !== "Side Project");
  return {
    id: p.href.split("/").pop() ?? String(p.id),
    code: `AO-${String(p.id).padStart(2, "0")}`,
    title: p.title,
    kind: kindOf(p.category),
    tags: tags.length ? tags : ["Web Design & Dev"],
    description: p.description,
    href: p.href,
    mockup: p.mockup,
    phone: "mockupFit" in p && p.mockupFit === "phone",
  };
}).sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));

export const WORK_GROUPS = KIND_ORDER.map((kind) => ({
  kind,
  label: kind === "Case study" ? "Case studies" : kind === "Concept" ? "Concepts" : "Side projects",
  items: WORK.filter((w) => w.kind === kind),
}));

export { SIDE_PROJECTS };

export const PLAYGROUND = [
  { title: "Freshfolios", description: "A design studio for listed Indian companies.", href: "/playground/freshfolios" },
  { title: "Interesting Places", description: "A handpicked, veg-friendly guide to places to eat.", href: "/playground/interestingplaces" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toMonthIndex(s: string) {
  const [mon, yr] = s.trim().split(" '");
  return (2000 + Number(yr)) * 12 + MONTHS.indexOf(mon);
}

export function monthLabel(index: number) {
  return `${MONTHS[index % 12]} ${Math.floor(index / 12)}`;
}

const RAW_EXPERIENCE = [
  {
    role: "Product Designer",
    company: "AliveCor Inc.",
    period: "Mar '25 – Oct '26",
    description:
      "End-to-end design for KardiaStation Mobile and mobile product design for KardiaRx. Built and scaled the cross-platform Kardia Mobile Design System across iOS and Android. Designed AI-powered internal tools used across teams.",
  },
  {
    role: "Associate Product Designer",
    company: "AliveCor Inc.",
    period: "Nov '23 – Mar '25",
    description:
      "Member experiences for KardiaComplete, covering onboarding, adherence tracking and care coordination. Research and usability testing with a focus on accessibility and regulatory compliance.",
  },
  {
    role: "UX Faculty",
    company: "MIT Pune – Avantika University",
    period: "Jul '24",
    description: "Designed and taught an 'Introduction to UX' course for 2nd-year B.Tech students.",
  },
  {
    role: "Freelance Design Engineer",
    company: "Independent",
    period: "Jul '23 – Dec '23",
    description: "Redesign and Webflow builds for Shiftlinkapp, Aibiliti.co, Dualite.dev and DNG Technologies.",
  },
  {
    role: "UX Designer",
    company: "Wolffkraft Design Studio",
    period: "Aug '22 – Dec '22",
    description: "Delivered veritaslogistics.com in Webflow and supported UX research across client projects.",
  },
  {
    role: "Frontend Developer",
    company: "Embed Design Studio",
    period: "Jun '21 – Jul '21",
    description: "Built the company website with Next.js, React, TypeScript and Tailwind CSS on Vercel.",
  },
  {
    role: "Research & Web Dev Intern",
    company: "Gyrix Technolabs",
    period: "Dec '19 – Jan '20",
    description: "Shipped a landing page for a co-working space in Webflow and proposed a Webflow roadmap.",
  },
];

export const EXPERIENCE = RAW_EXPERIENCE.map((e) => {
  const [from, to] = e.period.split("–");
  const start = toMonthIndex(from);
  return { ...e, start, end: to ? toMonthIndex(to) : start };
});

export const SKILLS = [
  "Product Design", "Product Strategy", "UX Design", "Design Systems", "Interaction Design",
  "User Research", "Usability Testing", "Rapid Prototyping", "Accessibility (WCAG)",
  "Information Architecture", "Design Tokens", "Motion Design", "0-to-1 Product Design",
  "AI-Assisted Design", "React", "Next.js", "TypeScript", "Tailwind CSS", "Webflow", "Supabase", "Vercel",
];

export const TOOLS = ["Figma", "Maze", "Claude", "Adobe Suite", "Webflow", "VS Code", "Framer", "Origami Studio", "UserInterviews"];

export const ACTIVITY = CHANGELOG.map((e) => ({ date: e.date, title: e.title, hash: e.hash }));

export function activityByMonth() {
  const counts = new Map<string, number>();
  for (const e of CHANGELOG) {
    const k = e.date.slice(0, 7);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const keys = [...counts.keys()].sort();
  if (!keys.length) return [];
  const [y0, m0] = keys[0].split("-").map(Number);
  const [y1, m1] = keys[keys.length - 1].split("-").map(Number);
  const out: { key: string; label: string; count: number }[] = [];
  for (let i = y0 * 12 + m0 - 1; i <= y1 * 12 + m1 - 1; i++) {
    const key = `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, "0")}`;
    out.push({ key, label: MONTHS[i % 12], count: counts.get(key) ?? 0 });
  }
  return out;
}

export function formatDay(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
