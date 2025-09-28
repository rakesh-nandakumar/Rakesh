"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_CONFIG } from "@/lib/config";

export function WebVitalsReporter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run after client-side hydration and in production
    if (!isClient || process.env.NODE_ENV !== "production") {
      return;
    }

    const reportWebVitals = (metric) => {
      // Log to console in development
      console.log(metric);

      // Send to Google Analytics if available
      if (typeof gtag !== "undefined") {
        gtag("event", metric.name, {
          event_category: "Web Vitals",
          value: Math.round(
            metric.name === "CLS" ? metric.value * 1000 : metric.value
          ),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Send to custom analytics endpoint
      fetch(ANALYTICS_CONFIG.webVitalsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      }).catch((error) => {
        // Silently fail - don't interrupt user experience
        console.warn("Failed to send web vitals:", error);
      });
    };

    // Dynamic import to avoid increasing bundle size
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
      })
      .catch(() => {
        // web-vitals not available, skip monitoring
      });
  }, [isClient]);

  return null; // This component doesn't render anything
}

export function PerformanceObserver() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side in production
    if (
      !isClient ||
      typeof window === "undefined" ||
      !window.PerformanceObserver ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    let longTaskObserver;
    let layoutShiftObserver;

    try {
      // Monitor long tasks (> 50ms)
      longTaskObserver = new window.PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn("Long task detected:", {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        });
      });

      // Monitor layout shifts
      layoutShiftObserver = new window.PerformanceObserver((list) => {
        let cumulativeScore = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            cumulativeScore += entry.value;
          }
        });

        if (cumulativeScore > 0.1) {
          console.warn("Cumulative Layout Shift detected:", cumulativeScore);
        }
      });

      longTaskObserver.observe({ entryTypes: ["longtask"] });
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      // Observer not supported, skip
      console.warn("PerformanceObserver not supported:", e.message);
    }

    return () => {
      try {
        if (longTaskObserver) longTaskObserver.disconnect();
        if (layoutShiftObserver) layoutShiftObserver.disconnect();
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, [isClient]);

  return null;
}

export function ResourceTimingMonitor() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;

    const checkResourceTiming = () => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const resources = performance.getEntriesByType("resource");

      // Log slow resources
      resources.forEach((resource) => {
        if (resource.duration > 1000) {
          // > 1 second
          console.warn("Slow resource:", {
            name: resource.name,
            duration: resource.duration,
            size: resource.transferSize,
          });
        }
      });

      // Log navigation timing
      if (navigation) {
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download: navigation.responseEnd - navigation.responseStart,
          domContentLoaded:
            navigation.domContentLoadedEventEnd - navigation.navigationStart,
          load: navigation.loadEventEnd - navigation.navigationStart,
        };

        console.log("Navigation timing:", metrics);
      }
    };

    // Check after page load
    if (document.readyState === "complete") {
      setTimeout(checkResourceTiming, 1000);
    } else {
      window.addEventListener("load", () => {
        setTimeout(checkResourceTiming, 1000);
      });
    }
  }, [isClient]);

  return null;
}

export default function WebVitalsMonitor() {
  return (
    <>
      <WebVitalsReporter />
      <PerformanceObserver />
      <ResourceTimingMonitor />
    </>
  );
}
