"use client";

// ============================================================
// Tamim Global — Hero Dark Canvas Animation v2
// 4-Discipline Premium Canvas: Code · Web · Video · Music
// Matrix rain · Nebula zones · Waveform · Orbiting glyphs
// Mouse parallax · Scanlines · CRT premium feel
// ============================================================

import { useEffect, useRef } from "react";

// ---- Types ----------------------------------------------------------------

interface FloatSymbol {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  color: string;
  alpha: number;
  orbitAngle: number;
  orbitSpeed: number;
  orbitRadius: number;
  orbitCenterX: number;
  orbitCenterY: number;
  age: number;
  lifespan: number;
  rotation: number;
  rotSpeed: number;
  discipline: 0 | 1 | 2 | 3; // 0=code, 1=web, 2=video, 3=music
}

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  glowIdx: number;
}

interface WaveBar {
  phase: number;
  speed: number;
  color: string;
}

// ---- Constants ------------------------------------------------------------

const DISCIPLINE_COLORS = [
  "#A78BFA", // 0: code — violet
  "#00C4FF", // 1: web  — cyan
  "#E6F536", // 2: video — lime
  "#FF3FBF", // 3: music — pink
] as const;

const DISCIPLINE_GLOWS = [
  "#7C3AED", // violet
  "#0099CC", // deep cyan
  "#B8C200", // dark lime
  "#CC2D96", // dark pink
] as const;

// Nebula zone positions (fractional)
const NEBULA_ZONES = [
  { fx: 0.15, fy: 0.38, r: 0.28, discipline: 0 }, // code – top-left
  { fx: 0.82, fy: 0.28, r: 0.22, discipline: 1 }, // web  – top-right
  { fx: 0.78, fy: 0.72, r: 0.24, discipline: 2 }, // video – bottom-right
  { fx: 0.22, fy: 0.72, r: 0.22, discipline: 3 }, // music – bottom-left
];

// Symbol sets per discipline
const DISCIPLINE_SYMBOLS = [
  // code
  ["const", "async", "fn()", "{ }", "[ ]", "=>", "::", "type", "impl", "pub", "let", "mut"],
  // web
  ["</>", "<div>", "[]", "px", "rem", "vh", "npm", "tsx", "API", "GET", "POST", "CSS"],
  // video
  ["▶", "◼", "FPS", "4K", "HDR", "CUT", "FX", "LUT", "RAW", "ISO", "EXP", "GRD"],
  // music
  ["♪", "♫", "♬", "BPM", "Hz", "dB", "MIX", "OSC", "LFO", "REV", "EQ", "KEY"],
];

const MATRIX_CHARS = "0123456789ABCDEFabcdefコンピュータ@#$%&*<>{}[]|/\\";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ---- Component ------------------------------------------------------------

export default function HeroDarkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const symbolsRef = useRef<FloatSymbol[]>([]);
  const matrixRef = useRef<MatrixColumn[]>([]);
  const waveBarsRef = useRef<WaveBar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    // ---- Resize -----------------------------------------------------------
    function resize() {
      if (!canvas) return;
      W = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      initMatrix();
    }

    // ---- Matrix rain init -------------------------------------------------
    function initMatrix() {
      const cols = Math.floor(W * 0.18 / 14); // only left ~18% of canvas
      matrixRef.current = Array.from({ length: cols }, (_, i) => ({
        x: 10 + i * 14,
        y: Math.random() * H,
        speed: 0.6 + Math.random() * 1.2,
        chars: Array.from({ length: 24 }, () =>
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ),
        glowIdx: Math.floor(Math.random() * 24),
      }));
    }

    // ---- Wave bars init ---------------------------------------------------
    function initWaveBars() {
      const barCount = 80;
      waveBarsRef.current = Array.from({ length: barCount }, (_, i) => ({
        phase: (i / barCount) * Math.PI * 4,
        speed: 1.2 + Math.random() * 1.8,
        color: DISCIPLINE_COLORS[i % 4],
      }));
    }

    // ---- Float symbols init -----------------------------------------------
    function createSymbol(discipline: 0 | 1 | 2 | 3): FloatSymbol {
      const zone = NEBULA_ZONES[discipline];
      const cx = zone.fx * W;
      const cy = zone.fy * H;
      const spread = zone.r * Math.min(W, H) * 0.5;
      const syms = DISCIPLINE_SYMBOLS[discipline];
      const orbitR = 40 + Math.random() * spread * 0.8;
      const angle = Math.random() * Math.PI * 2;
      const bx = cx + Math.cos(angle) * orbitR * 0.6;
      const by = cy + Math.sin(angle) * orbitR * 0.6;

      return {
        x: bx,
        y: by,
        baseX: bx,
        baseY: by,
        vx: 0,
        vy: 0,
        text: syms[Math.floor(Math.random() * syms.length)],
        size: 10 + Math.random() * 12,
        color: DISCIPLINE_COLORS[discipline],
        alpha: 0.3 + Math.random() * 0.55,
        orbitAngle: angle,
        orbitSpeed: (Math.random() - 0.5) * 0.006,
        orbitRadius: orbitR,
        orbitCenterX: cx,
        orbitCenterY: cy,
        age: Math.random() * 500,
        lifespan: 500 + Math.random() * 600,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        discipline,
      };
    }

    function initSymbols() {
      const counts = [22, 20, 18, 20]; // per discipline
      symbolsRef.current = [];
      (counts as [number, number, number, number]).forEach((n, d) => {
        for (let i = 0; i < n; i++) {
          symbolsRef.current.push(createSymbol(d as 0 | 1 | 2 | 3));
        }
      });
    }

    // ---- Draw background --------------------------------------------------
    function drawBackground() {
      if (!ctx) return;
      const cx = W * 0.5;
      const cy = H * 0.5;
      const r = Math.max(W, H) * 0.9;
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      bg.addColorStop(0, "#0A0030");
      bg.addColorStop(0.55, "#060018");
      bg.addColorStop(1, "#030209");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    }

    // ---- Draw nebula zones ------------------------------------------------
    function drawNebulae(t: number) {
      if (!ctx) return;
      ctx.save();
      NEBULA_ZONES.forEach((zone, i) => {
        const wobbleX = Math.sin(t * 0.25 + i * 1.3) * W * 0.012;
        const wobbleY = Math.cos(t * 0.2 + i * 0.9) * H * 0.015;
        const cx = zone.fx * W + wobbleX;
        const cy = zone.fy * H + wobbleY;
        const r = zone.r * Math.min(W, H);

        const pulse = 0.85 + Math.sin(t * 0.4 + i * 0.7) * 0.15;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * pulse);
        const c = DISCIPLINE_GLOWS[i];
        grad.addColorStop(0, c + "30");
        grad.addColorStop(0.4, c + "14");
        grad.addColorStop(0.75, c + "06");
        grad.addColorStop(1, c + "00");

        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // ---- Draw matrix rain -------------------------------------------------
    function drawMatrix(t: number) {
      if (!ctx) return;
      ctx.save();
      ctx.font = "12px monospace";

      matrixRef.current.forEach((col) => {
        col.y += col.speed;
        if (col.y > H + 100) col.y = -50;

        // Shuffle chars occasionally
        if (Math.random() < 0.04) {
          col.chars[Math.floor(Math.random() * col.chars.length)] =
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }
        col.glowIdx = (col.glowIdx + 1) % col.chars.length;

        col.chars.forEach((ch, i) => {
          const chy = col.y - i * 14;
          if (chy < 0 || chy > H) return;
          const isGlow = i === col.glowIdx;
          const alpha = isGlow ? 0.95 : Math.max(0, 0.55 - i * 0.035);
          const fade = Math.min(1, (col.x / (W * 0.2)));
          ctx.globalAlpha = alpha * fade * (0.5 + Math.sin(t * 0.3 + col.x * 0.01) * 0.15);
          ctx.fillStyle = isGlow ? "#AAFFAA" : "#39FF14";
          ctx.shadowColor = "#39FF14";
          ctx.shadowBlur = isGlow ? 8 : 0;
          ctx.fillText(ch, col.x, chy);
        });
      });
      ctx.restore();
    }

    // ---- Draw waveform bars -----------------------------------------------
    function drawWaveform(t: number) {
      if (!ctx) return;
      ctx.save();
      const bars = waveBarsRef.current;
      const totalBars = bars.length;
      const bw = W / totalBars;
      const baseY = H * 0.93;
      const maxH = H * 0.1;

      bars.forEach((bar, i) => {
        const freq =
          Math.sin(bar.phase + t * bar.speed) * 0.5 +
          Math.sin(bar.phase * 1.3 + t * bar.speed * 0.7) * 0.3 +
          Math.sin(bar.phase * 0.7 + t * bar.speed * 1.4) * 0.2;
        const bh = Math.abs(freq) * maxH + 2;
        const x = i * bw;

        const colStr = bar.color;
        ctx.globalAlpha = 0.55 + Math.abs(freq) * 0.4;
        ctx.shadowColor = colStr;
        ctx.shadowBlur = 4;
        ctx.fillStyle = colStr;
        ctx.fillRect(x + bw * 0.1, baseY - bh, bw * 0.8, bh);

        // Mirror
        ctx.globalAlpha = (0.55 + Math.abs(freq) * 0.4) * 0.3;
        ctx.fillRect(x + bw * 0.1, baseY, bw * 0.8, bh * 0.5);
      });
      ctx.restore();
    }

    // ---- Draw floating symbols -------------------------------------------
    function drawSymbols(t: number) {
      if (!ctx) return;
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      ctx.save();
      symbolsRef.current.forEach((s) => {
        s.age++;
        if (s.age > s.lifespan) {
          // Respawn in same discipline zone
          const fresh = createSymbol(s.discipline);
          Object.assign(s, fresh);
          return;
        }

        const lifeFrac = s.age / s.lifespan;
        const fadeIn = Math.min(lifeFrac * 6, 1);
        const fadeOut = Math.max((1 - lifeFrac) * 6, 0);
        const displayAlpha = Math.min(fadeIn, fadeOut) * s.alpha;

        // Orbit
        s.orbitAngle += s.orbitSpeed;
        const targetX = s.orbitCenterX + Math.cos(s.orbitAngle) * s.orbitRadius;
        const targetY = s.orbitCenterY + Math.sin(s.orbitAngle) * s.orbitRadius;

        // Mouse parallax (attract slightly toward cursor)
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.hypot(dx, dy);
        const parallaxStrength = Math.min(1, 200 / (dist + 1)) * 0.0008;
        s.vx += dx * parallaxStrength;
        s.vy += dy * parallaxStrength;

        // Spring to orbit target
        s.vx += (targetX - s.x) * 0.005;
        s.vy += (targetY - s.y) * 0.005;
        s.vx *= 0.92;
        s.vy *= 0.92;
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        ctx.save();
        ctx.globalAlpha = displayAlpha;
        ctx.font = `${s.size}px monospace`;
        ctx.fillStyle = s.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fillText(s.text, 0, 0);
        ctx.restore();
      });
      ctx.restore();
    }

    // ---- Draw discipline labels -------------------------------------------
    function drawDisciplineLabels(t: number) {
      if (!ctx) return;
      ctx.save();
      const labels = [
        { text: "{ }", x: W * 0.1, y: H * 0.32, size: 160, discipline: 0 },
        { text: "</>", x: W * 0.84, y: H * 0.22, size: 130, discipline: 1 },
        { text: "▶", x: W * 0.82, y: H * 0.76, size: 110, discipline: 2 },
        { text: "♫", x: W * 0.16, y: H * 0.76, size: 130, discipline: 3 },
      ];

      labels.forEach((l, i) => {
        const pulse = Math.sin(t * 0.5 + i * 1.57) * 0.07;
        const scale = 1 + pulse;
        ctx.save();
        ctx.font = `bold ${l.size * scale}px monospace`;
        ctx.fillStyle = DISCIPLINE_COLORS[l.discipline];
        ctx.globalAlpha = 0.045 + Math.abs(pulse) * 0.6;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = DISCIPLINE_COLORS[l.discipline];
        ctx.shadowBlur = 20;
        ctx.fillText(l.text, l.x, l.y);
        ctx.restore();
      });
      ctx.restore();
    }

    // ---- Draw zone connector lines ----------------------------------------
    function drawZoneLines(t: number) {
      if (!ctx) return;
      ctx.save();
      // Connect nebula zone centers with faint arcs
      for (let i = 0; i < NEBULA_ZONES.length; i++) {
        const a = NEBULA_ZONES[i];
        const b = NEBULA_ZONES[(i + 1) % NEBULA_ZONES.length];
        const ax = a.fx * W;
        const ay = a.fy * H;
        const bx = b.fx * W;
        const by = b.fy * H;
        const anim = Math.sin(t * 0.3 + i * 0.8) * 0.5 + 0.5;

        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, DISCIPLINE_GLOWS[i] + "18");
        grad.addColorStop(0.5, DISCIPLINE_GLOWS[(i + 1) % 4] + "0C");
        grad.addColorStop(1, DISCIPLINE_GLOWS[(i + 1) % 4] + "08");

        ctx.globalAlpha = 0.03 + anim * 0.05;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 14]);
        ctx.lineDashOffset = -t * 8;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    }

    // ---- Draw scanlines ---------------------------------------------------
    function drawScanlines() {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = 0.022;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 2);
      }
      ctx.restore();
    }

    // ---- Draw vignette ----------------------------------------------------
    function drawVignette() {
      if (!ctx) return;
      ctx.save();
      const grad = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.2, W * 0.5, H * 0.5, H * 0.9);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // ---- Main render loop -------------------------------------------------
    function render() {
      if (!ctx || !canvas) return;
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Smooth mouse
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.06);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.06);

      drawBackground();
      drawNebulae(t);
      drawZoneLines(t);
      drawDisciplineLabels(t);
      drawMatrix(t);
      drawSymbols(t);
      drawWaveform(t);
      drawScanlines();
      drawVignette();

      animRef.current = requestAnimationFrame(render);
    }

    // ---- Init -------------------------------------------------------------
    resize();
    initWaveBars();
    initSymbols();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const cy = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      targetMouseRef.current = {
        x: (cx - rect.left) / rect.width,
        y: (cy - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onMove, { passive: true });

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="size-full object-cover"
      style={{ display: "block" }}
    />
  );
}
