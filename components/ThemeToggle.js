// ENTIRE THEME TOGGLE COMPONENT COMMENTED OUT - THEME SWITCHING FUNCTIONALITY DISABLED
// To re-enable theme switching, uncomment all the code below

/*
"use client";

import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Monitor } from "react-feather";

export default function ThemeToggle() {
  const { theme, resolvedTheme, changeTheme, mounted } = useTheme();

  const themeOptions = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Monitor },
  ];

  const getCurrentIcon = () => {
    if (theme === "system") {
      return Monitor;
    }
    return theme === "dark" ? Moon : Sun;
  };

  const getCurrentLabel = () => {
    if (theme === "system") {
      return "System";
    }
    return theme === "dark" ? "Dark" : "Light";
  };

  const cycleTheme = () => {
    const currentIndex = themeOptions.findIndex(
      (option) => option.key === theme
    );
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    changeTheme(themeOptions[nextIndex].key);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="theme-toggle-wrapper">
        <button
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          title="Toggle theme"
          disabled
        >
          <Sun size={18} />
        </button>
        <style jsx>{`
          .theme-toggle-wrapper {
            position: relative;
            display: inline-block;
          }

          .theme-toggle-btn {
            background: transparent;
            border: 2px solid var(--color-primary, #ff6b6b);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--color-primary, #ff6b6b);
          }

          .theme-toggle-btn:hover {
            background: var(--color-primary, #ff6b6b);
            color: white;
            transform: scale(1.05);
          }
        `}</style>
      </div>
    );
  }

  const CurrentIcon = getCurrentIcon();
  return (
    <div className="theme-toggle-wrapper">
      <button
        className="theme-toggle-btn"
        onClick={cycleTheme}
        aria-label={`Switch to next theme (current: ${getCurrentLabel()})`}
        title={`Switch to next theme (current: ${getCurrentLabel()})`}
      >
        <CurrentIcon size={18} />
      </button>
      <style jsx>{`
        .theme-toggle-wrapper {
          position: relative;
          display: inline-block;
        }

        .theme-toggle-btn {
          background: transparent;
          border: 2px solid var(--color-primary, #ff6b6b);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--color-primary, #ff6b6b);
        }

        .theme-toggle-btn:hover {          background: var(--color-primary, #ff6b6b);
          color: white;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
*/

// Placeholder export to prevent import errors
export default function ThemeToggle() {
  return null;
}
