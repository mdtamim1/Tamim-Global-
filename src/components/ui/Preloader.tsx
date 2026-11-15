"use client";

// ============================================================
// Tamim Global — Preloader
// Exact 1:1 match to neoleaf.bytetown.agency:
// Solid dark screen, centered luxury titanium TG monogram,
// smooth 0% -> 100% counter, and seamless curtain wipe reveal.
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

  // Disable scroll during preloader
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
      
      // Easing curve matching high-end creative agency loaders
      const eased = Math.floor(rawProgress * 100);
      setProgress(eased);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% for 180ms, then slide up curtain
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
        <div className="relative w-full max-w-[80%] md:max-w-[70%] lg:max-w-[740px] xl:max-w-[965px] flex flex-col items-center">
          {/* Centered Titanium Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center mb-8"
          >
            <div className="relative size-28 md:size-36 rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
              <Image
                src="/images/tg-mark.jpg"
                alt="Tamim Global Titanium Monogram"
                width={144}
                height={144}
                priority
                className="size-full rounded-2xl object-cover"
              />
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>

            <div className="mt-4 font-brand font-bold text-2xl md:text-3xl tracking-tight text-white flex items-center gap-2">
              <span>TAMIM</span>
              <span className="text-accent-1">GLOBAL</span>
            </div>
          </motion.div>

          {/* Loading percentage counter matching NeoLeaf layout */}
          <div className="text-menu-link font-medium text-white/80 self-end mt-2 tracking-wide font-primary">
            loading... <span className="inline-block font-semibold text-accent-1 w-9 text-right">{progress}</span>%
          </div>

          {/* Progress track bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
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
