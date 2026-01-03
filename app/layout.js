import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { getSiteConfig } from "@/lib/dataService";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedChatButton from "@/components/EnhancedChatButton";
import FeatherInit from "@/components/FeatherInit";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import StructuredData from "@/components/StructuredData";
import ClientComponents from "@/components/ClientComponents";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import AsyncCSS from "@/components/AsyncCSS";

// Optimized font loading with display swap and preload
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload primary font
});

// Enhanced metadata for maximum SEO
export const metadata = {
  metadataBase: new URL("https://rakeshn.com"),
  title: {
    default: "Rakesh Nandakumar - Full Stack Developer & Software Engineer | Laravel, React, AWS Expert",
    template: "%s | Rakesh Nandakumar - Full Stack Developer",
  },
  description:
    "Rakesh Nandakumar is an experienced Full Stack Developer with 3+ years expertise in Laravel, React, Vue.js, Next.js, Node.js, and AWS. Specializing in building scalable web applications, enterprise solutions, and modern APIs. Hire a skilled software engineer for your next project.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Laravel Developer",
    "React Developer",
    "Vue.js Developer",
    "Next.js Developer",
    "AWS Solutions",
    "Web Development",
    "Technical Consultant",
    "API Development",
    "MongoDB Developer",
    "Node.js Developer",
    "PHP Developer",
    "JavaScript Expert",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Database Design",
    "Cloud Architecture",
    "DevOps",
    "Rakesh Nandakumar",
  ],
  authors: [{ name: "Rakesh Nandakumar", url: "https://rakeshn.com" }],
  creator: "Rakesh Nandakumar",
  publisher: "Rakesh Nandakumar",
  category: "Technology",
  classification: "Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakeshn.com",
    siteName: "Rakesh Nandakumar - Full Stack Developer Portfolio",
    title: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
    description:
      "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Creating dynamic web applications and enterprise solutions. Available for freelance and full-time opportunities.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
        type: "image/jpeg",
      },
      {
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio/profile.jpg`,
        width: 800,
        height: 800,
        alt: "Rakesh Nandakumar Profile Photo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rakesh_dev",
    creator: "@rakesh_dev",
    title: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
    description:
      "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Building modern web applications and enterprise solutions.",
    images: [
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio/hero.jpg`,
    ],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://rakeshn.com",
    languages: {
      "en-US": "https://rakeshn.com",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Rakesh Portfolio",
    "msapplication-TileColor": "#ff014f",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default async function RootLayout({ children }) {
  // Fetch site config from data service (async from Supabase)
  const siteConfig = await getSiteConfig();
  const ChatButtonOn = siteConfig?.ChatAssistantEnabled ?? false;

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        
        {/* SEO Critical Meta Tags */}
        <link rel="canonical" href="https://rakeshn.com" />
        <meta name="theme-color" content="#ff014f" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ff014f" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rakesh Portfolio" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Critical CSS - loaded synchronously for above-the-fold content */}
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        
        {/* Fallback for non-JS environments */}
        <noscript>
          <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
          <link rel="stylesheet" href="/assets/css/vendor/slick-theme.css" />
          <link rel="stylesheet" href="/assets/css/vendor/aos.css" />
          <link rel="stylesheet" href="/assets/css/plugins/feature.css" />
        </noscript>

        {/* Preload critical resources - fonts first for LCP */}
        <link
          rel="preload"
          href="/assets/fonts/feather.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL || "https://supabase.co"} />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* RSS Feed for SEO */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rakesh Nandakumar Blog RSS Feed"
          href="/api/rss"
        />
        
        {/* JSON Feed alternative */}
        <link
          rel="alternate"
          type="application/feed+json"
          title="Rakesh Nandakumar Blog JSON Feed"
          href="/api/feed.json"
        />

        {/* Comprehensive Structured Data */}
        <StructuredData
          type="WebSite"
          data={{
            name: "Rakesh Nandakumar Portfolio",
            url: "https://rakeshn.com",
            description:
              "Full Stack Developer & Software Engineer portfolio showcasing expertise in Laravel, React, Vue.js, Next.js, and AWS",
          }}
        />

        <StructuredData
          type="Person"
          data={{
            name: "Rakesh Nandakumar",
            jobTitle: "Full Stack Developer",
            description:
              "Experienced Full Stack Developer with 3+ years specializing in Laravel, React, Vue.js, Next.js, and AWS. Building scalable web applications and enterprise solutions.",
            url: "https://rakeshn.com",
            image: "https://rakeshn.com/profileImg.jpg",
            email: "hello@rakeshnandakumar.com",
            socialProfiles: [
              "https://linkedin.com/in/rakesh-nandakumar",
              "https://github.com/rakesh-nandakumar",
              "https://twitter.com/rakesh_dev",
            ],
            skills: [
              "Laravel",
              "React",
              "Vue.js",
              "Next.js",
              "Node.js",
              "AWS",
              "Full Stack Development",
              "Software Engineering",
              "JavaScript",
              "TypeScript",
              "PHP",
              "MySQL",
              "PostgreSQL",
              "MongoDB",
              "Docker",
              "CI/CD",
              "REST API",
              "GraphQL",
            ],
            company: "Procons Infotech",
          }}
        />
        
        {/* BreadcrumbList for SEO navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://rakeshn.com"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased template-color-1 spybody white-version`}
        data-spy="scroll"
        data-target=".navbar-example2"
        data-offset="70"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <a 
          href="#main-content" 
          className="skip-to-content"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          Skip to main content
        </a>
        
        <ErrorBoundary>
          <GoogleAnalytics />
          <ClientComponents />
          <ServiceWorkerRegistration />
          <AsyncCSS />
          <FeatherInit />
          <Header />
          <main id="main-content" role="main" itemProp="mainContentOfPage">
            {children}
          </main>
          {ChatButtonOn && <EnhancedChatButton />}
          <Footer />
        </ErrorBoundary>

        {/* Critical JS - needed for basic functionality */}
        <Script
          src="/assets/js/vendor/jquery.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/js/vendor/modernizer.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/js/vendor/feather.min.js"
          strategy="beforeInteractive"
        />
        
        {/* Interactive JS - loaded after page becomes interactive */}
        <Script
          src="/assets/js/vendor/bootstrap.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/vendor/aos.js" 
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof AOS !== 'undefined') {
              AOS.init({ 
                once: true, 
                duration: 600,
                easing: 'ease-out-cubic',
                disable: 'mobile'
              });
            }
          }}
        />
        <Script
          src="/assets/js/vendor/slick.min.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/assets/js/vendor/wow.js" 
          strategy="afterInteractive" 
        />
        
        {/* Non-critical JS - lazy loaded */}
        <Script src="/assets/js/vendor/text-type.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/particles.js" strategy="lazyOnload" />
        <Script
          src="/assets/js/vendor/jquery-one-page-nav.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/js/jquery-one-page-nav-fix.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
