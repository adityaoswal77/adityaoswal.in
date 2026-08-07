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
- **Never write unconfirmed numeric stats** into case-study copy (percentages, dollar figures, counts) — even if a source deck/reference contains them. Structural spec facts (hex codes, px values, a timeline the user stated in chat) are fine; business-impact/narrative numbers need explicit user confirmation first. Default to qualitative language otherwise.
- **Case-study section titles are literal**, naming what the section covers ("Context", "The Problem", "Typography", "Impact") — not punchy marketing/deck-style sentence headlines, even when ported from a source deck.
- Case-study body copy defaults to a paragraph followed by a plain bullet list (bold inline label + sentence, `divide-y` border rhythm — see `app/work/year-in-review/page.tsx` and the `List`/`Quote` helpers in `app/work/kardia-design-system/page.tsx`), not card/grid layouts, unless asked for something richer.

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
- **Homepage Hero backdrop**: dark = `Dither` (WebGL pixel wave). Light = `WarpBackground` (`components/ui/warp-background.tsx`) — a 3D perspective grid tunnel with beams falling toward the vanishing point, `gridColor="var(--border)"` (lavender), beams in the light-persona palette (tangerine pop first, then pastels). Rendered only when `isLight` (`app/page.tsx` Hero backdrop `div`); dark keeps Dither. The CTA/heading accent/badge dot still use the one-off blue (`#2554EB`), not tangerine. `.marker-highlight` and `PastelField.tsx` remain **unused/orphaned** — don't re-wire them into Hero without asking. (Earlier the light hero was a flat `var(--background)` with no animated backdrop; the warp backdrop superseded that on user request.)
- **`WarpBackground` was ported from Tailwind v4 → v3**: the 21st.dev/Magic UI source used v4-only utilities (`size-full`, `bg-size-[]`, `perspective-()`, `transform-3d`, `@container`, `left-(--x)`) — all rewritten as v3 arbitrary properties (`[container-type:size]`, `[perspective:var(--perspective)]`, `[transform-style:preserve-3d]`, `left-[var(--x)]`, etc.). Beams are **deterministic** (delay/aspect/color derived from index, not `Math.random`) to avoid SSR hydration mismatch, and animation is gated on `useReducedMotion`. Import is `framer-motion`, not `motion/react`. Installed via the public Magic UI registry (`https://magicui.design/r/warp-background`) — the 21st.dev URL 404s without auth.
- **`.marker-highlight`** (globals.css): tangerine highlighter sweep behind a headline word; animates in light only, static fill under reduced motion, no-op in dark. Not currently used anywhere (see Hero exception above).
- **Text on tangerine is ink `#2A2438`, never white** — white fails WCAG AA (3.07:1); ink passes (4.86:1).
- Playful touches live in light only: `-rotate-2` sticker chips, `hover:-rotate-1` CTA tilt, `rounded-[1.5rem]` cards (dark stays `1rem`).

### Tailwind gotchas (learned the hard way)

- **Opacity modifiers on CSS vars compile to NOTHING**: `bg-[var(--foreground)]/5` is silently dropped by Tailwind 3. Use theme-paired literals (`bg-[#2A2438]/5 dark:bg-white/5`) or rgba with an `-rgb` channel token.
- **`/8` is not a valid opacity step** — use `/[0.08]`. An invalid `dark:` override lets the light class leak into dark mode.
- Use `motion-safe:animate-bounce` / `motion-safe:animate-pulse`, not the bare utilities.
- `.atmospheric-glow` needs `--primary-rgb` (defined per theme in globals.css).

### Work cards (`app/work/page.tsx`)

- **Light background** = a subtle per-project gradient — light end stops are `color-mix(in srgb, pastel 42%, #FDFBF7)` (pastel blended toward gallery-white so the light side reads airy), middle is the richer `pastelHover`; `background-size:200%_200%` — that **drifts on hover** — `background-position` animates `0% 50%`→`100% 50%` over 1.4s (`cubic-bezier(0.22,1,0.36,1)`, `motion-reduce` disables it). Plus a per-project **accent border**: a static inset ring `${accent}1f` (~12%), and a second light-only inset ring `${accent}4d` (~30%) that fades in on hover. Both are inline `boxShadow` (hex8 alpha — NOT Tailwind `/opacity` on vars, which compiles to nothing). Dark stays surface + accent-tint gradient, untouched. Ink text; plain-text category labels with dot separators (no mono pills).
- Each card shows a **framed mockup screen** anchored to the bottom edge (cropped bleed, rounded top corners, `blur-[3px]` tease). Hover reveal: screen sharpens + rises, description fades in, ink arrow chip appears.
- Mockup path per project = `mockup` in `lib/data.ts`; empty string → `SkeletonScreen` (CSS-drawn fake UI tinted with the project `accent` + `pastel`). Paths ending `.mov`/`.mp4`/`.webm` render as `<video autoPlay loop muted playsInline>` instead of `next/image` — same blur/sharpen hover treatment either way.
- **Two mockup layouts, switched by `mockupBg` in `lib/data.ts`** (`WorkCard.tsx` branches on `hasMockupBg`):
  - **Framed** (`mockupBg` unset/true): white/zinc card frame + shadow, `object-cover object-top`, box `top-[60%] bottom-0`, hover `-translate-y-12 scale-[1.04]`. The asset fills + crops inside the frame.
  - **Frameless** (`mockupBg: false`): no frame, `object-contain object-top` so the whole asset renders uncropped and its bottom half bleeds off the card fold. Box `top-[62%] -bottom-[25rem]`, wider cap `max-w-[520px]`, hover slide `-translate-y-16 scale-[1.03]`. Used by all cards. Tuning knobs: `-bottom-[25rem]` (bleed depth — use an arbitrary value, **not** `-bottom-100`; Tailwind's spacing scale stops at 96, so `-bottom-100` compiles to nothing → box collapses to `height:0` → all mockups vanish), `-translate-y-16` (hover reveal). **Slide budget:** the phone rise = slide + `scale-[1.03]` growth (~18px up on a ~620px phone). Keep total under the static desc→phone gap (~96px on the 500px home card) or the hover description overlaps the mockup — that's why the slide is 16, not 24.

### Rollout status

- ✅ Landing page (`app/page.tsx`): Hero, Collaborations, BentoGrid
- ✅ `/work`: new mockup cards (image + video), filter pills, selection/eyebrow colors
- ✅ Site-wide token sweep: all broken `var()/opacity` classes fixed, selection colors theme-paired, links-page dark hover takeover scoped to `dark:` (Navbar, AdiOs, `/aboutme`, `/playground`, `/links`, `/career-odyssey`, `/work/website-redesign`)
- ✅ Homepage Hero simplified (see Homepage Hero exception above) and `Collaborations` company logos redesigned as an equally-spaced rectangle-card marquee (`components/Collaborations.tsx`)
- ✅ Fabricated pull-quotes removed from all case studies (`year-in-review`, `kardia-design-system`, `website-redesign`, `neon-fintech`); `year-in-review`'s Strategy/Challenge sections simplified from card grids to paragraph + `divide-y` bullet lists
- ✅ `kardia-design-system` fully built out (was a `Hero` + "coming soon" placeholder) — 10 sections ported from the user's Figma deck (`Deck`, fileKey `IQ7NX7hXzlVKWSHyzceL72`, node `729:3610`), rewritten in the site's plain paragraph+bullet convention with literal section titles and no unconfirmed stats; all exhibits now use real exports from `/assets/kardia-ds/` (tutorial-popup variants, before/after buttons, color swatches) — no placeholders remain
- ✅ `kardia-design-system` case study made discoverable — it had a page + `layout.tsx` metadata but was missing from `lib/data.ts` PROJECTS (no `/work` card) and `app/sitemap.ts` (invisible to crawlers); both added. "Kardia" dropped from the visible title everywhere (hero, watermark, tab title, work card) — reads "Design System" only; the route/URL and in-body product references are unchanged. Note: `website-redesign` and `year-in-review` have the same missing-from-PROJECTS/sitemap gap — not fixed yet, flagged for a follow-up if the user wants those surfaced too
- ⏳ Optional deeper playful treatments (beyond tokens) for inner pages if desired
- ⏳ Same card-grid → paragraph+bullets simplification not yet applied beyond the quote sections on `guest-user`, `neon-fintech`, `website-redesign` (their Approach/Impact/Features sections still use grids)
- ✅ Resume link refreshed to the current Google Doc (updated in `next.config.js`'s `/r` redirect, `components/Navbar.tsx`, `components/Footer.tsx`) and the Adi.Os chatbot's knowledge base (`app/api/chat/route.ts`) synced to the updated resume content, with its tone loosened to be more casual/chill
- ✅ `/aboutme` Experience/Skills/Toolstack synced against the current resume — role ownership re-mapped (KardiaStation Mobile + KardiaRx under the current Product Designer role, not Associate), EKG savings figure corrected to resume-confirmed `$200K+`, missing resume skills/tools added

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
