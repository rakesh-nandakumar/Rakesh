import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { getSiteConfig } from "@/lib/supabaseData";
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
import SEOMonitor from "@/components/SEOMonitor";
import { AssetPrefetcher } from "@/lib/assetPrefetch";
import { getSupabasePreconnectLinks } from "@/lib/assetOptimization";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://rakeshn.com"),
  title: {
    default: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
    template: "%s | Rakesh Nandakumar",
  },
  description:
    "Rakesh Nandakumar - Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Creating dynamic web applications and enterprise solutions.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Laravel Developer",
    "React Developer",
    "Vue.js",
    "AWS",
    "Web Development",
    "Technical Consultant",
    "API Development",
    "Next.js Developer",
    "MongoDB",
    "Node.js",
    "JavaScript",
    "PHP",
    "TypeScript",
    "PostgreSQL",
    "MySQL",
    "REST API",
    "GraphQL",
    "Microservices",
    "Cloud Computing",
    "DevOps",
    "CI/CD",
    "Docker",
    "Kubernetes",
  ],
  authors: [{ name: "Rakesh Nandakumar", url: "https://rakeshn.com" }],
  creator: "Rakesh Nandakumar",
  publisher: "Rakesh Nandakumar",
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
    title: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
    description:
      "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Creating dynamic web applications and enterprise solutions.",
    siteName: "Rakesh Nandakumar Portfolio",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Rakesh Nandakumar - Full Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
    description:
      "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Creating dynamic web applications and enterprise solutions.",
    images: ["/hero.jpg"],
    creator: "@rakeshnandakumar",
    site: "@rakeshnandakumar",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://rakeshn.com",
    types: {
      'application/rss+xml': 'https://rakeshn.com/api/rss',
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/avatar.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/avatar.png",
    apple: [
      { url: "/avatar.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/avatar.png",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Rakesh Portfolio",
    statusBarStyle: "default",
  },
  category: "technology",
  classification: "Business",
};

export default async function RootLayout({ children }) {
  // Fetch site config from Supabase
  const siteConfig = await getSiteConfig();
  const ChatButtonOn = siteConfig?.ChatAssistantEnabled ?? false;

  // Setup Supabase preconnect links (server-safe)
  const supabaseLinks = getSupabasePreconnectLinks();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        <link rel="canonical" href="https://rakeshn.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f9004d" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-TileColor" content="#f9004d" />
        <meta name="msapplication-TileImage" content="/avatar.png" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rakesh Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Rakesh Portfolio" />
        
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Language */}
        <meta httpEquiv="content-language" content="en" />
        
        {/* Author and copyright */}
        <meta name="author" content="Rakesh Nandakumar" />
        <meta name="copyright" content="Rakesh Nandakumar" />
        
        {/* Favicon */}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/avatar.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/avatar.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/avatar.png" />
        
        {/* Critical CSS - loaded synchronously */}
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        
        {/* Non-critical CSS loaded via AsyncCSS component */}
        <noscript>
          <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
          <link rel="stylesheet" href="/assets/css/vendor/slick-theme.css" />
          <link rel="stylesheet" href="/assets/css/vendor/aos.css" />
          <link rel="stylesheet" href="/assets/css/plugins/feature.css" />
        </noscript>

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/assets/fonts/feather.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Supabase preconnect for faster asset loading */}
        {supabaseLinks}

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rakesh Nandakumar Blog RSS Feed"
          href="/api/rss"
        />

        <StructuredData
          type="WebSite"
          data={{
            name: "Rakesh Nandakumar Portfolio",
            url: "https://rakeshn.com",
            description:
              "Full Stack Developer & Software Engineer portfolio showcasing expertise in Laravel, React, Vue.js, and AWS",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://rakeshn.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />

        <StructuredData
          type="Person"
          data={{
            name: "Rakesh Nandakumar",
            jobTitle: "Full Stack Developer",
            description:
              "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS",
            url: "https://rakeshn.com",
            image: "https://rakeshn.com/profileImg.jpg",
            email: "hello@rakeshnandakumar.com",
            sameAs: [
              "https://linkedin.com/in/rakesh-nandakumar",
              "https://github.com/rakesh-nandakumar",
              "https://twitter.com/rakeshnandakumar",
            ],
            knowsAbout: [
              "Laravel",
              "React",
              "Vue.js",
              "AWS",
              "Full Stack Development",
              "Software Engineering",
              "JavaScript",
              "PHP",
              "MySQL",
              "PostgreSQL",
              "MongoDB",
              "Node.js",
              "TypeScript",
              "REST API",
              "GraphQL",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Procons Infotech",
            },
          }}
        />
        
        <StructuredData
          type="Organization"
          data={{
            "@type": "ProfessionalService",
            name: "Rakesh Nandakumar - Full Stack Development Services",
            url: "https://rakeshn.com",
            logo: "https://rakeshn.com/avatar.png",
            description: "Professional full stack web development services specializing in Laravel, React, Vue.js, and AWS cloud solutions",
            email: "hello@rakeshnandakumar.com",
            sameAs: [
              "https://linkedin.com/in/rakesh-nandakumar",
              "https://github.com/rakesh-nandakumar",
            ],
            founder: {
              "@type": "Person",
              name: "Rakesh Nandakumar",
            },
            areaServed: "Worldwide",
            priceRange: "$$",
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased template-color-1 spybody white-version`}
        data-spy="scroll"
        data-target=".navbar-example2"
        data-offset="70"
      >
        <ErrorBoundary>
          <GoogleAnalytics />
          <SEOMonitor />
          <ClientComponents />
          <ServiceWorkerRegistration />
          <AssetPrefetcher />
          <AsyncCSS />
          <FeatherInit />
          <Header />
          {children}
          {ChatButtonOn && <EnhancedChatButton />}
          <Footer />
        </ErrorBoundary>

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
        <Script
          src="/assets/js/vendor/bootstrap.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/js/vendor/aos.js" strategy="afterInteractive" />
        <Script
          src="/assets/js/vendor/slick.min.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/js/vendor/wow.js" strategy="afterInteractive" />
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
