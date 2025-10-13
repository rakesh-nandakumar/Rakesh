import React from "react";
import { notFound } from "next/navigation";
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
import ClientPortfolioDetail from "./ClientPortfolioDetail";
import "./portfolio-detail.css";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = portfolioData.find((item) => {
    const projectSlug = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return projectSlug === slug;
  });

  if (!project) {
    return {
      title: "Project Not Found - Portfolio | Rakesh Nandakumar",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - Portfolio | Rakesh Nandakumar`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

// Generate static params for all portfolio items
export async function generateStaticParams() {
  return portfolioData.map((item) => ({
    slug: item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  }));
}

export default async function PortfolioDetail({ params }) {
  const { slug } = await params;

  // Find project by converting title to slug format
  const project = portfolioData.find((item) => {
    const projectSlug = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return projectSlug === slug;
  });

  if (!project) {
    notFound();
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
                        className="action-button primary z-50"
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
                    <ClientPortfolioDetail project={project} type="share" />
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
              <ClientPortfolioDetail project={project} type="image" />
            </div>

            {/* Project Details Sidebar */}
            <div className="project-sidebar">
              {project.price && (
                <div className="sidebar-section price-section">
                  <h3 className="section-title-2">Template Price</h3>
                  <div className="price-display">
                    <span className="price-value">{project.price}</span>
                    <span className="price-description">One-time purchase</span>
                  </div>
                  <div className="purchase-info">
                    <p>Full source code included</p>
                    <p>Documentation provided</p>
                    <p>Basic support included</p>
                  </div>
                  <div className="purchase-actions">
                    <Link
                      href={`/contact?project=${encodeURIComponent(
                        project.title
                      )}&price=${encodeURIComponent(
                        project.price
                      )}&type=purchase`}
                      className="purchase-button"
                    >
                      <Download size={16} />
                      Purchase Now
                    </Link>
                  </div>
                </div>
              )}
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
              {/* Render all keyFeatures from JSON (now includes previous highlights) */}
              {project.keyFeatures &&
                project.keyFeatures.length > 0 &&
                project.keyFeatures.map((kf, index) => (
                  <div key={`kf-${index}`} className="feature-card">
                    <div className="feature-icon">
                      <CheckCircle size={20} />
                    </div>
                    <div className="feature-content">
                      <h4 className="feature-title">{kf.feature}</h4>
                      <p className="feature-description">{kf.description}</p>
                    </div>
                  </div>
                ))}
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
      <HireMePopup showOnMount={true} />
    </>
  );
}
