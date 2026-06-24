import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Compass,
  Eye,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  CheckCircle,
  IndianRupee,
  MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero-skyline.jpg";
import cityMumbai from "@/assets/city-mumbai.jpg";
import cityBangalore from "@/assets/city-bangalore.jpg";
import cityDelhi from "@/assets/city-delhi.jpg";
import cityHyderabad from "@/assets/city-hyderabad.jpg";
import projectDelhi from "@/assets/project-delhi.jpg";
import projectGoa from "@/assets/project-goa.jpg";
import property1 from "@/assets/property-1.jpg";
import { SearchBar } from "@/components/site/SearchBar";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LuxeHaven Realty — Find the space that defines you" },
      {
        name: "description",
        content:
          "Premium real estate across India. Verified listings, transparent pricing, editorial discovery.",
      },
      { property: "og:title", content: "LuxeHaven Realty" },
      { property: "og:description", content: "Find the space that defines you." },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as any],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <Cities />
      <NewLaunches />
      <Editorial />
      <Insights />
      <Trust />
      <CTA />
    </>
  );
}

/* ---------- HERO with multi-layer parallax ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.4, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col w-full overflow-hidden bg-ink text-surface"
    >
      <motion.img
        src={heroImg}
        alt="Luxury skyline"
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        fetchPriority="high"
      />
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink md:from-ink/30 md:via-ink/30 md:to-ink"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col"
      >
        <div className="container-edge flex-1 flex flex-col justify-end pb-12 md:pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="eyebrow text-surface/70"
          >
            Pan-India · Curated for the discerning
          </motion.div>

          <h1 className="mt-6 text-[38px] leading-[1.1] tracking-[-0.04em] font-semibold text-surface sm:text-[44px] md:text-[72px] lg:text-[96px] xl:text-[105px] max-w-[18ch]">
            <SplitWords text="Find the space" />
            <br />
            <SplitWords text="that defines you." delay={0.4} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-6 max-w-2xl text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed text-surface/85"
          >
            Search verified homes, compare real prices, and book visits across India — without fake
            listings or ad clutter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 flex flex-wrap gap-2 md:gap-3 max-w-2xl"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-surface/20 bg-surface/10 px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-surface backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-blue" />
              <span>RERA Verified</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-surface/20 bg-surface/10 px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-surface backdrop-blur-sm">
              <CheckCircle className="h-3.5 w-3.5 text-accent-blue" />
              <span>No Fake Listings</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-surface/20 bg-surface/10 px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-surface backdrop-blur-sm">
              <IndianRupee className="h-3.5 w-3.5 text-accent-blue" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-surface/20 bg-surface/10 px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-surface backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-accent-blue" />
              <span>Pan-India Properties</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="mt-8 md:mt-12 max-w-4xl"
          >
            <SearchBar dark />
          </motion.div>
        </div>

        <div className="container-edge pb-8 hidden md:flex items-end justify-between text-[12px] text-surface/80 drop-shadow-md">
          <div className="flex items-center gap-2">
            <span className="h-px w-12 bg-surface/60" />
            Scroll to explore
          </div>
          <div className="grid grid-cols-3 gap-12 text-right">
            <Stat n="42K" label="Verified listings" />
            <Stat n="184" label="Cities & localities" />
            <Stat n="₹1.2L Cr" label="Closed transactions" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SplitWords({
  text,
  delay = 0,
  italic = false,
}: {
  text: string;
  delay?: number;
  italic?: boolean;
}) {
  return (
    <span
      className={`inline-block ${italic ? 'font-["Instrument_Serif"] italic font-normal' : ""}`}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.95, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-surface">{n}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em]">{label}</div>
    </div>
  );
}

/* ---------- MARQUEE strip ---------- */
function Marquee() {
  const items = [
    "Architectural Digest India",
    "Mint Lounge",
    "Forbes India",
    "Bloomberg",
    "ET Realty",
    "Condé Nast Traveller",
    "Vogue Living",
    "Business Standard",
  ];
  return (
    <section className="border-y border-line-soft bg-surface py-8 overflow-hidden">
      <div className="flex w-max marquee-track gap-16 whitespace-nowrap text-[15px] font-medium text-ink-soft">
        {[...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-16">
            {s}
            <span className="text-line">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- FEATURED ---------- */
function Featured() {
  return (
    <section className="container-edge py-24 md:py-36">
      <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
        <div>
          <div className="eyebrow text-muted-foreground">— Featured residences</div>
          <h2 className="mt-4 display-lg max-w-[18ch]">
            Homes <span className='font-["Instrument_Serif"] italic font-normal'>worth</span> the
            wait.
          </h2>
        </div>
        <Link
          to="/properties"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[13.5px] font-medium hover:bg-line-soft transition"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {PROPERTIES.slice(0, 6).map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- CITIES ---------- */
function Cities() {
  const cities = [
    { name: "Mumbai", count: "12,420 homes", img: cityMumbai },
    { name: "Bangalore", count: "9,830 homes", img: cityBangalore },
    { name: "Delhi NCR", count: "11,210 homes", img: cityDelhi },
    { name: "Hyderabad", count: "6,540 homes", img: cityHyderabad },
  ];
  return (
    <section className="bg-line-soft/60 py-24 md:py-36">
      <div className="container-edge">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-end mb-16">
          <div>
            <div className="eyebrow text-muted-foreground">— Cities</div>
            <h2 className="mt-4 display-lg">
              Explore by{" "}
              <span className='font-["Instrument_Serif"] italic font-normal'>place.</span>
            </h2>
          </div>
          <p className="text-[17px] leading-relaxed text-ink-soft max-w-xl">
            We obsess over micro-markets. Discover homes where you actually want to live — from the
            seafront of Worli to the green lanes of Indiranagar.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cities.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Link
                to="/properties"
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-[1500ms] group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-surface">
                  <div className="text-2xl font-semibold">{c.name}</div>
                  <div className="mt-1 text-[12.5px] uppercase tracking-wider opacity-80">
                    {c.count}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEW LAUNCHES ---------- */
function NewLaunches() {
  const projects = [
    {
      name: "Crescent Towers",
      dev: "Lodha Group",
      img: projectDelhi,
      city: "Delhi · Aerocity",
      price: "₹4.1 Cr onwards",
    },
    {
      name: "Palm House Goa",
      dev: "House of Hiranandani",
      img: projectGoa,
      city: "Goa · Assagao",
      price: "₹7.5 Cr onwards",
    },
  ];
  return (
    <section className="container-edge py-24 md:py-36">
      <div className="mb-16 grid lg:grid-cols-2 gap-8 items-end">
        <div>
          <div className="eyebrow text-muted-foreground">— New launches</div>
          <h2 className="mt-4 display-lg">
            First, <span className='font-["Instrument_Serif"] italic font-normal'>before</span> the
            rest.
          </h2>
        </div>
        <p className="text-[17px] leading-relaxed text-ink-soft max-w-xl lg:ml-auto">
          Early access to the country's most anticipated developer launches — with
          construction-stage pricing and no brokerage.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
            className="group relative overflow-hidden rounded-3xl bg-ink"
          >
            <Link to="/projects">
              <div className="relative aspect-[4/5] md:aspect-[5/4]">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-surface">
                <div className="eyebrow opacity-80">{p.city}</div>
                <h3 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">{p.name}</h3>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-[13px] opacity-70">by {p.dev}</div>
                    <div className="mt-1 text-xl font-medium">{p.price}</div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-[13px] font-medium text-ink">
                    Express interest <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------- EDITORIAL split section ---------- */
function Editorial() {
  return (
    <section className="bg-ink text-surface py-24 md:py-40 overflow-hidden">
      <div className="container-edge grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="eyebrow text-surface/60">— The LuxeHaven difference</div>
          <h2 className="mt-6 display-lg">
            We treat property like{" "}
            <span className='font-["Instrument_Serif"] italic font-normal'>literature</span>, not
            data.
          </h2>
          <p className="mt-8 text-[17px] leading-relaxed text-surface/75 max-w-lg">
            Every home is photographed by professionals. Every listing is RERA-verified. Every total
            cost — GST, registration, society — surfaced upfront. No agents calling you 40 times. No
            fake inventory.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
            <Pillar
              icon={ShieldCheck}
              title="RERA verified"
              body="100% of listings cross-checked against authority records."
            />
            <Pillar
              icon={Eye}
              title="Real photos"
              body="No renders. No staging tricks. Walk-throughs by our team."
            />
            <Pillar
              icon={BadgeCheck}
              title="Zero brokerage"
              body="On all in-house new launches and developer projects."
            />
            <Pillar
              icon={Sparkles}
              title="Editorial care"
              body="Each listing read like a story, not a spreadsheet."
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden"
        >
          <img
            src={property1}
            alt="Editorial home"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute left-6 top-6 rounded-full bg-surface/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink">
            Featured story
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-8 text-surface">
            <div className="text-[12.5px] uppercase tracking-wider opacity-80">
              Issue 04 · Mumbai
            </div>
            <div className="mt-2 text-2xl md:text-3xl font-semibold">
              Inside Worli's quietest penthouse
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pillar({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) {
  return (
    <div>
      <Icon className="h-5 w-5 text-accent-blue" />
      <div className="mt-3 text-[15px] font-semibold">{title}</div>
      <div className="mt-1.5 text-[13px] leading-relaxed text-surface/65">{body}</div>
    </div>
  );
}

/* ---------- INSIGHTS / market intelligence ---------- */
function Insights() {
  const items = [
    {
      tag: "Market report",
      title: "Mumbai luxury sales hit a 7-year high in Q2",
      read: "8 min",
      icon: TrendingUp,
    },
    {
      tag: "Buyer's guide",
      title: "How to read a RERA registration like a lawyer",
      read: "12 min",
      icon: Compass,
    },
    {
      tag: "Locality study",
      title: "Why Whitefield rents are decoupling from sale prices",
      read: "6 min",
      icon: Building2,
    },
  ];
  return (
    <section className="container-edge py-24 md:py-36">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-16 items-end">
        <div>
          <div className="eyebrow text-muted-foreground">— Insights</div>
          <h2 className="mt-4 display-lg">
            Read <span className='font-["Instrument_Serif"] italic font-normal'>the market.</span>
          </h2>
        </div>
        <p className="text-[17px] leading-relaxed text-ink-soft max-w-xl lg:ml-auto">
          Independent, data-led journalism from the LuxeHaven research desk. Updated weekly. Always
          free.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group bg-surface p-8 md:p-10 transition hover:bg-line-soft/50 cursor-pointer"
          >
            <Link to="/insights" className="flex flex-col h-full">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-line px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
                  {it.tag}
                </span>
                <it.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-10 text-xl md:text-2xl font-semibold leading-tight tracking-tight">
                {it.title}
              </h3>
              <div className="mt-auto pt-10 flex items-center justify-between text-[12.5px] text-muted-foreground">
                <span>{it.read} read</span>
                <span className="inline-flex items-center gap-1.5 text-accent-blue transition group-hover:gap-2.5">
                  Read <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------- TRUST band ---------- */
function Trust() {
  const items = [
    { n: "42,000+", l: "Verified residences" },
    { n: "98.4%", l: "Listing accuracy score" },
    { n: "1,800+", l: "Vetted agents & advisors" },
    { n: "₹1.2L Cr", l: "Transacted GMV since 2019" },
  ];
  return (
    <section className="border-y border-line-soft py-20">
      <div className="container-edge grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {items.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="display-lg !text-[clamp(2rem,4vw,3.5rem)]">{s.n}</div>
            <div className="mt-3 text-[12.5px] uppercase tracking-[0.16em] text-muted-foreground">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="container-edge py-24 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-20 md:px-20 md:py-32 text-surface"
      >
        <div className="relative z-10 max-w-3xl">
          <div className="eyebrow text-surface/60">— Ready when you are</div>
          <h2 className="mt-6 display-xl !text-[clamp(2.75rem,7vw,6rem)]">
            Begin the search
            <br />
            <span className='font-["Instrument_Serif"] italic font-normal'>that ends in keys.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-surface px-7 py-4 text-[14px] font-medium text-ink hover:bg-accent-blue hover:text-surface transition"
            >
              Browse listings <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 rounded-full border border-surface/30 px-7 py-4 text-[14px] font-medium hover:bg-surface/10 transition"
            >
              List your property
            </Link>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -bottom-32 h-[520px] w-[520px] rounded-full border border-surface/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-20 h-[380px] w-[380px] rounded-full border border-surface/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-8 h-[240px] w-[240px] rounded-full border border-accent-blue/40"
        />
      </motion.div>
    </section>
  );
}
