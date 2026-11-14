// ============================================================
// Tamim Global — Subdomain & Routing Middleware
// Routes admin.<domain> seamlessly to /admin
// ============================================================

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Bypass static files and internals
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if current hostname is the admin subdomain (e.g. admin.tamimglobal.com or admin.localhost:3000)
  const isAdminSubdomain = hostname.startsWith("admin.");

  if (isAdminSubdomain) {
    // If user lands on admin.<domain>/ -> rewrite to /admin
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/admin", request.url));
    }

    // If user navigates to admin.<domain>/admin -> normalize to /
    if (url.pathname === "/admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Pass through any other routes under /admin
    if (!url.pathname.startsWith("/admin")) {
      return NextResponse.rewrite(new URL(`/admin${url.pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, robots.txt, sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
