"use client";

// ============================================================
// Tamim Global — Preloader
// Elegant brand intro: TG monogram → "Tamim Global" word reveal
// Under 2.5 seconds total. Skippable on click/key.
// ============================================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase("text"), 700);
    const t2 = setTimeout(() => setPhase("exit"), 1800);
    const t3 = setTimeout(() => onComplete(), 2500);

    // Skip on keypress or click
    const skip = () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      onComplete();
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("click", skip, { once: true });

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-base-900 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[100px]" />
          </motion.div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* TG Monogram */}
            <motion.div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-400" />
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Monogram */}
              <span className="relative font-display font-bold text-3xl text-white tracking-tight">
                TG
              </span>
              {/* Border highlight */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 ring-1 ring-inset ring-white/10" />
            </motion.div>

            {/* Word mark */}
            <AnimatePresence>
              {phase === "text" && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-display font-semibold text-xl text-ink-50 tracking-tight">
                    Tamim Global
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <motion.div
              className="w-32 h-px bg-glass-border rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-violet-300 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

