"use client";

// ============================================================
// Tamim Global — Technology Section
// Exact 1:1 Match to neoleaf.bytetown.agency Section 3
// Features: Sticky bottom layout for dramatic curtain reveal under
// Section 4, text-accent-2 tag, and the authentic 3,634-dot particle
// human face (head-particles.svg) on the right.
// ============================================================

import ParticleHead3D from "@/components/ui/ParticleHead3D";

export default function NeoTechnologySection() {
  return (
    <section
      className="relative flex flex-col justify-end max-lg:scroll-mt-6 -mb-16 lg:-mb-24"
      id="technology"
    >
      <div className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 sticky bottom-0 z-0 overflow-hidden pb-32 pt-16 lg:pb-[240px] lg:pt-24 items-center bg-[#030209]">
        {/* Left Column: Technology Headings & Description */}
        <div className="col-span-full flex flex-col gap-4 md:col-span-3 lg:col-span-6 lg:gap-5 xl:col-span-5 z-10">
          <div className="flex flex-col items-start gap-2 lg:gap-3">
            <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
              The Arsenal
            </div>
            <h2
              className="text-h2-d lg:text-h2 font-semibold text-white"
              id="title-technology"
            >
              One mind. Four disciplines. Zero compromise.
            </h2>
          </div>
          <div className="text-body-d lg:text-body text-white/60 flex flex-col gap-3 lg:pr-5">
            <p>
              I am not a generalist — I am a specialist in four interconnected crafts: full-stack programming, bespoke web design, cinematic video production, and original music composition.
            </p>
            <p>
              This rare convergence means every project I touch is built from first principles — no handoffs, no miscommunication, no creative dilution. Pure, undivided mastery from concept to delivery.
            </p>
          </div>
        </div>

        {/* Right Column: Real-Time 3D Multi-Color Neural Particle Head */}
        <div className="col-span-full md:col-span-1 lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end relative min-h-[420px] lg:min-h-[580px] select-none">
          <div className="w-full max-w-[540px] lg:max-w-[620px] aspect-[620/720] flex items-center justify-center">
            <ParticleHead3D />
          </div>
        </div>
      </div>
    </section>
  );
}
