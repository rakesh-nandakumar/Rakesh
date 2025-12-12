import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { getSiteConfig } from "@/lib/supabaseDataService";

// Dynamic imports for below-the-fold components to improve initial load
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});

const TechStackMarqueeClean = dynamic(
  () => import("@/components/TechStackMarqueeClean"),
  {
    loading: () => <div style={{ minHeight: "200px" }} />,
  }
);

const PortfolioSection = dynamic(
  () => import("@/components/PortfolioSection"),
  {
    loading: () => <div style={{ minHeight: "500px" }} />,
  }
);

const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div style={{ minHeight: "300px" }} />,
});

const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});

export const metadata = {
  title: "Home",
  description:
    "Welcome to Rakesh Nandakumar's portfolio. Discover my expertise in full-stack development, software engineering, and technical consulting with Laravel, React, Vue.js, and AWS.",
  keywords: [
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
    "Laravel",
    "React",
    "Vue.js",
    "AWS",
    "Software Engineer",
  ],
  openGraph: {
    title: "Rakesh Nandakumar - Full Stack Developer Portfolio",
    description:
      "Welcome to Rakesh Nandakumar's portfolio. Discover my expertise in full-stack development, software engineering, and technical consulting.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: "https://rakeshn.com",
  },
};

export default async function Home() {
  // Fetch site config from Supabase
  const siteConfig = await getSiteConfig();

  return (
    <>
      <HeroSection />
      {siteConfig.ServicesEnabled && <FeaturesSection />}
      {siteConfig.TechnologiesEnabled && <TechStackMarqueeClean />}
      {siteConfig.ProjectsEnabled && <PortfolioSection />}
      <CTASection />
      {siteConfig.BlogEnabled && <BlogSection />}
    </>
  );
}
