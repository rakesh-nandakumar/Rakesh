"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to detect if the header is overlaying the hero section
 * Returns true when header needs lighter text for visibility
 */
export function useHeaderOverlay() {
  const [isOverlaying, setIsOverlaying] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check if we're on the landing page
    const isLandingPage = window.location.pathname === "/";

    if (!isLandingPage) {
      // Not on landing page, header is never overlaying
      setIsOverlaying(false);
      return;
    }

    const checkOverlay = () => {
      const heroSection = document.getElementById("heroSection");
      const header = document.querySelector("header");

      if (!heroSection || !header) {
        setIsOverlaying(false);
        return;
      }

      const heroRect = heroSection.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();

      if (!heroRect || !headerRect) {
        setIsOverlaying(false);
        return;
      }

      // Check if header is fixed/sticky
      const headerStyle = window.getComputedStyle(header);
      const isHeaderFixed =
        headerStyle.position === "fixed" || headerStyle.position === "sticky";

      // Check if header is positioned over hero section
      const isPositionedOverHero =
        isHeaderFixed && heroRect.top <= headerRect.bottom;

      // Check if we're at the top of the page
      const isAtTopOfPage = window.scrollY === 0;

      // Header is overlaying if it's fixed/sticky AND either positioned over hero OR at top of page
      const overlaying =
        isHeaderFixed && (isPositionedOverHero || isAtTopOfPage);

      setIsOverlaying(overlaying);
    };

    // Initial check
    checkOverlay();

    // Run again after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(checkOverlay, 100);

    // Listen for scroll and resize events
    const handleScroll = () => checkOverlay();
    const handleResize = () => checkOverlay();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Listen for navigation changes
    const handleLocationChange = () => {
      setTimeout(() => {
        const newIsLandingPage = window.location.pathname === "/";
        if (!newIsLandingPage) {
          setIsOverlaying(false);
        } else {
          checkOverlay();
        }
      }, 50);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Override pushState and replaceState to detect navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      handleLocationChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      handleLocationChange();
    };

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return isOverlaying;
}
