"use client";

// ============================================================
// Tamim Global — FAQ Section (#faq)
// Exact match to awmedia.marketing's "Everything you need to know"
// ============================================================

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How long does a typical build take from start to finish?",
    a: "It depends on the lane you choose. For our AI-Accelerated Lane (marketing flagships, landing pages, and rapid MVPs), delivery is typically 7 to 14 days. For our Bespoke Deep Craft Lane (complex multi-tenant SaaS, custom portals, custom payment systems), delivery is usually 3 to 6 weeks. We lock in a fixed deadline before starting.",
  },
  {
    q: "How does your pricing work?",
    a: "Every project receives a transparent, fixed-price quote based on scope, feature requirements, and timeline. There are no hourly billing surprises or hidden fees. Logo design starts from $250, landing pages and full websites are quoted per project after our free discovery call.",
  },
  {
    q: "What tech stack do you build on?",
    a: "We engineer exclusively on modern, high-performance foundations: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, and Vercel Edge networks. We do not use bloated WordPress themes or slow page builders.",
  },
  {
    q: "Do I have 100% ownership of the code and design?",
    a: "Yes. Once the final invoice is settled, you own 100% of the intellectual property, source code, repository, design files, and domain configurations. You are never locked into any proprietary platform.",
  },
  {
    q: "What happens after the website is launched?",
    a: "We don't disappear after launch. We provide 30 days of complimentary post-launch support and monitoring. After that, we offer proactive monthly maintenance, performance optimization, and feature scaling retainers.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 wrap" id="faq">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="eyebrow">Clear Answers</div>
        <h2 className="display text-white mb-4">
          Everything you <span className="chrome">need to know.</span>
        </h2>
        <p className="lede max-w-xl mx-auto">
          Have questions before initiating a project? Here is how we work, quote, and deliver.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass border border-white/10 overflow-hidden rounded-2xl transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 text-white hover:text-white/80 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg font-bold">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-none text-white/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-6 text-sm md:text-base text-white/60 leading-relaxed border-t border-white/5 pt-4">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
