/**
 * Asset Prefetcher - Client Side
 * Uses requestIdleCallback to prefetch and cache all Supabase assets
 * Runs in background without blocking user interactions
 */

'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to prefetch all assets in the background
 */
export function useAssetPrefetch() {
  const [status, setStatus] = useState('idle');
  const prefetchedRef = useRef(false);

  useEffect(() => {
    // Only run once
    if (prefetchedRef.current) return;
    if (typeof window === 'undefined') return;

    // Check if service worker is available
    if (!('serviceWorker' in navigator)) {
      console.warn('[Prefetch] Service Worker not supported');
      return;
    }

    // Wait for idle time to start prefetching
    const prefetchAssets = async () => {
      try {
        setStatus('fetching-manifest');
        
        // Fetch asset manifest
        const response = await fetch('/api/assets?format=urls');
        if (!response.ok) throw new Error('Failed to fetch asset manifest');
        
        const urls = await response.json();
        console.log(`[Prefetch] Found ${urls.length} assets to prefetch`);
        
        setStatus('prefetching');
        
        // Send to service worker for caching
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'PREFETCH_ASSETS',
            urls
          });
          
          console.log('[Prefetch] Assets sent to service worker');
          setStatus('complete');
        } else {
          console.warn('[Prefetch] No service worker controller available');
          setStatus('error');
        }
        
        prefetchedRef.current = true;
      } catch (error) {
        console.error('[Prefetch] Error:', error);
        setStatus('error');
      }
    };

    // Use requestIdleCallback or fallback to setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Wait a bit after page load for critical resources
        setTimeout(prefetchAssets, 2000);
      }, { timeout: 5000 });
    } else {
      setTimeout(prefetchAssets, 3000);
    }
  }, []);

  return { status, isPrefetching: status === 'prefetching' };
}

/**
 * Prefetch critical images immediately (for hero, above-fold content)
 */
export function prefetchCriticalImages(urls) {
  if (typeof window === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images when they enter viewport
 */
export function useLazyImage(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

/**
 * Preconnect to Supabase domain for faster asset loading (Client-side)
 */
export function preconnectSupabase() {
  if (typeof document === 'undefined') return;

  const supabaseOrigin = 'https://evgqbzyytamqezwdymkb.supabase.co';
  
  // Add preconnect link if not already present
  if (!document.querySelector(`link[href="${supabaseOrigin}"]`)) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = supabaseOrigin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Also add dns-prefetch as fallback
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = supabaseOrigin;
    document.head.appendChild(dnsLink);
  }
}

/**
 * Get Supabase preconnect links for server-side rendering
 * Returns JSX elements to be placed in <head>
 */
export function getSupabasePreconnectLinks() {
  const supabaseOrigin = 'https://evgqbzyytamqezwdymkb.supabase.co';
  
  return (
    <>
      <link rel="preconnect" href={supabaseOrigin} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={supabaseOrigin} />
    </>
  );
}

/**
 * Component to trigger asset prefetching
 */
export function AssetPrefetcher() {
  const { status } = useAssetPrefetch();

  useEffect(() => {
    // Preconnect to Supabase on mount
    preconnectSupabase();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      padding: '8px 12px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      fontSize: '12px',
      borderRadius: '4px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      Prefetch: {status}
    </div>
  );
}

export default {
  useAssetPrefetch,
  prefetchCriticalImages,
  useLazyImage,
  preconnectSupabase,
  AssetPrefetcher
};
