"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function SmartLink({
  href,
  children,
  prefetch = true,
  prefetchOnHover = true,
  prefetchOnVisible = false,
  className = "",
  ...props
}) {
  const router = useRouter();
  const linkRef = useRef(null);
  const prefetchedRef = useRef(false);

  // Prefetch on intersection (when link becomes visible)
  useEffect(() => {
    if (!prefetchOnVisible || prefetchedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefetchedRef.current) {
            router.prefetch(href);
            prefetchedRef.current = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (linkRef.current) {
      observer.observe(linkRef.current);
    }

    return () => observer.disconnect();
  }, [href, prefetchOnVisible, router]);

  const handleMouseEnter = () => {
    if (prefetchOnHover && !prefetchedRef.current) {
      router.prefetch(href);
      prefetchedRef.current = true;
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      prefetch={prefetch}
      className={className}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
}

export function PrefetchImportantLinks() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch critical pages on app load
    const importantRoutes = ["/about", "/portfolio", "/blogs", "/contact"];

    // Delay prefetching to not interfere with initial page load
    const timer = setTimeout(() => {
      importantRoutes.forEach((route) => {
        router.prefetch(route);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return null; // This component doesn't render anything
}

export function NavigationPrefetch({ routes = [] }) {
  const router = useRouter();

  useEffect(() => {
    if (routes.length === 0) return;

    const timer = setTimeout(() => {
      routes.forEach((route) => {
        router.prefetch(route);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [routes, router]);

  return null;
}

// Hook for manual prefetching control
export function usePrefetch() {
  const router = useRouter();

  const prefetch = (href) => {
    router.prefetch(href);
  };

  const prefetchBatch = (hrefs, delay = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        hrefs.forEach((href) => router.prefetch(href));
      }, delay);
    } else {
      hrefs.forEach((href) => router.prefetch(href));
    }
  };

  return { prefetch, prefetchBatch };
}

export default SmartLink;
