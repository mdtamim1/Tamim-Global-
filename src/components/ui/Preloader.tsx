"use client";

// ============================================================
// Tamim Global — Ultra-Premium 3D Gravity Preloader
// Three.js GPU particle system with gravitational attraction,
// orbital mechanics, name reveal & curtain wipe exit
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

// ── 3D Gravity Particle Canvas ──────────────────────────────────────────────

function GravityCanvas({ progress }: { progress: number }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;

    const W = mount.clientWidth || window.innerWidth;
    const H = mount.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Renderer ───────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Camera ─────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // ── Scene ──────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Particle count & geometry ──────────────────────────
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    // Color palette: deep blue, royal blue, white, red-orange accent
    const palette = [
      new THREE.Color("#002BFF"),
      new THREE.Color("#0066ff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#f84022"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#00aaff"),
    ];

    for (let i = 0; i < COUNT; i++) {
      // Random sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 12;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Orbital tangent velocity
      const pos = new THREE.Vector3(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      const up = new THREE.Vector3(0, 1, 0);
      const tangent = new THREE.Vector3().crossVectors(pos, up).normalize();
      const speed = 0.015 + Math.random() * 0.025;
      velocities.push(tangent.multiplyScalar(speed));

      // Color
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      // Size variation
      sizes[i] = 0.04 + Math.random() * 0.14;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    // ── Particle shader ────────────────────────────────────
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixelRatio: { value: dpr },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute vec3 color;
        uniform float uTime;
        uniform float uProgress;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          // Gravity pull towards center as progress → 1
          vec3 pos = position;
          float pull = pow(uProgress, 2.5);
          pos = mix(pos, pos * (1.0 - pull * 0.95), 1.0);
          // Slight breathing
          float pulse = sin(uTime * 1.4 + length(position) * 0.3) * 0.08 + 1.0;
          pos *= pulse;
          // Fade in
          vAlpha = smoothstep(0.0, 0.3, uProgress) * (0.4 + 0.6 * (1.0 - pull * 0.6));
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * uPixelRatio * (280.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float r = length(uv);
          if (r > 0.5) discard;
          float core = smoothstep(0.5, 0.0, r);
          float glow = smoothstep(0.5, 0.1, r) * 0.4;
          float alpha = (core + glow) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── Gravity attractor orbs ─────────────────────────────
    // 3 glowing core spheres (the gravity sources)
    const orbColors = [0x002BFF, 0xf84022, 0x7c3aed];
    const orbs: THREE.Mesh[] = [];

    orbColors.forEach((color, i) => {
      const orbGeo = new THREE.SphereGeometry(0.3, 32, 32);
      const orbMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.0, // start invisible
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / 3) * Math.PI * 2;
      orb.position.set(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0);
      scene.add(orb);
      orbs.push(orb);
    });

    // ── Ring halo ──────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(3.5, 0.015, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x002BFF,
      transparent: true,
      opacity: 0,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(5.0, 0.008, 8, 160);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI * 0.3;
    scene.add(ring2);

    // ── Gravity physics update ─────────────────────────────
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;

    const G = 0.004; // gravitational constant
    const attractors = [
      new THREE.Vector3(0, 0, 0), // main center
    ];

    const startTime = performance.now();
    let animId = 0;
    let currentProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;
      const pull = Math.pow(currentProgress, 2.5);

      mat.uniforms.uTime.value = t;
      mat.uniforms.uProgress.value = currentProgress;

      // Orbit particles + gravity pull
      for (let i = 0; i < COUNT; i++) {
        const px = posAttr.getX(i);
        const py = posAttr.getY(i);
        const pz = posAttr.getZ(i);
        const pos = new THREE.Vector3(px, py, pz);

        // Gravitational pull to center
        const toCenter = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), pos);
        const dist = toCenter.length();
        if (dist > 0.3) {
          const gForce = (G * (1 + pull * 8)) / (dist * dist);
          velocities[i].addScaledVector(toCenter.normalize(), gForce);
        }

        // Apply velocity
        pos.add(velocities[i]);

        // Damping
        velocities[i].multiplyScalar(0.995);

        posAttr.setXYZ(i, pos.x, pos.y, pos.z);
      }
      posAttr.needsUpdate = true;

      // Rotate whole particle cloud
      particles.rotation.y = t * 0.08;
      particles.rotation.x = Math.sin(t * 0.05) * 0.15;

      // Orbs: orbit + fade in with progress
      orbs.forEach((orb, i) => {
        const angle = (i / 3) * Math.PI * 2 + t * 0.6;
        const orbR = 2.5 * (1 - pull * 0.8);
        orb.position.set(Math.cos(angle) * orbR, Math.sin(angle) * orbR, Math.sin(angle * 0.5) * 0.5);
        (orb.material as THREE.MeshBasicMaterial).opacity = Math.min(currentProgress * 1.5, 0.9);
      });

      // Rings fade in
      (ring.material as THREE.MeshBasicMaterial).opacity = Math.min(currentProgress * 1.2, 0.5);
      (ring2.material as THREE.MeshBasicMaterial).opacity = Math.min(currentProgress * 0.8, 0.3);
      ring.rotation.z = t * 0.3;
      ring2.rotation.y = t * 0.2;

      // Camera gentle drift
      camera.position.x = Math.sin(t * 0.15) * 1.5;
      camera.position.y = Math.cos(t * 0.12) * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Progress ref sync ──────────────────────────────────
    const progressInterval = setInterval(() => {
      currentProgress = progress / 100;
    }, 16);

    // ── Resize ─────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(progressInterval);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      orbs.forEach((o) => { (o.material as THREE.MeshBasicMaterial).dispose(); o.geometry.dispose(); });
      ringGeo.dispose(); ringMat.dispose();
      ring2Geo.dispose(); ring2Mat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ── Main Preloader ──────────────────────────────────────────────────────────

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "collapsing" | "exit">("loading");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const triggerExit = useCallback(() => {
    setPhase("collapsing");
    setTimeout(() => {
      setPhase("exit");
      setTimeout(() => { onCompleteRef.current(); }, 900);
    }, 600);
  }, []);

  // Progress counter
  useEffect(() => {
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const pct = Math.min((now - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.floor(eased * 100));
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(triggerExit, 300);
      }
    };
    requestAnimationFrame(tick);

    const skip = () => {
      setProgress(100);
      triggerExit();
    };
    window.addEventListener("keydown", skip, { once: true });

    return () => { window.removeEventListener("keydown", skip); };
  }, [triggerExit]);

  const isExiting = phase === "exit";
  const isCollapsing = phase === "collapsing";

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="tg-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999999] w-screen h-screen overflow-hidden select-none"
          style={{ background: "#000000" }}
        >
          {/* 3D gravity canvas (full screen background) */}
          <GravityCanvas progress={progress} />

          {/* Collapsing dark curtain from bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black z-10"
            initial={{ height: "0%" }}
            animate={{ height: isCollapsing ? "100%" : "0%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            {/* Monogram emblem */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative mb-8"
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: 100, height: 100,
                  margin: "auto",
                  boxShadow: "0 0 60px 20px rgba(0, 43, 255, 0.4), 0 0 120px 40px rgba(0, 43, 255, 0.15)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* TG Monogram SVG */}
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 22,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <svg width="52" height="52" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <path d="M4 7H22V11.2H15.1V29H10.9V11.2H4V7Z" fill="#ffffff" />
                  <path d="M27.5 14.5C23.8 14.5 21 17.3 21 21C21 24.7 23.8 27.5 27.5 27.5C30.4 27.5 32.5 25.8 33 23.2H27.2V19.6H36V21.5C36 26.8 32.5 30.8 27.4 30.8C21.6 30.8 17.2 26.5 17.2 21C17.2 15.5 21.6 11.2 27.4 11.2C30.8 11.2 33.7 12.7 35.4 15.2L31.9 17.4C30.9 15.6 29.4 14.5 27.5 14.5Z" fill="#ffffff" />
                </svg>
              </div>
            </motion.div>

            {/* Name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{
                fontFamily: "'Urbanist', var(--font-onest), sans-serif",
                fontSize: "clamp(36px, 7vw, 88px)",
                fontWeight: 900,
                letterSpacing: "-3px",
                lineHeight: 1,
                color: "#ffffff",
                textAlign: "center",
                whiteSpace: "nowrap",
                marginBottom: 8,
              }}
            >
              Md Tamim Islam
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 48,
              }}
            >
              Full-Stack Engineer · Designer · Creative Director
            </motion.div>

            {/* Progress display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center gap-4"
              style={{ width: "clamp(240px, 40vw, 420px)" }}
            >
              {/* Counter */}
              <div className="w-full flex items-center justify-between">
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                  Initializing
                </span>
                <span style={{ fontFamily: "'Urbanist', var(--font-onest), sans-serif", fontSize: 20, fontWeight: 800, color: "#002BFF", letterSpacing: "-0.5px" }}>
                  {progress}%
                </span>
              </div>

              {/* Progress track */}
              <div style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background: "linear-gradient(to right, #002BFF, #7c3aed, #f84022)",
                    boxShadow: "0 0 12px rgba(0,43,255,0.8)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08, ease: "linear" }}
                />
              </div>

              {/* Dot status row */}
              <div className="flex items-center gap-6">
                {["Code", "Design", "Motion", "Audio"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <motion.div
                      style={{ width: 5, height: 5, borderRadius: "50%", background: progress > i * 24 + 10 ? "#002BFF" : "rgba(255,255,255,0.15)" }}
                      animate={progress > i * 24 + 10 ? { scale: [1, 1.4, 1], boxShadow: ["0 0 0 rgba(0,43,255,0)", "0 0 8px rgba(0,43,255,0.8)", "0 0 0 rgba(0,43,255,0)"] } : {}}
                      transition={{ duration: 0.4 }}
                    />
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: progress > i * 24 + 10 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Corner: skip hint */}
          <div
            className="absolute bottom-6 right-8 z-20 pointer-events-none"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}
          >
            Press any key to skip
          </div>

          {/* Top-left: location */}
          <div
            className="absolute top-6 left-8 z-20 pointer-events-none"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}
          >
            Dhaka, Bangladesh · UTC+6
          </div>

          {/* Top-right: year */}
          <div
            className="absolute top-6 right-8 z-20 pointer-events-none"
            style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}
          >
            © 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
