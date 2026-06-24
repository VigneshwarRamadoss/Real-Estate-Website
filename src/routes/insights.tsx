import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import cityMumbai from "@/assets/city-mumbai.jpg";
import cityBangalore from "@/assets/city-bangalore.jpg";
import cityDelhi from "@/assets/city-delhi.jpg";

const ARTICLES = [
  {
    tag: "Market report",
    title: "Mumbai luxury sales hit a 7-year high in Q2",
    date: "Jun 12",
    read: "8 min",
    img: cityMumbai,
  },
  {
    tag: "Buyer's guide",
    title: "How to read a RERA registration like a lawyer",
    date: "Jun 04",
    read: "12 min",
    img: cityBangalore,
  },
  {
    tag: "Locality",
    title: "Why Whitefield rents are decoupling from sale prices",
    date: "May 28",
    read: "6 min",
    img: cityDelhi,
  },
  {
    tag: "Investment",
    title: "The NRI's guide to Indian property tax in 2026",
    date: "May 21",
    read: "10 min",
    img: cityMumbai,
  },
  {
    tag: "Design",
    title: "What 'good vastu' actually means in modern apartments",
    date: "May 12",
    read: "7 min",
    img: cityBangalore,
  },
  {
    tag: "Data",
    title: "Where prices are still rational: 12 micro-markets to watch",
    date: "May 02",
    read: "14 min",
    img: cityDelhi,
  },
];

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Market insights — LuxeHaven" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Read the"
        italic="market clearly."
        description="Data-led journalism from the LuxeHaven research desk. Free, weekly, no agenda."
      />
      <section className="container-edge pb-32">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20 cursor-pointer"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-line-soft">
            <img
              src={ARTICLES[0].img}
              className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="rounded-full border border-line px-3 py-1 text-[11px] font-medium uppercase tracking-wider w-fit">
              {ARTICLES[0].tag}
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              {ARTICLES[0].title}
            </h2>
            <p className="mt-6 text-[16px] text-ink-soft leading-relaxed max-w-lg">
              A close look at the quiet revival of premium real estate transactions in South Mumbai
              — and the demographics driving it.
            </p>
            <div className="mt-8 flex items-center gap-4 text-[13px] text-muted-foreground">
              <span>{ARTICLES[0].date}</span>
              <span>·</span>
              <span>{ARTICLES[0].read} read</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-accent-blue">
                Read essay <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </motion.article>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {ARTICLES.slice(1).map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.07 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-line-soft">
                <img
                  src={a.img}
                  alt=""
                  className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-accent-blue">
                  {a.tag}
                </span>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
                  {a.title}
                </h3>
                <div className="mt-3 text-[12.5px] text-muted-foreground">
                  {a.date} · {a.read} read
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
