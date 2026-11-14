"use client";

// ============================================================
// Tamim Global — Three.js Hero Scene
// Interactive particle network that reacts to cursor movement.
// Lazy-loaded. Falls back gracefully on low-end / mobile.
// ============================================================

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ---- Particle field ----
function ParticleField({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random sphere of particles
  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random sphere distribution
      const r = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();

    // Slow base rotation
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;

    // Cursor influence — subtle displacement
    if (mouse.current) {
      const { x, y } = mouse.current;
      pointsRef.current.rotation.y += x * 0.0008;
      pointsRef.current.rotation.x += y * 0.0005;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#7C3AED"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// ---- Floating rings ----
function FloatingRing({
  radius,
  rotation,
  speed,
}: {
  radius: number;
  rotation: [number, number, number];
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + t * speed * 0.3;
    meshRef.current.rotation.z = rotation[2] + t * speed * 0.2;
  });

  return (
    <mesh ref={meshRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.004, 16, 100]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.15} />
    </mesh>
  );
}

// ---- Scene wrapper ----
function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ParticleField mouse={mouse} />
      <FloatingRing radius={2.0} rotation={[0.5, 0, 0.3]} speed={0.4} />
      <FloatingRing radius={2.8} rotation={[1.2, 0.3, 0.7]} speed={0.25} />
      <FloatingRing radius={3.4} rotation={[0.2, 0.8, 1.1]} speed={0.15} />
    </>
  );
}

// ---- Exported canvas component ----
interface HeroSceneProps {
  mouse: React.RefObject<{ x: number; y: number }>;
}

export default function HeroScene({ mouse }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]} // cap pixel ratio for performance
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}

