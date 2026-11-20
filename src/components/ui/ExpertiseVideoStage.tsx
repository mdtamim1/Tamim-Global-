"use client";

// ============================================================
// Tamim Global — Expertise Cinematic Video Stage
// Ultra-Luxury Studio Showcase displaying real 4K video clips,
// audio spectrum telemetry, and cinema grading overlays for
// each of the 5 disciplines.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  activeTab: number;
}

const tabConfigs = [
  {
    video: "/video/features/1.mp4",
    label: "FULL-STACK CLUSTER",
    badge: "100/100 LIGHTHOUSE",
    specs: "TypeScript 5.8 · Next.js 15 · Edge Gateway",
    color: "#7C3AED",
  },
  {
    video: "/video/product-image-generation.mp4",
    label: "BESPOKE WEB & UI/UX",
    badge: "60 FPS INTERACTION",
    specs: "Figma Master · Design System · Zero Templates",
    color: "#00F0FF",
  },
  {
    video: "/video/features/2.mp4",
    label: "CINEMATIC POST-PRODUCTION",
    badge: "4K UHD CINEMA",
    specs: "DaVinci Studio · Hollywood Grade · Rec.709 Master",
    color: "#E6F536",
  },
  {
    video: "/video/features/3.mp4",
    label: "ORIGINAL MUSIC COMPOSITION",
    badge: "48kHz 24-BIT STEREO",
    specs: "Ableton Live · Bespoke Score · Spatial Audio",
    color: "#FF3FBF",
  },
  {
    video: "/video/intro.mp4",
    label: "INTERACTIVE MOTION & 3D",
    badge: "120Hz FLUIDITY",
    specs: "Three.js WebGL · GSAP ScrollTrigger · Shaders",
    color: "#7C3AED",
  },
];

export default function ExpertiseVideoStage({ activeTab }: Props) {
  const current = tabConfigs[activeTab] || tabConfigs[0];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [timecode, setTimecode] = useState("00:01:24:18");

  useEffect(() => {
    const id = setInterval(() => {
      const sec = Math.floor(Date.now() / 1000) % 60;
      const frame = Math.floor((Date.now() / 40) % 30);
      setTimecode(
        `00:0${Math.floor(sec / 10)}:${sec % 60}:${frame < 10 ? "0" + frame : frame}`
      );
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full aspect-[320/274] lg:aspect-[560/481] rounded-2xl lg:rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_60px_rgba(124,58,237,0.18)] select-none flex items-center justify-center">
      {/* Background Ambient Relief Texture from NeoLeaf */}
      <Image
        alt="Ambient Background"
        src="/neoleaf-media/bg.7173f725.webp"
        fill
        className="object-cover opacity-40 pointer-events-none select-none max-lg:hidden"
      />
      <Image
        alt="Ambient Background"
        src="/neoleaf-media/bg-d.fb84fa4c.webp"
        fill
        className="object-cover opacity-40 pointer-events-none select-none lg:hidden"
      />

      {/* Volumetric Sweeping Light Beam from NeoLeaf */}
      <div className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden max-lg:hidden opacity-70">
        <Image
          alt="Light Effect"
          src="/neoleaf-media/light.53a4274a.webp"
          width={955}
          height={814}
          className="absolute left-0 top-0 w-[176.5%] max-w-none translate-x-[22%] translate-y-[44%]"
        />
      </div>

      {/* Dynamic Radial Color Glow behind the Cinema Window */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${current.color}35 0%, rgba(0,0,0,0) 70%)`,
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-10 pointer-events-none blur-3xl opacity-80"
      />

      {/* Pro Cinema Monitor Frame */}
      <div className="relative z-20 w-[90%] h-[88%] rounded-2xl overflow-hidden bg-black/90 border border-white/15 shadow-2xl flex flex-col backdrop-blur-md">
        {/* Studio Top Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/60 text-[10px] font-mono tracking-wider text-white/70">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-semibold">{current.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/40 hidden sm:inline">{timecode}</span>
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{
                backgroundColor: `${current.color}20`,
                color: current.color,
                border: `1px solid ${current.color}40`,
              }}
            >
              {current.badge}
            </span>
          </div>
        </div>

        {/* Video Viewport */}
        <div className="relative grow w-full overflow-hidden bg-black flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.video
              key={current.video}
              ref={videoRef}
              src={current.video}
              autoPlay
              loop
              muted
              playsInline
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="size-full object-cover"
            />
          </AnimatePresence>

          {/* Cinema Framing Letterbox Bars */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/90 to-transparent" />

          {/* Sub-pixel Crosshair Center Marker */}
          <div className="pointer-events-none absolute size-6 border border-white/20 rounded-full flex items-center justify-center opacity-60">
            <div className="size-1 rounded-full bg-accent-1" />
          </div>
        </div>

        {/* Studio Bottom Telemetry Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 border-t border-white/10 bg-black/75 text-[10px] font-mono text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-accent-1">PRO RES</span>
            <span className="text-white/30">•</span>
            <span className="truncate max-w-[200px] sm:max-w-none text-white/80">
              {current.specs}
            </span>
          </div>

          {/* Audio EQ Waveform Mini Bar */}
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-accent-1 animate-[pulse_0.4s_infinite] h-2 rounded" />
            <span className="w-0.5 bg-accent-1 animate-[pulse_0.7s_infinite] h-3 rounded" />
            <span className="w-0.5 bg-accent-1 animate-[pulse_0.5s_infinite] h-1.5 rounded" />
            <span className="w-0.5 bg-accent-1 animate-[pulse_0.8s_infinite] h-2.5 rounded" />
            <span className="w-0.5 bg-accent-1 animate-[pulse_0.6s_infinite] h-3 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
