"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "react-feather";

const TimelineCard = ({ item, position, isPast }) => {
  const cardRef = useRef(null);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (position === "left") {
              entry.target.classList.add("animate-fade-in-right");
            } else {
              entry.target.classList.add("animate-fade-in-left");
            }
            if (isPast) {
              setTimeout(() => {
                entry.target.classList.add("animate-scale-up");
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
  }, [position, isPast]);

  const getCategoryIcon = () => {
    switch (item.category) {
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
    switch (item.category) {
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
      <div
        ref={cardRef}
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
        className="rn-portfolio"
      >
        <div className="inner">
          <div className="content">
            <div className="category-info">
              <div className="category-list">
                <a href="javascript:void(0)">{item.category}</a>
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
              <p className="short-description">{item.description}</p>
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
            {item.achievements && item.achievements.length > 0 && (
              <div className="achievements-section">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "12px",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAchievements(!showAchievements);
                    }}
                    className="view-achievements-btn"
                    style={{
                      background: "none",
                      border: "1px solid var(--color-primary)",
                      color: "var(--color-primary)",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      marginTop: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.3s ease",
                      backgroundColor: "transparent",
                      width: "auto",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "var(--color-primary)";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "var(--color-primary)";
                    }}
                  >
                    {showAchievements
                      ? "Hide Achievements"
                      : "View Achievements"}
                    {showAchievements ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </div>

                <div
                  className="achievements-content"
                  style={{
                    maxHeight: showAchievements ? "300px" : "0",
                    overflow: "hidden",
                    transition:
                      "max-height 0.4s ease-in-out, opacity 0.3s ease",
                    opacity: showAchievements ? 1 : 0,
                    marginTop: showAchievements ? "12px" : "0",
                  }}
                >
                  <div className="Achievements">
                    <h5>Key Achievements:</h5>
                    <ul className="achievement-list">
                      {item.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Links */}
            {item.links && item.links.length > 0 && (
              <div className="flex gap-2 mt-4">
                {item.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-sm hover:underline transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
