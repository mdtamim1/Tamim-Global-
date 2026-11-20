"use client";

// ============================================================
// Tamim Global — Mowa Studio 1:1 Architectural Hero Section
// Complete authentic replication of https://mowa.studio/
// - Procedural Three.js 3D MorphBlob Canvas with Simplex Noise
// - Vertical architectural guide grid lines (border-white/[0.05])
// - Fixed minimalist header: Brand Monogram + Dark/Light toggle
//   pill + WhatsApp/Audio action + Outline "get in touch" + Menu
// - 5-Column Mid-Level Alignment Grid with stacked center wordmark
//   over the 3D morphing blob + "view projects ↗" capsule
// - Bottom-left 4 square frosted glass metric cards (100+, 50+, 4M+, 8Y)
// - Manifesto statement with "more about me ↗"
// - Interactive floating action dock: [NEW] Full-Stack Edge ↗,
//   FAQ ↗, reviews ★, and royal blue "get in touch ↗"
// ============================================================

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Mowa3DBlobCanvas from "@/components/ui/Mowa3DBlobCanvas";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

export default function NeoHeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <>
      {/* Hidden Ambient Audio Player */}
      <audio ref={audioRef} src="/audio/bg.mp3" loop preload="none" />

      {/* Fixed Header / Top Navigation (1:1 Mowa Studio Header) */}
      <nav
        aria-label="Hauptnavigation"
        className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-5 md:px-10 py-5 md:py-6 transition-all duration-700 bg-transparent font-sans pointer-events-auto"
      >
        {/* Left: TG Monogram / Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          aria-label="Tamim Global Home"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 bg-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)]">
            <Image
              src="/images/tg-mark.jpg"
              alt="TG Monogram"
              width={40}
              height={40}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-medium text-sm tracking-tight hidden sm:inline-block">
            tamim.global
          </span>
        </Link>

        {/* Center: Segmented Darkmode / Lightmode Pill Toggle */}
        <div
          role="switch"
          aria-checked="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex rounded-full p-1 bg-white/[0.07] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] select-none"
        >
          <div className="relative flex items-center">
            {/* Active white pill highlight under darkmode */}
            <div className="absolute top-0 bottom-0 left-0 w-1/2 rounded-full bg-white shadow-sm transition-all duration-300" />
            <span className="relative z-10 px-4 md:px-5 py-1.5 text-[11px] md:text-xs font-semibold text-black tracking-wide">
              darkmode
            </span>
            <span className="relative z-10 px-4 md:px-5 py-1.5 text-[11px] md:text-xs font-normal text-white/50 tracking-wide cursor-not-allowed">
              lightmode
            </span>
          </div>
        </div>

        {/* Right Actions: Sound / Contact / Menu */}
        <div className="flex items-center gap-2.5 relative">
          {/* Sound / Ambient Audio Toggle Pill */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle ambient soundscape"
            className={`w-10 h-10 rounded-full border border-white/40 flex items-center justify-center transition-all duration-300 backdrop-blur-xl ${
              soundPlaying
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "text-white/80 hover:bg-white hover:text-black bg-transparent"
            }`}
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
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-300"
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
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </a>

          {/* Outline "get in touch" Pill */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white text-white text-[13px] font-normal backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-300"
          >
            get in touch
          </button>

          {/* "Menu" Pill with Arrow and Dropdown */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            className="inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-white/[0.12] hover:bg-white/[0.18] text-white text-[13px] backdrop-blur-2xl transition-all duration-300 shadow-sm"
          >
            <span>Menu</span>
            <div
              className={`w-7 h-7 rounded-full bg-white/[0.15] flex items-center justify-center transition-transform duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 203 203"
                fill="none"
                style={{ width: 10, height: 10, flexShrink: 0 }}
              >
                <path
                  d="M184.391 0H6.133C2.743 0 0 2.743 0 6.133V12.495C0 15.885 2.743 18.628 6.133 18.628H157.174C162.621 18.628 165.364 25.218 161.497 29.084L5.333 185.229C2.933 187.629 2.933 191.496 5.333 193.896L9.847 198.41C12.247 200.81 16.114 200.81 18.513 198.41L173.935 42.969C177.801 39.103 184.391 41.846 184.391 47.293V196.886C184.391 200.276 187.134 203.019 190.524 203.019H196.886C200.276 203.019 203.019 200.276 203.019 196.886V6.133C203.019 2.743 200.276 0 196.886 0H184.391Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </button>

          {/* Menu Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-[calc(100%+10px)] right-0 min-w-[220px] p-2 rounded-2xl bg-neutral-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-200">
              <a
                href="#products"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                Web Design &amp; Craft
                <span className="text-white/40">↗</span>
              </a>
              <a
                href="#expertise"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                Full-Stack Architecture
                <span className="text-white/40">↗</span>
              </a>
              <a
                href="#technology"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                Video &amp; Motion Lab
                <span className="text-white/40">↗</span>
              </a>
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                Music Composition
                <span className="text-white/40">↗</span>
              </a>
              <a
                href="#team"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                Collaborative Studio
                <span className="text-white/40">↗</span>
              </a>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl text-sm text-black font-semibold bg-accent-1 hover:bg-white transition-colors flex items-center justify-between text-left"
              >
                Start a Project
                <span>↗</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Hero Container */}
      <section
        id="hero"
        className="relative w-full min-h-[100dvh] bg-[#000000] text-white font-sans overflow-hidden flex flex-col justify-between"
      >
        {/* 1. Procedural 3D Three.js Simplex Morphing Blob Canvas */}
        <Mowa3DBlobCanvas />

        {/* 2. Vertical Architectural Column Guide Lines (6 Columns) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 pointer-events-none z-[2]"
        >
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full" />
          <div className="border-r border-white/[0.04] h-full hidden md:block" />
          <div className="border-r border-white/[0.04] h-full hidden md:block" />
          <div className="border-r border-white/[0.04] h-full hidden lg:block" />
          <div className="h-full hidden lg:block" />
        </div>

        {/* 3. Mid-Level 5-Column Alignment Grid (Centerpiece) */}
        <div className="relative z-10 w-full px-5 md:px-10 lg:px-12 pt-[clamp(110px,18vh,220px)] pb-[clamp(30px,5vh,60px)]">
          <div className="grid grid-cols-12 items-center gap-4 lg:gap-6">
            {/* Col 1: Far Left Skills */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 flex flex-col gap-1 text-[11px] sm:text-xs lg:text-[13px] text-white/90 leading-tight font-sans tracking-wide">
              <div>code</div>
              <div>architecture</div>
              <div>full-stack</div>
            </div>

            {/* Col 2: Left Inner Skills */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 lg:pl-6 flex flex-col gap-1 text-[11px] sm:text-xs lg:text-[13px] text-white/90 leading-tight font-sans tracking-wide">
              <div>web design</div>
              <div>ui/ux craft</div>
              <div>next.js 15</div>
            </div>

            {/* Col 3: Center Monolithic Wordmark directly over 3D Canvas */}
            <div className="col-span-12 lg:col-span-4 flex items-center justify-center my-4 lg:my-0">
              <div className="relative group cursor-pointer select-none">
                {/* Stylized Futuristic Stacked Wordmark matching Mowa Studio Monogram Proportions */}
                <svg
                  width="260"
                  height="220"
                  viewBox="0 0 240 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[clamp(140px,18vw,260px)] h-auto drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
                >
                  {/* Top Line: "ta" */}
                  <g className="transition-opacity duration-300">
                    {/* T stem & crossbar */}
                    <path
                      d="M20 20 H105 V34 H70 V100 H50 V34 H20 V20 Z"
                      fill="#FFFFFF"
                    />
                    {/* A geometric arch */}
                    <path
                      d="M130 100 L160 20 H180 L210 100 H188 L182 82 H158 L152 100 H130 Z M163 68 H177 L170 42 L163 68 Z"
                      fill="#FFFFFF"
                    />
                  </g>

                  {/* Bottom Line: "mim" */}
                  <g className="transition-opacity duration-300">
                    {/* M geometric glyph */}
                    <path
                      d="M20 180 V115 H38 L55 152 L72 115 H90 V180 H74 V142 L59 174 H51 L36 142 V180 H20 Z"
                      fill="#FFFFFF"
                    />
                    {/* I pillar with titanium dot */}
                    <path
                      d="M106 180 V128 H124 V180 H106 Z M106 120 V110 H124 V120 H106 Z"
                      fill="#FFFFFF"
                    />
                    {/* Second M geometric glyph */}
                    <path
                      d="M140 180 V115 H158 L175 152 L192 115 H210 V180 H194 V142 L179 174 H171 L156 142 V180 H140 Z"
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* Col 4: Right Inner Skills */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 lg:text-right flex flex-col gap-1 text-[11px] sm:text-xs lg:text-[13px] text-white/90 leading-tight font-sans tracking-wide">
              <div>video editor</div>
              <div>color grade</div>
              <div>cinema 4k</div>
            </div>

            {/* Col 5: Far Right Skills + Outline Button */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2 flex flex-col items-start lg:items-end gap-3.5 text-[11px] sm:text-xs lg:text-[13px] text-white/90 leading-tight font-sans tracking-wide">
              <div className="flex flex-col gap-1 lg:text-right">
                <div>music score</div>
                <div>sound design</div>
                <div>audio master</div>
              </div>

              {/* Mowa Studio Style Outline Project Capsule CTA */}
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white text-white text-[12px] sm:text-[13px] font-normal backdrop-blur-xl hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
              >
                <span>view projects</span>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 203 203"
                  fill="none"
                  style={{ width: 8, height: 8, flexShrink: 0 }}
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

        {/* 4. Bottom Area (1:1 Mowa Studio Glass Metrics + Manifesto + Action Dock) */}
        <div className="relative z-10 w-full px-5 md:px-10 lg:px-12 pb-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Column: 4 Frosted Cards + Manifesto + Dock Pills */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Row of 4 Square Frosted Glass Metric Cards */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {/* Metric 1 */}
                <div className="aspect-square w-[72px] sm:w-[84px] md:w-[92px] rounded-[18px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-default shadow-lg">
                  <span className="text-[20px] sm:text-[24px] md:text-[26px] font-normal text-white leading-none">
                    100+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/50 mt-1 tracking-wider whitespace-nowrap">
                    Identities
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="aspect-square w-[72px] sm:w-[84px] md:w-[92px] rounded-[18px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-default shadow-lg">
                  <span className="text-[20px] sm:text-[24px] md:text-[26px] font-normal text-white leading-none">
                    50+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/50 mt-1 tracking-wider whitespace-nowrap">
                    Websites
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="aspect-square w-[72px] sm:w-[84px] md:w-[92px] rounded-[18px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-default shadow-lg">
                  <span className="text-[20px] sm:text-[24px] md:text-[26px] font-normal text-white leading-none">
                    4M+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/50 mt-1 tracking-wider whitespace-nowrap">
                    Video Views
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="aspect-square w-[72px] sm:w-[84px] md:w-[92px] rounded-[18px] bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-default shadow-lg">
                  <span className="text-[20px] sm:text-[24px] md:text-[26px] font-normal text-white leading-none">
                    8Y
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/50 mt-1 tracking-wider whitespace-nowrap">
                    Experience
                  </span>
                </div>
              </div>

              {/* Manifesto Heading Text */}
              <h1 className="text-[13px] sm:text-[15px] md:text-[17px] font-normal text-white/90 leading-relaxed max-w-[620px] mt-1">
                &nbsp;&nbsp;&nbsp;I engineer bespoke digital flagships, cinematic
                video narratives, and original soundscapes for ambitious brands
                worldwide: code with mathematical precision, motion with rhythm,
                and experiences engineered to lead.
              </h1>

              {/* "more about me" link */}
              <div>
                <a
                  href="#expertise"
                  className="text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors"
                >
                  more about me
                </a>
              </div>

              {/* Interactive Floating Action Dock */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-3">
                {/* Pill 1: [NEW] Full-Stack Edge */}
                <a
                  href="#expertise"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-white/40 hover:border-white bg-transparent hover:bg-white/10 text-white text-[12px] sm:text-[13px] backdrop-blur-xl transition-all duration-300"
                >
                  <span className="px-1.5 py-0.5 rounded-full bg-[#000dff] text-white text-[9px] font-bold tracking-wider">
                    NEW
                  </span>
                  <span>Full-Stack Edge</span>
                  <span className="text-white/60">↗</span>
                </a>

                {/* Pill 2: FAQ */}
                <a
                  href="#technology"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-white/40 hover:border-white bg-transparent hover:bg-white/10 text-white text-[12px] sm:text-[13px] backdrop-blur-xl transition-all duration-300"
                >
                  <span>FAQ</span>
                  <span className="text-white/60">↗</span>
                </a>

                {/* Pill 3: Reviews */}
                <a
                  href="#team"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border border-white/40 hover:border-white bg-transparent hover:bg-white/10 text-white text-[12px] sm:text-[13px] backdrop-blur-xl transition-all duration-300"
                >
                  <span>reviews</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-amber-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </a>

                {/* Pill 4: Royal Blue "get in touch" Pill */}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  style={{ backgroundColor: "#000dff", color: "#ffffff" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#000dff] hover:bg-[#1a2aff] text-white text-[12px] sm:text-[13px] font-medium shadow-[0_4px_20px_rgba(0,13,255,0.4)] hover:shadow-[0_4px_28px_rgba(0,13,255,0.6)] transition-all duration-300"
                >
                  <span>get in touch</span>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 203 203"
                    fill="none"
                    style={{ width: 8, height: 8, flexShrink: 0 }}
                  >
                    <path
                      d="M184.391 0H6.133C2.743 0 0 2.743 0 6.133V12.495C0 15.885 2.743 18.628 6.133 18.628H157.174C162.621 18.628 165.364 25.218 161.497 29.084L5.333 185.229C2.933 187.629 2.933 191.496 5.333 193.896L9.847 198.41C12.247 200.81 16.114 200.81 18.513 198.41L173.935 42.969C177.801 39.103 184.391 41.846 184.391 47.293V196.886C184.391 200.276 187.134 203.019 190.524 203.019H196.886C200.276 203.019 203.019 200.276 203.019 196.886V6.133C203.019 2.743 200.276 0 196.886 0H184.391Z"
                      fill="#fff"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Status & Ambient Equalizer Pill */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-2">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-xl text-white/80 text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-wide">
                  AVAILABLE FOR GLOBAL COMMISSIONS
                </span>
              </div>
              <div className="text-[11px] text-white/40 tracking-wider">
                DHAKA &amp; WORLDWIDE · UTC+6
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
