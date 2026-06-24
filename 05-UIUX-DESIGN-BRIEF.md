# UI/UX Design Brief

## LuxeHaven Realty — Premium B2C Real Estate Platform

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Design Vision & Brand Identity

### Brand Positioning

LuxeHaven Realty occupies the **premium tier** of India's real estate discovery market. The design should communicate: _trustworthy authority, refined intelligence, and aspirational possibility._ Think Architectural Digest meets Bloomberg — editorial clarity with financial seriousness.

### Brand Personality

- **Sophisticated** — Not ostentatious. Confidence through restraint.
- **Transparent** — Nothing hidden. All data visible, all costs surfaced.
- **Forward-looking** — Modern digital experience for India's next generation of property buyers.
- **Trustworthy** — RERA badges, verified agents, real photos. No fake listings.

### Visual Tone

The visual language is drawn directly from the FIND Real Estate design system: a **monochromatic minimalist** palette with Instrument Sans as the single typeface. White space is the primary luxury signal. Black type on white. Accent blue (`#007AFF`) reserved for interactive confidence — never decoration.

---

## 2. Design System (From FIND Real Estate Design.md)

### 2.1 Colour Palette

| Token Name              | Hex       | Role                                            |
| ----------------------- | --------- | ----------------------------------------------- |
| `--color-black`         | `#000000` | Primary text, dominant headings                 |
| `--color-white`         | `#FFFFFF` | Primary background, card surfaces               |
| `--color-charcoal`      | `#151717` | Secondary text, CTA button backgrounds          |
| `--color-charcoal-dark` | `#383A3A` | Borders, UI dividers                            |
| `--color-near-black`    | `#1A1C1C` | Deep shadows                                    |
| `--color-gray-medium`   | `#B3B3B3` | Disabled states, placeholders, secondary labels |
| `--color-gray-light`    | `#F1F1F1` | Subtle backgrounds, card separators             |
| `--color-border`        | `#C1C1C1` | Input borders, card borders                     |
| `--color-accent`        | `#007AFF` | CTAs, links, focus states, active indicators    |
| `--color-accent-dark`   | `#0A5FCC` | Active button states, pressed links             |

### 2.2 Typography

**Font Family:** Instrument Sans (400, 500, 600, 700)
**Google Fonts import:** `?family=Instrument+Sans:wght@400;500;600;700`

| Token            | Size   | Weight | Line-Height | Letter-Spacing | Usage           |
| ---------------- | ------ | ------ | ----------- | -------------- | --------------- |
| `--text-display` | 105px  | 700    | 105px       | -1.2px         | Hero headline   |
| `--text-h2`      | 15px   | 600    | 21px        | -0.2px         | Section headers |
| `--text-h3`      | 18px   | 500    | 27px        | 0px            | Card titles     |
| `--text-body-lg` | 24px   | 500    | 31.2px      | 0px            | Primary content |
| `--text-body`    | 15px   | 500    | 18.75px     | 0px            | Secondary body  |
| `--text-caption` | 13.5px | 500    | 20.25px     | 0px            | Labels, helpers |
| `--text-micro`   | 7.5px  | 400    | 8.625px     | 0px            | Micro-links     |
| `--text-button`  | 13.5px | 500    | 18.9px      | 0px            | CTAs            |

### 2.3 Spacing Scale (Base: 4px)

```
4px  → micro (icon-to-text)
8px  → tight (list gaps)
12px → small (dividers within groups)
16px → standard (related content)
20px → nav items, breadcrumbs
24px → card padding
32px → section spacing
36px → hero section spacing
40px → horizontal container padding
44px → large padding (full-width sections)
52px → vertical margin (section grouping)
60px → max vertical padding (hero sections)
```

### 2.4 Elevation System

```
Level 0 (Base)     → No shadow. Flat.
Level 1 (Raised)   → 0px 2px 8px rgba(0,0,0,0.08)   — Card hover
Level 2 (Elevated) → 0px 4px 12px rgba(0,0,0,0.12)  — Default card
Level 3 (Prominent)→ 0px 6px 16px rgba(0,0,0,0.16)  — Dropdown, tooltip
Level 4 (Modal)    → 0px 8px 24px rgba(0,0,0,0.20)  — Modals, popovers
```

### 2.5 Border Radius

```
0px   → Inputs, borders, geometric components
2px   → Cards, badges, contained elements
100px → Buttons (pill) exclusively
```

---

## 3. Component Design Specifications

### 3.1 Navigation Bar

**Desktop:**

- Height: 60px
- Background: `transparent` (over hero) → `#FFFFFF` with `border-bottom: 1px solid #F1F1F1` on scroll
- Transition: backdrop-blur + bg shift over 150ms on scroll past 80px
- Logo: Left-aligned, 140px wide
- Nav links: `font-size: 15px`, `font-weight: 500`, `color: #151717` → `#007AFF` on hover
- Gap between links: 32px
- Right cluster: Search icon + "Post Property" button + Login
- "Post Property" button: Primary button style (pill, `#151717` bg, white text)

**Sticky behaviour:** After scrolling 80px, nav background transitions from transparent to white with subtle bottom border. No box-shadow (border only per design system).

**Mobile:**

- Hamburger menu icon (3-line, 24px × 24px touch target 44px × 44px)
- Logo centred
- Slide-in menu from right (full-height overlay, `#FFFFFF` background)
- Bottom tab bar: Home | Search | Projects | Wishlist | Profile

---

### 3.2 Hero Search Widget

The centrepiece of the homepage. Unified, tab-based search bar.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Buy]  [Rent]  [Commercial]                                        │
├─────────────────────────────────────────────────────────────────────┤
│  📍 Search by city, locality, or landmark...        [Search →]      │
└─────────────────────────────────────────────────────────────────────┘
```

- Container: `background: rgba(255,255,255,0.92)`, `backdrop-filter: blur(20px)`, `border-radius: 2px`
- Width: 780px (desktop), 100% - 32px (mobile)
- Tabs: `font-size: 15px`, active tab has bottom-border `2px solid #007AFF`, active text `#007AFF`
- Input: `font-size: 18px`, `font-weight: 500`, `color: #151717`, no border (borderless inside container)
- Search button: pill, `#151717`, 48px height

**Autocomplete dropdown:**

- Shows recent searches (with clock icon)
- Shows popular localities
- Shows current location option (GPS icon)
- Card: `background: #FFFFFF`, `border: 1px solid #C1C1C1`, `border-radius: 2px`
- Each suggestion: 48px min-height, hover `background: #F1F1F1`

---

### 3.3 Property Card

Two variants: **Grid Card** (search results) and **Featured Card** (horizontal carousels).

#### Grid Card

```
┌─────────────────────────────────────────┐
│  [PHOTO — 16:10 ratio, object-cover]    │
│  [NEW]  [RERA ✓]              [❤]       │
├─────────────────────────────────────────┤
│  ₹1.85 Cr                               │
│  3 BHK Apartment in Bandra West         │
│  📍 Bandra West, Mumbai                 │
│  ─────────────────────────              │
│  🛏 3 BHK   📐 1,240 sq ft   🏢 14th flr│
│  ─────────────────────────              │
│  Agent: Rajesh Kumar  ⭐4.8 · [Enquire] │
└─────────────────────────────────────────┘
```

- Container: `border: 1px solid #C1C1C1`, `border-radius: 2px`, `background: #FFFFFF`
- Hover: `border-color: #151717`, `box-shadow: 0px 2px 8px rgba(0,0,0,0.08)`, `translateY(-2px)` (200ms)
- Price: `font-size: 24px`, `font-weight: 700`, `color: #000000`
- Title: `font-size: 15px`, `font-weight: 500`, `color: #151717`
- Locality: `font-size: 13.5px`, `font-weight: 400`, `color: #B3B3B3`
- Stats strip: `font-size: 13.5px`, `color: #151717`, divider `|` in `#C1C1C1`
- Badges: `border-radius: 2px`, "NEW" in accent blue, "RERA" in `#383A3A`
- Wishlist heart: top-right, 44px × 44px touch target

#### Featured Card (Carousel)

- Wider: 360px × 480px portrait card
- Full-bleed image top half
- Gradient overlay on image bottom 40%
- Price + title overlaid on image (white text)
- Subtle card tilt on hover (3D rotate, see animation doc)

---

### 3.4 Filter Sidebar

- Width: 280px (desktop), full-width drawer (mobile)
- Background: `#FFFFFF`, `border-right: 1px solid #F1F1F1`
- Section headers: `font-size: 13.5px`, `font-weight: 600`, `color: #151717`, `text-transform: uppercase`, `letter-spacing: 0.5px`
- Filter sections separated by `border-bottom: 1px solid #F1F1F1`, `padding: 20px 0`

**Range Slider:**

- Track: `background: #C1C1C1`, `height: 2px`
- Filled track: `background: #007AFF`
- Thumb: `width: 16px`, `height: 16px`, `background: #151717`, `border-radius: 100px`, `border: 2px solid #FFFFFF`, box-shadow elevation 1

**Checkbox Filter:**

- Unchecked: `border: 1px solid #C1C1C1`, `background: #FFFFFF`, `border-radius: 2px`
- Checked: `background: #151717`, `border: 1px solid #151717`, checkmark in white
- Label: `font-size: 15px`, `color: #151717`

**BHK Pill Selector:**

- Pill buttons: `border: 1px solid #C1C1C1`, `border-radius: 100px`, `padding: 8px 16px`, `font-size: 13.5px`
- Selected: `background: #151717`, `color: #FFFFFF`, `border-color: #151717`

---

### 3.5 EMI Calculator

Inline interactive widget on the property detail page.

```
Loan Amount: ₹ [________________] ← user edits
Interest Rate: [8.5%]  Tenure: [20 years]

Monthly EMI: ₹1,42,305
[=========================================   ] 82% loan

Principal: ₹1,85,00,000  |  Interest: ₹2,05,000/mo
Total Interest Over Tenure: ₹47,23,200
```

- Inputs: Styled per form spec, `border: 1px solid #C1C1C1`, focus `#007AFF`
- EMI amount: `font-size: 36px`, `font-weight: 700`, `color: #000000`
- Progress bar: `height: 4px`, `background: #F1F1F1`, filled `#007AFF`, `border-radius: 100px`
- Breakdown text: `font-size: 13.5px`, `color: #B3B3B3`

---

### 3.6 Agent Profile Card

```
┌──────────────────────────────────────┐
│  [Photo 64px] Rajesh Kumar   ✓ Verified│
│              Senior Agent · 8 yrs     │
│              ⭐ 4.8 (127 reviews)     │
│              Mumbai · Bandra, Juhu    │
│  ─────────────────────────────────   │
│  [📞 Call]  [💬 WhatsApp]  [✉ Email] │
└──────────────────────────────────────┘
```

- Photo: `64px × 64px`, `border-radius: 100px`, `border: 2px solid #C1C1C1`
- Verified badge: Blue checkmark `#007AFF`, `font-size: 13.5px`
- Name: `font-size: 18px`, `font-weight: 600`
- Rating: Star icon `#FFB800` (only exception to palette — universal star convention)
- Action buttons: Icon buttons row, 44px × 44px each

---

### 3.7 RERA Verification Badge

```
[✓] RERA Registered
    MahaRERA No: P51800045678
    [Verify on MahaRERA →]
```

- Container: `border: 1px solid #C1C1C1`, `border-radius: 2px`, `padding: 12px 16px`, `background: #F1F1F1`
- Icon: Green checkmark (single UI exception — regulatory trust signal)
- RERA text: `font-size: 13.5px`, `font-weight: 600`, `color: #151717`
- Number: `font-size: 13.5px`, `font-weight: 400`, `color: #B3B3B3`
- External link: `color: #007AFF`

---

### 3.8 Price Breakdown Accordion

```
▼ Full Price Breakdown

Base Price:              ₹1,80,00,000
GST (5%):                  ₹9,00,000
Registration (1%):         ₹1,80,000
Stamp Duty (5%):           ₹9,00,000
Maintenance Deposit:       ₹2,00,000
Parking:                   ₹5,00,000
─────────────────────────────────────
Total Cost:              ₹2,06,80,000
```

- Accordion trigger: `font-size: 15px`, `font-weight: 600`, `color: #151717`
- Row items: `font-size: 15px`, `color: #151717` / `#B3B3B3` for values
- Total row: `font-size: 18px`, `font-weight: 700`, `border-top: 1px solid #383A3A`
- Expand/collapse: chevron rotation animation (200ms)

---

## 4. Page Layout Wireframes (Annotated)

### 4.1 Homepage Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAV: Logo  Buy  Rent  Sell  Projects  Agents  Insights  [Search] [Post] [Login] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    HERO (100vh — Parallax)                                  │
│                                                                             │
│           "Find the space that defines you."                                │
│           India's most trusted premium property platform.                   │
│                                                                             │
│        ┌─────────────────────────────────────────────────┐                 │
│        │  [Buy] [Rent] [Commercial]                      │                 │
│        │  📍 Search location...          [Search →]      │                 │
│        └─────────────────────────────────────────────────┘                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  FEATURED LISTINGS (Horizontal parallax scroll)                             │
│  [← Swipe or scroll →]                                                      │
│  [Card][Card][Card][Card][Card][Card]                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  PROPERTY TYPES                                                             │
│  [Apartment] [Villa] [Plot] [PG] [Commercial] [New Launch]                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  NEW PROJECTS                                    [View All Projects →]      │
│  [Project Card][Project Card][Project Card]                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  EXPLORE BY CITY             (India map with city markers, clickable)        │
│  Mumbai · Bangalore · Chennai · Hyderabad · Delhi · Pune · Kolkata          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ─────  50,000+ Listings  ─────  10,000+ Agents  ─────  RERA Verified  ──── │
├─────────────────────────────────────────────────────────────────────────────┤
│  HOW IT WORKS                                                               │
│  1. Search      2. Shortlist      3. Visit      4. Book                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  MARKET INSIGHTS                                [Read More →]               │
│  [Article Card][Article Card][Article Card]                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  TESTIMONIALS  ⭐⭐⭐⭐⭐                                                    │
│  [Review][Review][Review]                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  FOOTER: Nav links, Social, App CTA, Legal                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Property Detail Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [< Back]  Home > Buy > Mumbai > Bandra > [Property Title]    [❤ Save] │
├────────────────────────────────────────────┬─────────────────────────┤
│  PHOTO GALLERY (2/3 width)                 │  AGENT CARD (1/3 width) │
│  [Main Image — 16:9]                       │  (Sticky panel)         │
│  [Thumb][Thumb][Thumb][Thumb]   +8 more    │  ₹1.85 Cr               │
│                                            │  [Enquire Now]          │
│  ─────────────────────────────            │  [Schedule Visit]       │
│  3 BHK Apartment · Bandra West, Mumbai     │  [WhatsApp]             │
│  ₹1,85,00,000 + ₹9,00,000 GST             │  [Share]                │
│  [NEW] [RERA ✓] [Ready to Move]            │                         │
│                                            │  Rajesh Kumar ✓         │
│  🛏 3 BHK   📐 1,240 sqft   🏢 14/28       │  ⭐ 4.8 (127 reviews)  │
│                                            │                         │
│  ─────────── Description ─────────────    │  [EMI Calculator]       │
│  Stunning 3BHK in the heart of...          │  ₹1.42L/month           │
│  [Read more]                               │                         │
│                                            │  [RERA No: P51800...]   │
│  ─────────── Price Breakdown ─────────    │                         │
│  [Accordion: full cost breakdown]          │                         │
│                                            │                         │
│  ─────────── Amenities ────────────       │                         │
│  [Icon grid: Pool, Gym, Parking...]        │                         │
│                                            │                         │
│  ─────────── Floor Plan ───────────       │                         │
│  [Image lightbox trigger]                  │                         │
│                                            │                         │
│  ─────────── Location ─────────────       │                         │
│  [Mapbox embed]                            │                         │
│  [Nearby: Schools, Metro, Hospitals]       │                         │
│                                            │                         │
│  ─────────── Similar Properties ──────    │                         │
│  [Card][Card][Card]                        │                         │
├────────────────────────────────────────────┴─────────────────────────┤
│  STICKY BOTTOM BAR (mobile only): Price · [Call] · [WhatsApp] · [Save]│
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. Responsive Design Specifications

| Element           | Desktop (1440px)     | Tablet (768px)       | Mobile (375px)     |
| ----------------- | -------------------- | -------------------- | ------------------ |
| Headline H1       | 105px                | 80px                 | 40px               |
| Body text         | 24px                 | 20px                 | 16px               |
| Container padding | 40px                 | 24px                 | 16px               |
| Cards per row     | 3–4                  | 2                    | 1                  |
| Nav               | Horizontal expanded  | Horizontal condensed | Hamburger          |
| Sidebar filters   | Left panel (280px)   | Drawer overlay       | Bottom sheet       |
| Agent panel       | Sticky right (400px) | Bottom sticky bar    | Bottom CTA sheet   |
| Map view          | Side-by-side         | Full-width below     | Full-screen toggle |
| Hero search       | 780px centred        | 90% width            | Full width - 32px  |

---

## 6. Accessibility Standards

- **WCAG 2.1 AA** compliant across all pages
- Colour contrast ratio ≥ 4.5:1 for all text (verified: `#151717` on `#FFFFFF` = 16.8:1)
- Focus states: `2px solid #007AFF` outline, 3px inset on all interactive elements
- Skip-to-content link at top of every page
- All images have descriptive `alt` text
- Form inputs have visible labels (not just placeholder text)
- Error messages associated with inputs via `aria-describedby`
- Modals trap focus and restore on close
- All custom components implement ARIA roles (`role="dialog"`, `role="tablist"`, etc.)
- Touch targets minimum 44px × 44px on mobile
- Keyboard navigation: all interactions achievable without mouse

---

## 7. Design Hand-Off Checklist

- [ ] Figma file with all components in design system
- [ ] All 8 key page layouts (Homepage, Results, Detail, Project, Agent, Dashboard, Seller, Insights)
- [ ] Mobile versions of all pages
- [ ] Component states: default, hover, active, disabled, error, loading
- [ ] Icon set (Lucide React — matches design system weight)
- [ ] Typography specimen (all scales + weights)
- [ ] Colour palette swatches with tokens
- [ ] Spacing grid overlay
- [ ] Animation spec (see Parallax & Animations doc)
- [ ] Responsive breakpoint demos

---

_Document Owner: UX Lead & Brand Design | Version: 1.0 | June 2026_
