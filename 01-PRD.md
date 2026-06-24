# Product Requirements Document (PRD)

## LuxeHaven Realty — Premium B2C Real Estate Platform

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Executive Summary

LuxeHaven Realty is a premium B2C real estate web platform targeting the Pan-India luxury and mid-premium property market. The platform serves buyers, renters, sellers, and property explorers across residential, commercial, and new developer projects. It is designed to be award-winning in UX quality, load performance, and conversion efficiency — combining a minimalist, editorial design language with deeply functional property discovery features.

**Tagline:** _"Find the space that defines you."_

**Mission:** To remove friction, confusion, and mistrust from India's real estate discovery journey by delivering a world-class digital experience that rivals global leaders like Zillow, Zoopla, and Housing.com — but surpasses them in design refinement and UX intelligence.

---

## 2. Problem Statement

### Market Pain Points

1. **Fragmented discovery:** Existing Indian platforms (99acres, MagicBricks) are cluttered, ad-heavy, and cognitively overwhelming.
2. **Lack of trust signals:** Buyers distrust listing accuracy, agent quality, and builder credibility.
3. **Poor mobile experience:** 72% of Indian property searches happen on mobile; most platforms are desktop-first.
4. **Opaque pricing:** GST, registration charges, maintenance costs are rarely surfaced upfront.
5. **No narrative:** Properties are listed as data tables, not aspirational spaces.

### Opportunity

A premium, B2C-first experience that treats property search like luxury e-commerce — with editorial storytelling, clean filtering, transparent data, and trust-forward UI — can capture the underserved upper-middle and HNI (High Net-worth Individual) segment.

---

## 3. Target Users & Personas

### Persona 1 — The Aspirational Buyer (Primary)

- **Profile:** Age 28–42, urban professional, household income ₹25L–₹1Cr/year
- **Goal:** Purchase first or second home; values premium feel and data accuracy
- **Frustration:** Overwhelmed by ads, suspicious of agent calls, needs real photos
- **Key Jobs-to-be-Done:** Compare properties by location and budget, schedule a site visit, estimate total cost of ownership
- **Device Split:** 60% mobile, 40% desktop

### Persona 2 — The NRI Investor

- **Profile:** Age 35–55, NRI in UAE/UK/USA, investing in Indian real estate remotely
- **Goal:** Identify high-appreciation projects, book online, manage remotely
- **Frustration:** Cannot physically visit; needs 3D tours, video walkthroughs, trusted agent
- **Key Jobs-to-be-Done:** Virtual tour, legal document checklist, price trend charts, EMI calculator in INR

### Persona 3 — The Tenant / Renter

- **Profile:** Age 22–35, young professional or couple relocating for work
- **Goal:** Find verified rental listings near office, transparent deposit terms
- **Frustration:** Fake listings, broker fees, outdated availability
- **Key Jobs-to-be-Done:** Filter by locality + budget, instant WhatsApp contact, move-in date clarity

### Persona 4 — The Property Seller / Owner

- **Profile:** Age 40–60, existing property owner looking to list
- **Goal:** Get maximum visibility, qualified leads, fair valuation
- **Frustration:** Poor listing quality, no analytics on views/inquiries
- **Key Jobs-to-be-Done:** Post listing with photos, track listing performance, receive verified buyer leads

### Persona 5 — The Developer / Builder (B2B Partner)

- **Profile:** Mid-to-large residential builder launching new projects
- **Goal:** Showcase projects to premium buyers, generate qualified walk-in leads
- **Key Jobs-to-be-Done:** Project microsite within platform, launch event pages, lead pipeline dashboard

---

## 4. Business Model & Revenue Streams

| Revenue Stream          | Description                                     | Pricing Model                         |
| ----------------------- | ----------------------------------------------- | ------------------------------------- |
| Premium Listings        | Featured/boosted property placements            | ₹2,999–₹14,999/listing/month          |
| Developer Subscriptions | Dedicated project pages + lead pipeline         | ₹50,000–₹5,00,000/project             |
| Lead Generation         | Verified buyer/renter leads sold to agents      | ₹500–₹2,000/lead                      |
| Token Booking           | Online booking fee for new launch units         | 1–2% of property value (via Razorpay) |
| Verified Agent Badges   | Trust certification for individual agents       | ₹4,999/year                           |
| Data & Analytics        | Market trend reports for investors & developers | ₹9,999–₹49,999/report                 |

---

## 5. Core Feature Set

### 5.1 Discovery & Search

- **Smart Search Bar:** Location autocomplete (city, locality, landmark, PIN code), property type, budget range
- **Advanced Filters:** BHK type, carpet area, possession status, amenities, facing direction, floor, pet-friendly, RERA registered
- **Map View:** Interactive map with clustered pins, draw-to-search polygon tool
- **Sort Options:** Newest first, price low-to-high, most relevant, highest rated
- **Saved Searches:** Authenticated users can save search filters with email/push alerts

### 5.2 Property Listings

- **Listing Detail Page:** Full-screen photo gallery, video walkthrough embed, floor plan viewer
- **Price Breakdown:** Base price, GST, registration charges, stamp duty, maintenance deposit — all itemised
- **Property Score:** Algorithm-generated score (0–100) based on location, amenities, price-to-area ratio, RERA status
- **Neighbourhood Intel:** Nearby schools, hospitals, metro stations, grocery stores (Google Maps API)
- **Similar Properties:** AI-ranked recommendations based on viewed listing
- **RERA Badge:** Verified RERA registration number with external link

### 5.3 Engagement & Conversion

- **EMI Calculator:** Loan amount, tenure, interest rate (SBI/HDFC/ICICI defaults), monthly EMI output
- **Virtual Tour:** Embedded 360° tour (Matterport/custom iframe)
- **Schedule Visit:** Calendar booking widget (date + time slot + agent assignment)
- **WhatsApp Lead:** One-tap WhatsApp message to agent/owner
- **Enquiry Form:** Name, phone, email, message — triggers SMS + email to agent
- **Wishlist / Compare:** Save up to 4 properties for side-by-side comparison

### 5.4 New Project Launches

- **Developer Project Pages:** Rich editorial page with master plan, phase timeline, unit mix table
- **Pre-launch Interest:** Email capture for pre-launch priority access
- **Launch Event Countdown:** Live countdown timer for project launches
- **Brochure Download:** PDF brochure gated behind phone number OTP

### 5.5 Market Intelligence

- **Price Trend Charts:** 12-month price per sq ft chart by locality
- **Demand Heatmap:** Search volume overlay on India map
- **Investment Score:** Expected appreciation % based on infrastructure pipeline
- **News Feed:** Curated real estate news by city

### 5.6 User Accounts

- **Registration / Login:** Email + OTP, Google OAuth, Apple Sign-in
- **Dashboard:** Saved properties, search alerts, visit history, enquiry status
- **Seller Dashboard:** Listing management, views/enquiry analytics, lead tracking
- **Agent Profile Page:** Reviews, transaction history, specialisation badges

### 5.7 Trust & Verification

- **RERA Verification:** Live API check against MahaRERA, TNRERA, etc.
- **Owner Verified Badge:** Aadhaar-based ownership verification
- **Agent KYC:** GST, PAN, RERA registration for agents
- **Review System:** 5-star reviews with photo + transaction proof required

---

## 6. Non-Functional Requirements

| Requirement        | Target                                                      |
| ------------------ | ----------------------------------------------------------- |
| Page Load Speed    | < 2.5s LCP on 4G (Core Web Vitals: Good)                    |
| Mobile Performance | Lighthouse score ≥ 90 on mobile                             |
| Uptime SLA         | 99.9% (3 nines)                                             |
| Concurrent Users   | 10,000 simultaneous without degradation                     |
| SEO                | Server-side rendered pages; JSON-LD schema for listings     |
| Accessibility      | WCAG 2.1 AA compliant                                       |
| Security           | OWASP Top 10 mitigated; data encrypted at rest + transit    |
| GDPR / IT Act      | Cookie consent, data deletion requests, privacy policy      |
| Image Optimisation | Next.js Image with WebP + AVIF, lazy loading                |
| Search Indexing    | Elasticsearch or pgvector-based full-text + semantic search |

---

## 7. Platform & Device Requirements

| Platform                 | Priority | Notes                               |
| ------------------------ | -------- | ----------------------------------- |
| Web (Desktop 1440px)     | P0       | Primary design canvas               |
| Web (Mobile 375px)       | P0       | 72% Indian traffic is mobile        |
| Web (Tablet 768px)       | P1       | iPad and mid-range Android          |
| PWA (Add to Home Screen) | P1       | Offline saved searches, push alerts |
| iOS Native App           | P2       | Phase 2 roadmap                     |
| Android Native App       | P2       | Phase 2 roadmap                     |

---

## 8. Integrations

| Integration        | Purpose                                       | Provider                         |
| ------------------ | --------------------------------------------- | -------------------------------- |
| Maps               | Property location, nearby POI, draw-to-search | Google Maps Platform             |
| Payments           | Token booking, subscription billing           | Razorpay                         |
| SMS / OTP          | Login OTP, enquiry alerts                     | Twilio / MSG91                   |
| Email              | Transactional, newsletters                    | SendGrid / Resend                |
| Push Notifications | Search alerts, visit reminders                | Firebase Cloud Messaging         |
| Storage            | Property images, videos, documents            | Supabase Storage / Cloudflare R2 |
| Virtual Tours      | 360° walkthroughs                             | Matterport embed / custom WebGL  |
| Analytics          | User behaviour, conversion funnels            | PostHog (self-hosted)            |
| RERA API           | Live registration verification                | State RERA portals (scrape/API)  |
| Search Engine      | Full-text property search                     | Elasticsearch / Typesense        |
| CDN                | Global asset delivery                         | Cloudflare                       |

---

## 9. Content Strategy

### Listing Content Requirements

- Minimum 8 photographs per listing (professional quality)
- Mandatory: carpet area, built-up area, super built-up area
- Mandatory: possession date (ready/under construction + RERA date)
- Mandatory: maintenance charges, parking charges
- Optional: video walkthrough URL, 360° tour embed
- Optional: floor plan image, master plan image

### SEO Content Architecture

- City landing pages: `/properties/mumbai`, `/properties/chennai`
- Locality pages: `/properties/mumbai/bandra`
- Property type: `/buy/3bhk-flats-in-chennai`
- Blog: `/insights/property-market-chennai-2026`

---

## 10. Success Metrics & KPIs

| Metric                   | Target (6 months post-launch) |
| ------------------------ | ----------------------------- |
| Monthly Active Users     | 100,000                       |
| Property Listings        | 50,000 verified listings      |
| Lead-to-Visit Conversion | ≥ 8%                          |
| Bounce Rate              | < 40%                         |
| Average Session Duration | ≥ 4 minutes                   |
| Listing-to-Enquiry Rate  | ≥ 2.5%                        |
| NPS Score                | ≥ 55                          |
| Page 1 Google Rankings   | 500+ locality + BHK queries   |
| Revenue (Month 6)        | ₹50L MRR                      |

---

## 11. Compliance & Legal

- **RERA Compliance:** All listed properties must display RERA registration number
- **Consumer Protection Act 2019:** Accurate listing information, no misleading claims
- **IT Act 2000:** User data protection, intermediary guidelines
- **GST:** 5% GST on under-construction properties displayed in price breakdown
- **FEMA:** NRI investment disclosures and limits clearly communicated
- **Accessibility:** WCAG 2.1 AA compliance for all public pages

---

## 12. Timeline & Phasing

### Phase 1 — Foundation (Sprints 1–3, Weeks 1–6)

- Core infrastructure, design system implementation, auth, database schema
- Property listing CRUD, basic search + filter, property detail page

### Phase 2 — Discovery Engine (Sprints 4–5, Weeks 7–10)

- Map view, advanced filters, saved searches, compare tool
- EMI calculator, enquiry form, WhatsApp integration

### Phase 3 — Trust & Conversion (Sprints 6–7, Weeks 11–14)

- RERA verification, verified badges, review system
- Schedule visit, agent profiles, seller dashboard

### Phase 4 — Growth Features (Sprints 8–9, Weeks 15–18)

- Developer project pages, pre-launch campaigns, price trend charts
- SEO pages (city/locality/type), blog, market intelligence

### Phase 5 — Monetisation (Sprint 10, Weeks 19–20)

- Razorpay billing, premium listing tiers, lead purchase flow
- Analytics dashboard, A/B testing framework, PWA manifest

---

_Document Owner: Product Team | Next Review: Sprint 1 Kickoff_
