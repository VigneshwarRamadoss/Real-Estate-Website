# Implementation Guide

## LuxeHaven Realty — Sprint-by-Sprint Build Plan

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Pre-Development Setup

### 1.1 Repository & Tooling Initialisation

```bash
# 1. Create Turborepo monorepo
npx create-turbo@latest luxehaven --package-manager pnpm
cd luxehaven

# 2. Configure workspace packages
mkdir -p apps/web apps/workers packages/database packages/ui packages/config

# 3. Install core dependencies
pnpm add -w turbo typescript @types/node

# 4. Add Next.js 15 app
cd apps/web
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false

# 5. Add Prisma to database package
cd ../../packages/database
pnpm add prisma @prisma/client
npx prisma init

# 6. Install all other deps (apps/web)
cd ../../apps/web
pnpm add @trpc/server @trpc/client @trpc/next @trpc/react-query
pnpm add @tanstack/react-query
pnpm add framer-motion
pnpm add zustand
pnpm add react-hook-form @hookform/resolvers zod
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add mapbox-gl @types/mapbox-gl
pnpm add recharts
pnpm add swiper
pnpm add resend
pnpm add razorpay
pnpm add next-intl
pnpm add lucide-react
pnpm add clsx tailwind-merge
pnpm add sharp
```

### 1.2 Environment Variables

```bash
# apps/web/.env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Database
DATABASE_URL=postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxx

# Resend
RESEND_API_KEY=re_xxx

# MSG91 / Twilio
MSG91_AUTH_KEY=xxx
MSG91_TEMPLATE_ID_OTP=xxx

# Typesense
TYPESENSE_HOST=xxx.typesense.net
TYPESENSE_PORT=443
TYPESENSE_PROTOCOL=https
TYPESENSE_API_KEY=xxx

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_R2_ACCESS_KEY=xxx
CLOUDFLARE_R2_SECRET_KEY=xxx
CLOUDFLARE_R2_BUCKET=luxehaven-media

# Firebase
FIREBASE_PROJECT_ID=luxehaven-xxx
FIREBASE_CLIENT_EMAIL=xxx
FIREBASE_PRIVATE_KEY=xxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry
SENTRY_DSN=https://xxx@sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 1.3 Tailwind Config (Design System Tokens)

```typescript
// tooling/tailwind/config.ts
import type { Config } from "tailwindcss";

export const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        charcoal: "#151717",
        "charcoal-dark": "#383A3A",
        "near-black": "#1A1C1C",
        "gray-medium": "#B3B3B3",
        "gray-light": "#F1F1F1",
        border: "#C1C1C1",
        accent: "#007AFF",
        "accent-dark": "#0A5FCC",
      },
      fontFamily: {
        sans: [
          "Instrument Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        display: ["105px", { lineHeight: "105px", letterSpacing: "-1.2px" }],
        h2: ["15px", { lineHeight: "21px", letterSpacing: "-0.2px" }],
        h3: ["18px", { lineHeight: "27px" }],
        "body-lg": ["24px", { lineHeight: "31.2px" }],
        body: ["15px", { lineHeight: "18.75px" }],
        caption: ["13.5px", { lineHeight: "20.25px" }],
        micro: ["7.5px", { lineHeight: "8.625px" }],
        button: ["13.5px", { lineHeight: "18.9px" }],
      },
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        36: "36px",
        40: "40px",
        44: "44px",
        52: "52px",
        60: "60px",
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "2px",
        full: "100px",
      },
      boxShadow: {
        raised: "0px 2px 8px rgba(0,0,0,0.08)",
        elevated: "0px 4px 12px rgba(0,0,0,0.12)",
        prominent: "0px 6px 16px rgba(0,0,0,0.16)",
        modal: "0px 8px 24px rgba(0,0,0,0.20)",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};
```

---

## 2. Sprint Plan

### Sprint 1 — Foundation (Week 1–2)

**Goal:** Infra live, DB migrated, auth working, design system primitives built.

#### Tasks

**Infrastructure (Day 1–3)**

- [ ] Create Supabase project, enable PostGIS + pg_trgm extensions
- [ ] Run `prisma migrate dev` with full schema
- [ ] Deploy Railway instance for Typesense + BullMQ worker
- [ ] Set up Cloudflare R2 bucket for media
- [ ] Configure Vercel project, connect GitHub, set env vars
- [ ] Set up Sentry + PostHog

**Design System Components (Day 3–7)**

```
packages/ui/components/
├── Button.tsx         # Primary, Secondary, Icon variants
├── Input.tsx          # Text input, focus states, error states
├── Card.tsx           # Default, Elevated variants
├── Badge.tsx          # Default, Accent variants
├── Spinner.tsx        # Loading state
├── Toast.tsx          # Notification system (react-hot-toast)
├── Modal.tsx          # Base modal with AnimatePresence
└── Skeleton.tsx       # Shimmer loading placeholder
```

**Button Implementation:**

```tsx
// packages/ui/components/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal text-white rounded-full hover:bg-black " +
          "hover:scale-[1.02] active:bg-accent-dark active:scale-[0.97]",
        secondary:
          "bg-transparent text-charcoal border border-charcoal-dark " +
          "hover:border-black hover:text-black active:bg-gray-light",
        ghost: "bg-transparent text-charcoal hover:bg-gray-light",
        accent: "bg-accent text-white rounded-full hover:bg-accent-dark " + "hover:scale-[1.02]",
      },
      size: {
        sm: "h-[36px] px-4 text-caption",
        md: "h-[44px] px-[22.5px] text-button",
        lg: "h-[52px] px-8 text-body",
        icon: "h-[44px] w-[44px] p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({ className, variant, size, isLoading, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}
```

**Auth Setup (Day 7–10)**

```tsx
// lib/auth/server.ts — Supabase server client
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    },
  );
}
```

**tRPC Setup (Day 10–14)**

```typescript
// lib/api/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { createClient } from "../auth/server";

export const createTRPCContext = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, supabase };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

**Deliverables Sprint 1:**

- ✅ DB live with schema migrated
- ✅ Auth (email OTP + Google OAuth) working
- ✅ Design system primitive components
- ✅ tRPC router skeleton
- ✅ Vercel preview deployment working

---

### Sprint 2 — Homepage & Core Layouts (Week 3–4)

**Goal:** Homepage, navigation, footer, and hero fully built with animations.

#### Key Components

```
app/(public)/
├── page.tsx                   # Homepage (RSC)
components/
├── layout/
│   ├── Navbar.tsx             # Sticky transparent → white nav
│   ├── Footer.tsx             # Full footer
│   └── MobileNav.tsx          # Hamburger slide-out
├── home/
│   ├── HeroParallax.tsx       # Multi-layer hero (Framer Motion)
│   ├── SearchWidget.tsx       # Tabbed Buy/Rent/Commercial search
│   ├── FeaturedListings.tsx   # Horizontal scroll with parallax
│   ├── PropertyTypeNav.tsx    # Pill filter navigation
│   ├── NewProjects.tsx        # Project card carousel
│   ├── CityExplorer.tsx       # Interactive city grid/map
│   ├── TrustStats.tsx         # Animated counters
│   ├── HowItWorks.tsx         # 3-step staggered animation
│   ├── MarketInsights.tsx     # Article card grid
│   └── Testimonials.tsx       # Review carousel
```

**Hero Section:**
See detailed implementation in `04-PARALLAX-ANIMATIONS.md`.

**Search Widget:**

```tsx
// components/home/SearchWidget.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LISTING_TYPES = ["Buy", "Rent", "Commercial"] as const;

export function SearchWidget() {
  const [activeTab, setActiveTab] = useState<(typeof LISTING_TYPES)[number]>("Buy");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams({
      type: activeTab.toLowerCase(),
      q: query,
    });
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div
      className="bg-white/92 backdrop-blur-[20px] border border-border
                    rounded-sm w-[780px] max-w-full overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-border">
        {LISTING_TYPES.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-body font-medium transition-colors
              ${
                activeTab === tab
                  ? "text-accent border-b-2 border-accent -mb-px"
                  : "text-charcoal hover:text-black"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center px-6 py-4 gap-4">
        <span className="text-gray-medium">📍</span>
        <input
          type="text"
          placeholder="Search by city, locality, or landmark..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 text-h3 font-medium text-charcoal placeholder:text-gray-medium
                     outline-none bg-transparent"
        />
        <Button onClick={handleSearch} size="md">
          Search →
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && <SuggestionsDropdown items={suggestions} onSelect={setQuery} />}
    </div>
  );
}
```

**Deliverables Sprint 2:**

- ✅ Homepage fully rendered with all 13 sections
- ✅ Hero parallax with 4-layer depth
- ✅ Navbar (transparent → white on scroll, sticky)
- ✅ Mobile hamburger menu
- ✅ Footer with all links
- ✅ Search widget with tab switching
- ✅ Featured listing carousel
- ✅ Animated counter stats
- ✅ All entrance animations

---

### Sprint 3 — Property Search & Results (Week 5–6)

**Goal:** Full search results page with filters, map, and property cards.

#### Key Files

```
app/(public)/properties/
├── page.tsx                   # Server component (initial data)
└── SearchPage.tsx             # Client component (filters, state)

components/search/
├── SearchSidebar.tsx          # Filter panel
├── FilterSection.tsx          # Generic collapsible filter group
├── RangeSlider.tsx            # Budget / area slider
├── BHKSelector.tsx            # Pill multi-select
├── AmenitiesFilter.tsx        # Checkbox list (collapsible)
├── PropertyGrid.tsx           # 2-col card grid
├── PropertyListItem.tsx       # List view row
├── MapView.tsx                # Mapbox fullscreen map
├── PropertyPin.tsx            # Map cluster / individual pin
├── SortDropdown.tsx           # Sort options
├── ViewToggle.tsx             # Grid / List / Map
└── ResultsCount.tsx           # "42 properties found in Bandra"

components/property/
├── PropertyCard.tsx           # Grid card
├── PropertyCardSkeleton.tsx   # Loading shimmer
├── PropertyBadges.tsx         # NEW / RERA / Featured badges
└── WishlistButton.tsx         # Heart toggle with animation
```

**tRPC Search Procedure:**

```typescript
// lib/api/routers/properties.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { typesenseClient } from "../../search/typesense";
import { redis } from "../../cache/redis";

const SearchFiltersSchema = z.object({
  query: z.string().optional(),
  listingType: z.enum(["BUY", "RENT", "COMMERCIAL_SALE", "COMMERCIAL_RENT"]).optional(),
  cityId: z.string().uuid().optional(),
  localityIds: z.array(z.string().uuid()).optional(),
  bhkTypes: z
    .array(z.enum(["STUDIO", "ONE_BHK", "TWO_BHK", "THREE_BHK", "FOUR_BHK", "FIVE_PLUS_BHK"]))
    .optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  areaMin: z.number().optional(),
  areaMax: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  possessionStatus: z.enum(["READY_TO_MOVE", "UNDER_CONSTRUCTION", "NEW_LAUNCH"]).optional(),
  isReraVerified: z.boolean().optional(),
  furnishing: z.enum(["UNFURNISHED", "SEMI_FURNISHED", "FULLY_FURNISHED"]).optional(),
  sortBy: z.enum(["newest", "price_asc", "price_desc", "area_asc", "relevance"]).default("newest"),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(50).default(20),
  // Geo search
  lat: z.number().optional(),
  lng: z.number().optional(),
  radiusKm: z.number().optional(),
});

export const propertiesRouter = createTRPCRouter({
  search: publicProcedure.input(SearchFiltersSchema).query(async ({ input }) => {
    // Cache key based on filters
    const cacheKey = `search:${JSON.stringify(input)}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached as string);

    // Build Typesense query
    const searchParams = {
      q: input.query || "*",
      query_by: "title,locality,city,description",
      filter_by: buildTypesenseFilters(input),
      sort_by: buildTypesenseSort(input.sortBy),
      page: input.page,
      per_page: input.pageSize,
      facet_by: "listingType,propertyType,bedrooms,city,locality,amenities",
    };

    const result = await typesenseClient.collections("properties").documents().search(searchParams);

    const response = {
      properties: result.hits?.map((h) => h.document) ?? [],
      totalCount: result.found ?? 0,
      facets: result.facet_counts ?? [],
      page: input.page,
      pageSize: input.pageSize,
    };

    // Cache for 5 minutes
    await redis.set(cacheKey, JSON.stringify(response), { ex: 300 });

    return response;
  }),
});
```

**Deliverables Sprint 3:**

- ✅ Search results page with URL-based filter state
- ✅ Sidebar with all filters (collapsible sections)
- ✅ Property cards (grid + list view)
- ✅ Skeleton loading states
- ✅ Map view with Mapbox and clustering
- ✅ Infinite scroll (TanStack Query `useInfiniteQuery`)
- ✅ Filter change layout animation
- ✅ Sort dropdown
- ✅ Wishlist toggle (persisted to localStorage for guests, DB for users)

---

### Sprint 4 — Property Detail Page (Week 7–8)

**Goal:** Full property detail page with all conversion elements.

#### Key Files

```
app/(public)/properties/[id]/
├── page.tsx                   # SSR + metadata (JSON-LD)
├── PropertyGallery.tsx        # Full-screen gallery
├── PropertyHeader.tsx         # Title, price, badges
├── PropertyStats.tsx          # Key stats strip
├── PropertyDescription.tsx    # Expandable text
├── PriceBreakdown.tsx         # Accordion cost breakdown
├── EMICalculator.tsx          # Interactive EMI widget
├── AmenitiesGrid.tsx          # Icon grid
├── FloorPlanViewer.tsx        # Lightbox image
├── LocationMap.tsx            # Mapbox embed + POI
├── NeighbourhoodPOI.tsx       # Nearby schools, hospitals, metro
├── VirtualTour.tsx            # Matterport iframe
├── AgentCard.tsx              # Sticky right panel
├── EnquiryModal.tsx           # Slide-up form modal
├── VisitBookingModal.tsx       # Date + time picker
├── SimilarProperties.tsx      # Recommendations carousel
├── PriceTrendChart.tsx         # Recharts 12-month trend
├── RERABlock.tsx              # Verification details
└── StickyMobileBar.tsx        # Mobile: price + action buttons
```

**JSON-LD Schema (SEO):**

```typescript
// app/(public)/properties/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);
  return {
    title: `${property.title} | LuxeHaven`,
    description: property.seoDescription ?? property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      images: [{ url: property.images[0]?.ogUrl ?? "" }],
    },
  };
}

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: property.title,
  description: property.description,
  price: (property.price / 100).toString(),
  priceCurrency: "INR",
  address: {
    "@type": "PostalAddress",
    addressLocality: property.locality?.name,
    addressRegion: property.city.state,
    addressCountry: "IN",
    postalCode: property.pinCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: property.latitude,
    longitude: property.longitude,
  },
};
```

**EMI Calculator:**

```tsx
// components/property/EMICalculator.tsx
"use client";
import { useState, useMemo } from "react";

export function EMICalculator({ propertyPrice }: { propertyPrice: number }) {
  const [loanAmount, setLoanAmount] = useState(propertyPrice * 0.8);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / (12 * 100);
    const n = tenure * 12;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, interestRate, tenure]);

  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  return (
    <div className="border border-border rounded-sm p-6 space-y-6">
      <h3 className="text-h3 font-medium text-charcoal">EMI Calculator</h3>

      {/* Loan Amount */}
      <div>
        <label className="text-caption font-medium text-charcoal mb-2 block">
          Loan Amount: ₹{(loanAmount / 100000).toFixed(1)}L
        </label>
        <input
          type="range"
          min={500000}
          max={propertyPrice}
          step={100000}
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </div>

      {/* Result */}
      <div className="bg-gray-light rounded-sm p-4 text-center">
        <p className="text-caption text-gray-medium mb-1">Monthly EMI</p>
        <p className="text-[36px] font-bold text-black leading-none">
          ₹{Math.round(emi).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Breakdown */}
      <div className="flex justify-between text-caption text-gray-medium">
        <span>Principal: ₹{(loanAmount / 100000).toFixed(1)}L</span>
        <span>Total Interest: ₹{(totalInterest / 100000).toFixed(1)}L</span>
      </div>
    </div>
  );
}
```

**Deliverables Sprint 4:**

- ✅ Property detail page (SSR with ISR 60s)
- ✅ Photo gallery with fullscreen lightbox
- ✅ Sticky agent card (desktop right panel)
- ✅ Mobile sticky bottom bar
- ✅ EMI calculator (interactive)
- ✅ Enquiry form modal (Slide-up)
- ✅ Visit booking modal (date/time picker)
- ✅ Mapbox neighbourhood map
- ✅ Price trend Recharts chart
- ✅ JSON-LD + OG metadata
- ✅ Similar properties carousel

---

### Sprint 5 — New Projects & Agent Pages (Week 9–10)

**Goal:** Developer project pages and agent profiles.

#### Project Page

```
app/(public)/projects/[slug]/
├── page.tsx                   # Project detail (SSR)
├── ProjectHero.tsx            # Ken Burns hero
├── ProjectUnitMix.tsx         # Table with BHK breakdown
├── ProjectTimeline.tsx        # Phase progress SVG animation
├── LeadCapturePanel.tsx       # Sticky right panel / form
└── BrochureGate.tsx           # OTP-gated PDF download
```

#### Agent Profile Page

```
app/(public)/agents/[slug]/
├── page.tsx                   # Agent profile (SSR)
├── AgentHero.tsx              # Profile photo + stats
├── AgentListings.tsx          # Agent's active listings grid
├── AgentReviews.tsx           # Reviews list
└── ContactAgentForm.tsx       # Direct contact form
```

**Deliverables Sprint 5:**

- ✅ Project page with all sections
- ✅ Unit mix table
- ✅ Phase timeline with scroll animation
- ✅ Sticky lead capture form (desktop)
- ✅ Brochure download with OTP gate
- ✅ Agent directory page
- ✅ Agent profile page
- ✅ Agent review system

---

### Sprint 6 — Auth & User Dashboard (Week 11–12)

**Goal:** Full auth flow and user dashboard.

```
app/(auth)/
├── dashboard/
│   ├── page.tsx               # Overview: recent activity
│   ├── wishlist/page.tsx      # Saved properties grid
│   ├── alerts/page.tsx        # Search alert management
│   ├── visits/page.tsx        # Upcoming + past visits
│   ├── enquiries/page.tsx     # Enquiry history
│   └── profile/page.tsx       # Profile settings
```

**Deliverables Sprint 6:**

- ✅ Email OTP login
- ✅ Google OAuth login
- ✅ Protected route middleware
- ✅ Wishlist sync (localStorage → DB on login)
- ✅ User dashboard all tabs
- ✅ Search alert creation + management
- ✅ Visit history
- ✅ Profile edit form

---

### Sprint 7 — Seller & Agent Dashboard (Week 13–14)

**Goal:** Listing creation and management for sellers/agents.

```
app/(auth)/seller/
├── listings/page.tsx          # My listings management
├── new/page.tsx               # Multi-step listing form
├── [id]/edit/page.tsx         # Edit existing listing
├── analytics/page.tsx         # Views, enquiries, lead chart
└── leads/page.tsx             # Lead inbox with status management
```

**Multi-step Listing Form:**

```
Step 1: Listing type (Buy/Rent) + Property type
Step 2: Location (city picker → locality picker → map pin drop)
Step 3: Property details (BHK, area, floor, age, facing)
Step 4: Pricing (price, maintenance, parking, negotiability)
Step 5: Amenities (checkbox grid)
Step 6: Media (drag-and-drop upload, sort images)
Step 7: RERA details (optional)
Step 8: Preview + Publish
```

**Image Upload:**

```typescript
// lib/storage/upload.ts
export async function uploadPropertyImage(
  file: File,
  propertyId: string,
): Promise<{ url: string; key: string }> {
  const key = `properties/${propertyId}/${Date.now()}-${file.name}`;

  // Get presigned URL from Supabase Storage
  const { data, error } = await supabase.storage.from("property-images").createSignedUploadUrl(key);

  if (error) throw error;

  // Upload directly to Supabase from browser
  await fetch(data.signedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  // Enqueue processing job (BullMQ)
  await imageProcessingQueue.add("process-image", { key, propertyId });

  return {
    url: supabase.storage.from("property-images").getPublicUrl(key).data.publicUrl,
    key,
  };
}
```

**Deliverables Sprint 7:**

- ✅ Multi-step listing form (8 steps)
- ✅ Drag-and-drop image upload
- ✅ Image reordering
- ✅ Draft autosave (localStorage + DB)
- ✅ Listing moderation queue (admin)
- ✅ Lead inbox with status management
- ✅ Listing analytics dashboard (views, enquiries chart)

---

### Sprint 8 — SEO & Market Intelligence (Week 15–16)

**Goal:** SEO landing pages, blog, and price trend analytics.

```
app/(public)/
├── [city]/
│   └── page.tsx               # City landing (ISR)
├── [city]/[locality]/
│   └── page.tsx               # Locality landing (ISR)
├── buy/[slug]/
│   └── page.tsx               # /buy/3bhk-flats-in-mumbai (ISR)
└── insights/
    ├── page.tsx               # Blog index
    ├── [city]/page.tsx        # City market report
    └── [article-slug]/page.tsx # Article page
```

**ISR + Sitemap:**

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const cities = await getCities();
  const localities = await getLocalities();
  const properties = await getActivePropertySlugs();
  const projects = await getActiveProjectSlugs();
  const articles = await getPublishedArticleSlugs();

  return [
    { url: "https://luxehaven.in", lastModified: new Date() },
    ...cities.map((c) => ({
      url: `https://luxehaven.in/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    })),
    ...properties.map((p) => ({
      url: `https://luxehaven.in/properties/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "daily",
    })),
    // ... etc
  ];
}
```

**Deliverables Sprint 8:**

- ✅ City landing pages (ISR, 1hr revalidation)
- ✅ Locality landing pages
- ✅ BHK + city SEO pages (/buy/3bhk-flats-in-chennai)
- ✅ Blog article pages
- ✅ Price trend charts by locality
- ✅ XML sitemap
- ✅ robots.txt
- ✅ JSON-LD on all SEO pages
- ✅ Open Graph images (dynamic, via /api/og)

---

### Sprint 9 — Notifications, Search Alerts & PWA (Week 17–18)

**Goal:** Full notification system and PWA.

```
apps/workers/
├── email-worker.ts       # BullMQ: sends via Resend
├── sms-worker.ts         # BullMQ: sends via MSG91
├── alert-worker.ts       # Cron: checks search alerts, sends matches
├── rera-worker.ts        # Cron: verifies RERA numbers
└── indexing-worker.ts    # Syncs Typesense on property changes
```

**Search Alert Worker:**

```typescript
// apps/workers/alert-worker.ts
import { CronJob } from "cron";
import { db } from "../../packages/database/client";
import { typesenseClient } from "../../apps/web/lib/search/typesense";
import { sendAlertEmail } from "../../apps/web/lib/email/templates";

const alertJob = new CronJob("0 */6 * * *", async () => {
  const alerts = await db.searchAlert.findMany({
    where: { isActive: true, frequency: "DAILY" },
    include: { user: true },
  });

  for (const alert of alerts) {
    const results = await typesenseClient
      .collections("properties")
      .documents()
      .search({
        q: "*",
        filter_by: buildFiltersFromAlert(alert.filters as AlertFilters),
        per_page: 5,
        sort_by: "postedAt:desc",
      });

    if (results.found > 0) {
      await sendAlertEmail({
        to: alert.user.email,
        alertName: alert.name ?? "Your search",
        matches: results.hits?.map((h) => h.document) ?? [],
        matchCount: results.found,
      });

      await db.searchAlert.update({
        where: { id: alert.id },
        data: {
          lastTriggeredAt: new Date(),
          matchCount: { increment: results.found },
        },
      });
    }
  }
});
```

**PWA Manifest:**

```json
// public/manifest.json
{
  "name": "LuxeHaven Realty",
  "short_name": "LuxeHaven",
  "description": "Find the space that defines you.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#151717",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Deliverables Sprint 9:**

- ✅ BullMQ workers (email, SMS, RERA, indexing)
- ✅ Search alert email notifications
- ✅ Push notifications (Firebase FCM)
- ✅ Visit reminder SMS (24hr + 2hr before)
- ✅ PWA manifest + service worker
- ✅ Offline support (saved properties cached)

---

### Sprint 10 — Monetisation & Launch Prep (Week 19–20)

**Goal:** Razorpay billing, premium listings, admin panel, production hardening.

#### Razorpay Subscription Setup

```typescript
// lib/payments/subscriptions.ts
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createAgentSubscription(agentId: string, plan: "basic" | "premium") {
  const PLAN_IDS = {
    basic: "plan_LuxeBasic001", // ₹4,999/month
    premium: "plan_LuxePremium001", // ₹14,999/month
  };

  const subscription = await razorpay.subscriptions.create({
    plan_id: PLAN_IDS[plan],
    total_count: 12, // 12 billing cycles
    quantity: 1,
    notes: { agentId },
  });

  await db.agent.update({
    where: { id: agentId },
    data: { subscriptionId: subscription.id, subscriptionStatus: "TRIALING" },
  });

  return subscription;
}
```

#### Admin Panel

```
app/(admin)/
├── dashboard/page.tsx         # Platform overview metrics
├── listings/page.tsx          # Moderation queue
├── users/page.tsx             # User management
├── projects/page.tsx          # Developer project management
└── analytics/page.tsx         # Revenue, traffic, conversion
```

**Deliverables Sprint 10:**

- ✅ Razorpay token booking flow
- ✅ Razorpay subscription billing (agents/developers)
- ✅ Premium listing upgrade flow
- ✅ Admin panel (listing moderation, user management)
- ✅ Revenue analytics dashboard
- ✅ Lighthouse CI ≥ 90 on all key pages
- ✅ Load testing (k6: 10K concurrent users)
- ✅ Security audit (OWASP Top 10)
- ✅ Production deployment checklist
- ✅ Monitoring dashboards (Sentry, PostHog, Vercel)

---

## 3. Testing Strategy

### Unit Tests (Vitest)

```
tests/unit/
├── lib/payments/emi-calculator.test.ts
├── lib/search/filter-builder.test.ts
├── lib/auth/permissions.test.ts
└── components/Button.test.tsx
```

### Integration Tests (Playwright E2E)

```
tests/e2e/
├── homepage.spec.ts           # Hero, search widget, all sections
├── search.spec.ts             # Filter combinations, map view
├── property-detail.spec.ts    # Gallery, EMI, enquiry form
├── auth.spec.ts               # Login, register, OTP
├── seller-flow.spec.ts        # Post listing, manage leads
└── booking.spec.ts            # Visit booking, Razorpay (test mode)
```

### Performance Tests (k6)

```javascript
// tests/performance/search-load.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 1000 }, // ramp to 1K users
    { duration: "5m", target: 10000 }, // hold at 10K users
    { duration: "2m", target: 0 }, // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% < 2s
    http_req_failed: ["rate<0.01"], // < 1% errors
  },
};

export default function () {
  const res = http.get("https://luxehaven.in/api/trpc/properties.search?input=...");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
```

---

## 4. Production Launch Checklist

### Pre-Launch

- [ ] All env vars set in Vercel production
- [ ] DB connection pool configured (PgBouncer)
- [ ] Cloudflare WAF rules active
- [ ] SSL certificate active (Vercel auto-provisioned)
- [ ] Custom domain `luxehaven.in` pointing to Vercel
- [ ] Razorpay live keys activated
- [ ] MSG91 DLT templates approved
- [ ] Seed data: 5 cities, 50 localities, 100 demo listings
- [ ] Admin account created
- [ ] Sentry + PostHog connected
- [ ] Google Search Console verified
- [ ] Google Analytics 4 connected
- [ ] robots.txt allowing all crawlers
- [ ] Sitemap.xml submitted to Google

### Day 1 Monitoring

- [ ] Sentry error rate < 0.1%
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] API p95 latency < 500ms
- [ ] No P0 incidents in first 24hr
- [ ] Payment webhooks verified working

---

_Document Owner: Engineering Lead | Sprint Velocity: 2-week sprints | June 2026_
