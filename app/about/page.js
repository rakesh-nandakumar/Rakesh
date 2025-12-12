import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import TimelineComponent from "@/components/timeline/TimelineComponent";
import SkillsSection from "@/components/SkillsSection";
import GallerySection from "@/components/GallerySection";
import { getSiteConfig } from "@/lib/supabaseDataService";

export const metadata = {
  title: "About Me - Full Stack Developer Journey",
  description:
    "Learn about Rakesh Nandakumar - a skilled full-stack developer with 3+ years of experience in Laravel, React, Vue.js, AWS, and modern web technologies. Discover my education, experience, and technical expertise.",
  keywords: [
    "About Rakesh Nandakumar",
    "Full Stack Developer Experience",
    "Software Engineer Background",
    "Laravel Expert",
    "React Developer",
    "Technical Skills",
    "Professional Experience",
    "Education",
  ],
  openGraph: {
    title: "About Me | Rakesh Nandakumar",
    description:
      "Learn about Rakesh Nandakumar - a skilled full-stack developer with 3+ years of experience in Laravel, React, Vue.js, and AWS.",
    type: "profile",
    url: "/about",
    images: [
      {
        url: "/profileImg.jpg",
        width: 1200,
        height: 630,
        alt: "Rakesh Nandakumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Rakesh Nandakumar",
    description:
      "Learn about my journey as a full-stack developer with 3+ years of experience.",
    images: ["/profileImg.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default async function About() {
  // Fetch site config from Supabase
  const siteConfig = await getSiteConfig();

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
