"use client";

// ============================================================
// Tamim Global – "Why Choose Me" Section
// 1:1 Oxnod.webflow.io "Why Choose Us" reverse-engineering
//
// Key animations (exactly matching Oxnod):
//  1. ENTRANCE: Two large images slide in from left & right edges
//     simultaneously when section enters viewport. They travel
//     from ±120vw to their resting position with a smooth
//     cubic-bezier ease. Triggered by IntersectionObserver.
//  2. CONTENT: Heading + reason cards fade + slide up (stagger)
//     after images land (350ms delay).
//  3. HOVER: Each reason card lifts with a soft white glow.
//  4. Layout: Left image | Center content | Right image
//     (on mobile: stacked, images become top/bottom banners)
// ============================================================

import { useEffect, useRef, useState } from "react";

interface Reason {
  index: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}

const REASONS: Reason[] = [
  {
    index: "01",
    title: "Full-Stack + Creative",
    body: "I write production-grade TypeScript by day and compose cinematic scores by night. No other freelancer ships code AND creates the soundtrack.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    index: "02",
    title: "100 / 100 Lighthouse",
    body: "Every app I ship scores perfect on Performance, Accessibility, Best Practices and SEO. Fast by default — not an afterthought.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    index: "03",
    title: "0ms Handoff Friction",
    body: "Figma → code → deploy in a single pipeline. I design, build, and ship — no back-and-forth with separate designers or developers.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    index: "04",
    title: "Cinematic Standard",
    body: "4K DCI, Hollywood LUTs, Rec.709 mastering. Video deliverables that feel like a studio production — engineered for retention and emotion.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
  },
  {
    index: "05",
    title: "Global, Async-First",
    body: "UTC+6, available for worldwide commissions. Detailed async updates, loom recordings, and documentation — your timezone is never a blocker.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    index: "06",
    title: "Obsessive Craft",
    body: "I re-render shaders until the light is right. I re-cut until the edit breathes. I re-write until the API is clean. Excellence is the minimum.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

// Image panel component (left or right)
function SideImage({
  side,
  triggered,
  delay = 0,
  imgSrc,
  gradient,
  label,
}: {
  side: "left" | "right";
  triggered: boolean;
  delay?: number;
  imgSrc: string;
  gradient: string;
  label: string;
}) {
  const fromX = side === "left" ? "-110%" : "110%";
  const toX = "0%";

  return (
    <div
      className="relative overflow-hidden rounded-2xl lg:rounded-[28px] w-full h-full"
      style={{
        transform: triggered ? `translateX(${toX})` : `translateX(${fromX})`,
        opacity: triggered ? 1 : 0,
        transition: triggered
          ? `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.6s ease ${delay}ms`
          : "none",
        willChange: "transform",
      }}
    >
      {/* Gradient bg */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Webp overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
        style={{ opacity: 0.25 }}
        loading="lazy"
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Gradient vignette toward center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            side === "left"
              ? "linear-gradient(to right, transparent 60%, #000000 100%)"
              : "linear-gradient(to left, transparent 60%, #000000 100%)",
        }}
      />

      {/* Label */}
      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function WhyChooseMeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          // Content appears 350ms after images start sliding in
          setTimeout(() => setContentVisible(true), 350);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-me"
      className="relative w-full overflow-hidden bg-[#000000] border-t border-white/[0.04]"
    >
      {/* ── Top image strip: two images fly in from sides ───── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 32vw, 440px)" }}>
        {/* Left image */}
        <div className="absolute left-0 top-0 bottom-0" style={{ width: "42%" }}>
          <SideImage
            side="left"
            triggered={triggered}
            delay={0}
            imgSrc="/neoleaf-media/1.fd43cba1.webp"
            gradient="linear-gradient(135deg, #0f0c1a 0%, #1e1440 50%, #0a0810 100%)"
            label="Full-Stack Engineering"
          />
        </div>

        {/* Center gap with section label */}
        <div
          className="absolute left-[42%] right-[42%] top-0 bottom-0 flex flex-col items-center justify-center z-10"
          style={{
            opacity: triggered ? 1 : 0,
            transition: "opacity 0.6s ease 500ms",
          }}
        >
          <span className="text-[10px] lg:text-[11px] font-semibold tracking-[0.22em] uppercase text-white/35 text-center whitespace-nowrap">
            WHY CHOOSE ME
          </span>
        </div>

        {/* Right image */}
        <div className="absolute right-0 top-0 bottom-0" style={{ width: "42%" }}>
          <SideImage
            side="right"
            triggered={triggered}
            delay={60}
            imgSrc="/neoleaf-media/3.eb2479f9.webp"
            gradient="linear-gradient(135deg, #1a0f00 0%, #3d2500 50%, #120800 100%)"
            label="Cinematic Craft"
          />
        </div>

        {/* Bottom gradient fade to section bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="px-5 md:px-10 lg:px-[60px] pb-20 lg:pb-[120px] pt-16 lg:pt-20">
        {/* Heading */}
        <div
          className="mb-14 lg:mb-16"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2
            className="text-[38px] md:text-[52px] lg:text-[72px] font-bold leading-[100%] tracking-tight text-white mb-5"
            style={{ fontFamily: "var(--font-onest)" }}
          >
            Why work with
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 40%, #a78bfa 100%)",
              }}
            >
              Tamim?
            </span>
          </h2>
          <p className="text-white/45 text-[15px] lg:text-[17px] leading-relaxed max-w-[520px]">
            Because most creatives are good at one thing. I am obsessively good at five — and they compound into something clients can&apos;t find anywhere else.
          </p>
        </div>

        {/* Reason grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {REASONS.map((r, i) => (
            <div
              key={r.index}
              className="group relative p-6 lg:p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.045] hover:border-white/[0.14] transition-all duration-400 cursor-default"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(28px) scale(0.98)",
                transition: `opacity 0.65s ease ${i * 70 + 400}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 70 + 400}ms, background-color 0.3s, border-color 0.3s`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, rgba(99,102,241,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Index + Icon row */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/25">
                  {r.index}
                </span>
                <div
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white/80 group-hover:border-white/20 transition-all duration-300"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {r.icon}
                </div>
              </div>

              {/* Thin divider */}
              <div className="w-8 h-px bg-white/10 mb-5 group-hover:w-16 group-hover:bg-indigo-500/50 transition-all duration-500" />

              {/* Title */}
              <h3 className="text-white font-semibold text-[17px] lg:text-[18px] leading-tight mb-3">
                {r.title}
              </h3>

              {/* Body */}
              <p className="text-white/45 text-[13px] lg:text-[14px] leading-relaxed">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stats strip */}
        <div
          className="mt-16 lg:mt-20 pt-10 border-t border-white/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-8"
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 0.8s ease 900ms",
          }}
        >
          {[
            { value: "100+", label: "Brand Identities", accent: "#6366f1" },
            { value: "50+", label: "Websites Shipped", accent: "#8b5cf6" },
            { value: "4M+", label: "Video Views", accent: "#f59e0b" },
            { value: "8Y", label: "Years of Craft", accent: "#10b981" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span
                className="text-[42px] lg:text-[52px] font-black leading-none tracking-tight"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </span>
              <span className="text-white/35 text-[13px] tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
