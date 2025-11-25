/**
 * Skeleton Loading Components
 * Shimmer effect placeholders for smooth loading experience
 */

"use client";

import React from "react";

// Base shimmer animation
const shimmerAnimation = {
  animation: "shimmer 2s infinite",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
};

// Dark mode shimmer
const shimmerDark = {
  animation: "shimmer 2s infinite",
  background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)",
  backgroundSize: "200% 100%",
};

/**
 * Base Skeleton Component
 */
export function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
  dark = false,
}) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...(dark ? shimmerDark : shimmerAnimation),
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton for Blog Card
 */
export function BlogCardSkeleton() {
  return (
    <div
      className="blog-card-skeleton"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "12px",
      }}
    >
      <Skeleton height="200px" borderRadius="8px" className="mb-3" />
      <Skeleton width="70%" height="24px" className="mb-2" />
      <Skeleton width="40%" height="16px" className="mb-3" />
      <Skeleton width="100%" height="14px" className="mb-2" />
      <Skeleton width="100%" height="14px" className="mb-2" />
      <Skeleton width="80%" height="14px" className="mb-3" />
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <Skeleton width="80px" height="28px" borderRadius="20px" />
        <Skeleton width="80px" height="28px" borderRadius="20px" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Portfolio Card
 */
export function PortfolioCardSkeleton() {
  return (
    <div
      className="portfolio-card-skeleton"
      style={{
        padding: "1.5rem",
        backgroundColor: "var(--card-bg)",
        borderRadius: "12px",
      }}
    >
      <Skeleton height="220px" borderRadius="8px" className="mb-3" />
      <Skeleton width="80%" height="22px" className="mb-2" />
      <Skeleton width="100%" height="14px" className="mb-2" />
      <Skeleton width="90%" height="14px" className="mb-3" />
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <Skeleton width="60px" height="24px" borderRadius="16px" />
        <Skeleton width="60px" height="24px" borderRadius="16px" />
        <Skeleton width="60px" height="24px" borderRadius="16px" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Skeleton width="100px" height="36px" borderRadius="6px" />
        <Skeleton width="100px" height="36px" borderRadius="6px" />
      </div>
    </div>
  );
}

/**
 * Skeleton for Hero Section
 */
export function HeroSkeleton() {
  return (
    <div
      className="hero-skeleton"
      style={{ padding: "4rem 2rem", textAlign: "center" }}
    >
      <Skeleton
        width="200px"
        height="200px"
        borderRadius="50%"
        className="mx-auto mb-4"
      />
      <Skeleton width="300px" height="36px" className="mx-auto mb-2" />
      <Skeleton width="400px" height="24px" className="mx-auto mb-4" />
      <Skeleton width="600px" height="16px" className="mx-auto mb-2" />
      <Skeleton width="500px" height="16px" className="mx-auto mb-4" />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Skeleton width="140px" height="48px" borderRadius="8px" />
        <Skeleton width="140px" height="48px" borderRadius="8px" />
      </div>
    </div>
  );
}

/**
 * Skeleton for About Section
 */
export function AboutSkeleton() {
  return (
    <div className="about-skeleton" style={{ padding: "3rem 2rem" }}>
      <Skeleton width="250px" height="32px" className="mb-4" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <Skeleton height="300px" borderRadius="12px" />
        </div>
        <div>
          <Skeleton width="100%" height="18px" className="mb-3" />
          <Skeleton width="100%" height="18px" className="mb-3" />
          <Skeleton width="95%" height="18px" className="mb-3" />
          <Skeleton width="100%" height="18px" className="mb-3" />
          <Skeleton width="90%" height="18px" className="mb-4" />
          <Skeleton width="150px" height="44px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Skills Section
 */
export function SkillsSkeleton() {
  return (
    <div className="skills-skeleton" style={{ padding: "3rem 2rem" }}>
      <Skeleton width="200px" height="32px" className="mb-4 mx-auto" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <Skeleton
              width="80px"
              height="80px"
              borderRadius="12px"
              className="mx-auto mb-2"
            />
            <Skeleton width="60px" height="14px" className="mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Timeline Item
 */
export function TimelineSkeleton() {
  return (
    <div className="timeline-skeleton" style={{ padding: "2rem" }}>
      <Skeleton width="180px" height="28px" className="mb-4" />
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          style={{
            marginBottom: "2rem",
            paddingLeft: "2rem",
            borderLeft: "2px solid #e0e0e0",
          }}
        >
          <Skeleton width="120px" height="20px" className="mb-2" />
          <Skeleton width="200px" height="24px" className="mb-2" />
          <Skeleton width="100%" height="14px" className="mb-2" />
          <Skeleton width="90%" height="14px" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for Gallery Grid
 */
export function GallerySkeleton() {
  return (
    <div className="gallery-skeleton" style={{ padding: "3rem 2rem" }}>
      <Skeleton width="180px" height="32px" className="mb-4 mx-auto" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} height="200px" borderRadius="12px" />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for Blog List
 */
export function BlogListSkeleton({ count = 6 }) {
  return (
    <div
      className="blog-list-skeleton"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      {[...Array(count)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for Portfolio Grid
 */
export function PortfolioGridSkeleton({ count = 6 }) {
  return (
    <div
      className="portfolio-grid-skeleton"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      {[...Array(count)].map((_, i) => (
        <PortfolioCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * CSS for shimmer animation (inject into head or global styles)
 */
export const SkeletonStyles = () => (
  <style jsx global>{`
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .skeleton {
      animation: shimmer 2s infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }

    @media (prefers-color-scheme: dark) {
      .skeleton {
        background: linear-gradient(
          90deg,
          #2a2a2a 25%,
          #3a3a3a 50%,
          #2a2a2a 75%
        );
        background-size: 200% 100%;
      }
    }
  `}</style>
);

export default Skeleton;
