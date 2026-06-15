# adityaoswal.in — Claude Code Context

Personal portfolio site for Aditya Oswal — UX Designer, Product Designer, and Design Engineer based in Bangalore. Currently at Alivecor.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type check
vercel --prod    # deploy to production
```

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v3, `darkMode: 'class'`, default theme is dark
- **Fonts**: Inter (sans), JetBrains Mono (mono)
- **Animation**: GSAP, Framer Motion
- **3D**: Three.js, @react-three/fiber, @react-three/drei, Spline
- **Physics**: Matter.js, @react-three/rapier
- **Deployment**: Vercel

## Project Structure

```text
app/           # Next.js App Router pages
  page.tsx     # Home
  aboutme/
  work/
  blogs/
  career-odyssey/
  changelog/
  playground/
  layout.tsx   # Root layout (Navbar, Footer, ThemeProvider, Analytics)
components/    # Shared React components
lib/           # Utilities
public/        # Static assets
```

## Conventions

- Named exports for all components (no default exports)
- Use `dark:` Tailwind variants for every colored element — dark mode is the default
- Use Framer Motion for interactive/animated components; GSAP for scroll-driven or timeline animations
- No unnecessary comments, docstrings, or type annotations on unchanged code
- Images: always include `alt` text
- Respect `prefers-reduced-motion` for animations

## Short Links (`next.config.js` redirects)

- `/r` → Google Doc resume (direct)
- `/resume` → `/?utm_source=resume&utm_medium=document`
- `/linkedin`, `/twitter`, `/instagram`, `/github`, `/luma` → homepage with UTM params

## Adi.Os Chatbot

- **Component**: `components/AdiOs.tsx` — slide-in drawer, powered by `useChat` from `@ai-sdk/react`
- **API route**: `app/api/chat/route.ts` — uses `streamText` + `toTextStreamResponse()` + `TextStreamChatTransport`
- **Model**: `claude-haiku-4-5-20251001` via `@ai-sdk/anthropic`
- **Env var**: `ANTHROPIC_API_KEY` — set in Vercel for **Production only** (not Development); local `.env.local` will be empty
- **Session limit**: 10 user messages per session
- **Fallback**: if the API errors (no credits, invalid key), the stream catches the error and injects a humorous message with a LinkedIn link instead of silence
- **Blob logging**: chat questions logged to Vercel Blob (`BLOB_READ_WRITE_TOKEN` required); non-critical, failures are swallowed

## SEO / Metadata

- Site URL: `https://adityaoswal.in`
- OG image: `/assets/aditya.jpg`
- Twitter: `@oswaluxd`
- Each page should export its own `metadata` object using Next.js `title.template`

## Claude Code Automations

- **Hook**: TypeScript type-check runs after every file edit
- **Skill** `/new-component`: scaffold a Tailwind + Framer Motion component
- **Skill** `/deploy`: runs `vercel --prod`
- **Subagent** `ui-reviewer`: audits components for a11y, dark mode, responsive design
- **MCP** context7: live docs for Next.js, React, Framer Motion, Three.js, etc.
- **MCP** Playwright: browser automation and visual testing
