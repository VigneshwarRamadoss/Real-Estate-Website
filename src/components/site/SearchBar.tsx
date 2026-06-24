import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ChevronDown } from "lucide-react";

const TABS = ["Buy", "Rent", "New Projects", "Commercial"] as const;
const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Goa"];
const BUDGETS = ["₹50L – 1 Cr", "₹1 – 3 Cr", "₹3 – 7 Cr", "₹7 Cr+"];

export function SearchBar({ dark = false }: { dark?: boolean }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Buy");
  const [city, setCity] = useState("Mumbai");
  const [budget, setBudget] = useState("₹3 – 7 Cr");
  const nav = useNavigate();

  const surface = dark ? "bg-surface/95 backdrop-blur-2xl" : "bg-surface border border-line-soft";

  return (
    <div
      className={`rounded-2xl ${surface} text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] overflow-hidden`}
    >
      <div className="flex gap-1 overflow-x-auto whitespace-nowrap border-b border-line-soft px-4 pt-3 pb-2 [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition ${
              tab === t ? "bg-ink text-surface" : "text-ink-soft hover:bg-line-soft"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_auto] gap-0 divide-y md:divide-y-0 md:divide-x divide-line-soft">
        <Field label="Location">
          <div className="relative flex items-center">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full appearance-none bg-transparent text-[15px] font-medium outline-none pr-8 cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 pointer-events-none h-4 w-4 text-ink-soft opacity-70" />
          </div>
        </Field>
        <Field label="Property type">
          <div className="relative flex items-center">
            <select className="w-full appearance-none bg-transparent text-[15px] font-medium outline-none pr-8 cursor-pointer">
              {["Apartment", "Villa", "Independent house", "Plot"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 pointer-events-none h-4 w-4 text-ink-soft opacity-70" />
          </div>
        </Field>
        <Field label="Budget">
          <div className="relative flex items-center">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full appearance-none bg-transparent text-[15px] font-medium outline-none pr-8 cursor-pointer"
            >
              {BUDGETS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 pointer-events-none h-4 w-4 text-ink-soft opacity-70" />
          </div>
        </Field>
        <div className="p-3">
          <button
            onClick={() => nav({ to: "/properties" })}
            className="flex min-h-[48px] md:h-full w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-4 text-[14px] font-medium text-surface hover:bg-accent-blue transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="md:hidden lg:inline">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block px-5 py-4 cursor-pointer hover:bg-line-soft/60 transition">
      <div className="eyebrow text-muted-foreground">{label}</div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
