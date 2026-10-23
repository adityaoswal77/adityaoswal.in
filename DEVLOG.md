# DEVLOG — adityaoswal.in

---

## 2026-03-17

### Audit

**Security**

- All `target="_blank"` links confirmed to have `rel="noopener noreferrer"` ✓
- `dangerouslySetInnerHTML` in `app/layout.tsx` uses `JSON.stringify(jsonLd)` — safe, structured data only ✓
- No `eval()`, no raw `innerHTML` mutations ✓
- 8 npm vulnerabilities (1 moderate, 7 high) — all in dev-only tooling (`ajv`, `flatted`, `glob`, `minimatch` via `eslint-config-next` / `@typescript-eslint`). No runtime exposure. Run `npm audit fix` to resolve.

**Build**

- `npm run build` — ✓ 17 static pages generated, no type errors
- ESLint warnings in `components/fancy/physics/gravity.tsx` (missing/unnecessary `useCallback` deps) — pre-existing, third-party component

**Styling refactor**

- Removed dead `Expertise` component from `app/page.tsx` (progress bars, fake bar chart, hardcoded stat cards — classic template anti-patterns, never rendered)
- Removed dead `Contact` component from `app/page.tsx` (generic 3-field form, never rendered)
- Removed dead `EducationAndRecognition` component from `app/aboutme/page.tsx`
- Cleaned up commented-out JSX blocks and unused imports (`motion`, `Earth`, `Club`, `Component`) in `app/page.tsx`
- `WorkExperience` in `app/aboutme/page.tsx`: replaced card grid (hover indigo glow, colour-shift on heading) with a clean `divide-y` editorial list
- `AboutOverview` in `app/aboutme/page.tsx`: removed `text-indigo-500 underline underline-offset-8` subheadings — replaced with quiet `text-[var(--muted)]` labels; properly quoted the pull-quote

**Net diff**: −250 lines, +20 lines across 3 files

---

## 2026-10-06

### Writing + Projects hub

- Added `/writing` and `/projects`, plus a Friday email line on posts. Posts are TSX files in `content/writing` (no new packages). Drafts are hidden in production via `VERCEL_ENV` and left out of the sitemap.
- Published "428 places, almost no visitors". Two more posts are drafts: the Freshfolios pivot and the shipping playbook.
- Navbar cut to Work / Projects / About plus a More menu (Writing, Playground, Links). Writing and Projects pages use Inter only.
- Rewrote all posts and page intros in a simple, casual voice after the first draft read too writerly.
- Accessibility pass from a subagent UI review. Real bug found: `bg-[var(--card)]/90` compiles to nothing, so the mobile nav pill had no background.

### Facts checked before publishing (PostHog, Supabase, Vercel, 6 Oct)

- Interesting Places: 428 places (India and Singapore; Malaysia has none published, 7 pending), 90 visitors in 30 days, 82 of them direct, 10 concierge requests, about 7 months since the first commit.
- The Telegram bot only accepts the owner. The public submit form has had no submissions. No public email signup exists (one subscriber row, no public insert).
- The `/projects` visitor count and Post 1's numbers are a snapshot and will go stale.

### Open

- Decide whether Malaysia goes back on `/projects` and the posts. It stays on the Playground page and in the Adi.Os chatbot.
- Posts 2 and 3 have placeholders to fill. Post 2 also still says the affiliate content was cut and that teardowns are public; neither matches the live Freshfolios site.
- A Pune city guide may already exist, which affects Post 1's "starting with Bangalore".
- Build a real email signup (Supabase) so the Friday line can go live.
- Pre-existing: `website-redesign` and `year-in-review` are missing from `/work` and the sitemap; `interestingplaces-video.mov` (6.5MB) needs re-encoding to `.webm`.

---

## 2026-10-07

### Freshfolios studio launch (separate repo: adityaoswal77/freshfolios.com)

- Merged the studio redesign to main (PR #2), so freshfolios.com becomes the studio and the old directory homepage moves to `/resources`.
- Copy check before merging: removed two home-page links to unbuilt pages (`/industries`, `/services/investor-relations-website`) and a Services line that pointed to results that don't exist yet. `tsc`, `pnpm build` and `seo:check` pass.
- Left for the owner to confirm: reply-time, 30-day fix-window, fixed-price and team-size wording in `src/data/studio.ts`, and the About page origin line.
- `studio.freshfolios.com` is a separate Vercel project and still needs a redirect to freshfolios.com.

### Projects page

- Added Puzzle Gallery (puzzlegallery.vercel.app) to `/projects`: a searchable list of daily puzzle games. The count (100 puzzles, 12 categories) comes from `data/puzzles.ts` in the puzzle.gallery repo as of 27 Sep, so it needs updating when puzzles are added. Status is "Live", taken from the request rather than checked, because the site is blocked from the sandbox.

---

## 2026-10-23

### Homepage and work redesign

Light mode wasn't getting traction, so the homepage and `/work` were reworked over 16–23 Oct on the `staging` branch and checked as a Vercel Preview, then shipped to `main` through a pull request from `release/redesign`. The prototype pages stayed on `staging`.

- **Three directions first** (16 Oct): built three prototype pages (live specimens, a typographic list, a draggable desk) side by side with three parallel Sonnet agents, from Mobbin and recent.design references (Godly now redirects to recent.design). They were `noindex` and live only on the `staging` branch (`app/directions`, `components/directions`, `components/specimens`); they are not on `main`.
- **Live specimen cards** were tried on `/work` and the homepage and rejected as too bright and childlike. The original `WorkCard` came back, toned down: soft green wash instead of saturated stops, slower drift, fainter borders, gentler hover, glass arrow chip. On touch screens the description and arrow now show without hover.
- **Light mode retheme** (20 Oct), inspired by spade.com: white page, mint hero panel, near-black green ink `#090F05`, forest `#18280E`, one lime accent `#B2EB76`, Faculty Glyphic headings, Geist Mono labels. About 45 files had the old ink, cream, lavender and tangerine hex values swapped. Dark mode is unchanged.
- **Hero line graphics**: `components/LineGraphics.tsx`. A scroll band with the same label cards was added then removed (22 Oct) because it read as a second hero. Dark mode got the same floating cards (23 Oct).
- **Forest dark mode** was tried locally (`#18280E`, then a darker `#0E1A08`) and dropped; dark stays black.
- **Adi.Os chat** is now a floating card instead of a full-height sidebar, modelled on yinyeeho.com's Sesame chat. The chat button stays on screen and becomes a close button while it is open. "Powered by Claude" removed.
- **Clipped "J"**: headings with an `overflow-hidden` word reveal cut off descenders in Faculty Glyphic. Fixed with `pb-[0.2em] -mb-[0.2em]` on each word span and a GSAP start offset of 140%.

### Chat outage

- NVIDIA ended life for `meta/llama-3.1-8b-instruct` on 2026-08-26 and returns `410 Gone`, so the chat has been broken since then on every environment that had a key.
- `streamText` reports API errors through `onError` and ends `textStream` without throwing, so the route's `catch` never ran and the chat showed nothing. An empty stream now counts as failure and sends the fallback message.
- Model is now `nv-mistralai/mistral-nemo-12b-instruct`, overridable with `NVIDIA_CHAT_MODEL`. Checked that it exists on NVIDIA's API (a dummy key gets 403, the old model 410). Not checked end to end: there is no key in the local environment, and the Preview environment may not have one either.

### Dev notes

- A webpack error (`__webpack_modules__[moduleId] is not a function`, then `Cannot find module './873.js'`) came from running `npm run build` while `npm run dev` was running; both write `.next`. Stopping dev, deleting `.next` and restarting fixed it.
- Added `.env.example` and a gitignored `.env.local` placeholder.
- Dark hero cards were checked at 1440x900 and 1280x720: they sit in the side margins, clear of the headline.

### Open

- Merge the release PR once the preview looks right, and add `NVIDIA_API_KEY` to Vercel Production (and Preview) so the chat answers for real.
- Paste a real `NVIDIA_API_KEY` into `.env.local` (and the Vercel Preview environment) and confirm a real chat reply.
- Delete the prototypes from `staging` (`app/directions`, `components/directions`, `components/specimens`) once a direction is chosen.
- Case-study fixes (Year in Review images, unconfirmed stats on Neon Fintech and Website Redesign) are in PR #17, separate from this work.
