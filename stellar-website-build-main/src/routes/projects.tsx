import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import projectDelhi from "@/assets/project-delhi.jpg";
import projectGoa from "@/assets/project-goa.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const PROJECTS = [
  {
    name: "Crescent Towers",
    dev: "Lodha",
    city: "Delhi · Aerocity",
    price: "₹4.1 Cr+",
    img: projectDelhi,
    possession: "Q4 2027",
  },
  {
    name: "Palm House Goa",
    dev: "House of Hiranandani",
    city: "Goa · Assagao",
    price: "₹7.5 Cr+",
    img: projectGoa,
    possession: "Ready",
  },
  {
    name: "The Atrium",
    dev: "Oberoi Realty",
    city: "Mumbai · Worli",
    price: "₹14 Cr+",
    img: property1,
    possession: "Q1 2026",
  },
  {
    name: "Villa Solene",
    dev: "Prestige",
    city: "Bangalore · Whitefield",
    price: "₹9 Cr+",
    img: property2,
    possession: "Ready",
  },
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [{ title: "New launches & developer projects — LuxeHaven" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="New launches"
        title="First access,"
        italic="quietly."
        description="Developer projects we've personally vetted. Construction-stage pricing, zero brokerage."
      />
      <section className="container-edge pb-32 grid lg:grid-cols-2 gap-6 lg:gap-8">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-ink"
          >
            <Link to="/properties">
              <div className="relative aspect-[5/4]">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-surface">
                <div className="flex items-center justify-between text-[12px] uppercase tracking-wider opacity-80">
                  <span>{p.city}</span>
                  <span>Possession · {p.possession}</span>
                </div>
                <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{p.name}</h3>
                <div className="mt-2 text-[13px] opacity-80">by {p.dev}</div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xl font-medium">{p.price}</div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink transition group-hover:bg-accent-blue group-hover:text-surface">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>
    </>
  );
}
