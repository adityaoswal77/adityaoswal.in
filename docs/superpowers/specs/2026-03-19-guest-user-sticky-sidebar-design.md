# Sticky Stages Sidebar — Guest User Case Study Page

**Date:** 2026-03-19
**File:** `app/work/guest-user/page.tsx`
**Status:** Draft

---

## Goal

Add a sticky right-rail sidebar to the guest-user case study page that shows the stages of the design process. As the user scrolls, the active stage highlights. Clicking a stage label scrolls to that section. Inspired by the Figma help page layout (sticky section navigator on the right).

The hero section is NOT modified.

---

## Layout Structure

Everything below the `<Hero />` component (all `<Section>` calls and the final footer `<section>`) gets wrapped in a two-column grid container:

```jsx
<div className="relative lg:grid lg:grid-cols-[1fr_200px]">
  <div className="min-w-0">
    {/* all Section components */}
    {/* footer "Return to All" section */}
  </div>
  <StagesSidebar />
</div>
```

- Left column: `min-w-0` prevents overflow at browser zoom; contains all existing `<Section>` components and the footer `<section>`, unchanged in structure. The footer call-to-action is **inside** the left column, not full-bleed.
- Right column: `<StagesSidebar />`, `hidden lg:block`, `self-start sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto` — `self-start` prevents the grid child from stretching to the full left-column height, which would break the sticky behavior
- No changes to max-width or padding of individual sections

---

## Section ID Props

The `<Section>` component accepts an optional `id?: string` prop. This `id` is applied to the **outer `<section>` element** (for scroll targeting), while the existing `aria-labelledby` id on the inner `<h2>` remains unchanged.

The `Section` props type and destructuring must be updated:
```ts
// Before
{ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }

// After
{ title, id, children, className = "" }: { title?: string; id?: string; children: React.ReactNode; className?: string }
```

Example of the updated `<section>` element signature:
```jsx
<section
  id={id}  // new — scroll target id, e.g. "context"
  ref={sectionRef}
  aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
  // ...
>
```

Each `<Section>` call gets an `id` prop:

| Section title            | id                  |
|--------------------------|---------------------|
| Context                  | `context`           |
| Current State            | `current-state`     |
| The Problem              | `problem`           |
| Solution Space           | `solution-space`    |
| The Solution             | `solution`          |
| Process                  | `process`           |
| Narrowing the playfield  | `narrowing`         |
| Ideations & Testing      | `ideations`         |
| Outcome                  | `outcome`           |
| Results                  | `results`           |
| Learnings & Challenges   | `learnings`         |

---

## React Imports

The existing import line:
```ts
import React, { useRef, useLayoutEffect } from 'react';
```
must be updated to:
```ts
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
```

`useState` and `useEffect` are required by `StagesSidebar`.

---

## StagesSidebar Component

New component defined in the same file (`page.tsx`).

### Stage list

```ts
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
]
```

### Scroll tracking

- `useEffect` sets up a single `IntersectionObserver` watching all section ids
- Use `rootMargin: "-20% 0px -60% 0px"` and `threshold: 0` to trigger when a section enters the middle band of the viewport — this correctly handles tall sections that can never reach a percentage-of-element threshold in a smaller viewport
- `activeSection` state (`string`) holds the current active id, initialized to `'context'`
- Observer cleaned up on unmount

Use a `useRef` Set to track all currently-intersecting section ids and always resolve the active stage to the first one in `STAGES` order. This correctly handles simultaneous entries during both downward and upward scroll:

```ts
const intersectingRef = useRef<Set<string>>(new Set());

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersectingRef.current.add(entry.target.id);
      } else {
        intersectingRef.current.delete(entry.target.id);
      }
    });
    // Pick the topmost intersecting stage in STAGES order
    const active = STAGES.find((s) => intersectingRef.current.has(s.id));
    if (active) setActiveSection(active.id);
  },
  { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
);

// Attach observer — null-guard required; a missing id silently skips, not throws
STAGES.forEach((s) => {
  const el = document.getElementById(s.id);
  if (el) observer.observe(el);
});
```

### Visual structure

- Sidebar positioned: `self-start sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto` (applied on the `<StagesSidebar>` wrapper or its outermost element)
- Padding: `px-6 py-8` — compact navigator, no attempt to visually align with section content start (reliable alignment across viewport heights is not possible via padding alone)
- Vertical list, each item: dot + label side by side, `gap-3`
- Thin `1px` vertical line in `var(--border)` running through dot centers (absolutely positioned behind)
- Active item: filled dot `w-1.5 h-1.5 bg-[var(--foreground)]`, label `opacity-100 text-[var(--foreground)]`
- Inactive items: hollow dot `w-1.5 h-1.5 border border-[var(--muted)]`, label `opacity-40 text-[var(--muted)]`
- Typography: `font-mono text-[14px] uppercase tracking-[0.15em]` — note: `text-[11px]` is overridden to 14px by a global CSS rule in `globals.css`, so `text-[14px]` is used explicitly
- Transitions: `motion-safe:transition-colors motion-safe:duration-300` on dot, `motion-safe:transition-opacity motion-safe:duration-300` on label — uses Tailwind's `motion-safe:` prefix to respect `prefers-reduced-motion` (no global handler exists in the project)

### Click to jump

```ts
onClick={() => document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })}
```

### Accessibility

- Sidebar wrapped in `<nav aria-label="Design process stages">`
- Each item is a `<button>` with `aria-label={stage.label}`
- `aria-current="step"` on the active stage button (most semantically correct for sequential design process steps)

### Reduced motion

Handled via the `motion-safe:` Tailwind prefix on all transition classes (see Visual structure above). No global handler exists in the project; the prefix ensures no transitions fire when the OS motion preference is set to reduce.

### Mobile

- Sidebar column is `hidden lg:block` — not shown on mobile or tablet
- No mobile fallback in this iteration

---

## Files Changed

| File | Change |
|------|--------|
| `app/work/guest-user/page.tsx` | Update React imports; add `id` prop to `Section` component; add `StagesSidebar` component; wrap post-hero content in two-column grid |

No new files required.

---

## Out of Scope

- Mobile sticky progress indicator
- Animated line fill tracking scroll progress
- Sidebar on other case study pages (this is guest-user only)
