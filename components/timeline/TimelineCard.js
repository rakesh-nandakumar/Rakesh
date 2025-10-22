"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "react-feather";

const TimelineCard = ({ item, position, isPast }) => {
  const cardRef = useRef(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target && entry.target.classList) {
            if (position === "left") {
              entry.target.classList.add("animate-fade-in-right");
            } else {
              entry.target.classList.add("animate-fade-in-left");
            }
            if (isPast) {
              const targetElement = entry.target;
              setTimeout(() => {
                if (
                  targetElement &&
                  targetElement.classList &&
                  targetElement.isConnected
                ) {
                  targetElement.classList.add("animate-scale-up");
                }
              }, 500);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = cardRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [position, isPast, showMoreInfo]);

  const getCategoryIcon = () => {
    // Map numeric categories: 1 = Work Experience, 2 = Education
    const categoryType =
      item.category === 1
        ? "work"
        : item.category === 2
        ? "education"
        : "other";

    switch (categoryType) {
      case "work":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2zm-8 0V8a2 2 0 00-2 2v6l-3-2 3-2z"
            />
          </svg>
        );
      case "education":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        );
      case "freelance":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        );
    }
  };

  const getCategoryColor = () => {
    // Map numeric categories: 1 = Work Experience, 2 = Education
    const categoryType =
      item.category === 1
        ? "work"
        : item.category === 2
        ? "education"
        : "other";

    switch (categoryType) {
      case "work":
        return "bg-blue-600 text-white";
      case "education":
        return "bg-purple-600 text-white";
      case "freelance":
        return "bg-orange-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getCategoryLabel = () => {
    // Map numeric categories: 1 = Work Experience, 2 = Education
    return item.category === 1
      ? "Work Experience"
      : item.category === 2
      ? "Education"
      : "Other";
  };

  const formatDate = () => {
    if (item.time) {
      return item.time;
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const startMonthName = item.month ? months[parseInt(item.month) - 1] : "";
    const startDate = startMonthName
      ? `${startMonthName} ${item.year}`
      : item.year;

    if (item.endYear) {
      const endMonthName = item.endMonth
        ? months[parseInt(item.endMonth) - 1]
        : "";
      const endDate = endMonthName
        ? `${endMonthName} ${item.endYear}`
        : item.endYear;
      return `${startDate} - ${endDate}`;
    } else if (item.endMonth === "present") {
      return `${startDate} - Present`;
    }

    return startDate;
  };

  const combineClasses = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="timeline-card">
      <div ref={cardRef} className="rn-portfolio">
        <div className="inner">
          <div className="content">
            <div className="category-info">
              <div className="category-list">
                <a href="javascript:void(0)">{getCategoryLabel()}</a>
              </div>
              {(item.time || item.year) && (
                <div className="meta">
                  <span className="d-flex gap-2">
                    <Calendar size={16} />
                    {formatDate()}
                  </span>
                </div>
              )}
            </div>
            <h4 className="title">
              <a href="javascript:void(0)">{item.title}</a>
            </h4>
            <div className="description w">
              <p className="short-description">{item["short-description"]}</p>
            </div>
            {item.technologies && item.technologies.length > 0 && (
              <div className="technologies">
                {item.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {item["long-description"] && (
              <div className="more-info-section">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "16px",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowMoreInfo(!showMoreInfo);
                    }}
                    className="more-info-btn"
                    style={{
                      background: "none",
                      border: "1px solid var(--color-primary)",
                      color: "var(--color-primary)",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      fontSize: "10px",
                      marginTop: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.3s ease",
                      backgroundColor: "transparent",
                      width: "auto",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--color-primary)";
                      e.target.style.color = "white";
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "var(--color-primary)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                    }}
                  >
                    {showMoreInfo ? "Less Info" : "More Info"}
                    {showMoreInfo ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </div>

                <div
                  className="more-info-content"
                  style={{
                    maxHeight: showMoreInfo ? "500px" : "0",
                    overflow: "hidden",
                    transition:
                      "max-height 0.5s ease-in-out, opacity 0.4s ease, padding 0.3s ease",
                    opacity: showMoreInfo ? 1 : 0,
                    padding: showMoreInfo ? "20px 16px 16px" : "0 16px",
                    marginTop: showMoreInfo ? "12px" : "0",
                    background: showMoreInfo
                      ? "rgba(var(--color-primary-rgb), 0.05)"
                      : "transparent",
                    borderRadius: showMoreInfo ? "12px" : "0",
                    border: showMoreInfo
                      ? "1px solid rgba(var(--color-primary-rgb), 0.1)"
                      : "none",
                  }}
                >
                  <div className="detailed-info">
                    <h5
                      style={{
                        color: "var(--color-text-heading, #adadadff)",
                        marginBottom: "12px",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Additional Information:
                    </h5>
                    <div className="description w">
                      <p className="short-description">
                        {item["long-description"]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Links */}
            {item.links && item.links.length > 0 && (
              <div className="links-section" style={{ marginTop: "16px" }}>
                <div className="flex flex-wrap gap-2">
                  {item.links.map((linkObj, index) => {
                    // Handle different link formats
                    const linkKey = Object.keys(linkObj)[0];
                    const linkUrl = linkObj[linkKey];

                    return (
                      <a
                        key={index}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-badge"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 8px",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "var(--color-primary)",
                          backgroundColor:
                            "rgba(var(--color-primary-rgb), 0.1)",
                          borderRadius: "12px",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          border:
                            "1px solid rgba(var(--color-primary-rgb), 0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "var(--color-primary)";
                          e.target.style.color = "white";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(var(--color-primary-rgb), 0.1)";
                          e.target.style.color = "var(--color-primary)";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        {linkKey === "portfolio" && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                        {linkKey === "linkedin" && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        )}
                        {linkKey === "github" && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        )}
                        {linkKey.charAt(0).toUpperCase() + linkKey.slice(1)}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
