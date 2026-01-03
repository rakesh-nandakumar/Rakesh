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

  // Production optimizations
  reactStrictMode: true,

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
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
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    unoptimized: false,
    loader: "default",
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression and performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  httpAgentOptions: {
    keepAlive: true,
  },

  // Experimental features for maximum performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "react-feather",
      "framer-motion",
      "react-markdown",
      "clsx",
    ],
  },

  serverExternalPackages: [
    "reading-time",
    "@supabase/supabase-js",
    "@supabase/postgrest-js",
    "@supabase/realtime-js",
  ],

  // Modular imports for tree-shaking
  modularizeImports: {
    "react-feather": {
      transform: "react-feather/dist/icons/{{member}}",
    },
  },

  headers: async () => {
    return [
      // Security headers
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
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Aggressive caching for static assets with immutable
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache fonts aggressively
      {
        source: "/assets/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      // Cache images with stale-while-revalidate
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Cache JS/CSS chunks
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Preload critical resources for homepage
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              "</assets/css/vendor/bootstrap.min.css>; rel=preload; as=style",
              "</assets/css/style.css>; rel=preload; as=style",
              "</assets/fonts/feather.woff2>; rel=preload; as=font; type=font/woff2; crossorigin",
            ].join(", "),
          },
        ],
      },
      // API caching with revalidation
      {
        source: "/api/data",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
