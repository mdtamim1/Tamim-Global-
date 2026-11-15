"use client";

// ============================================================
// Tamim Global — Preloader
// Exact 1:1 Match to neoleaf.bytetown.agency Opening Screen
// Features: Massive brand wordmark spanning screen width,
// centered titanium TG monogram mark, smooth 0% -> 100% counter,
// and seamless upward curtain wipe reveal.
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

  // Lock body scroll during preloader
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Smooth counter to 100%
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1600; // 1.6s

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      const eased = Math.floor(rawProgress * 100);
      setProgress(eased);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 750);
        }, 180);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    const handleSkip = () => {
      setProgress(100);
      setIsExiting(true);
      setTimeout(onComplete, 250);
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
        key="neoleaf-preloader"
        initial={{ y: 0 }}
        animate={{ y: isExiting ? "-100%" : 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999999] flex select-none items-center justify-center bg-[#151515] text-center text-white w-screen h-screen overflow-hidden"
      >
        <div className="relative w-full max-w-[90%] md:max-w-[85%] lg:max-w-[965px] flex flex-col items-center">
          {/* Centered Titanium TG Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative size-20 md:size-28 rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center mb-4"
          >
            <Image
              src="/images/tg-mark.jpg"
              alt="Tamim Global Titanium Monogram"
              width={112}
              height={112}
              priority
              className="size-full rounded-xl md:rounded-2xl object-cover"
            />
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>

          {/* Massive Display Brand Wordmark (Exact NeoLeaf frame_00 style) */}
          <div className="relative w-full overflow-hidden select-none">
            <div className="font-brand font-extrabold text-center text-[calc(48_/_360_*_100vw)] leading-[85%] tracking-tight md:text-[110px] lg:text-[150px] xl:text-[190px] text-white/90">
              <span>Tamim</span>{" "}
              <span className="text-white/40">Global</span>
            </div>
          </div>

          {/* Loading Counter on Bottom Right (Exact NeoLeaf layout) */}
          <div className="w-full flex items-center justify-between mt-4 md:mt-6 px-2">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
              System Initializing
            </span>
            <div className="text-menu-link font-medium text-white/80 tracking-wide font-primary">
              loading... <span className="inline-block font-semibold text-accent-1 w-10 text-right">{progress}</span>%
            </div>
          </div>

          {/* Bottom Progress Track Line */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-accent-1 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
