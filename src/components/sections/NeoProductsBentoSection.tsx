"use client";

// ============================================================
// Tamim Global — Products & Bento Showcase
// Exact 1:1 Match to neoleaf.bytetown.agency Section 4
// ============================================================

import Image from "next/image";

export default function NeoProductsBentoSection() {
  return (
    <section
      className="w-full px-5 md:px-10 lg:px-[60px] relative z-10 flex flex-col gap-5 overflow-hidden rounded-[32px] bg-bg-black py-[60px] text-white lg:gap-9 lg:rounded-[48px] lg:pb-[100px] lg:pt-20 my-8"
      id="products"
    >
      <div className="flex flex-col items-start gap-2 lg:gap-3">
        <div className="text-tag-d lg:text-tag font-bold uppercase text-accent-2">
          Products &amp; Capabilities
        </div>
        <h2
          className="text-h2-d lg:text-h2 font-semibold styles_gradientMask__lzbc_"
          id="title-products"
        >
          What&#x27;s possible with us
        </h2>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 perspective-[2000px] md:grid-cols-2 lg:grid-cols-2 lg:gap-6">
        {/* Bento 1: High-Performance Web & Next.js */}
        <div className="relative z-0 flex min-h-[392px] items-end overflow-hidden rounded-3xl bg-[#252629] p-6 text-white lg:min-h-[426px] lg:rounded-[32px] lg:p-12 lg:grid lg:grid-cols-2 lg:gap-6 lg:bg-gradient-product-card-big-bg col-span-full md:max-lg:col-span-1">
          <div className="flex max-w-[475px] flex-col gap-2 lg:max-w-[400px] lg:gap-3 z-10">
            <div className="mb-3 flex size-[60px] shrink-0 items-center justify-center self-start rounded-xl bg-[#37393e] text-accent-1 lg:mb-4 lg:size-[68px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
              </svg>
            </div>
            <h3 className="text-h3-d lg:text-h3 font-semibold">
              High-Performance Web &amp; Next.js
            </h3>
            <p className="text-body-d lg:text-body text-text-light-gray">
              Ultra-fast headless websites, dynamic web applications, and
              interactive digital flagships built with Next.js 15, React 19, and
              Tailwind.
            </p>
          </div>
          <div className="absolute -inset-px -z-10 transform-gpu select-none overflow-hidden rounded-[inherit] before:absolute before:-bottom-px before:-left-px before:-right-px before:z-10 before:h-[83.5%] before:bg-gradient-product-card-overlay lg:-right-px lg:left-auto lg:w-[55%] lg:rounded-l-none lg:before:-left-px lg:before:right-auto lg:before:h-full lg:before:w-[50%] lg:before:bg-gradient-product-card-big-overlay">
            <Image
              alt="High-Performance Web"
              src="/neoleaf-media/1.fd43cba1.webp"
              fill
              className="object-cover max-lg:hidden"
            />
            <Image
              alt="High-Performance Web"
              src="/neoleaf-media/1-d.25d1c4eb.webp"
              fill
              className="object-cover lg:hidden"
            />
          </div>
        </div>

        {/* Bento 2: Bespoke SaaS & Cloud Engines */}
        <div className="relative z-0 flex min-h-[392px] items-end overflow-hidden rounded-3xl bg-[#252629] p-6 text-white lg:min-h-[426px] lg:rounded-[32px] lg:p-12 col-span-full md:max-lg:col-span-1 lg:col-span-1">
          <div className="flex max-w-[475px] flex-col gap-2 lg:max-w-[400px] lg:gap-3 z-10">
            <div className="mb-3 flex size-[60px] shrink-0 items-center justify-center self-start rounded-xl bg-[#37393e] text-accent-1 lg:mb-4 lg:size-[68px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <h3 className="text-h3-d lg:text-h3 font-semibold">
              Bespoke SaaS &amp; Cloud Engines
            </h3>
            <p className="text-body-d lg:text-body text-text-light-gray">
              Scalable multi-tenant cloud platforms, REST &amp; GraphQL APIs,
              microservices, and secure payment integrations built for rapid scaling.
            </p>
          </div>
          <div className="absolute -inset-px -z-10 transform-gpu select-none overflow-hidden rounded-[inherit] before:absolute before:-bottom-px before:-left-px before:-right-px before:z-10 before:h-[83.5%] before:bg-gradient-product-card-overlay lg:before:h-[57%]">
            <Image
              alt="SaaS & Cloud"
              src="/neoleaf-media/2.3924e0ff.webp"
              fill
              className="object-cover max-lg:hidden"
            />
            <Image
              alt="SaaS & Cloud"
              src="/neoleaf-media/2-d.32c3a3f9.webp"
              fill
              className="object-cover lg:hidden"
            />
          </div>
        </div>

        {/* Bento 3: AI Acceleration & Smart Automation */}
        <div className="relative z-0 flex min-h-[392px] items-end overflow-hidden rounded-3xl bg-[#252629] p-6 text-white lg:min-h-[426px] lg:rounded-[32px] lg:p-12 col-span-full md:max-lg:col-span-1 lg:col-span-1">
          <div className="flex max-w-[475px] flex-col gap-2 lg:max-w-[400px] lg:gap-3 z-10">
            <div className="mb-3 flex size-[60px] shrink-0 items-center justify-center self-start rounded-xl bg-[#37393e] text-accent-1 lg:mb-4 lg:size-[68px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4" />
                <path d="m4.93 4.93 2.83 2.83" />
                <path d="M2 12h4" />
                <path d="m4.93 19.07 2.83-2.83" />
                <path d="M12 22v-4" />
                <path d="m19.07 19.07-2.83-2.83" />
                <path d="M22 12h-4" />
                <path d="m19.07 4.93-2.83 2.83" />
              </svg>
            </div>
            <h3 className="text-h3-d lg:text-h3 font-semibold">
              AI Acceleration &amp; Smart Automation
            </h3>
            <p className="text-body-d lg:text-body text-text-light-gray">
              Integrate LLMs, intelligent workflow automation, neural search, and
              cognitive features directly into your core business stack.
            </p>
          </div>
          <div className="absolute -inset-px -z-10 transform-gpu select-none overflow-hidden rounded-[inherit] before:absolute before:-bottom-px before:-left-px before:-right-px before:z-10 before:h-[83.5%] before:bg-gradient-product-card-overlay lg:before:h-[57%]">
            <Image
              alt="AI Acceleration"
              src="/neoleaf-media/3.eb2479f9.webp"
              fill
              className="object-cover max-lg:hidden"
            />
            <Image
              alt="AI Acceleration"
              src="/neoleaf-media/3-d.8c477fd4.webp"
              fill
              className="object-cover lg:hidden"
            />
          </div>
        </div>

        {/* Bento 4: Brand Identity & Precision 3D (With Video) */}
        <div className="relative z-0 flex min-h-[392px] items-end overflow-hidden rounded-3xl bg-[#252629] p-6 text-white lg:min-h-[426px] lg:rounded-[32px] lg:p-12 max-lg:bg-[#1D1F21] lg:grid lg:grid-cols-2 lg:gap-6 lg:bg-gradient-product-card-big-reversed-bg col-span-full md:max-lg:col-span-1">
          <div className="flex max-w-[475px] flex-col gap-2 lg:gap-3 lg:col-start-2 lg:ml-12 lg:max-w-[475px] z-10">
            <div className="mb-3 flex size-[60px] shrink-0 items-center justify-center self-start rounded-xl bg-[#37393e] text-accent-1 lg:mb-4 lg:size-[68px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                <path d="m14 7 3 3" />
                <path d="M5 6v4" />
                <path d="M19 14v4" />
                <path d="M10 2v2" />
                <path d="M7 8H3" />
                <path d="M21 16h-4" />
                <path d="M11 3H9" />
              </svg>
            </div>
            <h3 className="text-h3-d lg:text-h3 font-semibold">
              Brand Identity &amp; Precision 3D
            </h3>
            <p className="text-body-d lg:text-body text-text-light-gray">
              Iconic titanium monogram marks, 3D interactive graphics,
              conversion-focused design systems, and award-winning digital experiences.
            </p>
          </div>
          <div className="absolute -inset-px -z-10 transform-gpu select-none overflow-hidden rounded-[inherit] before:absolute before:-bottom-px before:-left-px before:-right-px before:z-10 before:h-[83.5%] before:bg-gradient-product-card-overlay max-md:h-[70%] max-lg:bottom-auto max-lg:h-[85%] max-lg:rounded-b-none max-lg:before:h-[38%] lg:before:h-full lg:before:bg-gradient-product-card-big-overlay lg:-left-px lg:right-auto lg:w-[53%] lg:rounded-l-[inherit] lg:rounded-r-none lg:before:-right-px lg:before:left-auto lg:before:w-[36%] lg:before:-scale-x-100">
            <video
              className="size-full object-cover"
              playsInline
              autoPlay
              loop
              muted
              role="presentation"
            >
              <source
                src="/video/product-image-generation.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

