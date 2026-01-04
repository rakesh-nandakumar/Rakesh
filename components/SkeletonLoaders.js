"use client";

import React, { memo } from "react";

// Memoized skeleton components to prevent unnecessary re-renders

export const SkeletonPulse = memo(function SkeletonPulse({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 ${className}`}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
});

export const CardSkeleton = memo(function CardSkeleton({ showImage = true }) {
  return (
    <div className="rn-portfolio skeleton-card">
      <div className="inner">
        {showImage && (
          <div className="thumbnail">
            <SkeletonPulse className="w-full h-48 rounded-lg" />
          </div>
        )}
        <div className="content" style={{ padding: "20px" }}>
          <div className="category-info">
            <SkeletonPulse className="h-4 w-20 rounded" />
          </div>
          <SkeletonPulse className="h-6 w-3/4 rounded mt-3" />
          <SkeletonPulse className="h-4 w-full rounded mt-2" />
          <SkeletonPulse className="h-4 w-5/6 rounded mt-1" />
        </div>
      </div>
    </div>
  );
});

export const BlogCardSkeleton = memo(function BlogCardSkeleton() {
  return (
    <div className="rn-blog">
      <div className="inner">
        <div className="thumbnail">
          <SkeletonPulse className="w-full h-52 rounded-lg" />
        </div>
        <div className="content" style={{ padding: "20px" }}>
          <div className="category-info">
            <SkeletonPulse className="h-4 w-24 rounded" />
            <SkeletonPulse className="h-4 w-16 rounded ml-2" />
          </div>
          <SkeletonPulse className="h-6 w-4/5 rounded mt-3" />
          <SkeletonPulse className="h-4 w-full rounded mt-2" />
          <SkeletonPulse className="h-4 w-3/4 rounded mt-1" />
        </div>
      </div>
    </div>
  );
});

export const PortfolioGridSkeleton = memo(function PortfolioGridSkeleton({
  count = 6,
}) {
  return (
    <div className="row row--25">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="col-lg-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
        >
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
});

export const BlogGridSkeleton = memo(function BlogGridSkeleton({ count = 3 }) {
  return (
    <div className="row row--25">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="col-lg-4 col-md-6 col-12 mt--30 mt_md--30 mt_sm--30"
        >
          <BlogCardSkeleton />
        </div>
      ))}
    </div>
  );
});

export const HeroSkeleton = memo(function HeroSkeleton() {
  return (
    <div className="slider-area slider-style-1 variation-default slider-bg-image bg-banner1">
      <div className="container">
        <div className="row row--30 align-items-center">
          <div className="col-lg-7">
            <div className="inner text-start">
              <SkeletonPulse className="h-6 w-40 rounded mb-4" />
              <SkeletonPulse className="h-12 w-3/4 rounded mb-3" />
              <SkeletonPulse className="h-12 w-1/2 rounded mb-6" />
              <SkeletonPulse className="h-20 w-full rounded mb-6" />
              <div className="d-flex gap-3">
                <SkeletonPulse className="h-12 w-32 rounded-full" />
                <SkeletonPulse className="h-12 w-32 rounded-full" />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <SkeletonPulse className="w-full h-96 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
});

export const TimelineCardSkeleton = memo(function TimelineCardSkeleton() {
  return (
    <div className="timeline-card">
      <div className="rn-portfolio">
        <div className="inner">
          <div className="content" style={{ padding: "20px" }}>
            <div className="category-info">
              <SkeletonPulse className="h-4 w-24 rounded" />
              <SkeletonPulse className="h-4 w-32 rounded ml-auto" />
            </div>
            <SkeletonPulse className="h-6 w-3/4 rounded mt-3" />
            <SkeletonPulse className="h-4 w-full rounded mt-2" />
            <SkeletonPulse className="h-4 w-5/6 rounded mt-1" />
            <div className="d-flex gap-2 mt-3">
              <SkeletonPulse className="h-6 w-16 rounded-full" />
              <SkeletonPulse className="h-6 w-20 rounded-full" />
              <SkeletonPulse className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const SectionSkeleton = memo(function SectionSkeleton({
  height = "400px",
}) {
  return (
    <div
      className="skeleton-section"
      style={{
        minHeight: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <SkeletonPulse className="h-4 w-32 rounded mx-auto mb-3" />
          <SkeletonPulse className="h-8 w-64 rounded mx-auto" />
        </div>
        <PortfolioGridSkeleton count={3} />
      </div>
    </div>
  );
});

// CSS for shimmer animation - injected once
if (typeof document !== "undefined") {
  const styleId = "skeleton-shimmer-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .skeleton-card, .skeleton-section {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);
  }
}

const SkeletonLoaders = {
  SkeletonPulse,
  CardSkeleton,
  BlogCardSkeleton,
  PortfolioGridSkeleton,
  BlogGridSkeleton,
  HeroSkeleton,
  TimelineCardSkeleton,
  SectionSkeleton,
};

export default SkeletonLoaders;
