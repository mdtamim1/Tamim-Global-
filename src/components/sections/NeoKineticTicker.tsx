"use client";

// ============================================================
// Tamim Global — Kinetic Tag Cloud Marquee (Two-Row)
// Row 1: code/web/programming → RIGHT-TO-LEFT
// Row 2: video/music/cinema   → LEFT-TO-RIGHT (reverse)
// ============================================================

import { motion } from "framer-motion";

const tagsRow1 = [
  "typescript",
  "react 19",
  "next.js 15",
  "node.js",
  "prisma orm",
  "webgl shaders",
  "gsap motion",
  "figma systems",
  "tailwind css",
  "rest apis",
  "postgresql",
];

const tagsRow2 = [
  "premiere pro",
  "davinci resolve",
  "after effects",
  "color grading",
  "sound design",
  "music composition",
  "film scoring",
  "foley & sfx",
  "4k cinema",
  "ableton live",
  "logic pro",
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
    <section className="pb-20 pt-10 lg:py-[60px] overflow-hidden select-none bg-[#030209]">
      {/* Row 1: Right-to-Left (code/web/programming) */}
      <div className="flex w-full items-center overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap will-change-transform"
        >
          {[...tagsRow1, ...tagsRow1, ...tagsRow1].map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-6">
              <TagIcon />
              <span className="text-h3-d lg:text-h3 font-medium lowercase text-white/30 hover:text-white transition-colors">
                {tag}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Separator */}
      <div className="border-t border-white/5 my-4" />

      {/* Row 2: Left-to-Right / reverse (video/music/cinema) */}
      <div className="flex w-full items-center overflow-hidden">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap will-change-transform"
        >
          {[...tagsRow2, ...tagsRow2, ...tagsRow2].map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-6">
              <TagIcon />
              <span className="text-h3-d lg:text-h3 font-medium lowercase text-white/30 hover:text-white transition-colors">
                {tag}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
