import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import siteConfig from "@/data/site-config.json";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import { ThemeProvider } from "@/contexts/ThemeContext";
import FeatherInit from "@/components/FeatherInit";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import StructuredData from "@/components/StructuredData";
import ClientComponents from "@/components/ClientComponents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
  ],
  authors: [{ name: "Rakesh Nandakumar", url: "https://rakeshnandakumar.com" }],
  creator: "Rakesh Nandakumar",
  publisher: "Rakesh Nandakumar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakeshnandakumar.com",
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
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakesh Nandakumar - Full Stack Developer & Software Engineer",
    description:
      "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Creating dynamic web applications and enterprise solutions.",
    images: ["/hero.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://rakeshnandakumar.com",
  },
  icons: {
    icon: "/avatar.png",
    shortcut: "/avatar.png",
    apple: "/avatar.png",
  },
};

export default function RootLayout({ children }) {
  // Use site-config.json for feature flags
  const ChatButtonOn = siteConfig?.ChatAssistantEnabled ?? false;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="canonical" href="https://rakeshnandakumar.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
        <link rel="stylesheet" href="/assets/css/vendor/slick-theme.css" />
        <link rel="stylesheet" href="/assets/css/vendor/aos.css" />
        <link rel="stylesheet" href="/assets/css/plugins/feature.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/assets/css/vendor/bootstrap.min.css"
          as="style"
        />
        <link rel="preload" href="/assets/css/vendor/aos.css" as="style" />
        <link
          rel="preload"
          href="/assets/fonts/feather.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

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
            url: "https://rakeshnandakumar.com",
            description:
              "Full Stack Developer & Software Engineer portfolio showcasing expertise in Laravel, React, Vue.js, and AWS",
          }}
        />

        <StructuredData
          type="Person"
          data={{
            name: "Rakesh Nandakumar",
            jobTitle: "Full Stack Developer",
            description:
              "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS",
            url: "https://rakeshnandakumar.com",
            image: "https://rakeshnandakumar.com/profileImg.jpg",
            email: "hello@rakeshnandakumar.com",
            socialProfiles: [
              "https://linkedin.com/in/rakesh-nandakumar",
              "https://github.com/rakesh-nandakumar",
            ],
            skills: [
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
            ],
            company: "Procons Infotech",
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased template-color-1 spybody`}
        data-spy="scroll"
        data-target=".navbar-example2"
        data-offset="70"
      >
        <ErrorBoundary>
          <ThemeProvider>
            <GoogleAnalytics />
            <ClientComponents />
            <FeatherInit />
            <Header />
            {children}
            {ChatButtonOn && <ChatButton />}
            <Footer />
          </ThemeProvider>
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
        <Script src="/assets/js/vendor/text-type.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/wow.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/particles.js" strategy="lazyOnload" />
        <Script
          src="/assets/js/vendor/jquery-one-page-nav.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/js/jquery-one-page-nav-fix.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
