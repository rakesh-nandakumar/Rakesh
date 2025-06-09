import { NextResponse } from "next/server";

export function middleware(request) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Create response with minimal headers to avoid conflicts
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Only set headers that are not already in next.config.mjs
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt and sitemap.xml
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
