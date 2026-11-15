"use client";

// ============================================================
// Tamim Global — Hero Neo Section
// Exact architectural match to neoleaf.bytetown.agency:
// Header pill, bold fluid typography, dual action triggers,
// and embedded cinematic looping video container.
// ============================================================

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

export default function HeroNeoSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 md:px-8 overflow-hidden bg-black text-white">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header / Copy Area */}
      <div className="max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Eyebrow Floating Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="chip">
            <span className="dot"></span>
            <span>Fast, Secure and Scalable Architecture</span>
          </div>
        </motion.div>

        {/* Hero Title Matching NeoLeaf */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display text-white tracking-tight mb-6 max-w-4xl"
        >
          <span>We’re building the future of </span>
          <span className="chrome">digital systems &amp; web products.</span>
        </motion.h1>

        {/* Lede Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lede max-w-2xl mx-auto text-white/70 mb-10"
        >
          We empower enterprises, ambitious founders, and growing brands to engineer high-converting digital flagships, robust SaaS architectures, and AI-accelerated web experiences.
        </motion.p>

        {/* Dual Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-solid w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>Let’s Talk!</span>
            <ArrowRight size={15} />
          </button>
          <a
            href="#technology"
            className="btn btn-glass w-full sm:w-auto"
          >
            <span>Explore Systems</span>
          </a>
        </motion.div>
      </div>

      {/* Cinematic Looping Video Stage (NeoLeaf Signature) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto w-full relative"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-[28px] md:rounded-[36px] overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
          {/* Looping Ambient Motion Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/video/intro.mp4" type="video/mp4" />
          </video>

          {/* Vignette & Radial Edge Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/70 pointer-events-none" />

          {/* Center Subtle Watermark Crest */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-3 glass px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/images/tg-mark.jpg"
                alt="Tamim Global"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-mono font-semibold tracking-wider text-white/90">
              TAMIM GLOBAL // ARCHITECTURE LABS
            </span>
          </div>

          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>NEXT.js 15 EDGE COMPUTE</span>
          </div>
        </div>
      </motion.div>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
