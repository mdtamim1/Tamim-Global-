"use client";

// ============================================================
// Tamim Global — "What I Build & Create" Section
// 1:1 Faithful Replication of Oxnod Studio "Our Services"
// (https://oxnod.webflow.io/)
//
// Fixes from visual audit:
//  • Explicit SVG inline widths/heights (immune to globals img,svg{100%})
//  • Scoped .oxnod-service-* CSS classes (immune to legacy line-21)
//  • Explicit #ffffff text/icon styles on dark-filled buttons in Lightmode
//  • Snappy ScrollTrigger scrub timing matching Oxnod's exact cadence
// ============================================================

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  expertiseTabIdx: number;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01.",
    title: "Full-Stack Engineering",
    description:
      "Architecting resilient full-stack applications and scalable APIs engineered for speed and longevity.",
    capabilities: [
      "Next.js 16 & React 19",
      "TypeScript & Node.js",
      "PostgreSQL & Prisma",
      "100/100 Lighthouse",
    ],
    image: "/images/services/service-1.jpg",
    imageAlt: "Full-Stack Web Engineering & Systems Architecture",
    expertiseTabIdx: 1,
  },
  {
    number: "02.",
    title: "UI/UX & Interactive 3D",
    description:
      "Designing distinctive digital flagships with liquid WebGL shaders and purposeful GSAP choreography.",
    capabilities: [
      "Bespoke Design Systems",
      "Three.js & GLSL Shaders",
      "GSAP Motion Systems",
      "Figma to Production",
    ],
    image: "/images/services/service-2.png",
    imageAlt: "Web Design & Interactive 3D Motion",
    expertiseTabIdx: 0,
  },
  {
    number: "03.",
    title: "Cinematic Video Editing",
    description:
      "Cutting high-retention brand films, commercial edits, and stories with cinema-grade color grading.",
    capabilities: [
      "DaVinci Resolve Color",
      "Premiere Pro & After FX",
      "Rhythm-Matched Pacing",
      "4K DCI Rec.709 Master",
    ],
    image: "/images/services/service-3.png",
    imageAlt: "Cinematic Video Production & Color Grading",
    expertiseTabIdx: 2,
  },
  {
    number: "04.",
    title: "Music & Sound Design",
    description:
      "Composing original film scores, atmospheric textures, and studio-mastered sonic brand identities.",
    capabilities: [
      "Original Film Scores",
      "Orchestral & Synth Mix",
      "Foley & Spatial Audio",
      "Broadcast Mastering",
    ],
    image: "/images/services/service-4.png",
    imageAlt: "Original Music Composition & Audio Production",
    expertiseTabIdx: 3,
  },
];

const HEADLINE_WORDS =
  "Tamim is a creative studio engineer who builds distinctive software, web flagships, cinema films, and original scores.".split(
    " "
  );

function ArrowToBarIcon({
  color = "currentColor",
  size = 16,
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, flexShrink: 0, display: "block" }}
      aria-hidden="true"
    >
      <path d="M4 12h11" />
      <path d="M11 7l5 5-5 5" />
      <path d="M19 6v12" />
    </svg>
  );
}

export default function WhatIBuildSection() {
  const { isDark } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    if (!section || !titleEl || !cardsWrapper) return;

    const mutedColor = isDark ? "#717171" : "#979797";
    const activeColor = isDark ? "#ffffff" : "#000000";

    const ctx = gsap.context(() => {
      // 1. Oxnod i-7637e4ad -> t-7d637a4e: SplitText per-character color scrub
      const chars = titleEl.querySelectorAll<HTMLElement>(".oxnod-title-char");
      if (chars.length > 0) {
        gsap.fromTo(
          chars,
          { color: mutedColor },
          {
            color: activeColor,
            stagger: { each: 0.5 },
            ease: "power1.out",
            scrollTrigger: {
              trigger: titleEl,
              start: "top 95%",
              end: "bottom 35%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Oxnod i-33d83019 -> t-b3fcd77c: Desktop staggered ScrollTrigger scrub
      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        const cards = cardWrapRefs.current.filter(
          (el): el is HTMLDivElement => el !== null
        );
        if (cards.length === 0) return;

        // Card 1..4 slide smoothly from ±50% to 0% as you scroll down through cards
        const positions = [0, 0.2, 0.42, 0.63];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsWrapper,
            start: "top bottom",
            end: "bottom 78%",
            scrub: 1.2,
          },
        });

        cards.forEach((cardEl, idx) => {
          const fromX = idx % 2 === 0 ? 50 : -50;
          tl.fromTo(
            cardEl,
            { xPercent: fromX, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 0.35,
              ease: "none",
            },
            positions[idx] ?? idx * 0.2
          );
        });
      });

      mm.add("(max-width: 991px)", () => {
        const cards = cardWrapRefs.current.filter(
          (el): el is HTMLDivElement => el !== null
        );
        cards.forEach((cardEl, idx) => {
          const fromPx = idx % 2 === 0 ? -48 : 48;
          gsap.fromTo(
            cardEl,
            { x: fromPx, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 86%",
                once: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const handleCardClick = (svc: ServiceItem) => {
    const target = document.getElementById("expertise");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("tg:select-expertise", {
          detail: { index: svc.expertiseTabIdx },
        })
      );
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="what-i-build"
        className={`relative w-full py-[60px] md:py-[68px] lg:py-[120px] transition-colors duration-500 ${
          isDark
            ? "bg-[#000000] text-white border-t border-white/[0.06]"
            : "bg-[#f2f2f2] text-[#000000] border-t border-[#ececec]"
        }`}
        style={{ overflowX: "clip" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10">
          {/* ── Top Header Block (.services-top-wrapper) ──────────────── */}
          <div className="mb-8 md:mb-12 lg:mb-[72px]">
            {/* .section-top bar */}
            <div
              className={`flex items-center justify-between border-t pt-3 mb-6 lg:mb-10 ${
                isDark ? "border-white/[0.14]" : "border-[#dcdcdc]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: 18, height: 18, flexShrink: 0, display: "block" }}
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#f84022"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#f84022"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#f84022"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="text-[13px] md:text-[14px] leading-[18px] tracking-[-0.14px] uppercase font-normal whitespace-nowrap"
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: isDark ? "rgba(255,255,255,0.9)" : "#252424",
                  }}
                >
                  WHAT I BUILD &amp; CREATE
                </span>
              </div>

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

            {/* .service-header */}
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-end gap-6">
              <div className="w-full max-w-[850px]">
                <h2
                  ref={titleRef}
                  className="oxnod-service-headline"
                  style={{
                    fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                  }}
                >
                  {HEADLINE_WORDS.map((word, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className="oxnod-title-char inline-block"
                          style={{
                            color: isDark ? "#717171" : "#979797",
                            transition: "none",
                          }}
                        >
                          {char}
                        </span>
                      ))}
                      {wIdx < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Oxnod .primary-button: Explicit #ffffff styling so lightmode css override can't turn it dark-on-dark */}
              <div className="shrink-0">
                <a
                  href="#expertise"
                  className="group/pbtn inline-flex items-center select-none uppercase cursor-pointer"
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: "#ffffff",
                  }}
                >
                  <div
                    className="relative flex items-center justify-center rounded-l-[8px]"
                    style={{
                      width: 48,
                      height: 44,
                      backgroundColor: isDark ? "#1a1a1d" : "#121212",
                      color: "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.16)" : "none",
                      clipPath: "polygon(0 0, 100% 0, 86% 100%, 0 100%)",
                      paddingRight: 6,
                    }}
                  >
                    <div
                      className="flex flex-col gap-[2px] opacity-65"
                      style={{ position: "absolute", top: 6, right: 9 }}
                    >
                      <span
                        className="rounded-full"
                        style={{ width: 2, height: 2, backgroundColor: "#f84022" }}
                      />
                      <span
                        className="rounded-full"
                        style={{ width: 2, height: 2, backgroundColor: "#ffffff" }}
                      />
                      <span
                        className="rounded-full"
                        style={{ width: 2, height: 2, backgroundColor: "#ffffff" }}
                      />
                    </div>

                    <div
                      className="overflow-hidden flex items-center justify-end relative"
                      style={{ width: 18, height: 18 }}
                    >
                      <div className="flex items-center transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pbtn:translate-x-[18px]">
                        <ArrowToBarIcon color="#ffffff" size={18} />
                        <ArrowToBarIcon color="#f84022" size={18} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative flex items-center justify-center rounded-r-[8px]"
                    style={{
                      height: 44,
                      marginLeft: -4,
                      paddingLeft: 28,
                      paddingRight: 24,
                      backgroundColor: isDark ? "#1a1a1d" : "#121212",
                      color: "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.16)" : "none",
                      clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                  >
                    <div style={{ height: 20, overflow: "hidden" }}>
                      <div className="flex flex-col text-[13px] md:text-[14px] leading-[20px] font-medium tracking-[0.02em] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pbtn:-translate-y-1/2">
                        <span
                          className="flex items-center whitespace-nowrap"
                          style={{ height: 20, color: "#ffffff" }}
                        >
                          VIEW ALL SERVICES
                        </span>
                        <span
                          className="flex items-center whitespace-nowrap"
                          style={{ height: 20, color: "#f84022" }}
                        >
                          VIEW ALL SERVICES
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* ── Alternating Staggered Cards (.services-cards-wrapper) ── */}
          <div
            ref={cardsWrapperRef}
            className="flex flex-col gap-5 md:gap-8 lg:gap-[40px]"
          >
            {SERVICES.map((svc, idx) => {
              const isRightAligned = idx % 2 === 0;

              return (
                <div
                  key={svc.number}
                  className={
                    isRightAligned
                      ? "oxnod-service-slot-right"
                      : "oxnod-service-slot-left"
                  }
                >
                  <div
                    ref={(el) => {
                      cardWrapRefs.current[idx] = el;
                    }}
                    className="will-change-transform"
                  >
                    {/* .services-card */}
                    <div
                      className={`group/card oxnod-service-card-inner ${
                        !isRightAligned ? "is-even" : ""
                      } rounded-[12px] p-[8px] border transition-colors duration-300 ${
                        isDark
                          ? "bg-[#121212] border-white/[0.12] hover:border-white/[0.26]"
                          : "bg-white border-[#ececec] hover:border-black/20"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-full md:w-[244px] md:min-w-[244px] md:max-w-[244px] shrink-0"
                      >
                        <div className="w-full h-[250px] sm:h-[290px] md:h-full md:min-h-[238px] rounded-[8px] overflow-hidden bg-[#1a1a1d]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={svc.image}
                            alt={svc.imageAlt}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-[8px] transition-transform duration-700 ease-out group-hover/card:scale-105"
                          />
                        </div>
                      </div>

                      {/* Content Column */}
                      <div
                        className={`oxnod-service-content flex-1 flex flex-col justify-between py-3 px-2 md:py-3 ${
                          isRightAligned ? "md:pr-4 md:pl-0" : ""
                        }`}
                      >
                        <div
                          className={`oxnod-service-top-grid pb-5 border-b ${
                            isDark ? "border-white/[0.10]" : "border-[#ececec]"
                          }`}
                        >
                          <div>
                            <div
                              className="text-[15px] font-medium mb-2"
                              style={{ color: "#f84022" }}
                            >
                              {svc.number}
                            </div>
                            <h3
                              className={`oxnod-service-card-heading mb-2 ${
                                isDark ? "text-white" : "text-[#000000]"
                              }`}
                              style={{
                                fontFamily:
                                  "'Urbanist', var(--font-onest), sans-serif",
                              }}
                            >
                              {svc.title}
                            </h3>
                            <p
                              className="text-[15px] lg:text-[16px] leading-[24px] font-medium"
                              style={{
                                color: isDark ? "#8e8e93" : "#717171",
                              }}
                            >
                              {svc.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 justify-start items-start pt-0.5">
                            {svc.capabilities.map((cap) => (
                              <div
                                key={cap}
                                className="flex items-center gap-2.5"
                              >
                                <span
                                  className="rounded-full shrink-0"
                                  style={{
                                    width: 6,
                                    height: 6,
                                    backgroundColor: isDark
                                      ? "rgba(255,255,255,0.75)"
                                      : "#252424",
                                  }}
                                />
                                <span
                                  className="text-[13px] lg:text-[14px] leading-[18px] uppercase font-normal tracking-[-0.14px]"
                                  style={{
                                    fontFamily: "'Geist Mono', monospace",
                                    color: isDark
                                      ? "rgba(255,255,255,0.85)"
                                      : "#252424",
                                  }}
                                >
                                  {cap}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleCardClick(svc)}
                            className="group/vbtn relative inline-flex items-center gap-2 pb-1.5 uppercase cursor-pointer"
                            style={{
                              fontFamily: "'Geist Mono', monospace",
                              color: isDark ? "#ffffff" : "#000000",
                            }}
                          >
                            <div
                              className="overflow-hidden flex items-center justify-end"
                              style={{ width: 20, height: 20 }}
                            >
                              <div className="flex items-center transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/vbtn:translate-x-[20px]">
                                <ArrowToBarIcon color="#16a34a" size={18} />
                                <ArrowToBarIcon color="#f84022" size={18} />
                              </div>
                            </div>

                            <div style={{ height: 22, overflow: "hidden" }}>
                              <div className="flex flex-col text-[14px] leading-[22px] font-medium tracking-[-0.14px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/vbtn:-translate-y-1/2">
                                <span
                                  className="flex items-center whitespace-nowrap"
                                  style={{
                                    height: 22,
                                    color: isDark ? "#ffffff" : "#000000",
                                  }}
                                >
                                  VIEW DETAILS
                                </span>
                                <span
                                  className="flex items-center whitespace-nowrap"
                                  style={{ height: 22, color: "#f84022" }}
                                >
                                  VIEW DETAILS
                                </span>
                              </div>
                            </div>

                            <span
                              className="absolute bottom-0 left-0 right-0 h-px transition-colors duration-300"
                              style={{
                                backgroundColor: isDark ? "#ffffff" : "#000000",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
