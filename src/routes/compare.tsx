import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PROPERTIES } from "@/data/properties";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare properties — LuxeHaven" }] }),
  component: Page,
});

function Page() {
  const a = PROPERTIES[0],
    b = PROPERTIES[2];
  const rows: [string, string, string][] = [
    ["Price", a.price, b.price],
    ["BHK", a.bhk, b.bhk],
    ["Area", a.area, b.area],
    ["Type", a.type, b.type],
    ["Status", a.status, b.status],
    ["City", `${a.locality}, ${a.city}`, `${b.locality}, ${b.city}`],
    ["Maintenance / yr", "₹2.4L", "₹1.6L"],
    ["Floor", "32 / 38", "21 / 28"],
    ["Facing", "South-West", "North-East"],
    ["Parking", "2 covered", "2 covered"],
  ];
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Side by side,"
        italic="every detail."
        description="Compare up to four residences across price, area, configuration, and total cost of ownership."
      />
      <section className="container-edge pb-32">
        <div className="overflow-hidden rounded-2xl border border-line-soft">
          <div className="grid grid-cols-3 bg-line-soft/60 border-b border-line-soft">
            <div className="p-6 text-[12px] uppercase tracking-wider text-muted-foreground">
              Specification
            </div>
            {[a, b].map((p) => (
              <div key={p.id} className="p-6 border-l border-line-soft">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-line-soft mb-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-lg font-semibold tracking-tight">{p.title}</div>
                <div className="text-[13px] text-muted-foreground">
                  {p.locality}, {p.city}
                </div>
              </div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={r[0]} className={`grid grid-cols-3 ${i % 2 ? "bg-line-soft/30" : ""}`}>
              <div className="p-5 text-[13px] text-muted-foreground">{r[0]}</div>
              <div className="p-5 border-l border-line-soft text-[14.5px] font-medium">{r[1]}</div>
              <div className="p-5 border-l border-line-soft text-[14.5px] font-medium">{r[2]}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
