import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ResumeSection from "@/components/ResumeSection";
import TestimonialSection from "@/components/TestimonialSection";
import CareerTimeline from "@/components/CareerTimeline";
import TimelineComponent from "@/components/timeline/TimelineComponent";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import GallerySection from "@/components/GallerySection";
import { getGallery, getSiteConfig } from "@/lib/dataService";
import { Calendar, Clock } from "react-feather";
import { ExternalLink, GitHub } from "react-feather";

export const metadata = {
  title: "About Me",
  description:
    "Learn about Rakesh Nandakumar - a skilled full-stack developer with 3+ years of experience in Laravel, React, Vue.js, and AWS. Discover my education, experience, and technical expertise.",
  keywords: [
    "About Rakesh Nandakumar",
    "Full Stack Developer Experience",
    "Software Engineer Background",
    "Laravel Expert",
    "React Developer",
    "Technical Skills",
  ],
  openGraph: {
    title: "About Rakesh Nandakumar - Full Stack Developer",
    description:
      "Learn about Rakesh Nandakumar - a skilled full-stack developer with 3+ years of experience in Laravel, React, Vue.js, and AWS.",
    images: ["/profileImg.jpg"],
  },
  alternates: {
    canonical: "https://rakeshnandakumar.com/about",
  },
};

export default async function About() {
  const siteConfig = await getSiteConfig();
  const galleryData = await getGallery();

  // Structured data for About page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Person",
      name: "Rakesh Nandakumar",
      jobTitle: "Full Stack Developer",
      description:
        "Skilled full-stack developer with 3+ years of experience in Laravel, React, Vue.js, and AWS",
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Staffordshire University UK",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Asia Pacific Institute of Information Technology",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Procons Infotech",
      },
      knowsAbout: [
        "Laravel",
        "React",
        "Vue.js",
        "AWS",
        "Full Stack Development",
        "Software Engineering",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />
      <div className="about-page pt-20">
        <AboutSection />
        {siteConfig.TimelineEnabled && <TimelineComponent />}
        {siteConfig.TimelineEnabled && <ResumeSection />}
        {siteConfig.TechnologiesEnabled && <SkillsSection />}
        {siteConfig.GalleryEnabled && <GallerySection />}
      </div>
    </>
  );
}
