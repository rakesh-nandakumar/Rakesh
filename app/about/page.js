import { Suspense } from "react";
import dynamic from "next/dynamic";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import TimelineComponent from "@/components/timeline/TimelineComponent";
import SkillsSection from "@/components/SkillsSection";
import { getSiteConfig } from "@/lib/supabaseDataService";
import { SectionSkeleton } from "@/components/SkeletonLoaders";

// Lazy load gallery for performance
const GallerySection = dynamic(() => import("@/components/GallerySection"), {
  loading: () => <SectionSkeleton height="400px" />,
  ssr: true,
});

export const metadata = {
  title: "About Rakesh Nandakumar - Full Stack Developer & Software Engineer",
  description:
    "Learn about Rakesh Nandakumar - an experienced Full Stack Developer with 3+ years expertise in Laravel, React, Vue.js, Next.js, Node.js, and AWS. Discover my education at Staffordshire University, professional experience at Procons Infotech, and comprehensive technical skills. Available for hire.",
  keywords: [
    "About Rakesh Nandakumar",
    "Full Stack Developer Experience",
    "Software Engineer Background",
    "Laravel Expert India",
    "React Developer Portfolio",
    "Vue.js Developer",
    "AWS Certified Developer",
    "Technical Skills",
    "Professional Experience",
    "Staffordshire University",
    "APIIT",
    "Procons Infotech",
    "Hire Full Stack Developer",
    "Web Developer India",
  ],
  openGraph: {
    title: "About Rakesh Nandakumar | Full Stack Developer & Software Engineer",
    description:
      "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS. Learn about my journey, skills, and professional experience.",
    type: "profile",
    url: "https://rakeshn.com/about",
    images: [
      {
        url: "/profileImg.jpg",
        width: 1200,
        height: 630,
        alt: "Rakesh Nandakumar - Full Stack Developer",
      },
    ],
    profile: {
      firstName: "Rakesh",
      lastName: "Nandakumar",
      username: "rakesh-nandakumar",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rakesh Nandakumar | Full Stack Developer",
    description:
      "3+ years experience in Laravel, React, Vue.js, and AWS. Learn about my journey as a full-stack developer.",
    images: ["/profileImg.jpg"],
    creator: "@rakesh_dev",
  },
  alternates: {
    canonical: "https://rakeshn.com/about",
  },
};

export default async function About() {
  // Fetch site config from Supabase
  const siteConfig = await getSiteConfig();

  // Comprehensive Structured data for About page
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Rakesh Nandakumar",
    description:
      "Professional biography and career journey of Rakesh Nandakumar, Full Stack Developer",
    url: "https://rakeshn.com/about",
    mainEntity: {
      "@type": "Person",
      "@id": "https://rakeshn.com/#person",
      name: "Rakesh Nandakumar",
      givenName: "Rakesh",
      familyName: "Nandakumar",
      jobTitle: "Full Stack Developer",
      description:
        "Experienced Full Stack Developer with 3+ years of expertise in Laravel, React, Vue.js, Next.js, Node.js, and AWS. Specializing in building scalable web applications and enterprise solutions.",
      image: "https://rakeshn.com/profileImg.jpg",
      url: "https://rakeshn.com",
      email: "hello@rakeshnandakumar.com",
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Staffordshire University",
          address: {
            "@type": "PostalAddress",
            addressCountry: "UK",
          },
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Asia Pacific Institute of Information Technology (APIIT)",
          address: {
            "@type": "PostalAddress",
            addressCountry: "Sri Lanka",
          },
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Procons Infotech",
        url: "https://proconsinfotech.com",
      },
      knowsAbout: [
        "Laravel Framework",
        "React.js",
        "Vue.js",
        "Next.js",
        "Node.js",
        "Amazon Web Services (AWS)",
        "Full Stack Development",
        "Software Engineering",
        "REST API Development",
        "Database Design",
        "JavaScript",
        "TypeScript",
        "PHP",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "CI/CD",
        "Git",
        "Agile Methodology",
      ],
      sameAs: [
        "https://linkedin.com/in/rakesh-nandakumar",
        "https://github.com/rakesh-nandakumar",
        "https://twitter.com/rakesh_dev",
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rakeshn.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://rakeshn.com/about",
        },
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
      <article
        className="about-page pt-20"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <meta itemProp="name" content="About Rakesh Nandakumar" />
        <meta
          itemProp="description"
          content="Professional biography and career journey"
        />

        <AboutSection />

        <Suspense fallback={<SectionSkeleton height="600px" />}>
          {siteConfig.TimelineEnabled && <TimelineComponent />}
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          {siteConfig.TimelineEnabled && <ResumeSection />}
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          {siteConfig.TechnologiesEnabled && <SkillsSection />}
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          {siteConfig.GalleryEnabled && <GallerySection />}
        </Suspense>
      </article>
    </>
  );
}
