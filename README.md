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
  playground/         # Side projects gallery
  blogs/              # Blog posts
  career-odyssey/     # Career timeline
  changelog/          # Site changelog
  links/              # Links page
  layout.tsx          # Root layout (Navbar, Footer, WanderingCharacter, ThemeProvider)
components/
  AdityaHoverText.tsx # Per-letter hover → image effect in hero
  WanderingCharacter.tsx # Pixel art character that wanders all pages
  Footer.tsx          # Footer with warm gradient + nav columns
  Navbar.tsx          # Sticky nav with theme toggle
  Collaborations.tsx
  GradientBlinds.tsx
lib/
  data.ts             # Project/work data
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
