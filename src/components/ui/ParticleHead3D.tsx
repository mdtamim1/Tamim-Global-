"use client";

// ============================================================
// Tamim Global — 3D Multi-Color Neural Particle Head
// 3,634 Individual 3D Particles with Dynamic Assembly Animation
// Features:
// - "Unready" floating/dispersed state morphing into sculpted face
// - Vibrant multi-color chromatic particle palette (electric cyan, neon violet, magenta, lime gold, azure)
// - Continuous harmonic 3D breathing wave motion
// - Real-time 3D perspective mouse tilt & proximity repulsion
// ============================================================

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HEAD_POINTS } from "@/data/headPoints";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Convert Coordinates to Rich High-Contrast Vibrant Multi-Color Palette
function createMultiColorPalette(cx: number, cy: number, i: number, total: number): THREE.Color {
  // Normalized 0 to 1
  const ny = Math.min(1, Math.max(0, (cy - 20) / 750));
  const nx = Math.min(1, Math.max(0, (cx - 15) / 600));

  const color = new THREE.Color();
  const hueShift = Math.sin(i * 0.12) * 0.05;

  // Saturated high-contrast luxury spectrum optimized for crisp visibility on clean backgrounds:
  if (ny < 0.22) {
    // Top crown & hair: Deep Electric Violet / Purple
    color.setHSL(0.76 + hueShift, 0.95, 0.46);
  } else if (ny < 0.42) {
    // Upper face & forehead: Vivid Magenta & Hot Pink
    color.setHSL(0.88 + hueShift, 0.95, 0.48);
  } else if (ny < 0.65) {
    // Profile, nose & lips: Electric Cyan & Deep Cerulean
    if (nx < 0.45) {
      color.setHSL(0.52 + hueShift, 1.0, 0.40); // Intense Cyan on front profile
    } else {
      color.setHSL(0.58 + hueShift, 0.95, 0.44); // Deep Azure
    }
  } else if (ny < 0.82) {
    // Jaw & lower cheek: Vibrant Emerald & Sunset Amber
    if (nx < 0.5) {
      color.setHSL(0.08 + hueShift, 0.98, 0.48); // Sunset Amber / Tangerine
    } else {
      color.setHSL(0.42 + hueShift, 0.95, 0.38); // Deep Emerald
    }
  } else {
    // Neck and base: Royal Cobalt & Electric Indigo
    color.setHSL(0.66 + hueShift, 0.98, 0.46);
  }

  return color;
}

export default function ParticleHead3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animFrameId: number;
    const totalPoints = HEAD_POINTS.length;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 0, 520);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    // 2. Compute 3D Coordinates & Volumetric Depth
    const positions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);
    const sizes = new Float32Array(totalPoints);

    const targetPos = new Float32Array(totalPoints * 3);
    const unreadyPos = new Float32Array(totalPoints * 3);

    const cx0 = 311.5;
    const cy0 = 394.6;
    const scaleFactor = 0.44;

    for (let i = 0; i < totalPoints; i++) {
      const [cx, cy, r] = HEAD_POINTS[i];

      // Target Coordinates (sculpted 3D head profile)
      const tx = (cx - cx0) * scaleFactor;
      const ty = -(cy - cy0) * scaleFactor;

      // Realistic 3D Facial Contour Curve along Z
      const normalizedX = (cx - 16) / 590; // 0 (front of nose) to 1 (back of head)
      const normalizedY = (cy - 21) / 746;

      // Sculpt depth: nose and cheekbones push forward (positive Z)
      const depthProfile =
        Math.cos(normalizedX * Math.PI * 0.9) * 38 +
        Math.sin(normalizedY * Math.PI) * 22 +
        (Math.random() - 0.5) * 8;

      targetPos[i * 3] = tx;
      targetPos[i * 3 + 1] = ty;
      targetPos[i * 3 + 2] = depthProfile;

      // Initial "Unready" Dispersed Coordinates (expanded 3D particle field)
      const spreadAngle = (i / totalPoints) * Math.PI * 12;
      const spreadRadius = 140 + Math.random() * 260;
      unreadyPos[i * 3] = tx * 2.4 + Math.cos(spreadAngle) * spreadRadius + (Math.random() - 0.5) * 120;
      unreadyPos[i * 3 + 1] = ty * 2.2 + Math.sin(spreadAngle) * spreadRadius + (Math.random() - 0.5) * 120;
      unreadyPos[i * 3 + 2] = (Math.random() - 0.5) * 450 - 120;

      // Start particles at unready positions
      positions[i * 3] = unreadyPos[i * 3];
      positions[i * 3 + 1] = unreadyPos[i * 3 + 1];
      positions[i * 3 + 2] = unreadyPos[i * 3 + 2];

      // Dynamic vibrant colors
      const col = createMultiColorPalette(cx, cy, i, totalPoints);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      // Varied particle sizes for rich visual depth
      sizes[i] = Math.max(2.2, r * 2.8);
    }

    // 3. BufferGeometry & Custom Shader Material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (420.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          // Circular particle with antialiased soft feather
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.18, dist);
          
          // Subtle luminous white core highlight
          vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), (1.0 - dist * 2.0) * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha * 0.95);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Initial slight rotation for three-quarter perspective
    particles.rotation.y = 0.15;
    particles.rotation.x = -0.05;

    // 4. Smooth Assembly Animation (Unready -> Complete Form)
    const animState = {
      progress: 0, // 0 = unready dispersed, 1 = sculpted head
    };

    // Trigger assembly on ScrollTrigger or immediate smooth entry
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(animState, {
          progress: 1,
          duration: 2.2,
          ease: "power3.out",
          onComplete: () => setIsReady(true),
        });
      },
      once: true,
    });

    // Fallback: If already in view on mount
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      gsap.to(animState, {
        progress: 1,
        duration: 2.2,
        ease: "power3.out",
        onComplete: () => setIsReady(true),
      });
    }

    // 5. Interactive Mouse Parallax & Proximity
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = -0.05;
    let targetRotY = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener("resize", handleResize);

    // 7. Render Loop with Continuous 3D Wave & Dynamic Interpolation
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smooth camera / mesh rotation towards mouse target
      particles.rotation.y += (targetRotY - particles.rotation.y) * 0.05;
      particles.rotation.x += (targetRotX - particles.rotation.x) * 0.05;

      const pArray = geometry.attributes.position.array as Float32Array;
      const p = animState.progress;
      const invP = 1 - p;

      // Calculate continuous harmonic 3D breathing wave
      for (let i = 0; i < totalPoints; i++) {
        const idx = i * 3;
        const tx = targetPos[idx];
        const ty = targetPos[idx + 1];
        const tz = targetPos[idx + 2];

        const ux = unreadyPos[idx];
        const uy = unreadyPos[idx + 1];
        const uz = unreadyPos[idx + 2];

        // 3D Harmonic Breathing Wave
        const waveX = Math.sin(elapsedTime * 1.6 + ty * 0.04) * 3.5;
        const waveY = Math.cos(elapsedTime * 1.3 + tx * 0.04) * 3.0;
        const waveZ = Math.sin(elapsedTime * 1.8 + (tx + ty) * 0.03) * 5.0;

        // Interpolate between unready and sculpted target + wave
        pArray[idx] = ux * invP + (tx + waveX) * p;
        pArray[idx + 1] = uy * invP + (ty + waveY) * p;
        pArray[idx + 2] = uz * invP + (tz + waveZ) * p;
      }

      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    // 8. Clean Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      st.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative size-full flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[580px] max-h-[640px] object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
