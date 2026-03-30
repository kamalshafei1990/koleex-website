# Koleex Design System v3

A comprehensive design system for the Koleex International Group website.
Inspired by Apple, Tesla, NVIDIA, and Siemens — engineered for premium, minimal, technological, high-end aesthetics.

---

## 1. Typography System

Font family: `SF Pro Display`, `SF Pro Text`, system sans-serif stack.

| Token | Size (clamp) | Weight | Line-height | Letter-spacing | Usage |
|-------|-------------|--------|-------------|---------------|-------|
| `text-display-xl` | 3rem — 6rem | 700 | 1.02 | -0.05em | Hero headings (full-viewport) |
| `text-display` | 2.5rem — 4.5rem | 700 | 1.04 | -0.045em | Section heroes |
| `text-display-sm` | 2rem — 3.25rem | 700 | 1.07 | -0.035em | Sub-section headings |
| `text-headline` | 1.75rem — 2.75rem | 600 | 1.08 | -0.03em | Section titles |
| `text-headline-sm` | 1.4rem — 2rem | 600 | 1.12 | -0.025em | Card group headings |
| `text-title` | 1.125rem — 1.5rem | 600 | 1.17 | -0.018em | Card titles |
| `text-title-sm` | 1rem — 1.1875rem | 600 | 1.21 | -0.012em | Small card titles |
| `text-subtitle` | 1rem — 1.3125rem | 400 | 1.38 | -0.01em | Section subtitles |
| `text-body-lg` | 1.0625rem | 400 | 1.47 | -0.022em | Lead paragraphs |
| `text-body` | 0.9375rem | 400 | 1.47 | -0.016em | Body text |
| `text-body-sm` | 0.8125rem | 400 | 1.38 | -0.008em | Card descriptions |
| `text-caption` | 0.75rem | 400 | 1.33 | — | Dates, metadata |
| `text-overline` | 0.6875rem | 600 | 1.33 | 0.08em | Section labels (uppercase) |

**CTA links:** 21px, `#0066cc` on light backgrounds, `#2997ff` on dark. Always end with ` >`.

---

## 2. Color System

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#1d1d1f` | Main text, headings |
| White | `#ffffff` | Backgrounds, inverse text |
| Black | `#000000` | Hero backgrounds |
| Accent | `#0066cc` | Links on light surfaces |
| Accent Dark Link | `#2997ff` | Links on dark surfaces |

### Gray Scale
| Token | Hex | Usage |
|-------|-----|-------|
| Gray 50 | `#fbfbfd` | Subtle backgrounds |
| Gray 100 | `#f5f5f7` | Section backgrounds, footer |
| Gray 200 | `#e8e8ed` | Borders, dividers |
| Gray 300 | `#d2d2d7` | Footer dividers, scroll bars |
| Gray 400 | `#aeaeb2` | Quaternary text |
| Gray 500 | `#86868b` | Tertiary text, hero subtitles on dark |
| Gray 600 | `#6e6e73` | Secondary text, subtitles |
| Gray 700 | `#424245` | Footer link text |
| Gray 800 | `#1d1d1f` | Primary text |
| Gray 900 | `#000000` | Pure black |

### Section Color Rules
- **Dark sections:** `bg-black` or `bg-[#1d1d1f]`, white text, `#86868b` subtitles, `#2997ff` links
- **Light sections:** `bg-white` or `bg-[#f5f5f7]`, `#1d1d1f` text, `#6e6e73` subtitles, `#0066cc` links
- **Always alternate** dark and light sections for visual rhythm
- **Tile cards** on light pages: mix of `bg-white`, `bg-[#f5f5f7]`, `bg-black`, `bg-[#1d1d1f]`

---

## 3. Spacing System

Base unit: **4px**. All spacing is multiples of 4.

| Name | Value | Usage |
|------|-------|-------|
| `0.5` | 2px | Micro gaps |
| `1` | 4px | Icon margins |
| `2` | 8px | Tight element spacing |
| `3` | 12px | Card inner padding gaps |
| `4` | 16px | Base element spacing |
| `5` | 20px | Section inner padding |
| `6` | 24px | Card padding |
| `8` | 32px | Section sub-spacing |
| `10` | 40px | Between related elements |
| `12` | 48px | Between sections |
| `14` | 56px | Large sub-spacing |
| `16` | 64px | Section top padding (mobile) |
| `20` | 80px | Section vertical rhythm |
| `24` | 96px | Section padding (desktop) |
| `28` | 112px | Large section padding |
| `32` | 128px | Hero/cinematic padding (desktop) |

### Section Vertical Rhythm
| Section type | Padding top/bottom |
|-------------|-------------------|
| Hero (full viewport) | `pt-[44px]` (header offset) + content centered |
| Product showcase | `pt-24 md:pt-32` (96px/128px) |
| Tile grid | `py-3` (12px gap between tiles) |
| Content section | `py-24 md:py-32` (96px/128px) |
| CTA section | `py-20 md:py-28` (80px/112px) |

---

## 4. Grid System

| Preset | Columns | Breakpoints |
|--------|---------|------------|
| 1-col | 1 | All screens |
| 2-col tile | 1 → 2 | `md:grid-cols-2` |
| 3-col cards | 1 → 2 → 3 | `sm:grid-cols-2 lg:grid-cols-3` |
| 4-col | 1 → 2 → 4 | `sm:grid-cols-2 lg:grid-cols-4` |
| Footer | 2 → 3 → 5 | `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` |

Container max-widths:
- **Content:** `980px` (headings, text, nav)
- **Media:** `1100px` (images, tile grids)
- **Padding:** `px-3 sm:px-5` (media), `px-4 sm:px-6` (text)

Gap: `gap-3` for tile grids, `gap-5` for card grids, `gap-8` for text columns.

---

## 5. Button & Link Styles

### CTA Links (primary action pattern)
```
.link-cta { font-size: 21px; }
.link-cta-light { color: #0066cc; }   /* on white/gray bg */
.link-cta-dark  { color: #2997ff; }   /* on black/dark bg */
```
Always include ` >` character after text. Hover: underline with 3px offset.

### Button Component Variants
| Variant | Style |
|---------|-------|
| `primary` | Blue bg (#0066cc), white text, rounded-full |
| `secondary` | White bg, gray border, dark text |
| `outline` | Transparent, gray border |
| `ghost` | Transparent, text only |
| `dark` | Black bg, white text |
| `dark-outline` | Transparent, white/20 border, white text |
| `link` | Text-only, blue, underline on hover |

Sizes: `xs` (32px), `sm` (36px), `md` (44px), `lg` (52px), `xl` (56px).

---

## 6. Card System

### Premium Card (`.card-premium`)
```css
background: white;
border: 1px solid rgba(0,0,0,0.04);
border-radius: 20px;
box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06);
```
Hover: `translateY(-4px)`, shadow intensifies.

### Dark Card (`.card-dark`)
```css
background: #161617;
border: 1px solid rgba(255,255,255,0.06);
border-radius: 20px;
```
Hover: `translateY(-4px)`, border brightens to 0.12 opacity.

### Tile Card (homepage grid)
```css
border-radius: 24px;
```
Hover: `translateY(-4px)`, image scale `1.03`.

### Image inside cards
- `aspect-[16/10]` for story cards
- `h-[260px] md:h-[320px]` for tile grid images
- Hover: `scale(1.03–1.04)` with `duration-700`

---

## 7. Section Layouts

### Full-Width Product Hero
```
[overline label]
[Display heading]
[Subtitle — gray]
[CTA links]
[Full-width image]
```
Text: centered, max-width 980px.
Image: max-width 1100px, full-bleed or `img-hero` mask fade.

### 2×2 Tile Grid
```
[Card] [Card]
[Card] [Card]
```
Each card: rounded-24px, centered text at top, product image at bottom.
Gap: 12px. Max-width: 1100px.

### Story Card Row
```
[Header row: "Latest Stories" + "View all >"]
[Card] [Card] [Card]
```
3-column grid, premium cards, staggered reveal animation.

### CTA Section
```
[Headline]
[Subtitle]
[CTA links]
```
Centered, max-width 680px. Light gray background.

---

## 8. Animation System

### Timing Functions
| Token | Curve | Usage |
|-------|-------|-------|
| `--ease-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | All scroll reveals, card hovers |
| `--ease-out-expo` | `cubic-bezier(0.19, 1, 0.22, 1)` | Fade-in-up animations |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Smooth toggles |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy micro-interactions |

### Durations
| Token | Value | Usage |
|-------|-------|-------|
| `--duration-micro` | 120ms | Hover color changes |
| `--duration-fast` | 200ms | Button press, link hover |
| `--duration-normal` | 350ms | Card transitions, nav |
| `--duration-slow` | 500ms | Card hover lift, fades |
| `--duration-slower` | 700ms | Scroll reveal, stagger items |
| `--duration-cinematic` | 1000ms | Hero entrance, page load |

### Scroll Reveal Pattern
Use `useScrollReveal()` hook + `revealStyle(visible, delay)` helper:
```tsx
const { ref, visible } = useScrollReveal(0.12);
<div ref={ref}>
  <h2 style={revealStyle(visible, 0)}>Title</h2>
  <p style={revealStyle(visible, 100)}>Subtitle</p>
  <div style={revealStyle(visible, 200)}>CTA links</div>
  <div style={revealStyle(visible, 350)}>Image</div>
</div>
```
Stagger: 80–120ms between elements. Image always last with ~350ms delay.

### Hero Entrance (page load)
Stagger from 100ms to 600ms. Image fades in last at 1200ms.

### Ambient Orbs
```css
.orb { position: absolute; border-radius: 50%; filter: blur(100px); }
```
Variants: `orb-blue`, `orb-purple`, `orb-cyan`, `orb-white`.
Animation: `orbPulse` 8s infinite, stagger with `animationDelay`.

### Parallax
Hero image: `translateY(scrollY * 0.18)` + `scale(1 + scrollY * 0.00012)`.

### Card Hover
- Lift: `translateY(-4px)` with `duration-500`
- Shadow intensify: `shadow-card` → `shadow-card-hover`
- Image zoom: `scale(1.03–1.04)` with `duration-700`

---

## 9. Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.03)` | Subtle UI elements |
| `shadow-sm` | `0 2px 8px rgba(0,0,0,0.04)` | Resting state |
| `shadow-md` | `0 4px 16px rgba(0,0,0,0.06)` | Elevated elements |
| `shadow-lg` | `0 8px 30px rgba(0,0,0,0.08)` | Dropdowns, overlays |
| `shadow-xl` | `0 16px 48px rgba(0,0,0,0.10)` | Modal surfaces |
| `shadow-2xl` | `0 24px 64px rgba(0,0,0,0.14)` | Critical overlays |
| `shadow-card` | Dual layer | Card resting state |
| `shadow-card-hover` | Dual layer, intensified | Card hover state |

---

## 10. Border Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 6px | Small UI elements |
| `rounded-md` | 10px | Input fields |
| `rounded-lg` | 14px | Buttons, badges |
| `rounded-xl` | 18px | Cards (small) |
| `rounded-2xl` | 24px | Tile cards, large cards |
| `rounded-3xl` | 30px | Hero image containers |
| `rounded-full` | 9999px | Pills, circular buttons |

---

## 11. Glass Morphism

| Class | Background | Blur | Usage |
|-------|-----------|------|-------|
| `glass` | white 72% | 20px blur | Light overlays |
| `glass-dark` | #1d1d1f 82% | 20px blur | Dark overlays |
| `glass-heavy` | white 92% | 40px blur | Modal surfaces |
| `nav-glass` | #161617 80% | 20px blur | Navigation bar |

---

## 12. Image Treatments

| Class | Effect |
|-------|--------|
| `img-hero` | Bottom gradient mask (fade to background) |
| `img-glow` | Subtle blue drop-shadow glow |

---

## 13. Responsive Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

Nav hides at `< lg` (1024px), replaced by mobile menu.

---

## 14. File Architecture

```
src/
  app/globals.css          → All design tokens, utilities, animations
  lib/useScrollReveal.ts   → Scroll animation hook + revealStyle helper
  components/ui/           → Reusable components (Button, Card, Section, etc.)
  components/layout/       → Header, Footer, MegaMenu, MobileMenu, etc.
  components/home/         → Homepage section components
  data/                    → Placeholder data layer
```
