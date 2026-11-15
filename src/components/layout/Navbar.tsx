"use client";

// ============================================================
// Tamim Global — Floating Island Navigation Bar
// Exact match to awmedia.marketing's liquid glass island pill
// ============================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

const NAV_LINKS = [
  { href: "/#technology", label: "Technology" },
  { href: "/#products", label: "Products" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#features", label: "Key Features" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-5xl glass rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between gap-4 shadow-2xl transition-all duration-300 ${
            scrolled ? "bg-black/90 border-white/20" : ""
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Tamim Global Home"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform group-hover:scale-105">
              <Image
                src="/images/tg-mark.jpg"
                alt="Tamim Global Mark"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <span className="font-semibold text-sm md:text-base tracking-tight text-white group-hover:text-white/80 transition-colors">
              Tamim Global
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/70">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Live Availability Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available</span>
            </div>

            {/* Shimmer Solid CTA */}
            <button
              onClick={() => setEnquiryOpen(true)}
              className="btn btn-solid btn-sm text-xs font-bold"
            >
              <span>Book a Call</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8 pt-20 pb-12"
          >
            <div className="space-y-4 max-w-sm mx-auto w-full text-center">
              <div className="chip mx-auto mb-6">
                <span className="dot"></span>
                <span>Available for Q1 / Q2 Projects</span>
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-2xl font-bold text-white hover:text-white/70 py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-6">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setEnquiryOpen(true);
                  }}
                  className="btn btn-solid w-full py-4 text-base font-bold"
                >
                  <span>Start a Project</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}
