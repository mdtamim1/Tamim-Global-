"use client";

// ============================================================
// Tamim Global — Team / Studio Showcase
// Exact 1:1 Match to neoleaf.bytetown.agency Section 7
// Features: Undulating 3D canvas particle wave grid in background,
// GSAP ScrollTrigger counter-scrubbing tickers, and discover CTA.
// ============================================================

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

const tickerRow1 = ["web design", "video editor", "ui/ux", "motion graphics", "figma", "premiere pro", "after effects", "next.js", "davinci", "web design"];
const tickerRow2 = ["creative director", "cinematic", "visual storyteller", "sound design", "color grade", "responsive", "3d web", "keyframes", "creative director", "cinematic"];

function TickerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[40px]"
    >
      <path
        fill="#ECECF7"
        d="M4 4h16c8.837 0 16 7.163 16 16H20C11.163 20 4 12.837 4 4"
      />
      <path
        fill="#DED7FA"
        d="M4 20h16c8.837 0 16 7.163 16 16H20c-8.837 0-16-7.163-16-16"
      />
    </svg>
  );
}

// 3D Sine Wave Particle Canvas (Exact NeoLeaf Section 7 background)
function ParticleWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 55;
    const rows = 28;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.65;
      const spacingX = canvas.width / cols;
      const spacingY = 14;

      for (let r = 0; r < rows; r++) {
        const perspective = 0.5 + (r / rows) * 0.9;
        const alpha = Math.min(1, Math.max(0.08, (r / rows) * 0.35));
        ctx.fillStyle = `rgba(180, 180, 185, ${alpha})`;

        for (let c = 0; c < cols; c++) {
          const x = (c - cols / 2) * spacingX * perspective + cx;
          const wave = Math.sin(c * 0.2 + time) * Math.cos(r * 0.2 + time * 0.8) * 22;
          const y = cy + (r - rows / 2) * spacingY * perspective + wave;

          const radius = (1 + (r / rows) * 1.8) * perspective;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full pointer-events-none select-none -z-10"
    />
  );
}

export default function NeoTeamSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    if (!section || !r1 || !r2) return;

    // Exact NeoLeaf counter-scrolling tickers driven by scroll wheel scrub
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      tl.to(r1, { x: -380, ease: "none" }, 0);
      tl.to(r2, { x: 380, ease: "none" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full px-5 md:px-10 lg:px-[60px] min-h-fs relative z-0 flex flex-col items-center justify-center gap-3 pb-[142px] pt-20 text-center lg:gap-4 lg:pb-[160px] lg:pt-[180px] overflow-hidden bg-[#030209]"
      >
        {/* Real Undulating 3D Particle Wave Canvas */}
        <ParticleWaveCanvas />

        {/* Main Content */}
        <h2 className="text-h2-d font-semibold w-full max-w-[732px] will-change-transform lg:max-w-[796px] lg:px-8 lg:text-h1 text-white z-10">
          Meet Tamim — Web Designer &amp; Video Editor
        </h2>
        <p className="text-body-d lg:text-body text-white/60 w-full max-w-[660px] z-10">
          I combine modern web design aesthetics, fluid frontend interactions, and
          cinematic video editing into a single unified creative force. Working with
          founders, creators, and agencies worldwide to ship digital flagships and videos
          that command authority.
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="group relative z-10 inline-flex shrink-0 cursor-pointer appearance-none justify-center whitespace-nowrap rounded-none border-0 p-0 text-center font-medium tracking-normal no-underline shadow-none transition-colors disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 h-12 items-stretch gap-0 text-[16px] leading-[130%] text-text-black lg:h-[52px] lg:text-button mt-4 max-md:w-full lg:mt-5"
        >
          <span className="inline-flex items-center justify-center relative h-full grow overflow-hidden rounded-[100px] bg-accent-1 px-10 transition-colors lg:group-hover:bg-accent-3 font-semibold">
            Let’s Talk!
          </span>
          <span className="relative flex shrink-0 items-center justify-center overflow-hidden aspect-square h-full rounded-full bg-accent-1 lg:transition-colors lg:group-hover:bg-accent-3">
            <span
              className="max-lg:hidden lg:absolute lg:inset-0 lg:m-auto lg:flex lg:size-full lg:translate-y-full lg:items-center lg:justify-center lg:transition-transform lg:group-hover:translate-y-0 lg:group-hover:duration-700"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 28 28"
                className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[28px]"
              >
                <path
                  fill="currentColor"
                  d="m22.707 13.293-7-7a1 1 0 0 0-1.497 1.32l.083.094L19.586 13H6a1 1 0 0 0-.993.883L5 14a1 1 0 0 0 .883.993L6 15h13.586l-5.293 5.293a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083 7-7 .097-.112.071-.11.054-.114.035-.105.025-.117.007-.06.004-.108-.004-.07-.016-.112-.03-.111-.044-.111-.052-.098-.067-.096a1 1 0 0 0-.08-.09l-7-7z"
                />
              </svg>
            </span>
            <span className="flex size-full items-center justify-center lg:transition-transform lg:group-hover:-translate-y-full lg:group-hover:duration-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 28 28"
                className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[28px]"
              >
                <path
                  fill="currentColor"
                  d="m22.707 13.293-7-7a1 1 0 0 0-1.497 1.32l.083.094L19.586 13H6a1 1 0 0 0-.993.883L5 14a1 1 0 0 0 .883.993L6 15h13.586l-5.293 5.293a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083 7-7 .097-.112.071-.11.054-.114.035-.105.025-.117.007-.06.004-.108-.004-.07-.016-.112-.03-.111-.044-.111-.052-.098-.067-.096a1 1 0 0 0-.08-.09l-7-7z"
                />
              </svg>
            </span>
          </span>
        </button>

        {/* Ambient Counter-Moving Tickers Driven by GSAP Scroll Scrub */}
        <div
          className="max-lg:hidden lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:-z-10 lg:mt-[-96px] lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-6 lg:overflow-hidden lg:text-text-gray opacity-35 pointer-events-none select-none"
          aria-hidden="true"
        >
          <div
            ref={row1Ref}
            className="lg:flex lg:shrink-0 lg:items-center lg:justify-end lg:gap-6 whitespace-nowrap will-change-transform"
          >
            {tickerRow1.map((word, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <TickerIcon />
                <span className="text-h3-d lg:text-h3 font-medium lowercase">
                  {word}
                </span>
              </span>
            ))}
          </div>
          <div
            ref={row2Ref}
            className="lg:flex lg:shrink-0 lg:items-center lg:gap-6 whitespace-nowrap will-change-transform"
          >
            {tickerRow2.map((word, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <TickerIcon />
                <span className="text-h3-d lg:text-h3 font-medium lowercase">
                  {word}
                </span>
              </span>
            ))}
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
