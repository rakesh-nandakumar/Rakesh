export const EMAIL_CONFIG = {
  user: process.env.GMAIL_USER,
  password: process.env.GMAIL_APP_PASSWORD,
};

export const RECAPTCHA_CONFIG = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
};

export const ANALYTICS_CONFIG = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  webVitalsEndpoint:
    process.env.NEXT_PUBLIC_WEBVITALS_ENDPOINT || "/api/web-vitals",
};
