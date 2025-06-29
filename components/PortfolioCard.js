import { ExternalLink, GitHub, ArrowUpRight } from "react-feather";

export default function PortfolioCard({ item, index }) {
  // Default status to 'upcoming' if not specified
  const status = item.status || "upcoming";
  const progress = item.progress || 0;

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
            <a href="javascript:void(0)">
              <img src={item.image} alt="Personal Portfolio Images" />
            </a>
          </div>
          <div
            className="content"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* Status Badge */}
            <div className="category-info">
              <div className="category-list">
                <a href="javascript:void(0)">{item.category}</a>
              </div>
            </div>
            <h4 className="title">
              <a href="javascript:void(0)">
                {item.title}
                {/* <i className="feather-arrow-up-right" /> */}
              </a>
            </h4>
            <div className="technologies">
              {item.technologies &&
                item.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">
                    {tech}
                  </span>
                ))}
            </div>
            <div className="description" style={{ flex: "1" }}>
              <p className="short-description">{item.shortDescription}</p>
            </div>
            {/* Progress Bar for Ongoing Projects */}
            <div className="" style={{ marginTop: "auto" }}>
              {status === "ongoing" && progress > 0 && (
                <div className="project-progress">
                  <div className="progress-label">
                    <span>Project Progress</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
