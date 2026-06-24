# Web Flow & Information Architecture

## LuxeHaven Realty — Premium B2C Real Estate Platform

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Site Map

```
luxehaven.in/
│
├── / .................................................. Homepage
│
├── /properties/ ........................................ Search Results
│   ├── ?type=buy&city=mumbai&beds=3 .................. Filtered Results
│   ├── /properties/[id] ............................... Property Detail Page
│   └── /properties/[id]/virtual-tour ................. Virtual Tour Fullscreen
│
├── /buy/ ............................................... Buy Landing
│   └── /buy/[bhk]-flats-in-[city] ................... SEO Listing Page
│
├── /rent/ .............................................. Rent Landing
│   └── /rent/[bhk]-flats-in-[city] .................. SEO Listing Page
│
├── /sell/ .............................................. Sell Landing (Seller CTA)
│   └── /sell/post-property ........................... Post a Property (Auth)
│
├── /projects/ .......................................... New Launches Hub
│   └── /projects/[slug] .............................. Developer Project Page
│
├── /agents/ ............................................ Agent Directory
│   └── /agents/[slug] ................................ Agent Profile Page
│
├── /insights/ .......................................... Market Intelligence Hub
│   ├── /insights/[city] .............................. City Market Report
│   └── /insights/[article-slug] ...................... Blog/News Article
│
├── /[city]/ ............................................ City Landing (SEO)
│   └── /[city]/[locality]/ ........................... Locality Landing (SEO)
│
├── /compare/ ........................................... Property Comparison Tool
│
├── /login/ ............................................. Authentication
├── /register/ .......................................... Registration
│
├── /dashboard/ ......................................... User Dashboard (Auth)
│   ├── /dashboard/wishlist ........................... Saved Properties
│   ├── /dashboard/alerts ............................. Search Alerts
│   ├── /dashboard/visits ............................. Scheduled Visits
│   ├── /dashboard/enquiries .......................... My Enquiries
│   └── /dashboard/profile ............................ Profile Settings
│
├── /seller/ ............................................ Seller Dashboard (Auth)
│   ├── /seller/listings .............................. My Listings
│   ├── /seller/new ................................... Post New Listing
│   ├── /seller/analytics ............................. Listing Analytics
│   └── /seller/leads ................................. Lead Management
│
├── /about/ ............................................  About LuxeHaven
├── /contact/ ........................................... Contact Page
├── /privacy/ ........................................... Privacy Policy
├── /terms/ ............................................. Terms of Service
└── /careers/ ........................................... Careers Page
```

---

## 2. User Journey Maps

### Journey 1 — The Buyer (Buy Flow)

```
STEP 1: DISCOVERY
  ↓ Google Search "3BHK flats in Bandra Mumbai"
  ↓ Lands on → /buy/3bhk-flats-in-mumbai/bandra (SEO page)
  OR
  ↓ Direct visit → Homepage
  ↓ Sees Hero Search Bar
  ↓ Types location + selects "Buy" + selects "3BHK"
  ↓ Clicks "Search"

STEP 2: RESULTS PAGE (/properties)
  ↓ Sees property cards with photos, price, area
  ↓ Applies filters: Budget ₹1.5Cr–₹2.5Cr, Ready-to-move
  ↓ Switches to Map View to check location
  ↓ Saves 3 properties to wishlist (prompted to login if guest)
  ↓ Clicks on a property card

STEP 3: PROPERTY DETAIL PAGE
  ↓ Views full photo gallery (swipe/click)
  ↓ Reads description, checks amenities
  ↓ Opens EMI calculator → ₹1.8Cr = ₹1,42,000/month EMI
  ↓ Views price breakdown (base + GST + registration)
  ↓ Checks RERA badge ✓ (MahaRERA verified)
  ↓ Explores neighbourhood (schools, hospitals, metro)
  ↓ Watches video walkthrough

STEP 4: LEAD / CONVERSION
  ↓ Clicks "Schedule a Visit"
  ↓ Modal: select date + time slot
  ↓ Enters name, phone, email
  ↓ OTP verified
  ↓ Booking confirmed via SMS + email
  ↓ OR: Clicks "Chat on WhatsApp" → opens wa.me link
  ↓ OR: Clicks "Enquire" → inline form submitted

STEP 5: POST-ENQUIRY
  ↓ User account created automatically
  ↓ Redirected to /dashboard/visits
  ↓ Email: "Your visit is scheduled for [date/time]"
  ↓ Agent receives lead notification
  ↓ 24hr before visit: SMS reminder sent
```

---

### Journey 2 — The Renter (Rent Flow)

```
STEP 1: Landing on Homepage or /rent
STEP 2: Search "2BHK rent Koramangala Bangalore" → /properties
STEP 3: Filter: Rent, Budget ₹30K–₹50K, Semi-furnished
STEP 4: Property Detail → Checks deposit terms, available from date
STEP 5: WhatsApp owner directly OR submit enquiry form
STEP 6: Agent/owner responds within 2hr (SLA target)
```

---

### Journey 3 — The Seller (List Property Flow)

```
STEP 1: Lands on /sell page (compelling CTA section)
STEP 2: Clicks "Post Your Property Free"
STEP 3: Auth wall → Register/Login (Google OAuth or OTP)
STEP 4: /seller/new — Multi-step property form:
  → Step A: Property type + listing type (sell/rent)
  → Step B: Location (city, locality, PIN code, map pin)
  → Step C: Property details (BHK, area, floor, age)
  → Step D: Price + negotiability + payment terms
  → Step E: Amenities checklist
  → Step F: Photo/video upload (drag-and-drop, 8+ photos)
  → Step G: RERA number (optional but badged if provided)
  → Step H: Preview + Publish
STEP 5: Listing goes to moderation queue (auto-approved if RERA provided)
STEP 6: Published → seller sees /seller/listings dashboard
STEP 7: Leads arrive in /seller/leads inbox
```

---

### Journey 4 — NRI Investor Flow

```
STEP 1: Lands on /projects (New Launches)
STEP 2: Browses developer projects with virtual tours
STEP 3: Clicks project → /projects/[slug]
STEP 4: Reads master plan, unit mix, RERA status, possession date
STEP 5: Downloads brochure (OTP gate)
STEP 6: Registers "Expression of Interest" (pre-launch)
STEP 7: Gets priority call from NRI desk (dedicated agent tag)
STEP 8: Books token amount online via Razorpay
STEP 9: Receives booking confirmation + legal document checklist
```

---

## 3. Page-by-Page Flow Specification

### 3.1 Homepage (/)

**Above the Fold:**

- Full-viewport hero with parallax background image
- LuxeHaven logo + nav (transparent over hero)
- Central headline: "Find the space that defines you."
- Sub-headline: "India's most trusted premium property platform."
- Unified search widget: [Buy | Rent | Sell] tabs + location input + search button

**Section Flow (scroll order):**

1. Hero (100vh) — parallax scroll
2. Search Results Preview / Featured Listings carousel
3. Explore by Property Type (horizontal pill navigation)
4. Featured New Projects (horizontal card scroll)
5. City Explorer — interactive India map
6. Trust Signals strip (50K+ listings, 10K+ verified agents, RERA verified)
7. How It Works — 3-step animated explainer
8. Market Insights — latest 3 articles
9. Testimonials — rotating review cards
10. Developer Partner logos
11. App Download CTA (Phase 2)
12. Newsletter signup
13. Footer

---

### 3.2 Search Results Page (/properties)

**Layout:** Left sidebar filters + Right content area (list/map toggle)

**Left Sidebar:**

- Search bar (with autocomplete)
- Listing type: Buy / Rent / Commercial
- Budget range slider
- BHK selector (Studio / 1 / 2 / 3 / 4+ BHK)
- Property type (Apartment / Villa / Plot / PG)
- Area (min–max sq ft slider)
- Possession status (Ready / Under Construction)
- RERA Verified toggle
- Furnishing (Unfurnished / Semi / Fully)
- Amenities checklist (Pool, Gym, Parking, etc.)
- Posted by (Owner / Agent / Builder)

**Right Content:**

- Sort dropdown + result count
- View toggle: Grid (2-col) / List / Map
- Property cards (infinite scroll, 20 per page)
- Map View: Mapbox with clustering + sidebar list
- Load more / pagination

---

### 3.3 Property Detail Page (/properties/[id])

**Sticky Header:** Property title + breadcrumb + wishlist icon + share

**Section Flow:**

1. Photo gallery (fullscreen modal on click)
2. Property headline + price + badges (RERA, Featured, New)
3. Key stats row: BHK | Area | Floor | Age | Possession
4. Quick action buttons: Enquire | Schedule Visit | WhatsApp | Save
5. Description (collapsible at 200 chars)
6. Price Breakdown accordion
7. EMI Calculator (interactive)
8. Amenities grid
9. Floor Plan (image lightbox)
10. Location + Map (Mapbox embed)
11. Neighbourhood section (POI cards)
12. Virtual Tour embed (if available)
13. Agent/Owner card (verified badge, rating, call CTA)
14. Similar Properties carousel
15. Market Price Trend chart (price/sqft over 12 months)
16. RERA details block
17. User Reviews

---

### 3.4 New Project Page (/projects/[slug])

**Hero:** Full-bleed project render image + project name overlay

**Section Flow:**

1. Project overview (location, builder, type, RERA)
2. Key highlights strip (Total units, Possession, Size range, Price range)
3. Photo gallery
4. Master plan viewer
5. Unit mix table (1BHK, 2BHK, 3BHK with sizes and prices)
6. Amenities showcase (illustrated icons grid)
7. Floor plan downloads
8. Location & connectivity (metro, airport, schools)
9. Builder profile + credibility (past projects)
10. Launch Timeline (construction phase progress)
11. Lead Capture form (sticky on desktop right panel)
12. Brochure Download (OTP gate)
13. Similar projects

---

## 4. Navigation Architecture

### Primary Navigation (Desktop)

```
[Logo]  Buy  Rent  Sell  Projects  Agents  Insights     [Search 🔍]  [Post Property]  [Login]
```

### Mobile Navigation

```
[☰]  [Logo]  [🔍]  [❤]  [👤]
Bottom Tab Bar: Home | Search | Projects | Wishlist | Profile
```

### Breadcrumb Patterns

```
Home > Buy > Mumbai > Bandra > 3BHK Apartments
Home > Projects > Mumbai > Lodha Altamount
Home > Agents > Chennai > Rajesh Kumar
```

---

## 5. Modal & Overlay Flows

| Trigger                | Modal Content                           | Action             |
| ---------------------- | --------------------------------------- | ------------------ |
| "Schedule Visit" CTA   | Date picker + time slots + contact form | Confirms booking   |
| "Enquire Now" CTA      | Name + phone + email + message          | Sends lead         |
| "Login Required"       | Login/register form (inline)            | Auth flow          |
| Photo click            | Fullscreen gallery (swipe)              | Close on X/ESC     |
| "Download Brochure"    | Phone OTP verification                  | PDF download       |
| Compare button (4 max) | Property comparison table               | Sticky compare bar |
| "Share Property"       | Copy link + WhatsApp + native share     | Share action       |

---

## 6. Error & Empty States

| Scenario                 | Display                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| No search results        | Illustrated empty state + "Try wider filters" + featured listings |
| Property not found (404) | Friendly 404 + search bar + featured suggestions                  |
| Payment failed           | Error card + retry button + support contact                       |
| Image load fail          | Gray placeholder with property icon                               |
| Slow connection          | Skeleton loading cards (animated shimmer)                         |
| Auth expired             | Toast notification → redirect to login                            |

---

## 7. Notification System

| Event                | Channel            | Content                      |
| -------------------- | ------------------ | ---------------------------- |
| Enquiry submitted    | Email + SMS        | Confirmation + agent contact |
| Visit scheduled      | Email + SMS + Push | Date/time + location         |
| Visit reminder       | SMS + Push         | 24hr and 2hr before          |
| New matching listing | Email + Push       | Listing card + CTA           |
| Price drop alert     | Email + Push       | Old price → New price        |
| RERA status update   | Email              | Verification confirmed       |
| Listing approved     | Email              | Listing live with URL        |
| Lead received        | Email + SMS + Push | Lead details for agent       |

---

_Document Owner: Product & UX Lead | Version: 1.0 | June 2026_
