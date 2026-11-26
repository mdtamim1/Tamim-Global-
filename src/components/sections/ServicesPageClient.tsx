"use client";

// ============================================================
// Tamim Global — Dedicated /services Page Client
// 1:1 Replica of oxnod.webflow.io/service:
//   - Staircase bar entry curtain transition
//   - Minimal sticky topbar with Dark/Light switch
//   - Full-bleed Studio Services Hero
//   - Core Values sticky two-column showcase
//   - What I Build & Create (WhatIBuildSection)
//   - Dark 4-Step Process band ("From first thought to final form.")
//   - Footer
// ============================================================

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import WaterCursorEffect from "@/components/ui/WaterCursorEffect";
import WhatIBuildSection from "@/components/sections/WhatIBuildSection";
import NeoFooter from "@/components/layout/NeoFooter";

interface CoreValueItem {
  num: string;
  tag: string;
  title: string;
  description: string;
}

interface ProcessStepItem {
  step: string;
  phase: string;
  title: string;
  description: string;
  deliverable: string;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    num: "01",
    tag: "PRECISION ENGINEERING",
    title: "Code With Mathematical Precision",
    description:
      "Every interface, shader, and API contract is engineered from first principles — targeting 60fps fluidity, instant navigation, and clean maintainable TypeScript.",
  },
  {
    num: "02",
    tag: "CONVERSION & MOTION",
    title: "Design For Emotion & Conversion",
    description:
      "Editorial typography paired with purpose-built GSAP & WebGL motion gives products authority in the first 3 seconds without sacrificing clarity.",
  },
  {
    num: "03",
    tag: "CINEMA & SONIC CRAFT",
    title: "Sound & Cinema Craft",
    description:
      "From ACES color grading and narrative pacing to bespoke ambient scores and sound design, visual frames and frequency balance move together.",
  },
];

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    step: "STEP 01",
    phase: "DISCOVER",
    title: "Discover & Architect",
    description:
      "Deep product audit, visual direction benchmarks, system architecture, and clear milestone scoping before writing the first line of code or frame cut.",
    deliverable: "Blueprint & Prototype Spec",
  },
  {
    step: "STEP 02",
    phase: "DIRECTION",
    title: "Direction & Design",
    description:
      "Typography pairing, interactive WebGL/GSAP motion language, UI design systems, and lookbook treatment tailored to your category.",
    deliverable: "Design System & Motion Kit",
  },
  {
    step: "STEP 03",
    phase: "BUILD",
    title: "Engineering & Edit",
    description:
      "Full-stack Next.js & TypeScript implementation, 4K narrative assembly with DaVinci color pipelines, and spatial studio sound mastering.",
    deliverable: "Production Staging & Cut",
  },
  {
    step: "STEP 04",
    phase: "SHIP",
    title: "Launch & Master",
    description:
      "100/100 Lighthouse verification, edge deployment, cinema/audio final masters, documentation handoff, and post-launch refinement.",
    deliverable: "Live Launch & Final Masters",
  },
];

function ServicesPageInner() {
  const { isDark, toggleTheme } = useTheme();
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainRemoved, setCurtainRemoved] = useState(false);

  useEffect(() => {
    const tOpen = window.setTimeout(() => setCurtainOpen(true), 70);
    const tDone = window.setTimeout(() => setCurtainRemoved(true), 1050);
    return () => {
      window.clearTimeout(tOpen);
      window.clearTimeout(tDone);
    };
  }, []);

  const surfaceBg = isDark ? "#000000" : "#f4f4f0";
  const cardBg = isDark ? "#0e0e11" : "#ffffff";
  const borderCol = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";

  return (
    <div
      className="relative min-h-screen w-full transition-colors duration-500"
      style={{
        backgroundColor: surfaceBg,
        color: isDark ? "#ffffff" : "#0a0a0a",
      }}
    >
      <WaterCursorEffect />

      {/* Staircase vertical bar reveal transition matching oxnod.webflow.io/service */}
      {!curtainRemoved && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[120] pointer-events-none flex"
        >
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="flex-1 h-full border-t-[3px] border-[#f84022]"
              style={{
                backgroundColor: isDark ? "#0b0b0e" : "#ffffff",
                transform: curtainOpen
                  ? "translate3d(0, -105%, 0)"
                  : "translate3d(0, 0%, 0)",
                transition: `transform 720ms cubic-bezier(0.77, 0, 0.175, 1) ${
                  idx * 65
                }ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* Minimal Top Navigation Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-300"
        style={{
          backgroundColor: isDark
            ? "rgba(8, 8, 10, 0.82)"
            : "rgba(244, 244, 240, 0.85)",
          borderColor: borderCol,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-[13px] font-mono tracking-[0.14em] uppercase"
            style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
          >
            <span
              className="w-8 h-8 rounded-[6px] border flex items-center justify-center font-semibold text-[12px]"
              style={{
                borderColor: borderCol,
                backgroundColor: isDark ? "#141418" : "#ffffff",
                color: isDark ? "#ffffff" : "#0a0a0a",
              }}
            >
              TG
            </span>
            <span>TAMIM GLOBAL</span>
          </Link>

          <div
            role="navigation"
            aria-label="Services navigation"
            className="oxnod-sp-nav text-[12px] font-mono uppercase tracking-[0.12em]"
          >
            <Link
              href="/"
              className="opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
            >
              Home
            </Link>
            <a
              href="#core-values"
              className="opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
            >
              Values
            </a>
            <a
              href="#what-i-build"
              className="opacity-100 text-[#f84022]"
            >
              Services
            </a>
            <a
              href="#process"
              className="opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
            >
              Process
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Darkmode / Lightmode Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={!isDark}
              aria-label="Toggle color theme"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                toggleTheme({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                });
              }}
              className="flex items-center rounded-full p-[3px] border text-[11px] font-mono tracking-tight transition-colors cursor-pointer"
              style={{
                borderColor: borderCol,
                backgroundColor: isDark ? "#111114" : "#ffffff",
              }}
            >
              <span
                className="px-2.5 py-1 rounded-full transition-colors"
                style={{
                  backgroundColor: isDark ? "#ffffff" : "transparent",
                  color: isDark ? "#000000" : "#666666",
                }}
              >
                darkmode
              </span>
              <span
                className="px-2.5 py-1 rounded-full transition-colors"
                style={{
                  backgroundColor: !isDark ? "#0a0a0a" : "transparent",
                  color: !isDark ? "#ffffff" : "#888888",
                }}
              >
                lightmode
              </span>
            </button>

            <Link
              href="/#contact"
              className="px-4 py-2 rounded-[4px] bg-[#f84022] text-[11px] font-mono uppercase tracking-[0.12em] font-medium transition-transform hover:scale-[1.02]"
              style={{ color: "#ffffff" }}
            >
              Book Call
            </Link>
          </div>
        </div>
      </header>

      {/* 1. Full-bleed Studio Services Hero */}
      <section className="relative min-h-[78svh] pt-[120px] pb-16 px-5 md:px-10 flex items-end overflow-hidden bg-[#09090b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/services/service-1.jpg"
          alt="Full-Stack Engineering & Digital Studio"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,6,8,0.68) 0%, rgba(6,6,8,0.45) 45%, rgba(6,6,8,0.95) 100%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-2 h-2 rounded-full bg-[#f84022]"
              aria-hidden="true"
            />
            <span
              className="text-[12px] font-mono uppercase tracking-[0.18em]"
              style={{ color: "#d4d4d8" }}
            >
              OUR SERVICES &bull; TAMIM GLOBAL
            </span>
          </div>

          <h1
            className="oxnod-sp-hero-title max-w-[980px] mb-6"
            style={{ color: "#ffffff" }}
          >
            Everything your brand needs to build, ship &amp; sound unforgettable.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p
              className="text-[16px] md:text-[18px] leading-[1.6] max-w-[540px]"
              style={{ color: "#a1a1aa" }}
            >
              End-to-end execution across interactive web engineering, editorial
              UI/UX systems, cinema-grade video post-production, and original
              music scores.
            </p>

            <a
              href="#process"
              className="oxnod-sp-btn self-start md:self-auto"
              style={{ color: "#ffffff" }}
            >
              <span className="oxnod-sp-btn-label">EXPLORE OUR PROCESS</span>
              <span className="oxnod-sp-btn-arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{
                    width: 14,
                    height: 14,
                    flexShrink: 0,
                    display: "block",
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M7 2.5V11.5M7 11.5L11 7.5M7 11.5L3 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Core Values Section matching video 00:55-00:56 */}
      <section
        id="core-values"
        className="w-full py-20 lg:py-28 px-5 md:px-10 border-t"
        style={{
          backgroundColor: isDark ? "#060608" : "#f2f2f2",
          borderColor: borderCol,
        }}
      >
        <div className="max-w-[1440px] mx-auto oxnod-sp-values-grid">
          <div className="lg:sticky lg:top-[104px]">
            <p className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#f84022] mb-3">
              01 // CORE PHILOSOPHY
            </p>
            <h2
              className="oxnod-sp-section-heading mb-4"
              style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
            >
              What I believe shapes what I create.
            </h2>
            <p
              className="text-[15px] leading-[1.65] max-w-[420px]"
              style={{ color: isDark ? "#a1a1aa" : "#555555" }}
            >
              Every engagement follows one integrated studio discipline —
              uniting fast engineering, deliberate motion, and narrative audio
              with zero handoff friction.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {CORE_VALUES.map((item) => (
              <article
                key={item.num}
                className="rounded-[10px] border p-6 md:p-8 transition-colors"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderCol,
                }}
              >
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="text-[12px] font-mono text-[#f84022] tracking-[0.14em]">
                    {item.num}
                  </span>
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.14em]"
                    style={{ color: isDark ? "#8e8e93" : "#717171" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3
                  className="oxnod-sp-card-title mb-2.5"
                  style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.6]"
                  style={{ color: isDark ? "#a1a1aa" : "#555555" }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Full Oxnod Services Zig-Zag Showcase matching video 00:57-00:59 */}
      <div className="oxnod-services-page-embed">
        <WhatIBuildSection />
      </div>

      {/* 4. High-Contrast Dark Process Section matching video 01:00-01:01 */}
      <section
        id="process"
        className="w-full py-20 lg:py-28 px-5 md:px-10 border-t"
        style={{
          backgroundColor: "#0b0b0d",
          borderColor: "rgba(255,255,255,0.08)",
          color: "#ffffff",
        }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-[#f84022] mb-3">
                OUR PROCESS
              </p>
              <h2
                className="oxnod-sp-section-heading max-w-[640px]"
                style={{ color: "#ffffff" }}
              >
                From first thought to final form.
              </h2>
            </div>

            <p
              className="text-[15px] leading-[1.6] max-w-[400px]"
              style={{ color: "#a1a1aa" }}
            >
              A disciplined four-stage studio pipeline engineered to take
              ambitious brands from early concept to live category leadership.
            </p>
          </div>

          <div className="oxnod-sp-process-grid">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-[10px] border p-6 flex flex-col justify-between min-h-[290px]"
                style={{
                  backgroundColor: "#131317",
                  borderColor: "rgba(255,255,255,0.09)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono text-[#f84022] tracking-[0.16em]">
                      {item.step}
                    </span>
                    <span
                      className="text-[10px] font-mono tracking-[0.14em] px-2 py-0.5 rounded-[3px] border"
                      style={{
                        borderColor: "rgba(255,255,255,0.12)",
                        color: "#a1a1aa",
                      }}
                    >
                      {item.phase}
                    </span>
                  </div>

                  <h3
                    className="oxnod-sp-card-title mb-3"
                    style={{ color: "#ffffff" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.6]"
                    style={{ color: "#a1a1aa" }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className="pt-4 mt-6 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.08em]"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "#e4e4e7",
                  }}
                >
                  <span>OUTPUT</span>
                  <span className="text-[#f84022]">{item.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-[20px] font-medium mb-1"
                style={{ color: "#ffffff" }}
              >
                Ready to initiate a flagship project?
              </p>
              <p className="text-[14px]" style={{ color: "#8e8e93" }}>
                Direct founder collaboration from initial sketch to production
                release.
              </p>
            </div>

            <Link
              href="/#contact"
              className="oxnod-sp-btn"
              style={{ color: "#ffffff" }}
            >
              <span className="oxnod-sp-btn-label">START A PROJECT</span>
              <span className="oxnod-sp-btn-arrow">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{
                    width: 14,
                    height: 14,
                    flexShrink: 0,
                    display: "block",
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M3 11L11 3M11 3H4.5M11 3V9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <NeoFooter />
    </div>
  );
}

export default function ServicesPageClient() {
  return (
    <ThemeProvider>
      <ServicesPageInner />
    </ThemeProvider>
  );
}
