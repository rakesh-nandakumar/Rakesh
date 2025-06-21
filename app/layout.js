import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        <link
          rel="stylesheet"
          href="https://inbio.pixcelsthemes.com/inbio/assets/css/vendor/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://inbio.pixcelsthemes.com/inbio/assets/css/vendor/slick.css"
        />
        <link
          rel="stylesheet"
          href="https://inbio.pixcelsthemes.com/inbio/assets/css/vendor/slick-theme.css"
        />
        <link
          rel="stylesheet"
          href="https://inbio.pixcelsthemes.com/inbio/assets/css/vendor/aos.css"
        />
        <link
          rel="stylesheet"
          href="https://inbio.pixcelsthemes.com/inbio/assets/css/plugins/feature.css"
        />
        <link
          rel="stylesheet"
          href="https://inbio.pixcelsthemes.com/inbio/assets/css/style.css"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rakesh Nandakumar",
              jobTitle: "Full Stack Developer",
              description:
                "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS",
              url: "https://rakeshnandakumar.com",
              image: "https://rakeshnandakumar.com/profileImg.jpg",
              sameAs: [
                "https://linkedin.com/in/rakesh-nandakumar",
                "https://github.com/rakesh-nandakumar",
              ],
              knowsAbout: [
                "Laravel",
                "React",
                "Vue.js",
                "AWS",
                "Full Stack Development",
                "Software Engineering",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Procons Infotech",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased template-color-1 spybody`}
        data-spy="scroll"
        data-target=".navbar-example2"
        data-offset="70"
      >
        <ThemeProvider>
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
          <Header />
          {children}
          <ChatButton />
          <Footer />
        </ThemeProvider>

        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/jquery.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/modernizer.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/slick.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/bootstrap.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/text-type.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/wow.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/aos.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/particles.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/vendor/jquery-one-page-nav.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://inbio.pixcelsthemes.com/inbio/assets/js/main.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
