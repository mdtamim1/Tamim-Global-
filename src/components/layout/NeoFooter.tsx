"use client";

// ============================================================
// Tamim Global — Luxury Studio Footer
// Exact 1:1 Match to neoleaf.bytetown.agency Footer
// ============================================================

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NeoFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <footer className="w-full px-5 md:px-10 lg:px-[60px] grid grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-6 relative z-0 mt-auto gap-y-10 overflow-hidden rounded-t-[32px] bg-black pt-[60px] text-white lg:gap-y-14 lg:rounded-t-[48px]">
        {/* Background Decorative Image */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-40">
          <Image
            alt="Footer Background"
            src="/neoleaf-media/bg.d8a77240.webp"
            fill
            className="object-cover max-lg:hidden"
          />
          <Image
            alt="Footer Background"
            src="/neoleaf-media/bg-d.b83e23e0.webp"
            fill
            className="object-cover lg:hidden"
          />
        </div>

        {/* Navigation Column */}
        <ul className="col-span-full grid grid-cols-2 justify-between gap-x-6 gap-y-4 self-start text-[16px] font-medium leading-[110%] md:col-span-2 lg:col-span-4 lg:gap-y-8 lg:self-center lg:text-menu-link">
          <li className="flex items-center max-md:even:justify-end max-md:even:text-right max-lg:min-h-6">
            <a
              className="inline-flex lg:transition-colors lg:hover:text-accent-1"
              href="#products"
            >
              <span className="inline-flex items-center justify-center overflow-hidden">
                Web Design
              </span>
            </a>
          </li>
          <li className="flex items-center max-md:even:justify-end max-md:even:text-right max-lg:min-h-6">
            <a
              className="inline-flex lg:transition-colors lg:hover:text-accent-1"
              href="#expertise"
            >
              <span className="inline-flex items-center justify-center overflow-hidden">
                Video &amp; Motion
              </span>
            </a>
          </li>
          <li className="flex items-center max-md:even:justify-end max-md:even:text-right max-lg:min-h-6">
            <a
              className="inline-flex lg:transition-colors lg:hover:text-accent-1"
              href="#technology"
            >
              <span className="inline-flex items-center justify-center overflow-hidden">
                Creative Direction
              </span>
            </a>
          </li>
          <li className="flex items-center max-md:even:justify-end max-md:even:text-right max-lg:min-h-6">
            <a
              className="inline-flex lg:transition-colors lg:hover:text-accent-1"
              href="#features"
            >
              <span className="inline-flex items-center justify-center overflow-hidden">
                Key Features
              </span>
            </a>
          </li>
        </ul>

        {/* Form Column */}
        <div className="col-span-full flex flex-col gap-5 md:col-span-2 lg:col-span-6 lg:-col-end-1 xl:col-span-5 xl:-col-end-1 xl:pl-10">
          <h4 className="text-h4-d lg:text-h4 font-semibold">
            Ready to craft your next web or video project?
          </h4>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 lg:flex-row"
          >
            <div className="relative flex flex-col items-start gap-2 grow">
              <div className="relative w-full">
                <input
                  className="flex h-12 w-full resize-none appearance-none items-center truncate rounded-[100px] border border-transparent bg-white px-6 py-0 text-body-small-d font-normal text-text-black caret-text-black shadow-none outline-none transition-colors placeholder:text-text-light-gray placeholder:opacity-100 lg:h-[52px] lg:px-7 lg:text-body-small"
                  id="fb-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={submitted ? "Thank you! We'll reach out shortly." : "Enter your email"}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative z-0 inline-flex shrink-0 cursor-pointer appearance-none justify-center whitespace-nowrap rounded-none border-0 p-0 text-center font-medium tracking-normal no-underline shadow-none transition-colors disabled:cursor-not-allowed disabled:select-none disabled:opacity-50 h-12 items-stretch gap-0 text-[16px] leading-[130%] text-text-black lg:h-[52px] lg:text-button"
            >
              <span className="inline-flex items-center justify-center relative h-full grow overflow-hidden rounded-[100px] bg-accent-1 px-10 transition-colors lg:group-hover:bg-accent-3 font-semibold">
                {submitted ? "Sent!" : "Send"}
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
          </form>
        </div>

        {/* Giant Monolithic Brand Wordmark */}
        <div className="col-span-full -mb-10 flex justify-center overflow-hidden px-1 pt-[14px] lg:-mb-14 lg:px-0 lg:pt-8 select-none">
          <div className="font-brand font-extrabold text-center mb-[calc(-12_/_360_*_100vw)] text-[calc(56_/_360_*_100vw)] leading-[80%] tracking-[calc(-2.1_/_360_*_100vw)] md:-mb-6 md:text-[140px] md:tracking-[-2px] lg:-mb-8 lg:text-[200px] xl:-mb-10 xl:-ml-3 xl:text-[260px] text-white/90">
            Tamim Global
          </div>
        </div>

        {/* Sub-Footer Copyright & Links */}
        <div className="text-body-small-d lg:text-body-small text-text-light-gray col-span-full flex flex-col gap-6 border-t border-white/10 pb-7 pt-5 md:flex-row md:justify-between lg:gap-10 lg:py-11">
          <p className="text-text-gray max-md:text-center lg:text-menu-link lg:font-medium">
            © 2026 Tamim Global Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-between gap-4 max-lg:text-body-small md:justify-end md:text-right lg:gap-5">
            <Link
              className="inline-flex lg:transition-colors lg:hover:text-accent-1 text-text-gray"
              href="/admin"
            >
              Admin Panel
            </Link>
            <span className="text-text-gray/50">•</span>
            <span className="text-text-gray">
              Engineered by{" "}
              <span className="text-white font-medium">Md Tamim</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Awwwards Floating Ribbon */}
      <div
        id="awwwards"
        className="fixed z-[999] top-1/2 -translate-y-1/2 right-0 hidden md:block"
      >
        <div className="bg-white text-black font-brand font-bold text-xs uppercase px-2.5 py-4 tracking-wider [writing-mode:vertical-rl] rounded-l-lg shadow-2xl border-l border-t border-b border-black/10">
          AWWWARDS SOTD
        </div>
      </div>
    </>
  );
}

