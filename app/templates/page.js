"use client";

import React, { useState, useMemo, useEffect } from "react";
import PortfolioCard from "@/components/PortfolioCard";
import portfolioData from "@/data/portfolio.json";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Head from "next/head";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("completed");
  const portfolioItems = portfolioData;
  // Filter projects based on status
  const filteredProjects = useMemo(() => {
    return portfolioItems.filter((item) => {
      const status = item.status || "upcoming";
      return status === activeFilter;
    });
  }, [activeFilter, portfolioItems]);
  // Get counts for each status
  const statusCounts = useMemo(() => {
    const counts = portfolioItems.reduce((acc, item) => {
      const status = item.status || "upcoming";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return {
      ongoing: counts.ongoing || 0,
      completed: counts.completed || 0,
      upcoming: counts.upcoming || 0,
    };
  }, [portfolioItems]);

  // Set document title and meta tags
  useEffect(() => {
    document.title = "Portfolio - Rakesh Nandakumar";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore Rakesh Nandakumar's portfolio of web applications, enterprise solutions, and technical projects built with Laravel, React, Vue.js, AWS, and more modern technologies."
      );
    }
  }, []);

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
          {/* Filter Buttons */}
          <div className="row">
            <div className="col-lg-12">
              <div className="portfolio-filters text-center mb-5">
                <div className="filter-buttons">
                  <button
                    className={`filter-btn ${
                      activeFilter === "completed" ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter("completed")}
                  >
                    Completed ({statusCounts.completed})
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === "ongoing" ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter("ongoing")}
                  >
                    Ongoing ({statusCounts.ongoing})
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === "upcoming" ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter("upcoming")}
                  >
                    Upcoming ({statusCounts.upcoming})
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
            {filteredProjects.map((item, index) => (
              <PortfolioCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
