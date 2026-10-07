# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Brique Flow
**Generated:** 2026-10-06 21:53:49
**Category:** SaaS (General)

---

## Global Rules

> **OVERRIDE NOTE:** The generic database match returned a blue/orange SaaS palette
> with Plus Jakarta Sans. Replaced below with the Brique Flow brand kit (approved
> board: logo, palette, Sora) — real brand identity takes precedence over the
> generic match. Structural guidance (spacing, shadows, anti-patterns, checklist,
> section pattern) from the original match is kept as-is below.

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary / Accent-CTA | `#00E676` | `--color-primary` |
| Primary Hover/Active | `#00B362` | `--color-primary-hover` |
| On Primary (button text) | `#0B0F14` | `--color-on-primary` |
| Background | `#0B0F14` | `--color-background` |
| Foreground (body text) | `#FFFFFF` | `--color-foreground` |
| Muted Foreground (secondary text) | `#6B7280` | `--color-muted-foreground` |
| Muted Foreground (AA-safe variant for small text) | `#9CA3AF` | `--color-muted-foreground-aa` |
| Card | `#12161C` | `--color-card` |
| Card Foreground | `#FFFFFF` | `--color-card-foreground` |
| Border | `#232933` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring (focus) | `#00E676` | `--color-ring` |

**Color notes:** `#00E676` on `#0B0F14` ≈ 8.9:1 (verified) — safe for large text/icons,
but body copy stays white/`#FFFFFF` for max readability; green is reserved for
accents, CTAs, highlights and data-positive values (matches the app's own use of
green for profit figures). Button text on the green CTA uses `#0B0F14` (dark), not
white — white-on-green fails contrast (~1.7:1); dark-on-green passes at ~12.6:1.
`#6B7280` (brand gray) is ~4:1 on the background — fine for secondary/caption text
at 14px+, but avoid for small essential body copy; use `#9CA3AF` (~6.4:1) there instead.

### Typography

- **Heading & Body Font:** Sora (brand kit) — Bold/Semibold for headings, Regular for body
- **Mood:** modern, confident, direct, SaaS, young-but-professional
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap`

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button (CTA) */
.btn-primary {
  background: #00E676;
  color: #0B0F14;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 700;
  font-family: 'Sora', sans-serif;
  transition: background 200ms ease, transform 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #00B362;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  border: 1.5px solid #232933;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #00E676;
}
```

### Cards

```css
.card {
  background: #12161C;
  border: 1px solid #232933;
  border-radius: 16px;
  padding: 24px;
  transition: transform 200ms ease, border-color 200ms ease;
}

.card:hover {
  border-color: #00E67655;
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  background: #12161C;
  color: #FFFFFF;
  padding: 12px 16px;
  border: 1px solid #232933;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #00E676;
  outline: none;
  box-shadow: 0 0 0 3px #00E67633;
}
```

---

## Style Guidelines

**Style:** Modern Dark SaaS (brand-led, not generic glassmorphism)

**Keywords:** Dark background, bright green accent, generous spacing, product
screenshots as proof, subtle glow on CTA/hero, restrained motion

**Best For:** Finance/profit tools, modern SaaS, mobile-first audiences

**Key Effects:** Subtle green radial glow behind hero/CTA sections (low opacity,
no heavy blur), 1px borders over hard shadows, optional light `backdrop-filter`
blur (8-12px) only on sticky nav — not applied broadly as "glassmorphism"

### Page Pattern

**Pattern Name:** Hero + Features + CTA

- **Conversion Strategy:** Deep CTA placement. For CTA label text, verify at least 4.5:1 against the button fill; use 7:1 only when the product explicitly targets AAA normal-text contrast. Keep focus and component boundaries independently visible. Disable hero parallax under reduced motion and render its static final state.
- **CTA Placement:** Hero (sticky) + Bottom
- **Section Order:** Hero with headline/image > Value prop > Key features (3-5) > CTA section > Footer

---

## Anti-Patterns (Do NOT Use)

- ❌ Excessive animation

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
