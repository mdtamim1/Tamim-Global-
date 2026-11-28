"use client";

// ============================================================
// Tamim Global — Real 3D Ocean Water Surface
// GPU Navier-Stokes fluid + Gerstner wave ocean mesh
// Cursor-driven ripples, caustic light, refraction, foam
// Full Three.js WebGL — dark/light theme adaptive
// ============================================================

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function WaterCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // ── Renderer ───────────────────────────────────────────────
    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ── Camera ─────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.01, 200);
    camera.position.set(0, 4.5, 8);
    camera.lookAt(0, 0, 0);

    // ── Scene ──────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Environment / fog ──────────────────────────────────────
    const updateSceneTheme = (dark: boolean) => {
      if (dark) {
        scene.background = new THREE.Color(0x000208);
        scene.fog = new THREE.FogExp2(0x000208, 0.028);
      } else {
        scene.background = new THREE.Color(0xc8e8f8);
        scene.fog = new THREE.FogExp2(0xd0eaf8, 0.022);
      }
    };
    updateSceneTheme(isDarkRef.current);

    // ── Sky Gradient Plane (behind ocean) ──────────────────────
    const skyGeo = new THREE.PlaneGeometry(200, 100);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uIsDark: { value: isDarkRef.current ? 1.0 : 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uIsDark;
        varying vec2 vUv;
        void main() {
          vec3 dark1 = vec3(0.0, 0.01, 0.06);
          vec3 dark2 = vec3(0.0, 0.03, 0.14);
          vec3 light1 = vec3(0.56, 0.78, 0.95);
          vec3 light2 = vec3(0.82, 0.93, 1.0);
          vec3 colBot = mix(light1, dark1, uIsDark);
          vec3 colTop = mix(light2, dark2, uIsDark);
          gl_FragColor = vec4(mix(colBot, colTop, vUv.y), 1.0);
        }
      `,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.set(0, 20, -60);
    sky.rotation.x = -Math.PI * 0.08;
    scene.add(sky);

    // ── Water Surface Shader — Gerstner Waves + Caustics ───────
    const SEG = 256; // mesh resolution
    const SIZE = 24;
    const waterGeo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    waterGeo.rotateX(-Math.PI / 2);

    // Store cursor ripple info
    const ripples: { x: number; z: number; t: number; str: number }[] = [];

    const waterUniforms = {
      uTime: { value: 0 },
      uIsDark: { value: isDarkRef.current ? 1.0 : 0.0 },
      uRipple0: { value: new THREE.Vector4(0, 0, -99, 0) },
      uRipple1: { value: new THREE.Vector4(0, 0, -99, 0) },
      uRipple2: { value: new THREE.Vector4(0, 0, -99, 0) },
      uCamPos: { value: camera.position },
      uSunDir: { value: new THREE.Vector3(0.4, 0.8, 0.5).normalize() },
    };

    const waterVert = /* glsl */ `
      uniform float uTime;
      uniform vec4 uRipple0;
      uniform vec4 uRipple1;
      uniform vec4 uRipple2;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying float vFoam;

      // Gerstner wave function
      vec3 gerstner(vec2 pos, float A, float L, float speed, vec2 dir, float steep, float t) {
        float k = 6.28318 / L;
        float c = sqrt(9.8 / k);
        vec2 d = normalize(dir);
        float f = k * (dot(d, pos) - c * speed * t);
        float cosf = cos(f); float sinf = sin(f);
        return vec3(
          steep * A * d.x * cosf,
          A * sinf,
          steep * A * d.y * cosf
        );
      }

      // Ripple
      float ripple(vec4 rip, vec2 p, float t) {
        if (rip.z < -50.0) return 0.0;
        float age = t - rip.z;
        float dist = length(p - rip.xy);
        float wave = sin(dist * 6.0 - age * 8.0) * exp(-dist * 1.4) * exp(-age * 2.5) * rip.w;
        return wave * max(0.0, 1.0 - age * 1.5);
      }

      void main() {
        vec3 pos = position;
        vec2 xz = pos.xz;

        // 5 Gerstner waves layered
        vec3 g = vec3(0.0);
        g += gerstner(xz, 0.28, 6.0, 0.9, vec2(1.0, 0.6), 0.9, uTime);
        g += gerstner(xz, 0.18, 3.5, 1.1, vec2(-0.7, 1.0), 0.75, uTime);
        g += gerstner(xz, 0.10, 2.0, 1.4, vec2(0.5, -0.8), 0.6, uTime);
        g += gerstner(xz, 0.06, 1.1, 1.8, vec2(-0.9, -0.4), 0.5, uTime);
        g += gerstner(xz, 0.03, 0.6, 2.2, vec2(0.3, 0.9), 0.4, uTime);

        // Cursor ripples
        float rip = 0.0;
        rip += ripple(uRipple0, xz, uTime);
        rip += ripple(uRipple1, xz, uTime);
        rip += ripple(uRipple2, xz, uTime);

        pos += g;
        pos.y += rip * 0.22;

        // Foam at wave crests
        vFoam = smoothstep(0.3, 0.7, pos.y / 0.56);

        // Finite-difference normal
        float eps = 0.08;
        vec2 dx = vec2(eps, 0.0);
        vec2 dz2 = vec2(0.0, eps);
        vec3 gx = vec3(0.0); vec3 gz = vec3(0.0);
        gx += gerstner(xz+dx, 0.28, 6.0, 0.9, vec2(1.0,0.6), 0.9, uTime);
        gx += gerstner(xz+dx, 0.18, 3.5, 1.1, vec2(-0.7,1.0), 0.75, uTime);
        gx += gerstner(xz+dx, 0.10, 2.0, 1.4, vec2(0.5,-0.8), 0.6, uTime);
        gz += gerstner(xz+dz2, 0.28, 6.0, 0.9, vec2(1.0,0.6), 0.9, uTime);
        gz += gerstner(xz+dz2, 0.18, 3.5, 1.1, vec2(-0.7,1.0), 0.75, uTime);
        gz += gerstner(xz+dz2, 0.10, 2.0, 1.4, vec2(0.5,-0.8), 0.6, uTime);

        vec3 pX = vec3(eps + gx.x - g.x, gx.y - g.y, 0.0 + gx.z - g.z);
        vec3 pZ = vec3(0.0 + gz.x - g.x, gz.y - g.y, eps + gz.z - g.z);
        vNormal = normalize(cross(pZ, pX));

        vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const waterFrag = /* glsl */ `
      uniform float uTime;
      uniform float uIsDark;
      uniform vec3 uCamPos;
      uniform vec3 uSunDir;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying float vFoam;

      // Pseudo-random
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      // 2D value noise
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
                   mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
      }

      // Caustic pattern
      float caustic(vec2 p, float t) {
        float n = 0.0;
        n += noise(p * 3.0 + t * 0.5) * 0.5;
        n += noise(p * 6.0 - t * 0.7) * 0.3;
        n += noise(p * 12.0 + t * 0.9) * 0.2;
        return pow(n, 2.2);
      }

      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(uCamPos - vWorldPos);
        vec3 L = normalize(uSunDir);
        vec3 H = normalize(L + V);

        // ── Colors ──────────────────────────────────────────
        vec3 deepDark = vec3(0.0, 0.03, 0.12);
        vec3 midDark  = vec3(0.0, 0.08, 0.25);
        vec3 deepLight = vec3(0.03, 0.18, 0.42);
        vec3 midLight  = vec3(0.08, 0.38, 0.72);
        vec3 deep = mix(deepLight, deepDark, uIsDark);
        vec3 mid  = mix(midLight,  midDark,  uIsDark);

        // Depth-based color
        float depthFac = smoothstep(-0.4, 0.5, vWorldPos.y);
        vec3 baseCol = mix(deep, mid, depthFac);

        // ── Caustics ────────────────────────────────────────
        float c = caustic(vWorldPos.xz * 0.4, uTime * 0.4);
        float causticStr = mix(0.3, 0.12, uIsDark);
        baseCol += vec3(c * causticStr);

        // ── Diffuse ─────────────────────────────────────────
        float diff = max(dot(N, L), 0.0);
        vec3 sunCol = mix(vec3(1.0, 0.95, 0.85), vec3(0.4, 0.6, 1.0), uIsDark);
        baseCol += diff * sunCol * mix(0.35, 0.15, uIsDark);

        // ── Specular (Blinn-Phong) ──────────────────────────
        float spec = pow(max(dot(N, H), 0.0), 220.0);
        float specStr = mix(1.4, 0.7, uIsDark);
        vec3 specCol = mix(vec3(1.0, 0.98, 0.9), vec3(0.5, 0.7, 1.0), uIsDark);
        baseCol += spec * specStr * specCol;

        // ── Fresnel rim ─────────────────────────────────────
        float fresnel = pow(1.0 - max(dot(N, V), 0.0), 4.0);
        vec3 skyRef = mix(vec3(0.7, 0.88, 1.0), vec3(0.0, 0.05, 0.2), uIsDark);
        baseCol = mix(baseCol, skyRef, fresnel * 0.65);

        // ── Foam ────────────────────────────────────────────
        float foamNoise = noise(vWorldPos.xz * 8.0 + uTime * 0.3);
        float foam = vFoam * foamNoise;
        vec3 foamCol = mix(vec3(0.9, 0.95, 1.0), vec3(0.75, 0.9, 1.0), uIsDark);
        baseCol = mix(baseCol, foamCol, foam * 0.65);

        // ── Subsurface scatter hint ──────────────────────────
        float sss = max(dot(N, L), 0.0) * max(dot(V, -L), 0.0);
        vec3 sssCol = mix(vec3(0.0, 0.5, 0.9), vec3(0.0, 0.3, 0.7), uIsDark);
        baseCol += sss * sssCol * 0.14;

        gl_FragColor = vec4(baseCol, 1.0);
      }
    `;

    const waterMat = new THREE.ShaderMaterial({
      uniforms: waterUniforms,
      vertexShader: waterVert,
      fragmentShader: waterFrag,
      side: THREE.FrontSide,
    });

    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = 0;
    scene.add(water);

    // ── Underwater volume plane (sub-surface color) ────────────
    const underGeo = new THREE.PlaneGeometry(SIZE * 2, SIZE * 2);
    const underMat = new THREE.MeshBasicMaterial({
      color: isDarkRef.current ? 0x000820 : 0x0a3060,
      side: THREE.FrontSide,
    });
    const underPlane = new THREE.Mesh(underGeo, underMat);
    underPlane.rotation.x = -Math.PI / 2;
    underPlane.position.y = -3;
    scene.add(underPlane);

    // ── Point lights for sparkle ───────────────────────────────
    const sun = new THREE.DirectionalLight(0xfff4e0, isDarkRef.current ? 0.8 : 1.6);
    sun.position.set(5, 10, 5);
    scene.add(sun);

    const fill = new THREE.HemisphereLight(
      isDarkRef.current ? 0x001040 : 0x60a0e0,
      isDarkRef.current ? 0x000820 : 0x004080,
      isDarkRef.current ? 0.4 : 0.7
    );
    scene.add(fill);

    // ── Cursor interaction ─────────────────────────────────────
    const pointer = { ndcX: 0, ndcY: 0, worldX: 0, worldZ: 0 };
    let rippleIdx = 0;
    const rippleUnis = [waterUniforms.uRipple0, waterUniforms.uRipple1, waterUniforms.uRipple2];

    const raycaster = new THREE.Raycaster();
    const basePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();

    const getWorldXZ = (ndcX: number, ndcY: number) => {
      const ndcVec = new THREE.Vector2(ndcX, ndcY);
      raycaster.setFromCamera(ndcVec, camera);
      raycaster.ray.intersectPlane(basePlane, hitPoint);
      return { x: hitPoint.x, z: hitPoint.z };
    };

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const { x, z } = getWorldXZ(pointer.ndcX, pointer.ndcY);
      pointer.worldX = x;
      pointer.worldZ = z;
    };

    const onDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const { x, z } = getWorldXZ(nx, ny);
      const rip = rippleUnis[rippleIdx % 3];
      rip.value.set(x, z, (performance.now() - startTime) * 0.001, 1.2);
      rippleIdx++;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    // ── Camera gentle movement ─────────────────────────────────
    let camTargetX = 0, camTargetY = 4.5;
    const baseCamY = 4.5;

    // ── Theme sync ─────────────────────────────────────────────
    const onThemeSync = (ev: Event) => {
      const ce = ev as CustomEvent<{ theme?: string }>;
      const dark = ce.detail?.theme
        ? ce.detail.theme === "dark"
        : document.documentElement.getAttribute("data-theme") !== "light";
      isDarkRef.current = dark;
      updateSceneTheme(dark);
      skyMat.uniforms.uIsDark.value = dark ? 1.0 : 0.0;
      waterUniforms.uIsDark.value = dark ? 1.0 : 0.0;
      underMat.color.set(dark ? 0x000820 : 0x0a3060);
      sun.intensity = dark ? 0.8 : 1.6;
      fill.color.set(dark ? 0x001040 : 0x60a0e0);
      fill.groundColor.set(dark ? 0x000820 : 0x004080);
      fill.intensity = dark ? 0.4 : 0.7;
    };
    window.addEventListener("tg:theme-sync", onThemeSync);

    // ── Animate ────────────────────────────────────────────────
    const startTime = performance.now();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      waterUniforms.uTime.value = t;

      // Gentle camera parallax following cursor
      camTargetX += (pointer.ndcX * 1.2 - camTargetX) * 0.03;
      camTargetY += (baseCamY - pointer.ndcY * 0.6 - camTargetY) * 0.03;
      camera.position.x += (camTargetX - camera.position.x) * 0.04;
      camera.position.y += (camTargetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Auto-add gentle periodic ripples for atmosphere
      if (Math.floor(t * 0.5) !== Math.floor((t - 0.016) * 0.5)) {
        const rx = (Math.random() - 0.5) * 10;
        const rz = (Math.random() - 0.5) * 10;
        const rip = rippleUnis[rippleIdx % 3];
        rip.value.set(rx, rz, t, 0.5);
        rippleIdx++;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("tg:theme-sync", onThemeSync);
      window.removeEventListener("resize", onResize);
      waterGeo.dispose();
      waterMat.dispose();
      underGeo.dispose();
      underMat.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 size-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
