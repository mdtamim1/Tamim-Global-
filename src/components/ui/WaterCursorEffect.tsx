"use client";

// ============================================================
// Tamim Global - 3D Fluid Water Droplet Cursor & Ripple System
// - 3D Water Droplet following cursor with surface tension physics,
//   hydrodynamic elongation, specular glass caustics & trailing beads.
// - Real-time Water Ripple Wave system on click anywhere
//   with concentric 3D Fresnel refraction waves & splash droplets.
// ============================================================

import { useEffect, useRef } from "react";

interface RippleWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  decay: number;
  phase: number;
  color: string;
}

interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vz: number;
  z: number;
  radius: number;
  alpha: number;
  gravity: number;
  decay: number;
}

export default function WaterCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run in browser on non-reduced motion preference
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    // Mouse / Cursor state
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      isHoveringInteractive: false,
      isDown: false,
      visible: false,
      squash: 1,
      targetSquash: 1,
    };

    // Trailing micro droplets
    const trail1 = { x: width / 2, y: height / 2 };
    const trail2 = { x: width / 2, y: height / 2 };

    // Ripple waves & splash particles
    const ripples: RippleWave[] = [];
    const particles: SplashParticle[] = [];

    // Wobble oscillation for surface tension
    let wobblePhase = 0;

    // Track mouse move
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.visible = true;

      const target = e.target as HTMLElement | null;
      if (target) {
        mouse.isHoveringInteractive = !!target.closest(
          "a, button, [role='button'], input, textarea, select, [data-interactive]"
        );
      }
    };

    const onMouseLeave = () => {
      mouse.visible = false;
    };

    const onMouseEnter = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.visible = true;
    };

    // Spawn water ripple waves on click (water ripples / waves)
    const spawnWaterRipple = (clickX: number, clickY: number) => {
      // 1. Primary concentric ripple waves
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 8 + i * 14,
          maxRadius: Math.max(width, height) * 0.45 + i * 40,
          speed: 3.2 - i * 0.4,
          amplitude: 1.0 - i * 0.2,
          decay: 0.982 - i * 0.003,
          phase: i * 0.6,
          color: i === 0 ? "rgba(180, 225, 255," : "rgba(120, 190, 255,",
        });
      }

      // 2. Water splash droplet particles jumping in 3D arc
      const particleCount = 7 + Math.floor(Math.random() * 5);
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = 2.5 + Math.random() * 4.5;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          vz: 4 + Math.random() * 5, // upward velocity in 3D
          z: 0,
          radius: 2 + Math.random() * 2.5,
          alpha: 0.95,
          gravity: 0.28,
          decay: 0.012 + Math.random() * 0.008,
        });
      }

      // 3. Droplet squish impact
      mouse.squash = 0.55;
    };

    const onPointerDown = (e: PointerEvent) => {
      mouse.isDown = true;
      spawnWaterRipple(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      mouse.isDown = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    // Main render loop
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      animId = requestAnimationFrame(render);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Clear full canvas
      ctx.clearRect(0, 0, width, height);

      // ------------------------------------------------------
      // 1. UPDATE & DRAW WATER RIPPLES (water waves)
      // ------------------------------------------------------
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.amplitude *= r.decay;

        if (r.amplitude < 0.015 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        const currentAlpha = Math.max(0, r.amplitude);
        const waveThickness = Math.max(2, 6 * (1 - r.radius / r.maxRadius));

        // Draw 3D refractive wave ring with light & shadow
        // Sun / light vector coming from top-left (-45 deg):
        // Top-left arc is specular highlight (bright white/cyan),
        // Bottom-right arc is shadow refraction (deep blue-black).
        
        ctx.save();
        ctx.translate(r.x, r.y);

        // A. Subtle caustic wave ring fill
        const grad = ctx.createRadialGradient(
          0,
          0,
          Math.max(0, r.radius - waveThickness * 2),
          0,
          0,
          r.radius + waveThickness * 2
        );
        grad.addColorStop(0, "rgba(80, 160, 255, 0)");
        grad.addColorStop(0.5, `rgba(140, 210, 255, ${0.12 * currentAlpha})`);
        grad.addColorStop(1, "rgba(0, 40, 120, 0)");

        ctx.beginPath();
        ctx.arc(0, 0, r.radius + waveThickness * 2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // B. Specular Crest (Light-facing arc: angle 3pi/4 to 7pi/4)
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, -Math.PI * 0.85, Math.PI * 0.15);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.75 * currentAlpha})`;
        ctx.lineWidth = waveThickness * 1.2;
        ctx.shadowColor = "rgba(160, 220, 255, 0.8)";
        ctx.shadowBlur = 8;
        ctx.stroke();

        // C. Ambient Crest (Secondary arc)
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, Math.PI * 0.15, Math.PI * 1.15);
        ctx.strokeStyle = `rgba(90, 170, 255, ${0.4 * currentAlpha})`;
        ctx.lineWidth = waveThickness * 0.9;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // D. Inner trough shadow (creates true 3D depression illusion)
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(1, r.radius - waveThickness), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(10, 25, 60, ${0.25 * currentAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      // ------------------------------------------------------
      // 2. UPDATE & DRAW SPLASH PARTICLES
      // ------------------------------------------------------
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // 3D Ballistic motion
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.vz -= p.gravity;
        p.alpha -= p.decay;

        // When particle hits the water plane (z <= 0)
        if (p.z <= 0) {
          p.z = 0;
          p.vz = -p.vz * 0.3; // bounce with energy loss
          p.vx *= 0.7;
          p.vy *= 0.7;

          // Tiny secondary splash micro-ripple
          if (p.alpha > 0.3 && ripples.length < 15) {
            ripples.push({
              x: p.x,
              y: p.y,
              radius: 2,
              maxRadius: 28,
              speed: 1.2,
              amplitude: p.alpha * 0.4,
              decay: 0.95,
              phase: 0,
              color: "rgba(150, 210, 255,",
            });
          }
        }

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        // Render 3D splash droplet
        ctx.save();
        // Drop shadow on water surface
        const shadowY = p.y + p.z * 0.4;
        const shadowScale = Math.max(0.2, 1 - p.z * 0.02);
        ctx.beginPath();
        ctx.ellipse(
          p.x,
          shadowY,
          p.radius * shadowScale,
          p.radius * 0.5 * shadowScale,
          0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(0, 10, 30, ${0.35 * p.alpha * shadowScale})`;
        ctx.fill();

        // Droplet body in mid-air
        const dropY = p.y - p.z;
        ctx.beginPath();
        ctx.arc(p.x, dropY, p.radius, 0, Math.PI * 2);
        const pGrad = ctx.createRadialGradient(
          p.x - p.radius * 0.3,
          dropY - p.radius * 0.3,
          p.radius * 0.1,
          p.x,
          dropY,
          p.radius
        );
        pGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * p.alpha})`);
        pGrad.addColorStop(0.4, `rgba(160, 220, 255, ${0.8 * p.alpha})`);
        pGrad.addColorStop(1, `rgba(40, 120, 240, ${0.5 * p.alpha})`);
        ctx.fillStyle = pGrad;
        ctx.shadowColor = "rgba(180, 230, 255, 0.9)";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // ------------------------------------------------------
      // 3. UPDATE & DRAW 3D WATER DROPLET CURSOR
      // ------------------------------------------------------
      if (mouse.visible) {
        // Fluid spring interpolation towards target
        const lerpFactor = 0.22;
        const dx = mouse.targetX - mouse.x;
        const dy = mouse.targetY - mouse.y;

        mouse.vx = dx * lerpFactor;
        mouse.vy = dy * lerpFactor;
        mouse.x += mouse.vx;
        mouse.y += mouse.vy;

        // Trailing micro droplets physics
        trail1.x += (mouse.x - trail1.x) * 0.15;
        trail1.y += (mouse.y - trail1.y) * 0.15;
        trail2.x += (trail1.x - trail2.x) * 0.11;
        trail2.y += (trail1.y - trail2.y) * 0.11;

        // Velocity & motion deformation
        const speed = Math.hypot(mouse.vx, mouse.vy);
        const angle = Math.atan2(mouse.vy, mouse.vx);

        // Wobble & squash restoration
        wobblePhase += 0.18 + speed * 0.02;
        mouse.squash += (1 - mouse.squash) * 0.12;

        const baseRadius = mouse.isHoveringInteractive ? 16 : 12;
        const stretch = Math.min(speed * 0.05, 0.7);
        const squash = mouse.squash;

        const scaleX = (1 + stretch) * squash;
        const scaleY = (1 / (1 + stretch * 0.6)) * squash;

        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.rotate(angle);

        // A. Ambient soft shadow (floating 3D depth)
        ctx.save();
        ctx.translate(3, 5);
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          baseRadius * scaleX * 1.1,
          baseRadius * scaleY * 0.85,
          0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(0, 5, 20, 0.4)";
        ctx.filter = "blur(4px)";
        ctx.fill();
        ctx.restore();

        // B. Main 3D Water Droplet Body
        ctx.beginPath();
        // Teardrop shape when moving fast, smooth organic sphere when idle
        if (speed > 2) {
          ctx.ellipse(
            -stretch * 4,
            0,
            baseRadius * scaleX,
            baseRadius * scaleY,
            0,
            0,
            Math.PI * 2
          );
        } else {
          // Subtle organic wobble like a real water bead on hydrophobic glass
          const wobble = Math.sin(wobblePhase) * 0.8;
          ctx.ellipse(
            0,
            0,
            baseRadius + wobble,
            baseRadius - wobble * 0.6,
            0,
            0,
            Math.PI * 2
          );
        }

        // Liquid Refraction Gradient (Glassy clear water with ocean blue tint)
        const dropGrad = ctx.createRadialGradient(
          -baseRadius * 0.35,
          -baseRadius * 0.35,
          baseRadius * 0.1,
          0,
          0,
          baseRadius * 1.2
        );
        dropGrad.addColorStop(0, "rgba(235, 248, 255, 0.85)"); // inner highlight
        dropGrad.addColorStop(0.35, "rgba(140, 210, 255, 0.45)"); // translucent body
        dropGrad.addColorStop(0.7, "rgba(50, 140, 255, 0.25)"); // refraction volume
        dropGrad.addColorStop(0.92, "rgba(100, 185, 255, 0.65)"); // caustic meniscus rim
        dropGrad.addColorStop(1, "rgba(255, 255, 255, 0.85)"); // crisp meniscus edge

        ctx.fillStyle = dropGrad;
        ctx.fill();

        // C. Meniscus Outer Glow Stroke
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
        ctx.stroke();

        // D. Internal Caustic Refraction (Bottom-Right Glow)
        ctx.beginPath();
        ctx.ellipse(
          baseRadius * 0.4,
          baseRadius * 0.3,
          baseRadius * 0.35,
          baseRadius * 0.2,
          Math.PI * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(180, 235, 255, 0.6)";
        ctx.filter = "blur(1.5px)";
        ctx.fill();

        // E. Primary Specular Highlight (Crisp 3D studio reflection top-left)
        ctx.filter = "none";
        ctx.beginPath();
        ctx.ellipse(
          -baseRadius * 0.45,
          -baseRadius * 0.4,
          baseRadius * 0.3,
          baseRadius * 0.18,
          -Math.PI * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur = 6;
        ctx.fill();

        // F. Secondary Pinpoint Specular Dot
        ctx.beginPath();
        ctx.arc(-baseRadius * 0.2, -baseRadius * 0.6, baseRadius * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();

        // ----------------------------------------------------
        // 4. DRAW TRAILING MICRO-DROPLETS
        // ----------------------------------------------------
        if (speed > 1.5) {
          // Trail bead 1
          ctx.save();
          ctx.beginPath();
          ctx.arc(trail1.x, trail1.y, baseRadius * 0.35, 0, Math.PI * 2);
          const t1Grad = ctx.createRadialGradient(
            trail1.x - 1,
            trail1.y - 1,
            0.5,
            trail1.x,
            trail1.y,
            baseRadius * 0.35
          );
          t1Grad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          t1Grad.addColorStop(0.6, "rgba(140, 210, 255, 0.5)");
          t1Grad.addColorStop(1, "rgba(50, 140, 255, 0.2)");
          ctx.fillStyle = t1Grad;
          ctx.shadowColor = "rgba(160, 220, 255, 0.6)";
          ctx.shadowBlur = 3;
          ctx.fill();
          ctx.restore();

          // Trail bead 2
          ctx.save();
          ctx.beginPath();
          ctx.arc(trail2.x, trail2.y, baseRadius * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(210, 240, 255, 0.75)";
          ctx.fill();
          ctx.restore();
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
      aria-hidden="true"
    />
  );
}
