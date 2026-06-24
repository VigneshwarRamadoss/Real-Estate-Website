# Design System Inspired by FIND Real Estate

## 1. Visual Theme & Atmosphere

The FIND Real Estate design system embodies a clean, sophisticated aesthetic grounded in trust, clarity, and forward momentum. It combines minimalist principles with refined typography and a restrained color palette dominated by blacks, whites, and neutral grays. The system prioritizes legibility and breathing room, creating an inviting digital environment where users feel guided toward making informed real estate decisions. The design evokes a sense of openness, opportunity, and professional guidance—reflecting the real estate market's aspirational nature while maintaining an accessible, approachable tone. Subtle use of the accent blue introduces moments of digital confidence and calls-to-action without overwhelming the calm, contemplative atmosphere.

**Key Characteristics**

- Minimalist, grid-based layout with generous whitespace
- Bold, commanding typography using Instrument Sans across all scales
- Strict black-and-white hierarchy with selective blue accent
- Large, touchable UI elements with rounded affordances
- Neutral gray palette supporting text hierarchy and depth
- Clean, borderless button design with high contrast
- Professional restraint and anti-ornamentation philosophy

## 2. Color Palette & Roles

### Primary

- **Black** (`#000000`): Primary text, headings, and dominant interface elements; used across 475 instances for maximum hierarchy and legibility
- **White** (`#FFFFFF`): Primary background and surface color; establishes clean, open visual space

### Accent Colors

- **Accent Blue** (`#007AFF`): Reserved for critical interactive elements, links, and call-to-action highlights; introduces digital confidence without overwhelming neutral palette

### Interactive

- **Dark Charcoal** (`#151717`): Alternative text color for secondary content, subtle differentiation from pure black; used 123 times for hierarchy variation
- **Medium Gray** (`#B3B3B3`): Disabled states, placeholder text, and low-priority information; maintains accessibility without harsh contrast

### Neutral Scale

- **Light Gray** (`#F1F1F1`): Subtle background tints, card separators, and minimal surface variation
- **Charcoal Dark** (`#383A3A`): Border definitions and fine UI dividers; slightly lighter than primary black for controlled contrast
- **Near Black** (`#1A1C1C`): Deep shadows and darkest neutral; used sparingly for maximum depth

### Surface & Borders

- **Border Gray** (`#C1C1C1`): Input field borders and form container edges; maintains visual definition without harsh lines

## 3. Typography Rules

### Font Family

**Primary Font:** Instrument Sans (weight range: 400–700)
**Fallback Stack:** `Instrument Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`

**Secondary Font (if needed):** Instrument Sans monospace for code/data
**Fallback Stack:** `"Courier New", monospace`

### Hierarchy

| Role             | Font            | Size   | Weight | Line Height | Letter Spacing | Notes                                                      |
| ---------------- | --------------- | ------ | ------ | ----------- | -------------- | ---------------------------------------------------------- |
| Display / H1     | Instrument Sans | 105px  | 700    | 105px       | -1.2px         | Hero headlines; maximum presence and authority             |
| Heading / H2     | Instrument Sans | 15px   | 600    | 21px        | -0.2px         | Section headers and subheadings; strong emphasis           |
| Heading / H3     | Instrument Sans | 18px   | 500    | 27px        | 0px            | Card titles and subsection headers; balanced weight        |
| Body / Paragraph | Instrument Sans | 24px   | 500    | 31.2px      | 0px            | Primary content text; larger scale for readability         |
| Body / Standard  | Instrument Sans | 15px   | 500    | 18.75px     | 0px            | Secondary body text and metadata; versatile mid-scale      |
| Caption / Small  | Instrument Sans | 13.5px | 500    | 20.25px     | 0px            | Form input labels, helper text, and annotations            |
| Link / Small     | Instrument Sans | 7.5px  | 400    | 8.625px     | 0px            | Inline links and micro-interactions; minimal visual weight |
| Button / Primary | Instrument Sans | 13.5px | 500    | 18.9px      | 0px            | CTA buttons and primary actions; clear, action-oriented    |

### Principles

- **Clarity First:** Every size selection prioritizes legibility over decoration; minimum 13.5px for interactive elements
- **Consistent Weight Progression:** 400 (regular) → 500 (medium) → 600 (semi-bold) → 700 (bold); no ultra-light or ultra-heavy weights
- **Generous Line Height:** Line heights exceed font size by 20–40% to enhance scanning and reduce cognitive load
- **Minimal Letter Spacing:** Default 0px with selective negative spacing (`-1.2px` for hero, `-0.2px` for headings) to compress emphasis
- **Single Typeface System:** Instrument Sans exclusively—no secondary serif; reduces decision-making and strengthens brand cohesion

## 4. Component Stylings

### Buttons

#### Primary Button

- **Background Color:** `#151717`
- **Text Color:** `#FFFFFF`
- **Font Size:** 13.5px
- **Font Weight:** 500
- **Padding:** `11.55px 22.5px`
- **Border Radius:** 100px
- **Border:** None
- **Box Shadow:** None
- **Line Height:** 18.9px
- **Height:** 43.98px (auto-calculated)
- **Hover State:** Background `#000000`; slight scale increase (transform: scale(1.02))
- **Active State:** Background `#0A5FCC`; reduced opacity to 0.85
- **Disabled State:** Background `#B3B3B3`; text color `#FFFFFF`; cursor not-allowed

#### Secondary Button (Ghost / Outline)

- **Background Color:** Transparent (`rgba(0, 0, 0, 0)`)
- **Text Color:** `#151717`
- **Font Size:** 7.5px
- **Font Weight:** 400
- **Padding:** `1px 6px`
- **Border Radius:** 0px
- **Border:** `1px solid #383A3A`
- **Box Shadow:** None
- **Line Height:** 8.625px
- **Hover State:** Border color `#000000`; text color `#000000`
- **Active State:** Background `#F1F1F1`; border color `#000000`

#### Icon Button (Square)

- **Background Color:** Transparent
- **Text Color:** `#151717`
- **Font Size:** 7.5px
- **Font Weight:** 400
- **Padding:** `0px`
- **Border Radius:** 0px
- **Border:** None
- **Dimensions:** 22.5px × 22.5px (square)
- **Line Height:** 8.625px
- **Hover State:** Background `#F1F1F1`
- **Focus State:** Outline `2px solid #007AFF`

### Cards & Containers

#### Card Default

- **Background Color:** `#FFFFFF`
- **Border:** `1px solid #C1C1C1`
- **Border Radius:** 2px
- **Padding:** `24px`
- **Box Shadow:** None
- **Gap between items:** 16px
- **Hover State:** Border color `#151717`; slight elevation (box-shadow: `0px 2px 8px rgba(0, 0, 0, 0.08)`)

#### Card Elevated

- **Background Color:** `#FFFFFF`
- **Border:** None
- **Border Radius:** 2px
- **Padding:** `24px`
- **Box Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.12)`
- **Hover State:** Box shadow `0px 6px 16px rgba(0, 0, 0, 0.16)`

#### Section Container

- **Background Color:** `#FFFFFF`
- **Padding:** `60px 40px`
- **Max Width:** 1440px
- **Margin:** `0 auto`
- **Gap between sections:** 32px

### Inputs & Forms

#### Text Input

- **Background Color:** `#FFFFFF`
- **Text Color:** `#000000`
- **Font Size:** 7.5px
- **Font Weight:** 400
- **Padding:** `0px`
- **Border Radius:** 0px
- **Border:** `1px solid #C1C1C1`
- **Height:** 40px
- **Width:** 250px (adjust per context)
- **Line Height:** 8.625px
- **Focus State:** Border color `#007AFF`; outline `2px solid #007AFF`; box-shadow `0px 0px 0px 3px rgba(0, 122, 255, 0.1)`
- **Disabled State:** Background `#F1F1F1`; border color `#B3B3B3`; text color `#B3B3B3`
- **Placeholder Text:** Color `#B3B3B3`; font-weight 400

#### Textarea / Search Input

- **Background Color:** Transparent (`rgba(0, 0, 0, 0)`)
- **Text Color:** `#FFFFFF`
- **Font Size:** 13.5px
- **Font Weight:** 500
- **Padding:** `0px`
- **Border Radius:** 0px
- **Border:** None
- **Height:** auto (minimum 20.25px)
- **Line Height:** 20.25px
- **Focus State:** Underline `1px solid #FFFFFF`

#### Form Label

- **Font Size:** 13.5px
- **Font Weight:** 500
- **Color:** `#151717`
- **Margin Bottom:** 8px
- **Line Height:** 20.25px

#### Form Helper Text

- **Font Size:** 13.5px
- **Font Weight:** 400
- **Color:** `#B3B3B3`
- **Margin Top:** 4px
- **Line Height:** 20.25px

### Navigation

#### Main Navigation

- **Background Color:** Transparent
- **Text Color:** `#151717`
- **Font Size:** 7.5px
- **Font Weight:** 400
- **Padding:** `0px`
- **Line Height:** 8.625px
- **Height:** 18.75px (auto-calculated)
- **Gap between items:** 20px
- **Active Link State:** Color `#007AFF`; text-weight 500; underline `1px solid #007AFF`
- **Hover State:** Color `#000000`

#### Breadcrumb Navigation

- **Background Color:** Transparent
- **Text Color:** `#B3B3B3`
- **Font Size:** 7.5px
- **Font Weight:** 400
- **Separator:** `/` in `#B3B3B3`
- **Current Item:** Color `#151717`; font-weight 500
- **Gap between items:** 8px

### Links

#### Inline Link (Small)

- **Text Color:** `#151717`
- **Font Size:** 7.5px
- **Font Weight:** 400
- **Line Height:** 8.625px
- **Text Decoration:** None (underline on hover)
- **Hover State:** Color `#007AFF`; underline `1px solid #007AFF`
- **Active State:** Color `#0A5FCC`
- **Visited State:** Color `#7D5A8C` (subtle differentiation)

#### Semantic Link (Medium)

- **Text Color:** `#151717`
- **Font Size:** 15px
- **Font Weight:** 500
- **Line Height:** 18.75px
- **Text Decoration:** None
- **Hover State:** Color `#007AFF`; underline `1px solid #007AFF`

### Badges

#### Badge Default

- **Background Color:** `#F1F1F1`
- **Text Color:** `#151717`
- **Font Size:** 7.5px
- **Font Weight:** 500
- **Padding:** `4px 8px`
- **Border Radius:** 2px
- **Border:** `1px solid #C1C1C1`
- **Line Height:** 8.625px

#### Badge Accent

- **Background Color:** `#007AFF`
- **Text Color:** `#FFFFFF`
- **Font Size:** 7.5px
- **Font Weight:** 500
- **Padding:** `4px 8px`
- **Border Radius:** 2px
- **Border:** None
- **Line Height:** 8.625px

## 5. Layout Principles

### Spacing System

**Base Unit:** 4px

**Scale:**

- **4px:** Micro-spacing (icon-to-text gaps, inline padding)
- **8px:** Tight spacing (compact lists, form field gaps)
- **12px:** Small gap (section dividers within groups)
- **16px:** Standard gap (related content blocks)
- **20px:** Navigation gap (menu items, breadcrumbs)
- **24px:** Component padding (cards, containers)
- **32px:** Section spacing (major content separation)
- **36px:** Hero section spacing (large rhythm)
- **40px:** Horizontal container padding (section boundaries)
- **44px:** Large padding (full-width sections)
- **52px:** Vertical margin (section grouping)
- **60px:** Maximum vertical padding (hero sections, full bleed)

**Usage Context:**

- Micro interactions (4px, 8px): Buttons, icons, inline form elements
- Compact layouts (12px, 16px): Card content, form field spacing
- Navigation (20px): Menu gaps, breadcrumb separators
- Component standard (24px): Card interiors, section padding
- Section rhythm (32px, 36px): Content blocks, major visual breaks
- Page-level (40px, 44px, 52px, 60px): Margins, full-width sections, hero layouts

### Grid & Container

- **Max Width:** 1440px (desktop full bleed)
- **Column Strategy:** 12-column grid at desktop; 6-column at tablet; 4-column at mobile
- **Gutter Width:** 20px (half-gap between columns)
- **Container Padding:** 40px horizontal (desktop), 24px (tablet), 16px (mobile)
- **Section Margin:** `margin: 52px auto` for vertical rhythm
- **Breakpoint-based Adjustments:**
  - Desktop (1440px+): Full 12-column grid, 40px padding
  - Tablet (768px): 6-column grid, 24px padding, 16px margins
  - Mobile (375px): Single-column stack, 16px padding, 24px margins

### Whitespace Philosophy

The system embraces generous whitespace as a primary design tool, not a consequence. Empty space clarifies content hierarchy, reduces cognitive load, and creates a sense of luxury and refinement. Large vertical gaps (32px–60px) separate major content blocks. Horizontal breathing room around text (24px padding) prevents cramped sensation. Card interiors use 24px padding minimum to establish comfortable reading zones. Page sections float within their containers rather than touching edges, creating visual containment and focus.

### Border Radius Scale

- **0px:** Sharp corners for inputs, borders, and geometric components (primary system choice)
- **2px:** Subtle rounding for cards, badges, and contained elements; minimal visual softness
- **100px:** Fully rounded button and pill elements; maximum approachability and affordance clarity

## 6. Depth & Elevation

| Level               | Treatment                          | Use                                                         |
| ------------------- | ---------------------------------- | ----------------------------------------------------------- |
| Base (0)            | No shadow                          | Flat content, backgrounds, default inputs                   |
| Raised (1)          | `0px 2px 8px rgba(0, 0, 0, 0.08)`  | Hover states on cards, subtle lift for interactive elements |
| Elevated (2)        | `0px 4px 12px rgba(0, 0, 0, 0.12)` | Default card elevation, modal surfaces, floating panels     |
| Prominent (3)       | `0px 6px 16px rgba(0, 0, 0, 0.16)` | Hovered elevated cards, dropdown menus, tooltip overlays    |
| Modal / Overlay (4) | `0px 8px 24px rgba(0, 0, 0, 0.20)` | Modals, popovers, highest non-fixed layers                  |

**Shadow Philosophy:**

The design system uses soft, diffused shadows grounded in subtle black transparency rather than harsh contrast. Shadows are minimal by default—the system prefers borders and spacing over depth. Elevation increases only on interaction (hover, focus) or to establish clear layering hierarchies (modals above base content). Shadows use three-stop blur progression (8px → 12px → 16px → 24px) with consistent alpha values (0.08–0.20) to create optical depth without visual weight. This approach maintains the clean, minimalist aesthetic while providing essential feedback and spatial clarity.

## 7. Do's and Don'ts

### Do

- **Use black (`#151717` or `#000000`) as primary text** on white backgrounds for maximum contrast and readability; swap to white text only on dark surfaces
- **Apply the 100px border radius exclusively to buttons and pill-shaped elements** to signal affordance and interactivity; keep cards and inputs at 0px or 2px
- **Maintain 24px padding minimum inside cards and containers** to create breathing room and reduce cognitive crowding
- **Use the accent blue (`#007AFF`) sparingly for critical CTAs, form focus states, and link hover effects** to preserve visual distinction and avoid desaturation
- **Stack vertical sections with 32px–60px gaps** to establish clear content hierarchy and visual rhythm; never butt sections directly against each other
- **Apply Instrument Sans exclusively** across all scales; avoid serif alternates or system fonts to maintain brand coherence
- **Layer multiple text weights (400, 500, 600, 700) rather than color shifts** to communicate hierarchy; contrast size and weight over tone
- **Use borders (`1px solid #C1C1C1`) on light backgrounds** and let hover state upgrade to `#151717` or `#007AFF` to indicate interactivity
- **Test touch targets at minimum 44px × 44px** (including padding) for mobile and tablet interfaces
- **Reserve white space as a strategic design tool**, not leftover space; intentional emptiness signals clarity and sophistication

### Don't

- **Don't use pure black (`#000000`) for body text at small scales (under 16px)**; substitute `#151717` for improved rendering and reduced eye strain
- **Don't apply colored backgrounds (non-white, non-neutral) to large content areas**; the palette is deliberately monochromatic to avoid visual fatigue
- **Don't mix border radii on similar components**; keep inputs/cards at 0px or 2px; buttons always 100px
- **Don't add drop shadows to more than 2–3 elements per view**; excessive shadows flatten hierarchy instead of enhancing it
- **Don't use letter-spacing values above `-0.2px` outside of hero display text**; negative spacing at body scale reduces legibility
- **Don't apply the accent blue to non-interactive elements**; blue is reserved for links, buttons, and focus states only
- **Don't compress padding below 16px in card interiors or section containers**; crowded layouts diminish perceived quality
- **Don't substitute alternative fonts or weights** (thin, extra-bold, condensed); this system uses only Instrument Sans regular through bold
- **Don't create custom color variants not listed in the palette**; stick to defined hex values to maintain brand consistency
- **Don't ignore focus states for keyboard navigation**; always apply `2px solid #007AFF` outline with 3px inset for accessibility
- **Don't scale text responsively below 13.5px on mobile**; maintain minimum readable size across all breakpoints

## 8. Responsive Behavior

### Breakpoints

| Name         | Width        | Key Changes                                           | Font Adjustments                                  | Layout Strategy                                                        |
| ------------ | ------------ | ----------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| Desktop      | 1440px+      | Full 12-column grid, 40px padding, all spacing intact | All sizes unchanged (105px–7.5px)                 | Multi-column layouts, hero sections full-width                         |
| Tablet       | 768px–1439px | 6-column grid, 24px padding, section gaps 24px–36px   | H1 reduced to 80px, body maintained at 24px       | 2–3 column layouts, images 50% width                                   |
| Small Tablet | 600px–767px  | 4-column grid, 20px padding, section gaps 20px–24px   | H1 reduced to 60px, body 18px, links 12px         | Single-column with 2-column cards, stacked navigation                  |
| Mobile       | 375px–599px  | Single column, 16px padding, section gaps 16px–24px   | H1 reduced to 40px, body 16px, buttons full-width | Stacked card layouts, hamburger navigation, 44px minimum touch targets |
| Small Mobile | 320px–374px  | Single column, 12px padding, section gaps 12px–16px   | H1 reduced to 32px, body 14px, all UI scaled down | Extreme stacking, compact spacing, minimal whitespace                  |

### Touch Targets

- **Minimum Touch Size:** 44px × 44px (inclusive of padding)
- **Recommended Minimum:** 48px × 48px for thumb accessibility on mobile
- **Spacing Between Targets:** 8px minimum gap to prevent accidental taps
- **Button Height:** Always 43.98px (approximately 44px) on desktop; increase to 48px on mobile and tablet
- **Interactive Element Padding:** 12px minimum (top/bottom) × 16px minimum (left/right) to meet touch accessibility standards
- **Icon Size with Padding:** 24px icon + 10px padding on each side = 44px minimum target

### Collapsing Strategy

**Desktop (1440px+):**

- Multi-column content (2–3 columns where appropriate)
- Hero section at full width with 1440px max-width container
- Navigation horizontal, fully expanded
- 40px horizontal padding maintains breathing room

**Tablet (768px–1439px):**

- Collapse to 2–3 columns; complex grids reduce to 2-column
- Hero section reduced to 80% width with larger padding
- Navigation condenses but remains horizontal
- Padding reduces to 24px
- Font sizes reduce selectively: H1 → 80px, body → 20px

**Mobile (375px–599px):**

- Single-column layout; all multi-column components stack vertically
- Full-width buttons and cards
- Hero section title reduced to 40px; tagline at 14px
- Navigation collapses to hamburger menu or tab bar
- Padding reduces to 16px
- Gap between sections reduces to 24px; internal card gaps 16px
- All touch targets guaranteed 44px×44px minimum

**Small Mobile (320px–374px):**

- Extreme single-column stacking
- Hero title reduced to 32px
- Navigation hidden behind menu icon
- Padding reduced to 12px for space efficiency
- Card padding reduced to 16px
- Only essential information displayed; secondary content hidden until scroll

**Responsive Typography Scaling:**

```css
/* Desktop */
@media (min-width: 1440px) {
  h1 {
    font-size: 105px;
  }
  body {
    font-size: 24px;
  }
}

/* Tablet */
@media (768px) and (max-width: 1439px) {
  h1 {
    font-size: 80px;
  }
  body {
    font-size: 20px;
  }
  h2 {
    font-size: 18px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  h1 {
    font-size: 40px;
  }
  body {
    font-size: 16px;
  }
  h2 {
    font-size: 15px;
  }
  .button {
    font-size: 14px;
    width: 100%;
  }
}

/* Small Mobile */
@media (max-width: 374px) {
  h1 {
    font-size: 32px;
  }
  body {
    font-size: 14px;
  }
  h2 {
    font-size: 13px;
  }
}
```

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Dark Charcoal (`#151717`)
- **Accent Interactive:** Accent Blue (`#007AFF`)
- **Primary Background:** White (`#FFFFFF`)
- **Primary Text:** Black (`#000000`) or Dark Charcoal (`#151717`)
- **Secondary Text:** Medium Gray (`#B3B3B3`)
- **Input Borders:** Border Gray (`#C1C1C1`)
- **Card Surface:** White (`#FFFFFF`)
- **Light Divider:** Light Gray (`#F1F1F1`)

### Iteration Guide

1. **All buttons default to `border-radius: 100px` with `padding: 11.55px 22.5px` and `background-color: #151717`; hover changes to `#000000` with subtle scale transform.**

2. **Typography uses only Instrument Sans; maintain the exact sizing hierarchy (105px H1 → 7.5px small text) and keep line-height 20–40% above font size for readability.**

3. **Apply white space aggressively: cards use 24px minimum padding, sections use 32–60px vertical gaps, and containers never exceed 1440px without centering margin.**

4. **Links and focus states always use `#007AFF`; add `2px solid #007AFF` outline on focus and underline on hover to signal interactivity.**

5. **Cards and inputs use minimal or no border-radius (0px or 2px); reserve rounding exclusively for buttons to avoid visual confusion.**

6. **Stick to the defined neutral palette (`#000000`, `#FFFFFF`, `#151717`, `#B3B3B3`, `#F1F1F1`, `#383A3A`, `#1A1C1C`, `#C1C1C1`); never introduce unlisted colors or gradients.**

7. **Shadow treatment: base state (no shadow) → hover (optional `0px 2px 8px rgba(0, 0, 0, 0.08)`) → elevated (always `0px 4px 12px rgba(0, 0, 0, 0.12)`) → modal (`0px 8px 24px rgba(0, 0, 0, 0.20)`).**

8. **Responsive breakpoints at 1440px (desktop), 768px (tablet), 375px (mobile); scale H1 from 105px → 80px → 40px across breakpoints; keep minimum touch target 44px×44px on mobile.**

9. **Form inputs use `border: 1px solid #C1C1C1` with focus state `border-color: #007AFF` and `box-shadow: 0px 0px 0px 3px rgba(0, 122, 255, 0.1)`; maintain zero internal padding and 40px height baseline.**

10. **Every interactive element must have a clear hover state and focus state for accessibility; disabled elements use `#B3B3B3` background and `cursor: not-allowed`.**
