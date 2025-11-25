/**
 * SEO Performance Monitor
 * Tracks Core Web Vitals and SEO metrics
 */

'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // You can also send to your analytics endpoint
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
      keepalive: true,
    }).catch(console.error);
  }
}

export default function SEOMonitor() {
  useEffect(() => {
    // Track Core Web Vitals (Note: FID is deprecated in favor of INP)
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendToAnalytics({
          name: 'page_hidden',
          value: Date.now(),
          id: `v1-${Date.now()}-${Math.random()}`,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track milestones
        if ([25, 50, 75, 90, 100].includes(scrollPercentage)) {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: `${scrollPercentage}%`,
              value: scrollPercentage,
              non_interaction: true,
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track time on page
    const startTime = Date.now();
    
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'time_on_page', {
          event_category: 'Engagement',
          value: timeSpent,
          non_interaction: true,
        });
      }
    };

    // Track on page leave
    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * Track custom SEO events
 */
export function trackSEOEvent(eventName, eventData = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'SEO',
      ...eventData,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[SEO Event]', eventName, eventData);
  }
}

/**
 * Track internal link clicks
 */
export function trackInternalLinkClick(href, anchor) {
  trackSEOEvent('internal_link_click', {
    link_url: href,
    link_text: anchor,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLinkClick(href, anchor) {
  trackSEOEvent('external_link_click', {
    link_url: href,
    link_text: anchor,
  });
}

/**
 * Track search queries (if you have search functionality)
 */
export function trackSearch(query, resultsCount) {
  trackSEOEvent('search', {
    search_term: query,
    results_count: resultsCount,
  });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName, ctaLocation) {
  trackSEOEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName, formSuccess) {
  trackSEOEvent('form_submission', {
    form_name: formName,
    form_success: formSuccess,
  });
}

/**
 * Track 404 errors
 */
export function track404Error(requestedUrl) {
  trackSEOEvent('404_error', {
    requested_url: requestedUrl,
  });
}

/**
 * Track broken images
 */
export function trackBrokenImage(imageSrc) {
  trackSEOEvent('broken_image', {
    image_src: imageSrc,
  });
}
