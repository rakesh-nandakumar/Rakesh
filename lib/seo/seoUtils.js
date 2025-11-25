/**
 * Core SEO Utilities
 * Central utility functions for SEO operations
 */

import * as keywords from './keywords';
import * as contentQuality from './content-quality';
import * as metadata from './metadata';
import * as internalLinking from './internalLinking';

/**
 * Perform comprehensive SEO audit on content
 * @param {Object} pageData - Page data to audit
 * @returns {Object} - Complete SEO audit report
 */
export async function performSEOAudit(pageData) {
  const {
    content,
    title,
    description,
    url,
    keywords: pageKeywords = [],
    links = [],
  } = pageData;

  const audit = {
    score: 0,
    maxScore: 100,
    issues: [],
    warnings: [],
    passed: [],
    recommendations: [],
  };

  // Title optimization check
  if (!title) {
    audit.issues.push({ type: 'critical', message: 'Missing page title' });
  } else if (title.length < 30) {
    audit.warnings.push({ type: 'warning', message: 'Title is too short (< 30 chars)' });
  } else if (title.length > 60) {
    audit.warnings.push({ type: 'warning', message: 'Title is too long (> 60 chars)' });
  } else {
    audit.passed.push('Title length is optimal');
    audit.score += 10;
  }

  // Meta description check
  if (!description) {
    audit.issues.push({ type: 'critical', message: 'Missing meta description' });
  } else if (description.length < 120) {
    audit.warnings.push({ type: 'warning', message: 'Meta description is too short' });
  } else if (description.length > 160) {
    audit.warnings.push({ type: 'warning', message: 'Meta description is too long' });
  } else {
    audit.passed.push('Meta description length is optimal');
    audit.score += 10;
  }

  // Content analysis
  if (content) {
    const readability = contentQuality.calculateReadabilityScore(content);
    if (parseFloat(readability.score) >= 60) {
      audit.passed.push(`Readability score is good: ${readability.score}`);
      audit.score += 10;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: `Readability score is low: ${readability.score}` 
      });
    }

    const depth = contentQuality.analyzeContentDepth(content);
    if (depth.wordCount >= 300) {
      audit.passed.push(`Word count is sufficient: ${depth.wordCount} words`);
      audit.score += 10;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: `Content is thin: ${depth.wordCount} words` 
      });
    }

    // Check for headings
    const headingAnalysis = contentQuality.extractHeadingHierarchy(content);
    if (headingAnalysis.hasH1) {
      audit.passed.push('H1 heading present');
      audit.score += 5;
    } else {
      audit.issues.push({ type: 'critical', message: 'Missing H1 heading' });
    }

    if (headingAnalysis.hierarchyIssues.length === 0) {
      audit.passed.push('Heading hierarchy is correct');
      audit.score += 5;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: `Heading hierarchy issues: ${headingAnalysis.hierarchyIssues.length}` 
      });
    }

    // Keyword density check
    if (pageKeywords.length > 0) {
      const primaryKeyword = pageKeywords[0];
      const density = keywords.calculateKeywordDensity(content, primaryKeyword);
      
      if (parseFloat(density.density) >= 0.5 && parseFloat(density.density) <= 2.5) {
        audit.passed.push(`Keyword density is optimal: ${density.density}%`);
        audit.score += 10;
      } else {
        audit.warnings.push({ 
          type: 'warning', 
          message: density.recommendation 
        });
      }
    }

    // Check for passive voice
    const passiveVoice = contentQuality.detectPassiveVoice(content);
    if (parseFloat(passiveVoice.percentage) < 10) {
      audit.passed.push('Passive voice usage is minimal');
      audit.score += 5;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: `High passive voice usage: ${passiveVoice.percentage}%` 
      });
    }

    // Check scannability
    const scannability = contentQuality.analyzeScannability(content);
    if (parseInt(scannability.percentage) >= 70) {
      audit.passed.push(`Content scannability is good: ${scannability.percentage}%`);
      audit.score += 10;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: `Content scannability needs improvement: ${scannability.percentage}%` 
      });
      audit.recommendations.push(...scannability.recommendations);
    }
  } else {
    audit.issues.push({ type: 'critical', message: 'No content provided for analysis' });
  }

  // Internal linking check
  if (links.length >= 3) {
    audit.passed.push(`Internal linking present: ${links.length} links`);
    audit.score += 10;
  } else {
    audit.warnings.push({ 
      type: 'warning', 
      message: 'Insufficient internal links (< 3)' 
    });
  }

  // URL structure check
  if (url) {
    const urlParts = url.split('/').filter(p => p);
    const lastPart = urlParts[urlParts.length - 1];
    
    if (lastPart && lastPart.length < 60 && /^[a-z0-9-]+$/.test(lastPart)) {
      audit.passed.push('URL structure is SEO-friendly');
      audit.score += 5;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: 'URL structure could be improved' 
      });
    }

    if (urlParts.length <= 3) {
      audit.passed.push('URL depth is optimal');
      audit.score += 5;
    } else {
      audit.warnings.push({ 
        type: 'warning', 
        message: 'URL is too deep (> 3 levels)' 
      });
    }
  }

  // Calculate final grade
  audit.grade = audit.score >= 90 ? 'A' :
                audit.score >= 80 ? 'B' :
                audit.score >= 70 ? 'C' :
                audit.score >= 60 ? 'D' : 'F';

  return audit;
}

/**
 * Generate complete page SEO package
 * @param {Object} pageData - Page data
 * @returns {Object} - Complete SEO package
 */
export function generateCompleteSEOPackage(pageData) {
  const {
    title,
    content,
    primaryKeyword,
    secondaryKeywords = [],
    category,
    author,
    publishedTime,
    modifiedTime,
    url,
    image,
  } = pageData;

  // Generate optimized metadata
  const optimizedTitle = metadata.generateOptimizedTitle({
    primaryKeyword,
    secondaryKeyword: secondaryKeywords[0],
    pageType: category === 'blog' ? 'blog' : 'page',
  });

  const optimizedDescription = metadata.generateMetaDescription({
    primaryKeyword,
    secondaryKeyword: secondaryKeywords[0],
    content: content?.substring(0, 200),
    cta: 'Learn more today.',
  });

  // Generate semantic keywords
  const semanticKeywords = keywords.generateSemanticKeywords(primaryKeyword);
  
  // Generate long-tail variations
  const longTailKeywords = keywords.generateLongTailKeywords(primaryKeyword);

  // Extract entities
  const entities = content ? keywords.extractEntities(content) : {};

  // Generate structured data
  const schemas = [];
  
  if (category === 'blog' || category === 'article') {
    schemas.push(metadata.generateBlogPostingSchema({
      title: optimizedTitle,
      description: optimizedDescription,
      url,
      image,
      publishedTime,
      modifiedTime,
      author,
      keywords: [primaryKeyword, ...secondaryKeywords],
      wordCount: content?.split(/\s+/).length,
    }));
  }

  // Generate breadcrumbs
  const breadcrumbs = internalLinking.generateBreadcrumbs(url);
  schemas.push(metadata.generateBreadcrumbSchema(breadcrumbs));

  // Calculate readability if content exists
  const readability = content 
    ? contentQuality.calculateReadabilityScore(content)
    : null;

  // Analyze search intent
  const searchIntent = keywords.analyzeSearchIntent(primaryKeyword);

  return {
    metadata: {
      title: optimizedTitle,
      description: optimizedDescription,
      canonical: metadata.generateCanonicalUrl(url),
      keywords: [
        primaryKeyword,
        ...secondaryKeywords,
        ...semanticKeywords.slice(0, 3),
      ],
    },
    structuredData: schemas,
    breadcrumbs,
    keywords: {
      primary: primaryKeyword,
      secondary: secondaryKeywords,
      semantic: semanticKeywords,
      longTail: longTailKeywords.slice(0, 10),
    },
    entities,
    searchIntent,
    readability,
    recommendations: generateRecommendations(pageData, {
      readability,
      searchIntent,
      entities,
    }),
  };
}

/**
 * Generate SEO recommendations
 * @param {Object} pageData - Page data
 * @param {Object} analysis - Analysis results
 * @returns {Array<string>} - Recommendations
 */
function generateRecommendations(pageData, analysis) {
  const recommendations = [];

  // Readability recommendations
  if (analysis.readability && parseFloat(analysis.readability.score) < 60) {
    recommendations.push('Improve readability by simplifying sentences');
  }

  // Search intent recommendations
  if (analysis.searchIntent) {
    const { type, confidence } = analysis.searchIntent;
    if (confidence < 0.5) {
      recommendations.push(`Clarify search intent alignment (currently: ${type})`);
    }
    
    if (type === 'transactional') {
      recommendations.push('Add clear CTAs and conversion paths');
    } else if (type === 'informational') {
      recommendations.push('Add comprehensive guides and tutorials');
    }
  }

  // Entity recommendations
  if (analysis.entities) {
    const totalEntities = Object.values(analysis.entities)
      .reduce((sum, arr) => sum + arr.length, 0);
    
    if (totalEntities < 5) {
      recommendations.push('Add more specific technical terms and entities');
    }
  }

  // Content length recommendations
  if (pageData.content) {
    const wordCount = pageData.content.split(/\s+/).length;
    if (wordCount < 300) {
      recommendations.push('Expand content to at least 300 words');
    } else if (wordCount < 1000 && pageData.category === 'blog') {
      recommendations.push('Consider expanding article for better depth (aim for 1000+ words)');
    }
  }

  return recommendations;
}

/**
 * Validate schema.org structured data
 * @param {Object} schema - Schema object to validate
 * @returns {Object} - Validation result
 */
export function validateStructuredData(schema) {
  const validation = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Check required fields
  if (!schema['@context']) {
    validation.valid = false;
    validation.errors.push('Missing @context property');
  }

  if (!schema['@type']) {
    validation.valid = false;
    validation.errors.push('Missing @type property');
  }

  // Type-specific validation
  if (schema['@type'] === 'Article' || schema['@type'] === 'BlogPosting') {
    if (!schema.headline) {
      validation.warnings.push('Missing headline property');
    }
    if (!schema.image) {
      validation.warnings.push('Missing image property');
    }
    if (!schema.datePublished) {
      validation.warnings.push('Missing datePublished property');
    }
    if (!schema.author) {
      validation.warnings.push('Missing author property');
    }
  }

  if (schema['@type'] === 'Person') {
    if (!schema.name) {
      validation.errors.push('Missing name property for Person');
      validation.valid = false;
    }
  }

  return validation;
}

/**
 * Generate robots meta tag
 * @param {Object} options - Robots options
 * @returns {string} - Robots meta content
 */
export function generateRobotsMeta(options = {}) {
  const {
    index = true,
    follow = true,
    noarchive = false,
    nosnippet = false,
    noimageindex = false,
    maxSnippet = -1,
    maxImagePreview = 'large',
    maxVideoPreview = -1,
  } = options;

  const directives = [];

  directives.push(index ? 'index' : 'noindex');
  directives.push(follow ? 'follow' : 'nofollow');
  
  if (noarchive) directives.push('noarchive');
  if (nosnippet) directives.push('nosnippet');
  if (noimageindex) directives.push('noimageindex');
  
  if (maxSnippet !== -1) directives.push(`max-snippet:${maxSnippet}`);
  if (maxImagePreview !== 'large') directives.push(`max-image-preview:${maxImagePreview}`);
  if (maxVideoPreview !== -1) directives.push(`max-video-preview:${maxVideoPreview}`);

  return directives.join(', ');
}

/**
 * Generate XML sitemap entry
 * @param {Object} page - Page data
 * @returns {Object} - Sitemap entry
 */
export function generateSitemapEntry(page) {
  const {
    url,
    lastModified = new Date(),
    changeFrequency = 'monthly',
    priority = 0.5,
  } = page;

  return {
    url,
    lastModified: lastModified instanceof Date 
      ? lastModified.toISOString()
      : lastModified,
    changeFrequency,
    priority,
  };
}

/**
 * Calculate optimal update frequency
 * @param {Array<Date>} updateHistory - History of page updates
 * @returns {string} - Recommended change frequency
 */
export function calculateChangeFrequency(updateHistory) {
  if (!updateHistory || updateHistory.length < 2) {
    return 'monthly';
  }

  const intervals = [];
  for (let i = 1; i < updateHistory.length; i++) {
    const diff = updateHistory[i] - updateHistory[i - 1];
    intervals.push(diff);
  }

  const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
  const avgDays = avgInterval / (1000 * 60 * 60 * 24);

  if (avgDays <= 1) return 'daily';
  if (avgDays <= 7) return 'weekly';
  if (avgDays <= 30) return 'monthly';
  if (avgDays <= 365) return 'yearly';
  return 'yearly';
}

/**
 * Check for duplicate content
 * @param {Array<Object>} pages - All pages
 * @returns {Array<Object>} - Duplicate content issues
 */
export function detectDuplicateContent(pages) {
  const contentHashes = new Map();
  const duplicates = [];

  pages.forEach(page => {
    if (!page.content) return;

    // Simple content fingerprint (in production, use actual hashing)
    const fingerprint = page.content
      .toLowerCase()
      .replace(/\s+/g, '')
      .substring(0, 200);

    if (contentHashes.has(fingerprint)) {
      duplicates.push({
        pages: [contentHashes.get(fingerprint), page.url],
        similarity: 'high',
        recommendation: 'Review for duplicate content',
      });
    } else {
      contentHashes.set(fingerprint, page.url);
    }
  });

  return duplicates;
}

/**
 * Generate redirect mapping
 * @param {string} oldUrl - Old URL
 * @param {string} newUrl - New URL
 * @param {number} statusCode - HTTP status code
 * @returns {Object} - Redirect configuration
 */
export function generateRedirect(oldUrl, newUrl, statusCode = 301) {
  return {
    source: oldUrl,
    destination: newUrl,
    permanent: statusCode === 301,
    statusCode,
  };
}

/**
 * Optimize image for SEO
 * @param {Object} imageData - Image data
 * @returns {Object} - Optimized image configuration
 */
export function optimizeImageForSEO(imageData) {
  const {
    src,
    alt,
    title,
    width,
    height,
    keyword,
  } = imageData;

  return {
    src,
    alt: alt || `${keyword || title} - Rakesh Nandakumar`,
    title: title || keyword,
    width,
    height,
    loading: 'lazy',
    decoding: 'async',
    // Generate descriptive filename from keyword
    optimizedFilename: keyword 
      ? `${keyword.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.webp`
      : null,
  };
}

// Export all utilities
export {
  keywords,
  contentQuality,
  metadata,
  internalLinking,
};

export default {
  performSEOAudit,
  generateCompleteSEOPackage,
  validateStructuredData,
  generateRobotsMeta,
  generateSitemapEntry,
  calculateChangeFrequency,
  detectDuplicateContent,
  generateRedirect,
  optimizeImageForSEO,
  keywords,
  contentQuality,
  metadata,
  internalLinking,
};
