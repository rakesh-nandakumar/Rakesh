import PortfolioCard from "./PortfolioCard";
import portfolioData from "../data/portfolio.json";
import Link from "next/link";

export default function PortfolioSection() {
  const portfolioItems = portfolioData.filter((item) => item.featured);

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
            <PortfolioCard key={index} item={item} index={index} />
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
