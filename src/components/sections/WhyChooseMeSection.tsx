"use client";

// ============================================================
// Tamim Global — "Why Choose Me" Section
// 1:1 Faithful Replication of Oxnod Studio "Why Choose Us"
// (https://oxnod.webflow.io/)
//
// Fixes from visual audit:
//  • Scoped .oxnod-why-* / .oxnod-curtain-* classes (immune to legacy line-21)
//  • Explicit SVG inline width/height on infinity, award, stars, contour
//  • Compact Bento dashboard proportions fitting cleanly within 100vh
//  • True 50/50 side curtains opening cleanly Left (-100%) & Right (+100%)
// ============================================================

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLLAB_INITIALS = [
  { label: "NK", bg: "linear-gradient(135deg,#27272a,#18181b)" },
  { label: "SR", bg: "linear-gradient(135deg,#3f3f46,#18181b)" },
  { label: "AL", bg: "linear-gradient(135deg,#52525b,#27272a)" },
  { label: "MJ", bg: "linear-gradient(135deg,#3f3f46,#09090b)" },
  { label: "ZR", bg: "linear-gradient(135deg,#27272a,#09090b)" },
];

const STACK_LOGOS = [
  "NEXT.JS 16",
  "THREE.JS",
  "DAVINCI 4K",
  "ABLETON",
  "TYPESCRIPT",
  "GSAP 3.15",
];

export default function WhyChooseMeSection() {
  const { isDark } = useTheme();
  const wrapRef = useRef<HTMLElement | null>(null);
  const leftDoorRef = useRef<HTMLDivElement | null>(null);
  const rightDoorRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const leftDoor = leftDoorRef.current;
    const rightDoor = rightDoorRef.current;
    const content = contentRef.current;
    if (!wrap || !leftDoor || !rightDoor || !content) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Exact Oxnod 50/50 split door curtain scrub (t-b4e6f9b7)
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "10% top",
            end: "bottom 110%",
            scrub: 1,
          },
        });

        tl.fromTo(
          leftDoor,
          { xPercent: 0 },
          { xPercent: -100, ease: "none", duration: 1 },
          0,
        )
          .fromTo(
            rightDoor,
            { xPercent: 0 },
            { xPercent: 100, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            content,
            { opacity: 0 },
            { opacity: 1, ease: "none", duration: 0.7 },
            0.12,
          );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(content, { opacity: 1 });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const cardBg = isDark
    ? "bg-[#121212] border-white/[0.12] text-white"
    : "bg-white border-[#ececec] text-[#000000]";

  return (
    <section
      ref={wrapRef}
      id="why-choose-me"
      className={`oxnod-why-wrap transition-colors duration-500 ${
        isDark ? "bg-[#000000] text-white" : "bg-[#f2f2f2] text-[#000000]"
      }`}
      style={{ overflowX: "clip" }}
    >
      {/* Sticky Curtain Overlay Stage */}
      <div className="md:sticky md:top-0 md:min-h-[100vh] w-full flex flex-col justify-center">
        {/* Dual Split Image Curtains — 2-layer crossfade + slow zoom matching Oxnod IX3 */}
        <div className="oxnod-why-curtains">
          <div ref={leftDoorRef} className="oxnod-curtain-left bg-[#1a0d00]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/why/curtain-left.jpg"
              alt="Creative Direction Silhouette"
              className="oxnod-curtain-img-a"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/services/service-1.jpg"
              alt="Full-Stack Engineering Studio"
              className="oxnod-curtain-img-b"
            />
          </div>

          <div ref={rightDoorRef} className="oxnod-curtain-right bg-[#f4f1ee]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/why/curtain-right.png"
              alt="Translucent Vermilion Sculpture"
              className="oxnod-curtain-img-a"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/services/service-4.png"
              alt="Sonic & Visual Systems"
              className="oxnod-curtain-img-b"
            />
          </div>
        </div>

        {/* Sticky Bento Content Revealed Behind Doors */}
        <div
          ref={contentRef}
          className="relative w-full py-12 md:py-10 lg:py-12"
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10">
            {/* Top Header */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <div
                className={`flex items-center justify-between border-t pt-3 mb-5 lg:mb-6 ${
                  isDark ? "border-white/[0.14]" : "border-[#dcdcdc]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f84022"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      display: "block",
                    }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span
                    className="text-[13px] md:text-[14px] uppercase tracking-[-0.14px]"
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      color: isDark ? "rgba(255,255,255,0.9)" : "#252424",
                    }}
                  >
                    WHY CHOOSE ME
                  </span>
                </div>

                <span
                  className="text-[13px] md:text-[14px] uppercase tracking-[-0.14px]"
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: isDark ? "rgba(255,255,255,0.8)" : "#252424",
                  }}
                >
                  @TAMIMGLOBAL
                </span>
              </div>

              <div className="text-center max-w-[540px] mx-auto">
                <h2
                  className="font-medium text-[30px] leading-[1.15] md:text-[40px] md:leading-[46px] lg:text-[48px] lg:leading-[54px] tracking-[-0.96px]"
                  style={{
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                  }}
                >
                  The difference is how we work together
                </h2>
              </div>
            </div>

            {/* ── Top 3-Column Bento Grid ───────────────────────────── */}
            <div className="oxnod-why-grid-top">
              {/* Card 1: Live Collaboration + iPhone DM Mockup */}
              <div
                className={`relative rounded-[12px] border overflow-hidden p-5 flex flex-col justify-between h-[330px] lg:h-[345px] ${cardBg}`}
              >
                <div className="flex items-center justify-center gap-2 z-10">
                  <span className="font-medium text-[15px]">
                    Live collaboration
                  </span>
                  <span
                    className="rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: "#46ca83",
                      boxShadow: "0 0 8px #46ca83",
                    }}
                  />
                </div>

                <div
                  className="absolute inset-x-0 top-12 text-center font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 105,
                    color: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.035)",
                  }}
                >
                  24/7
                </div>

                <div
                  className={`relative mx-auto mt-3 w-[86%] max-w-[260px] rounded-t-[26px] border-[5px] border-b-0 pt-2.5 px-3 pb-4 -mb-5 shadow-xl ${
                    isDark
                      ? "bg-[#1a1a1d] border-[#2e2e34]"
                      : "bg-[#fafafa] border-[#18181b]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-semibold mb-2.5 opacity-80 px-1">
                    <span>9:41</span>
                    <div
                      className="rounded-full bg-black/80"
                      style={{ width: 44, height: 11 }}
                    />
                    <span>5G</span>
                  </div>
                  <div className="text-center text-[10px] opacity-40 mb-2.5">
                    Yesterday
                  </div>
                  <div className="flex flex-col gap-2 text-[11px] leading-[1.35]">
                    <div
                      className="self-end max-w-[84%] rounded-xl rounded-tr-sm px-3 py-2 shadow-sm"
                      style={{ backgroundColor: "#f84022", color: "#ffffff" }}
                    >
                      Hey! Love the design! Can we refine the hero motion?
                      <div
                        className="text-[9px] text-right mt-1"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        ✓✓ 03:15 PM
                      </div>
                    </div>
                    <div
                      className={`self-start max-w-[84%] rounded-xl rounded-tl-sm px-3 py-2 border ${
                        isDark
                          ? "bg-[#242429] border-white/10"
                          : "bg-white border-[#ececec]"
                      }`}
                      style={{ color: isDark ? "#f4f4f5" : "#18181b" }}
                    >
                      On it right now. Pushing updated 3D build in 20 min!
                      <div className="text-[9px] opacity-50 mt-1">
                        ✓✓ 03:16 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Distinctive Thinking + Inset Frame & 3D Contour Sculpture */}
              <div
                className={`relative rounded-[12px] border overflow-hidden p-5 h-[330px] lg:h-[345px] flex flex-col justify-between ${cardBg}`}
              >
                <div className="relative z-10 p-1">
                  <h3 className="text-[20px] leading-[28px] font-medium mb-1.5">
                    Distinctive Thinking
                  </h3>
                  <p
                    className="text-[14px] leading-[20px] max-w-[290px]"
                    style={{ color: isDark ? "#8e8e93" : "#717171" }}
                  >
                    Breaking conventions to engineer web flagships, cinema films
                    &amp; scores that stay unforgettable.
                  </p>
                </div>

                {/* Inset Glowing Sculpture Frame matching Oxnod video 00:24 */}
                <div
                  className="relative z-10 mt-2 flex-1 rounded-[10px] border overflow-hidden flex items-end justify-center"
                  style={{
                    borderColor: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.09)",
                    background: isDark
                      ? "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(248,64,34,0.09) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.015) 0%, rgba(248,64,34,0.08) 100%)",
                    boxShadow: isDark
                      ? "inset 0 -18px 28px -14px rgba(248,64,34,0.65), 0 0 0 1px rgba(248,64,34,0.18)"
                      : "inset 0 -16px 24px -14px rgba(248,64,34,0.52), 0 0 0 1px rgba(248,64,34,0.14)",
                  }}
                >
                  <svg
                    width="320"
                    height="170"
                    viewBox="0 0 320 170"
                    fill="none"
                    style={{ width: "100%", height: 170, flexShrink: 0, display: "block" }}
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="oxnodSculptGlow" x1="160" y1="20" x2="160" y2="170" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={isDark ? "#ffffff" : "#111111"} stopOpacity="0.22" />
                        <stop offset="72%" stopColor={isDark ? "#f84022" : "#f84022"} stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#f84022" stopOpacity="0.88" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const t = i / 23;
                      const y = 26 + i * 6;
                      // Sculpted head + shoulder silhouette modulation
                      const inHead = i >= 2 && i <= 14;
                      const headPhase = inHead ? Math.sin(((i - 2) / 12) * Math.PI) : 0;
                      const neckDip = i > 14 && i <= 17 ? 0.38 : 0;
                      const shoulders = i > 17 ? ((i - 17) / 6) * 0.95 : 0;
                      const bulge = (headPhase * 34 + shoulders * 48) * (1 - neckDip);
                      const halfSpan = 42 + headPhase * 36 + shoulders * 68;
                      const cx = 160 + (inHead ? Math.sin(t * 7) * 5 : 0);
                      const xL = Math.max(16, cx - halfSpan);
                      const xR = Math.min(304, cx + halfSpan);
                      return (
                        <path
                          key={i}
                          d={`M 16 ${y} C ${xL - 12} ${y}, ${cx - bulge * 0.7} ${
                            y - bulge * 0.36
                          }, ${cx} ${y - bulge * 0.42} C ${cx + bulge * 0.7} ${
                            y - bulge * 0.36
                          }, ${xR + 12} ${y}, 304 ${y}`}
                          stroke="url(#oxnodSculptGlow)"
                          strokeWidth={i > 18 ? "1.35" : "1.1"}
                          strokeOpacity={0.35 + (i / 24) * 0.55}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Bottom vermilion ambient perimeter glow */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 5%, #f84022 50%, transparent 95%)",
                    boxShadow: "0 -4px 18px rgba(248,64,34,0.65)",
                  }}
                />
              </div>

              {/* Card 3: Split Column (Ideas Built Around You + Always-On Partnership) */}
              <div className="oxnod-why-col-span-split flex flex-col gap-2 lg:h-[345px]">
                {/* Card 3A: Ideas Built Around You + Curved Backdrop & Right-Aligned Marquee Box */}
                <div
                  className={`relative rounded-[12px] border overflow-hidden pt-4 pb-0 flex flex-col justify-between min-h-[158px] ${cardBg}`}
                >
                  {/* Faint architectural curve backdrop SVG matching Oxnod video 00:24 */}
                  <svg
                    width="360"
                    height="120"
                    viewBox="0 0 360 120"
                    fill="none"
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      height: 120,
                      pointerEvents: "none",
                      display: "block",
                    }}
                    aria-hidden="true"
                  >
                    <path
                      d="M -10 112 C 60 44, 150 28, 260 66 C 310 82, 345 78, 372 48"
                      stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 10 120 C 90 76, 175 72, 275 104"
                      stroke={isDark ? "rgba(248,64,34,0.16)" : "rgba(248,64,34,0.18)"}
                      strokeWidth="1"
                    />
                  </svg>

                  <div className="relative z-10 flex items-center justify-between px-5 mb-4">
                    <span className="font-medium text-[15px]">
                      Ideas Built Around You..
                    </span>
                    <div className="flex items-center gap-[3px]">
                      {Array.from({ length: 10 }).map((_, d) => (
                        <span
                          key={d}
                          className="rounded-full"
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: "#f84022",
                            opacity: d < 5 ? 0.3 : 1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Inset right-aligned bordered marquee container matching Oxnod video 00:24 */}
                  <div
                    className="relative z-10 w-[230px] max-w-[82%] ml-auto rounded-tl-[10px] border-t border-l overflow-hidden py-2.5"
                    style={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.12)",
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.025)"
                        : "rgba(0,0,0,0.02)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10"
                      style={{
                        background: isDark
                          ? "linear-gradient(90deg,#121212,transparent)"
                          : "linear-gradient(90deg,#ffffff,transparent)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
                      style={{
                        background: isDark
                          ? "linear-gradient(270deg,#121212,transparent)"
                          : "linear-gradient(270deg,#ffffff,transparent)",
                      }}
                    />
                    <div className="oxnod-marquee-track gap-2 px-2">
                      {[
                        ...COLLAB_INITIALS,
                        ...COLLAB_INITIALS,
                        ...COLLAB_INITIALS,
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-mono shrink-0 mx-1"
                          style={{ background: item.bg, color: "#ffffff" }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3B */}
                <div
                  className={`flex-1 rounded-[12px] border p-5 flex flex-col justify-between ${cardBg}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center -space-x-2">
                      <div
                        className="w-9 h-9 rounded-full font-semibold text-xs flex items-center justify-center border-2 border-black"
                        style={{ backgroundColor: "#f84022", color: "#ffffff" }}
                      >
                        TG
                      </div>
                      <div
                        className="w-9 h-9 rounded-full font-semibold text-xs flex items-center justify-center border-2 border-black"
                        style={{
                          backgroundColor: isDark ? "#27272a" : "#ececec",
                          color: isDark ? "#ffffff" : "#121212",
                        }}
                      >
                        YOU
                      </div>
                    </div>

                    {/* Explicitly sized Vermilion Infinity Mark */}
                    <svg
                      width="104"
                      height="48"
                      viewBox="0 0 120 56"
                      fill="none"
                      style={{
                        width: 104,
                        height: 48,
                        flexShrink: 0,
                        display: "block",
                        filter: "drop-shadow(0 6px 14px rgba(248,64,34,0.3))",
                      }}
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="oxnodInfClean"
                          x1="0"
                          y1="0"
                          x2="120"
                          y2="56"
                        >
                          <stop offset="0%" stopColor="#f84022" />
                          <stop offset="50%" stopColor="#ff9b88" />
                          <stop offset="100%" stopColor="#f84022" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M34 12C20 12 10 21 10 28C10 35 20 44 34 44C50 44 68 12 86 12C100 12 110 21 110 28C110 35 100 44 86 44C68 44 50 12 34 12Z"
                        stroke="url(#oxnodInfClean)"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-[20px] leading-[28px] font-medium mb-1">
                      Always-On Partnership
                    </h3>
                    <p
                      className="text-[14px] leading-[20px]"
                      style={{ color: isDark ? "#8e8e93" : "#717171" }}
                    >
                      Direct collaboration from architecture &amp; storyboards
                      right through deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom 2-Column Bento Grid (0.5fr 1fr) ────────────── */}
            <div className="oxnod-why-grid-bottom">
              {/* Card 4: Built to perform */}
              <div className={`rounded-[12px] border p-5 md:p-6 ${cardBg}`}>
                <h3 className="text-[20px] leading-[28px] font-medium mb-1.5">
                  Built to perform
                </h3>
                <p
                  className="text-[14px] leading-[20px]"
                  style={{ color: isDark ? "#8e8e93" : "#717171" }}
                >
                  Every website, cut film, and audio master is engineered to
                  drive engagement, conversion, and measurable growth.
                </p>
              </div>

              {/* Card 5: Social Proof + 5 Stars + Marquee */}
              <div
                className={`rounded-[12px] border px-5 md:px-8 py-5 oxnod-card5-grid overflow-hidden ${cardBg}`}
              >
                <div
                  className={`flex flex-wrap items-center gap-4 md:pr-5 md:border-r ${
                    isDark ? "border-white/[0.10]" : "border-[#ececec]"
                  }`}
                >
                  <div className="flex items-center -space-x-2">
                    {["#f84022", "#3b82f6", "#8b5cf6", "#10b981"].map(
                      (c, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-black/80 flex items-center justify-center text-[10px] font-bold"
                          style={{ backgroundColor: c, color: "#ffffff" }}
                        >
                          ★
                        </div>
                      ),
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg
                          key={s}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#f84022"
                          style={{
                            width: 14,
                            height: 14,
                            flexShrink: 0,
                            display: "block",
                          }}
                          aria-hidden="true"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-[15px] md:text-[16px] font-medium">
                      50+ Clients trust Tamim Global
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden md:pl-4">
                  <div
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
                    style={{
                      background: isDark
                        ? "linear-gradient(90deg,#121212,transparent)"
                        : "linear-gradient(90deg,#ffffff,transparent)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
                    style={{
                      background: isDark
                        ? "linear-gradient(270deg,#121212,transparent)"
                        : "linear-gradient(270deg,#ffffff,transparent)",
                    }}
                  />
                  <div className="oxnod-marquee-track-slow gap-10">
                    {[...STACK_LOGOS, ...STACK_LOGOS, ...STACK_LOGOS].map(
                      (brand, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap"
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            color: isDark
                              ? "rgba(255,255,255,0.45)"
                              : "#626260",
                          }}
                        >
                          {brand}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
