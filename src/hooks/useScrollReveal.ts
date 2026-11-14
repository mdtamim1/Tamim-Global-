// ============================================================
// Tamim Global — useScrollReveal hook
// Triggers Framer Motion variants when element enters viewport.
// ============================================================

import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

export function useScrollReveal({
  threshold = 0.15,
  once = true,
  margin = "0px 0px -80px 0px",
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin: margin as `${number}px ${number}px ${number}px ${number}px`,
  });

  return { ref, isInView };
}

