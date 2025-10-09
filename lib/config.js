export const EMAIL_CONFIG = {
  user: process.env.GMAIL_USER, // Sender account (authenticated)
  password: process.env.GMAIL_APP_PASSWORD,
  recipient: process.env.GMAIL_RECIPIENT || "rakeshnandakumarr@gmail.com", // Where emails go
};

export const RECAPTCHA_CONFIG = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
};

export const ANALYTICS_CONFIG = {
  googleAnalyticsId: process.env.GA_MEASUREMENT_ID,
  webVitalsEndpoint: process.env.WEBVITALS_ENDPOINT || "/api/web-vitals",
};
