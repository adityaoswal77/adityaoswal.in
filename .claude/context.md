# Project Context Snapshot — 2026-03-17

## Site
Personal portfolio for Aditya Oswal — UX Designer, Product Designer, Design Engineer. Based in Bangalore, currently at AliveCor.

## Stack
- Next.js 15.5 (App Router, fully static output)
- React 19, TypeScript
- Tailwind CSS v3 — dark mode default (`darkMode: 'class'`)
- Fonts: Inter (sans), JetBrains Mono (mono)
- Animation: GSAP + ScrollTrigger, Framer Motion
- 3D / WebGL: Three.js, @react-three/fiber, @react-three/drei, Spline
- Physics: Matter.js via custom `Gravity` component
- Deployment: Vercel

## Pages (17 static routes)
| Route | Description |
|---|---|
| `/` | Home — Hero (Dither WebGL bg), Collaborations marquee, BentoGrid projects |
| `/aboutme` | About — Hero, overview, Collaborations, Toolstack, WorkExperience, InteractiveSkills (physics toggle) |
| `/work` | Work index — filterable project grid |
| `/work/guest-user` | Case study |
| `/work/kardia-design-system` | Case study |
| `/work/neon-fintech` | Case study |
| `/work/website-redesign` | Case study |
| `/work/year-in-review` | Case study |
| `/career-odyssey` | Horizontal scroll SVG timeline |
| `/blogs` | Blog index (empty) |
| `/changelog` | Auto-generated git commit timeline |
| `/playground` | Photo lightbox gallery |

## Key Components
- `components/background/Dither.tsx` — WebGL dithered wave with mouse interaction (custom GLSL shaders)
- `components/GradientBlinds.tsx` — WebGL gradient shader effect
- `components/Collaborations.tsx` — Infinite scroll marquee of client/collab logos
- `components/Navbar.tsx` — Scroll-aware logo animation (compress/expand), theme toggle, mobile drawer
- `components/Footer.tsx` — Email copy-to-clipboard, social links
- `components/fancy/physics/gravity.tsx` — Matter.js physics sandbox (used for skills section)
- `lib/data.ts` — PROJECTS array (source of truth for project cards)

## Design Tokens (CSS vars in globals.css)
`--foreground`, `--background`, `--card`, `--border`, `--muted`, `--primary`

## Conventions
- Named exports only (no default exports for components)
- `dark:` Tailwind variants on every coloured element
- Framer Motion for interactions; GSAP for scroll-driven / timeline animations
- Respect `prefers-reduced-motion`
- All external `_blank` links must have `rel="noopener noreferrer"`

## Known Issues / Tech Debt
- 8 npm vulnerabilities in dev tooling (`ajv`, `flatted`, `glob`, `minimatch`) — run `npm audit fix`
- ESLint warnings in `gravity.tsx` (useCallback deps) — third-party component, low priority
- `blogs/page.tsx` — empty, no posts yet
- `/work/kardia-design-system`, `/work/neon-fintech`, `/work/website-redesign`, `/work/year-in-review` — placeholder case studies (using `case-study-placeholder.tsx`)