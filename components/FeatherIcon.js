"use client";

import { useState, useEffect } from "react";
import * as FeatherIcons from "react-feather";

export default function FeatherIcon({
  name,
  size = 24,
  className = "",
  ...props
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-block",
        }}
        {...props}
      />
    );
  }

  // Get the icon component from react-feather
  const IconComponent = FeatherIcons[toPascalCase(name)];

  if (!IconComponent) {
    console.warn(`FeatherIcon: Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={className} {...props} />;
}

// Helper function to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
