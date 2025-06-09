"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // Start with light as default to match SSR
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [isHeaderOverlayingHero, setIsHeaderOverlayingHero] = useState(false);

  // Function to get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }; // Function to apply theme to body
  const applyTheme = useCallback(
    (themeToApply) => {
      if (typeof document !== "undefined") {
        const body = document.body;

        // Check if we're on the landing page (home page)
        const isLandingPage = window.location.pathname === "/";

        if (themeToApply === "light") {
          if (isLandingPage) {
            // Landing page: use header overlay logic
            if (isHeaderOverlayingHero) {
              body.classList.add("white-version");
            } else {
              body.classList.remove("white-version");
            }
          } else {
            // Other pages: always apply white-version for light mode
            body.classList.add("white-version");
          }
        } else if (themeToApply === "dark") {
          // Dark mode: work normally - remove white-version class
          body.classList.remove("white-version");
        }
      }
    },
    [isHeaderOverlayingHero]
  );
  // Function to check if header is overlaying hero section
  const checkHeaderOverlay = useCallback(() => {
    if (typeof window !== "undefined") {
      const heroSection = document.getElementById("heroSection");
      const header = document.querySelector("header");

      if (heroSection && header) {
        const heroRect = heroSection.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();

        // Check if header is fixed/sticky and overlapping hero section
        const headerStyle = window.getComputedStyle(header);
        const isHeaderFixed =
          headerStyle.position === "fixed" || headerStyle.position === "sticky"; // Header is overlaying if it's fixed/sticky and positioned over the hero section
        // This includes when header is at top of page (not scrolled) and when it has any opacity
        const isPositionedOverHero =
          isHeaderFixed && heroRect.top <= headerRect.bottom;

        // Additional check: if we're at the top of the page and header is fixed/sticky,
        // it's definitely overlaying the hero section
        const isAtTopOfPage = window.scrollY === 0;
        const isOverlaying =
          isHeaderFixed && (isPositionedOverHero || isAtTopOfPage);

        // Debug log (can be removed later)
        if (process.env.NODE_ENV === "development") {
          console.log("Header overlay check:", {
            isHeaderFixed,
            isPositionedOverHero,
            isAtTopOfPage,
            isOverlaying,
            scrollY: window.scrollY,
            heroTop: heroRect.top,
            headerBottom: headerRect.bottom,
          });
        }

        setIsHeaderOverlayingHero(isOverlaying);
        return isOverlaying;
      }
    }
    return false;
  }, []); // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Get saved theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);

    // Determine resolved theme
    let newResolvedTheme;
    if (savedTheme === "system") {
      newResolvedTheme = getSystemTheme();
    } else {
      newResolvedTheme = savedTheme;
    }

    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        const newSystemTheme = e.matches ? "dark" : "light";
        setResolvedTheme(newSystemTheme);
        applyTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme, applyTheme]);
  // Effect to handle header overlay detection and theme application
  useEffect(() => {
    if (!mounted) return;

    // Initial check - run immediately and after a short delay to ensure DOM is ready
    const runInitialCheck = () => {
      checkHeaderOverlay();
    };

    runInitialCheck();
    // Run again after a brief delay to ensure all elements are rendered
    const timeoutId = setTimeout(runInitialCheck, 100);

    // Listen for scroll events to detect overlay changes
    const handleScroll = () => {
      checkHeaderOverlay();
    };

    // Listen for resize events in case layout changes
    const handleResize = () => {
      checkHeaderOverlay();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, checkHeaderOverlay]);

  // Effect to reapply theme when overlay state changes
  useEffect(() => {
    if (mounted) {
      applyTheme(resolvedTheme);
    }
  }, [isHeaderOverlayingHero, resolvedTheme, mounted, applyTheme]);

  // Function to change theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    let newResolvedTheme;
    if (newTheme === "system") {
      newResolvedTheme = getSystemTheme();
    } else {
      newResolvedTheme = newTheme;
    }

    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  };
  const value = {
    theme,
    resolvedTheme,
    changeTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
