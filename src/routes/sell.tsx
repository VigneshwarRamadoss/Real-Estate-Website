import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, FileText, IndianRupee, Users } from "lucide-react";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell with LuxeHaven" },
      {
        name: "description",
        content: "List your home with India's most considered real estate platform.",
      },
    ],
  }),
  component: Page,
});

const STEPS = [
  {
    icon: FileText,
    t: "1. Tell us about your home",
    b: "Share the basics — location, size, and your asking expectation. Takes 4 minutes.",
  },
  {
    icon: Camera,
    t: "2. We come and photograph it",
    b: "A professional shoot, a 3D walk-through, and a verified floor plan — at no cost.",
  },
  {
    icon: Users,
    t: "3. We bring you serious buyers only",
    b: "No mass-blast leads. Every enquiry is pre-qualified by our advisory team.",
  },
  {
    icon: IndianRupee,
    t: "4. Transparent closing",
    b: "We coordinate paperwork, registration, and legal review through partner firms.",
  },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Sell"
        title="The quiet way"
        italic="to sell a home."
        description="No 'For Sale' boards. No 40 calls a day. List once, and let us bring you the right buyer."
      />

      <section className="container-edge pb-32">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <div>
            <div className="grid sm:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="bg-surface p-8"
                >
                  <s.icon className="h-5 w-5 text-accent-blue" />
                  <div className="mt-4 text-lg font-semibold tracking-tight">{s.t}</div>
                  <div className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.b}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-ink text-surface p-10 md:p-14">
              <div className="eyebrow text-surface/60">— What it costs</div>
              <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                2% of sale value. Nothing else.
              </h3>
              <p className="mt-4 text-surface/75 max-w-md">
                No listing fees, no photography fees, no paperwork fees. We only earn when your home
                does.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <form className="rounded-2xl border border-line-soft p-7 lg:p-9 bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
              <div className="eyebrow text-muted-foreground">— List your property</div>
              <div className="mt-6 space-y-4">
                {[
                  { l: "Your full name", t: "text" },
                  { l: "Mobile number", t: "tel" },
                  { l: "Email", t: "email" },
                  { l: "Property location", t: "text" },
                ].map((f) => (
                  <label key={f.l} className="block">
                    <div className="text-[12px] font-medium text-muted-foreground">{f.l}</div>
                    <input
                      type={f.t}
                      className="mt-1.5 w-full border-b border-line bg-transparent py-2.5 text-[15px] outline-none focus:border-ink transition"
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-[14px] font-medium text-surface hover:bg-accent-blue transition"
              >
                Get started <ArrowUpRight className="h-4 w-4" />
              </button>
              <Link
                to="/properties"
                className="mt-4 block text-center text-[12.5px] text-muted-foreground hover:text-ink"
              >
                Or browse what others are listing →
              </Link>
            </form>
          </aside>
        </div>
      </section>
    </>
  );
}
