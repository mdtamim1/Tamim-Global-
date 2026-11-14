"use client";

// ============================================================
// Tamim Global — Navbar
// Transparent → glass on scroll, magnetic logo, mobile drawer.
// ============================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#work",     label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process",  label: "Process" },
  { href: "/#about",    label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-500 ease-expo-out",
          scrolled
            ? "py-3 glass border-b border-glass-border"
            : "py-6 bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative flex items-center gap-2"
            aria-label="Tamim Global — Home"
          >
            {/* Monogram mark */}
            <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center glow-sm transition-all duration-300 group-hover:glow-violet">
              <span className="text-white font-display font-bold text-sm leading-none">TL</span>
            </div>
            <span className="font-display font-semibold text-ink-50 text-sm tracking-tight hidden sm:block">
              Tamim Global
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-body-sm font-medium rounded-lg",
                    "text-ink-400 hover:text-ink-50",
                    "transition-colors duration-300",
                    "group"
                  )}
                >
                  {link.label}
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-expo-out origin-left" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className={cn(
                "hidden md:inline-flex items-center gap-2",
                "px-5 py-2.5 rounded-xl",
                "bg-violet-500 hover:bg-violet-400",
                "text-white text-body-sm font-semibold",
                "transition-all duration-300 ease-expo-out",
                "hover:shadow-glow-violet hover:-translate-y-0.5",
                "focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-base-900"
              )}
            >
              Start a Project
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg glass"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={cn(
                "w-5 h-px bg-ink-50 transition-all duration-300",
                menuOpen && "rotate-45 translate-y-[3.5px]"
              )} />
              <span className={cn(
                "w-5 h-px bg-ink-50 transition-all duration-300",
                menuOpen && "-rotate-45 -translate-y-[3.5px]"
              )} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-base-900/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-40 w-72 glass border-l border-glass-border flex flex-col pt-24 pb-10 px-8 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 text-display-md font-display font-semibold text-ink-50 hover:text-violet-400 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href="/#contact"
                  className="block w-full text-center px-5 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-semibold transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

