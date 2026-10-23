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
- **Light** = Spade-inspired green and white (staging, Oct 2026; replaced the pastel + tangerine "playful designer" persona): white page, mint hero panel, near-black green ink, one lime accent, thin 1px line graphics (grids, corner-ticked label cards, edge rulers), mono labels/CTAs, Faculty Glyphic headings.

Wiring: `next-themes` with `attribute="class"` → `.dark`/`.light` on `<html>`; Tailwind `darkMode: 'class'`. Tokens live in `app/globals.css` (`:root` = dark, `.light` overrides).

### Light palette

| Token | Value | Role |
|---|---|---|
| `--background` | `#FFFFFF` | page |
| `--foreground` | `#090F05` | near-black green ink (also the hard-coded light ink literal, replacing `#2A2438`) |
| `--muted` | `#4A5B38` | olive secondary text |
| `--border` | `#E2EADA` | green-tinted hairline |
| `--mint` | `#F4FAED` | hero panel |
| `--forest` / `--primary` | `#18280E` | primary CTA background, scroll band, card borders |
| `--lime` | `#B2EB76` | the one accent: CTA text on forest, highlighter, selection (text on lime is ink) |

Per-project tints in `lib/data.ts` (`pastel`) are now four greens; `accent` still drives dark mode only.

- **Headings**: `:where(.light) h1, h2` use Faculty Glyphic (single weight, `font-synthesis: none`, so bold/italic utilities render regular). `:where()` keeps specificity low so `font-sans` on writing pages still wins. Dark keeps Instrument Serif. Mono is Geist Mono (loaded in the same Google Fonts import).
- **Line graphics**: `components/LineGraphics.tsx` — `LineCard` (mono label + value, 1px border, corner ticks), `HeroPanel` (light hero backdrop: mint panel, masked 56px grid, edge rulers, label cards that drift on scroll and follow the cursor slightly, `xl+` only). All motion is off under reduced motion. A forest `ScrollBand` section after Collaborations was tried and removed: its label cards repeated the hero's, so the page read as two heroes. Keep hero facts in one place.

### Patterns

- **Authoring rule**: light styles are the default classes, dark keeps the original design behind `dark:` variants (e.g. `hidden dark:block` for black overlays, `dark:hidden` for pastel layers).
- **Homepage Hero backdrop**: dark = `Dither` (WebGL pixel wave). Light = `HeroPanel` from `components/LineGraphics.tsx` (replaced `WarpBackground` and its blur/vignette overlays, which are no longer used on the homepage). Light CTAs are forest `#18280E` with lime mono text; "Product designer" carries a lime highlighter band.
- **Dark hero label cards**: `HeroCardsDark` in `components/LineGraphics.tsx` floats the same four facts as light mode over the Dither (black/glass `bg-black/50 backdrop-blur`, `border-white/20`, violet-300 labels). `LineCard` takes `tone="light" | "dark"`; `useHeroMotion()` (scroll drift + spring pointer follow, off under reduced motion) is shared with `HeroPanel`. `xl+` only, `aria-hidden`, rendered after the backdrop container at `z-[11]` so the bottom frosted band doesn't blur it.
- **`.marker-highlight`** (globals.css): tangerine highlighter sweep behind a headline word; animates in light only, static fill under reduced motion, no-op in dark. Not currently used anywhere (see Hero exception above).
- **Text on lime `#B2EB76` is ink `#090F05`; lime text only on forest `#18280E`** — lime on white fails contrast.
- Light keeps `rounded-[1.5rem]` cards (dark stays `1rem`); the old sticker tilts and CTA hover tilt are gone from the homepage hero.

### Tailwind gotchas (learned the hard way)

- **Opacity modifiers on CSS vars compile to NOTHING**: `bg-[var(--foreground)]/5` is silently dropped by Tailwind 3. Use theme-paired literals (`bg-[#2A2438]/5 dark:bg-white/5`) or rgba with an `-rgb` channel token.
- **`/8` is not a valid opacity step** — use `/[0.08]`. An invalid `dark:` override lets the light class leak into dark mode.
- Use `motion-safe:animate-bounce` / `motion-safe:animate-pulse`, not the bare utilities.
- `.atmospheric-glow` needs `--primary-rgb` (defined per theme in globals.css).
- **`overflow-hidden` word-reveal spans clip descenders** (the J in Faculty Glyphic lost its tail). Give each word span `pb-[0.2em] -mb-[0.2em]` (room for the descender, line spacing unchanged) and start the GSAP reveal at `y: "140%"`, not `110%`, so the taller box still hides the word before it animates in. Used in `app/page.tsx` (BentoGrid), `app/work/page.tsx` and `components/Footer.tsx`.
- **Don't run `npm run build` while `npm run dev` is running.** Both write `.next`; the dev server then fails with `__webpack_modules__[moduleId] is not a function` or `Cannot find module './873.js'`. Stop dev, delete `.next`, restart.
- **Animated/transformed child inside a rounded `overflow-hidden` parent can bleed past the radius on hover** (Chromium compositing quirk — seen on `WorkCard`'s light gradient layer once `group-hover:scale-[...]` was added, corner turned square instead of following the card's rounded clip). Fix: give the animated child its own matching `rounded-[...] dark:rounded-[...]` so it self-clips instead of relying solely on the ancestor's `overflow-hidden`.

### Work cards (`app/work/page.tsx`)

- **Light background** = a soft per-project wash — `linear-gradient(120deg, color-mix(pastel 55%, #FFFFFF), color-mix(pastel 22%, #FFFFFF), color-mix(pastel 55%, #FFFFFF))` on an oversized child (`h-[220%] w-[220%]`) that drifts via `animate-[gradient-drift_14s…]` (9s on hover) and scales only `1.008` on hover (`motion-reduce` disables both). `pastel` per project in `lib/data.ts` is now one of four greens; `pastelHover` is no longer used by the card. The gradient layer keeps its own `rounded-[1.5rem] dark:rounded-[1rem]` so the hover scale self-clips (see the Tailwind gotcha). Borders are forest inset rings `#18280E14` at rest and `#18280E33` on hover (inline `boxShadow`, hex8 alpha — NOT Tailwind `/opacity` on vars). Dark is the surface plus a faint accent gradient (`${accent}26/0a/26`) and `${accent}1f` → `${accent}4d` rings. Ink text; plain-text category labels with dot separators (no mono pills). The tone was deliberately lowered after the first vibrant version read as childlike.
- **Touch**: `[@media(hover:none)]` variants keep the description and arrow chip visible and un-blur the mockup, since there is no hover to reveal them. The arrow chip is a 40px glass circle, not a solid disc.
- Each card shows a **framed mockup screen** anchored to the bottom edge (cropped bleed, rounded top corners, `blur-[2px]` tease). Hover reveal: screen sharpens + rises a little (`-translate-y-6/8/10`, ease-out, no spring), description fades in, arrow chip appears.
- Mockup path per project = `mockup` in `lib/data.ts`; empty string → `SkeletonScreen` (CSS-drawn fake UI tinted with the project `accent` + `pastel`). Paths ending `.mov`/`.mp4`/`.webm` render as `<video autoPlay loop muted playsInline>` instead of `next/image` — same blur/sharpen hover treatment either way.
- **Two mockup layouts, switched by `mockupBg` in `lib/data.ts`** (`WorkCard.tsx` branches on `hasMockupBg`):
  - **Framed** (`mockupBg` unset/true): white/zinc card frame + shadow, `object-cover object-top`, box `top-[60%] bottom-0`, hover `-translate-y-12 scale-[1.04]`. The asset fills + crops inside the frame.
  - **Frameless** (`mockupBg: false`): no frame, `object-contain object-right-top` so the whole asset renders uncropped and its bottom half bleeds off the card fold. Box `top-[62%] -bottom-[25rem]`, wider cap `max-w-[520px]`, hover slide `-translate-y-16 scale-[1.03]`. Used by all cards. Tuning knobs: `-bottom-[25rem]` (bleed depth — use an arbitrary value, **not** `-bottom-100`; Tailwind's spacing scale stops at 96, so `-bottom-100` compiles to nothing → box collapses to `height:0` → all mockups vanish), `-translate-y-16` (hover reveal). **Slide budget:** the phone rise = slide + `scale-[1.03]` growth (~18px up on a ~620px phone). Keep total under the static desc→phone gap (~96px on the 500px home card) or the hover description overlaps the mockup — that's why the slide is 16, not 24. **Object-position is `right-top`, not `top`**: on a wide (`col-span-2`) card, the box's aspect ratio can end up wider than a portrait asset's, and `object-contain` centers by default — that letterboxes a visible gap against the card's rounded right edge. Anchoring right pushes any letterbox gap to the left side instead, where it blends into the card body under the text instead of breaking the edge.

### Rollout status

- ✅ Landing page (`app/page.tsx`): Hero, Collaborations, BentoGrid
- ✅ `/work`: new mockup cards (image + video), filter pills, selection/eyebrow colors
- ✅ Site-wide token sweep: all broken `var()/opacity` classes fixed, selection colors theme-paired, links-page dark hover takeover scoped to `dark:` (Navbar, AdiOs, `/aboutme`, `/playground`, `/links`, `/career-odyssey`, `/work/website-redesign`)
- ✅ Homepage Hero simplified (see Homepage Hero exception above) and `Collaborations` company logos redesigned as an equally-spaced rectangle-card marquee (`components/Collaborations.tsx`)
- ✅ Fabricated pull-quotes removed from all case studies (`year-in-review`, `kardia-design-system`, `website-redesign`, `neon-fintech`); `year-in-review`'s Strategy/Challenge sections simplified from card grids to paragraph + `divide-y` bullet lists
- ✅ `kardia-design-system` fully built out (was a `Hero` + "coming soon" placeholder) — 10 sections ported from the user's Figma deck (`Deck`, fileKey `IQ7NX7hXzlVKWSHyzceL72`, node `729:3610`), rewritten in the site's plain paragraph+bullet convention with literal section titles and no unconfirmed stats; all exhibits now use real exports from `/assets/kardia-ds/` (tutorial-popup variants, before/after buttons, color swatches) — no placeholders remain
- ✅ `kardia-design-system` case study made discoverable — it had a page + `layout.tsx` metadata but was missing from `lib/data.ts` PROJECTS (no `/work` card) and `app/sitemap.ts` (invisible to crawlers); both added. "Kardia" dropped from the visible title everywhere (hero, watermark, tab title, work card) — reads "Design System" only; the route/URL and in-body product references are unchanged. Note: `website-redesign` and `year-in-review` have the same missing-from-PROJECTS/sitemap gap — not fixed yet, flagged for a follow-up if the user wants those surfaced too
- ✅ `kardia-design-system` work card: mockup swapped to `kardia-ds-card.png` (a real device-frame screenshot of the KardiaCare app, replacing the popup-tutorial exhibit), resized `md:col-span-2` → `md:col-span-1` to match Guest User EKG's width, now the first card in `/work`'s second row
- ✅ `kardia-design-system` work card mockup swapped again to `Mockup-DS-crop.png` (a cropped version of the user-supplied `/assets/kardia-ds/Mockup-DS.png` 3D device render) with `mockupFit: "phone"`, matching Guest User EKG's treatment exactly. The raw `Mockup-DS.png` has ~20% built-in transparent/soft-shadow padding around the phone (unlike Guest EKG's `after.png`, which bleeds edge-to-edge with zero padding) — since `object-cover` with `object-top` scales by width with no horizontal crop, that padding renders directly as wasted space instead of getting cropped away, making the phone look ~30% smaller than Guest EKG's despite both cards sharing an identical box size. Fixed by cropping the source PNG itself (via PIL, alpha-threshold ~20 bbox to trim the padding while keeping a soft shadow fringe) rather than patching the shared CSS — the raw asset is left untouched for future re-exports. If retouching this asset again: check `getbbox()` at a few alpha thresholds first, since a naive `alpha > 0` bbox includes the full soft-shadow tail and won't reveal the padding problem.
- ✅ Redesign (Oct 2026): green/white light mode, calmer work cards, dark hero label cards, floating chat card, descender fix, chat model fix — shipped to `main` via PR from `release/redesign`. The three prototype pages (`/directions/*`, `components/directions`, `components/specimens`) exist only on the `staging` branch and are to be deleted there once a direction is chosen.
- ✅ A forest-green dark mode (`#18280E`, then `#0E1A08`) was tried locally and dropped; dark stays black. If revisited: the Dither shader quantizes colour, so a dark green `baseColor` rounds to black — tint with a `mix-blend-screen` overlay and keep `waveColor` channels ≤ ~0.2.
- ⏳ Optional deeper playful treatments (beyond tokens) for inner pages if desired
- ⏳ Same card-grid → paragraph+bullets simplification not yet applied beyond the quote sections on `guest-user`, `neon-fintech`, `website-redesign` (their Approach/Impact/Features sections still use grids)
- ✅ Resume link refreshed to the current Google Doc (updated in `next.config.js`'s `/r` redirect, `components/Navbar.tsx`, `components/Footer.tsx`) and the Adi.Os chatbot's knowledge base (`app/api/chat/route.ts`) synced to the updated resume content, with its tone loosened to be more casual/chill
- ✅ `/aboutme` Experience/Skills/Toolstack synced against the current resume — role ownership re-mapped (KardiaStation Mobile + KardiaRx under the current Product Designer role, not Associate), EKG savings figure corrected to resume-confirmed `$200K+`, missing resume skills/tools added
- ✅ Landing-page perf pass — the `WorkCard` idle-drift gradient (`app/globals.css`, `components/WorkCard.tsx`) animates a `translate3d` transform on an oversized child layer instead of `background-position`, so it composites instead of repainting every card every frame (`gradient-drift` keyframe now sits alongside the pre-existing `background-gradient` one — same visual drift, only the light/dark `WorkCard` gradient layers were switched over, other consumers of `background-gradient` untouched); `WorkCard`'s video mockups (`MockupVideo`) are now `preload="none"` + `IntersectionObserver`-gated instead of bare `autoPlay`, so an off-screen video no longer downloads/decodes on landing-page load; `WanderingCharacter` (mounted globally in `app/layout.tsx`) now positions itself via `translate3d` instead of `style.left/top`, avoiding a layout+repaint of the drop-shadowed sprite on every animation frame on every page; `Dither`'s WebGL context dropped `antialias`/`preserveDrawingBuffer` (the dither pass has no edges to smooth and nothing reads the canvas back); Hero's light-mode edge-fade blur (`app/page.tsx`) gained a `clip-path` cutout over the mask's already-fully-transparent center so `backdrop-filter` has less area to sample, and the bottom frosted-glass band dropped a redundant second `backdrop-blur` layer. Not fixed: `interestingplaces-video.mov` (6.5MB) still needs re-encoding to `.webm` — blocked on `ffmpeg` not being installed on this machine; `Mockup-DS.png` (3.5MB, unreferenced) is intentionally kept full-res for future re-exports, not dead weight.
- ✅ `WanderingCharacter` hover fix — a new "pause here" bubble (docks the character into the chat FAB, same action as the top-right pin toggle) sits below the main speech bubble, hover-only. Fixed two related bugs: the bubble's `mb-2` gap was dead space outside any hoverable element, so crossing it fired a real `mouseleave` mid-click (now `pb-2`, inside the hover box); and the per-frame hover poll (`isPointerOverChar`, checks only the tiny sprite box) was fighting native DOM hover once actually hovering, so it's now gated off while `stateRef.current === "hovering"` and native events (which correctly cover descendants like the bubble) take over. Also: reduced-motion no longer leaves the character's leg-cycle CSS animation running forever after the first hover — `pickNewTarget()` is gated on a `reducedMotionRef` read once at mount, covering every call site (`handleMouseLeave`, `togglePinned`'s unpin branch, `closeChat`'s resume timer).

## Writing + Projects hub

- **Posts** are TSX files in `content/writing/<slug>.tsx` exporting `post: Post` (slug, title, description, date, draft, projects, body JSX). Register each in `ALL_POSTS` in `content/writing/index.ts`. No markdown/MDX parser — don't add one without asking.
- **Drafts** (`draft: true`) show locally and on Vercel previews with a Draft tag, never in production (`VERCEL_ENV`), and are excluded from the sitemap. Publish = set `draft: false` and the real date.
- Writing and /projects pages use the body font (Inter) only: no Instrument Serif headings, no mono labels. The global `h1, h2` rule sets the serif, so writing headings carry `font-sans` and `.post-body h2` sets `font-family: inherit`.
- Post body is styled by `.post-body` in `globals.css` (plain `h2`/`p`/`ul`/`a`); use curly quotes/apostrophes in JSX prose. Section headers are short plain claims (not the literal case-study rule).
- **Post voice**: simple, informal and casual, like talking to a friend. Short sentences, everyday words, no metaphorical or "writerly" phrasing (the user rejected lines like "places worth going out of your way for", "built the machine before the audience", "garage door open"). Same tone for page intros on /writing and /projects.
- `<PostLink slug>` links to another post only once it's published (plain text otherwise). `<Placeholder>[KEY]</Placeholder>` highlights unfilled numbers.
- **Projects** (`/projects`) read `SIDE_PROJECTS` in `lib/data.ts`; a project lists posts whose `projects` includes its slug. Placeholder stats and the Friday email line (`IP_SIGNUP_URL`) are hidden in production until filled.
- Verified facts (Oct 2026, from PostHog/Supabase/Vercel): Interesting Places has 428 places in India and Singapore, with 0 published in Malaysia (7 pending); the Telegram bot is owner-only (not community intake); there is no public email signup yet. The user said to keep Malaysia on the Playground page and in the chatbot; whether it goes back on `/projects` and the posts is still open, so ask before changing either way. The Freshfolios studio went live on freshfolios.com on 2026-10-07 (freshfolios.com repo, PR #2). It has no public teardowns or industry pages: teardowns are a free on-request offer, `/industries` is not built, and `/resources` keeps the Framer/Webflow/Readymag referral links. Don't write claims about those until the user confirms they exist. `/projects` still says Freshfolios is "Relaunching".
- Per-post OG image: `app/writing/[slug]/opengraph-image.tsx` (`next/og`). `/blogs` redirects to `/writing`. Navbar is minimal: Work / Projects / About plus a "More" Headless UI `Menu` dropdown (Writing, Playground, Links); the logo is the Home link. Desktop links show from `md` and only just fit at 768px, so put any new item under More rather than adding a top-level link. Mobile and dropdown panels use a solid `bg-[var(--background)]`, because a `backdrop-blur` nested inside the blurred nav pill doesn't blur the page behind it.

## Short Links (`next.config.js` redirects)

- `/r` → Google Doc resume (direct)
- `/blogs` → `/writing`
- `/resume` → `/?utm_source=resume&utm_medium=document`
- `/linkedin`, `/twitter`, `/instagram`, `/github`, `/luma` → homepage with UTM params

## Adi.Os Chatbot

- **Component**: `components/AdiOs.tsx` — floating card (bottom-right, `md:w-[25rem]`; bottom sheet with a backdrop below `md`), non-modal, Escape closes, powered by `useChat` from `@ai-sdk/react`. `WanderingCharacter.tsx` owns open/close and keeps `ChatFab` on screen as a close button while open. No "Powered by" line
- **API route**: `app/api/chat/route.ts` — `streamText` piped through a hand-built `ReadableStream` (plain text), consumed by `TextStreamChatTransport`
- **Model**: `nv-mistralai/mistral-nemo-12b-instruct` via NVIDIA API (`@ai-sdk/openai` with custom base URL); override with the `NVIDIA_CHAT_MODEL` env var. NVIDIA retires hosted models without much notice — `meta/llama-3.1-8b-instruct` has returned `410 Gone` since 2026-08-26 and silently killed the chat (curl `https://integrate.api.nvidia.com/v1/models` to see what is live). `streamText` reports API errors via `onError` rather than throwing, so the route treats an empty stream as failure and sends the fallback
- **Env vars**: `NVIDIA_API_KEY` — set in Vercel for **Production only** (not Development or Preview, so chat can't answer on staging until it is added there); local `.env.local` (copy `.env.example`, gitignored) starts empty. `NVIDIA_CHAT_MODEL` — optional model override
- **Session limit**: 10 user messages per session
- **Fallback**: if the API errors (retired model, no credits, invalid or missing key), the route injects a humorous message with a LinkedIn link instead of silence. `streamText` does NOT throw on API errors (it calls `onError` and ends `textStream`), so the route treats an empty stream as failure as well as a thrown error
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
