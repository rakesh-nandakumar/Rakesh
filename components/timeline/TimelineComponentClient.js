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
    return <div className="text-center py-10">No timeline data available</div>;
  }

  return (
    <div
      className="rn-contact-area rn-section-gap section-separator"
      id="timeline"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="subtitle">My Professional Journey</span>
              <h2 className="title">Timeline</h2>
              <p
                className="description"
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
            </div>
          </div>
        </div>

        <div className="row mt--50 mt_md--40 mt_sm--40">
          <div className="col-lg-12">
            <div className="mt-8 animate-bounce text-center">
              <svg
                className="mx-auto text-blue-500 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

            <div className="relative">
              {/* Career Start Indicator */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 z-20">
                <div
                  className="text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  style={{ backgroundColor: "#ff014f" }}
                >
                  Career Start
                </div>
              </div>

              <TimelineProgress />

              <div className="mx-auto relative pt-20 pb-20">
                {processedData.map((item, index) => {
                  const isActive = item.active === true;
                  const position = index % 2 === 0 ? "left" : "right";

                  return (
                    <div
                      key={index}
                      className="relative mb-16 flex items-center"
                    >
                      <TimelineCard
                        item={item}
                        position={position}
                        isActive={isActive}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponentClient;
