import { getPortfolio, getSiteConfig } from "@/lib/supabaseDataService";
import PortfolioPageClient from "./PortfolioPageClient";

// Generate metadata for SEO
export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  const baseUrl = siteConfig?.siteUrl || "https://rakeshn.com";

  return {
    title: "Portfolio - Web Development Projects | Rakesh Nandakumar",
    description:
      "Explore Rakesh Nandakumar's portfolio of web development projects built with Laravel, React, Vue.js, Next.js, and AWS. View live demos, source code, and case studies of enterprise-grade applications, open-source contributions, and innovative solutions.",
    keywords: [
      "Web Development Portfolio",
      "Full Stack Developer Projects",
      "Laravel Projects",
      "React Applications",
      "Vue.js Projects",
      "Next.js Portfolio",
      "AWS Solutions",
      "Open Source Projects",
      "Rakesh Nandakumar Work",
      "Software Development Case Studies",
      "Enterprise Web Applications",
      "API Development Projects",
    ],
    openGraph: {
      title: "Portfolio | Rakesh Nandakumar - Full Stack Developer",
      description:
        "Explore web development projects built with Laravel, React, Vue.js, and AWS. View live demos and case studies.",
      type: "website",
      url: `${baseUrl}/portfolio`,
      images: [
        {
          url: `${baseUrl}/hero.jpg`,
          width: 1200,
          height: 630,
          alt: "Rakesh Nandakumar - Web Development Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Rakesh Nandakumar - Full Stack Developer",
      description:
        "Web development projects built with Laravel, React, Vue.js, and AWS.",
      creator: "@rakesh_dev",
    },
    alternates: {
      canonical: `${baseUrl}/portfolio`,
    },
  };
}

// JSON-LD structured data for portfolio
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Rakesh Nandakumar Portfolio",
  description: "Collection of web development projects and software solutions",
  url: "https://rakeshn.com/portfolio",
  author: {
    "@type": "Person",
    name: "Rakesh Nandakumar",
    url: "https://rakeshn.com",
    jobTitle: "Full Stack Developer",
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
        name: "Portfolio",
        item: "https://rakeshn.com/portfolio",
      },
    ],
  },
};

export default async function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <PortfolioPageClient />
    </>
  );
}
