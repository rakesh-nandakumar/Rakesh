"use client";

import { useEffect } from "react";

export default function AsyncCSS() {
  useEffect(() => {
    // Dynamically load non-critical CSS
    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };

    // Load non-critical stylesheets
    loadCSS("/assets/css/vendor/slick.css");
    loadCSS("/assets/css/vendor/slick-theme.css");
    loadCSS("/assets/css/vendor/aos.css");
    loadCSS("/assets/css/plugins/feature.css");
  }, []);

  return null;
}
