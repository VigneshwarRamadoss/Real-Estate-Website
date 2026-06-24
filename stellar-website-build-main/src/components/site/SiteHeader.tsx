import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";

const NAV = [
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Sell", to: "/sell" },
  { label: "Projects", to: "/projects" },
  { label: "Agents", to: "/agents" },
  { label: "Insights", to: "/insights" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-surface/85 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-surface text-[13px] font-bold">
            L
          </span>
          <span className="text-[15px] font-semibold tracking-tight">LuxeHaven</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-[13.5px] font-medium text-ink-soft transition hover:text-ink"
              activeProps={{ className: "px-4 py-2 text-[13.5px] font-semibold text-ink" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/properties"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-medium hover:bg-line-soft transition"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </Link>
          <Link
            to="/login"
            className="hidden md:inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-surface hover:bg-ink-soft transition"
          >
            Sign in
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-line"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line-soft bg-surface">
          <div className="container-edge py-4 flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-ink py-3 text-center text-sm font-medium text-surface"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
