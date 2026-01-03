"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const TimelineProgress = () => {
  const progressRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const rafRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    // Cancel any pending RAF to avoid stacking
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!progressRef.current || !timelineContainerRef.current) return;

      const timelineRect = timelineContainerRef.current.getBoundingClientRect();
      if (!timelineRect || typeof timelineRect.top === "undefined") return;

      const windowHeight = window.innerHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Calculate how much of the timeline section has been scrolled past
      const timelineTop = timelineRect.top + scrollTop;
      const timelineHeight = timelineRect.height;

      // Calculate the scroll position relative to the timeline
      const scrollPastTimeline = Math.max(0, scrollTop - timelineTop);

      // Calculate progress as a percentage of timeline scrolled
      const isMobile = window.innerWidth < 640;
      const progressMultiplier = isMobile ? 1.2 : 1;

      let timelineProgress =
        (scrollPastTimeline / (timelineHeight - windowHeight * 0.5)) *
        100 *
        progressMultiplier;

      // For mobile, make the progress more responsive to card positions
      if (isMobile) {
        timelineProgress = Math.min(100, timelineProgress * 1.1);
      }

      // Clamp the progress between 0 and 100
      const clampedProgress = Math.min(100, Math.max(0, timelineProgress));
      setProgress(clampedProgress);
    });
  }, []);

  useEffect(() => {
    // Find the timeline container element
    timelineContainerRef.current =
      progressRef.current?.closest(".rn-contact-area");

    // Use passive listeners for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initialize on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <style jsx global>{`
        /* Timeline progress line positioned in center column of grid */
        .timeline-progress-container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          display: flex;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        .timeline-progress-track {
          width: 8px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(200, 200, 200, 0.3) 0%,
            rgba(180, 180, 180, 0.4) 50%,
            rgba(200, 200, 200, 0.3) 100%
          );
          border-radius: 4px;
          position: relative;
          box-shadow: 0 0 15px rgba(255, 1, 79, 0.1);
        }

        .white-version .timeline-progress-track {
          background: linear-gradient(
            to bottom,
            rgba(220, 220, 220, 0.5) 0%,
            rgba(200, 200, 200, 0.6) 50%,
            rgba(220, 220, 220, 0.5) 100%
          );
        }

        .timeline-progress-fill {
          width: 100%;
          border-radius: 4px;
          background: linear-gradient(135deg, #ff014f 0%, #ff6b9d 100%);
          box-shadow: 0 0 15px rgba(255, 1, 79, 0.6);
          transition: height 100ms ease-out;
          will-change: height;
        }

        .timeline-progress-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ff014f;
          opacity: 0.75;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%,
          100% {
            transform: translateX(-50%) scale(2);
            opacity: 0;
          }
        }

        /* Mobile: shift progress line to left */
        @media (max-width: 768px) {
          .timeline-progress-container {
            left: 20px;
            transform: translateX(0);
          }
        }

        @media (max-width: 480px) {
          .timeline-progress-container {
            left: 16px;
          }
        }
      `}</style>

      <div
        className="timeline-progress-container"
        ref={progressRef}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Timeline scroll progress"
      >
        <div className="timeline-progress-track">
          <div
            className="timeline-progress-fill"
            style={{ height: `${progress}%` }}
          >
            {/* Animated glow effect at the progress tip */}
            {progress > 0 && progress < 100 && (
              <div
                className="timeline-progress-glow"
                style={{
                  top: `calc(${progress}% - 6px)`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineProgress;
