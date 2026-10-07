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

