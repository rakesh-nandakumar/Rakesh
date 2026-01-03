"use client";

import React from "react";
import TimelineCard from "./TimelineCard";
import TimelineProgress from "./TimelineProgress";

const TimelineComponentClient = ({ timelineData }) => {
  // Process timeline data
  const processedData = (() => {
    // Use timeline.timeline array from the data structure
    const timelineItems = timelineData?.timeline || [];

    // Sort data from oldest to newest
    return timelineItems.sort((a, b) => {
      // Handle different time formats
      const getYearFromItem = (item) => {
        if (item.time) {
          // Extract year from "September 2024 - Present" or "November 2023 - August 2024"
          const match = item.time.match(/(\d{4})/);
          return match ? parseInt(match[1]) : 0;
        }
        return parseInt(item.year || "0");
      };

      const yearA = getYearFromItem(a);
      const yearB = getYearFromItem(b);
      return yearA - yearB;
    });
  })();

  if (!processedData.length) {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        No timeline data available
      </div>
    );
  }

  return (
    <section
      className="rn-contact-area rn-section-gap section-separator"
      id="timeline"
      aria-labelledby="timeline-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <header className="section-title text-center">
              <span className="subtitle" aria-label="Experience summary">
                My Professional Journey
              </span>
              <h2 className="title" id="timeline-heading" itemProp="name">
                Timeline
              </h2>
              <p
                className="description"
                itemProp="description"
                style={{
                  marginTop: "15px",
                  fontSize: "16px",
                  color: "#6c757d",
                }}
              >
                An interactive timeline showcasing my career milestones,
                education, and achievements across the years. Scroll down to
                explore my professional path.
              </p>
            </header>
          </div>
        </div>

        <div className="row mt--50 mt_md--40 mt_sm--40">
          <div className="col-lg-12">
            <div className="mt-8 animate-bounce text-center" aria-hidden="true">
              <svg
                className="mx-auto text-blue-500 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            <div className="timeline-wrapper relative">
              {/* Career Start Indicator */}
              <div
                className="timeline-start-indicator absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 z-20"
                aria-label="Career timeline begins here"
              >
                <div
                  className="text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  style={{ backgroundColor: "#ff014f" }}
                >
                  Career Start
                </div>
              </div>

              <TimelineProgress />

              {/* 
                Timeline Responsive Layout CSS
                - Fixed-width card areas ensure consistent distance from center line
                - External margins scale on larger screens, internal spacing stays constant
                - Cards anchored to progress line at fixed offset
              */}
              <style jsx global>{`
                /* Timeline container with fixed max-width and centered */
                .timeline-container {
                  max-width: 900px;
                  margin: 0 auto;
                  position: relative;
                  padding-top: 80px;
                  padding-bottom: 80px;
                }
                
                /* Timeline item uses CSS Grid for precise alignment */
                .timeline-item-wrapper {
                  display: grid;
                  grid-template-columns: 1fr 32px 1fr;
                  gap: 0;
                  align-items: start;
                  margin-bottom: 48px;
                  position: relative;
                }
                
                /* Left card area - fixed padding from center */
                .timeline-card-left {
                  grid-column: 1;
                  padding-right: 24px;
                  display: flex;
                  justify-content: flex-end;
                }
                
                /* Right card area - fixed padding from center */
                .timeline-card-right {
                  grid-column: 3;
                  padding-left: 24px;
                  display: flex;
                  justify-content: flex-start;
                }
                
                /* Center dot container */
                .timeline-dot-container {
                  grid-column: 2;
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                  padding-top: 20px;
                }
                
                /* Timeline dot marker */
                .timeline-dot-marker {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #ff014f 0%, #ff6b9d 100%);
                  border: 3px solid white;
                  flex-shrink: 0;
                  z-index: 10;
                  position: relative;
                }
                
                .timeline-dot-marker.active {
                  box-shadow: 0 0 10px rgba(255, 1, 79, 0.5);
                }
                
                .timeline-dot-marker:not(.active) {
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                /* Card fixed max-width to prevent drift */
                .timeline-card {
                  width: 100%;
                  max-width: 380px;
                }
                
                /* Tablet breakpoint - slightly narrower cards */
                @media (max-width: 992px) {
                  .timeline-container {
                    max-width: 720px;
                  }
                  .timeline-card {
                    max-width: 320px;
                  }
                  .timeline-card-left {
                    padding-right: 16px;
                  }
                  .timeline-card-right {
                    padding-left: 16px;
                  }
                }
                
                /* Mobile breakpoint - single column layout */
                @media (max-width: 768px) {
                  .timeline-container {
                    max-width: 100%;
                    padding-left: 16px;
                    padding-right: 16px;
                  }
                  
                  .timeline-item-wrapper {
                    display: flex;
                    flex-direction: row;
                    gap: 0;
                    padding-left: 48px;
                    padding-right: 8px;
                  }
                  
                  .timeline-card-left,
                  .timeline-card-right {
                    padding: 0;
                    justify-content: flex-start;
                  }
                  
                  .timeline-dot-container {
                    position: absolute;
                    left: 16px;
                    top: 20px;
                  }
                  
                  .timeline-card {
                    max-width: 100%;
                    width: 100%;
                  }
                  
                  .timeline-start-indicator {
                    left: 24px !important;
                    transform: translateX(0) !important;
                  }
                }
                
                /* Small mobile */
                @media (max-width: 480px) {
                  .timeline-item-wrapper {
                    padding-left: 44px;
                    padding-right: 4px;
                    margin-bottom: 32px;
                  }
                  .timeline-dot-container {
                    left: 12px;
                  }
                }
              `}</style>

              <div className="timeline-container" role="list">
                {processedData.map((item, index) => {
                  const isActive = item.active === true;
                  const position = index % 2 === 0 ? "left" : "right";

                  return (
                    <article
                      key={item.id || index}
                      className="timeline-item-wrapper"
                      role="listitem"
                      itemScope
                      itemType="https://schema.org/Event"
                      itemProp="itemListElement"
                    >
                      {/* Left card area */}
                      <div className="timeline-card-left">
                        {position === "left" && (
                          <TimelineCard
                            item={item}
                            position={position}
                            isActive={isActive}
                          />
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="timeline-dot-container">
                        <div
                          className={`timeline-dot-marker ${isActive ? "active" : ""}`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Right card area */}
                      <div className="timeline-card-right">
                        {position === "right" && (
                          <TimelineCard
                            item={item}
                            position={position}
                            isActive={isActive}
                          />
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineComponentClient;
