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
  // Commented out theme switching functionality - keeping white mode as default
  // const [theme, setTheme] = useState("light"); // Start with light as default to match SSR
  // const [resolvedTheme, setResolvedTheme] = useState("light");
  const [theme, setTheme] = useState("light"); // Fixed to light mode
  const [resolvedTheme, setResolvedTheme] = useState("light"); // Fixed to light mode
  const [mounted, setMounted] = useState(false);
  const [isHeaderOverlayingHero, setIsHeaderOverlayingHero] = useState(false);
  // Function to get system theme preference - COMMENTED OUT (theme switching disabled)
  // const getSystemTheme = () => {
  //   if (typeof window !== "undefined") {
  //     return window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light";
  //   }
  //   return "light";
  // };  // Function to apply theme to body
  const applyTheme = useCallback(
    (themeToApply) => {
      if (typeof document !== "undefined") {
        const body = document.body;

        // Check if we're on the landing page (home page)
        const isLandingPage = window.location.pathname === "/";

        // Debug logging
        if (process.env.NODE_ENV === "development") {
          console.log("Applying theme:", {
            theme: themeToApply,
            isLandingPage,
            isHeaderOverlayingHero,
            currentPath: window.location.pathname,
          });
        }

        if (themeToApply === "light") {
          if (isLandingPage) {
            // Landing page: use header overlay logic (KEEPING THIS LOGIC AS REQUESTED)
            if (isHeaderOverlayingHero) {
              body.classList.add("white-version");
              if (process.env.NODE_ENV === "development") {
                console.log(
                  "Landing page: Adding white-version (header overlaying)"
                );
              }
            } else {
              body.classList.remove("white-version");
              if (process.env.NODE_ENV === "development") {
                console.log(
                  "Landing page: Removing white-version (header not overlaying)"
                );
              }
            }
          } else {
            // Other pages: always apply white-version for light mode (DEFAULT WHITE MODE)
            body.classList.add("white-version");
            if (process.env.NODE_ENV === "development") {
              console.log(
                "Other page: Adding white-version (default white mode)"
              );
            }
          }
        }
        // COMMENTED OUT - Dark mode functionality disabled
        // else if (themeToApply === "dark") {
        //   // Dark mode: work normally - remove white-version class
        //   body.classList.remove("white-version");
        // }
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

        // Add null checks for rect objects
        if (
          !heroRect ||
          !headerRect ||
          typeof heroRect.top === "undefined" ||
          typeof headerRect.bottom === "undefined"
        ) {
          return;
        }

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
  }, []); // Initialize theme on mount - MODIFIED for fixed light theme
  useEffect(() => {
    setMounted(true);

    // COMMENTED OUT - Theme switching functionality disabled
    // Get saved theme from localStorage or default to 'system'
    // const savedTheme = localStorage.getItem("theme") || "system";
    // setTheme(savedTheme);

    // COMMENTED OUT - Theme resolution disabled, keeping light theme
    // Determine resolved theme
    // let newResolvedTheme;
    // if (savedTheme === "system") {
    //   newResolvedTheme = getSystemTheme();
    // } else {
    //   newResolvedTheme = savedTheme;
    // }

    // Fixed to light theme
    const fixedTheme = "light";
    setTheme(fixedTheme);
    setResolvedTheme(fixedTheme);
    applyTheme(fixedTheme);

    // COMMENTED OUT - System theme change listener disabled
    // Listen for system theme changes
    // const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // const handleSystemThemeChange = (e) => {
    //   if (theme === "system") {
    //     const newSystemTheme = e.matches ? "dark" : "light";
    //     setResolvedTheme(newSystemTheme);
    //     applyTheme(newSystemTheme);
    //   }
    // };

    // mediaQuery.addEventListener("change", handleSystemThemeChange);
    // return () =>
    //   mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [/* theme,*/ applyTheme]); // Removed theme dependency since it's fixed  // Effect to handle header overlay detection and theme application
  useEffect(() => {
    if (!mounted) return;

    // Initial check - run immediately and after a short delay to ensure DOM is ready
    const runInitialCheck = () => {
      checkHeaderOverlay();
      // Force theme reapplication after navigation
      applyTheme(resolvedTheme);
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

    // Listen for navigation changes (page transitions)
    const handleLocationChange = () => {
      // Small delay to ensure DOM is updated after navigation
      setTimeout(() => {
        checkHeaderOverlay();
        applyTheme(resolvedTheme);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Listen for popstate (back/forward navigation)
    window.addEventListener("popstate", handleLocationChange);

    // Listen for pushstate/replacestate (programmatic navigation)
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

      // Restore original methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [mounted, checkHeaderOverlay, applyTheme, resolvedTheme]);
  // Effect to reapply theme when overlay state changes
  useEffect(() => {
    if (mounted) {
      applyTheme(resolvedTheme);
    }
  }, [isHeaderOverlayingHero, resolvedTheme, mounted, applyTheme]);

  // Effect to handle page navigation and force theme reapplication
  useEffect(() => {
    if (!mounted) return;

    // Track current pathname
    let currentPath = window.location.pathname;

    // Function to handle path changes
    const handlePathChange = () => {
      const newPath = window.location.pathname;
      if (newPath !== currentPath) {
        currentPath = newPath;

        // Force theme reapplication after navigation
        setTimeout(() => {
          // Reset header overlay state for new page
          if (newPath === "/") {
            // Landing page - check overlay
            checkHeaderOverlay();
          } else {
            // Other pages - no overlay
            setIsHeaderOverlayingHero(false);
          }

          // Apply theme for new page
          applyTheme(resolvedTheme);
        }, 100);
      }
    };

    // Check for path changes periodically (fallback for navigation detection)
    const pathCheckInterval = setInterval(handlePathChange, 100);

    return () => {
      clearInterval(pathCheckInterval);
    };
  }, [mounted, checkHeaderOverlay, applyTheme, resolvedTheme]);
  // Function to change theme - COMMENTED OUT (theme switching disabled)
  // const changeTheme = (newTheme) => {
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);

  //   let newResolvedTheme;
  //   if (newTheme === "system") {
  //     newResolvedTheme = getSystemTheme();
  //   } else {
  //     newResolvedTheme = newTheme;
  //   }

  //   setResolvedTheme(newResolvedTheme);
  //   applyTheme(newResolvedTheme);
  // };

  // Placeholder function for compatibility (does nothing)
  const changeTheme = (newTheme) => {
    // Theme switching disabled - function kept for compatibility
    console.log("Theme switching is disabled. Staying in light mode.");
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
