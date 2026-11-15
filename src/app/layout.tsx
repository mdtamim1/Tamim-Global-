// ============================================================
// Tamim Global — Root Layout
// Exact 1:1 match to neoleaf.bytetown.agency:
// Font loading (Onest & Roboto Flex), metadata, smooth viewport.
// ============================================================

import type { Metadata, Viewport } from "next";
import { getContent } from "@/lib/content";
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
    description:
      "Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed. Two lanes. Both fully custom. Never templated.",
    openGraph: {
      title: "Tamim Global | Premium Web Design & Software Studio",
      description:
        "Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed. Two lanes. Both fully custom. Never templated.",
      url: "https://tamimglobal.com",
      siteName: "Tamim Global",
      images: [{ url: meta.ogImage || "/images/tg-mark.jpg", width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tamim Global | Premium Web Design & Software Studio",
      description:
        "Award-winning digital experiences & scalable platforms engineered at AI-accelerated speed.",
      images: [meta.ogImage || "/images/tg-mark.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#151515",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="box-border w-full overflow-x-clip overscroll-none">
      <head>
        {/* Onest & Roboto Flex Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&family=Roboto+Flex:wght@100..1000&display=swap"
          rel="stylesheet"
        />
        {/* Favicon & App Icons */}
        <link rel="icon" href="/images/tg-mark.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/tg-mark.jpg" />
      </head>
      <body
        id="__next"
        className="flex min-h-dvh w-full flex-col overflow-x-clip overscroll-none bg-white font-primary text-body-d text-text-black antialiased lg:text-body"
      >
        {children}
      </body>
    </html>
  );
}
