/**
 * Data Fetching Hooks for Client Components
 * Uses SWR for caching and revalidation with fallback handling
 */
"use client";

import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("Failed to fetch");
    error.status = res.status;
    throw error;
  }
  return res.json();
};

const SWR_OPTIONS = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
  shouldRetryOnError: true,
  errorRetryCount: 3,
  errorRetryInterval: 1000,
  timeout: 10000, // 10 second timeout
  onError: (error, key) => {
    console.error(`SWR error for ${key}:`, error);
  },
};

export function useProfile() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=profile",
    fetcher,
    SWR_OPTIONS
  );
  return {
    profile: data || null,
    isLoading,
    isError: error,
  };
}

export function useHeader() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=header",
    fetcher,
    SWR_OPTIONS
  );
  return {
    header: data || null,
    isLoading,
    isError: error,
  };
}

export function useSiteConfig() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=site-config",
    fetcher,
    SWR_OPTIONS
  );
  return {
    siteConfig: data || null,
    isLoading,
    isError: error,
  };
}

export function useTimeline() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=timeline",
    fetcher,
    SWR_OPTIONS
  );
  return {
    timeline: data || null,
    isLoading,
    isError: error,
  };
}

export function useTechnologies() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=technologies",
    fetcher,
    SWR_OPTIONS
  );
  return {
    technologies: data || null,
    isLoading,
    isError: error,
  };
}

export function useServices() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=services",
    fetcher,
    SWR_OPTIONS
  );
  return {
    services: data || null,
    isLoading,
    isError: error,
  };
}

export function useGallery() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=gallery",
    fetcher,
    SWR_OPTIONS
  );
  return {
    gallery: data || null,
    isLoading,
    isError: error,
  };
}

export function usePortfolios() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=portfolio",
    fetcher,
    SWR_OPTIONS
  );
  return {
    portfolios: data || null,
    isLoading,
    isError: error,
  };
}

export function useBlogs() {
  const { data, error, isLoading } = useSWR(
    "/api/data?type=blogs",
    fetcher,
    SWR_OPTIONS
  );
  return {
    blogs: data || null,
    isLoading,
    isError: error,
  };
}
