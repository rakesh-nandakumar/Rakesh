import { ExternalLink, GitHub, ArrowUpRight } from "react-feather";

export default function PortfolioCard({ item, index }) {
  return (
    <div
      key={item.id}
      data-aos="fade-up"
      data-aos-delay={100 + index * 100}
      data-aos-once="true"
      className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
    >
      <div
        className="rn-portfolio"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        <div className="inner">
          <div className="thumbnail">
            <a href="javascript:void(0)">
              <img src={item.image} alt="Personal Portfolio Images" />
            </a>
          </div>
          <div className="content">
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
            <div className="description">
              <p className="short-description">{item.shortDescription}</p>
            </div>
            {(item.liveLink || item.githubLink) && (
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
  );
}
