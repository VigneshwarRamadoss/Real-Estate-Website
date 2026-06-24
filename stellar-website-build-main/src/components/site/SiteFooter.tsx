import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const COLS = [
  {
    title: "Discover",
    links: [
      { label: "Buy", to: "/buy" },
      { label: "Rent", to: "/rent" },
      { label: "New Projects", to: "/projects" },
      { label: "Compare", to: "/compare" },
    ],
  },
  {
    title: "For owners",
    links: [
      { label: "Sell a home", to: "/sell" },
      { label: "Post a property", to: "/sell" },
      { label: "Agent directory", to: "/agents" },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { label: "Market insights", to: "/insights" },
      { label: "City reports", to: "/insights" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-surface">
      <div className="container-edge py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-surface text-sm font-bold">
                L
              </span>
              <span className="text-lg font-semibold tracking-tight">LuxeHaven</span>
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              Editorial real estate for India's most considered buyers. Verified listings,
              transparent pricing, zero noise.
            </p>
            <Link
              to="/properties"
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-accent-blue hover:gap-3 transition-all"
            >
              Browse all properties <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <div className="eyebrow text-muted-foreground">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[15px] hover:text-accent-blue transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line-soft pt-8 text-[12.5px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} LuxeHaven Realty Pvt Ltd · RERA Verified · Design by The
            Dot
          </div>
          <div className="flex gap-6">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Disclaimer</span>
            <span>Mumbai · Delhi · Bangalore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
