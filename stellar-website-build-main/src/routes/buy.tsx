import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SearchBar } from "@/components/site/SearchBar";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy a home — LuxeHaven" },
      { name: "description", content: "Premium residences for sale across India." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Buy"
        title="A home is a"
        italic="long argument with yourself."
        description="Take your time. We've already done the verifying, the photographing, and the math."
      />
      <div className="container-edge">
        <SearchBar />
      </div>
      <section className="container-edge mt-16 pb-32 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {PROPERTIES.filter((p) => p.status === "Ready").map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </section>
    </>
  );
}
