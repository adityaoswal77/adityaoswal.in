# adityaoswal.in

Personal portfolio for [Aditya Oswal](https://adityaoswal.in) — Product Designer & Design Engineer based in Bangalore. Currently at AliveCor.

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v3, dark mode default (`darkMode: 'class'`)
- **Fonts**: Inter (sans), JetBrains Mono (mono)
- **Animation**: GSAP, Framer Motion
- **3D / Physics**: Three.js, @react-three/fiber, @react-three/drei, Matter.js
- **Deployment**: Vercel

## Project Structure

```
app/
  page.tsx            # Home (hero, collaborations, bento grid)
  aboutme/            # About page (bio, experience, skills, toolstack)
  work/               # Work index
  work/[slug]/        # Case study pages
  playground/         # Side projects gallery and case study pages
  writing/            # Writing list, post pages, per-post OG image
  projects/           # Side projects: status, number, links, related posts
  blogs/              # Redirects to /writing
  career-odyssey/     # Career timeline
  changelog/          # Site changelog
  links/              # Links page
  layout.tsx          # Root layout (Navbar, Footer, WanderingCharacter, ThemeProvider)
components/
  AdityaHoverText.tsx # Per-letter hover → image effect in hero
  WanderingCharacter.tsx # Pixel art character that wanders all pages
  Footer.tsx          # Footer with warm gradient + nav columns
  Navbar.tsx          # Sticky nav: Work / Projects / About + More menu, theme toggle
  writing/            # PostList, PostLink, Placeholder, SubscribeLine
  Collaborations.tsx
  GradientBlinds.tsx
content/
  writing/            # One TSX file per post, registered in index.ts
lib/
  data.ts             # Project/work data and SIDE_PROJECTS
public/
  Aditya/             # Per-letter images for hover effect (A1-A2, D1-D2, etc.)
  assets/             # Project images, OG image
```

## Commands

```bash
npm run dev       # Start dev server → localhost:3000
npm run build     # Production build
npm run lint      # ESLint
npx tsc --noEmit  # Type check
vercel --prod     # Deploy to production
```

## Features

- **Wandering character** — small pixel art figure roams every page; hover to trigger speech bubble
- **Hover letter images** — each letter in "Aditya" on the hero swaps to a photo on hover
- **Physics skills** — Core Skills section has a Matter.js gravity sandbox (toggle between physics and list view)
- **Dither background** — WebGL dither effect on hero that reacts to mouse
- **Dark/light mode** — dark default; light mode uses warm beige palette (#FAF8F5)

## Writing

Posts live in `content/writing/<slug>.tsx` and export a `post` with a slug, title, description, date, optional `draft` and `projects`, and a JSX body. Add the post to `ALL_POSTS` in `content/writing/index.ts`. Drafts show locally and on Vercel previews, never in production. To publish, set `draft: false` and the real date. No markdown parser is used.

## Conventions

- Named exports for all components
- `dark:` Tailwind variants on every colored element
- Framer Motion for interactive animations; GSAP for scroll-driven timelines
- Respect `prefers-reduced-motion`
- Images always include `alt` text

## Links

- Site: [adityaoswal.in](https://adityaoswal.in)
- Twitter: [@oswaluxd](https://twitter.com/oswaluxd)
- LinkedIn: [oswaladitya](https://linkedin.com/in/oswaladitya)
