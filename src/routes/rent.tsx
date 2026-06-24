import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SearchBar } from "@/components/site/SearchBar";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Rent — LuxeHaven" },
      { name: "description", content: "Premium rental residences." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Rent"
        title="Short leases,"
        italic="long horizons."
        description="Furnished, semi-furnished, and bare-shell rentals — all owner-direct, all verified."
      />
      <div className="container-edge">
        <SearchBar />
      </div>
      <section className="container-edge mt-16 pb-32 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {PROPERTIES.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </section>
    </>
  );
}
