import type { Config } from "tailwindcss";

// ============================================================
// Tamim Global — Design Token System
// All visual values live here. Never hardcode elsewhere.
// ============================================================

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // --- Colour Palette ---
      colors: {
        // Base surfaces
        base: {
          950: "#020204",
          900: "#050507",
          800: "#0A0A0F",
          700: "#0F0F18",
          600: "#14141F",
        },
        // Off-white text
        ink: {
          50:  "#F8F8FC",
          100: "#EDEDF5",
          400: "#9494A8",
          500: "#7474A0",
          600: "#5A5A8A",
        },
        // Accent: Electric Violet
        violet: {
          900: "#1E0A3C",
          800: "#2D1157",
          700: "#4A1D8A",
          600: "#6624C4",
          500: "#7C3AED",
          400: "#9D61F5",
          300: "#BFA3FA",
          200: "#D8C8FD",
          100: "#EDE8FF",
        },
        // Glass surface
        glass: "rgba(255, 255, 255, 0.04)",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-top": "rgba(255, 255, 255, 0.14)",
      },

      // --- Typography ---
      fontFamily: {
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)",  "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",   "monospace"],
      },
      fontSize: {
        // Fluid type scale using clamp — responsive without breakpoints
        "display-2xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-xl":  ["clamp(2.25rem, 5vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg":  ["clamp(1.75rem, 3.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md":  ["clamp(1.375rem, 2.5vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "body-lg":     ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.65" }],
        "body-md":     ["1rem", { lineHeight: "1.65" }],
        "body-sm":     ["0.875rem", { lineHeight: "1.6" }],
        "label":       ["0.75rem", { lineHeight: "1", letterSpacing: "0.1em" }],
      },

      // --- Spacing ---
      spacing: {
        "section": "clamp(5rem, 10vw, 10rem)",
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      // --- Border Radius ---
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // --- Box Shadows ---
      boxShadow: {
        "glow-violet":  "0 0 40px rgba(124, 58, 237, 0.25)",
        "glow-sm":      "0 0 20px rgba(124, 58, 237, 0.15)",
        "glow-lg":      "0 0 80px rgba(124, 58, 237, 0.35)",
        "card":         "0 4px 24px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
        "card-hover":   "0 8px 48px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255,255,255,0.1) inset",
        "glass":        "0 2px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      // --- Background images / gradients ---
      backgroundImage: {
        "gradient-radial":    "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-violet":    "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
        "gradient-dark":      "linear-gradient(180deg, #050507 0%, #0A0A0F 100%)",
        "noise":              "url('/textures/noise.png')",
      },

      // --- Animation / Transition ---
      transitionTimingFunction: {
        "expo-out":  "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in":   "cubic-bezier(0.7, 0, 0.84, 0)",
        "expo-inout":"cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        "fast": "300ms",
        "base": "600ms",
        "slow": "900ms",
      },
      animation: {
        "pulse-slow":   "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":    "spin 8s linear infinite",
        "float":        "float 6s ease-in-out infinite",
        "glow-pulse":   "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%":       { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" },
        },
      },

      // --- Backdrop blur ---
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

