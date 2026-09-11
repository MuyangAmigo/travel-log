# Design System Inspired by Airbnb

## Journal index refinement

The index uses a personal editorial identity rather than a marketplace wordmark:
Junjie's existing About-page portrait, one localized journal title, and one
supporting line. The shared header uses the same portrait and localized name.

Language, gallery/list selection, theme, and an overflow entry for editing live
in one bottom dock on the index. Desktop uses a compact centered floating dock;
phones use a full-width dock with safe-area padding. Controls have 44px targets,
visible keyboard focus, and sufficient content clearance below the last trip.
The overflow opens above the dock and supports native outside-click and Escape
dismissal.

### Unified travel cards

Gallery mode retains the wide, photography-first grid and overlaid privacy
badges. Each gallery link is one rounded, theme-aware card: an edge-to-edge photo
above a padded text panel, with a shared surface and shadow rather than a
separately floating image. List mode uses the same rounded surface and shadow in
a centered 1040px content column. Each horizontal card has a 220px-wide photo
flush with its left, top, and bottom edges, clipped by the card's outer corners.
Photos use cover cropping to fill the row height; only the text panel is padded.
Cards have spacing instead of row separators.

| Detail | Gallery | List |
|--------|---------|------|
| Shared container | 20px outer radius, theme-aware surface, one card shadow | Same |
| Photo | Full-width top edge, square on desktop and 4:3 on phones | Full-height left edge, 220px wide with a 165px minimum height on desktop |
| Text padding | 18px top, 20px sides and bottom | 24px vertically, 28px horizontally |
| Phone layout | Image above text | Horizontal; image width `clamp(88px, 24vw, 116px)` and text padding `16px 12px` at 640px and below |
| Separation | Existing responsive grid gutters | 20px between cards; no row dividers |

The outer card clips the image corners. Do not add separate photo rounding,
image shadows, or an inset margin to list photos. The whole link gets the hover
shadow; image zoom remains clipped to its photo region. Keyboard focus remains
visible outside the card, and reduced-motion preferences disable transitions.

Location and the complete authored date range sit below each title; list-mode
privacy labels are quiet inline metadata. Phone rows use smaller thumbnails and
wrapping metadata. These index-specific rules supersede the original generic
marketplace header and layout guidance below; font tokens remain unchanged.

### Ambient index palette

The index softens the shell canvas to warm ivory (`#f7f3eb`) or lifted
charcoal (`#202123`). Light mode pairs faint peach-and-cream radial gradients
with warm white cards (`#fffdf9`) and an ivory dock. Dark mode retains its subtle
warm/cool gradients, neutral surfaces, and softer primary text. The broad,
low-opacity gradients fade into the base color down the page.
Photography and red accents are unchanged. These CSS-only palette
overrides apply only while `.index-wrap` is present, including viewport margins;
trip pages and the editor retain their existing themes. There is no background
animation or additional image download.

| Token / role | Light | Dark |
|--------------|-------|------|
| `--page-background` | `#f7f3eb` | `#202123` |
| `--surface-elevated` (cards, overflow menu) | `#fffdf9` | `#2b2c2e` |
| `--palette-surface` | `#fcf9f3` | `#27282a` |
| `--palette-surface-muted` (selected controls) | `#eee9e0` | `#323335` |
| `--header-background` (dock) | `rgba(252, 249, 243, 0.9)` | `rgba(39, 40, 42, 0.9)` |
| Primary text | `#222222` | `#e8e8e6` |
| `--index-gradient-warm` | `rgba(222, 174, 139, 0.12)` | `rgba(177, 149, 123, 0.07)` |
| `--index-gradient-haze` | `rgba(238, 217, 184, 0.16)` | `rgba(126, 151, 179, 0.09)` |

The warm gradient is a `90% 720px` ellipse anchored at the upper left. The haze
is an `80% 900px` ellipse anchored at `100% 160px`. Neither repeats or moves.
Use these broad washes rather than distinct colored blobs, and keep photographs
untinted. `:root:has(.index-wrap)` scopes the tokens; `body:has(.index-wrap)`
paints the gradients. This also covers the viewport margins and requires no
client-side theme or route effects.

## 1. Visual Theme & Atmosphere

Airbnb's website is a warm, photography-forward marketplace that feels like flipping through a travel magazine where every page invites you to book. The light theme operates on a foundation of pure white (`#ffffff`), while the dark theme uses a warm near-black (`#111113`). The iconic Rausch Red (`#ff385c`) — named after Airbnb's first street address — remains the singular brand accent in both themes. The result is a clean canvas where listing photography, category icons, and the red CTA button are the primary sources of color.

The typography uses Airbnb Cereal VF — a custom variable font that's warm and approachable, with rounded terminals that echo the brand's "belong anywhere" philosophy. The font operates in a tight weight range: 500 (medium) for most UI, 600 (semibold) for emphasis, and 700 (bold) for primary headings. Slight negative letter-spacing (-0.18px to -0.44px) on headings creates a cozy, intimate reading experience rather than the compressed efficiency of tech companies.

What distinguishes Airbnb is its palette-based token system (`--palette-*`) and multi-layered shadow approach. The primary card shadow uses a three-layer stack (`rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px`) that creates a subtle, warm lift. Combined with generous border-radius (8px–32px), circular navigation controls (50%), and a category pill bar with horizontal scrolling, the interface feels tactile and inviting — designed for browsing, not commanding.

**Key Characteristics:**
- Adaptive white / warm near-black canvas with Rausch Red (`#ff385c`) as singular brand accent
- Airbnb Cereal VF — custom variable font with warm, rounded terminals
- Palette-based token system (`--palette-*`) for systematic color management
- Three-layer card shadows: border ring + soft blur + stronger blur
- Generous border-radius: 8px buttons, 14px badges, 20px cards, 32px large elements
- Circular navigation controls (50% radius)
- Photography-first listing cards — images are the hero content
- Near-black text (`#222222`) — warm, not cold
- Luxe Purple (`#460479`) and Plus Magenta (`#92174d`) for premium tiers

## 2. Color Palette & Roles

### Primary Brand
- **Rausch Red** (`#ff385c`): `--palette-bg-primary-core`, primary CTA, brand accent, active states
- **Deep Rausch** (`#e00b41`): `--palette-bg-tertiary-core`, pressed/dark variant of brand red
- **Error Red** (`#c13515`): `--palette-text-primary-error`, error text on light
- **Error Dark** (`#b32505`): `--palette-text-secondary-error-hover`, error hover

### Premium Tiers
- **Luxe Purple** (`#460479`): `--palette-bg-primary-luxe`, Airbnb Luxe tier branding
- **Plus Magenta** (`#92174d`): `--palette-bg-primary-plus`, Airbnb Plus tier branding

### Text Scale
- **Near Black** (`#222222`): `--palette-text-primary`, primary text — warm, not cold
- **Focused Gray** (`#3f3f3f`): `--palette-text-focused`, focused state text
- **Secondary Gray** (`#6a6a6a`): Secondary text, descriptions
- **Disabled** (`rgba(0,0,0,0.24)`): `--palette-text-material-disabled`, disabled state
- **Link Disabled** (`#929292`): `--palette-text-link-disabled`, disabled links

### Interactive
- **Legal Blue** (`#428bff`): `--palette-text-legal`, legal links, informational
- **Border Gray** (`#c1c1c1`): Border color for cards and dividers
- **Light Surface** (`#f2f2f2`): Circular navigation buttons, secondary surfaces

### Surface & Shadows
- **Pure White** (`#ffffff`): Page background, card surfaces
- **Dark Canvas** (`#111113`): Dark-theme page background
- **Dark Surface** (`#1c1c1e`): Dark-theme card and editorial surfaces
- **Card Shadow** (`rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px`): Three-layer warm lift
- **Hover Shadow** (`rgba(0,0,0,0.08) 0px 4px 12px`): Button hover elevation

## 3. Typography Rules

### Font Family
- **Primary**: `Airbnb Cereal VF`, fallbacks: `Circular, -apple-system, system-ui, Roboto, Helvetica Neue`
- **OpenType Features**: `"salt"` (stylistic alternates) on specific caption elements

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Section Heading | Airbnb Cereal VF | 28px (1.75rem) | 700 | 1.43 | normal | Primary headings |
| Card Heading | Airbnb Cereal VF | 22px (1.38rem) | 600 | 1.18 (tight) | -0.44px | Category/card titles |
| Card Heading Medium | Airbnb Cereal VF | 22px (1.38rem) | 500 | 1.18 (tight) | -0.44px | Lighter variant |
| Sub-heading | Airbnb Cereal VF | 21px (1.31rem) | 700 | 1.43 | normal | Bold sub-headings |
| Feature Title | Airbnb Cereal VF | 20px (1.25rem) | 600 | 1.20 (tight) | -0.18px | Feature headings |
| UI Medium | Airbnb Cereal VF | 16px (1.00rem) | 500 | 1.25 (tight) | normal | Nav, emphasized text |
| UI Semibold | Airbnb Cereal VF | 16px (1.00rem) | 600 | 1.25 (tight) | normal | Strong emphasis |
| Button | Airbnb Cereal VF | 16px (1.00rem) | 500 | 1.25 (tight) | normal | Button labels |
| Body / Link | Airbnb Cereal VF | 14px (0.88rem) | 400 | 1.43 | normal | Standard body |
| Body Medium | Airbnb Cereal VF | 14px (0.88rem) | 500 | 1.29 (tight) | normal | Medium body |
| Caption Salt | Airbnb Cereal VF | 14px (0.88rem) | 600 | 1.43 | normal | `"salt"` feature |
| Small | Airbnb Cereal VF | 13px (0.81rem) | 400 | 1.23 (tight) | normal | Descriptions |
| Tag | Airbnb Cereal VF | 12px (0.75rem) | 400–700 | 1.33 | normal | Tags, prices |
| Badge | Airbnb Cereal VF | 11px (0.69rem) | 600 | 1.18 (tight) | normal | `"salt"` feature |
| Micro Uppercase | Airbnb Cereal VF | 8px (0.50rem) | 700 | 1.25 (tight) | 0.32px | `text-transform: uppercase` |

### Principles
- **Warm weight range**: 500–700 dominate. No weight 300 or 400 for headings — Airbnb's type is always at least medium weight, creating a warm, confident voice.
- **Negative tracking on headings**: -0.18px to -0.44px letter-spacing on display creates intimate, cozy headings rather than cold, compressed ones.
- **"salt" OpenType feature**: Stylistic alternates on specific UI elements (badges, captions) create subtle glyph variations that add visual interest.
- **Variable font precision**: Cereal VF enables continuous weight interpolation, though the design system uses discrete stops at 500, 600, and 700.

## 4. Component Stylings

### Buttons

**Primary Dark**
- Background: `#222222` (near-black, not pure black)
- Text: `#ffffff`
- Padding: 0px 24px
- Radius: 8px
- Hover: transitions to error/brand accent via `var(--accent-bg-error)`
- Focus: `0 0 0 2px var(--palette-grey1000)` ring + scale(0.92)

**Circular Nav**
- Background: `#f2f2f2`
- Text: `#222222`
- Radius: 50% (circle)
- Hover: shadow `rgba(0,0,0,0.08) 0px 4px 12px` + translateX(50%)
- Active: 4px white border ring + focus shadow
- Focus: scale(0.92) shrink animation

### Cards & Containers
- Background: `#ffffff`
- Radius: 14px (badges), 20px (cards/buttons), 32px (large)
- Shadow: `rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px` (three-layer)
- Listing cards: full-width photography on top, details below
- Carousel controls: circular 50% buttons

### Inputs
- Search: `#222222` text
- Focus: `var(--palette-bg-primary-error)` background tint + `0 0 0 2px` ring
- Radius: depends on context (search bar uses pill-like rounding)

### Navigation
- Sticky header using the active theme surface
- Airbnb logo (Rausch Red) left-aligned
- Category filter pills: horizontal scroll below search
- Circular nav controls for carousel navigation
- "Become a Host" text link, avatar/menu right-aligned

### Image Treatment
- Listing photography fills card top with generous height
- Image carousel with dot indicators
- Heart/wishlist icon overlay on images
- 8px–14px radius on contained images

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 2px, 3px, 4px, 6px, 8px, 10px, 11px, 12px, 15px, 16px, 22px, 24px, 32px

### Grid & Container
- Full-width header with centered search
- Category pill bar: horizontal scrollable row
- Listing grid: responsive multi-column (3–5 columns on desktop)
- Full-width footer with link columns

### Whitespace Philosophy
- **Travel-magazine spacing**: Generous vertical padding between sections creates a leisurely browsing pace — you're meant to scroll slowly, like browsing a magazine.
- **Photography density**: Listing cards are packed relatively tightly, but each image is large enough to feel immersive.
- **Search bar prominence**: The search bar gets maximum vertical space in the header — finding your destination is the primary action.

### Border Radius Scale
- Subtle (4px): Small links
- Standard (8px): Buttons, tabs, search elements
- Badge (14px): Status badges, labels
- Card (20px): Feature cards, large buttons
- Large (32px): Large containers, hero elements
- Circle (50%): Nav controls, avatars, icons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Page background, text blocks |
| Card (Level 1) | `rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px` | Listing cards, search bar |
| Hover (Level 2) | `rgba(0,0,0,0.08) 0px 4px 12px` | Button hover, interactive lift |
| Active Focus (Level 3) | `rgb(255,255,255) 0px 0px 0px 4px` + focus ring | Active/focused elements |

**Shadow Philosophy**: Airbnb's three-layer shadow system creates a warm, natural lift. Layer 1 (`0px 0px 0px 1px` at 0.02 opacity) is an ultra-subtle border. Layer 2 (`0px 2px 6px` at 0.04) provides soft ambient shadow. Layer 3 (`0px 4px 8px` at 0.1) adds the primary lift. This graduated approach creates shadows that feel like natural light rather than CSS effects.

## 7. Do's and Don'ts

### Do
- Use `#222222` (warm near-black) for text — never pure `#000000`
- Apply Rausch Red (`#ff385c`) only for primary CTAs and brand moments — it's the singular accent
- Use Airbnb Cereal VF at weight 500–700 — the warm weight range is intentional
- Apply the three-layer card shadow for all elevated surfaces
- Use generous border-radius: 8px for buttons, 20px for cards, 50% for controls
- Use photography as the primary visual content — listings are image-first
- Apply negative letter-spacing (-0.18px to -0.44px) on headings for intimacy
- Use circular (50%) buttons for carousel/navigation controls

### Don't
- Don't use pure black (`#000000`) for text — always `#222222` (warm)
- Don't apply Rausch Red to backgrounds or large surfaces — it's an accent only
- Don't use thin font weights (300, 400) for headings — 500 minimum
- Don't use heavy shadows (>0.1 opacity as primary layer) — keep them warm and graduated
- Don't use sharp corners (0–4px) on cards — the generous rounding (20px+) is core
- Don't introduce additional brand colors beyond the Rausch/Luxe/Plus system
- Don't override the palette token system — use `--palette-*` variables consistently

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile Small | <375px | Single column, compact search |
| Mobile | 375–550px | Standard mobile listing grid |
| Tablet Small | 550–744px | 2-column listings |
| Tablet | 744–950px | Search bar expansion |
| Desktop Small | 950–1128px | 3-column listings |
| Desktop | 1128–1440px | 4-column grid, full header |
| Large Desktop | 1440–1920px | 5-column grid |
| Ultra-wide | >1920px | Maximum grid width |

*Note: Airbnb has 61 detected breakpoints — one of the most granular responsive systems observed, reflecting their obsession with layout at every possible screen size.*

### Touch Targets
- Circular nav buttons: adequate 50% radius sizing
- Listing cards: full-card tap target on mobile
- Search bar: prominently sized for thumb interaction
- Category pills: horizontally scrollable with generous padding

### Collapsing Strategy
- Listing grid: 5 → 4 → 3 → 2 → 1 columns
- Search: expanded bar → compact bar → overlay
- Category pills: horizontal scroll at all sizes
- Navigation: full header → mobile simplified
- Map: side panel → overlay/toggle

### Image Behavior
- Listing photos: carousel with swipe on mobile
- Responsive image sizing with aspect ratio maintained
- Heart overlay positioned consistently across sizes
- Photo quality adjusts based on viewport

## 9. Trip Inner Pages

Trip detail pages intentionally diverge from the Airbnb-style shell. They use a mobile-editorial travel post aesthetic inspired by Chinese social travel guides:

- **Canvas**: fixed 750px `.card` sections scaled down by `.card-wrap` with `--s = min((100vw - gutter) / 750, 1)` on tablet/desktop. At `max-width: 760px`, transforms are disabled and cards become fluid-width with true mobile type sizes for readability.
- **Background**: page-level warm off-white `#f5f5f0` with flat white cards in light mode; warm near-black `#111113` with `#1c1c1e` cards in dark mode. Cards retain 44px padding and 16px vertical rhythm.
- **Accent**: social-red `#ff2442` for cover tags, day badges, timeline times, and pill tags.
- **Type**: Chinese-first UI/body stack through `--font-sans-cn`; body text is large and readable (26px on the 750px canvas, 1.9 line-height).
- **Images**: rounded 12–16px photo grids, no old scrapbook filters, tape, or tilted frames. Images inside a row are previews with matching frame ratios and centered `object-fit: cover` crops, not natural-size layouts. Keep the source photo unpadded and uncropped so the shared lightbox can display it in full; do not bake letterboxing into the image to fill a preview frame. Captions sit below images in muted gray.
- **Content components**: `.nbox` becomes a yellow-highlight note block, `.rbox.warn` becomes an orange warning block, `.tlwrap` becomes a stacked timeline-card list, and `.route` becomes a chip grid.

Structured trip documents use `TripDocumentRenderer` and the existing class vocabulary. `TripPresentation` applies the published layout without changing the source content or reading order.

### Published trip styles

Each trip can set optional `metadata.style` in its `content.json`. Missing means `classic`; existing entries do not need a migration. The shared style registry supplies the IDs and localized editor labels.

| ID | Label | Composition |
| --- | --- | --- |
| `classic` | Classic / 经典游记 | The original card layout, desktop chapter rails, tablet scaling, and fluid mobile cards. |
| `photo-story` | Photo story / 影像游记 | Wide photography, equal-width desktop prose/photo pairs, centered cover and chapter headings, and compact chapter navigation. |
| `field-journal` | Field journal / 旅途手记 | A narrower continuous reading column, simple day markers and timelines, compact photo groups, and a quiet desktop chapter rail. |

`TripPresentation.module.css` scopes the alternative layouts using `data-trip-style`. Reuse semantic theme tokens and existing image focus hints. Respect authored cover backgrounds; alternatives use the existing listing cover only when no cover background is authored. Classic retains its original cover treatment.

The owner selects a style in the editor's Overall information section. One published choice applies to both languages and all readers. Selection changes the draft preview only; explicit approval and Publish commit the setting, and the site rebuild makes it visible. Reader pages do not expose a style-setting toolbar or use browser storage to override the published style.

Editor live and bilingual approval previews share the production renderer and presentation inside same-origin, script-disabled frames. Their real viewport widths are 1440px, 900px, and 390px; fitting a frame into the editor does not change its responsive breakpoint. Frame-local chapter navigation, scaling, and lightboxes must not affect the parent editor or another locale frame.

## 10. Theme Behavior

- The first visit follows `prefers-color-scheme`; the header toggle saves an explicit `light` or `dark` choice in `travel-log-theme`.
- Apply the resolved theme to `data-theme` on `<html>` before first paint. Update `color-scheme` so native controls match.
- Use semantic surface, text, border, note, and warning tokens from `globals.css`; do not add component-specific dark-mode color patches.
- The dark theme lifts the red text accent to `#ff4163` (and editorial red text to `#ff5a70`) for small-text contrast while keeping the same brand hue.
- Theme shell pages, trip content, and the private-journal authentication gate consistently. Do not dim or recolor travel photography.
- Dark-theme text and contextual note colors must meet WCAG AA contrast against their surfaces.

## 11. Agent Prompt Guide

### Quick Color Reference
- Background: Pure White (`#ffffff`) / Dark Canvas (`#111113`)
- Surface: White (`#ffffff`) / Dark Surface (`#1c1c1e`)
- Text: Near Black (`#222222`) / Soft White (`#f5f5f5`)
- Brand accent: Rausch Red (`#ff385c`)
- Secondary text: `#6a6a6a`
- Disabled: `rgba(0,0,0,0.24)`
- Card border: `rgba(0,0,0,0.02) 0px 0px 0px 1px`
- Card shadow: full three-layer stack
- Button surface: `#f2f2f2`

### Example Component Prompts
- "Create a listing card: white background, 20px radius. Three-layer shadow: rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px. Photo area on top (16:10 ratio), details below: 16px Airbnb Cereal VF weight 600 title, 14px weight 400 description in #6a6a6a."
- "Design search bar: white background, full card shadow, 32px radius on container. Search text at 14px Cereal VF weight 400. Red search button (#ff385c, 50% radius, white icon)."
- "Build category pill bar: horizontal scrollable row. Each pill: 14px Cereal VF weight 600, #222222 text, bottom border on active. Circular prev/next arrows (#f2f2f2 bg, 50% radius)."
- "Create a CTA button: #222222 background, white text, 8px radius, 16px Cereal VF weight 500, 0px 24px padding. Hover: brand red accent."
- "Design a heart/wishlist button: transparent background, 50% radius, white heart icon with dark shadow outline."

### Iteration Guide
1. Start with white — the photography provides all the color
2. Rausch Red (#ff385c) is the singular accent — use sparingly for CTAs only
3. Near-black (#222222) for text — the warmth matters
4. Three-layer shadows create natural, warm lift — always use all three layers
5. Generous radius: 8px buttons, 20px cards, 50% controls
6. Cereal VF at 500–700 weight — no thin weights for any heading
7. Photography is hero — every listing card is image-first
