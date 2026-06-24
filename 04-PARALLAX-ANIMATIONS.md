# Parallax Scrolling & Visual Animation Specification

## LuxeHaven Realty — Premium B2C Real Estate Platform

**Version:** 1.0.0 | **Status:** Production-Ready | **Date:** June 2026

---

## 1. Animation Philosophy

LuxeHaven's animation system follows the principle of **"purposeful motion"** — every animation must serve a functional or emotional role. Motion should feel like a premium magazine coming to life, never distracting or gratuitous. We borrow from editorial print design: things reveal as you read, depth emerges as you explore, and the interface _breathes_.

### Core Principles

- **Physics-based easing:** Use spring physics over linear ease; motion feels weighted and real
- **Scroll-linked:** Most animations are tied to scroll position, not time delays
- **Layer depth:** Parallax reinforces spatial hierarchy — background moves slower, foreground faster
- **Performance first:** GPU-accelerated transforms only (`transform`, `opacity`). Never animate `top`, `left`, `width`, `height`, or `margin`
- **Reduced Motion respect:** All animations wrapped in `prefers-reduced-motion: reduce` media query

### Tools

- **Framer Motion 11** — primary animation library (useScroll, useTransform, motion.div)
- **CSS Custom Properties** — for scroll progress variables
- **Intersection Observer API** — for enter/exit triggers
- **requestAnimationFrame** — for scroll-linked JS animations fallback

---

## 2. Homepage Parallax System

### 2.1 Hero Section (100vh)

The hero is the most theatric moment of the site. It uses a **multi-layer parallax stack** with 4 depth planes.

#### Layer Architecture

```
Z-INDEX STACK (front to back):

Layer 5 (z:50) — Foreground content: Headline + Search Widget
  Scroll behaviour: Pinned in place (position: sticky)
  Y offset: 0 (static)

Layer 4 (z:40) — Foreground image element: Partial property silhouette
  Scroll behaviour: Moves UP at 0.3x scroll speed
  Transform: translateY(scrollY * -0.3)
  Opacity: 1 → 0 as hero exits viewport

Layer 3 (z:30) — Midground: Architectural blur overlay
  Scroll behaviour: Moves UP at 0.15x scroll speed
  Transform: translateY(scrollY * -0.15)
  CSS filter: blur(0px → 4px) as scroll progresses

Layer 2 (z:20) — Background image: City skyline or luxury interior
  Scroll behaviour: Moves UP at 0.5x scroll speed
  Transform: translateY(scrollY * -0.5) + scale(1.1) always
  Initial scale pre-loaded to 1.1 to prevent letterboxing at max parallax

Layer 1 (z:10) — Deepest: Gradient overlay (#000 → transparent)
  Scroll behaviour: Fixed, opacity increases on scroll
  Opacity: 0.3 + (scrollY / viewportHeight) * 0.4 (capped at 0.7)
```

#### Implementation (Framer Motion)

```tsx
// components/home/HeroParallax.tsx
import { useScroll, useTransform, motion } from "framer-motion";

export function HeroParallax() {
  const { scrollY } = useScroll();

  // Layer transforms
  const bgY = useTransform(scrollY, [0, 800], [0, -400]); // 0.5x
  const midY = useTransform(scrollY, [0, 800], [0, -120]); // 0.15x
  const fgY = useTransform(scrollY, [0, 800], [0, -240]); // 0.3x
  const overlayOp = useTransform(scrollY, [0, 600], [0.3, 0.7]);
  const midBlur = useTransform(scrollY, [0, 600], [0, 4]);
  const contentOp = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Layer 1: Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10"
        style={{ opacity: overlayOp }}
      />

      {/* Layer 2: Background image */}
      <motion.div className="absolute inset-0 z-20 scale-110" style={{ y: bgY }}>
        <img src="/hero-background.webp" alt="" className="w-full h-full object-cover" priority />
      </motion.div>

      {/* Layer 3: Midground blur */}
      <motion.div
        className="absolute inset-0 z-30"
        style={{ y: midY, filter: `blur(${midBlur}px)` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-60
                        bg-gradient-to-t from-black/40 to-transparent"
        />
      </motion.div>

      {/* Layer 4: Foreground silhouette */}
      <motion.div className="absolute bottom-0 left-0 right-0 z-40" style={{ y: fgY }}>
        <img src="/hero-foreground.webp" alt="" className="w-full" />
      </motion.div>

      {/* Layer 5: Content */}
      <motion.div
        className="absolute inset-0 z-50 flex flex-col
                   items-center justify-center"
        style={{ opacity: contentOp, y: contentY }}
      >
        <h1
          className="text-[105px] font-bold text-white leading-none
                       tracking-[-1.2px] text-center max-w-4xl"
        >
          Find the space that defines you.
        </h1>
        <SearchWidget />
      </motion.div>
    </section>
  );
}
```

---

### 2.2 Featured Listings Section — Horizontal Scroll Parallax

As user scrolls vertically down the page, the featured properties section scrolls **horizontally** — creating a cinematic panning effect.

```tsx
// Scroll-linked horizontal translation
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

// Container: overflow-x hidden, wide inner div moves via transform
<div ref={sectionRef} className="h-[300vh] relative">
  <div className="sticky top-0 h-screen overflow-hidden">
    <motion.div className="flex gap-8 absolute top-1/2 -translate-y-1/2" style={{ x }}>
      {properties.map((p) => (
        <PropertyCard key={p.id} {...p} />
      ))}
    </motion.div>
  </div>
</div>;
```

---

### 2.3 City Explorer Section — Depth Float

Each city card has a subtle floating animation based on mouse position (desktop) or idle oscillation (mobile).

```tsx
// Mouse-parallax on city cards
function CityCard({ city }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      animate={{
        rotateX: mousePos.y * -8,
        rotateY: mousePos.x * 8,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Card content */}
    </motion.div>
  );
}
```

---

### 2.4 How It Works Section — Staggered Reveal

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// Triggered by IntersectionObserver entering viewport
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {steps.map((step) => (
    <motion.div key={step.id} variants={stepVariants}>
      <StepCard {...step} />
    </motion.div>
  ))}
</motion.div>;
```

---

### 2.5 Trust Stats Counter Animation

Number counters animate from 0 to target when section enters viewport.

```tsx
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView]);

  return (
    <span ref={nodeRef}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
// Usage: <AnimatedCounter target={50000} suffix="+" />
```

---

## 3. Property Detail Page Animations

### 3.1 Photo Gallery — Smooth Image Transitions

```tsx
// Gallery uses AnimatePresence for crossfade
<AnimatePresence mode="wait">
  <motion.img
    key={activeIndex}
    src={images[activeIndex]}
    initial={{ opacity: 0, scale: 1.02 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
  />
</AnimatePresence>
```

### 3.2 Property Stat Cards — Count-Up on Scroll

Same AnimatedCounter as homepage stats, triggered by scroll into view.

### 3.3 Enquiry Modal — Slide Up

```tsx
const modalVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 300 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
};
```

### 3.4 Sticky Action Bar — Scroll-Triggered Appearance

```tsx
const actionBarVisible = useTransform(scrollY, [400, 500], [0, 1]);
// Action bar fades in after scrolling past the above-fold content
```

### 3.5 Neighbourhood POI Cards — Staggered Entry

Same stagger pattern as "How It Works" section.

---

## 4. Search Results Page Animations

### 4.1 Property Card Enter

```tsx
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// Applied via LayoutGroup for smooth re-ordering on filter change
```

### 4.2 Filter Change — Layout Animation

```tsx
// When filters change, cards reorder smoothly
<LayoutGroup>
  {properties.map((p) => (
    <motion.div key={p.id} layout variants={cardVariants}>
      <PropertyCard {...p} />
    </motion.div>
  ))}
</LayoutGroup>
```

### 4.3 Map → List Toggle

```tsx
<AnimatePresence mode="wait">
  {viewMode === "list" ? (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <ListView />
    </motion.div>
  ) : (
    <motion.div
      key="map"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <MapView />
    </motion.div>
  )}
</AnimatePresence>
```

---

## 5. New Project Page Animations

### 5.1 Hero — Ken Burns Effect

```css
@keyframes kenBurns {
  0% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.08) translate(-1%, -0.5%);
  }
  100% {
    transform: scale(1) translate(0, 0);
  }
}

.project-hero-image {
  animation: kenBurns 12s ease-in-out infinite;
}
```

### 5.2 Unit Mix Table — Row Stagger

Rows animate in from left with 80ms stagger delay.

### 5.3 Construction Timeline — Progress Line Draw

```tsx
// SVG path with pathLength animation
<motion.path
  d={timelinePath}
  strokeDasharray="1"
  strokeDashoffset={useTransform(scrollProgress, [0, 1], [1, 0])}
/>
```

### 5.4 Lead Capture Form — Sticky Slide-In (Desktop)

```tsx
// Becomes sticky after hero exits, slides in from right
const formY = useTransform(scrollY, [0, 600], [60, 0]);
const formOp = useTransform(scrollY, [400, 600], [0, 1]);
```

---

## 6. Micro-Interaction Catalogue

| Component          | Trigger      | Animation                            | Duration        |
| ------------------ | ------------ | ------------------------------------ | --------------- |
| Primary Button     | Hover        | scale(1.02) + bg #000                | 150ms           |
| Primary Button     | Click        | scale(0.97)                          | 100ms           |
| Card               | Hover        | translateY(-2px) + shadow elevation  | 200ms           |
| Nav Link           | Hover        | color → #007AFF + underline slide in | 150ms           |
| Wishlist Heart     | Click        | scale(1.3) → 1 + fill red            | 250ms spring    |
| Filter pill        | Toggle       | bg slides in from left               | 180ms           |
| Search input       | Focus        | border-color #007AFF + glow ring     | 200ms           |
| Photo thumbnail    | Hover        | scale(1.03)                          | 200ms           |
| Map pin            | Hover        | scale(1.2) + bounce spring           | 300ms           |
| Compare checkbox   | Toggle       | checkmark draws in                   | 300ms           |
| Toast notification | Enter        | slide from right                     | 250ms spring    |
| Toast notification | Exit         | slide to right + fade                | 200ms           |
| Skeleton loader    | Always       | shimmer left-to-right                | 1500ms infinite |
| Page transition    | Route change | fade opacity 0→1                     | 300ms           |
| Dropdown menu      | Open         | scale(0.95)→1 + opacity              | 150ms           |
| Accordion          | Toggle       | height expand + rotate chevron       | 300ms spring    |
| Tab switch         | Click        | underline slides to new tab          | 200ms spring    |

---

## 7. Page Transition System

```tsx
// app/layout.tsx — Page transition wrapper
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  out: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

function PageWrapper({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main initial="initial" animate="in" exit="out" variants={pageVariants}>
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
```

---

## 8. Scroll Progress Indicator

A 1px line at the top of the viewport (below sticky nav) that fills left-to-right with `#007AFF` as the user scrolls through content-heavy pages (Property Detail, Project Pages, Blog Articles).

```tsx
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-[60px] left-0 right-0 h-[2px]
                 bg-[#007AFF] origin-left z-50"
      style={{ scaleX }}
    />
  );
}
```

---

## 9. Accessibility & Reduced Motion

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  /* Kill all animations and parallax */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Disable parallax */
  [data-parallax] {
    transform: none !important;
  }
}
```

```tsx
// All Framer Motion components check this hook
import { useReducedMotion } from "framer-motion";

function AnimatedCard({ children }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 10. Performance Optimisation for Animations

| Optimisation             | Implementation                                                 |
| ------------------------ | -------------------------------------------------------------- |
| GPU layer promotion      | `will-change: transform` on parallax elements                  |
| Avoid layout thrash      | Animate `transform` and `opacity` only                         |
| Passive scroll listeners | `{ passive: true }` on all scroll event listeners              |
| Intersection Observer    | Replaces scroll event listeners for enter/exit triggers        |
| Dynamic imports          | `next/dynamic` for heavy animation components (map, 3D)        |
| Animation kill           | Disconnect observers and cancel RAF on component unmount       |
| Frame throttling         | requestAnimationFrame for scroll-linked JS updates             |
| Preload hero image       | `<link rel="preload" as="image" href="/hero-background.webp">` |

---

_Document Owner: Frontend Lead & Motion Design | Version: 1.0 | June 2026_
