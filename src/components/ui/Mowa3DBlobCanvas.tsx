"use client";

// ============================================================
// Tamim Global – Mowa Studio 1:1 Cursor-Reactive 3D Blob Canvas
// Theme-aware: Dark mode = near-black obsidian blobs
//              Light mode = pearl-white/silver blobs
// ============================================================

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

const vertexShader = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0,0.5,1,2);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

uniform float uTime;
uniform float uSpiky;
uniform vec2  uMouseNDC;
uniform float uProximity;

varying vec3  vNormal;
varying vec3  vWorldPos;
varying float vDisplacement;

void main(){
  float freq1 = 0.7  + uSpiky * 1.5;
  float freq2 = 1.4  + uSpiky * 3.0;
  float freq3 = 2.8  + uSpiky * 5.0;
  float amp   = 0.22 + uSpiky * 0.18 + uProximity * 0.12;

  float n1 = snoise(position * freq1 + uTime * 0.20) * 0.70;
  float n2 = snoise(position * freq2 + uTime * 0.15) * 0.20;
  float n3 = snoise(position * freq3 + uTime * 0.10) * 0.10;
  float disp = (n1 + n2 + n3) * amp;

  vec3 cursorDir = normalize(vec3(uMouseNDC, 0.5));
  float pull = uProximity * 0.18;
  vec3 newPos = position + normal * disp + cursorDir * pull * (0.5 - abs(dot(normalize(position), cursorDir)));

  newPos.y += sin(uTime * 0.4) * 0.055;

  vDisplacement = disp;
  vNormal       = normalMatrix * normal;
  vWorldPos     = (modelMatrix * vec4(newPos, 1.0)).xyz;
  gl_Position   = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const fragmentShader = `
uniform vec3  uLightDir;
uniform vec3  uRimColor;
uniform vec3  uFresnelColor;
uniform vec3  uBaseColor;
uniform float uBrightness;
uniform float uProximity;

varying vec3  vNormal;
varying vec3  vWorldPos;
varying float vDisplacement;

void main(){
  vec3  N      = normalize(vNormal);
  vec3  V      = normalize(cameraPosition - vWorldPos);
  vec3  L      = normalize(uLightDir);
  float NdotV  = max(dot(V, N), 0.0);
  float fresnel= 0.08 + pow(1.0 - NdotV, 4.0);
  float diff   = max(dot(N, L), 0.0) * 0.35 + 0.65;
  vec3  H      = normalize(L + V);
  float spec   = pow(max(dot(N, H), 0.0), 120.0) * 0.70;
  float spec2  = pow(max(dot(N, H), 0.0),  40.0) * 0.20;
  float rim    = pow(1.0 - NdotV, 3.5) * (0.6 + uProximity * 0.4);

  vec3 proximityTint = vec3(0.05, 0.08, 0.18) * uProximity * 0.6;
  vec3 iridescent = vec3(0.5 + 0.5 * sin(NdotV * 6.28 + vDisplacement * 8.0)) * 0.1;

  vec3 col = uBaseColor * diff * uBrightness
           + uRimColor  * rim
           + uFresnelColor * fresnel
           + spec + spec2 * 0.5
           + proximityTint;
  col += iridescent * fresnel;
  col += vDisplacement * vec3(0.03, 0.03, 0.035);

  gl_FragColor = vec4(col, 1.0);
}
`;

// ── Colour palettes ────────────────────────────────────────────────────────
const DARK_PALETTE = {
  baseColor:    new THREE.Vector3(0.05, 0.05, 0.06),
  rimColor:     new THREE.Vector3(0.25, 0.25, 0.28),
  fresnelColor: new THREE.Vector3(0.35, 0.35, 0.40),
  brightness:   1.15,
};

const LIGHT_PALETTE = {
  baseColor:    new THREE.Vector3(0.72, 0.72, 0.74),  // silver-white
  rimColor:     new THREE.Vector3(0.95, 0.95, 0.98),  // bright white rim
  fresnelColor: new THREE.Vector3(0.80, 0.82, 0.90),  // cool steel fresnel
  brightness:   1.35,
};

interface BlobDesc {
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  currentPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  attractFactor: number;
  lagFactor: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
  rotSpeedY: number;
  rotSpeedX: number;
  uniforms: Record<string, { value: unknown }>;
}

export default function Mowa3DBlobCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDark } = useTheme();

  // Store all blob refs so we can update uniforms when theme changes
  const blobsRef = useRef<BlobDesc[]>([]);

  // Update palette on theme change (without recreating scene)
  useEffect(() => {
    const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE;
    blobsRef.current.forEach((b) => {
      (b.uniforms.uBaseColor.value as THREE.Vector3).copy(palette.baseColor);
      (b.uniforms.uRimColor.value as THREE.Vector3).copy(palette.rimColor);
      (b.uniforms.uFresnelColor.value as THREE.Vector3).copy(palette.fresnelColor);
      b.uniforms.uBrightness.value = palette.brightness;
    });
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width  = container.clientWidth  || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 7 : 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace  = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Initial palette (isDark might not be stable in this effect — read from DOM)
    const initDark = document.documentElement.getAttribute("data-theme") !== "light";
    const initPalette = initDark ? DARK_PALETTE : LIGHT_PALETTE;

    const makeUniforms = () => ({
      uTime:        { value: 0 },
      uLightDir:    { value: new THREE.Vector3(2, 3, 4).normalize() },
      uRimColor:    { value: initPalette.rimColor.clone() },
      uFresnelColor:{ value: initPalette.fresnelColor.clone() },
      uBaseColor:   { value: initPalette.baseColor.clone() },
      uBrightness:  { value: initPalette.brightness },
      uSpiky:       { value: 0 },
      uMouseNDC:    { value: new THREE.Vector2(0, 0) },
      uProximity:   { value: 0 },
    });

    const blobs: BlobDesc[] = [];

    function addBlob(
      radius: number, segments: number, scale: number,
      baseX: number, baseY: number, baseZ: number,
      attractFactor: number, lagFactor: number,
      orbitRadius: number, orbitSpeed: number, orbitPhase: number,
      rotSpeedY: number, rotSpeedX: number
    ): BlobDesc {
      const geo  = new THREE.SphereGeometry(radius, segments, segments);
      const uni  = makeUniforms();
      const mat  = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: uni });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.setScalar(scale);
      const bp = new THREE.Vector3(baseX, baseY, baseZ);
      mesh.position.copy(bp);
      scene.add(mesh);
      const desc: BlobDesc = {
        mesh, basePos: bp.clone(), currentPos: bp.clone(), targetPos: bp.clone(),
        attractFactor, lagFactor, orbitRadius, orbitSpeed, orbitPhase,
        rotSpeedY, rotSpeedX,
        uniforms: uni as Record<string, { value: unknown }>,
      };
      blobs.push(desc);
      return desc;
    }

    addBlob(0.85, 128, 1.42,  0.0,  0.05,  0.0, 0.55, 0.030, 0.06, 0.18, 0.0,  0.08,  0.12);
    addBlob(0.50,  64, 0.65, -2.8,  1.60, -1.0, 0.28, 0.018, 0.14, 0.26, 2.1, -0.12,  0.00);
    addBlob(0.70,  64, 1.10,  2.6,  1.20, -0.6, 0.35, 0.022, 0.10, 0.22, 4.4,  0.06, -0.10);

    // Expose blobs to the theme-update effect
    blobsRef.current = blobs;

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.4);
    mainLight.position.set(3, 4, 5);
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0x8888aa, 0.7);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight(0x111116, 0.6));

    const mouse = { ndcX: 0, ndcY: 0, rawX: 0, rawY: 0, screenX: 0, screenY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.rawX   = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.rawY   = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.screenX = e.clientX;
      mouse.screenY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const cam = { x: 0, y: 0 };
    const _v  = new THREE.Vector3();
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      mouse.ndcX += (mouse.rawX - mouse.ndcX) * 0.04;
      mouse.ndcY += (mouse.rawY - mouse.ndcY) * 0.04;

      cam.x += (mouse.ndcX * 0.45 - cam.x) * 0.035;
      cam.y += (-mouse.ndcY * 0.30 - cam.y) * 0.035;
      camera.position.x = cam.x;
      camera.position.y = cam.y;
      camera.lookAt(0, 0, 0);

      mainLight.position.set(3 + mouse.ndcX * 2.5, 4 + mouse.ndcY, 5);

      blobs.forEach((b, idx) => {
        const ox = Math.cos(t * b.orbitSpeed + b.orbitPhase) * b.orbitRadius;
        const oy = Math.sin(t * b.orbitSpeed * 1.3 + b.orbitPhase) * b.orbitRadius * 0.6;
        const attractX = mouse.ndcX * 1.6 * b.attractFactor;
        const attractY = mouse.ndcY * 1.1 * b.attractFactor;

        b.targetPos.set(b.basePos.x + ox + attractX, b.basePos.y + oy + attractY, b.basePos.z);
        b.currentPos.lerp(b.targetPos, b.lagFactor);
        b.mesh.position.copy(b.currentPos);

        _v.copy(b.mesh.position).project(camera);
        const blobSX   = (_v.x + 1) * 0.5;
        const blobSY   = (1 - _v.y) * 0.5;
        const cursorSX = mouse.screenX / window.innerWidth;
        const cursorSY = mouse.screenY / window.innerHeight;
        const dist     = Math.hypot(blobSX - cursorSX, blobSY - cursorSY);
        const hitZone  = idx === 0 ? 0.26 : 0.16;
        const proximity = Math.max(0, 1 - dist / hitZone);

        const uni = b.uniforms;
        uni.uTime.value      = t;
        (uni.uMouseNDC.value as THREE.Vector2).set(mouse.ndcX, mouse.ndcY);
        uni.uProximity.value = proximity;
        const curSpiky = uni.uSpiky.value as number;
        uni.uSpiky.value = curSpiky + (proximity * 0.65 - curSpiky) * 0.08;
        (uni.uLightDir.value as THREE.Vector3).set(2 + mouse.ndcX * 1.5, 3 - mouse.ndcY, 4).normalize();

        b.mesh.rotation.y = t * b.rotSpeedY + mouse.ndcX * 0.25;
        if (idx === 0)      { b.mesh.rotation.x = Math.sin(t * 0.12) * 0.15 + mouse.ndcY * 0.20; }
        else if (idx === 1) { b.mesh.rotation.z = Math.cos(t * 0.15) * 0.20; }
        else                { b.mesh.rotation.x = -Math.sin(t * 0.10) * 0.15 + b.rotSpeedX * t; }
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      width  = container.clientWidth  || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.position.z = width < 768 ? 7 : 5.2;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      blobsRef.current = [];
      blobs.forEach(b => {
        b.mesh.geometry.dispose();
        (b.mesh.material as THREE.ShaderMaterial).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 size-full pointer-events-none select-none z-0"
    />
  );
}
