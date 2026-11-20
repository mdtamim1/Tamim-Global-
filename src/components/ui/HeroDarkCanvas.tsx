"use client";

// ============================================================
// Tamim Global — Hero Dark Canvas Animation
// Programmer + Web Developer + Video Editor + Music Composer
// 3D Gravity-style floating symbols, neon particles, dark starfield
// Replaces the intro.mp4 video slot with a live WebGL-style canvas
// ============================================================

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
  type: "dot" | "symbol";
  symbol?: string;
  rotation: number;
  rotSpeed: number;
  lifespan: number;
  age: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  orbitCenterX: number;
  orbitCenterY: number;
  layer: number;
}

const SYMBOLS = [
  "</> ", "{ }", "[ ]", "fn()", "API", "git",
  "♪", "♫", "🎬", "▶", "◉", "⬡",
  "px", "vh", "rem", "css", "tsx", "npm",
  "0x", "RGB", "HEX", "FPS", "4K",
];

const NEON_COLORS = [
  "#E6F536", // accent lime
  "#7C3AED", // accent violet
  "#00F0FF", // cyan
  "#FF3FBF", // pink
  "#39FF14", // neon green
  "#FF6B00", // orange
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroDarkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    function createParticle(isDot: boolean): Particle {
      const layer = Math.floor(Math.random() * 3); // 0=far, 1=mid, 2=close
      const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
      const type = isDot || Math.random() > 0.4 ? "dot" : "symbol";
      const orbitCenterX = Math.random() * W;
      const orbitCenterY = Math.random() * H;

      return {
        x: Math.random() * W,
        y: Math.random() * H,
        z: layer * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: 0,
        size: type === "symbol"
          ? 10 + Math.random() * 14
          : 1.5 + Math.random() * 2.5 * (layer + 1),
        color,
        alpha: 0.3 + Math.random() * 0.6,
        type,
        symbol: type === "symbol"
          ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
          : undefined,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        lifespan: 400 + Math.random() * 400,
        age: Math.random() * 400,
        orbitRadius: 30 + Math.random() * 120,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.008,
        orbitCenterX,
        orbitCenterY,
        layer,
      };
    }

    // Init 220 particles
    particlesRef.current = Array.from({ length: 220 }, (_, i) =>
      createParticle(i < 160)
    );

    // Mouse tracking
    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const cy = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mouseRef.current = {
        x: (cx - rect.left) / rect.width,
        y: (cy - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onMove, { passive: true });

    function drawGrid(t: number) {
      if (!ctx) return;
      const spacing = 70;
      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      ctx.save();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          // Wave displacement
          const wave = Math.sin((bx * 0.02 + t * 0.3)) * 4 + Math.cos((by * 0.02 + t * 0.2)) * 4;
          const gx = bx + wave;
          const gy = by + wave * 0.5;

          // Distance from mouse → glow dots
          const dist = Math.hypot(gx - mx, gy - my);
          const glow = Math.max(0, 1 - dist / 300);

          const alpha = 0.04 + glow * 0.18;
          const size = 1 + glow * 2.5;
          const colorIdx = Math.floor((bx + by) / 70) % NEON_COLORS.length;
          ctx.fillStyle = NEON_COLORS[colorIdx];
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(gx, gy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    function drawScanlines() {
      if (!ctx) return;
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 2);
      }
      ctx.restore();
    }

    function drawGravityOrbs(t: number) {
      if (!ctx) return;
      // 3 gravity orbs with gravitational field lines
      const orbs = [
        { x: W * 0.25, y: H * 0.4, r: 60, color: "#7C3AED" },
        { x: W * 0.75, y: H * 0.5, r: 45, color: "#E6F536" },
        { x: W * 0.5, y: H * 0.75, r: 50, color: "#00F0FF" },
      ];

      ctx.save();
      orbs.forEach((orb, i) => {
        const wobble = Math.sin(t * 0.4 + i * 2.1) * 12;
        const ox = orb.x + wobble;
        const oy = orb.y + Math.cos(t * 0.3 + i * 1.7) * 8;

        // Gravity field rings
        for (let ring = 1; ring <= 4; ring++) {
          ctx.beginPath();
          ctx.arc(ox, oy, orb.r * ring * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = orb.color;
          ctx.globalAlpha = 0.04 / ring;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Core glow gradient
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * 1.5);
        grad.addColorStop(0, orb.color + "60");
        grad.addColorStop(0.4, orb.color + "20");
        grad.addColorStop(1, orb.color + "00");
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawNeonLines(t: number) {
      if (!ctx) return;
      ctx.save();
      const lines = [
        { x1: 0, y1: H * 0.3, x2: W, y2: H * 0.35, color: "#7C3AED" },
        { x1: 0, y1: H * 0.65, x2: W, y2: H * 0.6, color: "#E6F536" },
        { x1: W * 0.2, y1: 0, x2: W * 0.25, y2: H, color: "#00F0FF" },
        { x1: W * 0.78, y1: 0, x2: W * 0.72, y2: H, color: "#7C3AED" },
      ];
      lines.forEach((l, i) => {
        const anim = Math.sin(t * 0.5 + i * 0.8) * 0.5 + 0.5;
        ctx.save();
        ctx.strokeStyle = l.color;
        ctx.globalAlpha = 0.04 + anim * 0.04;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.stroke();
        ctx.restore();
      });
      ctx.restore();
    }

    function drawWaveform(t: number) {
      if (!ctx) return;
      ctx.save();
      const bars = 64;
      const bw = W / bars;
      const centerY = H * 0.88;

      for (let i = 0; i < bars; i++) {
        const freq = Math.sin(i * 0.3 + t * 2) * 0.5 + Math.sin(i * 0.15 + t * 1.3) * 0.5;
        const height = Math.abs(freq) * 50 + 3;
        const hue = (i / bars) * 180 + 180;
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.globalAlpha = 0.35 + Math.abs(freq) * 0.5;
        const x = i * bw + bw * 0.15;
        ctx.fillRect(x, centerY - height, bw * 0.7, height * 2);
      }
      ctx.restore();
    }

    function drawParticles(t: number) {
      if (!ctx) return;
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      particlesRef.current.forEach((p) => {
        // Age & lifecycle
        p.age++;
        if (p.age > p.lifespan) {
          p.age = 0;
          p.alpha = 0;
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.orbitCenterX = Math.random() * W;
          p.orbitCenterY = Math.random() * H;
        }
        const lifeFrac = p.age / p.lifespan;
        const fadeIn = Math.min(lifeFrac * 5, 1);
        const fadeOut = Math.max((1 - lifeFrac) * 5, 0);
        const displayAlpha = Math.min(fadeIn, fadeOut) * p.alpha;

        // Orbit motion
        p.orbitAngle += p.orbitSpeed;
        const targetX = p.orbitCenterX + Math.cos(p.orbitAngle) * p.orbitRadius;
        const targetY = p.orbitCenterY + Math.sin(p.orbitAngle) * p.orbitRadius;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }

        // Spring toward orbit target
        p.vx += (targetX - p.x) * 0.004;
        p.vy += (targetY - p.y) * 0.004;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = displayAlpha;

        if (p.type === "symbol" && p.symbol) {
          ctx.font = `${p.size}px monospace`;
          ctx.fillStyle = p.color;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          // Glow
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8 * p.z;
          ctx.fillText(p.symbol, 0, 0);
        } else {
          const r = p.size * p.z;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10 * p.z;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, p.color + "00");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    }

    function drawConnections() {
      if (!ctx) return;
      const pts = particlesRef.current.filter(p => p.type === "dot" && p.layer === 2);
      ctx.save();
      for (let i = 0; i < Math.min(pts.length, 40); i++) {
        for (let j = i + 1; j < Math.min(pts.length, 40); j++) {
          const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (dist < 100) {
            ctx.globalAlpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = pts[i].color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    function drawCenterText(t: number) {
      if (!ctx) return;
      ctx.save();
      const labels = [
        { text: "</>", size: 180, x: W * 0.15, y: H * 0.45, color: "#7C3AED" },
        { text: "▶", size: 120, x: W * 0.82, y: H * 0.3, color: "#00F0FF" },
        { text: "♫", size: 140, x: W * 0.85, y: H * 0.72, color: "#E6F536" },
        { text: "✦", size: 90, x: W * 0.1, y: H * 0.75, color: "#FF3FBF" },
      ];
      labels.forEach((l, i) => {
        const pulse = Math.sin(t * 0.6 + i * 1.4) * 0.08;
        ctx.font = `bold ${l.size * (1 + pulse)}px serif`;
        ctx.fillStyle = l.color;
        ctx.globalAlpha = 0.06 + Math.abs(pulse) * 0.5;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l.text, l.x, l.y);
      });
      ctx.restore();
    }

    function render() {
      if (!ctx || !canvas) return;
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Dark gradient background
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#03020A");
      bg.addColorStop(0.4, "#080514");
      bg.addColorStop(0.7, "#050A18");
      bg.addColorStop(1, "#020208");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawGrid(t);
      drawNeonLines(t);
      drawGravityOrbs(t);
      drawCenterText(t);
      drawConnections();
      drawParticles(t);
      drawWaveform(t);
      drawScanlines();

      animRef.current = requestAnimationFrame(render);
    }

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
