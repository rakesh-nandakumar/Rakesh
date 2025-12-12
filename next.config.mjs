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
    turbo: {
      rules: {},
    },
  },
  eslint: {
    ignoreDuringBuilds: false,
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
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  experimental: {
    optimizeCss: true,
  },
  serverExternalPackages: ["reading-time", "@supabase/supabase-js", "@supabase/postgrest-js", "@supabase/realtime-js"],
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
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
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
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
