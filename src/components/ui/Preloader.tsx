"use client";

// ============================================================
// Tamim Global — Standalone Luxury Preloader
// Replicating neoleaf.bytetown.agency's minimalist aesthetic:
// Pure black screen, centered titanium mark, smooth percentage
// counter (0% -> 100%), and luxury curtain wipe reveal.
// ============================================================

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Disable scrolling during preloader
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Smooth counter to 100%
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800; // 1.8s

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Easing curve for realistic system initialization
      const eased = Math.floor(rawProgress * 100);
      setProgress(eased);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for 200ms, then slide up curtain
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 200);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    // Allow user to skip on click or keypress
    const handleSkip = () => {
      setProgress(100);
      setIsExiting(true);
      setTimeout(onComplete, 300);
    };

    window.addEventListener("keydown", handleSkip, { once: true });
    window.addEventListener("click", handleSkip, { once: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="tamim-preloader"
        initial={{ y: 0 }}
        animate={{ y: isExiting ? "-100%" : 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[999999] w-screen h-screen bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-white/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-4">
          {/* Titanium TG Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl p-1 bg-gradient-to-b from-white/30 via-white/10 to-transparent border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center mb-8 relative overflow-hidden group"
          >
            <Image
              src="/images/tg-mark.jpg"
              alt="Tamim Global Titanium Monogram"
              width={120}
              height={120}
              className="rounded-2xl object-cover"
              priority
            />
            
            {/* Shimmer Light Ray passing over logo */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "150%" }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.4 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            />
          </motion.div>

          {/* Brand Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1.5 mb-8"
          >
            <h1 className="text-xl md:text-2xl font-bold tracking-[0.25em] text-white uppercase font-sans">
              Tamim Global
            </h1>
            <p className="text-[11px] md:text-xs font-mono tracking-[0.2em] text-white/40 uppercase">
              Digital Architecture &amp; Systems
            </p>
          </motion.div>

          {/* NeoLeaf Style Loading Counter & Progress Bar */}
          <div className="w-64 md:w-80">
            {/* Counter Text */}
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/50 mb-2">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>loading...</span>
              </span>
              <span className="text-white font-bold tabular-nums">
                {progress}%
              </span>
            </div>

            {/* Hairline 2px Progress Line */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-white/40 via-white to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom subtle hint */}
        <div className="absolute bottom-8 text-[11px] font-mono text-white/20 tracking-wider">
          CLICK ANYWHERE OR PRESS ANY KEY TO SKIP
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
