/**
 * Enhanced Service Worker with Workbox
 * PWA-grade caching for blazing fast performance
 *
 * Features:
 * - Precaching of critical assets
 * - Runtime caching with multiple strategies
 * - Background asset prefetching
 * - Cache versioning and invalidation
 * - Supabase asset caching with long TTL
 * - Offline support with fallback page
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

// Cache version - increment to invalidate all caches
const CACHE_VERSION = "v2.0.0"; // Updated to clear old RAG cache
const CACHE_PREFIX = "portfolio";

// Initialize Workbox
if (workbox) {
  console.log("[SW] Workbox loaded successfully!");

  // Set cache name prefix
  workbox.core.setCacheNameDetails({
    prefix: CACHE_PREFIX,
    suffix: CACHE_VERSION,
  });

  // Clean up old caches on activation
  workbox.core.clientsClaim();
  workbox.core.skipWaiting();

  // Precache critical assets
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // ============================================
  // CACHING STRATEGIES
  // ============================================

  // 1. HTML Pages - Network First with Cache Fallback
  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: `${CACHE_PREFIX}-pages-${CACHE_VERSION}`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
          purgeOnQuotaError: true,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 2. Next.js Data - Stale While Revalidate
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/_next/data/"),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${CACHE_PREFIX}-data-${CACHE_VERSION}`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hour
          purgeOnQuotaError: true,
        }),
      ],
    })
  );

  // 3. API Routes - Network First with Short Cache
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/api/"),
    new workbox.strategies.NetworkFirst({
      cacheName: `${CACHE_PREFIX}-api-${CACHE_VERSION}`,
      networkTimeoutSeconds: 5,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
          purgeOnQuotaError: true,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 4. Supabase Assets - Cache First with Long TTL
  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin === "https://evgqbzyytamqezwdymkb.supabase.co" &&
      url.pathname.includes("/storage/v1/object/public/"),
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_PREFIX}-supabase-${CACHE_VERSION}`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          purgeOnQuotaError: true,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 5. Local Images - Cache First
  workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_PREFIX}-images-${CACHE_VERSION}`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          purgeOnQuotaError: true,
        }),
      ],
    })
  );

  // 6. Static Assets (JS, CSS, Fonts) - Cache First
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "font",
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_PREFIX}-static-${CACHE_VERSION}`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          purgeOnQuotaError: true,
        }),
      ],
    })
  );

  // 7. Documents (PDFs, etc.) - Cache First with Long TTL
  workbox.routing.registerRoute(
    ({ url }) => {
      const extension = url.pathname.split(".").pop();
      return ["pdf", "doc", "docx"].includes(extension);
    },
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_PREFIX}-documents-${CACHE_VERSION}`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
          purgeOnQuotaError: true,
        }),
      ],
    })
  );

  // ============================================
  // BACKGROUND SYNC & PREFETCHING
  // ============================================

  // Listen for messages from client
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "PREFETCH_ASSETS") {
      prefetchAssets(event.data.urls);
    } else if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    } else if (event.data && event.data.type === "CACHE_VERSION") {
      event.ports[0].postMessage({ version: CACHE_VERSION });
    } else if (event.data && event.data.type === "CLEAR_OLD_CACHES") {
      clearOldCaches();
    }
  });

  /**
   * Prefetch assets in background
   */
  async function prefetchAssets(urls) {
    if (!urls || !Array.isArray(urls)) return;

    console.log(`[SW] Prefetching ${urls.length} assets...`);
    const cache = await caches.open(
      `${CACHE_PREFIX}-prefetch-${CACHE_VERSION}`
    );
    const batchSize = 5; // 5 at a time to avoid overwhelming

    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map(async (url) => {
          try {
            const cached = await cache.match(url);
            if (!cached) {
              const response = await fetch(url);
              if (response.ok) {
                await cache.put(url, response);
                console.log(`[SW] Cached: ${url}`);
              }
            }
          } catch (error) {
            console.warn(`[SW] Failed to prefetch ${url}:`, error);
          }
        })
      );

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log("[SW] Prefetch complete");
  }

  /**
   * Clear old cache versions
   */
  async function clearOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(
      (name) => name.startsWith(CACHE_PREFIX) && !name.includes(CACHE_VERSION)
    );

    await Promise.all(
      oldCaches.map((cacheName) => {
        console.log(`[SW] Deleting old cache: ${cacheName}`);
        return caches.delete(cacheName);
      })
    );
  }

  // Clear old caches on activation
  self.addEventListener("activate", (event) => {
    console.log("[SW] Activating new service worker");
    event.waitUntil(clearOldCaches());
  });

  // ============================================
  // OFFLINE FALLBACK
  // ============================================

  const OFFLINE_PAGE = "/offline";

  // Cache offline page during installation
  self.addEventListener("install", (event) => {
    console.log("[SW] Installing service worker");
    event.waitUntil(
      caches.open(`${CACHE_PREFIX}-offline-${CACHE_VERSION}`).then((cache) => {
        return cache.addAll([OFFLINE_PAGE]);
      })
    );
  });

  // Return offline page when network fails
  workbox.routing.setCatchHandler(async ({ request }) => {
    if (request.destination === "document") {
      return caches.match(OFFLINE_PAGE);
    }
    return Response.error();
  });

  console.log(`[SW] Service Worker initialized - Version: ${CACHE_VERSION}`);
} else {
  console.error("[SW] Workbox failed to load");
}
