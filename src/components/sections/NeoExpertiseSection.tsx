"use client";

// ============================================================
// Tamim Global — "Expertise & Craft" Section (#expertise)
// Ultra-Premium Portfolio & 5-Service Interactive Showcase
//
// Features:
//  • Synchronized with shared SERVICES + content.json projects
//  • 5 interactive discipline tabs (Full-Stack, UI/UX 3D, Cinema, Music, E-Commerce)
//  • Framer Motion editorial transitions + animated active pill indicator
//  • Live 3D perspective Showcase Stage replacing generic mockup:
//      - Service artwork backdrop with parallax tilt
//      - Live per-discipline telemetry meter bars & HUD
//      - Matched real portfolio Case Study + verified client endorsement
//  • Direct deep-link bridge into service pricing configurator (#what-i-build)
//  • Full Darkmode & Lightmode parity
// ============================================================

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import {
  SERVICES,
  STUDIO_PORTFOLIO_CREDENTIALS,
  type ServiceData,
} from "@/data/services";
import type { Project } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NeoExpertiseSectionProps {
  projects?: Project[];
}

// ─── Explicit-Sized Vector Icons (Immune to globals img/svg{100%}) ────────────

function CompassLayersIcon({
  color = "#f84022",
  size = 18,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
      aria-hidden="true"
    >
      <polygon points="12 2 19 6 19 18 12 22 5 18 5 6 12 2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CheckMarkIcon({
  color = "#22c55e",
  size = 14,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "block",
        marginTop: 2,
      }}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightSvg({
  color = "currentColor",
  size = 15,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function ArrowUpRightSvg({
  color = "currentColor",
  size = 14,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ChevronSvg({
  direction,
  color = "currentColor",
  size = 14,
}: {
  direction: "left" | "right";
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
      aria-hidden="true"
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NeoExpertiseSection({
  projects = [],
}: NeoExpertiseSectionProps) {
  const { isDark } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const activeService: ServiceData = SERVICES[activeIdx] ?? SERVICES[0];
  const { expertise } = activeService;

  // Match real project record from data/content.json when available
  const matchedProject = useMemo(() => {
    if (!expertise.caseStudySlug || projects.length === 0) return null;
    return projects.find((p) => p.id === expertise.caseStudySlug) ?? null;
  }, [expertise.caseStudySlug, projects]);

  // Listen to external tab selection events (`tg:select-expertise`)
  useEffect(() => {
    const onSelectTab = (e: Event) => {
      const detail = (e as CustomEvent<{ index?: number; id?: string }>).detail;
      if (!detail) return;
      if (typeof detail.id === "string") {
        const found = SERVICES.findIndex((s) => s.id === detail.id);
        if (found !== -1) {
          setActiveIdx(found);
          return;
        }
      }
      if (
        typeof detail.index === "number" &&
        detail.index >= 0 &&
        detail.index < SERVICES.length
      ) {
        setActiveIdx(detail.index);
      }
    };
    window.addEventListener("tg:select-expertise", onSelectTab);
    return () => window.removeEventListener("tg:select-expertise", onSelectTab);
  }, []);

  // GSAP subtle entrance choreography
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleConfigureService = (serviceId: string) => {
    window.dispatchEvent(
      new CustomEvent("tg:open-service-pricing", { detail: { id: serviceId } }),
    );
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-ny * 5).toFixed(2)),
      ry: Number((nx * 6).toFixed(2)),
    });
  };

  const handleStageMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleStep = (delta: number) => {
    setActiveIdx((prev) => (prev + delta + SERVICES.length) % SERVICES.length);
  };

  // Explicit theme tokens (resistant to global lightmode class overrides)
  const bgCanvas = isDark ? "#000000" : "#f2f2f2";
  const bgSurface = isDark ? "#0b0b0e" : "#ffffff";
  const bgInset = isDark ? "#121217" : "#f7f7f5";
  const borderCol = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";
  const borderTopBar = isDark ? "rgba(255,255,255,0.14)" : "#dcdcdc";
  const fgPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const fgSecondary = isDark ? "#a1a1aa" : "#52525b";
  const fgMuted = isDark ? "#71717a" : "#717171";

  const visualSrc = expertise.showcaseImage ?? activeService.image;
  const featuredTitle = matchedProject?.title ?? expertise.featuredWorkTitle;
  const featuredCategory =
    matchedProject?.category ?? expertise.featuredWorkCategory;
  const featuredOutcome =
    matchedProject?.caseStudy?.outcome ?? expertise.featuredWorkOutcome;
  const featuredTags =
    matchedProject?.tags?.slice(0, 4) ?? expertise.featuredWorkBadges;

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="tg-exp-root relative w-full py-[72px] md:py-[92px] lg:py-[124px] transition-colors duration-500"
      style={{
        backgroundColor: bgCanvas,
        color: fgPrimary,
        borderTop: `1px solid ${borderCol}`,
        scrollMarginTop: 96,
        overflowX: "clip",
      }}
    >
      {/* Dynamic subtle ambient atmospheric aura synced to selected discipline accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{
          background: isDark
            ? `radial-gradient(62% 48% at 78% 36%, ${activeService.accentColor}1c 0%, transparent 72%)`
            : `radial-gradient(62% 48% at 78% 36%, ${activeService.accentColor}12 0%, transparent 72%)`,
        }}
      />

      <div className="tg-exp-container relative z-10 w-full max-w-[1440px] mx-auto">
        {/* ── 1. Top Editorial Rail ─────────────────────────────────── */}
        <div
          className="flex items-center justify-between pt-3 mb-6 lg:mb-10"
          style={{ borderTop: `1px solid ${borderTopBar}` }}
        >
          <div className="flex items-center gap-2.5">
            <CompassLayersIcon color={activeService.accentColor} size={18} />
            <span
              className="text-[13px] md:text-[14px] leading-[18px] tracking-[-0.14px] uppercase font-normal whitespace-nowrap"
              style={{
                fontFamily: "'Geist Mono', monospace",
                color: isDark ? "rgba(255,255,255,0.9)" : "#252424",
              }}
            >
              EXPERTISE &amp; CRAFT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="tg-exp-matrix-badge text-[11px] uppercase tracking-[0.14em]"
              style={{
                fontFamily: "'Geist Mono', monospace",
                color: activeService.accentColor,
              }}
            >
              {`${activeService.number} / 0${SERVICES.length} // PORTFOLIO MATRIX`}
            </span>
            <span
              className="text-[13px] md:text-[14px] leading-[18px] tracking-[-0.14px] uppercase whitespace-nowrap"
              style={{
                fontFamily: "'Geist Mono', monospace",
                color: isDark ? "rgba(255,255,255,0.8)" : "#252424",
              }}
            >
              @TAMIMGLOBAL
            </span>
          </div>
        </div>

        {/* ── 2. Headline & Portfolio Credentials Row ───────────────── */}
        <div className="tg-exp-hero-row mb-8 lg:mb-11">
          <div className="max-w-[780px]">
            <h2
              id="title-expertise"
              style={{
                fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                color: fgPrimary,
                fontSize: "clamp(32px, 4.1vw, 52px)",
                lineHeight: 1.1,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Specialized execution across{" "}
              <span style={{ color: fgMuted }}>
                code, 3D UI, cinema, sound &amp; commerce.
              </span>
            </h2>
          </div>

          <div className="tg-exp-cred-cluster">
            {STUDIO_PORTFOLIO_CREDENTIALS.slice(0, 4).map((cred) => (
              <div
                key={cred.label}
                style={{
                  backgroundColor: bgSurface,
                  border: `1px solid ${borderCol}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  minWidth: 96,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: fgPrimary,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {cred.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: fgMuted,
                    marginTop: 3,
                  }}
                >
                  {cred.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Interactive 5-Service Pill Tab Switcher ────────────── */}
        <div
          role="tablist"
          aria-label="Service Expertise Disciplines"
          className="tg-exp-tablist mb-7 lg:mb-9"
          style={{
            backgroundColor: isDark
              ? "rgba(255,255,255,0.035)"
              : "rgba(0,0,0,0.04)",
            border: `1px solid ${borderCol}`,
          }}
        >
          {SERVICES.map((svc, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={svc.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    handleStep(1);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    handleStep(-1);
                  }
                }}
                className="tg-exp-tab-btn"
                style={{
                  color: isActive ? "#ffffff" : fgSecondary,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tg-expertise-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      backgroundColor: isDark ? "#18181f" : "#111115",
                      border: `1px solid ${svc.accentColor}90`,
                      boxShadow: `0 6px 24px ${svc.accentColor}38`,
                      zIndex: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: isActive ? svc.accentColor : fgMuted,
                      boxShadow: isActive
                        ? `0 0 8px ${svc.accentColor}`
                        : "none",
                      transition: "all 0.25s ease",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 11,
                      opacity: isActive ? 0.95 : 0.6,
                      color: isActive ? svc.accentColor : undefined,
                    }}
                  >
                    {svc.number}
                  </span>
                  <span>{svc.expertise.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 4. Main 12-Col Bento Command Stage ────────────────────── */}
        <div ref={stageRef} className="tg-exp-stage-grid">
          {/* Left Panel: Discipline Narrative, Deliverables, Stack & Metrics */}
          <div
            className="tg-exp-left-panel"
            style={{
              backgroundColor: bgSurface,
              border: `1px solid ${borderCol}`,
              borderRadius: 20,
              boxShadow: isDark
                ? "0 24px 70px rgba(0,0,0,0.55)"
                : "0 20px 60px rgba(0,0,0,0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full justify-between gap-6"
              >
                <div>
                  {/* Meta Header Badge Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: activeService.accentColor,
                          backgroundColor: `${activeService.accentColor}16`,
                          border: `1px solid ${activeService.accentColor}38`,
                          padding: "5px 11px",
                          borderRadius: 6,
                        }}
                      >
                        {expertise.code} · {activeService.title}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: fgMuted,
                      }}
                    >
                      From{" "}
                      <strong style={{ color: fgPrimary }}>
                        ${activeService.basePrice}
                      </strong>{" "}
                      · {activeService.deliveryDays}d Delivery
                    </div>
                  </div>

                  {/* Dynamic Headline */}
                  <h3
                    style={{
                      fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                      fontSize: "clamp(24px, 2.4vw, 32px)",
                      lineHeight: 1.2,
                      fontWeight: 600,
                      letterSpacing: "-0.025em",
                      color: fgPrimary,
                      marginBottom: 14,
                    }}
                  >
                    {expertise.headline}
                  </h3>

                  {/* Portfolio-Anchored Copy */}
                  <div
                    className="flex flex-col gap-3 mb-6"
                    style={{
                      color: fgSecondary,
                      fontSize: 15,
                      lineHeight: 1.65,
                    }}
                  >
                    {expertise.paragraphs.map((p, i) => (
                      <p key={i} style={{ margin: 0 }}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Verified Craft Deliverables (2x2) */}
                  <div className="mb-6">
                    <div
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: fgMuted,
                        marginBottom: 10,
                      }}
                    >
                      STUDIO DELIVERABLES &amp; STANDARDS
                    </div>
                    <div className="tg-exp-deliverables-grid">
                      {expertise.deliverables.map((item) => (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 9,
                            padding: "10px 12px",
                            borderRadius: 10,
                            backgroundColor: bgInset,
                            border: `1px solid ${borderCol}`,
                          }}
                        >
                          <CheckMarkIcon
                            size={14}
                            color={activeService.accentColor}
                          />
                          <span
                            style={{
                              fontSize: 13,
                              lineHeight: 1.45,
                              color: fgPrimary,
                              fontWeight: 500,
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Production Stack Chips */}
                  <div className="mb-6">
                    <div
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: fgMuted,
                        marginBottom: 10,
                      }}
                    >
                      PRODUCTION ARSENAL
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expertise.stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.02em",
                            padding: "5px 11px",
                            borderRadius: 999,
                            backgroundColor: isDark
                              ? "rgba(255,255,255,0.04)"
                              : "rgba(0,0,0,0.04)",
                            border: `1px solid ${borderCol}`,
                            color: isDark
                              ? "rgba(255,255,255,0.82)"
                              : "#27272a",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Metrics + Action Strip */}
                <div>
                  {/* 3-Column Metrics */}
                  <div
                    className="tg-exp-metrics-grid py-5 mb-6"
                    style={{
                      borderTop: `1px solid ${borderCol}`,
                      borderBottom: `1px solid ${borderCol}`,
                    }}
                  >
                    {expertise.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          style={{
                            fontFamily:
                              "'Urbanist', var(--font-onest), sans-serif",
                            fontSize: "clamp(28px, 3vw, 40px)",
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: "-0.03em",
                            color: activeService.accentColor,
                            marginBottom: 6,
                          }}
                        >
                          {m.value}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: 10,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: fgMuted,
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bridge CTAs */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleConfigureService(activeService.id)}
                      className="tg-exp-primary-btn cursor-pointer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "13px 22px",
                        borderRadius: 10,
                        border: "none",
                        backgroundColor: activeService.accentColor,
                        color: "#ffffff",
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        boxShadow: `0 10px 28px ${activeService.accentColor}40`,
                        transition: "transform 0.2s ease, filter 0.2s ease",
                      }}
                    >
                      <span>
                        Configure {expertise.shortLabel} (From $
                        {activeService.basePrice})
                      </span>
                      <ArrowRightSvg size={15} color="#ffffff" />
                    </button>

                    {expertise.caseStudySlug ? (
                      <Link
                        href={`/work/${expertise.caseStudySlug}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "13px 20px",
                          borderRadius: 10,
                          border: `1px solid ${borderCol}`,
                          backgroundColor: bgInset,
                          color: fgPrimary,
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          transition: "border-color 0.2s ease",
                        }}
                      >
                        <span>Case Study: {featuredTitle}</span>
                        <ArrowUpRightSvg size={14} color={fgPrimary} />
                      </Link>
                    ) : (
                      <Link
                        href="/services"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "13px 20px",
                          borderRadius: 10,
                          border: `1px solid ${borderCol}`,
                          backgroundColor: bgInset,
                          color: fgPrimary,
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          transition: "border-color 0.2s ease",
                        }}
                      >
                        <span>Explore Studio Pipeline</span>
                        <ArrowUpRightSvg size={14} color={fgPrimary} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel: Interactive Portfolio & Telemetry Showcase Stage */}
          <div
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="tg-exp-showcase"
            style={{
              backgroundColor: "#09090c",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"}`,
              borderRadius: 20,
              transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: isDark
                ? `0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px ${activeService.accentColor}22`
                : `0 28px 70px rgba(0,0,0,0.16), 0 0 0 1px ${activeService.accentColor}22`,
            }}
          >
            {/* Visual Canvas Image Layer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id + "-bg"}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 pointer-events-none select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={visualSrc}
                  alt={activeService.imageAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    opacity: 0.62,
                  }}
                />
                {/* Editorial dark atmospheric gradient for crisp overlay legibility */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, rgba(6,6,9,0.68) 0%, rgba(6,6,9,0.36) 44%, rgba(6,6,9,0.94) 100%)`,
                  }}
                />
                {/* Subtle precision grid */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Stage Foreground HUD Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6">
              {/* Top Window Control + Discipline Pager */}
              <div className="flex items-center justify-between gap-3">
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 999,
                    backgroundColor: "rgba(10,10,14,0.72)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: activeService.accentColor,
                      boxShadow: `0 0 10px ${activeService.accentColor}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#ffffff",
                    }}
                  >
                    {expertise.telemetryLabel}
                  </span>
                </div>

                {/* Prev / Next arrows right on showcase */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous craft discipline"
                    onClick={() => handleStep(-1)}
                    className="cursor-pointer flex items-center justify-center rounded-full transition-colors"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "rgba(10,10,14,0.72)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      backdropFilter: "blur(12px)",
                      color: "#ffffff",
                    }}
                  >
                    <ChevronSvg direction="left" color="#ffffff" size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next craft discipline"
                    onClick={() => handleStep(1)}
                    className="cursor-pointer flex items-center justify-center rounded-full transition-colors"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "rgba(10,10,14,0.72)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      backdropFilter: "blur(12px)",
                      color: "#ffffff",
                    }}
                  >
                    <ChevronSvg direction="right" color="#ffffff" size={14} />
                  </button>
                </div>
              </div>

              {/* Middle Telemetry Plot + Featured Portfolio Outcome Window */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id + "-card"}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3 mt-auto"
                >
                  {/* Telemetry Spectrum / Performance Visualizer Card */}
                  <div
                    style={{
                      padding: "14px 16px",
                      borderRadius: 14,
                      backgroundColor: "rgba(12,12,16,0.78)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        CRAFT TELEMETRY
                      </span>
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: activeService.accentColor,
                        }}
                      >
                        {expertise.telemetryStatus}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${expertise.telemetryBars.length}, minmax(0, 1fr))`,
                        alignItems: "end",
                        gap: 6,
                        height: 44,
                      }}
                    >
                      {expertise.telemetryBars.map((val, bIdx) => (
                        <motion.div
                          key={`${activeService.id}-bar-${bIdx}`}
                          initial={{ height: "14%" }}
                          animate={{ height: `${val}%` }}
                          transition={{
                            duration: 0.45,
                            delay: bIdx * 0.03,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            borderRadius: 4,
                            background: `linear-gradient(180deg, ${activeService.accentColor} 0%, ${activeService.accentColor}44 100%)`,
                            minHeight: 6,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Real Portfolio Proof Card */}
                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: 16,
                      backgroundColor: "rgba(12,12,16,0.88)",
                      border: `1px solid ${activeService.accentColor}45`,
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: activeService.accentColor,
                        }}
                      >
                        {`PORTFOLIO PROOF // ${featuredCategory}`}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        VERIFIED OUTCOME
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "#ffffff",
                        marginBottom: 6,
                      }}
                    >
                      {featuredTitle}
                    </div>

                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.78)",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {featuredOutcome}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {featuredTags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: 10,
                            padding: "3px 8px",
                            borderRadius: 5,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Client Quote when available */}
                    {expertise.clientQuote && (
                      <div
                        style={{
                          marginTop: 14,
                          paddingTop: 12,
                          borderTop: "1px solid rgba(255,255,255,0.10)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 12,
                            fontStyle: "italic",
                            lineHeight: 1.5,
                            color: "rgba(255,255,255,0.76)",
                            margin: "0 0 4px 0",
                          }}
                        >
                          &ldquo;{expertise.clientQuote.quote}&rdquo;
                        </p>
                        <div
                          style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: 10,
                            color: "rgba(255,255,255,0.52)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          — {expertise.clientQuote.author} ·{" "}
                          {expertise.clientQuote.role}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── 5. Bottom 5-Service Portfolio Matrix Rail ─────────────── */}
        <div className="tg-exp-bottom-rail mt-6 lg:mt-8">
          {SERVICES.map((svc, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className="text-left cursor-pointer transition-all duration-250"
                style={{
                  backgroundColor: isSelected ? bgSurface : bgInset,
                  border: `1px solid ${
                    isSelected ? svc.accentColor : borderCol
                  }`,
                  borderRadius: 12,
                  padding: "14px 16px",
                  boxShadow: isSelected
                    ? `0 8px 28px ${svc.accentColor}20`
                    : "none",
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 11,
                      fontWeight: 600,
                      color: isSelected ? svc.accentColor : fgMuted,
                    }}
                  >
                    {svc.number}.
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 11,
                      color: isSelected ? fgPrimary : fgMuted,
                    }}
                  >
                    from ${svc.basePrice}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: fgPrimary,
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  }}
                >
                  {svc.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: fgMuted,
                  }}
                >
                  {svc.deliveryDays}d turnaround · {svc.addOns.length} add-ons
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
