"use client";

// ============================================================
// Tamim Global — Futuristic Cyber 3D Hero Scene
// Cosmic particle constellation + crystalline wireframe core.
// Interacts smoothly with cursor movements.
// ============================================================

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// ---- Dual-color Cosmic Particle Field ----
function CosmicParticles({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const violet = new THREE.Color("#8B5CF6");
    const cyan = new THREE.Color("#06B6D4");
    const white = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      const r = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 0.5;

      // Color distribution: 60% violet, 30% cyan, 10% white
      const rand = Math.random();
      const chosenColor = rand > 0.4 ? violet : rand > 0.1 ? cyan : white;
      col[i * 3]     = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();

    // Constant slow planetary drift
    pointsRef.current.rotation.y = t * 0.035;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.08;

    // Fluid cursor displacement
    if (mouse.current) {
      const targetY = mouse.current.x * 0.0012;
      const targetX = mouse.current.y * 0.0008;
      pointsRef.current.rotation.y += targetY;
      pointsRef.current.rotation.x += targetX;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled>
      <PointMaterial
        transparent
        vertexColors
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ---- Floating Holographic Wireframe Core ----
function HolographicCore({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      if (mouse.current) {
        meshRef.current.position.x = mouse.current.x * 0.3;
        meshRef.current.position.y = -mouse.current.y * 0.3;
      }
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.25;
      innerRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={[0, 0, -0.5]}>
        {/* Outer wireframe icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial
            wireframe
            color="#A78BFA"
            transparent
            opacity={0.22}
          />
        </mesh>

        {/* Inner geometric core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial
            wireframe
            color="#22D3EE"
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ---- Exported 3D Scene Canvas ----
export default function HeroScene({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <CosmicParticles mouse={mouse} />
      <HolographicCore mouse={mouse} />
    </Canvas>
  );
}
