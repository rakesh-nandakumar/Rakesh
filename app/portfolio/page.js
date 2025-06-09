import React from "react";
import PortfolioCard from "@/components/PortfolioCard";
import portfolioData from "@/data/portfolio.json";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore Rakesh Nandakumar's portfolio of web applications, enterprise solutions, and technical projects built with Laravel, React, Vue.js, AWS, and more modern technologies.",
  keywords: [
    "Portfolio",
    "Web Development Projects",
    "Laravel Applications",
    "React Projects",
    "Vue.js Apps",
    "AWS Solutions",
    "Enterprise Software",
  ],
  openGraph: {
    title: "Portfolio - Rakesh Nandakumar",
    description:
      "Explore Rakesh Nandakumar's portfolio of web applications, enterprise solutions, and technical projects.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: "https://rakeshnandakumar.com/portfolio",
  },
};

export default function PortfolioSection() {
  const portfolioItems = portfolioData;

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "https://rakeshnandakumar.com" },
    { name: "Portfolio", url: "https://rakeshnandakumar.com/portfolio" },
  ];

  // Structured data for portfolio
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Rakesh Nandakumar's Portfolio",
    description:
      "A showcase of technical projects and contributions across various domains and technologies",
    author: {
      "@type": "Person",
      name: "Rakesh Nandakumar",
      jobTitle: "Full Stack Developer",
    },
    mainEntity: portfolioItems.map((item) => ({
      "@type": "SoftwareApplication",
      name: item.title,
      description: item.description || item.shortDescription,
      applicationCategory: "WebApplication",
      operatingSystem: "Cross-platform",
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioStructuredData),
        }}
      />
      <div
        className="rn-portfolio-area rn-section-gap section-separator"
        id="portfolio"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 className="title">My Portfolio</h2>
                <p
                  className="description mt-5"
                  style={{
                    fontSize: "16px",
                    marginBottom: "0px",
                  }}
                >
                  A showcase of my technical projects and contributions across
                  various domains and technologies.
                </p>
                <p
                  className="description"
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                    fontStyle: "italic",
                  }}
                >
                  Note: This portfolio includes only a small percentage of my
                  work - just projects that I have permission to publish or that
                  are my personal creations. My professional portfolio is much
                  more extensive.
                </p>
              </div>
            </div>
          </div>
          <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
            {portfolioItems.map((item, index) => (
              <PortfolioCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
