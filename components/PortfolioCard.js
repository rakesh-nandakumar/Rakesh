import { ExternalLink, GitHub, ArrowUpRight, Download } from "react-feather";
import Link from "next/link";

export default function PortfolioCard({ item, index }) {
  // Default status to 'upcoming' if not specified
  const status = item.status || "upcoming";
  const progress = item.progress || 0;

  // Generate slug for the project
  const projectSlug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "status-ongoing";
      case "completed":
        return "status-completed";
      case "upcoming":
        return "status-upcoming";
      default:
        return "status-upcoming";
    }
  };

  return (
    <div
      key={item.id}
      data-aos="fade-up"
      data-aos-delay={100 + index * 100}
      data-aos-once="true"
      className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
    >
      <div className="rn-portfolio">
        <div className="inner">
          <div className="thumbnail">
            <Link href={`/portfolio/${projectSlug}`}>
              <img src={item.image} alt="Personal Portfolio Images" />
            </Link>
          </div>
          <div
            className="content"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Content section */}
            <div>
              {/* Status Badge */}
              <div className="category-info">
                <div className="category-list">
                  <a href="javascript:void(0)">{item.category}</a>
                </div>
              </div>
              <h4 className="title">
                <Link href={`/portfolio/${projectSlug}`}>
                  {item.title}
                  {/* <i className="feather-arrow-up-right" /> */}
                </Link>
              </h4>
              <div className="technologies">
                {item.technologies &&
                  item.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">
                      {tech}
                    </span>
                  ))}
              </div>
              <div className="description">
                <p className="short-description">{item.shortDescription}</p>
              </div>
            </div>

            {/* Bottom section - buttons always stick to bottom */}
            <div>
              {/* Progress Bar for Ongoing Projects */}
              {status === "ongoing" && progress > 0 && (
                <div className="project-progress">
                  <div className="progress-label">
                    <span
                      style={{
                        color: "var(--color-heading-wv)",
                      }}
                    >
                      Project Progress
                    </span>
                    <span className="progress-percentage">{progress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Links for completed projects */}
              {status === "completed" && (item.liveLink || item.githubLink) && (
                <div className="portfolio-links">
                  {item.liveLink && (
                    <a
                      href={item.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link live-link"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {item.githubLink && (
                    <a
                      href={item.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link github-link"
                    >
                      <GitHub size={14} />
                      GitHub
                    </a>
                  )}
                </div>
              )}

              {/* Purchase Button for projects with price */}
              {/* {item.price && (
                <div className="portfolio-purchase">
                  <Link
                    href={`/contact?project=${encodeURIComponent(
                      item.title
                    )}&price=${encodeURIComponent(item.price)}&type=purchase`}
                    className="portfolio-link purchase-link"
                  >
                    <Download size={14} />
                    Purchase - {item.price}
                  </Link>
                </div>
              )} */}

              {/* View Details Button for all projects */}
              {/* <div className="portfolio-view-details">
                <Link
                  href={`/portfolio/${projectSlug}`}
                  className="portfolio-link view-details-link"
                >
                  <ArrowUpRight size={14} />
                  View Details
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
