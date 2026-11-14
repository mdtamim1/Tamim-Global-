// ============================================================
// Tamim Global — Animation Helpers & Tokens
// Centralised easing, duration, and variant presets.
// Import these everywhere — never hardcode animation values.
// ============================================================

/** Easing curves (consistent throughout the site) */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,        // expo out — smooth deceleration
  in: [0.7, 0, 0.84, 0] as const,          // expo in
  inOut: [0.87, 0, 0.13, 1] as const,      // expo in-out
  spring: { type: "spring" as const, damping: 30, stiffness: 200 },
} as const;

/** Duration tokens (seconds) */
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  xslow: 1.2,
} as const;

/** Stagger delay between children */
export const stagger = {
  fast: 0.05,
  base: 0.08,
  slow: 0.12,
} as const;

// ---- Framer Motion Variants ----

/** Fade up — the default reveal for most elements */
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Fade in — for subtle opacity-only reveals */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Container that staggers its children */
export const staggerContainer = (delay = 0, staggerTime: number = stagger.base) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delay,
      staggerChildren: staggerTime,
    },
  },
});

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Scale reveal — for cards */
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: ease.out },
  },
};

/** Text reveal (clip-path) */
export const textReveal = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: duration.slow, ease: ease.out },
  },
};

