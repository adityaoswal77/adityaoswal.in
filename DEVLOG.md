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
