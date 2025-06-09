"use client";

import { useEffect } from 'react';

export default function FeatherInit() {
  useEffect(() => {
    // Initialize Feather icons after component mounts
    const initFeather = () => {
      if (typeof window !== 'undefined' && window.feather) {
        window.feather.replace();
      }
    };

    // Check if feather is already loaded
    if (typeof window !== 'undefined' && window.feather) {
      initFeather();
    } else {
      // Wait for feather to load
      const checkFeather = setInterval(() => {
        if (typeof window !== 'undefined' && window.feather) {
          initFeather();
          clearInterval(checkFeather);
        }
      }, 100);

      // Cleanup interval after 5 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkFeather), 5000);
    }
  }, []);

  // Also reinitialize when route changes or component updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.feather) {
        window.feather.replace();
      }
    }, 100);

    return () => clearTimeout(timer);
  });

  return null; // This component doesn't render anything
}
