"use client";

// ============================================================
// Tamim Global — Cybernetic Tech Stack & Arsenal
// High-tech grouped stack & infinite marquee with clean monograms.
// ============================================================

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { StackItem } from "@/types";

interface StackSectionProps {
  stack: StackItem[];
}

/** Clean SVG Monograms / Tech Badges */
const TECH_SYMBOLS: Record<string, string> = {
  "Next.js": "▲",
  "React": "⚛",
  "TypeScript": "TS",
  "Node.js": "JS",
  "Tailwind CSS": "TW",
  "Framer Motion": "✦",
  "Three.js": "3D",
  "PostgreSQL": "SQL",
  "MongoDB": "DB",
  "Prisma": "ORM",
  "Redis": "KV",
  "Docker": "BOX",
  "Vercel": "▲",
  "Stripe": "$$",
  "SSLCommerz": "SEC",
  "bKash API": "MFS",
  "Figma": "FIG",
  "Git": "GIT",
};

function StackChip({ item }: { item: StackItem }) {
  const symbol = TECH_SYMBOLS[item.name] ?? "SYS";

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-white/10 flex-shrink-0",
        "hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
        "transition-all duration-300 cursor-default group"
      )}
    >
      <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold text-violet-400 group-hover:text-cyan-300 group-hover:border-cyan-400/30 transition-colors">
        {symbol}
      </span>
      <span className="text-body-sm font-medium text-white group-hover:text-violet-200 transition-colors whitespace-nowrap">
        {item.name}
      </span>
      <span className="font-mono text-[10px] text-ink-500 uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.02]">
        {item.category}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: StackItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items];
  const totalItems = items.length;
  const approxWidth = totalItems * 180;
  const dur = approxWidth / speed;

  return (
    <div className="relative overflow-hidden w-full py-2">
      {/* Edge vignettes for seamless infinite fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-base-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-base-950 to-transparent z-10 pointer-events-none" />

      <div
        className={cn(
          "flex gap-4 marquee-track",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: `${dur}s` }}
      >
        {doubled.map((item, i) => (
          <StackChip key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function StackSection({ stack }: StackSectionProps) {
  const mid = Math.ceil(stack.length / 2);
  const row1 = stack.slice(0, mid);
  const row2 = stack.slice(mid);

  return (
    <section id="stack" className="relative py-32 lg:py-44 overflow-hidden bg-base-950/60">
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-violet-400 uppercase tracking-widest px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              [ 04 // TECH ARSENAL ]
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display text-display-xl text-white mb-4">
            Engineered with{" "}
            <span className="text-gradient">modern primitives.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-body-md text-ink-400 font-sans">
            A high-performance stack chosen for speed, developer ergonomics, conversion velocity, and rock-solid scalability.
          </motion.p>
        </motion.div>
      </div>

      {/* Infinite Dual Marquee */}
      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" speed={30} />
        <MarqueeRow items={row2} direction="right" speed={28} />
      </div>
    </section>
  );
}
