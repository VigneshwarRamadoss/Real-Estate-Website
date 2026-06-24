import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Bath,
  Bed,
  Calendar,
  Heart,
  MapPin,
  Phone,
  Share2,
  SquareDashed,
} from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = PROPERTIES.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { property: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.property.title} — LuxeHaven` : "Property" },
      { name: "description", content: loaderData?.property.title ?? "" },
      { property: "og:image", content: loaderData?.property.image ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-edge pt-40 pb-32 text-center">
      <h1 className="display-lg">Listing not available</h1>
      <Link to="/properties" className="mt-6 inline-block text-accent-blue">
        Back to all properties
      </Link>
    </div>
  ),
  component: Page,
});

function Page() {
  const { property } = Route.useLoaderData();
  const more = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <>
      <section className="container-edge pt-28 md:pt-32">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> All properties
        </Link>

        <div className="mt-6 grid lg:grid-cols-[1fr_auto] items-end gap-6">
          <div>
            <div className="eyebrow text-muted-foreground">
              {property.status} · {property.type}
            </div>
            <h1 className="mt-4 display-lg max-w-[16ch]">{property.title}</h1>
            <div className="mt-4 flex items-center gap-2 text-ink-soft">
              <MapPin className="h-4 w-4" /> {property.locality}, {property.city}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="grid h-12 w-12 place-items-center rounded-full border border-line hover:bg-line-soft">
              <Heart className="h-4 w-4" />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-full border border-line hover:bg-line-soft">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="container-edge mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 md:gap-3"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-line-soft">
            <img src={property.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-2 md:gap-3">
            <div className="overflow-hidden rounded-2xl bg-line-soft">
              <img src={PROPERTIES[1].image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl bg-line-soft">
              <img src={PROPERTIES[2].image} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container-edge mt-16 grid lg:grid-cols-[1.7fr_1fr] gap-12 lg:gap-20">
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            <Spec icon={Bed} k="Bedrooms" v={property.bhk} />
            <Spec icon={Bath} k="Bathrooms" v="4" />
            <Spec icon={SquareDashed} k="Area" v={property.area} />
            <Spec icon={Calendar} k="Possession" v="Immediate" />
          </div>

          <div className="mt-16">
            <div className="eyebrow text-muted-foreground">— About this residence</div>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl">
              A residence shaped by light, framed by the skyline.
            </h2>
            <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-5 text-[15.5px] leading-relaxed text-ink-soft">
              <p>
                Set on an upper floor of one of the city's most considered towers, this residence
                unfolds across nearly {property.area} of clean, unbroken volume. Floor-to-ceiling
                glass on three exposures gives the home a particular quality of stillness — light
                arrives slowly in the morning, and lingers late through the western glass.
              </p>
              <p>
                The interiors are restrained: oak floors, plastered walls, joinery in walnut. There
                are four bedrooms, a study, and a private elevator lobby. Building amenities include
                a 25m lap pool, a residents' lounge, and on-site concierge.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <div className="eyebrow text-muted-foreground">— Amenities</div>
            <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-[14.5px]">
              {[
                "Concierge",
                "25m lap pool",
                "Private lift",
                "Smart home",
                "EV charging",
                "Squash court",
                "Spa & sauna",
                "Co-working",
                "Children's play",
              ].map((a) => (
                <li key={a} className="flex items-center gap-2 text-ink-soft">
                  <BadgeCheck className="h-4 w-4 text-accent-blue" /> {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <div className="eyebrow text-muted-foreground">— Transparent pricing</div>
            <div className="mt-6 rounded-2xl border border-line-soft p-6 md:p-8">
              {[
                ["Base price", property.price],
                ["GST (5%)", "Included"],
                ["Registration & stamp duty (est.)", "₹65L"],
                ["Society & maintenance / yr", "₹2.4L"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b border-line-soft py-4 last:border-0"
                >
                  <div className="text-[14.5px] text-ink-soft">{k}</div>
                  <div className="text-[15px] font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line-soft p-7 bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
            <div className="eyebrow text-muted-foreground">Asking price</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight">{property.price}</div>
            <div className="mt-1 text-[13px] text-muted-foreground">
              All-inclusive · transparent breakdown
            </div>

            <button className="mt-6 w-full rounded-full bg-ink py-4 text-[14px] font-medium text-surface hover:bg-accent-blue transition">
              Schedule a private visit
            </button>
            <button className="mt-2 w-full rounded-full border border-line py-4 text-[14px] font-medium hover:bg-line-soft transition">
              Request brochure
            </button>

            <div className="mt-6 border-t border-line-soft pt-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-line-soft text-[15px] font-semibold">
                AR
              </div>
              <div>
                <div className="text-[14.5px] font-semibold">Aanya Rao</div>
                <div className="text-[12.5px] text-muted-foreground">Senior advisor · 9 yrs</div>
              </div>
              <button className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section className="container-edge mt-32 md:mt-40 pb-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="display-lg !text-[clamp(2rem,4vw,3.5rem)]">More to consider</h2>
          <Link to="/properties" className="hidden md:inline text-[13px] text-accent-blue">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {more.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function Spec({ icon: Icon, k, v }: { icon: any; k: string; v: string }) {
  return (
    <div className="bg-surface p-6">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-1 text-[15px] font-semibold">{v}</div>
    </div>
  );
}
