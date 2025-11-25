/**
 * Advanced Metadata Generation
 * Generates optimized title tags, meta descriptions, Open Graph, Twitter Cards
 */

/**
 * Generate optimized title tag
 * @param {Object} options - Title options
 * @returns {string} - Optimized title
 */
export function generateOptimizedTitle(options = {}) {
  const {
    primaryKeyword = '',
    secondaryKeyword = '',
    brandName = 'Rakesh Nandakumar',
    pageType = 'page',
    location = '',
    maxLength = 60
  } = options;

  let title = '';

  switch (pageType) {
    case 'home':
      title = `${primaryKeyword} | ${brandName}`;
      if (secondaryKeyword) {
        title = `${primaryKeyword} & ${secondaryKeyword} | ${brandName}`;
      }
      break;

    case 'blog':
      title = primaryKeyword;
      if (brandName && (title.length + brandName.length + 3) <= maxLength) {
        title += ` | ${brandName}`;
      }
      break;

    case 'product':
    case 'service':
      title = `${primaryKeyword}`;
      if (location) {
        title += ` in ${location}`;
      }
      title += ` | ${brandName}`;
      break;

    case 'category':
      title = `${primaryKeyword} - ${secondaryKeyword || 'Services'} | ${brandName}`;
      break;

    default:
      title = primaryKeyword ? `${primaryKeyword} | ${brandName}` : brandName;
  }

  // Truncate if too long
  if (title.length > maxLength) {
    title = title.substring(0, maxLength - 3) + '...';
  }

  return title;
}

/**
 * Generate optimized meta description
 * @param {Object} options - Description options
 * @returns {string} - Optimized meta description
 */
export function generateMetaDescription(options = {}) {
  const {
    primaryKeyword = '',
    secondaryKeyword = '',
    content = '',
    cta = '',
    maxLength = 155,
    minLength = 120
  } = options;

  let description = content;

  // If no content provided, generate from keywords
  if (!description && primaryKeyword) {
    description = `Discover ${primaryKeyword}`;
    if (secondaryKeyword) {
      description += ` and ${secondaryKeyword}`;
    }
    description += '. ';
  }

  // Add CTA if provided and space allows
  if (cta && (description.length + cta.length + 1) <= maxLength) {
    description += ` ${cta}`;
  }

  // Ensure minimum length
  if (description.length < minLength && primaryKeyword) {
    description += ` Expert ${primaryKeyword} services with proven results.`;
  }

  // Truncate if too long
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }

  // Ensure it ends with proper punctuation
  if (!/[.!?]$/.test(description)) {
    description += '.';
  }

  return description;
}

/**
 * Generate complete page metadata
 * @param {Object} options - Metadata options
 * @returns {Object} - Complete metadata object for Next.js
 */
export function generatePageMetadata(options = {}) {
  const {
    title,
    description,
    keywords = [],
    url,
    image,
    imageAlt,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
    locale = 'en_US',
    siteName = 'Rakesh Nandakumar Portfolio',
    twitterHandle = '@rakeshnandakumar',
    canonical,
    noindex = false,
    nofollow = false
  } = options;

  const metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author.name, url: author.url }] : undefined,
    creator: author?.name,
    publisher: siteName,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale,
      type,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ] : undefined,
      publishedTime,
      modifiedTime,
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: canonical || url,
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph.type = 'article';
    metadata.openGraph.article = {
      publishedTime,
      modifiedTime,
      section,
      authors: author ? [author.name] : undefined,
      tags,
    };
  }

  return metadata;
}

/**
 * Generate breadcrumb structured data
 * @param {Array<Object>} breadcrumbs - Array of {name, url} objects
 * @returns {Object} - Breadcrumb structured data
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate article structured data
 * @param {Object} article - Article data
 * @returns {Object} - Article structured data
 */
export function generateArticleSchema(article) {
  const {
    title,
    description,
    url,
    image,
    publishedTime,
    modifiedTime,
    author,
    keywords = [],
    section,
  } = article;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author?.name,
      url: author?.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rakesh Nandakumar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rakeshn.com/avatar.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords.join(', '),
    articleSection: section,
  };
}

/**
 * Generate BlogPosting structured data
 * @param {Object} blog - Blog data
 * @returns {Object} - BlogPosting structured data
 */
export function generateBlogPostingSchema(blog) {
  const {
    title,
    description,
    url,
    image,
    publishedTime,
    modifiedTime,
    author,
    keywords = [],
    wordCount,
  } = blog;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author?.name || 'Rakesh Nandakumar',
      url: author?.url || 'https://rakeshn.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rakesh Nandakumar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rakeshn.com/avatar.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords.join(', '),
    wordCount,
  };
}

/**
 * Generate Person structured data
 * @param {Object} person - Person data
 * @returns {Object} - Person structured data
 */
export function generatePersonSchema(person) {
  const {
    name,
    jobTitle,
    description,
    url,
    image,
    email,
    telephone,
    address,
    socialProfiles = [],
    skills = [],
    worksFor,
    alumniOf,
  } = person;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    image,
    email,
    telephone,
    address,
    sameAs: socialProfiles,
    knowsAbout: skills,
    worksFor: worksFor ? {
      '@type': 'Organization',
      name: worksFor.name,
      url: worksFor.url,
    } : undefined,
    alumniOf: alumniOf ? {
      '@type': 'EducationalOrganization',
      name: alumniOf,
    } : undefined,
  };
}

/**
 * Generate Organization structured data
 * @param {Object} org - Organization data
 * @returns {Object} - Organization structured data
 */
export function generateOrganizationSchema(org) {
  const {
    name,
    description,
    url,
    logo,
    email,
    telephone,
    address,
    socialProfiles = [],
    foundingDate,
    founder,
  } = org;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    email,
    telephone,
    address,
    sameAs: socialProfiles,
    foundingDate,
    founder: founder ? {
      '@type': 'Person',
      name: founder,
    } : undefined,
  };
}

/**
 * Generate WebSite structured data with search action
 * @param {Object} site - Website data
 * @returns {Object} - WebSite structured data
 */
export function generateWebSiteSchema(site) {
  const {
    name,
    url,
    description,
    searchUrl,
  } = site;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: searchUrl ? {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    } : undefined,
  };
}

/**
 * Generate HowTo structured data
 * @param {Object} howto - HowTo data
 * @returns {Object} - HowTo structured data
 */
export function generateHowToSchema(howto) {
  const {
    name,
    description,
    image,
    totalTime,
    steps,
  } = howto;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
  };
}

/**
 * Generate Review structured data
 * @param {Object} review - Review data
 * @returns {Object} - Review structured data
 */
export function generateReviewSchema(review) {
  const {
    itemName,
    reviewBody,
    rating,
    author,
    datePublished,
  } = review;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Thing',
      name: itemName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
    },
    reviewBody,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
  };
}

/**
 * Generate canonical URL
 * @param {string} path - Page path
 * @param {string} baseUrl - Base URL
 * @returns {string} - Canonical URL
 */
export function generateCanonicalUrl(path, baseUrl = 'https://rakeshn.com') {
  // Remove trailing slash
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  
  // Remove query parameters and fragments
  const canonicalPath = cleanPath.split('?')[0].split('#')[0];
  
  return canonicalPath ? `${cleanBase}/${canonicalPath}` : cleanBase;
}

/**
 * Generate hreflang tags for international SEO
 * @param {Array<Object>} languages - Array of {lang, url} objects
 * @returns {Array<Object>} - Hreflang alternates
 */
export function generateHreflangTags(languages) {
  return languages.map(lang => ({
    hrefLang: lang.lang,
    href: lang.url,
  }));
}

/**
 * Optimize URL structure
 * @param {string} title - Page title
 * @param {Object} options - URL options
 * @returns {string} - Optimized URL slug
 */
export function generateOptimizedUrl(title, options = {}) {
  const {
    maxLength = 60,
    removeStopWords = true,
    includeDatePrefix = false,
    date = new Date(),
  } = options;

  let slug = title
    .toLowerCase()
    .trim()
    // Remove special characters
    .replace(/[^\w\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove multiple hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');

  // Remove stop words if requested
  if (removeStopWords) {
    const stopWords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 
                       'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 
                       'to', 'was', 'will', 'with'];
    const words = slug.split('-');
    slug = words.filter(word => !stopWords.includes(word)).join('-');
  }

  // Add date prefix if requested
  if (includeDatePrefix) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    slug = `${year}-${month}-${day}-${slug}`;
  }

  // Truncate if too long
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    // Remove incomplete word at the end
    const lastHyphen = slug.lastIndexOf('-');
    if (lastHyphen > 0) {
      slug = slug.substring(0, lastHyphen);
    }
  }

  return slug;
}

export default {
  generateOptimizedTitle,
  generateMetaDescription,
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateBlogPostingSchema,
  generatePersonSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateHowToSchema,
  generateReviewSchema,
  generateCanonicalUrl,
  generateHreflangTags,
  generateOptimizedUrl,
};
