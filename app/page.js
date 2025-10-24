import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ResumeSection from "@/components/ResumeSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import TechStackMarqueeClean from "@/components/TechStackMarqueeClean";
import { getSiteConfig } from "@/lib/dataService";

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
    canonical: "https://rakeshnandakumar.com",
  },
};

export default async function Home() {
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
