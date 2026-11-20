"use client";

// ============================================================
// Tamim Global — Expertise Device Showcase
// Ultra-Luxury Titanium Studio Device with Live Interactive
// Screens for 5 Disciplines: Full-Stack, Web/UI, Cinema Video,
// Music Composition, and Motion 3D.
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code2,
  Cpu,
  Layers,
  Palette,
  Film,
  Play,
  Volume2,
  Music,
  Sliders,
  Sparkles,
  Zap,
  CheckCircle2,
  Activity,
  Radio,
} from "lucide-react";

interface Props {
  activeTab: number;
}

// ------------------------------------------------------------
// Screen 0: Full-Stack Dev (Dark Terminal & API Cluster)
// ------------------------------------------------------------
function FullStackScreen() {
  const [logs, setLogs] = useState([
    { type: "ok", text: "[200 OK] GET /api/v2/clusters (1.4ms)" },
    { type: "ok", text: "[200 OK] POST /api/v2/mutate (3.2ms)" },
    { type: "ok", text: "[101 UP] wss://gateway.edge:443 connected" },
    { type: "stat", text: "✓ Edge replicas: 38 global regions active" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const ping = (Math.random() * 2 + 1).toFixed(1);
      const newLog = {
        type: "ok",
        text: `[200 OK] GET /api/v2/telemetry (${ping}ms)`,
      };
      setLogs((prev) => [...prev.slice(-3), newLog]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="size-full flex flex-col justify-between p-4 font-mono text-[11px] leading-relaxed bg-[#06040e] text-white/90 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#ff5f56]" />
          <span className="size-2 rounded-full bg-[#ffbd2e]" />
          <span className="size-2 rounded-full bg-[#27c93f]" />
          <span className="text-[10px] text-white/40 ml-2">tamim@edge-node:~/prod</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-semibold">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
          ONLINE 99.99%
        </span>
      </div>

      {/* Code Snippet */}
      <div className="my-2 p-2.5 rounded-lg bg-black/60 border border-white/5 space-y-1 text-[10px]">
        <div className="text-white/40">// Zero-latency API architecture</div>
        <div>
          <span className="text-accent-2">export const</span>{" "}
          <span className="text-accent-1">runtime</span> ={" "}
          <span className="text-cyan-400">&apos;edge&apos;</span>;
        </div>
        <div>
          <span className="text-accent-2">const</span> cluster ={" "}
          <span className="text-cyan-300">initPrismaCluster</span>({"{"}
        </div>
        <div className="pl-3 text-white/70">
          cache: <span className="text-amber-300">&apos;redis-global&apos;</span>,
          latencyTarget: <span className="text-emerald-400">&apos;&lt;5ms&apos;</span>,
        </div>
        <div>{"});"}</div>
      </div>

      {/* Terminal Live Logs */}
      <div className="space-y-1 bg-black/40 p-2 rounded border border-white/5 text-[9.5px]">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-1.5 text-white/80">
            <span className="text-emerald-400">➜</span>
            <span>{log.text}</span>
          </div>
        ))}
      </div>

      {/* Cluster Metrics Footer */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-[9px] text-white/50">
        <div>
          <span className="text-white/30 block">CPU LOAD</span>
          <span className="text-accent-1 font-bold">14.2%</span>
        </div>
        <div>
          <span className="text-white/30 block">TTFB</span>
          <span className="text-emerald-400 font-bold">4.8ms</span>
        </div>
        <div>
          <span className="text-white/30 block">LIGHTHOUSE</span>
          <span className="text-cyan-400 font-bold">100 / 100</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Screen 1: Web & UI/UX (Figma to Code Design System)
// ------------------------------------------------------------
function WebDesignScreen() {
  const [activeChip, setActiveChip] = useState(0);

  return (
    <div className="size-full flex flex-col justify-between p-4 bg-[#080514] text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Palette className="size-3.5 text-accent-1" />
          <span className="text-xs font-semibold tracking-wide">Tamim Design System</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-1/10 text-accent-1 font-mono">
          v4.2 PRO
        </span>
      </div>

      {/* Interactive UI Component Preview */}
      <div className="my-2 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-white/90">Bespoke Glass Card</span>
          <div className="flex gap-1">
            {["#030209", "#E6F536", "#7C3AED", "#00F0FF"].map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveChip(i)}
                className={`size-3 rounded-full border transition-all ${
                  activeChip === i ? "scale-125 border-white ring-2 ring-white/30" : "border-white/30"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Live Typography Specimen */}
        <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1">
          <div className="text-[10px] text-white/40 uppercase font-mono">Typography Scale</div>
          <div className="text-base font-extrabold tracking-tight text-white flex items-center justify-between">
            <span>60 FPS Fluidity</span>
            <span className="text-[10px] text-accent-2 font-mono font-normal">Clash Display</span>
          </div>
          <p className="text-[10px] text-white/60 leading-tight">
            Pixel-perfect responsive micro-interactions crafted from Figma directly to Next.js.
          </p>
        </div>

        {/* Micro Toggle Controls */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-white/60">Sub-pixel Anti-aliasing</span>
          <div className="w-8 h-4 rounded-full bg-accent-1 p-0.5 flex justify-end">
            <div className="size-3 rounded-full bg-black shadow-sm" />
          </div>
        </div>
      </div>

      {/* Grid Specs Footer */}
      <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/5">
        <span>GRID: 12-COL 8PT</span>
        <span className="text-emerald-400">AA+ ACCESSIBLE</span>
        <span>FIDELITY: 100%</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Screen 2: Cinematic Video (DaVinci/Premiere Cinema Monitor)
// ------------------------------------------------------------
function VideoEditingScreen() {
  const [playhead, setPlayhead] = useState(25);

  useEffect(() => {
    const id = setInterval(() => {
      setPlayhead((p) => (p >= 95 ? 5 : p + 2.5));
    }, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="size-full flex flex-col justify-between p-3.5 bg-[#05030c] text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Film className="size-3.5 text-accent-1" />
          <span className="text-xs font-semibold">Cinema Grade 4K DCI</span>
        </div>
        <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold">
          <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
          REC 00:04:18:22
        </span>
      </div>

      {/* Viewport Monitor with Scope */}
      <div className="relative my-2 aspect-[16/9] w-full rounded-lg bg-black overflow-hidden border border-white/10 flex items-center justify-center">
        {/* Cinematic Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/60 via-black to-cyan-900/40" />

        {/* Framing Guides */}
        <div className="absolute inset-x-0 top-0 h-2 bg-black/80" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-black/80" />
        <div className="absolute size-8 border border-white/20 rounded-full flex items-center justify-center">
          <div className="size-1 rounded-full bg-accent-1" />
        </div>

        {/* Floating Scopes */}
        <div className="absolute bottom-3 left-3 text-[9px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
          LUT: Hollywood Teal &amp; Orange
        </div>
        <div className="absolute top-3 right-3 text-[9px] font-mono text-accent-1 bg-black/60 px-2 py-0.5 rounded">
          4K UHD 60fps
        </div>
      </div>

      {/* Timeline with Tracks */}
      <div className="p-2 rounded-lg bg-black/60 border border-white/5 space-y-1 text-[9px] font-mono">
        <div className="relative h-4 bg-white/5 rounded overflow-hidden flex items-center">
          <div className="h-full bg-cyan-500/30 w-3/4 rounded-l px-2 flex items-center text-cyan-300">
            V1: Commercial_Master_Cut.mov
          </div>
          {/* Animated Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ff0000] z-10"
            style={{ left: `${playhead}%` }}
          />
        </div>
        <div className="relative h-4 bg-white/5 rounded overflow-hidden flex items-center">
          <div className="h-full bg-accent-2/30 w-5/6 rounded-l px-2 flex items-center text-accent-2">
            A1: Stereo_Master_SoundDesign.wav
          </div>
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_#ff0000] z-10"
            style={{ left: `${playhead}%` }}
          />
        </div>
      </div>

      {/* Audio Decibel Meters */}
      <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/5">
        <span>CH 1: -6.2 dB</span>
        <span className="text-accent-1 font-bold">TRUE PEAK: -0.1 dBTP</span>
        <span>CH 2: -6.4 dB</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Screen 3: Music Composition (Ableton/Logic DAW Synthesizer)
// ------------------------------------------------------------
function MusicCompositionScreen() {
  const [bars, setBars] = useState([
    12, 28, 45, 62, 78, 54, 88, 95, 72, 60, 84, 91, 55, 42, 68, 77, 63, 49,
    35, 20,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(
        Array.from({ length: 20 }, () => Math.floor(Math.random() * 80 + 15))
      );
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="size-full flex flex-col justify-between p-3.5 bg-[#060410] text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Music className="size-3.5 text-accent-1" />
          <span className="text-xs font-semibold">Ableton Master Engine</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-2/20 text-accent-2 font-bold">
          128.0 BPM · 48kHz
        </span>
      </div>

      {/* 20-Band Frequency Spectrum Visualizer */}
      <div className="my-2 p-3 rounded-xl bg-black/60 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-mono text-white/40">
          <span>SPECTRUM ANALYZER</span>
          <span className="text-emerald-400">LUFS: -14.1 (STREAMING READY)</span>
        </div>

        <div className="flex items-end justify-between h-20 gap-1 px-1">
          {bars.map((height, i) => {
            const isHigh = height > 70;
            return (
              <div
                key={i}
                className="w-full rounded-t transition-all duration-150"
                style={{
                  height: `${height}%`,
                  backgroundColor: isHigh
                    ? "#E6F536"
                    : i % 2 === 0
                    ? "#7C3AED"
                    : "#00F0FF",
                  boxShadow: isHigh
                    ? "0 0 10px rgba(230,245,54,0.6)"
                    : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Synth Rotary Knobs */}
      <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-mono">
        <div className="p-1.5 rounded bg-white/5 border border-white/5">
          <div className="text-accent-1 font-bold text-xs">84 Hz</div>
          <div className="text-white/40 text-[8px]">SUB BASS</div>
        </div>
        <div className="p-1.5 rounded bg-white/5 border border-white/5">
          <div className="text-accent-2 font-bold text-xs">2.4 kHz</div>
          <div className="text-white/40 text-[8px]">AIR EQ</div>
        </div>
        <div className="p-1.5 rounded bg-white/5 border border-white/5">
          <div className="text-cyan-400 font-bold text-xs">38%</div>
          <div className="text-white/40 text-[8px]">REVERB</div>
        </div>
        <div className="p-1.5 rounded bg-white/5 border border-white/5">
          <div className="text-emerald-400 font-bold text-xs">+0.2dB</div>
          <div className="text-white/40 text-[8px]">MASTER</div>
        </div>
      </div>

      {/* Footer Specs */}
      <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/5">
        <span>LOSSLESS STEREO MASTER</span>
        <span className="text-accent-1">60+ COMPOSITIONS</span>
        <span>24-BIT / 48kHz</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Screen 4: Motion & 3D (WebGL Shaders & Gravity Particles)
// ------------------------------------------------------------
function Motion3DScreen() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 55;

      // Draw spinning 3D Wireframe Torus / Ring nodes
      const points = 16;
      const ringCoords: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < points; i++) {
        const theta = (i / points) * Math.PI * 2 + angle;
        const x3d = Math.cos(theta) * radius;
        const z3d = Math.sin(theta) * radius;
        const y3d = Math.sin(theta * 2 + angle * 2) * 22;

        const fov = 160;
        const scale = fov / (fov + z3d);
        const x2d = cx + x3d * scale;
        const y2d = cy + y3d * scale;

        ringCoords.push({ x: x2d, y: y2d, z: z3d });
      }

      // Connect lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(124, 58, 237, 0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i < ringCoords.length; i++) {
        const next = ringCoords[(i + 1) % ringCoords.length];
        ctx.moveTo(ringCoords[i].x, ringCoords[i].y);
        ctx.lineTo(next.x, next.y);
      }
      ctx.stroke();

      // Draw nodes with neon glow
      ringCoords.forEach((p, idx) => {
        const isAccent = idx % 3 === 0;
        ctx.fillStyle = isAccent ? "#E6F536" : "#00F0FF";
        ctx.shadowColor = isAccent ? "#E6F536" : "#00F0FF";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isAccent ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="size-full flex flex-col justify-between p-3.5 bg-[#040209] text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-accent-1" />
          <span className="text-xs font-semibold">Three.js WebGL Engine</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 font-bold">
          120.4 FPS · 60Hz-120Hz
        </span>
      </div>

      {/* 3D Wireframe Canvas */}
      <div className="relative my-2 aspect-[16/10] w-full rounded-lg bg-black/60 overflow-hidden border border-white/10 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={320}
          height={200}
          className="size-full object-cover"
        />
        <div className="absolute top-2 left-2 text-[9px] font-mono text-white/50 bg-black/70 px-2 py-0.5 rounded">
          SHADER: GLSL_RAYMARCH_P3
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-accent-1 bg-black/70 px-2 py-0.5 rounded">
          VERTICES: 3,634
        </div>
      </div>

      {/* Physics Telemetry */}
      <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono">
        <div className="p-1 rounded bg-white/5 border border-white/5">
          <span className="text-white/40 block">GRAVITY</span>
          <span className="text-accent-1 font-bold">9.81 m/s²</span>
        </div>
        <div className="p-1 rounded bg-white/5 border border-white/5">
          <span className="text-white/40 block">DAMPING</span>
          <span className="text-accent-2 font-bold">0.94 SPRING</span>
        </div>
        <div className="p-1 rounded bg-white/5 border border-white/5">
          <span className="text-white/40 block">GPU DRAW</span>
          <span className="text-emerald-400 font-bold">1 CALL</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[9px] font-mono text-white/40 pt-1 border-t border-white/5">
        <span>GSAP SCROLLTRIGGER</span>
        <span className="text-emerald-400">HARDWARE ACCELERATED</span>
        <span>ZERO LAG</span>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Main Exported Device Showcase Frame
// ------------------------------------------------------------
export default function ExpertiseDeviceShowcase({ activeTab }: Props) {
  const screens = [
    <FullStackScreen key="0" />,
    <WebDesignScreen key="1" />,
    <VideoEditingScreen key="2" />,
    <MusicCompositionScreen key="3" />,
    <Motion3DScreen key="4" />,
  ];

  const ambientGlowColors = [
    "rgba(124, 58, 237, 0.45)", // FullStack: Violet
    "rgba(0, 240, 255, 0.4)",   // Web: Cyan
    "rgba(255, 95, 86, 0.35)",  // Video: Warm Cinema Red/Amber
    "rgba(230, 245, 54, 0.35)", // Music: Lime Neon
    "rgba(144, 112, 223, 0.4)", // Motion: Electric Violet
  ];

  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-[500/580] flex items-center justify-center">
      {/* 1. Dynamic Radial Ambient Glow behind the Device */}
      <motion.div
        animate={{
          background: `radial-gradient(circle, ${ambientGlowColors[activeTab]} 0%, rgba(3,2,9,0) 70%)`,
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 -z-10 blur-3xl opacity-70 pointer-events-none"
      />

      {/* 2. Floating Glass HUD Badge (Top Right) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-2 lg:-right-6 z-30 px-3.5 py-2 rounded-2xl bg-[#0e0c1a]/85 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2 select-none"
      >
        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="size-2 rounded-full bg-emerald-400 -ml-3" />
        <span className="text-[11px] font-mono font-semibold text-white/90">
          PRO CRAFT VERIFIED
        </span>
      </motion.div>

      {/* 3. Floating Glass HUD Badge (Bottom Left) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-2 lg:-left-6 z-30 px-3.5 py-2 rounded-2xl bg-[#0e0c1a]/85 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2 select-none"
      >
        <Zap className="size-3.5 text-accent-1" />
        <span className="text-[11px] font-mono font-semibold text-white/90">
          60-120 FPS NATIVE
        </span>
      </motion.div>

      {/* 4. Ultra-Sleek Titanium Device Frame */}
      <div className="relative w-[92%] h-[94%] rounded-[36px] p-2.5 bg-gradient-to-b from-[#2a2838] via-[#12101e] to-[#0a0814] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)_inset] flex flex-col overflow-hidden">
        {/* Titanium Edge Highlight */}
        <div className="absolute inset-0 rounded-[36px] pointer-events-none border border-white/15" />

        {/* Dynamic Island Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-24 h-4 rounded-full bg-black/90 border border-white/10 flex items-center justify-end px-2 gap-1.5 shadow-md">
          <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="size-2 rounded-full bg-[#151226] border border-white/20" />
        </div>

        {/* Inner Screen Bezel */}
        <div className="relative size-full rounded-[28px] overflow-hidden bg-black border border-white/5 flex flex-col pt-5">
          {/* Glass Screen Reflection Highlight */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-40 bg-gradient-to-b from-white/10 to-transparent rotate-45 blur-md z-30" />

          {/* Dynamic Discipline Screen Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="size-full"
            >
              {screens[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
