"use client";

// ============================================================
// Tamim Global — Mowa Studio 1:1 3D Organic Simplex Morph Canvas
// Exact reverse-engineered GLSL shaders, lighting & mouse physics
// from mowa.studio / MorphBlob-CsQegPPB.js
// ============================================================

import { useEffect, useRef } from "react";
import * as THREE from "three";

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
varying vec3 vNormal;
varying vec3 vWorldPos;
varying float vDisplacement;
void main(){
  float freq1=0.7+uSpiky*1.5;
  float freq2=1.4+uSpiky*3.0;
  float freq3=2.8+uSpiky*5.0;
  float amp=0.22+uSpiky*0.15;
  float n1=snoise(position*freq1+uTime*0.2)*0.7;
  float n2=snoise(position*freq2+uTime*0.15)*0.2;
  float n3=snoise(position*freq3+uTime*0.1)*0.1;
  float disp=(n1+n2+n3)*amp;
  vec3 newPos=position+normal*disp;
  newPos.y+=sin(uTime*0.4)*0.06;
  vDisplacement=disp;
  vNormal=normalMatrix*normal;
  vWorldPos=(modelMatrix*vec4(newPos,1.0)).xyz;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(newPos,1.0);
}
`;

const fragmentShader = `
uniform vec3 uLightDir;
uniform vec3 uRimColor;
uniform vec3 uFresnelColor;
uniform vec3 uBaseColor;
uniform float uBrightness;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying float vDisplacement;
void main(){
  vec3 N=normalize(vNormal);
  vec3 V=normalize(cameraPosition-vWorldPos);
  vec3 L=normalize(uLightDir);
  float NdotV=max(dot(V,N),0.0);
  float fresnel=0.08+pow(1.0-NdotV,4.0);
  float diff=max(dot(N,L),0.0)*0.35+0.65;
  vec3 H=normalize(L+V);
  float spec=pow(max(dot(N,H),0.0),120.0)*0.7;
  float spec2=pow(max(dot(N,H),0.0),40.0)*0.2;
  float rim=pow(1.0-NdotV,3.5)*0.6;
  vec3 iridescentShift=vec3(0.5+0.5*sin(NdotV*6.28+vDisplacement*8.0))*0.1;
  vec3 col=uBaseColor*diff*uBrightness+uRimColor*rim+uFresnelColor*fresnel+spec+spec2*0.5;
  col+=iridescentShift*fresnel;
  col+=vDisplacement*vec3(0.03,0.03,0.03);
  gl_FragColor=vec4(col,1.0);
}
`;

export default function Mowa3DBlobCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Three.js Setup
    const isMobile = (container.clientWidth || window.innerWidth) < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 6.5 : 5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Uniforms exactly matching Mowa Studio Dark Mode
    const uniforms = {
      uTime: { value: 0 },
      uLightDir: { value: new THREE.Vector3(2, 3, 4).normalize() },
      uRimColor: { value: new THREE.Vector3(0.25, 0.25, 0.28) },
      uFresnelColor: { value: new THREE.Vector3(0.35, 0.35, 0.4) },
      uBaseColor: { value: new THREE.Vector3(0.05, 0.05, 0.06) },
      uBrightness: { value: 1.15 },
      uSpiky: { value: 0 },
    };

    const geometry = new THREE.SphereGeometry(0.85, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    // 1. Center Hero Main Morphing Sculpture
    const mainBlob = new THREE.Mesh(geometry, material);
    mainBlob.position.set(0, 0.05, 0);
    mainBlob.scale.set(1.4, 1.4, 1.4);
    scene.add(mainBlob);

    // 2. Top-Left Floating Secondary 3D Sculpture
    const topLeftBlob = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 48, 48),
      material
    );
    topLeftBlob.position.set(-2.8, 1.6, -1);
    topLeftBlob.scale.set(0.65, 0.65, 0.65);
    scene.add(topLeftBlob);

    // 3. Top-Right Floating Cropped 3D Sculpture
    const topRightBlob = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 48, 48),
      material
    );
    topRightBlob.position.set(2.6, 1.2, -0.6);
    topRightBlob.scale.set(1.1, 1.1, 1.1);
    scene.add(topRightBlob);

    // Studio Lights
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.4);
    mainLight.position.set(3, 4, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x888899, 0.7);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x111116, 0.6);
    scene.add(ambientLight);

    // Mouse Tracking (Smooth damping)
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // RAF Render Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;
      uniforms.uTime.value = elapsed;

      // Mouse Lerp
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;

      // Subtle Camera Orbit & Parallax
      camera.position.x = mouse.x * 0.5;
      camera.position.y = -mouse.y * 0.35;
      camera.lookAt(0, 0, 0);

      // Organic Rotations
      mainBlob.rotation.y = elapsed * 0.08 + mouse.x * 0.2;
      mainBlob.rotation.x = Math.sin(elapsed * 0.12) * 0.15 + mouse.y * 0.2;

      topLeftBlob.rotation.y = -elapsed * 0.12;
      topLeftBlob.rotation.z = Math.cos(elapsed * 0.15) * 0.2;

      topRightBlob.rotation.y = elapsed * 0.06;
      topRightBlob.rotation.x = -Math.sin(elapsed * 0.1) * 0.15;

      // Light direction shift
      mainLight.position.x = 3 + mouse.x * 1.5;
      mainLight.position.y = 4 + mouse.y;
      uniforms.uLightDir.value
        .set(2 + mouse.x, 3 - mouse.y, 4)
        .normalize();

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const mobile = width < 768;
      camera.position.z = mobile ? 6.5 : 5;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
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
