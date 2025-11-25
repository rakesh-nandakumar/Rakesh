"use client";

import PortfolioCard from "./PortfolioCard";
import Link from "next/link";
import { usePortfolios } from "@/hooks/useSupabaseData";

export default function PortfolioSection() {
  const { portfolios, isLoading } = usePortfolios();

  if (isLoading) {
    return (
      <div
        className="rn-portfolio-area rn-section-gap section-separator"
        id="portfolio"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const portfolioItems = (portfolios || [])
    .filter((item) => item.featured)
    .sort((a, b) => {
      // Prioritize completed projects first
      if (a.status === "completed" && b.status !== "completed") return -1;
      if (b.status === "completed" && a.status !== "completed") return 1;

      // For ongoing projects, sort by progress percentage (highest first)
      if (a.status === "ongoing" && b.status === "ongoing") {
        return (b.progress || 0) - (a.progress || 0);
      }

      // For other statuses, maintain original order
      return 0;
    })
    .slice(0, 3); // Get only the top 3

  return (
    <div
      className="rn-portfolio-area rn-section-gap section-separator"
      id="portfolio"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">
                A Selection of my Personal Portfolio Projects
              </span>
              <h2 className="title">My Portfolio</h2>
            </div>
          </div>
        </div>
        <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id || index} item={item} index={index} />
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12 text-center mt--50">
            <Link href="/portfolio" className="rn-btn border-button btn-small">
              Show More Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
