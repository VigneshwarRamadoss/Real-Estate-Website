# Backend Schema

## LuxeHaven Realty — PostgreSQL + Prisma Schema

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Schema Overview

The LuxeHaven database is a PostgreSQL schema (hosted on Supabase) with Prisma ORM as the abstraction layer. It is designed for:

- High-read property discovery queries
- Row-Level Security (RLS) at the DB level via Supabase Auth
- Full-text search delegated to Typesense (PostgreSQL stores source-of-truth)
- Geospatial indexing for map-based search (PostGIS extension)
- Soft deletes throughout (no hard deletes on listings/users)

**Extensions required:**

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- fuzzy text search
```

---

## 2. Prisma Schema

```prisma
// packages/database/schema.prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions", "fullTextSearch"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
  extensions = [uuidOssp(map: "uuid-ossp"), postgis, pgTrgm(map: "pg_trgm")]
}

// ─────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────

enum UserRole {
  GUEST
  USER
  SELLER
  AGENT
  DEVELOPER
  ADMIN
}

enum ListingType {
  BUY
  RENT
  COMMERCIAL_SALE
  COMMERCIAL_RENT
  PG
}

enum PropertyType {
  APARTMENT
  VILLA
  INDEPENDENT_HOUSE
  PLOT
  COMMERCIAL_OFFICE
  COMMERCIAL_SHOP
  WAREHOUSE
  PG_HOSTEL
}

enum BHKType {
  STUDIO
  ONE_BHK
  TWO_BHK
  THREE_BHK
  FOUR_BHK
  FIVE_PLUS_BHK
}

enum PossessionStatus {
  READY_TO_MOVE
  UNDER_CONSTRUCTION
  NEW_LAUNCH
}

enum FurnishingStatus {
  UNFURNISHED
  SEMI_FURNISHED
  FULLY_FURNISHED
}

enum Facing {
  NORTH
  SOUTH
  EAST
  WEST
  NORTH_EAST
  NORTH_WEST
  SOUTH_EAST
  SOUTH_WEST
}

enum PropertyStatus {
  DRAFT
  PENDING_REVIEW
  ACTIVE
  RENTED
  SOLD
  ARCHIVED
  REJECTED
}

enum EnquiryStatus {
  NEW
  RESPONDED
  VISIT_SCHEDULED
  CLOSED
  SPAM
}

enum BookingStatus {
  PENDING
  PAYMENT_INITIATED
  CONFIRMED
  VISITED
  CANCELLED
  REFUNDED
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELLED
  TRIALING
}

enum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}

// ─────────────────────────────────────────────────
// CORE TABLES
// ─────────────────────────────────────────────────

model User {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  supabaseId        String    @unique @map("supabase_id")  // Supabase Auth UID
  email             String    @unique
  phone             String?   @unique
  firstName         String    @map("first_name")
  lastName          String?   @map("last_name")
  avatarUrl         String?   @map("avatar_url")
  role              UserRole  @default(USER)
  isVerified        Boolean   @default(false) @map("is_verified")
  isNri             Boolean   @default(false) @map("is_nri")
  countryCode       String?   @default("+91") @map("country_code")
  preferredLanguage String?   @default("en") @map("preferred_language")
  pushToken         String?   @map("push_token")

  // Timestamps
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  lastLoginAt       DateTime? @map("last_login_at")
  deletedAt         DateTime? @map("deleted_at")

  // Relations
  profile           UserProfile?
  properties        Property[]       @relation("PropertyOwner")
  agentProfile      Agent?
  developerProfile  Developer?
  wishlist          WishlistItem[]
  enquiries         Enquiry[]        @relation("UserEnquiries")
  bookings          Booking[]
  reviews           Review[]
  searchAlerts      SearchAlert[]
  recentSearches    RecentSearch[]
  sessions          UserSession[]

  @@map("users")
  @@index([email])
  @@index([phone])
  @@index([role])
}

model UserProfile {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @unique @map("user_id") @db.Uuid
  bio               String?   @db.Text
  city              String?
  state             String?
  aadhaarVerified   Boolean   @default(false) @map("aadhaar_verified")
  panVerified       Boolean   @default(false) @map("pan_verified")
  budgetMin         BigInt?   @map("budget_min")  // in paise (₹ * 100)
  budgetMax         BigInt?   @map("budget_max")
  preferredCities   String[]  @map("preferred_cities") @default([])
  preferredBHK      BHKType[] @map("preferred_bhk") @default([])

  user              User      @relation(fields: [userId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("user_profiles")
}

// ─────────────────────────────────────────────────
// AGENT & DEVELOPER
// ─────────────────────────────────────────────────

model Agent {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @unique @map("user_id") @db.Uuid
  slug              String    @unique
  businessName      String?   @map("business_name")
  reraNumber        String?   @unique @map("rera_number")
  gstin             String?   @map("gstin")
  panNumber         String?   @map("pan_number")
  isReraVerified    Boolean   @default(false) @map("is_rera_verified")
  specialisations   String[]  @default([])
  serviceCities     String[]  @default([]) @map("service_cities")
  serviceLocalities String[]  @default([]) @map("service_localities")
  totalTransactions Int       @default(0) @map("total_transactions")
  avgRating         Float     @default(0) @map("avg_rating")
  reviewCount       Int       @default(0) @map("review_count")
  profilePhotoUrl   String?   @map("profile_photo_url")
  subscriptionStatus SubscriptionStatus @default(TRIALING) @map("subscription_status")
  subscriptionId    String?   @map("subscription_id")  // Razorpay subscription ID

  user              User       @relation(fields: [userId], references: [id])
  properties        Property[]
  enquiries         Enquiry[]  @relation("AgentEnquiries")
  reviews           Review[]
  bookings          Booking[]

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("agents")
  @@index([slug])
  @@index([serviceCities])
}

model Developer {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @unique @map("user_id") @db.Uuid
  slug              String    @unique
  companyName       String    @map("company_name")
  logoUrl           String?   @map("logo_url")
  description       String?   @db.Text
  foundedYear       Int?      @map("founded_year")
  totalProjects     Int       @default(0) @map("total_projects")
  websiteUrl        String?   @map("website_url")
  gstin             String?   @map("gstin")
  reraNumber        String?   @map("rera_number")
  isVerified        Boolean   @default(false) @map("is_verified")
  subscriptionStatus SubscriptionStatus @default(TRIALING) @map("subscription_status")

  user              User       @relation(fields: [userId], references: [id])
  projects          Project[]

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("developers")
}

// ─────────────────────────────────────────────────
// LOCATION HIERARCHY
// ─────────────────────────────────────────────────

model City {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name              String    @unique
  slug              String    @unique
  state             String
  country           String    @default("India")
  latitude          Float
  longitude         Float
  isActive          Boolean   @default(true) @map("is_active")
  seoTitle          String?   @map("seo_title")
  seoDescription    String?   @map("seo_description") @db.Text
  heroImageUrl      String?   @map("hero_image_url")
  propertyCount     Int       @default(0) @map("property_count")

  localities        Locality[]
  properties        Property[]

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("cities")
  @@index([slug])
  @@index([state])
}

model Locality {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  cityId            String    @map("city_id") @db.Uuid
  name              String
  slug              String
  latitude          Float
  longitude         Float
  pinCodes          String[]  @default([]) @map("pin_codes")
  isPopular         Boolean   @default(false) @map("is_popular")
  propertyCount     Int       @default(0) @map("property_count")
  avgPricePerSqft   Float?    @map("avg_price_per_sqft")
  seoTitle          String?   @map("seo_title")
  seoDescription    String?   @map("seo_description") @db.Text

  city              City       @relation(fields: [cityId], references: [id])
  properties        Property[]

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@unique([cityId, slug])
  @@map("localities")
  @@index([cityId])
  @@index([isPopular])
}

// ─────────────────────────────────────────────────
// PROPERTIES
// ─────────────────────────────────────────────────

model Property {
  id                String           @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  slug              String           @unique
  title             String
  description       String           @db.Text
  listingType       ListingType      @map("listing_type")
  propertyType      PropertyType     @map("property_type")
  bhkType           BHKType?         @map("bhk_type")
  possessionStatus  PossessionStatus @map("possession_status")
  furnishingStatus  FurnishingStatus? @map("furnishing_status")
  status            PropertyStatus   @default(DRAFT)
  isFeatured        Boolean          @default(false) @map("is_featured")
  isPremium         Boolean          @default(false) @map("is_premium")

  // Pricing (stored in paise: ₹ × 100 for integer precision)
  price             BigInt            // Total price in paise
  pricePerSqft      Float?            @map("price_per_sqft")
  maintenanceCharge BigInt?           @map("maintenance_charge")  // per month paise
  securityDeposit   BigInt?           @map("security_deposit")     // rent only
  isNegotiable      Boolean          @default(false) @map("is_negotiable")

  // Area (in sq ft)
  carpetArea        Float?           @map("carpet_area")
  builtUpArea       Float?           @map("built_up_area")
  superBuiltUpArea  Float?           @map("super_built_up_area")

  // Property details
  bedrooms          Int?
  bathrooms         Int?
  balconies         Int?             @default(0)
  parkingCount      Int?             @default(0) @map("parking_count")
  floorNumber       Int?             @map("floor_number")
  totalFloors       Int?             @map("total_floors")
  propertyAge       Int?             @map("property_age")          // in years
  facing            Facing?
  possessionDate    DateTime?        @map("possession_date")

  // RERA
  reraNumber        String?          @unique @map("rera_number")
  reraState         String?          @map("rera_state")
  isReraVerified    Boolean          @default(false) @map("is_rera_verified")
  reraVerifiedAt    DateTime?        @map("rera_verified_at")

  // Location
  cityId            String           @map("city_id") @db.Uuid
  localityId        String?          @map("locality_id") @db.Uuid
  address           String?          @db.Text
  pinCode           String?          @map("pin_code")
  latitude          Float
  longitude         Float
  // PostGIS point (synced with lat/lng via trigger)
  // location       Unsupported("geography(Point,4326)")?

  // SEO
  seoTitle          String?          @map("seo_title")
  seoDescription    String?          @map("seo_description") @db.Text

  // Metrics
  viewCount         Int              @default(0) @map("view_count")
  enquiryCount      Int              @default(0) @map("enquiry_count")
  wishlistCount     Int              @default(0) @map("wishlist_count")
  propertyScore     Float?           @map("property_score")         // 0–100 algorithm score

  // Relations
  ownerId           String           @map("owner_id") @db.Uuid
  agentId           String?          @map("agent_id") @db.Uuid
  projectId         String?          @map("project_id") @db.Uuid

  // Timestamps
  createdAt         DateTime         @default(now()) @map("created_at")
  updatedAt         DateTime         @updatedAt @map("updated_at")
  publishedAt       DateTime?        @map("published_at")
  deletedAt         DateTime?        @map("deleted_at")

  // Relations
  owner             User             @relation("PropertyOwner", fields: [ownerId], references: [id])
  agent             Agent?           @relation(fields: [agentId], references: [id])
  project           Project?         @relation(fields: [projectId], references: [id])
  city              City             @relation(fields: [cityId], references: [id])
  locality          Locality?        @relation(fields: [localityId], references: [id])
  images            PropertyImage[]
  amenities         PropertyAmenity[]
  priceHistory      PriceHistory[]
  enquiries         Enquiry[]
  bookings          Booking[]
  wishlistItems     WishlistItem[]
  reviews           Review[]

  @@map("properties")
  @@index([listingType])
  @@index([propertyType])
  @@index([status])
  @@index([cityId])
  @@index([localityId])
  @@index([price])
  @@index([bhkType])
  @@index([isFeatured])
  @@index([isReraVerified])
  @@index([createdAt(sort: Desc)])
}

model PropertyImage {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  propertyId        String    @map("property_id") @db.Uuid
  url               String                                           // Original storage URL
  thumbUrl          String?   @map("thumb_url")                      // 320px WebP
  cardUrl           String?   @map("card_url")                       // 640px WebP
  fullUrl           String?   @map("full_url")                       // 1920px WebP
  ogUrl             String?   @map("og_url")                         // 1200×630 WebP
  altText           String?   @map("alt_text")
  caption           String?
  sortOrder         Int       @default(0) @map("sort_order")
  isHero            Boolean   @default(false) @map("is_hero")
  imageType         String    @default("photo") @map("image_type")   // photo, floorplan, masterplan

  property          Property  @relation(fields: [propertyId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")

  @@map("property_images")
  @@index([propertyId])
  @@index([sortOrder])
}

model PropertyAmenity {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  propertyId        String    @map("property_id") @db.Uuid
  amenityId         String    @map("amenity_id") @db.Uuid

  property          Property  @relation(fields: [propertyId], references: [id])
  amenity           Amenity   @relation(fields: [amenityId], references: [id])

  @@unique([propertyId, amenityId])
  @@map("property_amenities")
}

model Amenity {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name              String    @unique
  slug              String    @unique
  icon              String?
  category          String    // security, recreation, utilities, parking
  sortOrder         Int       @default(0) @map("sort_order")

  properties        PropertyAmenity[]

  @@map("amenities")
}

// ─────────────────────────────────────────────────
// DEVELOPER PROJECTS
// ─────────────────────────────────────────────────

model Project {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  slug              String    @unique
  developerId       String    @map("developer_id") @db.Uuid
  name              String
  tagline           String?
  description       String    @db.Text
  propertyType      PropertyType @map("property_type")

  // Project details
  totalUnits        Int?      @map("total_units")
  totalTowers       Int?      @map("total_towers")
  totalFloors       Int?      @map("total_floors")
  launchDate        DateTime? @map("launch_date")
  possessionDate    DateTime? @map("possession_date")

  // Pricing
  priceFrom         BigInt    @map("price_from")   // paise
  priceTo           BigInt?   @map("price_to")     // paise
  pricePerSqftFrom  Float?    @map("price_per_sqft_from")

  // RERA
  reraNumber        String?   @map("rera_number")
  reraState         String?   @map("rera_state")
  isReraVerified    Boolean   @default(false) @map("is_rera_verified")

  // Location
  cityId            String    @map("city_id") @db.Uuid
  address           String?
  latitude          Float
  longitude         Float

  // Media
  heroImageUrl      String?   @map("hero_image_url")
  brochureUrl       String?   @map("brochure_url")
  videoUrl          String?   @map("video_url")
  masterPlanUrl     String?   @map("master_plan_url")
  virtualTourUrl    String?   @map("virtual_tour_url")

  // Status
  isActive          Boolean   @default(true) @map("is_active")
  isFeatured        Boolean   @default(false) @map("is_featured")
  isNewLaunch       Boolean   @default(false) @map("is_new_launch")
  launchCountdown   DateTime? @map("launch_countdown")

  // Metrics
  viewCount         Int       @default(0) @map("view_count")
  leadCount         Int       @default(0) @map("lead_count")
  interestCount     Int       @default(0) @map("interest_count")

  developer         Developer    @relation(fields: [developerId], references: [id])
  properties        Property[]
  unitMix           ProjectUnitMix[]
  images            ProjectImage[]
  interests         ProjectInterest[]
  phases            ProjectPhase[]

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("projects")
  @@index([developerId])
  @@index([slug])
  @@index([cityId])
  @@index([isFeatured])
}

model ProjectUnitMix {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  projectId         String    @map("project_id") @db.Uuid
  bhkType           BHKType   @map("bhk_type")
  carpetAreaMin     Float     @map("carpet_area_min")
  carpetAreaMax     Float?    @map("carpet_area_max")
  priceFrom         BigInt    @map("price_from")
  priceTo           BigInt?   @map("price_to")
  totalUnits        Int?      @map("total_units")
  availableUnits    Int?      @map("available_units")

  project           Project   @relation(fields: [projectId], references: [id])

  @@map("project_unit_mix")
}

model ProjectPhase {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  projectId         String    @map("project_id") @db.Uuid
  phaseName         String    @map("phase_name")
  startDate         DateTime? @map("start_date")
  completionDate    DateTime? @map("completion_date")
  status            String    @default("planned")    // planned, ongoing, completed
  description       String?   @db.Text

  project           Project   @relation(fields: [projectId], references: [id])

  @@map("project_phases")
}

model ProjectImage {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  projectId         String    @map("project_id") @db.Uuid
  url               String
  imageType         String    @default("render")    // render, construction, amenity, floorplan, masterplan
  sortOrder         Int       @default(0) @map("sort_order")
  altText           String?   @map("alt_text")

  project           Project   @relation(fields: [projectId], references: [id])

  @@map("project_images")
}

model ProjectInterest {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  projectId         String    @map("project_id") @db.Uuid
  name              String
  email             String
  phone             String
  city              String?
  bhkInterest       BHKType[] @default([]) @map("bhk_interest")
  budget            String?
  message           String?   @db.Text
  source            String    @default("website")  // website, referral, ads
  isContacted       Boolean   @default(false) @map("is_contacted")

  project           Project   @relation(fields: [projectId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")

  @@map("project_interests")
}

// ─────────────────────────────────────────────────
// ENQUIRIES & BOOKINGS
// ─────────────────────────────────────────────────

model Enquiry {
  id                String         @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  propertyId        String         @map("property_id") @db.Uuid
  userId            String?        @map("user_id") @db.Uuid
  agentId           String?        @map("agent_id") @db.Uuid

  // Contact details (stored for guest enquiries)
  name              String
  email             String
  phone             String
  message           String?        @db.Text

  status            EnquiryStatus  @default(NEW)
  source            String         @default("web")   // web, whatsapp, phone, referral
  isRead            Boolean        @default(false) @map("is_read")
  responseMessage   String?        @map("response_message") @db.Text
  respondedAt       DateTime?      @map("responded_at")
  leadScore         Int?           @map("lead_score")  // 1–10 agent-assigned quality

  property          Property       @relation(fields: [propertyId], references: [id])
  user              User?          @relation("UserEnquiries", fields: [userId], references: [id])
  agent             Agent?         @relation("AgentEnquiries", fields: [agentId], references: [id])

  createdAt         DateTime       @default(now()) @map("created_at")
  updatedAt         DateTime       @updatedAt @map("updated_at")

  @@map("enquiries")
  @@index([propertyId])
  @@index([agentId])
  @@index([status])
  @@index([createdAt(sort: Desc)])
}

model Booking {
  id                String         @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  propertyId        String         @map("property_id") @db.Uuid
  userId            String         @map("user_id") @db.Uuid
  agentId           String?        @map("agent_id") @db.Uuid

  bookingType       String         @default("SITE_VISIT") @map("booking_type")  // SITE_VISIT, TOKEN_BOOKING
  visitDate         DateTime?      @map("visit_date")
  visitTimeSlot     String?        @map("visit_time_slot")    // "10:00-11:00"

  // Token booking
  tokenAmount       BigInt?        @map("token_amount")       // paise
  totalAmount       BigInt?        @map("total_amount")       // paise (for token booking)

  // Razorpay
  razorpayOrderId   String?        @unique @map("razorpay_order_id")
  razorpayPaymentId String?        @unique @map("razorpay_payment_id")
  razorpaySignature String?        @map("razorpay_signature")

  status            BookingStatus  @default(PENDING)
  notes             String?        @db.Text

  property          Property       @relation(fields: [propertyId], references: [id])
  user              User           @relation(fields: [userId], references: [id])
  agent             Agent?         @relation(fields: [agentId], references: [id])

  createdAt         DateTime       @default(now()) @map("created_at")
  updatedAt         DateTime       @updatedAt @map("updated_at")

  @@map("bookings")
  @@index([propertyId])
  @@index([userId])
  @@index([status])
}

// ─────────────────────────────────────────────────
// WISHLIST & SAVED SEARCHES
// ─────────────────────────────────────────────────

model WishlistItem {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @map("user_id") @db.Uuid
  propertyId        String    @map("property_id") @db.Uuid

  user              User      @relation(fields: [userId], references: [id])
  property          Property  @relation(fields: [propertyId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")

  @@unique([userId, propertyId])
  @@map("wishlist_items")
  @@index([userId])
}

model SearchAlert {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @map("user_id") @db.Uuid
  name              String?
  filters           Json      // Serialized search filters
  frequency         String    @default("INSTANT") // INSTANT, DAILY, WEEKLY
  isActive          Boolean   @default(true) @map("is_active")
  lastTriggeredAt   DateTime? @map("last_triggered_at")
  matchCount        Int       @default(0) @map("match_count")

  user              User      @relation(fields: [userId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("search_alerts")
  @@index([userId])
  @@index([isActive])
}

model RecentSearch {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @map("user_id") @db.Uuid
  query             String
  filters           Json?
  resultCount       Int?      @map("result_count")

  user              User      @relation(fields: [userId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")

  @@map("recent_searches")
  @@index([userId])
}

// ─────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────

model Review {
  id                String         @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String         @map("user_id") @db.Uuid
  propertyId        String?        @map("property_id") @db.Uuid
  agentId           String?        @map("agent_id") @db.Uuid
  rating            Int            // 1–5
  title             String?
  body              String         @db.Text
  status            ReviewStatus   @default(PENDING)
  isVerifiedBuyer   Boolean        @default(false) @map("is_verified_buyer")
  helpfulCount      Int            @default(0) @map("helpful_count")

  user              User           @relation(fields: [userId], references: [id])
  property          Property?      @relation(fields: [propertyId], references: [id])
  agent             Agent?         @relation(fields: [agentId], references: [id])

  createdAt         DateTime       @default(now()) @map("created_at")
  updatedAt         DateTime       @updatedAt @map("updated_at")

  @@map("reviews")
  @@index([propertyId])
  @@index([agentId])
  @@index([status])
}

// ─────────────────────────────────────────────────
// MARKET INTELLIGENCE
// ─────────────────────────────────────────────────

model PriceHistory {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  propertyId        String    @map("property_id") @db.Uuid
  price             BigInt    // paise
  pricePerSqft      Float?    @map("price_per_sqft")
  recordedAt        DateTime  @default(now()) @map("recorded_at")
  reason            String?   // price_drop, market_correction, renovation

  property          Property  @relation(fields: [propertyId], references: [id])

  @@map("price_history")
  @@index([propertyId])
  @@index([recordedAt])
}

model LocalityPriceTrend {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  localityId        String    @map("locality_id") @db.Uuid
  month             DateTime  // First day of the month
  avgPricePerSqft   Float     @map("avg_price_per_sqft")
  transactionCount  Int       @map("transaction_count")
  demandIndex       Float?    @map("demand_index")         // 0–100

  createdAt         DateTime  @default(now()) @map("created_at")

  @@unique([localityId, month])
  @@map("locality_price_trends")
  @@index([localityId])
}

model Article {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  slug              String    @unique
  title             String
  excerpt           String?   @db.Text
  body              String    @db.Text
  heroImageUrl      String?   @map("hero_image_url")
  authorId          String    @map("author_id") @db.Uuid
  category          String    // market-trends, investment, legal, lifestyle
  tags              String[]  @default([])
  cityId            String?   @map("city_id") @db.Uuid
  isPublished       Boolean   @default(false) @map("is_published")
  publishedAt       DateTime? @map("published_at")
  viewCount         Int       @default(0) @map("view_count")
  readTimeMinutes   Int?      @map("read_time_minutes")
  seoTitle          String?   @map("seo_title")
  seoDescription    String?   @map("seo_description") @db.Text

  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  @@map("articles")
  @@index([slug])
  @@index([isPublished])
  @@index([category])
}

// ─────────────────────────────────────────────────
// ANALYTICS & SESSIONS
// ─────────────────────────────────────────────────

model PropertyView {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  propertyId        String    @map("property_id") @db.Uuid
  userId            String?   @map("user_id") @db.Uuid
  sessionId         String    @map("session_id")
  ipHash            String?   @map("ip_hash")         // hashed for privacy
  source            String?   // google, direct, referral, social
  viewedAt          DateTime  @default(now()) @map("viewed_at")
  durationSeconds   Int?      @map("duration_seconds")

  @@map("property_views")
  @@index([propertyId])
  @@index([viewedAt])
}

model UserSession {
  id                String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  userId            String    @map("user_id") @db.Uuid
  refreshToken      String    @unique @map("refresh_token")
  expiresAt         DateTime  @map("expires_at")
  ipAddress         String?   @map("ip_address")
  userAgent         String?   @map("user_agent")

  user              User      @relation(fields: [userId], references: [id])

  createdAt         DateTime  @default(now()) @map("created_at")

  @@map("user_sessions")
  @@index([userId])
}
```

---

## 3. Key Database Indexes & Performance

```sql
-- Composite indexes for common search patterns
CREATE INDEX idx_properties_search
  ON properties (listing_type, city_id, status, price, bhk_type)
  WHERE deleted_at IS NULL AND status = 'ACTIVE';

-- PostGIS spatial index
CREATE INDEX idx_properties_location
  ON properties USING GIST (location);

-- Full-text search (fallback when Typesense is down)
CREATE INDEX idx_properties_fts
  ON properties USING GIN (to_tsvector('english', title || ' ' || description));

-- Locality trend lookups
CREATE INDEX idx_trends_locality_month
  ON locality_price_trends (locality_id, month DESC);
```

---

## 4. DB Trigger: Auto-update counters

```sql
-- Auto-increment property view count
CREATE OR REPLACE FUNCTION increment_property_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE properties
  SET view_count = view_count + 1
  WHERE id = NEW.property_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_property_view
  AFTER INSERT ON property_views
  FOR EACH ROW EXECUTE FUNCTION increment_property_view_count();

-- Auto-update locality property count
CREATE OR REPLACE FUNCTION update_locality_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE localities
  SET property_count = (
    SELECT COUNT(*) FROM properties
    WHERE locality_id = NEW.locality_id
      AND status = 'ACTIVE'
      AND deleted_at IS NULL
  )
  WHERE id = NEW.locality_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

_Document Owner: Backend Engineering | Version: 1.0 | June 2026_
