"use client";

// ============================================================
// Tamim Global — Technology Section
// Exact 1:1 Match to neoleaf.bytetown.agency Section 3
// Features: Sticky bottom layout for dramatic curtain reveal under
// Section 4, text-accent-2 tag, and the authentic 3,634-dot particle
// human face (head-particles.svg) on the right.
// ============================================================

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NeoTechnologySection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-end max-lg:scroll-mt-6 -mb-16 lg:-mb-24"
      id="technology"
    >
      <div className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 sticky bottom-0 z-0 overflow-hidden pb-32 pt-16 lg:pb-[240px] lg:pt-24 items-center">
        {/* Left Column: Technology Headings & Description */}
        <div className="col-span-full flex flex-col gap-4 md:col-span-3 lg:col-span-6 lg:gap-5 xl:col-span-5 z-10">
          <div className="flex flex-col items-start gap-2 lg:gap-3">
            <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
              Creative Direction
            </div>
            <h2
              className="text-h2-d lg:text-h2 font-semibold text-text-black"
              id="title-technology"
            >
              Design aesthetics &amp; motion that make your brand unmistakable
            </h2>
          </div>
          <div className="text-body-d lg:text-body text-text-gray flex flex-col gap-3 lg:pr-5">
            <p>
              At Tamim Global, I unite award-winning web design aesthetics with
              cinematic video post-production. Every layout is crafted with
              mathematical precision, every interaction is fluid, and every video
              frame tells a compelling visual story.
            </p>
            <p>
              From custom Figma design systems and interactive 3D WebGL scenes to
              commercial-grade video editing, sound design, and color grading —
              I deliver the full creative arsenal to help your brand lead.
            </p>
          </div>
        </div>

        {/* Right Column: 3,634-Dot Particle Human Head (Exact NeoLeaf Visual) */}
        <div className="col-span-full md:col-span-1 lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end relative min-h-[350px] lg:min-h-[520px] pointer-events-none select-none">
          <motion.div
            animate={{
              rotateY: mousePos.x,
              rotateX: -mousePos.y,
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
            }}
            transition={{ type: "spring", stiffness: 75, damping: 20 }}
            className="relative w-full max-w-[480px] lg:max-w-[580px] aspect-[620/786]"
          >
            <Image
              src="/neoleaf-media/head-particles.svg"
              alt="Technology Neural Particle Head"
              fill
              priority
              className="object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
