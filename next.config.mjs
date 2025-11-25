import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable development overlays including FPS counter
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'react-feather'],
  },
  turbopack: {
    rules: {},
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inbio.pixcelsthemes.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "evgqbzyytamqezwdymkb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    unoptimized: false,
    loader: "default",
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  serverExternalPackages: ["reading-time"],
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Enable React strict mode
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com; frame-ancestors 'none';",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=60",
          },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=60",
          },
        ],
      },
      // Preload critical resources for homepage
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              "</assets/css/vendor/bootstrap.min.css>; rel=preload; as=style",
          },
        ],
      },
      // Long-term caching for Supabase storage assets via CDN rewrite
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=2592000", // 30 days on CDN
          },
        ],
      },
      // Service Worker with proper cache headers
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      // Manifest with cache headers
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
  // CDN Rewrites for Supabase assets
  rewrites: async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseBucket = "portfolio";

    if (!supabaseUrl) {
      console.warn(
        "⚠️ NEXT_PUBLIC_SUPABASE_URL not set, CDN rewrites disabled"
      );
      return [];
    }

    return [
      // Rewrite /media/* to Supabase storage for easier CDN configuration
      {
        source: "/media/:path*",
        destination: `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/:path*`,
      },
    ];
  },
  // Redirects for common patterns
  redirects: async () => {
    return [
      // Redirect old blog paths
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      // Redirect old project paths
      {
        source: "/project/:slug",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
