# adityaoswal.in

Personal portfolio for [Aditya Oswal](https://adityaoswal.in) — Product Designer & Design Engineer based in Bangalore. Currently at AliveCor.

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v3, dark mode default (`darkMode: 'class'`)
- **Fonts**: Inter (body), Geist (small headings), Instrument Serif (dark headings), Faculty Glyphic (light headings), Geist Mono (mono)
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
  api/chat/           # Adi.Os chat endpoint (NVIDIA API, streamed)
  links/              # Links page
  layout.tsx          # Root layout (Navbar, Footer, WanderingCharacter, ThemeProvider)
components/
  AdityaHoverText.tsx # Per-letter hover → image effect in hero
  WanderingCharacter.tsx # Pixel art character that wanders all pages
  Footer.tsx          # Footer with warm gradient + nav columns
  Navbar.tsx          # Sticky nav: Work / Projects / About + More menu, theme toggle
  AdiOs.tsx           # Floating chat card (bottom-right; bottom sheet on mobile)
  LineGraphics.tsx    # Hero label cards + light hero panel (grid, rulers)
  WorkCard.tsx        # Work card: per-project tint, hover reveal, mockup
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
- **Dither background** — WebGL dither effect on the dark hero that reacts to mouse
- **Dark/light mode** — dark default (black, mono, glass). Light is green and white: white page, mint hero panel, forest `#18280E` buttons with a lime `#B2EB76` accent, thin line graphics and Faculty Glyphic headings
- **Hero label cards** — corner-ticked cards (role, company, focus, location) float over both heroes at `xl+`, drift on scroll and follow the cursor slightly
- **Adi.Os chat** — floating chat card, powered by the NVIDIA API, 10 messages per session, with a fallback message if the API fails

## Environment

Copy `.env.example` to `.env.local` (gitignored) and restart `npm run dev`.

- `NVIDIA_API_KEY` — the Adi.Os chat. Without it the chat shows its fallback message. In Vercel it is set for Production only, so add it to Preview to test chat on staging.
- `NVIDIA_CHAT_MODEL` — optional model override. Defaults to `nv-mistralai/mistral-nemo-12b-instruct`. NVIDIA retires hosted models (the previous one returned `410 Gone` from 2026-08-26), so check `curl https://integrate.api.nvidia.com/v1/models` when chat stops answering.
- `BLOB_READ_WRITE_TOKEN` — optional, logs chat questions to Vercel Blob.

Don't run `npm run build` while `npm run dev` is running: both write to `.next`, and the dev server then fails with `__webpack_modules__[moduleId] is not a function` or `Cannot find module './873.js'`. Stop dev, delete `.next`, and start it again.

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
