"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    // Function to initialize AOS
    const initAOS = () => {
      if (typeof window !== "undefined" && window.AOS) {
        window.AOS.init({
          duration: 500,
          once: true,
          easing: "ease-in-out",
          offset: 50,
          delay: 0,
          disable: false,
          startEvent: "DOMContentLoaded",
        });

        // Refresh AOS to catch any dynamically added elements
        setTimeout(() => {
          window.AOS.refresh();
        }, 100);
      }
    };

    // Try to initialize immediately if AOS is already loaded
    if (window.AOS) {
      initAOS();
    } else {
      // Set up a listener for when AOS script loads
      const checkAOS = setInterval(() => {
        if (window.AOS) {
          initAOS();
          clearInterval(checkAOS);
        }
      }, 100);

      // Cleanup after 5 seconds to prevent infinite checking
      setTimeout(() => {
        clearInterval(checkAOS);
      }, 5000);

      return () => {
        clearInterval(checkAOS);
      };
    }
  }, []);

  return null;
}
