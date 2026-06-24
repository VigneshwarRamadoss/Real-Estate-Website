# Technical Requirements Document (TRD)

## LuxeHaven Realty — Premium B2C Real Estate Platform

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Architecture Overview

LuxeHaven Realty uses a **monorepo, full-stack architecture** based on the T3 stack extended for real estate scale. The system is designed for high read throughput (property browsing), moderate write throughput (listings, enquiries), and sub-2.5s LCP on mobile 4G.

```
┌─────────────────────────────────────────────────────────┐
│                      EDGE LAYER                         │
│          Cloudflare CDN + WAF + DDoS Protection         │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                   FRONTEND LAYER                        │
│         Next.js 15 (App Router) — Vercel Edge           │
│    React Server Components + Streaming SSR + ISR        │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                    API LAYER                            │
│   Next.js Route Handlers + tRPC v11 Type-Safe API       │
│          Rate Limiting (Upstash Redis)                  │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
┌────────▼──────┐ ┌──────▼──────┐ ┌─────▼─────────┐
│  PostgreSQL   │ │    Redis     │ │ Typesense /   │
│  (Supabase)   │ │  (Upstash)  │ │ Elasticsearch  │
│  Primary DB   │ │ Cache/Queue │ │ Search Engine  │
└───────────────┘ └─────────────┘ └───────────────┘
         │
┌────────▼──────────────────────────────────────────────┐
│                  STORAGE LAYER                        │
│   Supabase Storage (images) + Cloudflare R2 (videos) │
│        + Cloudflare Images (transformations)         │
└──────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend

| Technology            | Version           | Purpose                                                           |
| --------------------- | ----------------- | ----------------------------------------------------------------- |
| Next.js               | 15.x (App Router) | Full-stack framework, SSR/ISR/RSC                                 |
| React                 | 19.x              | UI component library                                              |
| TypeScript            | 5.x               | Type safety across the entire codebase                            |
| Tailwind CSS          | 4.x               | Utility-first styling engine                                      |
| Framer Motion         | 11.x              | Parallax scrolling, page transitions, micro-animations            |
| Zustand               | 5.x               | Client-side global state (filters, wishlist, compare)             |
| TanStack Query        | 5.x               | Server-state caching, optimistic updates, infinite scroll         |
| React Hook Form + Zod | Latest            | Form handling + runtime validation                                |
| Mapbox GL JS          | 3.x               | Interactive property maps (chosen over Google for custom styling) |
| Swiper.js             | 11.x              | Property photo carousels                                          |
| Recharts              | 2.x               | Price trend charts                                                |
| next-intl             | 3.x               | Internationalisation (EN, HI, TA)                                 |
| next-themes           | Latest            | Dark mode support (future phase)                                  |

### 2.2 Backend / API

| Technology     | Version | Purpose                                                           |
| -------------- | ------- | ----------------------------------------------------------------- |
| tRPC           | 11.x    | End-to-end typesafe API between Next.js client and server         |
| Prisma ORM     | 5.x     | Database schema, migrations, type-safe queries                    |
| Supabase       | Latest  | PostgreSQL hosting, Row-Level Security, Realtime, Auth            |
| Upstash Redis  | Latest  | Rate limiting, session caching, search result caching, job queues |
| BullMQ         | 5.x     | Background job processing (email, RERA verification, lead alerts) |
| Typesense      | 0.25    | Full-text + faceted property search (self-hosted on Railway)      |
| Resend         | Latest  | Transactional email (enquiry confirmations, OTP, alerts)          |
| Twilio / MSG91 | Latest  | OTP SMS delivery                                                  |
| Razorpay       | Latest  | Payment processing (token bookings, subscriptions)                |
| Firebase Admin | 12.x    | Push notifications via FCM                                        |
| Sharp          | Latest  | Server-side image processing                                      |

### 2.3 Infrastructure

| Service           | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| Vercel            | Next.js hosting, edge functions, preview deployments |
| Supabase Cloud    | Managed PostgreSQL + Storage + Auth                  |
| Railway           | Typesense search engine + BullMQ worker              |
| Cloudflare        | CDN, WAF, R2 object storage for videos/brochures     |
| Cloudflare Images | On-demand image resizing (WebP/AVIF)                 |
| Upstash           | Serverless Redis                                     |
| Sentry            | Error tracking + performance monitoring              |
| PostHog           | Product analytics, feature flags, session replay     |
| GitHub Actions    | CI/CD pipeline                                       |

---

## 3. Monorepo Structure

```
luxehaven/
├── apps/
│   ├── web/                          # Next.js 15 main application
│   │   ├── app/
│   │   │   ├── (public)/             # Unauthenticated routes
│   │   │   │   ├── page.tsx          # Homepage
│   │   │   │   ├── properties/
│   │   │   │   │   ├── page.tsx      # Search/listing results
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx  # Property detail
│   │   │   │   ├── projects/         # Developer new launches
│   │   │   │   ├── agents/           # Agent directory
│   │   │   │   ├── insights/         # Market intelligence & blog
│   │   │   │   └── [city]/           # SEO city landing pages
│   │   │   ├── (auth)/               # Authenticated routes
│   │   │   │   ├── dashboard/        # User dashboard
│   │   │   │   ├── wishlist/
│   │   │   │   ├── alerts/
│   │   │   │   └── seller/           # Seller listing management
│   │   │   ├── (admin)/              # Admin panel
│   │   │   │   ├── listings/
│   │   │   │   ├── users/
│   │   │   │   └── analytics/
│   │   │   ├── api/
│   │   │   │   ├── trpc/[trpc]/      # tRPC handler
│   │   │   │   ├── webhooks/         # Razorpay, Firebase webhooks
│   │   │   │   └── og/               # Open Graph image generation
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/                   # Design system primitives
│   │   │   ├── property/             # Property-specific components
│   │   │   ├── search/               # Search + filter components
│   │   │   ├── map/                  # Map components
│   │   │   ├── forms/                # Enquiry, listing, auth forms
│   │   │   └── layout/               # Nav, footer, sidebar
│   │   ├── lib/
│   │   │   ├── api/                  # tRPC routers
│   │   │   ├── db/                   # Prisma client
│   │   │   ├── auth/                 # Supabase auth helpers
│   │   │   ├── search/               # Typesense client + indexing
│   │   │   ├── payments/             # Razorpay helpers
│   │   │   ├── storage/              # Supabase/R2 upload helpers
│   │   │   ├── email/                # Resend email templates
│   │   │   └── utils/                # Shared utilities
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── store/                    # Zustand stores
│   │   └── types/                    # Global TypeScript types
│   └── workers/                      # BullMQ job workers (Node.js)
│       ├── email-worker.ts
│       ├── lead-worker.ts
│       ├── rera-worker.ts
│       └── indexing-worker.ts
├── packages/
│   ├── database/                     # Prisma schema + migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── ui/                           # Shared design system components
│   ├── config/                       # Shared ESLint, TS, Tailwind config
│   └── types/                        # Shared TypeScript types
├── tooling/
│   ├── eslint/
│   ├── typescript/
│   └── tailwind/
├── .github/workflows/                # CI/CD pipelines
├── docker-compose.yml                # Local dev environment
├── turbo.json                        # Turborepo build pipeline
└── package.json
```

---

## 4. API Architecture (tRPC Routers)

### 4.1 Router Structure

```typescript
// lib/api/root.ts
export const appRouter = createTRPCRouter({
  properties: propertiesRouter,
  search: searchRouter,
  enquiries: enquiriesRouter,
  agents: agentsRouter,
  projects: projectsRouter,
  users: usersRouter,
  wishlist: wishlistRouter,
  bookings: bookingsRouter,
  reviews: reviewsRouter,
  analytics: analyticsRouter,
  admin: adminRouter,
});
```

### 4.2 Key Endpoints

#### Properties Router

```typescript
properties.getById(id: string)           → PropertyDetail
properties.search(filters: SearchInput)  → PaginatedProperties
properties.getSimilar(id: string)        → Property[]
properties.getFeatured()                 → Property[]
properties.getByAgent(agentId: string)   → Property[]
properties.create(data: CreateProperty)  → Property  [AUTH]
properties.update(id, data)              → Property  [AUTH]
properties.delete(id: string)            → void      [AUTH]
properties.incrementView(id: string)     → void
```

#### Search Router

```typescript
search.properties(query: SearchQuery)   → SearchResult
search.suggestions(q: string)           → string[]
search.localities(city: string)         → Locality[]
search.recentSearches()                 → Search[]   [AUTH]
```

#### Enquiries Router

```typescript
enquiries.create(data: EnquiryInput)    → Enquiry
enquiries.getByProperty(id: string)     → Enquiry[]  [AGENT]
enquiries.respond(id, message)          → Enquiry    [AGENT]
```

#### Bookings Router

```typescript
bookings.initiateVisit(data)            → Booking + RazorpayOrder
bookings.confirmVisit(orderId)          → Booking
bookings.cancelVisit(bookingId)         → void       [AUTH]
bookings.getMyBookings()                → Booking[]  [AUTH]
```

---

## 5. Search Architecture

### Typesense Schema (Property Collection)

```json
{
  "name": "properties",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "title", "type": "string" },
    { "name": "locality", "type": "string", "facet": true },
    { "name": "city", "type": "string", "facet": true },
    { "name": "propertyType", "type": "string", "facet": true },
    { "name": "listingType", "type": "string", "facet": true },
    { "name": "bedrooms", "type": "int32", "facet": true },
    { "name": "bathrooms", "type": "int32", "facet": true },
    { "name": "price", "type": "float", "sort": true },
    { "name": "pricePerSqft", "type": "float", "sort": true },
    { "name": "carpetArea", "type": "float" },
    { "name": "isReraVerified", "type": "bool", "facet": true },
    { "name": "isFeatured", "type": "bool", "facet": true },
    { "name": "amenities", "type": "string[]", "facet": true },
    { "name": "facing", "type": "string", "facet": true },
    { "name": "floor", "type": "int32" },
    { "name": "location", "type": "geopoint" },
    { "name": "postedAt", "type": "int64", "sort": true },
    { "name": "propertyScore", "type": "float", "sort": true }
  ],
  "default_sorting_field": "postedAt"
}
```

### Search Query Pipeline

1. User input → debounced (300ms) → Typesense search
2. Faceted filters applied server-side
3. Geo radius filter if map bounds active
4. Results cached in Redis (5min TTL)
5. Analytics event fired to PostHog

---

## 6. Caching Strategy

| Layer        | Tool           | TTL                          | What's Cached                     |
| ------------ | -------------- | ---------------------------- | --------------------------------- |
| CDN Edge     | Cloudflare     | 1hr (static), 5min (dynamic) | Images, fonts, city SEO pages     |
| Next.js ISR  | Vercel         | 60s revalidation             | Property detail pages, city pages |
| API Response | Upstash Redis  | 5min                         | Search results, featured listings |
| DB Query     | Prisma + Redis | 15min                        | Property stats, price trends      |
| Session      | Upstash Redis  | 7 days                       | Auth sessions, user preferences   |

---

## 7. Authentication & Authorisation

### Auth Flow

```
User → Supabase Auth (Email OTP / Google OAuth)
     → JWT issued (access_token 15min, refresh_token 7d)
     → Stored in httpOnly cookie
     → tRPC middleware validates JWT on every request
     → Row-Level Security (RLS) enforced at DB level
```

### Role Hierarchy

| Role        | Permissions                                            |
| ----------- | ------------------------------------------------------ |
| `guest`     | Browse listings, view details, submit enquiries        |
| `user`      | Wishlist, saved searches, booking visits, reviews      |
| `seller`    | Post listings, manage own listings, view own leads     |
| `agent`     | All seller perms + manage multiple listings, analytics |
| `developer` | Project pages, bulk listing upload, lead pipeline      |
| `admin`     | Full platform access, user management, moderation      |

### Supabase RLS Policies (Examples)

```sql
-- Users can only update their own profile
CREATE POLICY "users_own_profile"
  ON users FOR UPDATE USING (auth.uid() = id);

-- Sellers can only see enquiries for their own listings
CREATE POLICY "sellers_own_enquiries"
  ON enquiries FOR SELECT USING (
    property_id IN (
      SELECT id FROM properties WHERE owner_id = auth.uid()
    )
  );

-- Properties visible to all; draft only to owner
CREATE POLICY "properties_visibility"
  ON properties FOR SELECT USING (
    status = 'ACTIVE' OR owner_id = auth.uid()
  );
```

---

## 8. Image & Media Pipeline

### Upload Flow

```
Client → Presigned URL (Supabase Storage) → Direct upload
       → Webhook triggers Sharp processing job (BullMQ)
       → Generate variants: thumb(320px), card(640px), full(1920px), og(1200×630)
       → Store variants in Supabase Storage with WebP format
       → Update DB with image URLs
       → Purge CDN cache
```

### Image Delivery

```
src: `https://images.luxehaven.in/properties/{id}/{variant}.webp`
Served via: Cloudflare Images with responsive resize params
Next.js Image: sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
Formats: WebP (primary), AVIF (next-gen), JPEG (fallback)
Lazy loading: native + Intersection Observer
```

---

## 9. Payment Integration (Razorpay)

### Token Booking Flow

```
1. User clicks "Book Now" on listing
2. POST /api/trpc/bookings.initiateVisit
   → Validates user auth
   → Creates BookingOrder in DB (status: PENDING)
   → Creates Razorpay Order (amount in paise)
   → Returns order_id + key_id to client
3. Client opens Razorpay checkout (payment_id + signature)
4. POST /api/webhooks/razorpay (signature verified)
   → Confirms BookingOrder (status: CONFIRMED)
   → Triggers email + SMS to buyer and agent
   → Creates CalendarEvent for agent
5. On visit completion: status → VISITED
6. Token amount adjustable against final booking amount
```

### Subscription Billing (Agent/Developer)

- Razorpay Subscriptions API for recurring monthly billing
- Webhook updates `subscriptionStatus` on agent/developer table
- Grace period: 7 days after failed payment before downgrade

---

## 10. Performance Budget

| Metric                         | Target                      | Enforcement           |
| ------------------------------ | --------------------------- | --------------------- |
| Largest Contentful Paint (LCP) | < 2.5s                      | Lighthouse CI gate    |
| First Input Delay (FID)        | < 100ms                     | —                     |
| Cumulative Layout Shift (CLS)  | < 0.1                       | —                     |
| Time to First Byte (TTFB)      | < 600ms                     | —                     |
| Total Page Weight (Homepage)   | < 500KB JS                  | Bundle analyzer in CI |
| Image optimization             | WebP mandatory              | next/image enforced   |
| Font loading                   | preload + font-display:swap | —                     |
| Third-party scripts            | Async/deferred only         | —                     |

---

## 11. CI/CD Pipeline

```yaml
# .github/workflows/main.yml
on: [push, pull_request]
jobs:
  quality:
    - TypeScript typecheck (tsc --noEmit)
    - ESLint (zero warnings policy)
    - Prettier formatting check
    - Unit tests (Vitest)
    - Integration tests (Playwright E2E)
    - Lighthouse CI (LCP < 2.5s, score ≥ 90)
    - Bundle size check (< 500KB JS)
  deploy:
    - Preview deployment on PR (Vercel)
    - Production deployment on main merge
    - Database migration (prisma migrate deploy)
    - Typesense index rebuild if schema changed
    - Smoke tests on production URL
    - Sentry release tracking
```

---

## 12. Security Requirements

| Area            | Implementation                                             |
| --------------- | ---------------------------------------------------------- |
| SQL Injection   | Prisma parameterised queries + RLS                         |
| XSS             | React DOM escaping + Content-Security-Policy headers       |
| CSRF            | SameSite cookies + tRPC mutation tokens                    |
| Rate Limiting   | Upstash Redis rate limiter on all API routes               |
| DDoS            | Cloudflare WAF + rate rules                                |
| Secrets         | Vercel environment variables (never in code)               |
| File Upload     | MIME type validation + virus scan (ClamAV) + size limits   |
| Auth Tokens     | httpOnly cookies, secure, SameSite=Strict                  |
| HTTPS           | Enforced at Cloudflare + HSTS preload                      |
| Data Encryption | AES-256 at rest (Supabase), TLS 1.3 in transit             |
| PII Masking     | Phone numbers masked in responses unless enquiry submitted |

---

## 13. Monitoring & Observability

| Tool               | What It Monitors                                      |
| ------------------ | ----------------------------------------------------- |
| Sentry             | Runtime errors, performance traces, release health    |
| PostHog            | User funnels, feature flags, heatmaps, session replay |
| Upstash Console    | Redis usage, rate limit hits                          |
| Vercel Analytics   | Core Web Vitals per page, edge function latency       |
| Supabase Dashboard | DB query performance, connection pooling              |
| PagerDuty          | On-call alerts for P0 incidents (uptime < 99.9%)      |

---

_Document Owner: Engineering Lead | Stack Version: June 2026_
