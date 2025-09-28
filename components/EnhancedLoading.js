"use client";

import { useEffect, useState } from "react";

export function LoadingSpinner({ size = "medium", color = "primary" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const colorClasses = {
    primary: "border-blue-500",
    secondary: "border-gray-500",
    white: "border-white",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingSkeleton({
  lines = 3,
  className = "",
  showAvatar = false,
  showImage = false,
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {showAvatar && (
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      )}

      {showImage && (
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
      )}

      <div className="space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            {i === lines - 1 && (
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingCard({ showImage = true, showMeta = true }) {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow p-6">
      {showImage && (
        <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
      )}

      <div className="space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>

        {showMeta && (
          <div className="flex justify-between items-center pt-4">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PageLoadingIndicator() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}

export function ContentLoader({ type = "blog", count = 3, className = "" }) {
  const renderLoader = () => {
    switch (type) {
      case "blog":
        return Array.from({ length: count }, (_, i) => (
          <LoadingCard key={i} showImage={true} showMeta={true} />
        ));

      case "portfolio":
        return Array.from({ length: count }, (_, i) => (
          <LoadingCard key={i} showImage={true} showMeta={false} />
        ));

      case "list":
        return Array.from({ length: count }, (_, i) => (
          <LoadingSkeleton key={i} lines={2} showAvatar={true} />
        ));

      default:
        return <LoadingSkeleton lines={count} />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`} aria-label="Loading content">
      {renderLoader()}
    </div>
  );
}

export default function EnhancedLoading({
  type = "spinner",
  message = "Loading...",
  fullScreen = false,
  ...props
}) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {type === "spinner" && <LoadingSpinner {...props} />}
      {type === "skeleton" && <LoadingSkeleton {...props} />}
      {type === "card" && <LoadingCard {...props} />}
      {type === "content" && <ContentLoader {...props} />}

      {message && (
        <p className="text-sm text-gray-500 animate-pulse" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{content}</div>;
}
