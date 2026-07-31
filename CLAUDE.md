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

## Conventions

- Named exports for all components (no default exports)
- Use `dark:` Tailwind variants for every colored element — dark mode is the default
- Use Framer Motion for interactive/animated components; GSAP for scroll-driven or timeline animations
- No unnecessary comments, docstrings, or type annotations on unchanged code
- Images: always include `alt` text
- Respect `prefers-reduced-motion` for animations
- **Never fabricate quotes/testimonials** — no invented pull-quotes attributed to a role or person ("— Product Lead") on case-study pages. Use only quotes the user explicitly supplies.
- Case-study body copy defaults to a paragraph followed by a plain bullet list (bold inline label + sentence, `divide-y` border rhythm — see `app/work/year-in-review/page.tsx`), not card/grid layouts, unless asked for something richer.

## Theme System — Two Personas

The theme toggle is a **persona switch**, not a color inversion. Both hero backgrounds react to the cursor — dark as pixels, light as paint ("same hand, different tool").

- **Dark (default)** = the design engineer: black, Dither WebGL pixel wave, mono chips, glass surfaces, white text.
- **Light** = the playful designer: pastels + one pop color, `PastelField` gouache blobs, sticker-tilted chips, highlighter sweeps, colored (never gray) shadows.

Wiring: `next-themes` with `attribute="class"` → `.dark`/`.light` on `<html>`; Tailwind `darkMode: 'class'`. Tokens live in `app/globals.css` (`:root` = dark, `.light` overrides).

### Light palette

| Token | Value | Role |
|---|---|---|
| `--background` | `#FDFBF7` | gallery white (not cream) |
| `--foreground` | `#2A2438` | warm violet-ink |
| `--muted` | `#6E6580` | tinted gray |
| `--border` | `#E9E2F2` | lavender-tinted |
| pop | `#FF5C39` | tangerine — CTAs, highlighter, selection, pulse dot |
| pastels | `#FFE8A3` butter · `#CBD5FF` periwinkle · `#FFD6E0` blush · `#D3EEC8` pistachio · `#C7E4FF` sky · `#C9F0DC` mint | blobs, card bases, chips |

Per-project pastels are in `lib/data.ts` (`pastel` / `pastelHover` — flat base, saturated cousin on hover).

### Patterns

- **Authoring rule**: light styles are the default classes, dark keeps the original design behind `dark:` variants (e.g. `hidden dark:block` for black overlays, `dark:hidden` for pastel layers).
- **Homepage Hero exception**: user asked for a plainer look here — light mode is a flat `var(--background)` with no animated backdrop (no gradient/blob field, no highlighter underline), and the CTA/heading accent/badge dot use a one-off blue (`#2554EB`) instead of the tangerine pop color. `PastelField.tsx` and `.marker-highlight` are currently **unused/orphaned** as a result — don't re-wire them into Hero without asking first. Dark hero (`Dither`) is untouched.
- **`.marker-highlight`** (globals.css): tangerine highlighter sweep behind a headline word; animates in light only, static fill under reduced motion, no-op in dark. Not currently used anywhere (see Hero exception above).
- **Text on tangerine is ink `#2A2438`, never white** — white fails WCAG AA (3.07:1); ink passes (4.86:1).
- Playful touches live in light only: `-rotate-2` sticker chips, `hover:-rotate-1` CTA tilt, `rounded-[1.5rem]` cards (dark stays `1rem`).

### Tailwind gotchas (learned the hard way)

- **Opacity modifiers on CSS vars compile to NOTHING**: `bg-[var(--foreground)]/5` is silently dropped by Tailwind 3. Use theme-paired literals (`bg-[#2A2438]/5 dark:bg-white/5`) or rgba with an `-rgb` channel token.
- **`/8` is not a valid opacity step** — use `/[0.08]`. An invalid `dark:` override lets the light class leak into dark mode.
- Use `motion-safe:animate-bounce` / `motion-safe:animate-pulse`, not the bare utilities.
- `.atmospheric-glow` needs `--primary-rgb` (defined per theme in globals.css).

### Work cards (`app/work/page.tsx`)

- Flat pastel base (ink text) in light / dark surface + accent tint in dark; plain-text category labels with dot separators (no mono pills).
- Each card shows a **framed mockup screen** anchored to the bottom edge (cropped bleed, rounded top corners, `blur-[3px]` tease). Hover reveal: screen sharpens + rises, description fades in, ink arrow chip appears.
- Mockup path per project = `mockup` in `lib/data.ts`; empty string → `SkeletonScreen` (CSS-drawn fake UI tinted with the project `accent` + `pastel`). Paths ending `.mov`/`.mp4`/`.webm` render as `<video autoPlay loop muted playsInline>` instead of `next/image` — same blur/sharpen hover treatment either way.

### Rollout status

- ✅ Landing page (`app/page.tsx`): Hero, Collaborations, BentoGrid
- ✅ `/work`: new mockup cards (image + video), filter pills, selection/eyebrow colors
- ✅ Site-wide token sweep: all broken `var()/opacity` classes fixed, selection colors theme-paired, links-page dark hover takeover scoped to `dark:` (Navbar, AdiOs, `/aboutme`, `/playground`, `/links`, `/career-odyssey`, `/work/website-redesign`)
- ✅ Homepage Hero simplified (see Homepage Hero exception above) and `Collaborations` company logos redesigned as an equally-spaced rectangle-card marquee (`components/Collaborations.tsx`)
- ✅ Fabricated pull-quotes removed from all case studies (`year-in-review`, `kardia-design-system`, `website-redesign`, `neon-fintech`); `year-in-review`'s Strategy/Challenge sections simplified from card grids to paragraph + `divide-y` bullet lists
- ⏳ Optional deeper playful treatments (beyond tokens) for inner pages if desired
- ⏳ Same card-grid → paragraph+bullets simplification not yet applied beyond the quote sections on `guest-user`, `kardia-design-system`, `neon-fintech`, `website-redesign` (their Approach/Impact/Features sections still use grids)

## Short Links (`next.config.js` redirects)

- `/r` → Google Doc resume (direct)
- `/resume` → `/?utm_source=resume&utm_medium=document`
- `/linkedin`, `/twitter`, `/instagram`, `/github`, `/luma` → homepage with UTM params

## Adi.Os Chatbot

- **Component**: `components/AdiOs.tsx` — slide-in drawer, powered by `useChat` from `@ai-sdk/react`
- **API route**: `app/api/chat/route.ts` — uses `streamText` + `toTextStreamResponse()` + `TextStreamChatTransport`
- **Model**: `meta/llama-3.1-8b-instruct` via NVIDIA API (`@ai-sdk/openai` with custom base URL)
- **Env var**: `NVIDIA_API_KEY` — set in Vercel for **Production only** (not Development); local `.env.local` will be empty
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
- **MCP** Playwright: browser automation and visual testing — dumps console logs/snapshots/screenshots into `.playwright-mcp/`, which is gitignored; safe to delete anytime
