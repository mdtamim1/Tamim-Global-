"use client";

// ============================================================
// Tamim Global — Key Features with GSAP ScrollTrigger Sticky Scrub
// Exact 1:1 Match to neoleaf.bytetown.agency Section 6
// Features: 1900px sticky pinned scrub, accordion cards collapsing
// to tag bars, vertical sliding videos, and 3x3 dot matrix.
// ============================================================

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: 1,
    title: "Bespoke Web Design",
    tag: "UI / UX",
    text: "Custom-tailored digital flagships designed in Figma and coded from scratch. Zero generic templates, zero bloated code — only pure aesthetic precision and high conversion.",
    video: "/video/features/1.mp4",
    dots: [
      false, true, true,
      false, true, false,
      true, false, true,
    ],
  },
  {
    id: 2,
    title: "Cinematic Video Editing",
    tag: "Video & Motion",
    text: "Rhythm-matched cuts, commercial pacing, sound-designed soundscapes, and cinematic color grading in Premiere Pro and DaVinci that stop the scroll.",
    video: "/video/features/2.mp4",
    dots: [
      true, false, true,
      false, false, false,
      true, false, true,
    ],
  },
  {
    id: 3,
    title: "Interactive Motion & 3D",
    tag: "GSAP & WebGL",
    text: "Scroll-driven GSAP motion, WebGL particle shaders, and sub-second page loads powered by Next.js 15 on globally distributed edge networks.",
    video: "/video/features/3.mp4",
    dots: [
      false, true, true,
      true, false, true,
      true, true, false,
    ],
  },
];

export default function NeoFeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !videoContainerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const container = containerRef.current!;
      const videoContainer = videoContainerRef.current!;
      const cardsWrap = cardsRef.current!;
      const videos = videoContainer.querySelectorAll<HTMLVideoElement>("video");
      const cards = cardsWrap.querySelectorAll<HTMLElement>(".feature-card");

      const scrubDistance = 1900;
      gsap.set(section, { minHeight: `${container.offsetHeight + scrubDistance}px` });
      gsap.set(container, { position: "sticky", top: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrubDistance}`,
          scrub: 1,
        },
      });

      const containerRect = container.getBoundingClientRect();
      const videoHeight = videoContainer.offsetHeight;

      cards.forEach((card, idx) => {
        const title = card.querySelector<HTMLElement>(".feature-card-title");
        const text = card.querySelector<HTMLElement>(".feature-card-text");
        const tag = card.querySelector<HTMLElement>(".feature-card-tag");
        const dots = card.querySelector<HTMLElement>(".feature-card-dots");
        const currVideo = videos[idx];
        const prevVideo = videos[idx - 1];

        const cardRect = card.getBoundingClientRect();
        const style = window.getComputedStyle(card);
        const pt = parseInt(style.paddingTop, 10) || 32;
        const pb = parseInt(style.paddingBottom, 10) || 32;
        const tagH = tag?.offsetHeight || 44;
        const dotsH = dots?.offsetHeight || 52;
        const collapsedHeight = Math.max(tagH, dotsH) + pt + pb;

        if (idx > 0) {
          tl.from(
            card,
            {
              y: window.innerHeight - Math.abs(cardRect.top - containerRect.top) + 100,
              ease: "none",
            },
            `step-${idx}`
          );

          if (prevVideo && currVideo) {
            tl.to(
              prevVideo,
              {
                duration: 0.25,
                y: "-=100px",
                scale: 1.1,
                opacity: 0,
                ease: "none",
              },
              `step-${idx}`
            );
            tl.to(
              currVideo,
              {
                duration: 0.25,
                y: -videoHeight,
                ease: "none",
              },
              `step-${idx}`
            );
          }
        }

        // Collapse previous cards so subsequent cards can stack
        if (idx < cards.length - 1) {
          tl.to(
            card,
            {
              height: collapsedHeight,
              ease: "none",
            },
            `+=0.25`
          );
          if (title) tl.to(title, { duration: 0.35, opacity: 0, ease: "none" }, "<");
          if (text) tl.to(text, { duration: 0.35, opacity: 0, ease: "none" }, "<");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-20 lg:mt-[-100px]"
      id="features"
    >
      {/* Sticky Pinned Viewport Container */}
      <div
        ref={containerRef}
        className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 gap-y-4 pt-20 lg:gap-y-8 lg:pt-[100px] bg-[#030209]"
      >
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 lg:gap-3 col-span-full md:col-span-2 lg:col-span-5 lg:-mr-6">
          <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
            Key Capabilities
          </div>
          <h2
            className="text-h2-d lg:text-h2 font-semibold text-white"
            id="title-features"
          >
            The craft behind every project
          </h2>
        </div>

        {/* Video Stage (Left) — 3 Videos Stacked Vertically */}
        <div
          ref={videoContainerRef}
          className="relative col-span-full aspect-[320/274] overflow-hidden rounded-2xl md:col-span-2 md:row-start-2 lg:col-span-5 lg:-mr-6 lg:aspect-[560/481] lg:rounded-[28px] bg-bg-black shadow-2xl"
        >
          {/* Video 1: starts visible */}
          <video
            className="size-full object-cover rounded-[inherit] absolute inset-0 z-10"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/video/features/1.mp4" type="video/mp4" />
          </video>
          {/* Video 2: positioned top-full */}
          <video
            className="size-full object-cover rounded-[inherit] absolute left-0 top-full z-20"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/video/features/2.mp4" type="video/mp4" />
          </video>
          {/* Video 3: positioned top-full */}
          <video
            className="size-full object-cover rounded-[inherit] absolute left-0 top-full z-30"
            playsInline
            autoPlay
            loop
            muted
          >
            <source src="/video/features/3.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Feature Cards Column (Right) */}
        <div
          ref={cardsRef}
          className="relative col-span-full flex flex-col gap-4 max-md:grid md:col-span-2 md:row-start-2 lg:col-span-6 lg:col-start-7 lg:gap-6"
        >
          {features.map((item, idx) => (
            <div
              key={item.id}
              className="relative z-0 flex gap-10 overflow-hidden rounded-3xl bg-bg-dark-gray px-6 py-8 text-white lg:rounded-[28px] lg:p-8 lg:pr-10 feature-card max-md:col-span-full max-md:row-start-1 shadow-2xl border border-white/5"
            >
              <div className="flex grow flex-col justify-end gap-2">
                <div className="text-h4-d font-semibold max-md:mb-6 lg:text-[44px] feature-card-title">
                  {item.title}
                </div>
                <div className="text-body-small-d lg:text-body-small text-text-light-gray mb-6 max-md:hidden lg:mb-12 feature-card-text">
                  {item.text}
                </div>
                <div className="text-body-d self-start rounded-[40px] bg-[#37393E] px-6 py-2 capitalize lg:text-[24px] lg:leading-[120%] feature-card-tag font-medium">
                  {item.tag}
                </div>
              </div>
              <div className="shrink-0 self-start lg:py-2 feature-card-dots">
                <div className="relative flex size-[52px] flex-wrap place-content-between gap-1 lg:size-[62px]">
                  {item.dots.map((isYellow, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`relative size-3 rounded-full lg:size-[14px] ${
                        isYellow ? "bg-[#E6F536]" : "bg-[#747577]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
