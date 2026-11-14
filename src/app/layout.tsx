// ============================================================
// Tamim Global — Root Layout
// Font loading, metadata, providers, Lenis wrapper
// ============================================================

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { getContent } from "@/lib/content";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Inter — body font via next/font (zero layout shift)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Clash Display is loaded via CSS @import from Fontshare CDN
// We set the CSS variable in globals.css: var(--font-clash)

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const { meta } = content;

  return {
    metadataBase: new URL("https://tamimglobal.com"),
    title: {
      default: meta.siteTitle,
      template: `%s — Tamim Global`,
    },
    description: meta.siteDescription,
    openGraph: {
      title: meta.siteTitle,
      description: meta.siteDescription,
      url: "https://tamimglobal.com",
      siteName: "Tamim Global",
      images: [{ url: meta.ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.siteTitle,
      description: meta.siteDescription,
      images: [meta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    // JSON-LD structured data added in page components
  };
}

export const viewport: Viewport = {
  themeColor: "#050507",
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
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Clash Display via Fontshare — loaded in globals.css */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        {/* Favicon variants */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-base-900 text-ink-50 font-sans antialiased overflow-x-hidden">
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          {/* Custom cursor — hidden on touch devices via CSS */}
          <CustomCursor />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
