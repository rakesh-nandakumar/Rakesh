"use client";

import Head from "next/head";

export default function SEOHead({
  title = "Rakesh Nandakumar - Full Stack Developer",
  description = "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS",
  keywords = [],
  image = "/hero.jpg",
  url = "https://rakeshn.com",
  type = "website",
  structuredData = null,
}) {
  const fullTitle = title.includes("Rakesh Nandakumar")
    ? title
    : `${title} | Rakesh Nandakumar`;
  const keywordsString =
    keywords.length > 0
      ? keywords.join(", ")
      : "Full Stack Developer, Laravel, React, Vue.js, AWS";

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content="Rakesh Nandakumar" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Rakesh Nandakumar Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}
