"use client";

// ============================================================
// Tamim Global — Kinetic Tag Cloud Marquee
// Exact 1:1 Match to neoleaf.bytetown.agency Section 2
// ============================================================

import { motion } from "framer-motion";

const tags = [
  "smart",
  "deep",
  "cognitive",
  "neural",
  "empathetic",
  "intuitive",
  "machine-learning",
  "data-driven",
  "generative",
  "scalable",
  "next.js",
  "cloud-native",
];

function TagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[40px]"
    >
      <path
        fill="#ECECF7"
        d="M4 4h16c8.837 0 16 7.163 16 16H20C11.163 20 4 12.837 4 4"
      />
      <path
        fill="#DED7FA"
        d="M4 20h16c8.837 0 16 7.163 16 16H20c-8.837 0-16-7.163-16-16"
      />
    </svg>
  );
}

export default function NeoKineticTicker() {
  return (
    <section className="pb-20 pt-10 text-text-gray lg:py-[60px] overflow-hidden select-none">
      <div className="flex w-full items-center overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap will-change-transform"
        >
          {/* Double list for seamless loop */}
          {[...tags, ...tags, ...tags].map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-6">
              <TagIcon />
              <span className="text-h3-d lg:text-h3 font-medium max-lg:text-h3 lowercase text-text-gray hover:text-text-black transition-colors">
                {tag}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

