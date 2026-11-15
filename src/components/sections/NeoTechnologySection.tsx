"use client";

// ============================================================
// Tamim Global — Technology Section
// Exact 1:1 Match to neoleaf.bytetown.agency Section 3
// ============================================================

export default function NeoTechnologySection() {
  return (
    <section
      className="relative flex flex-col justify-end max-lg:scroll-mt-6 pt-12 pb-16 lg:py-24"
      id="technology"
    >
      <div className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 z-0 overflow-hidden">
        <div className="col-span-full flex flex-col gap-4 md:col-span-3 lg:col-span-7 lg:gap-5 xl:col-span-6 xl:mr-[-50px]">
          <div className="flex flex-col items-start gap-2 lg:gap-3">
            <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
              Technology
            </div>
            <h2
              className="text-h2-d lg:text-h2 font-semibold styles_gradientMask__lzbc_ text-text-black"
              id="title-technology"
            >
              Technology that will make this revolution in web &amp; software
            </h2>
          </div>
          <div className="text-body-d lg:text-body text-text-gray flex flex-col gap-3 lg:pr-5">
            <p>
              At Tamim Global, we build cutting-edge web platforms, custom SaaS
              engines, and Next.js applications engineered for maximum performance,
              security, and conversion — no bloated legacy code.
            </p>
            <p>
              Leading-edge cloud architecture, global edge distribution, and
              deep AI acceleration power our systems, giving you the fastest
              time-to-market and rock-solid reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

