// ============================================================
// Tamim Global — Root Layout
// Matching awmedia.marketing's high-performance layout,
// typography, smooth scroll, and floating contact bar.
// ============================================================

import type { Metadata, Viewport } from "next";
import { getContent } from "@/lib/content";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactBar from "@/components/ui/FloatingContactBar";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const { meta } = content;

  return {
    metadataBase: new URL("https://tamimglobal.com"),
    title: {
      default: "Tamim Global | Premium Web Design & Software Studio",
      template: `%s — Tamim Global`,
    },
    description: "Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed. Two lanes. Both fully custom. Never templated.",
    openGraph: {
      title: "Tamim Global | Premium Web Design & Software Studio",
      description: "Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed. Two lanes. Both fully custom. Never templated.",
      url: "https://tamimglobal.com",
      siteName: "Tamim Global",
      images: [{ url: meta.ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tamim Global | Premium Web Design & Software Studio",
      description: "Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed.",
      images: [meta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <head>
        {/* Rethink Sans & JetBrains Mono Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-black text-[#f5f5f7] antialiased overflow-x-hidden">
        {/* Skip to content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          {/* Custom Cursor */}
          <CustomCursor />
          {/* Floating Island Navigation */}
          <Navbar />
          {/* Main Viewport */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          {/* Studio Footer */}
          <Footer />
          {/* Floating Quick Action Bar (Bottom-Left) */}
          <FloatingContactBar />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
