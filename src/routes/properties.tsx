import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { SearchBar } from "@/components/site/SearchBar";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties for sale & rent — LuxeHaven" },
      { name: "description", content: "Browse verified premium properties across India." },
    ],
  }),
  component: Page,
});

const FILTERS = ["All", "Apartment", "Villa", "Ready", "New Launch"];

function Page() {
  const [active, setActive] = useState("All");
  const filtered = PROPERTIES.filter(
    (p) => active === "All" || p.type === active || p.status === active,
  );

  return (
    <>
      <PageHero
        eyebrow="Listings"
        title="Every home,"
        italic="weighed carefully."
        description="42,000+ residences. Each one verified, photographed by us, and priced transparently."
      />

      <div className="container-edge">
        <div className="-mt-4">
          <SearchBar />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition border ${
                active === f ? "bg-ink text-surface border-ink" : "border-line hover:bg-line-soft"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[13px] text-muted-foreground">{filtered.length} homes</span>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 pb-32">
          {filtered.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
