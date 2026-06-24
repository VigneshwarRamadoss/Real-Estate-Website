import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Your dashboard — LuxeHaven" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Dashboard"
        title="Welcome back,"
        italic="Aanya."
        description="3 saved properties, 1 scheduled visit, 2 active enquiries."
      />
      <section className="container-edge pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mb-16">
          {[
            ["Saved", "3"],
            ["Visits", "1"],
            ["Enquiries", "2"],
            ["Alerts", "4"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-8">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight">{v}</div>
            </div>
          ))}
        </div>
        <div className="eyebrow text-muted-foreground mb-6">— Recently saved</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {PROPERTIES.slice(0, 3).map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
