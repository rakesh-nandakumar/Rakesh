import {
  ExternalLink,
  GitHub,
  ArrowUpRight,
  ShoppingCart,
  MessageCircle,
} from "react-feather";
import Link from "next/link";
import Image from "next/image";
import "@/styles/TemplateCard.css";

export default function TemplateCard({ item, index }) {
  // Default status to 'upcoming' if not specified
  const status = item.status || "upcoming";
  const progress = item.progress || 0;
  const price = item.price || null;

  // Generate slug for the template
  const templateSlug = item.title
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

  const getAvailabilityText = (status) => {
    switch (status) {
      case "completed":
        return "Available Now";
      case "ongoing":
        return "Coming Soon";
      case "upcoming":
        return "Pre-Order";
      default:
        return "Coming Soon";
    }
  };

  const getAvailabilityClass = (status) => {
    switch (status) {
      case "completed":
        return "availability-available";
      case "ongoing":
        return "availability-coming-soon";
      case "upcoming":
        return "availability-pre-order";
      default:
        return "availability-coming-soon";
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
      <div className="rn-portfolio template-card">
        <div className="inner">
          <div className="thumbnail">
            <Link href={`/portfolio/${templateSlug}`}>
              <Image
                src={item.image}
                alt={`${item.title} Template`}
                width={400}
                height={300}
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
            {/* Price overlay */}
            {price && (
              <div className="price-overlay">
                <span className="price">{price}</span>
              </div>
            )}
            {/* Availability badge */}
            <div
              className={`availability-badge ${getAvailabilityClass(status)}`}
            >
              {getAvailabilityText(status)}
            </div>
          </div>
          <div
            className="content"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "320px",
            }}
          >
            {/* Content section */}
            <div>
              {/* Category */}
              <div className="category-info">
                <div className="category-list">
                  <a href="javascript:void(0)">{item.category}</a>
                </div>
              </div>
              <h4 className="title">
                <Link href={`/portfolio/${templateSlug}`}>{item.title}</Link>
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
            <div style={{ marginTop: "auto" }}>
              {/* Progress Bar for Coming Soon Templates */}
              {(status === "ongoing" || status === "upcoming") &&
                progress > 0 && (
                  <div className="project-progress">
                    <div className="progress-label">
                      <span
                        style={{
                          color: "var(--color-heading-wv)",
                        }}
                      >
                        Development Progress
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

              {/* Demo Links and Purchase Actions for templates with price */}
              {price && (
                <div className="template-actions-row">
                  {/* Live Demo Link - only for completed templates */}
                  {status === "completed" && item.liveLink && (
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

                  {/* Purchase/Pre-Order Button */}
                  <Link
                    href="/contact?project=IoT%20Warehouse%20Temp%20Alert%20System&price=%2415&type=purchase"
                    className="purchase-btn"
                  >
                    {status === "completed" ? (
                      <>
                        <ShoppingCart size={16} />
                        Purchase Template
                      </>
                    ) : (
                      <>
                        <MessageCircle size={16} />
                        Pre-Order Template
                      </>
                    )}
                  </Link>
                </div>
              )}

              {/* Regular portfolio items (no price) - show both demo and code */}
              {status === "completed" && !price && (
                <div className="portfolio-links template-demo-links">
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
                      View Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
