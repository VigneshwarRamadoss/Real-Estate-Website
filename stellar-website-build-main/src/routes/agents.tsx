import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

const AGENTS = [
  {
    name: "Aanya Rao",
    city: "Mumbai",
    deals: 84,
    exp: "9 yrs",
    spec: "Luxury apartments",
    initials: "AR",
  },
  {
    name: "Vikram Mehta",
    city: "Delhi NCR",
    deals: 132,
    exp: "14 yrs",
    spec: "New launches",
    initials: "VM",
  },
  {
    name: "Priya Iyer",
    city: "Bangalore",
    deals: 67,
    exp: "7 yrs",
    spec: "Villas & plots",
    initials: "PI",
  },
  {
    name: "Rohan Kapoor",
    city: "Gurgaon",
    deals: 109,
    exp: "11 yrs",
    spec: "Commercial",
    initials: "RK",
  },
  { name: "Sneha Patel", city: "Pune", deals: 54, exp: "6 yrs", spec: "Rentals", initials: "SP" },
  {
    name: "Karan Shetty",
    city: "Goa",
    deals: 41,
    exp: "8 yrs",
    spec: "Holiday homes",
    initials: "KS",
  },
];

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "Verified advisors — LuxeHaven" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Advisors"
        title="Real people,"
        italic="real expertise."
        description="Every advisor on LuxeHaven is RERA-registered, performance-tracked, and personally vetted by our team."
      />
      <section className="container-edge pb-32 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {AGENTS.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.05 }}
            className="bg-surface p-8 group cursor-pointer transition hover:bg-line-soft/50"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-ink text-surface text-base font-semibold">
                {a.initials}
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight">{a.name}</div>
                <div className="text-[13px] text-muted-foreground">
                  {a.city} · {a.exp}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1 text-[13px]">
              <Star className="h-3.5 w-3.5 fill-ink text-ink" />
              <Star className="h-3.5 w-3.5 fill-ink text-ink" />
              <Star className="h-3.5 w-3.5 fill-ink text-ink" />
              <Star className="h-3.5 w-3.5 fill-ink text-ink" />
              <Star className="h-3.5 w-3.5 fill-ink text-ink" />
              <span className="ml-2 text-muted-foreground">{a.deals} closed deals</span>
            </div>
            <div className="mt-6 inline-block rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wider">
              {a.spec}
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
}
