// ============================================================
// Tamim Global — 404 Not Found Page
// Premium, on-brand, with navigation options.
// ============================================================

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Tamim Global",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-900 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/8 blur-[120px] pointer-events-none"
      />

      <div className="relative text-center max-w-lg">
        {/* 404 display number */}
        <div
          className="font-display font-bold text-[clamp(6rem,20vw,12rem)] leading-none text-violet-500/10 select-none mb-4"
          aria-hidden
        >
          404
        </div>

        {/* Logo badge */}
        <div className="flex items-center justify-center gap-2 mb-8 -mt-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">TG</span>
          </div>
        </div>

        <h1 className="font-display text-display-xl text-ink-50 mb-4">
          Page not found.
        </h1>
        <p className="text-body-md text-ink-400 leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-semibold text-body-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet"
          >
            Go Home
          </Link>
          <Link
            href="/#work"
            className="px-6 py-3 rounded-xl glass border border-glass-border text-ink-50 font-semibold text-body-md hover:border-violet-500/40 transition-all duration-300"
          >
            View Work
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-xl glass border border-glass-border text-ink-50 font-semibold text-body-md hover:border-violet-500/40 transition-all duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

