import { getPortfolio, getSiteConfig } from "@/lib/supabaseDataService";
import PortfolioPageClient from "./PortfolioPageClient";

// Generate metadata for SEO
export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  
  return {
    title: "Portfolio | Rakesh Nandakumar - Full Stack Developer",
    description:
      "Explore my portfolio of web development projects, open-source contributions, and technical implementations across various domains.",
    keywords: [
      "portfolio",
      "web development",
      "full stack developer",
      "projects",
      "Rakesh Nandakumar",
    ],
    openGraph: {
      title: "Portfolio | Rakesh Nandakumar",
      description:
        "Explore my portfolio of web development projects and technical implementations.",
      type: "website",
      url: `${siteConfig?.siteUrl || "https://rakeshn.com"}/portfolio`,
      images: [
        {
          url: `${siteConfig?.siteUrl || "https://rakeshn.com"}/images/portfolio-og.jpg`,
          width: 1200,
          height: 630,
          alt: "Rakesh Nandakumar Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Rakesh Nandakumar",
      description:
        "Explore my portfolio of web development projects and technical implementations.",
    },
    alternates: {
      canonical: `${siteConfig?.siteUrl || "https://rakeshn.com"}/portfolio`,
    },
  };
}

export default async function PortfolioPage() {
  // Prefetch portfolio data for SSR hydration (optional - client also fetches)
  // const portfolioItems = await getPortfolio();
  
  return <PortfolioPageClient />;
}
