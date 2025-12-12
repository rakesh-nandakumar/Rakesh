// Service Worker for Rakesh Nandakumar Portfolio
// Version 1.0.0 - Offline Support & Performance Optimization

const CACHE_VERSION = "v1";
const CACHE_NAME = `rakesh-portfolio-${CACHE_VERSION}`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
  "/",
  "/about",
  "/portfolio",
  "/blogs",
  "/contact",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, then network (for static assets)
  CACHE_FIRST: "cache-first",
  // Network first, then cache (for dynamic content)
  NETWORK_FIRST: "network-first",
  // Network only (for API calls, forms)
  NETWORK_ONLY: "network-only",
  // Cache only
  CACHE_ONLY: "cache-only",
  // Stale while revalidate (best for images)
  STALE_WHILE_REVALIDATE: "stale-while-revalidate",
};

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("[Service Worker] Installed successfully");
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("[Service Worker] Installation failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old cache versions
              return (
                cacheName.startsWith("rakesh-portfolio-") &&
                cacheName !== CACHE_NAME
              );
            })
            .map((cacheName) => {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log("[Service Worker] Activated successfully");
        // Claim all clients immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with appropriate strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Determine strategy based on request type
  const strategy = getStrategy(url, request);

  event.respondWith(handleRequest(request, strategy));
});

// Get appropriate caching strategy based on request
function getStrategy(url, request) {
  // API calls - Network first (with cache fallback)
  if (url.pathname.startsWith("/api/")) {
    // Don't cache form submissions
    if (request.method !== "GET") {
      return CACHE_STRATEGIES.NETWORK_ONLY;
    }
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Images - Stale while revalidate
  if (
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/) ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/assets/")
  ) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }

  // Static files (CSS, JS, fonts) - Cache first
  if (
    url.pathname.match(/\.(css|js|woff|woff2|ttf|otf)$/) ||
    url.pathname.startsWith("/_next/static/")
  ) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // HTML pages - Network first (with cache fallback)
  if (request.headers.get("accept")?.includes("text/html")) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // Default - Network first
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Handle request with specified strategy
async function handleRequest(request, strategy) {
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request);

    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request);

    case CACHE_STRATEGIES.NETWORK_ONLY:
      return networkOnly(request);

    case CACHE_STRATEGIES.CACHE_ONLY:
      return cacheOnly(request);

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request);

    default:
      return networkFirst(request);
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("[Service Worker] Cache first failed:", error);
    return new Response("Offline", { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[Service Worker] Network failed, trying cache:", request.url);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // If HTML request fails and no cache, show offline page
    if (request.headers.get("accept")?.includes("text/html")) {
      const offlineResponse = await caches.match("/offline");
      if (offlineResponse) {
        return offlineResponse;
      }
    }

    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    });
  }
}

// Network Only Strategy
async function networkOnly(request) {
  return fetch(request);
}

// Cache Only Strategy
async function cacheOnly(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  return new Response("Not found in cache", { status: 404 });
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch((error) => {
      console.log("[Service Worker] Background fetch failed:", error);
    });

  // Return cached version immediately if available
  return cachedResponse || fetchPromise;
}

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_URLS") {
    const urlsToCache = event.data.urls;
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
  }
});

// Background sync for offline form submissions (if needed in future)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-forms") {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Placeholder for future form sync functionality
  console.log("[Service Worker] Background sync triggered");
}

console.log("[Service Worker] Loaded");
