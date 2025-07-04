"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import portfolioData from "@/data/portfolio.json";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import {
  ExternalLink,
  GitHub,
  Calendar,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowLeft,
  Share2,
  Download,
  Star,
  Eye,
  Code,
  Globe,
  Briefcase,
  UserCheck,
  Tool,
} from "react-feather";
import Link from "next/link";
import PortfolioCard from "@/components/PortfolioCard";
import HireMePopup from "@/components/HireMePopup";

export default function PortfolioDetail() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const slug = params.slug;

    // Find project by converting title to slug format
    const foundProject = portfolioData.find((item) => {
      const projectSlug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return projectSlug === slug;
    });

    setProject(foundProject);
    setLoading(false);

    if (foundProject) {
      document.title = `${foundProject.title} - Portfolio | Rakesh Nandakumar`;
    }
  }, [params.slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="portfolio-detail-container">
        <div className="loading-wrapper">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="loading-text">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="portfolio-detail-container">
        <div className="not-found-wrapper">
          <div className="not-found-content">
            <div className="not-found-icon">🔍</div>
            <h2 className="not-found-title">Project Not Found</h2>
            <p className="not-found-description">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/portfolio" className="back-button">
              <ArrowLeft size={18} />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "ongoing":
        return {
          color: "status-ongoing",
          icon: <Clock size={14} />,
          label: "In Progress",
        };
      case "completed":
        return {
          color: "status-completed",
          icon: <CheckCircle size={14} />,
          label: "Completed",
        };
      case "upcoming":
        return {
          color: "status-upcoming",
          icon: <Calendar size={14} />,
          label: "Upcoming",
        };
      default:
        return {
          color: "status-upcoming",
          icon: <Calendar size={14} />,
          label: "Planned",
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <>
      <div className="portfolio-detail-container rn-section-gap">
        {/* Hero Section */}
        <div className="">
          <div className="hero-content">
            <div className="row">
              <div className="col-lg-12">
                <div
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={100}
                  data-aos-once="true"
                  className="section-title text-center"
                >
                  <span className="subtitle">{project.category}</span>
                  <h2 className="title">{project.title}</h2>
                  <p className="description mb-5">{project.shortDescription}</p>
                </div>
                <br />
                <br />
                <div
                  className="project-hero-content text-center"
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={200}
                  data-aos-once="true"
                >
                  <div className="hero-actions">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button primary"
                      >
                        <Globe size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button secondary"
                      >
                        <GitHub size={16} />
                        View Code
                      </a>
                    )}
                    <button
                      onClick={handleShare}
                      className="action-button tertiary"
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-grid">
            {/* Project Image */}
            <div className="project-media">
              <div className="image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`project-image ${imageLoaded ? "loaded" : ""}`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="image-placeholder">
                    <div className="placeholder-spinner"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details Sidebar */}
            <div className="project-sidebar">
              {/* Progress for Ongoing Projects */}
              {project.status === "ongoing" && project.progress > 0 && (
                <div className="sidebar-section progress-section">
                  <h3 className="section-title-2">Project Progress</h3>
                  <div className="progress-container">
                    <div className="progress-info">
                      <span className="progress-label">Completion</span>
                      <span className="progress-value">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="sidebar-section tech-section">
                <h3 className="section-title-2">
                  <Code size={18} />
                  Technologies
                </h3>
                <div className="tech-grid">
                  {project.technologies &&
                    project.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="sidebar-section info-section">
                <h3 className="section-title-2">Project Details</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Category</span>
                    <span className="info-value">{project.category}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status</span>
                    <span className="info-value">{statusConfig.label}</span>
                  </div>
                  {project.type && (
                    <div className="info-item">
                      <span className="info-label">Type</span>
                      <span
                        className={`info-value type-badge type-${project.type}`}
                      >
                        {project.type === "work" && <Briefcase size={14} />}
                        {project.type === "freelance" && (
                          <UserCheck size={14} />
                        )}
                        {project.type === "personal" && <Tool size={14} />}
                        {project.type.charAt(0).toUpperCase() +
                          project.type.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="description-section">
            <div className="section-header">
              <h2 className="section-main-title">About This Project</h2>
              <div className="section-divider"></div>
            </div>
            <div className="description-content">
              <p className="description-text">
                {project.longDescription || project.shortDescription}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="features-section">
            <div className="section-header">
              <h2 className="section-main-title">Key Features & Highlights</h2>
              <div className="section-divider"></div>
            </div>
            <div className="features-grid">
              {project.technologies &&
                project.technologies.map((tech, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">
                      <CheckCircle size={20} />
                    </div>
                    <div className="feature-content">
                      <h4 className="feature-title">Built with {tech}</h4>
                      <p className="feature-description">
                        Leveraging {tech} for optimal performance and
                        functionality
                      </p>
                    </div>
                  </div>
                ))}

              {project.status === "completed" && (
                <div className="feature-card">
                  <div className="feature-icon success">
                    <CheckCircle size={20} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Production Ready</h4>
                    <p className="feature-description">
                      Fully tested and deployed for live usage
                    </p>
                  </div>
                </div>
              )}

              {project.featured && (
                <div className="feature-card">
                  <div className="feature-icon featured">
                    <Award size={20} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">Featured Project</h4>
                    <p className="feature-description">
                      Highlighted work showcasing advanced skills and innovation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Projects */}
          {portfolioData.filter(
            (item) =>
              item.category === project.category && item.title !== project.title
          ).length > 0 && (
            <div className="related-section">
              <div className="section-header">
                <h2 className="section-main-title">Related Projects</h2>
                <div className="section-divider"></div>
              </div>
              <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
                {portfolioData
                  .filter(
                    (item) =>
                      item.category === project.category &&
                      item.title !== project.title
                  )
                  .slice(0, 3)
                  .map((relatedProject, index) => (
                    <PortfolioCard
                      key={index}
                      item={relatedProject}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .portfolio-detail-container {
          min-height: 100vh;
          background: var(--color-white);
          color: var(--color-heading-wv);
        }

        /* Loading States */
        .loading-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-white);
        }

        .loading-spinner {
          text-align: center;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--color-lightest);
          border-top: 3px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        .loading-text {
          color: var(--color-body-white);
          font-size: 16px;
          margin: 0;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Not Found */
        .not-found-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .not-found-content {
          text-align: center;
          max-width: 500px;
        }

        .not-found-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .not-found-title {
          font-size: 2.5rem;
          color: var(--color-heading-wv);
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .not-found-description {
          color: var(--color-body-white);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 12px 24px;
          background: var(--gradient-red-hover);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-white-3);
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-white-3), 0 5px 15px rgba(255, 1, 79, 0.3);
          color: white;
          text-decoration: none;
        }

        /* Hero Section */
        .hero-section {
          background: var(--gradient-box-w);
          padding: 2rem 1rem 3rem;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 2rem;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 30% 20%,
            rgba(255, 1, 79, 0.05) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .breadcrumb-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 14px;
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-body-white);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb-link:hover {
          color: var(--color-primary);
          text-decoration: none;
        }

        .breadcrumb-separator {
          color: var(--color-body-white);
        }

        .breadcrumb-current {
          color: var(--color-heading-wv);
          font-weight: 500;
        }

        /* Grid System */
        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }

        .col-lg-12 {
          flex: 0 0 100%;
          max-width: 100%;
          padding: 0 15px;
        }

        /* Section Title */
        .section-title-2 {
          margin-bottom: 2rem;
        }

        .section-title-2.text-center {
          text-align: center;
        }

        /* Project Hero Content */
        .project-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .project-hero-content.text-center {
          text-align: center;
        }

        .project-excerpt {
          font-size: 1.25rem;
          color: var(--color-body-white);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        /* Project Meta */
        .project-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-label {
          font-size: 12px;
          color: var(--color-body-white);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .meta-value {
          font-size: 14px;
          color: var(--color-heading-wv);
          font-weight: 600;
        }

        .meta-value.status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--color-white);
          box-shadow: var(--shadow-white-3);
        }

        .status-badge.status-ongoing {
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
          border: 1px solid #ffc107;
        }

        .status-badge.status-completed {
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
          border: 1px solid #28a745;
        }

        .status-badge.status-upcoming {
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
          border: 1px solid #6c757d;
        }

        .featured-meta {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--color-primary);
        }

        .hero-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
          justify-items: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 13px;
          white-space: nowrap;
          width: 100%;
          min-width: 120px;
        }

        .action-button.primary {
          background: var(--gradient-red-hover);
          color: white;
          box-shadow: var(--shadow-white-3);
        }

        .action-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-white-3), 0 5px 15px rgba(255, 1, 79, 0.3);
          text-decoration: none;
          color: white;
        }

        .action-button.secondary {
          background: var(--color-white);
          color: var(--color-heading-wv);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-white-3);
        }

        .action-button.secondary:hover {
          background: var(--color-lightest);
          color: var(--color-heading-wv);
          transform: translateY(-2px);
          text-decoration: none;
          box-shadow: var(--shadow-white-3), 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .action-button.tertiary {
          background: transparent;
          color: var(--color-body-white);
          border: 1px solid var(--color-border);
        }

        .action-button.tertiary:hover {
          background: var(--color-lightest);
          color: var(--color-heading-wv);
          transform: translateY(-2px);
          border-color: var(--color-lighter);
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem 0;
          position: relative;
          z-index: 1;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
          margin-top: 2rem;
          padding-top: 2rem;
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Project Media */
        .project-media {
          position: relative;
        }

        .image-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-white-3);
          background: var(--color-lightest);
          border: 1px solid var(--color-border);
        }

        .project-image {
          width: 100%;
          height: auto;
          display: block;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .project-image.loaded {
          opacity: 1;
        }

        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-lightest);
          min-height: 300px;
        }

        .placeholder-spinner {
          width: 30px;
          height: 30px;
          border: 2px solid var(--color-lighter);
          border-top: 2px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Sidebar */
        .project-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-section {
          background: var(--color-white);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: var(--shadow-white-3);
          border: 1px solid var(--color-border);
        }

        .section-title-2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--color-heading-wv);
        }

        /* Progress Section */
        .progress-container {
          margin-top: 1rem;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .progress-label {
          color: var(--color-body-white);
          font-size: 14px;
        }

        .progress-value {
          color: var(--color-heading-wv);
          font-weight: 600;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: var(--color-lightest);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--gradient-red-hover);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        /* Tech Grid */
        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-badge {
          background: var(--color-lightest);
          color: var(--color-heading-wv);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid var(--color-border);
        }

        /* Info Grid */
        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .info-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .info-label {
          color: var(--color-body-white);
          font-size: 14px;
        }

        .info-value {
          color: var(--color-heading-wv);
          font-weight: 500;
          font-size: 14px;
        }

        .featured-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--color-primary);
        }

        .type-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .type-badge.type-work {
          background: rgba(0, 123, 255, 0.1);
          color: #007bff;
          border: 1px solid rgba(0, 123, 255, 0.2);
        }

        .type-badge.type-freelance {
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
          border: 1px solid rgba(40, 167, 69, 0.2);
        }

        .type-badge.type-personal {
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
          border: 1px solid rgba(255, 193, 7, 0.2);
        }

        /* Content Sections */
        .description-section,
        .features-section,
        .related-section {
          margin-bottom: 4rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-heading-wv);
          margin-bottom: 1rem;
        }

        .section-divider {
          width: 60px;
          height: 3px;
          background: var(--gradient-red-hover);
          margin: 0 auto;
          border-radius: 2px;
        }

        .description-content {
          max-width: 1000px;
          margin: 0 auto;
          background: var(--color-white);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: var(--shadow-white-3);
          border: 1px solid var(--color-border);
        }

        .description-text {
          font-size: 1.5rem;
          line-height: 1.8;
          color: var(--color-body-white);
          margin: 0;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--color-white);
          border-radius: 12px;
          box-shadow: var(--shadow-white-3);
          border: 1px solid var(--color-border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-white-3), 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: var(--color-lightest);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          border: 1px solid var(--color-border);
        }

        .feature-icon.success {
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .feature-icon.featured {
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-heading-wv);
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: 1.1rem;
          color: var(--color-body-white);
          line-height: 1.5;
          margin: 0;
        }

        /* Related Grid */
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-actions {
            gap: 0.5rem;
            max-width: 500px;
          }

          .action-button {
            padding: 8px 14px;
            font-size: 12px;
            min-width: 100px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 1.5rem 1rem 2rem;
            margin-bottom: 1rem;
          }

          .main-content {
            padding: 1rem 1rem 0;
          }

          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 1rem;
            padding-top: 1rem;
          }

          .section-title-2 .title {
            font-size: 2.5rem;
          }

          .project-excerpt {
            font-size: 1.1rem;
          }

          .project-meta {
            flex-direction: column;
            gap: 1rem;
          }

          .meta-item {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            max-width: 200px;
          }

          .hero-actions {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            max-width: 400px;
          }

          .action-button {
            padding: 10px 8px;
            font-size: 12px;
            min-width: 80px;
          }

          .section-main-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .sidebar-section {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .project-meta {
            gap: 0.5rem;
          }

          .meta-item {
            max-width: 150px;
          }

          .description-content {
            padding: 1.5rem;
          }

          .feature-card {
            padding: 1rem;
          }
        }
      `}</style>
      <HireMePopup showOnMount={true} />
    </>
  );
}
