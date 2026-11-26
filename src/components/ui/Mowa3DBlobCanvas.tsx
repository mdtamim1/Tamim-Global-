"use client";

// ============================================================
// Tamim Global — Mowa Studio 1:1 3D Sculptures & Liquid Fluid Canvas
// - Procedural C-infinity SDF-projected 3D Cross Manifolds &
//   5-Lobe Rosette Hub (ultra-smooth studio normals & rounded rims)
// - Theme-reactive studio shaders (Dark Obsidian <-> Light Alabaster)
//   with exact un-tonemapped #000000 / #f4f4f0 background matching
// - High-DPI TA/MiM centerpiece composited into WebGL pipeline with
//   quantization-free deadzone (razor sharp at rest, chromatic fluid
//   refraction along cursor velocity wake)
// ============================================================

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

// Polynomial smooth-minimum for C-infinity fillets between limbs
function smin(a: number, b: number, k: number): number {
  const h = clamp(0.5 + (0.5 * (b - a)) / k, 0, 1);
  return b * (1 - h) + a * h - k * h * (1 - h);
}

// Smooth flared rounded cylinder limb along axis p0
function sdFlaredLimb(
  p0: number,
  p1: number,
  p2: number,
  halfLen = 0.86,
  baseR = 0.28,
): number {
  const ax = Math.abs(p0);
  const rad = Math.hypot(p1, p2);
  const flare = smoothstep(0.25, halfLen, ax);
  const rTube = baseR + flare * 0.11;
  const dx = rad - rTube;
  const dy = ax - halfLen;
  const outside = Math.hypot(Math.max(dx, 0), Math.max(dy, 0));
  const inside = Math.min(Math.max(dx, dy), 0);
  // Large silky bevel rounding without polygonal ridges
  return outside + inside - 0.08;
}

// 6-Arm Sculpted Cross Manifold SDF (matches Mowa center & left 3D shapes)
function sdCrossSculpture(x: number, y: number, z: number): number {
  const dX = sdFlaredLimb(x, y, z, 0.84, 0.28);
  const dY = sdFlaredLimb(y, x, z, 0.84, 0.28);
  const dZ = sdFlaredLimb(z, x, y, 0.84, 0.28);
  return smin(smin(dX, dY, 0.28), dZ, 0.28);
}

// 5-Lobe Rosette Hub SDF (distinct 5-lobe sculptural petals + subtle recessed center)
function sdRosetteHub(x: number, y: number, z: number): number {
  const coreEllip =
    (Math.hypot(x / 0.48, y / 0.48, z / 0.30) - 1.0) * 0.30;
  let d = coreEllip;

  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 2) / 5 + 0.18;
    const lx = x - Math.cos(a) * 0.62;
    const ly = y - Math.sin(a) * 0.62;
    const lobe =
      (Math.hypot(lx / 0.31, ly / 0.31, z / 0.28) - 1.0) * 0.26;
    d = smin(d, lobe, 0.16);
  }

  // Smooth central dimple matching Mowa right sculptural form
  const rXY = Math.hypot(x, y);
  const centerDimple =
    smoothstep(0.36, 0.0, rXY) * smoothstep(0.14, 0.34, Math.abs(z)) * 0.065;
  return d + centerDimple;
}

// Project unit icosphere vertices cleanly onto SDF with studio-smooth normals
function buildSDFGeometry(
  sdfFn: (x: number, y: number, z: number) => number,
  detail: number,
  maxRadius = 1.65,
): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const nrm = geo.attributes.normal as THREE.BufferAttribute;

  const cache = new Map<
    string,
    { px: number; py: number; pz: number; nx: number; ny: number; nz: number }
  >();

  // Larger normal finite difference smooths micro curvature softly
  const eps = 0.008;

  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);
    const len = Math.hypot(vx, vy, vz) || 1;
    const dx = vx / len;
    const dy = vy / len;
    const dz = vz / len;

    const key = `${Math.round(dx * 5000)}_${Math.round(dy * 5000)}_${Math.round(dz * 5000)}`;
    let hit = cache.get(key);

    if (!hit) {
      let lo = 0.08;
      let hi = maxRadius;
      for (let it = 0; it < 16; it++) {
        const mid = (lo + hi) * 0.5;
        if (sdfFn(dx * mid, dy * mid, dz * mid) < 0) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      const r = (lo + hi) * 0.5;
      const px = dx * r;
      const py = dy * r;
      const pz = dz * r;

      const gx =
        sdfFn(px + eps, py, pz) - sdfFn(px - eps, py, pz);
      const gy =
        sdfFn(px, py + eps, pz) - sdfFn(px, py - eps, pz);
      const gz =
        sdfFn(px, py, pz + eps) - sdfFn(px, py, pz - eps);
      const gl = Math.hypot(gx, gy, gz) || 1;

      hit = {
        px,
        py,
        pz,
        nx: gx / gl,
        ny: gy / gl,
        nz: gz / gl,
      };
      cache.set(key, hit);
    }

    pos.setXYZ(i, hit.px, hit.py, hit.pz);
    nrm.setXYZ(i, hit.nx, hit.ny, hit.nz);
  }

  pos.needsUpdate = true;
  nrm.needsUpdate = true;
  geo.computeBoundingSphere();
  return geo;
}

// High-DPI vector CanvasTexture for TA / MiM monogram inside WebGL fluid composite
function createMonogramTexture(isDark: boolean): THREE.CanvasTexture {
  const w = 1024;
  const h = 854;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, w, h);
    ctx.scale(w / 240, h / 200);
    ctx.fillStyle = isDark ? "#ffffff" : "#0a0a0a";

    if (isDark) {
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
    }

    const paths = [
      // T
      "M20 20 H105 V34 H70 V100 H50 V34 H20 V20 Z",
      // A
      "M130 100 L160 20 H180 L210 100 H188 L182 82 H158 L152 100 H130 Z M163 68 H177 L170 42 L163 68 Z",
      // M1
      "M20 180 V115 H38 L55 152 L72 115 H90 V180 H74 V142 L59 174 H51 L36 142 V180 H20 Z",
      // i
      "M106 180 V128 H124 V180 H106 Z M106 120 V110 H124 V120 H106 Z",
      // M2
      "M140 180 V115 H158 L175 152 L192 115 H210 V180 H194 V142 L179 174 H171 L156 142 V180 H140 Z",
    ];

    paths.forEach((d) => {
      const p = new Path2D(d);
      ctx.fill(p);
    });
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

// 3D Studio Sculpture Shaders
const meshVertexShader = `
uniform float uTime;
uniform float uPulse;
varying vec3 vNormalView;
varying vec3 vWorldPos;

void main() {
  float breath = sin(uTime * 0.9 + position.x * 1.4 + position.y * 1.1) * 0.010;
  vec3 pos = position * (1.0 + breath + uPulse * 0.022);
  vNormalView = normalize(normalMatrix * normal);
  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const meshFragmentShader = `
uniform vec3  uLightDir;
uniform vec3  uBaseColor;
uniform vec3  uShadowColor;
uniform vec3  uRimColor;
uniform float uIsDark;

varying vec3 vNormalView;
varying vec3 vWorldPos;

void main() {
  vec3 N = normalize(vNormalView);
  vec3 V = normalize(-vWorldPos + vec3(0.0, 0.0, 5.2));
  vec3 L = normalize(uLightDir);
  vec3 L2 = normalize(vec3(-2.8, -1.5, 2.0));

  float NdotV = clamp(dot(N, V), 0.0, 1.0);
  float wrapDiff = clamp((dot(N, L) + 0.5) / 1.5, 0.0, 1.0);
  float fillDiff = max(dot(N, L2), 0.0);

  vec3 H = normalize(L + V);
  float specBroad = pow(max(dot(N, H), 0.0), mix(14.0, 24.0, uIsDark));
  float specSharp = pow(max(dot(N, H), 0.0), mix(56.0, 105.0, uIsDark));
  float fresnel = pow(1.0 - NdotV, 3.0);

  vec3 col = mix(uShadowColor, uBaseColor, wrapDiff);
  col += uRimColor * fillDiff * mix(0.14, 0.12, uIsDark);
  col += uRimColor * fresnel * mix(0.18, 0.34, uIsDark);
  col += specBroad * mix(0.10, 0.18, uIsDark) + specSharp * mix(0.16, 0.45, uIsDark);

  gl_FragColor = vec4(col, 1.0);
}
`;

// Fullscreen Ping-Pong Fluid Velocity & Ripple Pass
const fluidSimVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fluidSimFragmentShader = `
precision highp float;

uniform sampler2D tPrev;
uniform vec2  uTexelSize;
uniform vec2  uMousePos;
uniform vec2  uMouseDelta;
uniform vec2  uClickPos;
uniform float uClickImpulse;
uniform float uAspect;

varying vec2 vUv;

vec4 decodeFluid(vec4 raw) {
  return vec4(raw.rg * 2.0 - 1.0, raw.b * 2.0 - 1.0, raw.a);
}

vec4 encodeFluid(vec2 vel, float wave, float energy) {
  return vec4(
    clamp(vel * 0.5 + 0.5, 0.0, 1.0),
    clamp(wave * 0.5 + 0.5, 0.0, 1.0),
    clamp(energy, 0.0, 1.0)
  );
}

void main() {
  vec4 cur = decodeFluid(texture2D(tPrev, vUv));
  vec2 backUv = clamp(vUv - cur.xy * uTexelSize * 8.5, vec2(0.002), vec2(0.998));
  vec4 adv = decodeFluid(texture2D(tPrev, backUv));

  vec4 n1 = decodeFluid(texture2D(tPrev, clamp(backUv + vec2(uTexelSize.x, 0.0), 0.0, 1.0)));
  vec4 n2 = decodeFluid(texture2D(tPrev, clamp(backUv - vec2(uTexelSize.x, 0.0), 0.0, 1.0)));
  vec4 n3 = decodeFluid(texture2D(tPrev, clamp(backUv + vec2(0.0, uTexelSize.y), 0.0, 1.0)));
  vec4 n4 = decodeFluid(texture2D(tPrev, clamp(backUv - vec2(0.0, uTexelSize.y), 0.0, 1.0)));
  vec4 avg = (n1 + n2 + n3 + n4) * 0.25;

  vec2 vel = mix(adv.xy, avg.xy, 0.25) * 0.915;
  float wave = mix(adv.z, avg.z, 0.30) * 0.905;
  float energy = mix(adv.a, avg.a, 0.22) * 0.92;

  vec2 diff = (vUv - uMousePos) * vec2(uAspect, 1.0);
  float dist2 = dot(diff, diff);
  float brush = exp(-dist2 / 0.0048);

  float moveSpeed = length(uMouseDelta);
  vec2 dir = moveSpeed > 0.0005 ? uMouseDelta : vec2(0.0);
  vel += dir * brush * 3.0;
  vec2 perp = vec2(-diff.y, diff.x);
  vel += perp * brush * min(moveSpeed * 9.0, 0.9) * 0.45;
  wave += brush * min(moveSpeed * 10.0, 0.85);
  energy = max(energy, brush * min(moveSpeed * 14.0, 1.0));

  if (uClickImpulse > 0.001) {
    vec2 cDiff = (vUv - uClickPos) * vec2(uAspect, 1.0);
    float cDist = length(cDiff);
    float ring = exp(-pow(cDist - (1.0 - uClickImpulse) * 0.24, 2.0) / 0.0018);
    vec2 radial = cDist > 0.0001 ? cDiff / cDist : vec2(0.0, 1.0);
    vel += radial * ring * uClickImpulse * 0.85;
    wave += ring * uClickImpulse * 0.9;
    energy = max(energy, ring * uClickImpulse);
  }

  gl_FragColor = encodeFluid(clamp(vel, -1.0, 1.0), clamp(wave, -1.0, 1.0), energy);
}
`;

// Final Screen Composite + Deadzone-Cleaned Fluid Refraction & Chromatic Pass
const compositeFragmentShader = `
precision highp float;

uniform sampler2D tScene;
uniform sampler2D tFluid;
uniform sampler2D tLogo;
uniform vec2  uFluidTexel;
uniform vec4  uLogoRect;
uniform float uIsDark;

varying vec2 vUv;

vec3 sampleLayer(vec2 uv) {
  vec3 col = texture2D(tScene, clamp(uv, 0.001, 0.999)).rgb;
  vec2 luv = (uv - uLogoRect.xy) / max(uLogoRect.zw, vec2(0.0001));
  if (luv.x >= 0.0 && luv.x <= 1.0 && luv.y >= 0.0 && luv.y <= 1.0) {
    vec4 logo = texture2D(tLogo, luv);
    col = mix(col, logo.rgb, logo.a);
  }
  return col;
}

void main() {
  vec4 f = texture2D(tFluid, vUv);
  vec2 rawVel = f.rg * 2.0 - 1.0;
  float energy = f.a;

  float eR = texture2D(tFluid, clamp(vUv + vec2(uFluidTexel.x, 0.0), 0.0, 1.0)).a;
  float eL = texture2D(tFluid, clamp(vUv - vec2(uFluidTexel.x, 0.0), 0.0, 1.0)).a;
  float eU = texture2D(tFluid, clamp(vUv + vec2(0.0, uFluidTexel.y), 0.0, 1.0)).a;
  float eD = texture2D(tFluid, clamp(vUv - vec2(0.0, uFluidTexel.y), 0.0, 1.0)).a;
  vec2 rawGrad = vec2(eR - eL, eU - eD);

  // Smooth deadzone kills 8-bit 128/255 bias with C1 continuity (zero stepped seam)
  vec2 vel = rawVel * smoothstep(0.024, 0.095, length(rawVel));
  vec2 grad = rawGrad * smoothstep(0.020, 0.085, length(rawGrad));

  vec2 warp = vel * 0.072 + grad * 0.095;
  float warpMag = length(warp);

  vec2 chrom = warp * smoothstep(0.002, 0.032, warpMag) * 0.55;
  float r = sampleLayer(vUv - warp - chrom).r;
  float g = sampleLayer(vUv - warp).g;
  float b = sampleLayer(vUv - warp + chrom).b;
  vec3 col = vec3(r, g, b);

  float wakeMask = smoothstep(0.04, 0.45, energy) * clamp(warpMag * 28.0 + energy * 0.45, 0.0, 1.0);
  vec3 prismTint = mix(
    vec3(0.08, 0.45, 0.95),
    vec3(0.95, 0.48, 0.14),
    clamp(grad.x * 5.0 + 0.5, 0.0, 1.0)
  );
  float highlight = pow(clamp(dot(normalize(vec3(grad * 8.0, 0.25)), normalize(vec3(0.4, 0.7, 0.6))), 0.0, 1.0), 6.0);

  if (uIsDark > 0.5) {
    col += prismTint * wakeMask * 0.14;
    col += vec3(0.82, 0.90, 1.0) * highlight * wakeMask * 0.22;
  } else {
    col -= (1.0 - prismTint) * wakeMask * 0.09;
    col += vec3(1.0) * highlight * wakeMask * 0.18;
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

// Exact un-tonemapped Linear-matching studio palettes
const DARK_PALETTE = {
  bg: new THREE.Color(0x000000),
  base: new THREE.Vector3(0.06, 0.06, 0.068),
  shadow: new THREE.Vector3(0.012, 0.012, 0.015),
  rim: new THREE.Vector3(0.32, 0.34, 0.40),
  isDark: 1.0,
};

const LIGHT_PALETTE = {
  bg: new THREE.Color(0xf4f4f0),
  base: new THREE.Vector3(0.88, 0.88, 0.89),
  shadow: new THREE.Vector3(0.54, 0.55, 0.59),
  rim: new THREE.Vector3(0.98, 0.98, 1.0),
  isDark: 0.0,
};

interface SculptureItem {
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  curPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  attract: number;
  lag: number;
  baseRot: THREE.Euler;
  rotSpeedY: number;
  rotSpeedX: number;
  phase: number;
  uniforms: Record<string, { value: unknown }>;
}

export default function Mowa3DBlobCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    // NoToneMapping preserves exact #000000 & #f4f4f0 canvas match with CSS backdrop
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, width < 768 ? 7.2 : 5.3);

    const initDark =
      document.documentElement.getAttribute("data-theme") !== "light";
    isDarkRef.current = initDark;
    const initPal = initDark ? DARK_PALETTE : LIGHT_PALETTE;
    scene.background = initPal.bg.clone();

    const makeUniforms = () => ({
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uLightDir: { value: new THREE.Vector3(2.4, 3.2, 4.0).normalize() },
      uBaseColor: { value: initPal.base.clone() },
      uShadowColor: { value: initPal.shadow.clone() },
      uRimColor: { value: initPal.rim.clone() },
      uIsDark: { value: initPal.isDark },
    });

    const crossCenterGeo = buildSDFGeometry(sdCrossSculpture, 5, 1.55);
    const crossSideGeo = buildSDFGeometry(sdCrossSculpture, 4, 1.55);
    const rosetteGeo = buildSDFGeometry(sdRosetteHub, 4, 1.35);

    const sculptures: SculptureItem[] = [];

    const addSculpture = (
      geo: THREE.BufferGeometry,
      scale: number,
      pos: [number, number, number],
      rot: [number, number, number],
      attract: number,
      lag: number,
      rotSpeedY: number,
      rotSpeedX: number,
      phase: number,
    ) => {
      const uni = makeUniforms();
      const mat = new THREE.ShaderMaterial({
        vertexShader: meshVertexShader,
        fragmentShader: meshFragmentShader,
        uniforms: uni,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.setScalar(scale);
      const bp = new THREE.Vector3(...pos);
      mesh.position.copy(bp);
      const baseRot = new THREE.Euler(...rot);
      mesh.rotation.copy(baseRot);
      scene.add(mesh);

      sculptures.push({
        mesh,
        basePos: bp.clone(),
        curPos: bp.clone(),
        targetPos: bp.clone(),
        attract,
        lag,
        baseRot,
        rotSpeedY,
        rotSpeedX,
        phase,
        uniforms: uni as Record<string, { value: unknown }>,
      });
    };

    // 1. Center Monolithic 3D Cross (tilted diagonally like Mowa centerpiece)
    addSculpture(
      crossCenterGeo,
      1.12,
      [0.0, 0.08, 0.0],
      [0.52, 0.66, 0.24],
      0.30,
      0.035,
      0.08,
      0.05,
      0.0,
    );
    // 2. Top-Left Mini 3D Cross
    addSculpture(
      crossSideGeo,
      0.34,
      [-2.35, 1.25, -0.7],
      [0.72, -0.58, 0.45],
      0.22,
      0.025,
      -0.14,
      0.08,
      1.8,
    );
    // 3. Top-Right 5-Lobe Rosette Hub
    addSculpture(
      rosetteGeo,
      0.90,
      [2.28, 0.96, -0.45],
      [0.32, -0.54, -0.18],
      0.28,
      0.028,
      0.07,
      -0.09,
      3.4,
    );

    const rtOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: true,
    };
    const sceneRT = new THREE.WebGLRenderTarget(
      Math.max(1, Math.floor(width * dpr)),
      Math.max(1, Math.floor(height * dpr)),
      rtOpts,
    );

    const fluidW = 256;
    const fluidH = Math.max(128, Math.round((256 * height) / Math.max(width, 1)));
    const fluidOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let fluidRead = new THREE.WebGLRenderTarget(fluidW, fluidH, fluidOpts);
    let fluidWrite = new THREE.WebGLRenderTarget(fluidW, fluidH, fluidOpts);

    const logoTexDark = createMonogramTexture(true);
    const logoTexLight = createMonogramTexture(false);

    const fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const fsQuadGeo = new THREE.PlaneGeometry(2, 2);

    const fluidSimUni = {
      tPrev: { value: fluidRead.texture },
      uTexelSize: { value: new THREE.Vector2(1 / fluidW, 1 / fluidH) },
      uMousePos: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseDelta: { value: new THREE.Vector2(0, 0) },
      uClickPos: { value: new THREE.Vector2(0.5, 0.5) },
      uClickImpulse: { value: 0 },
      uAspect: { value: width / Math.max(height, 1) },
    };
    const fluidSimMat = new THREE.ShaderMaterial({
      vertexShader: fluidSimVertexShader,
      fragmentShader: fluidSimFragmentShader,
      uniforms: fluidSimUni,
      depthTest: false,
      depthWrite: false,
    });
    const fluidSimScene = new THREE.Scene();
    fluidSimScene.add(new THREE.Mesh(fsQuadGeo, fluidSimMat));

    const compositeUni = {
      tScene: { value: sceneRT.texture },
      tFluid: { value: fluidRead.texture },
      tLogo: { value: initDark ? logoTexDark : logoTexLight },
      uFluidTexel: { value: new THREE.Vector2(1 / fluidW, 1 / fluidH) },
      uLogoRect: { value: new THREE.Vector4(0.4, 0.4, 0.2, 0.2) },
      uIsDark: { value: initPal.isDark },
    };
    const compositeMat = new THREE.ShaderMaterial({
      vertexShader: fluidSimVertexShader,
      fragmentShader: compositeFragmentShader,
      uniforms: compositeUni,
      depthTest: false,
      depthWrite: false,
    });
    const compositeScene = new THREE.Scene();
    compositeScene.add(new THREE.Mesh(fsQuadGeo, compositeMat));

    const updateLogoRectAndCenter = () => {
      const slot = document.querySelector("[data-mowa-logo-slot]");
      const cRect = container.getBoundingClientRect();
      if (slot && cRect.width > 0 && cRect.height > 0) {
        const sRect = slot.getBoundingClientRect();
        const xMin = (sRect.left - cRect.left) / cRect.width;
        const wNorm = sRect.width / cRect.width;
        const yBottom =
          1 - (sRect.bottom - cRect.top) / cRect.height;
        const hNorm = sRect.height / cRect.height;
        compositeUni.uLogoRect.value.set(xMin, yBottom, wNorm, hNorm);

        const centerNdcY = (yBottom + hNorm * 0.5) * 2 - 1;
        if (sculptures[0]) {
          sculptures[0].basePos.y = centerNdcY * 1.45;
        }
      } else {
        compositeUni.uLogoRect.value.set(0.41, 0.42, 0.18, 0.24);
      }
    };
    updateLogoRectAndCenter();
    requestAnimationFrame(updateLogoRectAndCenter);

    const pointer = {
      uvX: 0.5,
      uvY: 0.5,
      dx: 0,
      dy: 0,
      ndcX: 0,
      ndcY: 0,
      rawNdcX: 0,
      rawNdcY: 0,
      clickImpulse: 0,
      clickX: 0.5,
      clickY: 0.5,
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const ny = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1);
      pointer.dx += clamp(nx - pointer.uvX, -0.08, 0.08);
      pointer.dy += clamp(ny - pointer.uvY, -0.08, 0.08);
      pointer.uvX = nx;
      pointer.uvY = ny;
      pointer.rawNdcX = nx * 2 - 1;
      pointer.rawNdcY = ny * 2 - 1;
    };

    const onPointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      if (e.clientY > rect.bottom) return;
      pointer.clickX = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      pointer.clickY = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1);
      pointer.clickImpulse = 1.0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    const renderFrame = (t: number, runFluid: boolean) => {
      if (runFluid) {
        fluidSimUni.tPrev.value = fluidRead.texture;
        fluidSimUni.uMousePos.value.set(pointer.uvX, pointer.uvY);
        fluidSimUni.uMouseDelta.value.set(pointer.dx, pointer.dy);
        fluidSimUni.uClickPos.value.set(pointer.clickX, pointer.clickY);
        fluidSimUni.uClickImpulse.value = pointer.clickImpulse;

        renderer.setRenderTarget(fluidWrite);
        renderer.render(fluidSimScene, fsCam);

        const tmp = fluidRead;
        fluidRead = fluidWrite;
        fluidWrite = tmp;

        pointer.dx *= 0.35;
        pointer.dy *= 0.35;
        pointer.clickImpulse *= 0.88;
      }

      pointer.ndcX += (pointer.rawNdcX - pointer.ndcX) * 0.055;
      pointer.ndcY += (pointer.rawNdcY - pointer.ndcY) * 0.055;

      camera.position.x = pointer.ndcX * 0.32;
      camera.position.y = -pointer.ndcY * 0.22;
      camera.lookAt(0, 0, 0);

      sculptures.forEach((s, idx) => {
        const ox = Math.cos(t * 0.35 + s.phase) * (idx === 0 ? 0.04 : 0.09);
        const oy = Math.sin(t * 0.45 + s.phase) * (idx === 0 ? 0.05 : 0.08);
        s.targetPos.set(
          s.basePos.x + ox + pointer.ndcX * 0.8 * s.attract,
          s.basePos.y + oy + pointer.ndcY * 0.55 * s.attract,
          s.basePos.z,
        );
        s.curPos.lerp(s.targetPos, s.lag);
        s.mesh.position.copy(s.curPos);

        s.mesh.rotation.x =
          s.baseRot.x +
          Math.sin(t * 0.25 + s.phase) * 0.14 +
          pointer.ndcY * 0.25 +
          t * s.rotSpeedX;
        s.mesh.rotation.y =
          s.baseRot.y +
          Math.cos(t * 0.2 + s.phase) * 0.16 +
          pointer.ndcX * 0.3 +
          t * s.rotSpeedY;
        s.mesh.rotation.z = s.baseRot.z + Math.sin(t * 0.18 + s.phase) * 0.08;

        s.uniforms.uTime.value = t;
        s.uniforms.uPulse.value = pointer.clickImpulse;
        (s.uniforms.uLightDir.value as THREE.Vector3)
          .set(2.4 + pointer.ndcX * 1.4, 3.2 - pointer.ndcY * 1.0, 4.0)
          .normalize();
      });

      renderer.setRenderTarget(sceneRT);
      renderer.render(scene, camera);

      compositeUni.tScene.value = sceneRT.texture;
      compositeUni.tFluid.value = fluidRead.texture;
      renderer.setRenderTarget(null);
      renderer.render(compositeScene, fsCam);
    };

    const applyPaletteNow = (dark: boolean) => {
      const pal = dark ? DARK_PALETTE : LIGHT_PALETTE;
      scene.background = pal.bg.clone();
      sculptures.forEach((s) => {
        (s.uniforms.uBaseColor.value as THREE.Vector3).copy(pal.base);
        (s.uniforms.uShadowColor.value as THREE.Vector3).copy(pal.shadow);
        (s.uniforms.uRimColor.value as THREE.Vector3).copy(pal.rim);
        s.uniforms.uIsDark.value = pal.isDark;
      });
      compositeUni.tLogo.value = dark ? logoTexDark : logoTexLight;
      compositeUni.uIsDark.value = pal.isDark;
      renderFrame((performance.now() - startTime) * 0.001, false);
    };

    const onThemeSync = (ev: Event) => {
      const ce = ev as CustomEvent<{ theme?: string }>;
      const dark = ce.detail?.theme
        ? ce.detail.theme === "dark"
        : document.documentElement.getAttribute("data-theme") !== "light";
      applyPaletteNow(dark);
    };
    window.addEventListener("tg:theme-sync", onThemeSync);

    let animId = 0;
    const startTime = performance.now();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;
      renderFrame(t, true);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      camera.position.z = width < 768 ? 7.2 : 5.3;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      sceneRT.setSize(
        Math.max(1, Math.floor(width * dpr)),
        Math.max(1, Math.floor(height * dpr)),
      );
      fluidSimUni.uAspect.value = width / Math.max(height, 1);
      updateLogoRectAndCenter();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("tg:theme-sync", onThemeSync);
      window.removeEventListener("resize", onResize);

      sculptures.forEach((s) => {
        (s.mesh.material as THREE.ShaderMaterial).dispose();
      });
      crossCenterGeo.dispose();
      crossSideGeo.dispose();
      rosetteGeo.dispose();
      fsQuadGeo.dispose();
      fluidSimMat.dispose();
      compositeMat.dispose();
      logoTexDark.dispose();
      logoTexLight.dispose();
      sceneRT.dispose();
      fluidRead.dispose();
      fluidWrite.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 size-full pointer-events-none select-none z-0"
    />
  );
}
