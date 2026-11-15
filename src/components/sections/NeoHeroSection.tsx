"use client";

// ============================================================
// Tamim Global — Hero Section & Header
// Exact 1:1 Replication of neoleaf.bytetown.agency Section 1
// ============================================================

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuickEnquiryModal from "@/components/ui/QuickEnquiryModal";

export default function NeoHeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  return (
    <>
      <section className="relative">
        <div className="w-full px-5 md:px-10 lg:px-[60px] min-h-fs relative z-0 flex flex-col justify-end gap-5 pb-10 overflow-hidden lg:gap-9">
          {/* Header */}
          <header className="px-5 md:px-10 lg:px-[60px] left-0 top-0 z-50 flex w-full items-center gap-6 py-4 lg:gap-[42px] lg:py-5 relative -mb-4 !px-0 lg:-mb-8">
            <Link
              className="flex items-center gap-3 shrink-0 lg:transition-transform lg:hover:scale-105"
              aria-label="Tamim Global logo"
              href="/"
            >
              <div className="size-9 rounded-xl overflow-hidden border border-black/10 shadow-sm flex items-center justify-center bg-black">
                <Image
                  src="/images/tg-mark.jpg"
                  alt="TG Mark"
                  width={36}
                  height={36}
                  priority
                  className="size-full object-cover"
                />
              </div>
              <span className="font-brand font-extrabold text-xl lg:text-2xl tracking-tight text-text-black">
                Tamim Global
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="max-md:hidden md:relative md:top-1.5 md:flex md:items-center md:gap-5 md:text-menu-link md:font-medium md:text-text-gray lg:gap-7">
              <a
                className="inline-flex shrink-0 lg:transition-colors lg:hover:text-text-black"
                href="#technology"
              >
                <span className="inline-flex items-center justify-center overflow-hidden">
                  Technology
                </span>
              </a>
              <a
                className="inline-flex shrink-0 lg:transition-colors lg:hover:text-text-black"
                href="#products"
              >
                <span className="inline-flex items-center justify-center overflow-hidden">
                  Products
                </span>
              </a>
              <a
                className="inline-flex shrink-0 lg:transition-colors lg:hover:text-text-black"
                href="#expertise"
              >
                <span className="inline-flex items-center justify-center overflow-hidden">
                  Expertise
                </span>
              </a>
              <a
                className="inline-flex shrink-0 lg:transition-colors lg:hover:text-text-black"
                href="#features"
              >
                <span className="inline-flex items-center justify-center overflow-hidden">
                  Key features
                </span>
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="ml-auto flex items-center gap-3 lg:gap-4">
              {/* Sound Equalizer Pill */}
              <button
                className="relative z-0 flex size-9 shrink-0 items-center justify-center gap-0.5 rounded-full border border-black text-text-gray lg:size-10 lg:transition-colors lg:hover:bg-black lg:hover:text-white max-lg:hidden cursor-pointer"
                type="button"
                aria-label="Toggle ambient audio"
                onClick={() => setSoundPlaying(!soundPlaying)}
              >
                <div
                  className={`h-4 w-0.5 shrink-0 origin-bottom rounded-md bg-current transition-all duration-300 ${
                    soundPlaying ? "animate-[pulse_0.6s_infinite]" : "h-2"
                  }`}
                />
                <div
                  className={`h-4 w-0.5 shrink-0 origin-bottom rounded-md bg-current transition-all duration-300 ${
                    soundPlaying ? "animate-[pulse_0.8s_infinite]" : "h-3"
                  }`}
                />
                <div
                  className={`h-4 w-0.5 shrink-0 origin-bottom rounded-md bg-current transition-all duration-300 ${
                    soundPlaying ? "animate-[pulse_0.5s_infinite]" : "h-4"
                  }`}
                />
                <div
                  className={`h-4 w-0.5 shrink-0 origin-bottom rounded-md bg-current transition-all duration-300 ${
                    soundPlaying ? "animate-[pulse_0.7s_infinite]" : "h-2.5"
                  }`}
                />
                <div
                  className={`h-4 w-0.5 shrink-0 origin-bottom rounded-md bg-current transition-all duration-300 ${
                    soundPlaying ? "animate-[pulse_0.9s_infinite]" : "h-1.5"
                  }`}
                />
              </button>

              {/* Let's Talk CTA */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group relative z-0 inline-flex shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 whitespace-nowrap p-0 text-center font-medium tracking-normal no-underline shadow-none transition-colors disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 h-9 overflow-hidden rounded-[100px] border border-bg-dark-gray px-5 text-[14px] leading-[110%] text-text-black lg:h-10 lg:text-menu-link lg:hover:bg-bg-dark-gray lg:hover:text-white"
              >
                <span className="inline-flex items-center justify-center overflow-hidden h-full">
                  Let’s Talk!
                </span>
              </button>
            </div>
          </header>

          {/* Hero Cinematic Video Stage */}
          <div className="grow select-none rounded-2xl lg:rounded-[20px] relative min-h-[300px] md:min-h-[420px] lg:min-h-[500px]">
            <div className="absolute inset-0 -z-10 rounded-[inherit] overflow-hidden before:absolute before:inset-0 before:bg-gradient-section-intro-bg before:z-10">
              <video
                className="size-full object-cover"
                playsInline
                autoPlay
                loop
                muted
              >
                <source src="/video/intro.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Hero Typography & CTA Block */}
          <div className="grid grid-cols-12 items-start gap-y-2">
            <div className="text-tag-d lg:text-tag font-bold uppercase text-[#4cd964] col-span-full">
              Fast, secure and scalable
            </div>
            <h1 className="text-h1-d lg:text-h1 font-semibold col-span-full md:col-span-6 lg:col-span-7">
              We’re building the future of digital systems &amp; web products
            </h1>
            <div className="col-span-full flex flex-col gap-6 pt-2 md:col-span-6 md:pl-3 lg:col-span-5 lg:pl-[70px] lg:pr-[34px] lg:pt-[11px]">
              <p className="text-body-d lg:text-body text-text-gray">
                We empower enterprises, ambitious founders, and growing brands to
                engineer high-converting digital flagships, robust SaaS
                architectures, and AI-accelerated web experiences.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group relative z-0 inline-flex shrink-0 cursor-pointer appearance-none justify-center whitespace-nowrap rounded-none border-0 p-0 text-center font-medium tracking-normal no-underline shadow-none transition-colors disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 h-12 items-stretch gap-0 text-[16px] leading-[130%] text-text-black lg:h-[52px] lg:text-button md:self-start"
              >
                <span className="inline-flex items-center justify-center relative h-full grow overflow-hidden rounded-[100px] bg-accent-1 px-10 transition-colors lg:group-hover:bg-accent-3 font-semibold">
                  Let’s Talk!
                </span>
                <span className="relative flex shrink-0 items-center justify-center overflow-hidden aspect-square h-full rounded-full bg-accent-1 lg:transition-colors lg:group-hover:bg-accent-3">
                  <span
                    className="max-lg:hidden lg:absolute lg:inset-0 lg:m-auto lg:flex lg:size-full lg:translate-y-full lg:items-center lg:justify-center lg:transition-transform lg:group-hover:translate-y-0 lg:group-hover:duration-700"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 28 28"
                      className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[28px]"
                    >
                      <path
                        fill="currentColor"
                        d="m22.707 13.293-7-7a1 1 0 0 0-1.497 1.32l.083.094L19.586 13H6a1 1 0 0 0-.993.883L5 14a1 1 0 0 0 .883.993L6 15h13.586l-5.293 5.293a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083 7-7 .097-.112.071-.11.054-.114.035-.105.025-.117.007-.06.004-.108-.004-.07-.016-.112-.03-.111-.044-.111-.052-.098-.067-.096a1 1 0 0 0-.08-.09l-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="flex size-full items-center justify-center lg:transition-transform lg:group-hover:-translate-y-full lg:group-hover:duration-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 28 28"
                      className="styles_component__XuEBc block h-[1em] w-[1em] max-w-none shrink-0 text-[28px]"
                    >
                      <path
                        fill="currentColor"
                        d="m22.707 13.293-7-7a1 1 0 0 0-1.497 1.32l.083.094L19.586 13H6a1 1 0 0 0-.993.883L5 14a1 1 0 0 0 .883.993L6 15h13.586l-5.293 5.293a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.083l.094-.083 7-7 .097-.112.071-.11.054-.114.035-.105.025-.117.007-.06.004-.108-.004-.07-.016-.112-.03-.111-.044-.111-.052-.098-.067-.096a1 1 0 0 0-.08-.09l-7-7z"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
