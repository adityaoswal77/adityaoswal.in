# Sticky Stages Sidebar — Guest User Case Study Page

**Date:** 2026-03-19
**File:** `app/work/guest-user/page.tsx`
**Status:** Approved

---

## Goal

Add a sticky right-rail sidebar to the guest-user case study page that shows the stages of the design process. As the user scrolls, the active stage highlights. Clicking a stage label scrolls to that section. Inspired by the Figma help page layout (sticky section navigator on the right).

The hero section is NOT modified.

---

## Layout Structure

Everything below the `<Hero />` component gets wrapped in a two-column grid container:

```
<div className="relative lg:grid lg:grid-cols-[1fr_200px]">
  <div>{/* all Section components */}</div>
  <StagesSidebar />
</div>
```

- Left column: all existing `<Section>` components, unchanged in structure
- Right column: `<StagesSidebar />`, `hidden lg:block`, `sticky top-24 self-start h-screen`
- No changes to max-width or padding of individual sections

---

## Section ID Props

Each `<Section>` call gets an `id` prop that maps to a stage slug:

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

The `<Section>` component receives an optional `id?: string` prop and passes it to the underlying `<section>` element.

---

## StagesSidebar Component

New component defined in the same file (or extracted to `components/StagesSidebar.tsx` if preferred).

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
- `threshold: 0.2` — section is "active" when 20% visible
- `activeSection` state (string) holds the current active id
- Observer cleaned up on unmount

### Visual structure

- Vertical list, each item: dot + label side by side
- Thin `1px` vertical line in `var(--border)` connecting dots (positioned behind via absolute/relative)
- Active item: filled dot (`bg-[var(--foreground)]`), label at full opacity
- Inactive items: hollow dot (`border border-[var(--muted)]`), label at `opacity-40`
- Typography: `font-mono text-[11px] uppercase tracking-[0.15em]`
- Transition: `transition-colors duration-300` and `transition-opacity duration-300`

### Click to jump

```ts
onClick={() => document.getElementById(stage.id)?.scrollIntoView({ behavior: 'smooth' })}
```

### Accessibility

- Sidebar wrapped in `<nav aria-label="Design process stages">`
- Each item is a `<button>` with descriptive `aria-label`
- `aria-current="true"` on the active stage button

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0ms !important; }
}
```

Already handled globally in most setups; no extra code needed if the project already respects this.

### Mobile

- Sidebar column is `hidden lg:block` — not shown on mobile or tablet
- No fallback component for mobile in this iteration

---

## Files Changed

| File | Change |
|------|--------|
| `app/work/guest-user/page.tsx` | Add `id` prop to `Section`, add `StagesSidebar` component, wrap post-hero content in two-column grid |

No new files required (sidebar can live in the same page file).

---

## Out of Scope

- Mobile sticky progress indicator
- Animated line fill tracking scroll progress
- Sidebar on other case study pages (this is guest-user only)
