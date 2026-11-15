"use client";

// ============================================================
// Tamim Global — Team / Studio Showcase
// Exact 1:1 Match to neoleaf.bytetown.agency Section 7
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

const tickerRow1 = ["neural", "empathetic", "expert", "collab", "precision", "modern"];
const tickerRow2 = ["explore", "team", "intuitive", "smart", "scalable", "full-stack"];

function TickerIcon() {
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

export default function NeoTeamSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="w-full px-5 md:px-10 lg:px-[60px] min-h-fs relative z-0 flex flex-col items-center justify-center gap-3 pb-[142px] pt-20 text-center lg:gap-4 lg:pb-[160px] lg:pt-[180px] overflow-hidden">
        {/* Main Content */}
        <h2 className="text-h2-d font-semibold w-full max-w-[732px] will-change-transform lg:max-w-[796px] lg:px-8 lg:text-h1 text-text-black">
          We’re a collaborative team of experts
        </h2>
        <p className="text-body-d lg:text-body text-text-gray w-full max-w-[660px]">
          Led by Md Tamim, we are full-stack software architects, creative technologists,
          and UI engineers passionate about crafting high-performance digital products
          that win market share.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="group relative z-0 inline-flex shrink-0 cursor-pointer appearance-none justify-center whitespace-nowrap rounded-none border-0 p-0 text-center font-medium tracking-normal no-underline shadow-none transition-colors disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 h-12 items-stretch gap-0 text-[16px] leading-[130%] text-text-black lg:h-[52px] lg:text-button mt-4 max-md:w-full lg:mt-5"
        >
          <span className="inline-flex items-center justify-center relative h-full grow overflow-hidden rounded-[100px] bg-accent-1 px-10 transition-colors lg:group-hover:bg-accent-3 font-semibold">
            Let’s Talk!
          </span>
          <span className="relative flex shrink-0 items-center justify-center overflow-hidden aspect-square h-full rounded-full bg-accent-1 lg:transition-colors lg:group-hover:bg-accent-3">
            <span
              className="max-lg:hidden lg:absolute lg:inset-0 lg:m-auto lg:flex lg:size-full lg:translate-y-full lg:items-center lg:justify-center lg:transition-transform lg:group-hover:translate-y-0 lg:group-hover:duration-700"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 28 28"
                className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[28px]"
              >
                <path
                  fill="currentColor"
                  d="m22.707 13.293-7-7a1 1 0 0 0-1.497 1.32l.083.094L19.586 13H6a1 1 0 0 0-.993.883L5 14a1 1 0 0 0 .883.993L6 15h13.586l-5.293 5.293a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083 7-7 .097-.112.071-.11.054-.114.035-.105.025-.117.007-.06.004-.108-.004-.07-.016-.112-.03-.111-.044-.111-.052-.098-.067-.096a1 1 0 0 0-.08-.09l-7-7z"
                />
              </svg>
            </span>
            <span className="flex size-full items-center justify-center lg:transition-transform lg:group-hover:-translate-y-full lg:group-hover:duration-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 28 28"
                className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[28px]"
              >
                <path
                  fill="currentColor"
                  d="m22.707 13.293-7-7a1 1 0 0 0-1.497 1.32l.083.094L19.586 13H6a1 1 0 0 0-.993.883L5 14a1 1 0 0 0 .883.993L6 15h13.586l-5.293 5.293a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083 7-7 .097-.112.071-.11.054-.114.035-.105.025-.117.007-.06.004-.108-.004-.07-.016-.112-.03-.111-.044-.111-.052-.098-.067-.096a1 1 0 0 0-.08-.09l-7-7z"
                />
              </svg>
            </span>
          </span>
        </button>

        {/* Ambient Counter-Moving Tickers in Background (Signature NeoLeaf touch) */}
        <div
          className="max-lg:hidden lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:-z-10 lg:mt-[-96px] lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-6 lg:overflow-hidden lg:text-text-gray opacity-30 pointer-events-none select-none"
          aria-hidden="true"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="lg:flex lg:shrink-0 lg:items-center lg:justify-end lg:gap-6 whitespace-nowrap"
          >
            {[...tickerRow1, ...tickerRow1, ...tickerRow1].map((word, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <TickerIcon />
                <span className="text-h3-d lg:text-h3 font-medium lowercase">
                  {word}
                </span>
              </span>
            ))}
          </motion.div>
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="lg:flex lg:shrink-0 lg:items-center lg:gap-6 whitespace-nowrap"
          >
            {[...tickerRow2, ...tickerRow2, ...tickerRow2].map((word, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <TickerIcon />
                <span className="text-h3-d lg:text-h3 font-medium lowercase">
                  {word}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

