import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import { getSiteConfig } from "@/lib/supabaseDataService";
import { 
  SectionSkeleton, 
  PortfolioGridSkeleton,
  BlogGridSkeleton 
} from "@/components/SkeletonLoaders";

// Dynamic imports for below-the-fold components with proper skeleton loaders
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => (
    <section className="rn-service-area rn-section-gap section-separator" aria-busy="true">
      <div className="container">
        <SectionSkeleton height="400px" />
      </div>
    </section>
  ),
  ssr: true,
});

const TechStackMarqueeClean = dynamic(
  () => import("@/components/TechStackMarqueeClean"),
  {
    loading: () => (
      <section className="tech-stack-section" style={{ minHeight: "200px" }} aria-busy="true">
        <div className="container">
          <div className="text-center py-5">
            <div className="animate-pulse bg-gray-200 h-6 w-48 mx-auto rounded mb-4" />
            <div className="animate-pulse bg-gray-200 h-10 w-full max-w-4xl mx-auto rounded" />
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const PortfolioSection = dynamic(
  () => import("@/components/PortfolioSection"),
  {
    loading: () => (
      <section className="rn-portfolio-area rn-section-gap section-separator" aria-busy="true">
        <div className="container">
          <div className="text-center mb-5">
            <div className="animate-pulse bg-gray-200 h-4 w-32 mx-auto rounded mb-3" />
            <div className="animate-pulse bg-gray-200 h-8 w-48 mx-auto rounded" />
          </div>
          <PortfolioGridSkeleton count={6} />
        </div>
      </section>
    ),
    ssr: true,
  }
);

const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => (
    <section className="cta-section" style={{ minHeight: "300px" }} aria-busy="true">
      <div className="container">
        <div className="text-center py-5">
          <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto rounded mb-4" />
          <div className="animate-pulse bg-gray-200 h-4 w-96 mx-auto rounded mb-4" />
          <div className="animate-pulse bg-gray-200 h-12 w-40 mx-auto rounded-full" />
        </div>
      </div>
    </section>
  ),
  ssr: true,
});

const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => (
    <section className="rn-blog-area rn-section-gap section-separator" aria-busy="true">
      <div className="container">
        <div className="text-center mb-5">
          <div className="animate-pulse bg-gray-200 h-4 w-32 mx-auto rounded mb-3" />
          <div className="animate-pulse bg-gray-200 h-8 w-48 mx-auto rounded" />
        </div>
        <BlogGridSkeleton count={3} />
      </div>
    </section>
  ),
  ssr: true,
});

// Enhanced metadata for homepage SEO
export const metadata = {
  title: "Rakesh Nandakumar - Full Stack Developer & Software Engineer | Portfolio",
  description:
    "Welcome to Rakesh Nandakumar's portfolio. Discover expertise in full-stack development with Laravel, React, Vue.js, Next.js, Node.js, and AWS. View projects, read tech blogs, and connect for freelance or full-time opportunities.",
  keywords: [
    "Full Stack Developer Portfolio",
    "Software Engineer Portfolio",
    "Web Development Projects",
    "Laravel Developer for Hire",
    "React Developer Portfolio",
    "Vue.js Expert",
    "AWS Solutions Architect",
    "Node.js Developer",
    "Freelance Web Developer",
    "Technical Consultant",
  ],
  openGraph: {
    title: "Rakesh Nandakumar - Full Stack Developer Portfolio",
    description:
      "Welcome to Rakesh Nandakumar's portfolio. Discover expertise in full-stack development, view projects, and connect for opportunities.",
    images: ["/hero.jpg"],
    type: "website",
  },
  alternates: {
    canonical: "https://rakeshn.com",
  },
};

export default async function Home() {
  // Fetch site config from Supabase with caching
  const siteConfig = await getSiteConfig();

  return (
    <>
      {/* Hero Section - Critical, loaded immediately */}
      <HeroSection />
      
      {/* Below-the-fold sections with Suspense boundaries for streaming */}
      <Suspense fallback={<SectionSkeleton height="400px" />}>
        {siteConfig.ServicesEnabled && <FeaturesSection />}
      </Suspense>
      
      <Suspense fallback={<div style={{ minHeight: "200px" }} />}>
        {siteConfig.TechnologiesEnabled && <TechStackMarqueeClean />}
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="500px" />}>
        {siteConfig.ProjectsEnabled && <PortfolioSection />}
      </Suspense>
      
      <Suspense fallback={<div style={{ minHeight: "300px" }} />}>
        <CTASection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="400px" />}>
        {siteConfig.BlogEnabled && <BlogSection />}
      </Suspense>
    </>
  );
}
