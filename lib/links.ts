export type Bookmark = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: BookmarkCategory;
  tags?: string[];
};

export type BookmarkCategory =
  | "Design"
  | "Engineering"
  | "Tools"
  | "Reading"
  | "Inspiration"
  | "AI";

export const BOOKMARK_CATEGORIES: BookmarkCategory[] = [
  "Design",
  "Engineering",
  "Tools",
  "Reading",
  "Inspiration",
  "AI",
];

// --- Communities ---

export type Community = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  tags: string[];
  memberBadge: string;
  inviteUrl?: string;
  specialEffect?: "animated-gradient";
};

export const COMMUNITIES: Community[] = [
  {
    id: "c1",
    title: "Cognition",
    tagline: "Content marketing frameworks for builders",
    description:
      "Actionable content, growth, and monetization frameworks delivered 2× a week. Built for designers and creators who want their work to get seen. I'm a member — DM me for an invite link and a discount.",
    url: "https://readcognition.com/",
    tags: ["Newsletter", "Growth", "Content"],
    memberBadge: "Member",
  },
  {
    id: "c2",
    title: "UI Collective",
    tagline: "A community of designers helping designers",
    description:
      "Expert-led courses, portfolio templates, and a vibrant community where designers learn, share, and build incredible careers. I'm a member — DM me for an invite and a discount.",
    url: "https://uicollective.co/",
    tags: ["Design", "Community", "Career"],
    memberBadge: "Member",
  },
  {
    id: "c3",
    title: "Network School",
    tagline: "Learn, Burn, and Earn — globally",
    description:
      "A global community for building startups, skills, and health through programs, events, and on-site residencies. Use my invite link to join directly.",
    url: "https://ns.com/adityaoswal/invite",
    inviteUrl: "https://ns.com/adityaoswal/invite",
    tags: ["Community", "Startups", "IRL"],
    memberBadge: "Member",
  },
];

export const BOOKMARKS: Bookmark[] = [
  // Design
  {
    id: "1",
    title: "Refactoring UI",
    description:
      "Practical design tips and techniques for developers and designers to make UIs look better.",
    url: "https://www.refactoringui.com/",
    category: "Design",
    tags: ["UI", "Fundamentals"],
  },
  {
    id: "2",
    title: "Laws of UX",
    description:
      "A collection of best practices that designers can consider when building user interfaces.",
    url: "https://lawsofux.com/",
    category: "Design",
    tags: ["UX", "Principles"],
  },
  {
    id: "3",
    title: "Mobbin",
    description:
      "The world's largest mobile & web app design reference library.",
    url: "https://mobbin.com/",
    category: "Design",
    tags: ["Mobile", "Reference"],
  },
  {
    id: "4",
    title: "Figma Community",
    description:
      "Explore thousands of templates, plugins, and design resources from the Figma community.",
    url: "https://www.figma.com/community",
    category: "Design",
    tags: ["Figma", "Resources"],
  },
  {
    id: "5",
    title: "Typewolf",
    description: "What's trending in type — curated font pairings and typography inspiration.",
    url: "https://www.typewolf.com/",
    category: "Design",
    tags: ["Typography"],
  },
  {
    id: "6",
    title: "Realtime Colors",
    description:
      "Visualize your color palette and fonts live on a real-world UI.",
    url: "https://www.realtimecolors.com/",
    category: "Design",
    tags: ["Color", "Tools"],
  },
  {
    id: "7",
    title: "Layers",
    description:
      "A curated gallery of the most beautiful and thoughtfully designed digital products.",
    url: "https://layers.to/",
    category: "Design",
    tags: ["Portfolio", "Inspiration"],
  },
  {
    id: "8",
    title: "Shadcn UI",
    description:
      "Beautifully designed UI components built with Tailwind CSS and Radix UI.",
    url: "https://ui.shadcn.com/",
    category: "Design",
    tags: ["Components", "Tailwind"],
  },

  // Engineering
  {
    id: "9",
    title: "Josh W Comeau",
    description:
      "Interactive deep-dives into CSS, JavaScript, and React — making frontend concepts click.",
    url: "https://www.joshwcomeau.com/",
    category: "Engineering",
    tags: ["CSS", "React"],
  },
  {
    id: "10",
    title: "CSS Tricks",
    description: "Daily articles about CSS, HTML, JavaScript, and all things related to web design.",
    url: "https://css-tricks.com/",
    category: "Engineering",
    tags: ["CSS", "Reference"],
  },
  {
    id: "11",
    title: "Framer Motion Docs",
    description: "A production-ready motion library for React — complete API reference.",
    url: "https://www.framer.com/motion/",
    category: "Engineering",
    tags: ["Animation", "React"],
  },
  {
    id: "12",
    title: "GSAP",
    description: "The gold standard JavaScript animation library — used by major studios worldwide.",
    url: "https://gsap.com/",
    category: "Engineering",
    tags: ["Animation", "JS"],
  },
  {
    id: "13",
    title: "Next.js Docs",
    description: "Official documentation for Next.js — the React framework for production.",
    url: "https://nextjs.org/docs",
    category: "Engineering",
    tags: ["Next.js", "React"],
  },
  {
    id: "14",
    title: "Three.js",
    description: "JavaScript 3D library — the easiest way to create 3D on the web.",
    url: "https://threejs.org/",
    category: "Engineering",
    tags: ["3D", "WebGL"],
  },

  // Tools
  {
    id: "15",
    title: "Notch",
    description: "Design and build high-performance animations and visual effects for the web.",
    url: "https://notchfx.com/",
    category: "Tools",
    tags: ["Animation", "Design"],
  },
  {
    id: "16",
    title: "Ray.so",
    description:
      "Create beautiful images of your code to share with others.",
    url: "https://ray.so/",
    category: "Tools",
    tags: ["Code", "Snippets"],
  },
  {
    id: "17",
    title: "Warp Terminal",
    description: "The AI-powered terminal reimagined from the ground up to make developers more productive.",
    url: "https://www.warp.dev/",
    category: "Tools",
    tags: ["Terminal", "Dev"],
  },
  {
    id: "18",
    title: "Coolors",
    description: "Super fast color palette generator — create, explore and share beautiful palettes.",
    url: "https://coolors.co/",
    category: "Tools",
    tags: ["Color", "Design"],
  },
  {
    id: "19",
    title: "Shots.so",
    description: "Create amazing mockups for your screenshots, effortlessly.",
    url: "https://shots.so/",
    category: "Tools",
    tags: ["Mockups", "Design"],
  },

  // Reading
  {
    id: "20",
    title: "The Design of Everyday Things",
    description:
      "Don Norman's seminal book on human-centered design and why certain designs feel intuitive.",
    url: "https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654",
    category: "Reading",
    tags: ["Books", "UX"],
  },
  {
    id: "21",
    title: "Shape Up",
    description:
      "Basecamp's approach to product development — stop running in circles and ship work that matters.",
    url: "https://basecamp.com/shapeup",
    category: "Reading",
    tags: ["Product", "Process"],
  },
  {
    id: "22",
    title: "Paul Graham Essays",
    description:
      "Essays on startups, technology, and life by Y Combinator co-founder Paul Graham.",
    url: "http://paulgraham.com/articles.html",
    category: "Reading",
    tags: ["Essays", "Startups"],
  },
  {
    id: "23",
    title: "Stripe Press",
    description: "Books about economic and technological advancement that shape civilization.",
    url: "https://press.stripe.com/",
    category: "Reading",
    tags: ["Books", "Business"],
  },

  // Inspiration
  {
    id: "24",
    title: "Awwwards",
    description: "Awards website recognizing the best design, creativity and innovation on the internet.",
    url: "https://www.awwwards.com/",
    category: "Inspiration",
    tags: ["Web Design", "Awards"],
  },
  {
    id: "25",
    title: "Godly",
    description: "Heaven's best website designs, curated daily.",
    url: "https://godly.website/",
    category: "Inspiration",
    tags: ["Web Design"],
  },
  {
    id: "26",
    title: "Cosmos",
    description: "A bookmarking tool for inspiration — visual moodboard for creatives.",
    url: "https://www.cosmos.so/",
    category: "Inspiration",
    tags: ["Moodboard", "Visual"],
  },
  {
    id: "27",
    title: "Are.na",
    description: "A platform for connecting ideas and building knowledge in an intentional way.",
    url: "https://www.are.na/",
    category: "Inspiration",
    tags: ["Research", "Ideas"],
  },
  {
    id: "28",
    title: "Land-book",
    description: "Product landing pages gallery — browse the best landing page designs.",
    url: "https://land-book.com/",
    category: "Inspiration",
    tags: ["Landing Pages"],
  },

  // AI
  {
    id: "29",
    title: "Cursor",
    description: "The AI-first code editor built for engineering productivity.",
    url: "https://www.cursor.com/",
    category: "AI",
    tags: ["Coding", "LLM"],
  },
  {
    id: "30",
    title: "v0 by Vercel",
    description: "Generate UI components from text prompts using AI — ship faster.",
    url: "https://v0.dev/",
    category: "AI",
    tags: ["UI Generation", "Vercel"],
  },
  {
    id: "31",
    title: "Perplexity",
    description: "An AI-powered answer engine that provides accurate, trusted, and real-time answers.",
    url: "https://www.perplexity.ai/",
    category: "AI",
    tags: ["Search", "Research"],
  },
  {
    id: "32",
    title: "Galileo AI",
    description: "Describe your UI in plain language and generate delightful designs instantly.",
    url: "https://www.usegalileo.ai/",
    category: "AI",
    tags: ["Design Gen", "UI"],
  },
  {
    id: "33",
    title: "Luma AI",
    description: "Dream Machine — generate high-quality, realistic videos from text and images.",
    url: "https://lumalabs.ai/dream-machine",
    category: "AI",
    tags: ["Video", "Generative"],
  },
  {
    id: "34",
    title: "Claude AI",
    description: "The most capable and safe AI assistant, developed by Anthropic.",
    url: "https://claude.ai",
    category: "AI",
    tags: ["LLM", "Research"],
  },
  {
    id: "35",
    title: "Wisprflow",
    description: "The next generation of voice-to-text AI, making communication seamless.",
    url: "https://wisprflow.ai",
    category: "AI",
    tags: ["Voice", "Productivity"],
  },
  {
    id: "36",
    title: "Flow",
    description: "Google's AI-first creative studio for cinematic video and narrative storytelling.",
    url: "https://flow.google.com",
    category: "AI",
    tags: ["Video", "Creative"],
  },
  {
    id: "37",
    title: "Stitch",
    description: "Google's AI UI designer — generate high-fidelity interfaces and code from prompts.",
    url: "https://stitch.withgoogle.com",
    category: "AI",
    tags: ["UI Gen", "Dev"],
  },
  {
    id: "38",
    title: "Lovable",
    description: "The ultimate AI full-stack engineer — build and deploy apps in seconds.",
    url: "https://lovable.dev/invite/S2ZM3VT",
    category: "AI",
    tags: ["App Gen", "Fullstack"],
  },
];
