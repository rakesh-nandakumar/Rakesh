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

      // Calculate how much of the timeline is visible
      const visibleStart = Math.max(0, timelineRect.top * -1);
      const visibleEnd = Math.min(
        timelineRect.height,
        windowHeight - Math.max(0, timelineRect.top)
      );

      // Calculate progress based on the visible portion of the timeline
      const timelineProgress =
        (visibleStart / (timelineRect.height - windowHeight)) * 100;

      // Clamp the progress between 0 and 100
      const clampedProgress = Math.min(100, Math.max(0, timelineProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to initialize
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
      {/* Stylized timeline line with gradient */}
      <div
        className="w-2 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full h-full shadow-[0_0_15px_rgba(255,1,79,0.2)]"
        ref={progressRef}
      >
        {/* Progress overlay with gradient */}
        <div
          className="w-full rounded-full"
          style={{
            background: "linear-gradient(135deg, #ff014f 0%, #ff6b9d 100%)",
            boxShadow: "0 0 15px rgba(255, 1, 79, 0.6)",
            height: `${progress}%`,
            transition: "height 50ms linear",
          }}
        >
          {/* Animated dots/sparks effect */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full animate-ping opacity-75"
            style={{ backgroundColor: "#ff014f" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineProgress;
