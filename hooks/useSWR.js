/**
 * SWR Data Fetching Hooks
 * Stale-while-revalidate pattern for smooth data hydration
 * Provides offline support and automatic revalidation
 */

"use client";

import { useEffect } from "react";
import useSWR from "swr";

// Global fetcher function
const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// SWR configuration
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Don't auto-refresh by default
  dedupingInterval: 60000, // Dedupe requests within 60s
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404
    if (error.status === 404) return;

    // Only retry up to 3 times
    if (retryCount >= 3) return;

    // Retry after 5 seconds
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

/**
 * Hook to fetch blogs data with SWR
 */
export function useBlogs() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=blogs",
    fetcher,
    {
      ...swrConfig,
      fallbackData: [],
      revalidateIfStale: true,
      revalidateOnMount: true,
    }
  );

  return {
    blogs: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch portfolio/projects data with SWR
 */
export function usePortfolio() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=portfolio",
    fetcher,
    {
      ...swrConfig,
      fallbackData: [],
      revalidateIfStale: true,
    }
  );

  return {
    portfolio: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch about data with SWR
 */
export function useAbout() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=about",
    fetcher,
    {
      ...swrConfig,
      fallbackData: null,
      revalidateIfStale: false, // About data changes rarely
    }
  );

  return {
    about: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch technologies data with SWR
 */
export function useTechnologies() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=technologies",
    fetcher,
    {
      ...swrConfig,
      fallbackData: [],
      revalidateIfStale: false,
    }
  );

  return {
    technologies: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch services data with SWR
 */
export function useServices() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=services",
    fetcher,
    {
      ...swrConfig,
      fallbackData: { services: [] },
      revalidateIfStale: false,
    }
  );

  return {
    services: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch gallery data with SWR
 */
export function useGallery() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=gallery",
    fetcher,
    {
      ...swrConfig,
      fallbackData: [],
      revalidateIfStale: false,
    }
  );

  return {
    gallery: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch timeline data with SWR
 */
export function useTimeline() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/data?entity=timeline",
    fetcher,
    {
      ...swrConfig,
      fallbackData: [],
      revalidateIfStale: false,
    }
  );

  return {
    timeline: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch asset manifest
 */
export function useAssetManifest() {
  const { data, error, isLoading } = useSWR(
    "/api/assets?format=full",
    fetcher,
    {
      ...swrConfig,
      revalidateIfStale: false,
      revalidateOnMount: false,
      fallbackData: { assets: [], totalAssets: 0 },
    }
  );

  return {
    manifest: data,
    isLoading,
    isError: error,
  };
}

/**
 * Prefetch data for a specific entity
 */
export async function prefetchData(entity) {
  try {
    const data = await fetcher(`/api/data?entity=${entity}`);
    return data;
  } catch (error) {
    console.error(`Error prefetching ${entity}:`, error);
    return null;
  }
}

/**
 * Prefetch multiple entities during idle time
 */
export function usePrefetchData() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefetch = () => {
      const entities = ["blogs", "portfolio", "technologies", "services"];

      entities.forEach((entity) => {
        requestIdleCallback(
          () => {
            prefetchData(entity);
          },
          { timeout: 10000 }
        );
      });
    };

    // Start prefetching after a short delay
    setTimeout(prefetch, 2000);
  }, []);
}

export default {
  useBlogs,
  usePortfolio,
  useAbout,
  useTechnologies,
  useServices,
  useGallery,
  useTimeline,
  useAssetManifest,
  prefetchData,
  usePrefetchData,
};
