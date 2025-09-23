"use client";

import React, { useEffect, useRef, useState } from "react";

const TimelineProgress = () => {
  const progressRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Find the timeline container element - updated selector for new structure
    timelineContainerRef.current =
      progressRef.current?.closest(".rn-contact-area");

    const handleScroll = () => {
      if (!progressRef.current || !timelineContainerRef.current) return;

      const timelineRect = timelineContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Calculate how much of the timeline section has been scrolled past
      const timelineTop = timelineRect.top + scrollTop;
      const timelineHeight = timelineRect.height;

      // Calculate the scroll position relative to the timeline
      const scrollPastTimeline = Math.max(0, scrollTop - timelineTop);

      // Calculate progress as a percentage of timeline scrolled
      // Use a more responsive calculation for mobile
      const isMobile = window.innerWidth < 640;
      const progressMultiplier = isMobile ? 1.2 : 1;

      let timelineProgress =
        (scrollPastTimeline / (timelineHeight - windowHeight * 0.5)) *
        100 *
        progressMultiplier;

      // For mobile, make the progress more responsive to card positions
      if (isMobile) {
        // Add extra responsiveness for mobile - progress fills faster
        timelineProgress = Math.min(100, timelineProgress * 1.1);
      }

      // Clamp the progress between 0 and 100
      const clampedProgress = Math.min(100, Math.max(0, timelineProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    // Call once to initialize
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
      {/* Stylized timeline line with gradient */}
      <div
        className="w-2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full h-full shadow-[0_0_15px_rgba(255,1,79,0.2)] sm:w-2"
        ref={progressRef}
      >
        {/* Progress overlay with gradient */}
        <div
          className="w-full rounded-full transition-all duration-100 ease-out"
          style={{
            background: "linear-gradient(135deg, #ff014f 0%, #ff6b9d 100%)",
            boxShadow: "0 0 15px rgba(255, 1, 79, 0.6)",
            height: `${progress}%`,
          }}
        >
          {/* Animated dots/sparks effect - enhanced for mobile */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full animate-ping opacity-75 sm:w-3 sm:h-3"
            style={{
              backgroundColor: "#ff014f",
              transform: `translateX(-50%) translateY(${Math.max(
                0,
                progress - 5
              )}%)`,
            }}
          ></div>

          {/* Additional pulse effect for mobile */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full animate-pulse opacity-50 block sm:hidden"
            style={{
              backgroundColor: "#ff6b9d",
              transform: `translateX(-50%) translateY(${Math.max(
                0,
                progress - 3
              )}%)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineProgress;
