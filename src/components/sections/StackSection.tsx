"use client";

// ============================================================
// Tamim Global — Stack Section
// Elegant grouped technology display — no progress bars.
// Two rows: even categories scroll right, odd scroll left
// for a premium infinite marquee feel.
// ============================================================

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { StackItem } from "@/types";

interface StackSectionProps {
  stack: StackItem[];
}

/** Tech icon emojis mapped by name — avoids heavy icon dep */
const TECH_ICONS: Record<string, string> = {
  "Next.js": "▲",
  "React": "⚛",
  "TypeScript": "TS",
  "Node.js": "⬢",
  "Tailwind CSS": "🌊",
  "Framer Motion": "✦",
  "Three.js": "🔺",
  "PostgreSQL": "🐘",
  "MongoDB": "🍃",
  "Prisma": "△",
  "Redis": "⚡",
  "Docker": "🐳",
  "Vercel": "▲",
  "Stripe": "💳",
  "SSLCommerz": "🔒",
  "bKash API": "💚",
  "Figma": "🎨",
  "Git": "⑂",
};

/** A single chip */
function StackChip({ item }: { item: StackItem }) {
  const icon = TECH_ICONS[item.name];
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-5 py-3 rounded-xl glass border border-glass-border flex-shrink-0",
        "hover:border-violet-500/40 hover:bg-violet-500/5",
        "transition-all duration-300 cursor-default group"
      )}
    >
      {icon && (
        <span className="text-sm text-ink-500 group-hover:text-violet-400 transition-colors duration-200 font-mono leading-none">
          {icon}
        </span>
      )}
      <span className="text-body-sm font-medium text-ink-300 group-hover:text-violet-300 transition-colors duration-200 whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

/** Infinite marquee track */
function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: StackItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];
  const totalItems = items.length;
  // Approximate width per chip (px) for keyframe duration calc
  const approxWidth = totalItems * 160;
  const dur = approxWidth / speed;

  return (
    <div className="relative overflow-hidden" aria-hidden>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-base-900 to-transparent" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-base-900 to-transparent" />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: direction === "left" ? [0, `-${50}%`] : [`-${50}%`, 0] }}
        transition={{
          x: { duration: dur, ease: "linear", repeat: Infinity },
        }}
      >
        {doubled.map((item, i) => (
          <StackChip key={`${item.name}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function StackSection({ stack }: StackSectionProps) {
  // Group by category
  const grouped = stack.reduce<Record<string, StackItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  // Split into two rows of mixed categories for the marquee
  const allItems = stack;
  const mid = Math.ceil(allItems.length / 2);
  const row1 = allItems.slice(0, mid);
  const row2 = allItems.slice(mid);

  return (
    <section id="stack" className="relative py-32 lg:py-40">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.p variants={fadeUp} className="text-label text-violet-400 uppercase tracking-widest mb-4">
            Tech Stack
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2 variants={fadeUp} className="font-display text-display-xl text-ink-50 max-w-2xl">
              Tools I{" "}
              <span className="text-gradient">master.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-md text-ink-400 max-w-sm md:text-right">
              Chosen for performance, reliability, and developer experience — not hype.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="flex flex-col gap-4 mb-16">
        <MarqueeRow items={row1} direction="left" speed={30} />
        <MarqueeRow items={row2} direction="right" speed={25} />
      </div>

      {/* Grouped list below marquee */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col gap-8"
          variants={staggerContainer(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        >
          {categories.map(([category, items]) => (
            <motion.div key={category} variants={fadeUp}>
              <p className="text-label text-ink-500 uppercase tracking-widest mb-3">{category}</p>
              <div className="flex flex-wrap gap-2.5">
                {items.map((item) => (
                  <StackChip key={item.name} item={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
