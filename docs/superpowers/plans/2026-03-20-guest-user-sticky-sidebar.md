# Guest User Sticky Stages Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sticky right-rail sidebar to `app/work/guest-user/page.tsx` that shows all design process stages and highlights the active one as the user scrolls.

**Architecture:** Single-file change. Post-hero content is wrapped in a two-column CSS grid. A new `StagesSidebar` component uses `IntersectionObserver` with a `Set` ref to track active section, resolving ties in `STAGES` order. `Section` component gains an optional `id` prop passed to the outer `<section>` element.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS v3, TypeScript. No new dependencies. Verification via `npx tsc --noEmit` and `npm run build`. The file already has `"use client"` at line 1 — hooks (`useState`, `useEffect`) are valid.

**Spec:** `docs/superpowers/specs/2026-03-19-guest-user-sticky-sidebar-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `app/work/guest-user/page.tsx` | Modify | All changes — imports, `Section` type, `STAGES`, `StagesSidebar`, grid wrapper |

No new files created.

---

### Task 1: Update React imports

**Files:**
- Modify: `app/work/guest-user/page.tsx:3`

- [ ] **Step 1: Update the import line**

Find line 3:
```ts
import React, { useRef, useLayoutEffect } from 'react';
```
Replace with:
```ts
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors (no logic changed yet).

- [ ] **Step 3: Commit**

```bash
git add app/work/guest-user/page.tsx
git commit -m "chore: add useState, useEffect imports for sticky sidebar"
```

---

### Task 2: Add `id` prop to `Section` component

**Files:**
- Modify: `app/work/guest-user/page.tsx` — `Section` component (lines ~109–166)

- [ ] **Step 1: Update the `Section` props type and destructuring**

Find:
```ts
const Section = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => {
```
Replace with:
```ts
const Section = ({ title, id, children, className = "" }: { title?: string; id?: string; children: React.ReactNode; className?: string }) => {
```

- [ ] **Step 2: Pass `id` to the outer `<section>` element**

Find the opening `<section` tag inside the `Section` component (it has `ref={sectionRef}` and `aria-labelledby`):
```tsx
    <section
      ref={sectionRef}
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      className={`px-6 py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
```
Replace with:
```tsx
    <section
      id={id}
      ref={sectionRef}
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      className={`px-6 py-32 bg-[var(--background)] border-t border-[var(--border)] transition-colors duration-300 ${className}`}
    >
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/work/guest-user/page.tsx
git commit -m "feat: add optional id prop to Section component for scroll targeting"
```

---

### Task 3: Add `id` props to all `<Section>` call sites

**Files:**
- Modify: `app/work/guest-user/page.tsx` — `GuestEKGRecording` component body (lines ~194–476)

- [ ] **Step 1: Add id props to each Section call**

**Important:** The `id` values are intentionally shortened and do not follow the same slug pattern used for `aria-labelledby` (e.g., "The Problem" → `id="problem"`, not `id="the-problem"`). These ids must match the `STAGES` constant exactly — do not "fix" them to match the aria pattern.

Apply this mapping. Each `<Section` opening tag gets its `id` added:

```tsx
// Before → After for each call site:

<Section title="Context">
// →
<Section title="Context" id="context">

<Section title="Current State" className="bg-[var(--foreground)]/5">
// →
<Section title="Current State" id="current-state" className="bg-[var(--foreground)]/5">

<Section title="The Problem">
// →
<Section title="The Problem" id="problem">

<Section title="Solution Space" className="bg-[var(--foreground)]/5">
// →
<Section title="Solution Space" id="solution-space" className="bg-[var(--foreground)]/5">

<Section title="The Solution">
// →
<Section title="The Solution" id="solution">

<Section title="Process" className="bg-[var(--foreground)]/5">
// →
<Section title="Process" id="process" className="bg-[var(--foreground)]/5">

<Section title="Narrowing the playfield">
// →
<Section title="Narrowing the playfield" id="narrowing">

<Section title="Ideations & Testing" className="bg-[var(--foreground)]/5">
// →
<Section title="Ideations & Testing" id="ideations" className="bg-[var(--foreground)]/5">

<Section title="Outcome">
// →
<Section title="Outcome" id="outcome">

<Section title="Results" className="bg-[var(--foreground)]/5">
// →
<Section title="Results" id="results" className="bg-[var(--foreground)]/5">

<Section title="Learnings & Challenges">
// →
<Section title="Learnings & Challenges" id="learnings">
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/work/guest-user/page.tsx
git commit -m "feat: add scroll-target ids to all Section call sites"
```

---

### Task 4: Add `STAGES` constant and `StagesSidebar` component

**Files:**
- Modify: `app/work/guest-user/page.tsx` — add before the `GuestEKGRecording` default export

- [ ] **Step 1: Add the `STAGES` constant and `StagesSidebar` component**

Insert this block immediately before `// --- Main Component ---` (the comment before `export default function GuestEKGRecording`):

```tsx
// --- Stages Sidebar ---
const STAGES = [
  { id: 'context',        label: 'Context' },
  { id: 'current-state',  label: 'Current State' },
  { id: 'problem',        label: 'Problem' },
  { id: 'solution-space', label: 'Solution Space' },
  { id: 'solution',       label: 'Solution' },
  { id: 'process',        label: 'Process' },
  { id: 'narrowing',      label: 'Narrowing' },
  { id: 'ideations',      label: 'Ideations' },
  { id: 'outcome',        label: 'Outcome' },
  { id: 'results',        label: 'Results' },
  { id: 'learnings',      label: 'Learnings' },
];

const StagesSidebar = () => {
  const [activeSection, setActiveSection] = useState('context');
  const intersectingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingRef.current.add(entry.target.id);
          } else {
            intersectingRef.current.delete(entry.target.id);
          }
        });
        const active = STAGES.find((s) => intersectingRef.current.has(s.id));
        if (active) setActiveSection(active.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    STAGES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Design process stages"
      className="hidden lg:block self-start sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto px-6 py-8"
    >
      <div className="relative flex flex-col gap-5">
        {/* connecting line */}
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[var(--border)]" aria-hidden="true" />

        {STAGES.map((stage) => {
          const isActive = activeSection === stage.id;
          return (
            <button
              key={stage.id}
              aria-label={stage.label}
              aria-current={isActive ? 'step' : undefined}
              onClick={() =>
                document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="relative flex items-center gap-3 text-left group"
            >
              {/* dot */}
              <span
                className={`relative z-10 flex-shrink-0 w-1.5 h-1.5 rounded-full motion-safe:transition-colors motion-safe:duration-300 ${
                  isActive
                    ? 'bg-[var(--foreground)]'
                    : 'border border-[var(--muted)] bg-[var(--background)]'
                }`}
              />
              {/* label */}
              <span
                className={`font-mono text-[14px] uppercase tracking-[0.15em] leading-none motion-safe:transition-opacity motion-safe:duration-300 ${
                  isActive
                    ? 'text-[var(--foreground)] opacity-100'
                    : 'text-[var(--muted)] opacity-40 group-hover:opacity-70'
                }`}
              >
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/work/guest-user/page.tsx
git commit -m "feat: add STAGES constant and StagesSidebar component"
```

---

### Task 5: Wrap post-hero content in two-column grid

**Files:**
- Modify: `app/work/guest-user/page.tsx` — `GuestEKGRecording` return JSX

- [ ] **Step 1: Wrap post-hero content — top of grid**

In `GuestEKGRecording` return, find this exact sequence (lines ~191–194 of the current file):
```tsx
      <div className="w-full relative">
        <Hero />

        <Section title="Context" id="context">
```
Replace with:
```tsx
      <div className="w-full relative">
        <Hero />

        <div className="relative lg:grid lg:grid-cols-[1fr_200px]">
          <div className="min-w-0">
            <Section title="Context" id="context">
```

- [ ] **Step 2: Close the grid — bottom of component**

Find the exact lines at the bottom of the return (lines ~492–494 of the current file, immediately after the "Return to All" `</section>`):
```tsx
        </section>
      </div>
    </div>
```
Replace with:
```tsx
        </section>
          </div>{/* end left column */}
          <StagesSidebar />
        </div>{/* end grid */}
      </div>
    </div>
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: successful build, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/work/guest-user/page.tsx
git commit -m "feat: wrap post-hero content in two-column grid with StagesSidebar"
```

---

### Task 6: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```
If port 3000 is already in use, Next.js will automatically try 3001, 3002, etc. Check the terminal output for the actual URL.

- [ ] **Step 2: Open the page**

Navigate to `http://localhost:3000/work/guest-user`

- [ ] **Step 3: Check the following at `lg` breakpoint (≥1024px)**

- [ ] Sidebar is visible on the right with all 11 stage labels
- [ ] "Context" is active (filled dot, full-opacity label) on page load
- [ ] Scrolling down changes the active stage correctly
- [ ] Scrolling back up changes active stage back correctly
- [ ] Clicking a stage label smooth-scrolls to that section
- [ ] Hero section is unchanged

- [ ] **Step 4: Check mobile (< 1024px)**

- [ ] Sidebar is not visible
- [ ] Page layout is identical to before

- [ ] **Step 5: Check dark mode**

Sidebar dots and labels use CSS vars, so dark mode is automatic. Confirm dots and labels are visible in both light and dark themes.

- [ ] **Step 6: Final commit if any tweaks were made**

```bash
git add app/work/guest-user/page.tsx
git commit -m "fix: visual tweaks from sidebar verification"
```

---

## Done

All tasks complete when:
- `npx tsc --noEmit` passes
- `npm run build` succeeds
- Sidebar visible and interactive at `lg`+, hidden on mobile
- Hero section untouched
