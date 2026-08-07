# Kardia Design System — Slide Deck Outline

Source: `app/work/kardia-design-system/page.tsx`. Content only — no numbers/stats added beyond what's in the case study. Use this as slide-by-slide script for Figma Slides.

---

## Slide 1 — Cover

**Kardia Design System**
*A custom design system for a cardiac health app*

- AliveCor / 2025
- Role: Lead Designer
- Timeline: 4 Weeks
- Delivered: Foundations & Components

Visual: Kardia wordmark treatment, teal (#067f6f) accent, dark neutral.900 (#182c3d) background.

---

## Slide 2 — Context

**The product**
Kardia by AliveCor — patients record ECGs, share results with a cardiologist, track heart rhythm over time. Interface must feel calm for an anxious patient, precise enough for a clinical read.

- Years of organic growth — no shared component library, every sprint added its own headers, buttons, fonts.
- Not a rebrand — infrastructure, a shared language the product could scale on.

> "A design system for a cardiac health app has to earn trust twice: once with the patient who needs to feel calm, and again with the clinician who needs the data to be unambiguous."

**Team**: Aditya (Lead Designer) · Sprint Partner (Design Contractor) · Katie (Product) · Anuj (Engineering Lead) · Alyssa (Marketing)

**Scope**: Foundations (color, type, spacing, elevation) · Cross-platform token architecture · Core component library in Figma · Handoff-ready for iOS, Android, Web

---

## Slide 3 — The Problem

The Kardia Consumer App grew screen by screen, no shared component library. It worked, but debt accumulated.

- No single source of truth — workflows lived in disconnected Figma files.
- Platform-native fonts everywhere — SF Pro / SF Compact are Apple system fonts, broke on Android and Web.
- No token handoff — three platforms interpreted the same button three different ways.

**Font audit** (from All-Screens catalogue):
- SF Pro Display Bold — account deletion, onboarding headers (iOS only)
- SF Compact Text Regular — body copy, confirmation dialogs (renders differently per OS)
- SF Pro Rounded Medium — KardiaMobile setup screens
- SF Compact Text Medium — input fields, form labels
- Helvetica Neue — older onboarding flows, legacy fallback
- System UI — web product pages, undeclared, browser decides

---

## Slide 4 — Exhibit: Tutorial Popup

Same debt, a different screen — eight variants of the same onboarding tutorial popup turned up side by side in the file.

- Two competing navigation patterns: chevron-and-slider vs a single button
- Button labeled `TEXT` — literal placeholder, never filled in, on 4 of 8 variants
- Close affordance and image-placeholder block present on some copies, missing on others

```
Variants found in the file: 8
Navigation patterns: 2 — chevron+slider vs single button
Button label reading literal "TEXT": 4 of 8
Close (X) affordance: present on 4 of 8, missing on the rest
```

Visual: `/assets/kardia-ds/popups/tutorial.png` — real export, delivered.

---

## Slide 5 — The System (approach)

Off-the-shelf kits don't fit cardiac health — color semantics can't conflict with accessibility rules for error/warning states, tone must read calm and precise.

- Foundations first — color, type, spacing, radius, elevation, locked before any component.
- Components second — starting with buttons, highest-frequency element, stress-tests every semantic variant.

> "Foundations first. You cannot build stable components on top of an unstable token system."

**What shipped**
- Design Tokens — color, spacing, radius, type, shadow
- Component Library — buttons, inputs, modals, cards, nav
- Foundations — type ramp, spacing scale, elevation, grid
- Cross-platform handoff — one JSON source → SwiftUI, Compose, CSS

**Sprint timeline**
- Week 1 — Color, typography
- Week 2 — Spacing, radius, elevation
- Week 3 — Buttons, inputs, forms
- Week 4 — Navigation, modals, docs

---

## Slide 6 — Color Foundations

Three-layer hierarchy:
1. Primitives — raw values, 0–900 scale
2. Semantic tokens — assign meaning (`color.primary.bg` → `color.brand.600`)
3. Component tokens — wire meaning to context (`button.primary.bg`, never a raw hex)

- One update, everywhere — shift primary teal by changing `color.brand.600` once, every component follows.
- Functional color carries weight — error red stays distinct from brand teal at every accessibility level; warning amber avoids reading as biohazard yellow.

> "Error red isn't just a UI affordance — it signals something a patient may find frightening. Every functional color was checked against both AA contrast and clinical tone."

**Semantic mapping**
| Token | Reference |
|---|---|
| `color.primary.bg` | brand.600 · Primary button background |
| `color.destructive.bg` | error.600 · Destructive action |
| `color.text.default` | neutral.900 · Body text, labels |
| `color.surface.subtle` | brand.0 · Card, input background |
| `color.border.default` | neutral.300 · Dividers, outlines |
| `color.warning.bg` | warning.500 · Caution states, pending |
| `color.success.bg` | success.600 · Normal sinus rhythm badge |

---

## Slide 7 — Color Palettes

Render as swatch strips, one row per family, steps 0–900:

**Brand — Kardia Teal**
`#e6f4f2 · #c0e4df · #95d1ca · #65bcb3 · #3dab9f · #0f9b8b · #067f6f · #056358 · #034740 · #142a39`

**Neutral**
`#f8f9fa · #eef0f2 · #dde1e5 · #c6ccd2 · #adb5bc · #8e99a2 · #6b7580 · #4d5860 · #2f3d47 · #182c3d`

**Error**
`#fdf0f0 · #f9d2d2 · #f4a8a8 · #ed7a7a · #e55050 · #d93535 · #cc3d3f · #a32e30 · #7a2021 · #521415`

**Success**
`#edfaf3 · #c5f0d7 · #95e3b4 · #5fd38e · #30c170 · #10b05a · #0a9549 · #07773a · #05582b · #03391c`

**Warning**
`#fff8e6 · #ffeab8 · #ffd980 · #ffc640 · #ffb50f · #f5a500 · #d98e00 · #b37200 · #8a5700 · #5c3a00`

---

## Slide 8 — Typography

Designers reached for Apple system fonts because Figma bundles them and they preview well on a Mac — SF Pro doesn't exist on Android or Web. Engineers improvised, product looked different per platform.

- DM Sans — variable font on every platform via Google Fonts, geometric-humanist, legible label to display size.
- Plus Jakarta Sans — structural companion, narrower, higher x-height, for metadata and UI chrome.

**Type ramp — DM Sans, cross-platform**
| Label | Spec (size/weight) | Sample |
|---|---|---|
| Display | 40 / 700 | Track your heart health, every day. |
| H1 | 28 / 700 | Recent Recordings |
| H2 | 22 / 600 | Account Settings |
| H3 | 18 / 600 | Notification Preferences |
| Body | 16 / 400 | Your ECG results will be reviewed by a certified cardiologist within 24 hours. |
| Label | 13 / 500 | NORMAL SINUS RHYTHM |
| Caption | 12 / 400 | Recorded 14 Jul 2025 · 9:41 AM |

---

## Slide 9 — Components: Buttons

Buttons came first — highest-frequency element, real semantic weight (Brand where Destructive belongs isn't cosmetic in a cardiac product).

- Four semantic roles — Brand, Destructive, Success, Neutral — each with three hierarchy levels: Primary, Secondary, Ghost.
- Naming carries the role — `Action_Button/OLDandCrusty` became `Button / Destructive / Primary`; semantic role explicit in the name, not the hex.

**Before / After**
- Before: pre-DS button variants, inconsistent fills and labels (placeholder export `/assets/img2.jpg`)
- After: Destructive Primary (`#cc3d3f`), Neutral Secondary (outline), Brand Primary (`#067f6f`), Ghost link style

**Do**
- Use Destructive Primary for anything that permanently removes data
- Stack buttons vertically with Primary on top in mobile contexts
- Match a button's role to the action, not the visual weight you want
- Use Ghost buttons for inline contextual actions within content
- Pair a Primary with at most one Secondary or Ghost counterpart

**Don't**
- Hardcode a fill color — always reference a semantic token
- Use Brand Primary for a destructive action because it looks bolder
- Place two Primary buttons side-by-side at the same hierarchy level
- Re-skin a button with a custom fill outside the token system
- Use more than two action buttons in a single bottom action area

---

## Slide 10 — Tokens in Code

Before the DS, the same color was defined three times — a Figma fill, a Swift constant, an Android XML value — and they drifted apart.

- Tokens live once, as JSON — a build step resolves them to SwiftUI, Compose, and CSS.
- Named at the semantic level, not the primitive — component code stays stable when the underlying value changes.

**Token table**
| Token | Value | Usage |
|---|---|---|
| `color.brand.600` | `#067f6f` | Primary CTA background |
| `color.error.600` | `#cc3d3f` | Destructive action, error state |
| `color.neutral.900` | `#182c3d` | Body text, headings |
| `color.neutral.300` | `#c6ccd2` | Border, dividers |
| `radius.sm` | `4px` | Button, input, card |
| `radius.md` | `8px` | Modal, sheet, overlay |
| `shadow.elevation.1` | `0 1px 4px rgba(0,0,0,.10)` | Card lift, floating element |
| `spacing.4` | `16px` | Component internal padding |
| `font.heading1` | `DM Sans / 700 / 28px` | Page title, screen header |

**Cross-platform snippets** (three code panels side by side)

SwiftUI:
```swift
extension Color {
  static let brandPrimary =
    Color(0x067F6F) // color.brand.600
  static let destructive =
    Color(0xCC3D3F) // color.error.600
}
```

Compose:
```kotlin
val KardiaColorScheme =
  lightColorScheme(
    primary = Color(0xFF067F6F),
    // color.brand.600
    error = Color(0xFFCC3D3F),
    // color.error.600
  )
```

CSS:
```css
:root {
  --color-brand-600: #067f6f;
  --color-error-600: #cc3d3f;
  --color-neutral-900: #182c3d;
  --radius-sm: 4px;
  --font-body: 'DM Sans', sans-serif;
}
```

---

## Slide 11 — Process

No component work until foundations were locked. Build buttons before tokens are final, and you either rebuild or ship values that later break.

- Week 1 was audit only — nothing built in Figma yet, cataloguing every existing pattern, drafting the primitive scale.
- A contractor accelerated the build — architecture and direction stayed with me, component execution and documentation shared. Daily check-ins kept both threads aligned.
- Stakeholders reviewed as we went — Anuj on token architecture in Week 1, Katie on scope in Week 2, Alyssa on brand color before primitives locked.

**Phase 1 — Foundation** (Complete, Weeks 1–2)
- All Screens audit
- Brand color alignment with Marketing
- Primitive token scale, all families
- Semantic token mapping
- DM Sans type ramp finalized
- Spacing, radius, elevation system

**Phase 2 — Componentization** (Complete, Weeks 3–4)
- Button system — all roles, levels, states
- Text input and form field components
- Modal and alert sheet patterns
- Bottom navigation bar
- Card and surface components
- Engineering handoff specification

**Phase 3 — Adoption** (In Progress, Ongoing)
- iOS token implementation (Swift)
- Android token implementation (Compose)
- Web token implementation (CSS vars)
- Kardia app redesign rollout
- Contribution model and governance

---

## Slide 12 — Impact

Fewer decisions per sprint. Less engineering rework. Fewer QA cycles for visual regressions.

**Product**
- Shared components ship in hours, not days
- Consistent brand across all touchpoints, no per-screen review
- Scalable system supports product expansion without new debt

**Design**
- Update a token, not every component instance
- More time for interaction design, less for visual QA
- Confidence that shipped designs match the intent

**Engineering**
- Accelerates development across iOS, Android, and Web
- Token handoff kills interpretation drift between platforms
- Shared naming convention reduces designer–engineer friction

---

## Slide 13 — Learnings

A 4-week sprint is ambitious. The system is real and usable — a longer timeline would have caught a few things sooner.

01. **Scoping before building is not optional** (Learning) — Spending week one on audit, not Figma, felt slow. It wasn't — every hour of scoping saved hours of rework later.
02. **Naming is architecture** (Learning) — Role / Hierarchy / State isn't a detail — it's how engineers search, QA reports bugs, and the system scales. OLDandCrusty was a symptom of no convention at all.
03. **Cross-platform type had to come first** (Learning) — Type felt like a brand call, not an engineering one. It's both — defer it, and the first component inherits the wrong font.
04. **Engineering buy-in at Week 1 changes everything** (Learning) — Looping Anuj in early wasn't planned. He caught an Android naming conflict before it spread across the system — saved days at handoff.
05. **A design system doesn't ship — it adopts** (Trade-off) — Finishing the sprint felt like shipping. It wasn't — adoption is where the ROI actually lands.
06. **Four weeks is enough to be useful, not complete** (Trade-off) — Buttons, inputs, modals, cards, and nav shipped. ECG data viz, complex forms, and onboarding didn't — worth naming as gaps, not hiding them.
07. **Documented systems survive people** (Learning) — Every decision — why DM Sans, why error.600, why 4px — has a reason on record. Without it, the next designer can't tell what's safe to change.

---

## Slide 14 — Closing quote

> "The Kardia DS is one of the most clarifying projects I have worked on. Not because it went perfectly — it didn't — but because it forced every implicit design decision to become an explicit one. That is what a design system actually does: it turns assumptions into decisions, and decisions into documentation."
> — Aditya Oswal, Lead Designer, AliveCor

---

## Visual assets

All exhibit exports delivered — no outstanding placeholders:

- Tutorial popup, 8 variants (Slide 4): `/assets/kardia-ds/popups/tutorial.png`
- Pre-DS button variants (Slide 9): `/assets/kardia-ds/Action_Button/Button_Fill.png`
- Post-DS button spec, all roles/states (Slide 9): `/assets/kardia-ds/Buttons.png`
- Color swatch renders (Slide 6/7): `/assets/kardia-ds/old-light-default.png`, `old-light-premium.png`, `new-brand.png`, `new-premium.png`

## Deck styling notes (match site treatment)

- Dark sections (System, Typography, Impact): background `#182c3d`, border `#2f3d47`, white text
- Light sections: site `--background` / `--foreground`, muted `--muted`
- Accent teal: `#067f6f` (links, primary buttons, code highlights)
- Error red: `#cc3d3f` · Success green: `#0a9549` · Warning amber: `#d98e00`
- Body font DM Sans, mono for token names/code (e.g. JetBrains Mono / site's mono stack)
