"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    let refreshTimer;
    let pollTimer;
    let initTimer;
    let idleHandle;

    const initAOS = () => {
      if (!window.AOS) return;

      window.AOS.init({
        duration: 500,
        once: true,
        easing: "ease-in-out",
        offset: 50,
        delay: 0,
        disable: false,
        startEvent: "DOMContentLoaded",
      });

      refreshTimer = window.setTimeout(() => {
        window.AOS?.refresh();
      }, 200);
    };

    const scheduleInit = () => {
      if (!window.AOS) return;

      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(() => {
          initTimer = window.setTimeout(initAOS, 0);
        });
      } else {
        initTimer = window.setTimeout(initAOS, 150);
      }
    };

    const startWhenReady = () => {
      if (window.AOS) {
        scheduleInit();
      } else {
        pollTimer = window.setInterval(() => {
          if (window.AOS) {
            window.clearInterval(pollTimer);
            scheduleInit();
          }
        }, 150);
      }
    };

    if (document.readyState === "complete") {
      startWhenReady();
    } else {
      window.addEventListener("load", startWhenReady, { once: true });
    }

    return () => {
      window.removeEventListener("load", startWhenReady);
      window.clearInterval(pollTimer);
      window.clearTimeout(refreshTimer);
      if (typeof window.cancelIdleCallback === "function" && idleHandle) {
        window.cancelIdleCallback(idleHandle);
      }
      window.clearTimeout(initTimer);
    };
  }, []);

  return null;
}
