"use client";

import React, { useState, useMemo, useEffect } from "react";
import TemplateCard from "@/components/TemplateCard";
import portfolioData from "@/data/portfolio.json";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Head from "next/head";

export default function TemplatesSection() {
  const [activeFilter, setActiveFilter] = useState("available");
  // Filter only items that have a price (templates for sale)
  const templateItems = portfolioData.filter((item) => item.price);

  // Filter templates based on availability
  const filteredProjects = useMemo(() => {
    return templateItems.filter((item) => {
      if (activeFilter === "available") {
        return item.status === "completed"; // Only show completed templates as available
      } else if (activeFilter === "coming-soon") {
        return item.status === "ongoing" || item.status === "upcoming";
      } else if (activeFilter === "all") {
        return true; // Show all templates
      }
      return true;
    });
  }, [activeFilter, templateItems]);
  // Get counts for each category
  const statusCounts = useMemo(() => {
    const available = templateItems.filter(
      (item) => item.status === "completed"
    ).length;
    const comingSoon = templateItems.filter(
      (item) => item.status === "ongoing" || item.status === "upcoming"
    ).length;
    return {
      available,
      comingSoon,
      total: templateItems.length,
    };
  }, [templateItems]);

  // Set document title and meta tags
  useEffect(() => {
    document.title = "Templates - Rakesh Nandakumar";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse and purchase premium web application templates and solutions. High-quality, professionally designed templates built with modern technologies like Laravel, React, Next.js, and more."
      );
    }
  }, []);

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "https://rakeshnandakumar.com" },
    { name: "Templates", url: "https://rakeshnandakumar.com/templates" },
  ];

  // Structured data for templates
  const templateStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Rakesh Nandakumar's Templates",
    description:
      "Premium web application templates and solutions for sale. Professional, modern designs built with cutting-edge technologies.",
    author: {
      "@type": "Person",
      name: "Rakesh Nandakumar",
      jobTitle: "Full Stack Developer",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Application Templates",
      itemListElement: templateItems.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: item.title,
          description: item.description || item.shortDescription,
          applicationCategory: "WebApplication",
          operatingSystem: "Cross-platform",
        },
        price: item.price?.replace("$", ""),
        priceCurrency: "USD",
        availability:
          item.status === "completed"
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
      })),
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(templateStructuredData),
        }}
      />
      <div
        className="rn-portfolio-area rn-section-gap section-separator"
        id="templates"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 className="title">Premium Templates</h2>
                <p
                  className="description mt-5"
                  style={{
                    fontSize: "16px",
                    marginBottom: "0px",
                  }}
                >
                  Professional web application templates and solutions available
                  for purchase. High-quality, modern designs built with
                  cutting-edge technologies.
                </p>
                <p
                  className="description"
                  style={{
                    fontSize: "14px",
                    color: "#6c757d",
                    fontStyle: "italic",
                  }}
                >
                  Ready-to-use templates that can save you months of development
                  time. Contact us for customization and support services.
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
                      activeFilter === "available" ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter("available")}
                  >
                    Available Now ({statusCounts.available})
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === "coming-soon" ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter("coming-soon")}
                  >
                    Coming Soon ({statusCounts.comingSoon})
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === "all" ? "active" : ""
                    }`}
                    onClick={() => setActiveFilter("all")}
                  >
                    All Templates ({statusCounts.total})
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => (
                <TemplateCard key={index} item={item} index={index} />
              ))
            ) : (
              <div className="col-12">
                <div className="text-center">
                  <p className="description">
                    {activeFilter === "available"
                      ? "No templates are currently available for purchase."
                      : activeFilter === "coming-soon"
                      ? "No templates are currently in development."
                      : "No templates found."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
