import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  italic,
  description,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
}) {
  return (
    <section className="container-edge pt-36 md:pt-44 pb-12 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="eyebrow text-muted-foreground">— {eyebrow}</div>
        <h1 className="mt-6 display-xl !text-[clamp(2.75rem,8vw,7rem)] max-w-[14ch]">
          {title}{" "}
          {italic && <span className='font-["Instrument_Serif"] italic font-normal'>{italic}</span>}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
