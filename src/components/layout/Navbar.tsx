"use client";

// ============================================================
// Tamim Global — Floating Cyber Pill Dock Navbar
// Ultra-futuristic luxury capsule dock with live status beacon.
// ============================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#work",     label: "Work",     badge: "01" },
  { href: "/#services", label: "Services", badge: "02" },
  { href: "/#process",  label: "Process",  badge: "03" },
  { href: "/#about",    label: "About",    badge: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-3 md:gap-8 px-4 md:px-6 py-2.5 rounded-full transition-all duration-500",
            scrolled
              ? "hud-dock shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(124,58,237,0.25)]"
              : "bg-base-950/70 border border-white/10 backdrop-blur-xl shadow-2xl"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Tamim Global — Home"
          >
            {/* Glowing holographic brand mark */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 via-violet-500 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]">
              <div className="w-full h-full rounded-full bg-base-950 flex items-center justify-center">
                <span className="font-display font-black text-xs tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-300">
                  TG
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-violet-200 transition-colors">
                Tamim Global
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet-400">
                Digital Architect
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.05]">
            {NAV_LINKS.map((link, idx) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-4 py-1.5 text-xs font-medium text-ink-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 font-mono text-[10px] text-violet-400/80">
                    {link.badge}
                  </span>
                  <span className="relative z-10 tracking-wide font-sans">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Area: Status beacon + CTA */}
          <div className="flex items-center gap-3">
            {/* Live radar availability beacon */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
              <span className="radar-beacon">
                <span />
                <span />
              </span>
              <span>OPEN FOR WORK</span>
            </div>

            {/* Futuristic CTA button */}
            <Link
              href="/#contact"
              className="btn-shimmer inline-flex items-center gap-1.5 px-4 md:px-5 py-2 rounded-full text-xs font-semibold text-white tracking-wide shadow-lg group"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full glass text-white hover:text-violet-300 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-3xl glass-card border border-white/15 shadow-2xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs text-violet-400">NAVIGATION // SYSTEM</span>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <span className="radar-beacon"><span /><span /></span>
                ONLINE
              </div>
            </div>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-white font-display text-lg"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-violet-400">{link.badge}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-shimmer text-center py-3 rounded-xl text-sm font-semibold text-white mt-2"
            >
              Initiate Project →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
