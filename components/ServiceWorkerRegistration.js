"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      // Check if service worker is already registered
      const registration = await navigator.serviceWorker.getRegistration();

      if (registration) {
        console.log("[PWA] Service Worker already registered");

        // Check for updates
        registration.update();

        // Handle updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available
                console.log("[PWA] New service worker available");

                // Optionally notify user about update
                if (
                  confirm(
                    "A new version of the app is available. Reload to update?"
                  )
                ) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  window.location.reload();
                }
              }
            });
          }
        });
      } else {
        // Register new service worker
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("[PWA] Service Worker registered successfully:", reg.scope);

        // Handle installation
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;

          if (newWorker) {
            console.log("[PWA] Installing new service worker...");

            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "activated") {
                console.log("[PWA] Service Worker activated");
              }
            });
          }
        });
      }

      // Handle controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[PWA] Controller changed, reloading page");
        window.location.reload();
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("[PWA] Message from service worker:", event.data);
      });

      // Pre-cache important pages on first visit
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "CACHE_URLS",
          urls: ["/", "/about", "/portfolio", "/blogs", "/contact", "/offline"],
        });
      }
    } catch (error) {
      console.error("[PWA] Service Worker registration failed:", error);
    }
  };

  // Show install prompt for PWA
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;

      console.log("[PWA] Install prompt available");

      // Optionally, show a custom install button
      // You can create a UI element to trigger the prompt
    };

    const handleAppInstalled = () => {
      console.log("[PWA] App installed successfully");
      deferredPrompt = null;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Detect if app is running in standalone mode (installed as PWA)
  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      console.log("[PWA] Running in standalone mode");
      // Add any PWA-specific functionality here
    }
  }, []);

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log("[PWA] Back online");
      // Optionally show a toast notification
    };

    const handleOffline = () => {
      console.log("[PWA] Gone offline");
      // Optionally show a toast notification
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return null; // This component doesn't render anything
}
