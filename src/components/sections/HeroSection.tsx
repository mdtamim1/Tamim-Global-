"use client";

// ============================================================
// Tamim Global — Hero Section
// Exact match to awmedia.marketing's hero structure & typography
// ============================================================

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, ShieldCheck, Zap } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";
import type { HeroContent } from "@/types";

interface HeroSectionProps {
  content?: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  void content;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center pt-32 pb-16 px-4 overflow-hidden">
      {/* Ambient Radial Lighting Glow */}
      <div className="aw-glow" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Hero Brand Crest / Monogram Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl p-1 bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center backdrop-blur-xl group hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/tg-mark.jpg"
              alt="Tamim Global Titanium Monogram"
              width={104}
              height={104}
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Eyebrow Glass Chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="chip">
            <span className="dot"></span>
            <span>Global Digital Studio · High-Performance Engineering</span>
          </div>
        </motion.div>

        {/* Massive Chrome Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-white tracking-tight mb-6 max-w-3xl"
        >
          <span className="block">Designed properly.</span>
          <span className="block chrome">Built faster.</span>
        </motion.h1>

        {/* Lede Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lede max-w-2xl text-center mb-10 text-white/70"
        >
          An independent engineering & design studio shipping bespoke websites and scalable SaaS at{" "}
          <span className="text-white font-medium">AI-accelerated speed</span>. Two lanes. Both fully custom. Neither templated.
        </motion.p>

        {/* Dual High-Impact Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-solid w-full sm:w-auto"
          >
            <span>Book a Free Strategy Call</span>
          </button>
          <a
            href="#work"
            className="btn btn-glass w-full sm:w-auto"
          >
            <span>View Recent Work</span>
          </a>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm font-semibold tracking-wide text-white/50 uppercase"
        >
          <li className="flex items-center gap-2">
            <Zap size={14} className="text-white/70" />
            <span>30+ Digital Products Shipped</span>
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>5.0 Client Satisfaction</span>
          </li>
          <li className="flex items-center gap-2">
            <Sparkles size={14} className="text-violet-400" />
            <span>Full-Stack Next.js 15 Craft</span>
          </li>
        </motion.ul>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-semibold text-white/30 tracking-widest uppercase pointer-events-none"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
