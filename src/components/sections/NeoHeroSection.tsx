"use client";

// ============================================================
// Tamim Global — Mowa Studio 1:1 Architectural Hero Section
// Complete authentic replication of https://mowa.studio/:
//   - Sculpted 3D Cross Manifolds & 5-Lobe Rosette Hub +
//     unified WebGL Ping-Pong Fluid Refraction & Chromatic Ripple
//   - Native circular View Transition wipe originating from the
//     clicked Darkmode / Lightmode toggle pill
//   - Theme-adaptive header, 6-col architectural grid, 5-col
//     mid-grid skills + TA/MiM centerpiece, 4 KPI bento cards,
//     manifesto & floating action dock
// ============================================================

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import WaterCanvas from "@/components/ui/WaterCanvas";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";
import { useTheme } from "@/context/ThemeContext";

const METRICS = [
  { value: "100+", label: "Identities" },
  { value: "50+", label: "Websites" },
  { value: "4M+", label: "Video Views" },
  { value: "8Y", label: "Experience" },
];

export default function NeoHeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (soundPlaying) {
      audioRef.current.pause();
      setSoundPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setSoundPlaying(true))
        .catch(() => {});
    }
  };

  const fgPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const fgMuted = isDark ? "rgba(255,255,255,0.62)" : "rgba(10,10,10,0.6)";
  const outlineBorder = isDark
    ? "rgba(255,255,255,0.38)"
    : "rgba(10,10,10,0.28)";

  return (
    <>
      {/* Hidden Ambient Audio Player */}
      <audio ref={audioRef} src="/audio/bg.mp3" loop preload="none" />

      {/* Fixed Header / Top Navigation (1:1 Mowa Studio Header) */}
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-5 md:px-10 py-5 md:py-6 font-sans pointer-events-auto ${
          scrolled
            ? isDark
              ? "bg-black/75 backdrop-blur-xl border-b border-white/[0.06]"
              : "mowa-nav-scrolled border-b border-black/[0.08]"
            : "bg-transparent"
        }`}
        style={{
          backgroundColor: scrolled
            ? undefined
            : "transparent",
        }}
      >
        {/* Left: Minimalist Geometric TG Monogram */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          aria-label="Tamim Global Home"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 36 36"
            fill="none"
            style={{ width: 32, height: 32, flexShrink: 0, display: "block" }}
            aria-hidden="true"
          >
            {/* Geometric architectural T + G emblem matching Mowa minimal mark */}
            <path
              d="M4 7H22V11.2H15.1V29H10.9V11.2H4V7Z"
              fill={fgPrimary}
            />
            <path
              d="M27.5 14.5C23.8 14.5 21 17.3 21 21C21 24.7 23.8 27.5 27.5 27.5C30.4 27.5 32.5 25.8 33 23.2H27.2V19.6H36V21.5C36 26.8 32.5 30.8 27.4 30.8C21.6 30.8 17.2 26.5 17.2 21C17.2 15.5 21.6 11.2 27.4 11.2C30.8 11.2 33.7 12.7 35.4 15.2L31.9 17.4C30.9 15.6 29.4 14.5 27.5 14.5Z"
              fill={fgPrimary}
            />
          </svg>
          <span
            className="mowa-brand-label font-medium text-sm tracking-tight"
            style={{ color: fgPrimary }}
          >
            tamim.global
          </span>
        </Link>

        {/* Center: Segmented Darkmode / Lightmode Pill Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={!isDark}
          aria-label="Toggle darkmode and lightmode"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            toggleTheme({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex rounded-full p-1 backdrop-blur-2xl border select-none cursor-pointer"
          style={{
            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.07)",
            borderColor: isDark
              ? "rgba(255,255,255,0.14)"
              : "rgba(0,0,0,0.14)",
          }}
        >
          <div className="relative flex items-center">
            {/* Sliding active pill */}
            <div
              className="absolute top-0 bottom-0 w-1/2 rounded-full shadow-sm transition-all duration-300"
              style={{
                left: isDark ? "0%" : "50%",
                backgroundColor: isDark ? "#ffffff" : "#0a0a0a",
              }}
            />
            <span
              className="relative z-10 px-4 md:px-5 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide"
              style={{
                color: isDark ? "#000000" : "rgba(10,10,10,0.58)",
              }}
            >
              darkmode
            </span>
            <span
              className="relative z-10 px-4 md:px-5 py-1.5 text-[11px] md:text-xs tracking-wide"
              style={{
                color: !isDark ? "#ffffff" : "rgba(255,255,255,0.58)",
                fontWeight: !isDark ? 600 : 400,
              }}
            >
              lightmode
            </span>
          </div>
        </button>

        {/* Right Actions: Sound / WhatsApp / Outline get in touch / Menu */}
        <div className="flex items-center gap-2.5 relative">
          {/* Sound Toggle Pill */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle ambient soundscape"
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-xl cursor-pointer"
            style={{
              borderColor: outlineBorder,
              backgroundColor: soundPlaying ? fgPrimary : "transparent",
              color: soundPlaying
                ? isDark
                  ? "#000000"
                  : "#ffffff"
                : fgPrimary,
            }}
          >
            {soundPlaying ? (
              <div className="flex items-end gap-[2px] h-3.5">
                <span className="w-0.5 h-3 bg-current animate-[pulse_0.6s_infinite]" />
                <span className="w-0.5 h-3.5 bg-current animate-[pulse_0.8s_infinite]" />
                <span className="w-0.5 h-2 bg-current animate-[pulse_0.5s_infinite]" />
                <span className="w-0.5 h-3 bg-current animate-[pulse_0.7s_infinite]" />
              </div>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: 16,
                  height: 16,
                  flexShrink: 0,
                  display: "block",
                }}
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* WhatsApp / Message Quick Action Pill */}
          <a
            href="https://wa.me/8801833075574"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on WhatsApp"
            className="w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-xl transition-all duration-300"
            style={{ borderColor: outlineBorder, color: fgPrimary }}
          >
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: 17,
                height: 17,
                flexShrink: 0,
                display: "block",
              }}
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </a>

          {/* Outline "get in touch" Pill (mowa-desktop-inline bypasses unlayered .hidden) */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mowa-desktop-inline items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-normal backdrop-blur-xl transition-all duration-300 cursor-pointer"
            style={{ borderColor: fgPrimary, color: fgPrimary }}
          >
            get in touch
          </button>

          {/* "Menu" Pill with Diagonal Arrow Badge */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            className="inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full text-[13px] backdrop-blur-2xl transition-all duration-300 shadow-sm cursor-pointer"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(10,10,10,0.08)",
              color: fgPrimary,
            }}
          >
            <span>Menu</span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.16)"
                  : "rgba(10,10,10,0.10)",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 203 203"
                fill="none"
                style={{ width: 10, height: 10, flexShrink: 0, display: "block" }}
              >
                <path
                  d="M184.391 0H6.133C2.743 0 0 2.743 0 6.133V12.495C0 15.885 2.743 18.628 6.133 18.628H157.174C162.621 18.628 165.364 25.218 161.497 29.084L5.333 185.229C2.933 187.629 2.933 191.496 5.333 193.896L9.847 198.41C12.247 200.81 16.114 200.81 18.513 198.41L173.935 42.969C177.801 39.103 184.391 41.846 184.391 47.293V196.886C184.391 200.276 187.134 203.019 190.524 203.019H196.886C200.276 203.019 203.019 200.276 203.019 196.886V6.133C203.019 2.743 200.276 0 196.886 0H184.391Z"
                  fill={fgPrimary}
                />
              </svg>
            </div>
          </button>

          {/* Menu Dropdown */}
          {menuOpen && (
            <div
              className="absolute top-[calc(100%+10px)] right-0 min-w-[230px] p-2 rounded-2xl backdrop-blur-2xl border shadow-2xl flex flex-col gap-1 z-50"
              style={{
                backgroundColor: isDark
                  ? "rgba(20,20,24,0.92)"
                  : "rgba(255,255,255,0.94)",
                borderColor: isDark
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.12)",
                color: fgPrimary,
              }}
            >
              {[
                { label: "Services & Craft", href: "/services" },
                { label: "Web Design & Craft", href: "#what-i-build" },
                { label: "Full-Stack Architecture", href: "#expertise" },
                { label: "Video & Motion Lab", href: "#technology" },
                { label: "Why Choose Me", href: "#why-choose-me" },
                { label: "Collaborative Studio", href: "#team" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm transition-opacity hover:opacity-75 flex items-center justify-between"
                  style={{ color: fgPrimary }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: fgMuted }}>↗</span>
                </a>
              ))}
              <div
                className="h-px my-1"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between text-left cursor-pointer"
                style={{
                  backgroundColor: "#002BFF",
                  color: "#ffffff",
                }}
              >
                <span>Start a Project</span>
                <span>↗</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Hero Container */}
      <section
        id="hero"
        className="relative w-full min-h-[100dvh] font-sans overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: isDark ? "#000000" : "#f4f4f0",
          color: fgPrimary,
        }}
      >
        {/* 1. Real 3D Ocean Water Surface — Gerstner waves + caustics + cursor ripples */}
        <WaterCanvas />

        {/* 2. Vertical Architectural Column Guide Lines (6 Columns on Desktop) */}
        <div
          aria-hidden="true"
          className="mowa-grid-cols absolute inset-0 pointer-events-none z-[2]"
        >
          <div
            className="border-r h-full"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.055)",
            }}
          />
          <div
            className="border-r h-full"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.055)",
            }}
          />
          <div
            className="mowa-grid-col-md border-r h-full"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.055)",
            }}
          />
          <div
            className="mowa-grid-col-md border-r h-full"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.055)",
            }}
          />
          <div
            className="mowa-grid-col-lg border-r h-full"
            style={{
              borderColor: isDark
                ? "rgba(255,255,255,0.045)"
                : "rgba(0,0,0,0.055)",
            }}
          />
          <div className="mowa-grid-col-lg h-full" />
        </div>

        {/* 3. Mid-Level 5-Column Alignment Grid (Centerpiece) */}
        <div className="relative z-10 w-full px-5 md:px-10 lg:px-12 pt-[clamp(110px,18vh,220px)] pb-[clamp(30px,5vh,60px)]">
          <div className="grid grid-cols-12 items-center gap-4 lg:gap-6">
            {/* Col 1: Far Left Skills */}
            <div
              className="col-span-6 sm:col-span-3 lg:col-span-2 flex flex-col gap-1 text-[11px] sm:text-xs lg:text-[13px] leading-tight font-sans tracking-wide"
              style={{ color: fgPrimary }}
            >
              <div>code</div>
              <div>architecture</div>
              <div>full-stack</div>
            </div>

            {/* Col 2: Left Inner Skills */}
            <div
              className="col-span-6 sm:col-span-3 lg:col-span-2 lg:pl-6 flex flex-col gap-1 text-[11px] sm:text-xs lg:text-[13px] leading-tight font-sans tracking-wide"
              style={{ color: fgPrimary }}
            >
              <div>web design</div>
              <div>ui/ux craft</div>
              <div>next.js 16</div>
            </div>

            {/* Col 3: Center — ghost TG monogram */}
            <div className="col-span-12 lg:col-span-4 flex items-center justify-center my-4 lg:my-0">
              <div
                style={{
                  fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                  fontSize: "clamp(60px, 10vw, 120px)",
                  fontWeight: 900,
                  letterSpacing: "-4px",
                  color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  pointerEvents: "none",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                TG
              </div>
            </div>

            {/* Col 4: Right Inner Skills */}
            <div
              className="col-span-6 sm:col-span-3 lg:col-span-2 lg:text-right flex flex-col gap-1 text-[11px] sm:text-xs lg:text-[13px] leading-tight font-sans tracking-wide"
              style={{ color: fgPrimary }}
            >
              <div>video editor</div>
              <div>color grade</div>
              <div>cinema 4k</div>
            </div>

            {/* Col 5: Far Right Skills + Outline Button */}
            <div
              className="col-span-6 sm:col-span-3 lg:col-span-2 flex flex-col items-start lg:items-end gap-3.5 text-[11px] sm:text-xs lg:text-[13px] leading-tight font-sans tracking-wide"
              style={{ color: fgPrimary }}
            >
              <div className="flex flex-col gap-1 lg:text-right">
                <div>music score</div>
                <div>sound design</div>
                <div>audio master</div>
              </div>

              <a
                href="#what-i-build"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[12px] sm:text-[13px] font-normal backdrop-blur-xl transition-all duration-300 shadow-sm"
                style={{ borderColor: outlineBorder, color: fgPrimary }}
              >
                <span>view projects</span>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 203 203"
                  fill="none"
                  style={{ width: 8, height: 8, flexShrink: 0, display: "block" }}
                >
                  <path
                    d="M184.391 0H6.133C2.743 0 0 2.743 0 6.133V12.495C0 15.885 2.743 18.628 6.133 18.628H157.174C162.621 18.628 165.364 25.218 161.497 29.084L5.333 185.229C2.933 187.629 2.933 191.496 5.333 193.896L9.847 198.41C12.247 200.81 16.114 200.81 18.513 198.41L173.935 42.969C177.801 39.103 184.391 41.846 184.391 47.293V196.886C184.391 200.276 187.134 203.019 190.524 203.019H196.886C200.276 203.019 203.019 200.276 203.019 196.886V6.133C203.019 2.743 200.276 0 196.886 0H184.391Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 4. Bottom Area (1:1 Mowa Studio KPI Bento Cards + Manifesto + Action Dock) */}
        <div className="relative z-10 w-full px-5 md:px-10 lg:px-12 pb-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Column: 4 Frosted KPI Cards + Manifesto + Dock Pills */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="aspect-square w-[72px] sm:w-[84px] md:w-[92px] rounded-[18px] border backdrop-blur-xl flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1 cursor-default shadow-lg"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.075)"
                        : "rgba(255,255,255,0.85)",
                      borderColor: isDark
                        ? "rgba(255,255,255,0.11)"
                        : "rgba(0,0,0,0.09)",
                    }}
                  >
                    <span
                      className="text-[20px] sm:text-[24px] md:text-[26px] font-normal leading-none"
                      style={{ color: fgPrimary }}
                    >
                      {m.value}
                    </span>
                    <span
                      className="text-[10px] sm:text-[11px] mt-1 tracking-wider whitespace-nowrap"
                      style={{ color: fgMuted }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Manifesto Heading Text — name on ONE LINE */}
              <h1
                className="text-[13px] sm:text-[15px] md:text-[17px] font-normal leading-relaxed max-w-[620px] mt-1"
                style={{ color: isDark ? "rgba(255,255,255,0.92)" : "#0a0a0a" }}
              >
                &nbsp;&nbsp;&nbsp;I engineer bespoke digital flagships, cinematic
                video narratives, and original soundscapes for ambitious brands
                worldwide: code with mathematical precision, motion with rhythm,
                and experiences engineered to lead.
              </h1>

              {/* NAME — one line, prominent */}
              <div className="mt-4">
                <div
                  style={{
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                    fontSize: "clamp(28px, 4.5vw, 56px)",
                    fontWeight: 900,
                    letterSpacing: "-2px",
                    lineHeight: 1,
                    color: isDark ? "#ffffff" : "#0a0a0a",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  Md Tamim Islam
                </div>
              </div>

              {/* "more about me" link */}
              <div>
                <a
                  href="#what-i-build"
                  className="text-sm underline underline-offset-4 transition-opacity hover:opacity-75"
                  style={{ color: fgMuted }}
                >
                  more about me
                </a>
              </div>

              {/* Interactive Floating Action Dock */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-3">
                {/* Pill 1: [NEW] Full-Stack Edge */}
                <a
                  href="#expertise"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border text-[12px] sm:text-[13px] backdrop-blur-xl transition-all duration-300"
                  style={{ borderColor: outlineBorder, color: fgPrimary }}
                >
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider"
                    style={{ backgroundColor: "#002BFF", color: "#ffffff" }}
                  >
                    NEW
                  </span>
                  <span>Full-Stack Edge</span>
                  <span style={{ color: fgMuted }}>↗</span>
                </a>

                {/* Pill 2: FAQ */}
                <a
                  href="#technology"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border text-[12px] sm:text-[13px] backdrop-blur-xl transition-all duration-300"
                  style={{ borderColor: outlineBorder, color: fgPrimary }}
                >
                  <span>FAQ</span>
                  <span style={{ color: fgMuted }}>↗</span>
                </a>

                {/* Pill 3: Reviews */}
                <a
                  href="#team"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border text-[12px] sm:text-[13px] backdrop-blur-xl transition-all duration-300"
                  style={{ borderColor: outlineBorder, color: fgPrimary }}
                >
                  <span>reviews</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="#f59e0b"
                    style={{
                      width: 12,
                      height: 12,
                      flexShrink: 0,
                      display: "block",
                    }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </a>

                {/* Pill 4: Royal Blue "get in touch" Pill */}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  style={{ backgroundColor: "#002BFF", color: "#ffffff" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] sm:text-[13px] font-medium shadow-[0_4px_20px_rgba(0,43,255,0.4)] hover:shadow-[0_4px_28px_rgba(0,43,255,0.65)] transition-all duration-300 cursor-pointer"
                >
                  <span>get in touch</span>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 203 203"
                    fill="none"
                    style={{
                      width: 8,
                      height: 8,
                      flexShrink: 0,
                      display: "block",
                    }}
                  >
                    <path
                      d="M184.391 0H6.133C2.743 0 0 2.743 0 6.133V12.495C0 15.885 2.743 18.628 6.133 18.628H157.174C162.621 18.628 165.364 25.218 161.497 29.084L5.333 185.229C2.933 187.629 2.933 191.496 5.333 193.896L9.847 198.41C12.247 200.81 16.114 200.81 18.513 198.41L173.935 42.969C177.801 39.103 184.391 41.846 184.391 47.293V196.886C184.391 200.276 187.134 203.019 190.524 203.019H196.886C200.276 203.019 203.019 200.276 203.019 196.886V6.133C203.019 2.743 200.276 0 196.886 0H184.391Z"
                      fill="#fff"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Status & Location Tag */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-2">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-xl text-[11px] sm:text-xs"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(255,255,255,0.85)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.11)"
                    : "rgba(0,0,0,0.09)",
                  color: fgPrimary,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-wide">
                  AVAILABLE FOR GLOBAL COMMISSIONS
                </span>
              </div>
              <div
                className="text-[11px] tracking-wider"
                style={{ color: fgMuted }}
              >
                DHAKA &amp; WORLDWIDE &middot; UTC+6
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
