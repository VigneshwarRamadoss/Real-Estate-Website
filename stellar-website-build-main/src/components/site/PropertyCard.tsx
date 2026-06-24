import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Property } from "@/data/properties";
import { motion } from "framer-motion";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to="/properties/$id" params={{ id: property.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-line-soft">
          <img
            src={property.image}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-90" />
          {property.tag && (
            <div className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur">
              {property.tag}
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface/90 text-ink backdrop-blur transition hover:bg-surface"
            aria-label="Save"
          >
            <Heart className="h-4 w-4" />
          </button>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-surface">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] opacity-80">
                {property.status}
              </div>
              <div className="mt-1 text-xl font-semibold leading-tight">{property.price}</div>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-ink transition group-hover:bg-accent-blue group-hover:text-surface">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-semibold tracking-tight">{property.title}</h3>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              {property.locality}, {property.city}
            </p>
          </div>
          <div className="shrink-0 text-right text-[12.5px] text-ink-soft">
            <div>{property.bhk}</div>
            <div className="text-muted-foreground">{property.area}</div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
