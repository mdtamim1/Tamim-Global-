"use client";

// ============================================================
// Tamim Global - Global Theme Context
// Provides dark/light mode toggle with circular radial
// View Transition wipe originating from the toggle button.
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

export interface ThemeOrigin {
  x: number;
  y: number;
}

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: (origin?: ThemeOrigin) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  isDark: true,
  toggleTheme: () => {},
});

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const themeRef = useRef<Theme>("dark");

  const applyTheme = useCallback((t: Theme) => {
    themeRef.current = t;
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#ffffff";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      document.body.style.backgroundColor = "#f4f4f0";
      document.body.style.color = "#0a0a0a";
    }
    window.dispatchEvent(
      new CustomEvent("tg:theme-sync", { detail: { theme: t } }),
    );
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem("tg-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    applyTheme(stored);
  }, [applyTheme]);

  const toggleTheme = useCallback(
    (origin?: ThemeOrigin) => {
      const next: Theme = themeRef.current === "dark" ? "light" : "dark";
      localStorage.setItem("tg-theme", next);

      const doc = document as ViewTransitionDoc;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!doc.startViewTransition || reduceMotion) {
        setTheme(next);
        applyTheme(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 36;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      document.documentElement.classList.add("tg-vt-active");

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
          applyTheme(next);
        });
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 720,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {});

      transition.finished.finally(() => {
        document.documentElement.classList.remove("tg-vt-active");
      });
    },
    [applyTheme],
  );

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "dark", toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
