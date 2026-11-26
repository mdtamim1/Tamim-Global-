"use client";

// ============================================================
// Tamim Global – "What I Build & Create" Section
// 1:1 Oxnod.webflow.io "Our Services" reverse-engineering:
//
//  • Full-width numbered service rows with thin HR dividers
//  • Left: index (01–05) + service title + tags + arrow icon
//  • Right: sticky image preview panel — crossfades on row hover
//  • Hover effect: row bg highlights, left accent line slides in,
//    number dims, title brightens, arrow rotates 45°
//  • Scroll: items stagger-in from Y+40, opacity 0→1 (Intersection
//    Observer, no GSAP dep)
//  • Mobile: stacked layout, no sticky image, card grid instead
// ============================================================

import { useState, useRef, useEffect, useCallback } from "react";

interface Service {
  index: string;
  title: string;
  tags: string[];
  description: string;
  accent: string;        // gradient color for the left accent line
  imageGradient: string; // CSS gradient used as image bg fallback
  imageSrc?: string;     // optional real image
}

const SERVICES: Service[] = [
  {
    index: "01",
    title: "Full-Stack Web Development",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    description:
      "End-to-end production apps — from REST & WebSocket APIs to pixel-perfect UIs. 100/100 Lighthouse, CI/CD, Vercel & Railway deploys.",
    accent: "#6366f1",
    imageGradient:
      "linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 40%, #0d0d20 100%)",
    imageSrc: "/neoleaf-media/1.fd43cba1.webp",
  },
  {
    index: "02",
    title: "UI / UX Design",
    tags: ["Figma", "Framer", "Design Systems", "Motion"],
    description:
      "Bespoke design systems, interactive prototypes, and conversion-engineered interfaces that feel alive — not just aesthetic.",
    accent: "#8b5cf6",
    imageGradient:
      "linear-gradient(135deg, #1a0f2e 0%, #2d1b5a 40%, #0f0a1e 100%)",
    imageSrc: "/neoleaf-media/2.3924e0ff.webp",
  },
  {
    index: "03",
    title: "Cinematic Video Editing",
    tags: ["DaVinci Resolve", "Premiere Pro", "4K DCI", "Color Grade"],
    description:
      "Hollywood-calibre colour grading, rhythm-matched cuts, and layered sound design. High-retention ads, brand films & documentary cuts.",
    accent: "#f59e0b",
    imageGradient:
      "linear-gradient(135deg, #1a1200 0%, #3d2a00 40%, #120e00 100%)",
    imageSrc: "/neoleaf-media/3.eb2479f9.webp",
  },
  {
    index: "04",
    title: "Music Composition",
    tags: ["FL Studio", "Ableton", "Orchestral", "Audio Master"],
    description:
      "Original scores, commercial soundscapes, and audio-visual synchronisation engineered to emotionally envelope the audience.",
    accent: "#10b981",
    imageGradient:
      "linear-gradient(135deg, #001a0f 0%, #003d25 40%, #000f07 100%)",
    imageSrc: "/neoleaf-media/bg.7173f725.webp",
  },
  {
    index: "05",
    title: "Motion & 3D",
    tags: ["Three.js", "WebGL", "GSAP", "After Effects"],
    description:
      "Real-time 3D WebGL experiences, GLSL shaders, physics-based animations and GPU-rendered motion graphics that run at 60fps.",
    accent: "#ef4444",
    imageGradient:
      "linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #0f0000 100%)",
    imageSrc: "/neoleaf-media/bg-d.b83e23e0.webp",
  },
];

// ── Stagger-in hook (IntersectionObserver) ─────────────────
function useStaggerReveal(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 90); // 90ms stagger per item
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return { refs, visible };
}

export default function WhatIBuildSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { refs: rowRefs, visible } = useStaggerReveal(SERVICES.length);

  // Smooth crossfade on hover
  const handleHover = useCallback(
    (idx: number) => {
      if (idx === activeIdx || transitioning) return;
      setTransitioning(true);
      setPrevIdx(activeIdx);
      setActiveIdx(idx);
      setTimeout(() => {
        setPrevIdx(null);
        setTransitioning(false);
      }, 500);
    },
    [activeIdx, transitioning]
  );

  const active = SERVICES[activeIdx];

  return (
    <section
      id="what-i-build"
      className="w-full px-5 md:px-10 lg:px-[60px] py-20 lg:py-[120px] bg-[#000000] border-t border-white/[0.04] overflow-hidden"
    >
      {/* ── Section Header ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4 block">
            WHAT I BUILD &amp; CREATE
          </span>
          <h2
            className="text-[38px] lg:text-[64px] font-bold leading-[100%] tracking-tight text-white"
            style={{ fontFamily: "var(--font-onest)" }}
          >
            Five disciplines.
            <br />
            <span className="text-white/30">One obsessive</span>
            <br />
            standard of craft.
          </h2>
        </div>
        <p className="text-white/50 text-[14px] lg:text-[16px] leading-relaxed max-w-[320px] lg:text-right">
          Every project I ship is fast, accessible,
          <br className="hidden lg:block" /> and engineered for scale —{" "}
          <br className="hidden lg:block" />
          not just for looks.
        </p>
      </div>

      {/* ── Main Content: Service List + Sticky Image ───── */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Left: Service List */}
        <div className="w-full lg:w-[55%] flex flex-col">
          {/* Top HR */}
          <div className="w-full h-px bg-white/[0.08]" />

          {SERVICES.map((svc, i) => (
            <div
              key={svc.index}
              ref={(el) => { rowRefs.current[i] = el; }}
              onMouseEnter={() => handleHover(i)}
              className="group relative cursor-pointer"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
              }}
            >
              {/* Left accent line — slides in on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500"
                style={{
                  background: svc.accent,
                  opacity: activeIdx === i ? 1 : 0,
                  transform: activeIdx === i ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                }}
              />

              {/* Row content */}
              <div
                className="flex items-center gap-6 lg:gap-10 py-7 lg:py-9 pl-6 lg:pl-8 pr-4 lg:pr-6 transition-all duration-300"
                style={{
                  backgroundColor:
                    activeIdx === i
                      ? "rgba(255,255,255,0.03)"
                      : "transparent",
                }}
              >
                {/* Index */}
                <span
                  className="font-mono text-[12px] lg:text-[13px] tracking-widest shrink-0 transition-colors duration-300"
                  style={{
                    color:
                      activeIdx === i ? svc.accent : "rgba(255,255,255,0.25)",
                  }}
                >
                  {svc.index}
                </span>

                {/* Title + Tags */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <h3
                      className="text-[22px] lg:text-[32px] font-semibold tracking-tight leading-tight transition-colors duration-300"
                      style={{
                        color:
                          activeIdx === i
                            ? "#ffffff"
                            : "rgba(255,255,255,0.65)",
                      }}
                    >
                      {svc.title}
                    </h3>
                  </div>

                  {/* Tags – visible on active */}
                  <div
                    className="flex flex-wrap gap-2 overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: activeIdx === i ? "60px" : "0px",
                      opacity: activeIdx === i ? 1 : 0,
                      marginTop: activeIdx === i ? "10px" : "0px",
                    }}
                  >
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-3 py-1 rounded-full border font-medium tracking-wide"
                        style={{
                          borderColor: `${svc.accent}40`,
                          color: svc.accent,
                          backgroundColor: `${svc.accent}12`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description – visible on active */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: activeIdx === i ? "80px" : "0px",
                      opacity: activeIdx === i ? 1 : 0,
                      marginTop: activeIdx === i ? "10px" : "0px",
                    }}
                  >
                    <p className="text-[13px] lg:text-[14px] text-white/50 leading-relaxed max-w-[500px]">
                      {svc.description}
                    </p>
                  </div>
                </div>

                {/* Arrow icon — rotates on hover */}
                <div
                  className="shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center transition-all duration-400"
                  style={{
                    borderColor:
                      activeIdx === i
                        ? `${svc.accent}60`
                        : "rgba(255,255,255,0.12)",
                    backgroundColor:
                      activeIdx === i ? `${svc.accent}15` : "transparent",
                    transform: activeIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color:
                        activeIdx === i
                          ? svc.accent
                          : "rgba(255,255,255,0.3)",
                      transition: "color 0.3s",
                    }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Bottom HR */}
              <div className="w-full h-px bg-white/[0.06]" />
            </div>
          ))}
        </div>

        {/* Right: Sticky Image Preview (desktop only) */}
        <div className="hidden lg:block w-[45%] sticky top-28 self-start">
          <div
            className="relative w-full overflow-hidden rounded-2xl lg:rounded-[28px]"
            style={{ aspectRatio: "4/5" }}
          >
            {/* Images stack — crossfade */}
            {SERVICES.map((svc, i) => (
              <div
                key={svc.index}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: i === activeIdx ? 1 : 0,
                  transform:
                    i === activeIdx ? "scale(1)" : "scale(1.04)",
                  zIndex: i === activeIdx ? 2 : i === prevIdx ? 1 : 0,
                }}
              >
                {/* Gradient bg (always shown) */}
                <div
                  className="absolute inset-0"
                  style={{ background: svc.imageGradient }}
                />

                {/* Actual webp image overlay */}
                {svc.imageSrc && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={svc.imageSrc}
                    alt={svc.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-30"
                    loading="lazy"
                  />
                )}

                {/* Large accent number watermark */}
                <div
                  className="absolute bottom-6 left-7 font-mono font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(80px, 14vw, 180px)",
                    color: `${svc.accent}18`,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {svc.index}
                </div>

                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3"
                    style={{ color: svc.accent }}
                  >
                    {svc.index} / {String(SERVICES.length).padStart(2, "0")}
                  </div>
                  <h4 className="text-white font-semibold text-[20px] lg:text-[24px] leading-tight mb-2">
                    {svc.title}
                  </h4>
                  <p className="text-white/55 text-[13px] leading-relaxed line-clamp-2">
                    {svc.description}
                  </p>
                </div>

                {/* Top-right accent dot */}
                <div
                  className="absolute top-5 right-5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: svc.accent }}
                />
              </div>
            ))}

            {/* Animated progress dots */}
            <div className="absolute top-5 left-5 flex flex-col gap-1.5 z-10">
              {SERVICES.map((svc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleHover(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === activeIdx ? "24px" : "6px",
                    height: "6px",
                    backgroundColor:
                      i === activeIdx
                        ? svc.accent
                        : "rgba(255,255,255,0.25)",
                  }}
                  aria-label={`View ${svc.title}`}
                />
              ))}
            </div>
          </div>

          {/* Below image: CTA */}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-white/35 text-[13px] tracking-wide">
              Hover a discipline to explore
            </span>
            <a
              href="#expertise"
              className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors duration-200 group"
            >
              See full expertise
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile: Card grid (no sticky image needed) */}
        <div className="lg:hidden w-full grid grid-cols-1 gap-4 mt-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.index}
              className="rounded-2xl border border-white/[0.07] p-5 overflow-hidden relative"
              style={{ background: svc.imageGradient }}
            >
              <div
                className="text-[11px] font-mono tracking-widest mb-3"
                style={{ color: svc.accent }}
              >
                {svc.index}
              </div>
              <h3 className="text-white font-semibold text-[18px] leading-tight mb-3">
                {svc.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${svc.accent}40`,
                      color: svc.accent,
                      backgroundColor: `${svc.accent}10`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
