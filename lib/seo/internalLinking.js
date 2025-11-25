/**
 * Internal Linking Optimization
 * Hub-spoke model, anchor text optimization, link depth analysis
 */

/**
 * Generate internal link with optimized anchor text
 * @param {Object} options - Link options
 * @returns {Object} - Link object
 */
export function generateInternalLink(options = {}) {
  const {
    targetUrl,
    targetTitle,
    sourceContext,
    anchorType = 'contextual',
    keyword,
  } = options;

  let anchorText = '';

  switch (anchorType) {
    case 'exact':
      // Use exact match keyword
      anchorText = keyword || targetTitle;
      break;

    case 'partial':
      // Partial match with variations
      anchorText = keyword ? `learn about ${keyword}` : targetTitle;
      break;

    case 'branded':
      // Branded anchor text
      anchorText = `${targetTitle} - Rakesh Nandakumar`;
      break;

    case 'contextual':
      // Natural contextual anchor
      anchorText = generateContextualAnchor(targetTitle, sourceContext);
      break;

    case 'naked':
      // URL as anchor
      anchorText = targetUrl;
      break;

    default:
      anchorText = targetTitle;
  }

  return {
    href: targetUrl,
    anchor: anchorText,
    rel: '',
    title: targetTitle,
  };
}

/**
 * Generate contextual anchor text
 * @param {string} targetTitle - Target page title
 * @param {string} context - Surrounding content context
 * @returns {string} - Contextual anchor text
 */
function generateContextualAnchor(targetTitle, context = '') {
  const variations = [
    `read more about ${targetTitle}`,
    `learn more about ${targetTitle}`,
    `our guide to ${targetTitle}`,
    `check out ${targetTitle}`,
    targetTitle,
  ];

  // If context mentions specific keywords, use them
  if (context) {
    const keywords = extractKeywordsFromContext(context);
    if (keywords.length > 0) {
      return keywords[0];
    }
  }

  return variations[Math.floor(Math.random() * variations.length)];
}

/**
 * Extract potential anchor keywords from context
 * @param {string} context - Surrounding text
 * @returns {Array<string>} - Potential anchors
 */
function extractKeywordsFromContext(context) {
  // Simple keyword extraction (would use NLP in production)
  const phrases = context.match(/\b[\w\s]{2,30}\b/g) || [];
  return phrases.slice(0, 3);
}

/**
 * Build site link graph for hub-spoke model
 * @param {Array<Object>} pages - All site pages
 * @returns {Object} - Link graph structure
 */
export function buildLinkGraph(pages) {
  const graph = {
    hubs: [],
    spokes: [],
    orphans: [],
    linkDepth: {},
  };

  // Identify hub pages (pages with most incoming links)
  const incomingLinks = new Map();
  const outgoingLinks = new Map();

  pages.forEach(page => {
    incomingLinks.set(page.url, 0);
    outgoingLinks.set(page.url, page.links?.length || 0);

    page.links?.forEach(link => {
      incomingLinks.set(link, (incomingLinks.get(link) || 0) + 1);
    });
  });

  // Classify pages
  pages.forEach(page => {
    const incoming = incomingLinks.get(page.url) || 0;
    const outgoing = outgoingLinks.get(page.url) || 0;

    if (incoming >= 5 || page.isHub) {
      graph.hubs.push({
        url: page.url,
        title: page.title,
        incomingLinks: incoming,
        outgoingLinks: outgoing,
      });
    } else if (incoming === 0 && outgoing === 0) {
      graph.orphans.push({
        url: page.url,
        title: page.title,
      });
    } else {
      graph.spokes.push({
        url: page.url,
        title: page.title,
        incomingLinks: incoming,
        outgoingLinks: outgoing,
      });
    }
  });

  return graph;
}

/**
 * Calculate link depth from homepage
 * @param {Object} siteStructure - Site structure object
 * @param {string} startUrl - Starting URL (homepage)
 * @returns {Object} - Link depth map
 */
export function calculateLinkDepth(siteStructure, startUrl = '/') {
  const depths = new Map();
  const queue = [{ url: startUrl, depth: 0 }];
  const visited = new Set();

  while (queue.length > 0) {
    const { url, depth } = queue.shift();

    if (visited.has(url)) continue;
    visited.add(url);
    depths.set(url, depth);

    const page = siteStructure[url];
    if (page && page.links) {
      page.links.forEach(link => {
        if (!visited.has(link)) {
          queue.push({ url: link, depth: depth + 1 });
        }
      });
    }
  }

  return {
    depths: Object.fromEntries(depths),
    deepPages: Array.from(depths.entries())
      .filter(([_, depth]) => depth > 3)
      .map(([url, depth]) => ({ url, depth })),
    recommendations: Array.from(depths.entries())
      .filter(([_, depth]) => depth > 3)
      .map(([url]) => `Consider adding direct link to ${url} from higher level pages`),
  };
}

/**
 * Suggest related internal links for content
 * @param {Object} currentPage - Current page data
 * @param {Array<Object>} allPages - All site pages
 * @param {number} maxSuggestions - Maximum suggestions
 * @returns {Array<Object>} - Suggested links
 */
export function suggestRelatedLinks(currentPage, allPages, maxSuggestions = 5) {
  const suggestions = [];
  const currentKeywords = new Set(
    (currentPage.keywords || []).map(k => k.toLowerCase())
  );
  const currentCategory = currentPage.category;

  allPages.forEach(page => {
    if (page.url === currentPage.url) return;

    let relevanceScore = 0;

    // Check keyword overlap
    const pageKeywords = new Set(
      (page.keywords || []).map(k => k.toLowerCase())
    );
    const overlap = new Set(
      [...currentKeywords].filter(k => pageKeywords.has(k))
    );
    relevanceScore += overlap.size * 2;

    // Check category match
    if (page.category === currentCategory) {
      relevanceScore += 3;
    }

    // Check title similarity
    const currentWords = new Set(currentPage.title.toLowerCase().split(/\s+/));
    const pageWords = new Set(page.title.toLowerCase().split(/\s+/));
    const titleOverlap = new Set(
      [...currentWords].filter(w => pageWords.has(w))
    );
    relevanceScore += titleOverlap.size;

    if (relevanceScore > 0) {
      suggestions.push({
        url: page.url,
        title: page.title,
        relevanceScore,
        reason: generateLinkReason(overlap, page.category === currentCategory),
      });
    }
  });

  // Sort by relevance and return top suggestions
  return suggestions
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxSuggestions);
}

/**
 * Generate reason for link suggestion
 * @param {Set} sharedKeywords - Shared keywords
 * @param {boolean} sameCategory - Same category
 * @returns {string} - Reason text
 */
function generateLinkReason(sharedKeywords, sameCategory) {
  const reasons = [];
  
  if (sharedKeywords.size > 0) {
    reasons.push(`Related topic: ${[...sharedKeywords].slice(0, 2).join(', ')}`);
  }
  
  if (sameCategory) {
    reasons.push('Same category');
  }

  return reasons.join(' • ');
}

/**
 * Optimize anchor text distribution
 * @param {Array<Object>} links - All internal links on a page
 * @returns {Object} - Anchor text analysis
 */
export function analyzeAnchorTextDistribution(links) {
  const anchorTypes = {
    exact: 0,
    partial: 0,
    branded: 0,
    generic: 0,
    naked: 0,
  };

  const anchorTexts = new Map();

  links.forEach(link => {
    const anchor = link.anchor.toLowerCase();
    
    // Count anchor occurrences
    anchorTexts.set(anchor, (anchorTexts.get(anchor) || 0) + 1);

    // Classify anchor type
    if (/^https?:\/\//.test(anchor)) {
      anchorTypes.naked++;
    } else if (/rakesh|nandakumar|portfolio/i.test(anchor)) {
      anchorTypes.branded++;
    } else if (/click here|read more|learn more|here/i.test(anchor)) {
      anchorTypes.generic++;
    } else if (anchor.split(' ').length === 1) {
      anchorTypes.exact++;
    } else {
      anchorTypes.partial++;
    }
  });

  const total = links.length;
  const distribution = {};
  Object.keys(anchorTypes).forEach(type => {
    distribution[type] = {
      count: anchorTypes[type],
      percentage: ((anchorTypes[type] / total) * 100).toFixed(1),
    };
  });

  // Check for over-optimization
  const recommendations = [];
  if (distribution.exact.percentage > 30) {
    recommendations.push('Too many exact match anchors, vary anchor text');
  }
  if (distribution.generic.percentage > 20) {
    recommendations.push('Reduce generic anchors like "click here"');
  }
  if (distribution.branded.percentage < 10) {
    recommendations.push('Add more branded anchor text');
  }

  // Check for duplicate anchors
  const duplicates = Array.from(anchorTexts.entries())
    .filter(([_, count]) => count > 3)
    .map(([anchor]) => anchor);

  if (duplicates.length > 0) {
    recommendations.push(`Vary anchor text for: ${duplicates.join(', ')}`);
  }

  return {
    distribution,
    totalLinks: total,
    uniqueAnchors: anchorTexts.size,
    duplicateAnchors: duplicates,
    recommendations,
  };
}

/**
 * Build topic cluster structure
 * @param {Array<Object>} pages - All pages
 * @returns {Object} - Topic clusters
 */
export function buildTopicClusters(pages) {
  const clusters = new Map();

  pages.forEach(page => {
    const topic = page.primaryTopic || page.category || 'general';
    
    if (!clusters.has(topic)) {
      clusters.set(topic, {
        pillarPage: null,
        clusterPages: [],
      });
    }

    const cluster = clusters.get(topic);
    
    if (page.isPillar) {
      cluster.pillarPage = page;
    } else {
      cluster.clusterPages.push(page);
    }
  });

  // Identify topics without pillar pages
  const recommendations = [];
  clusters.forEach((cluster, topic) => {
    if (!cluster.pillarPage && cluster.clusterPages.length >= 3) {
      recommendations.push(`Create pillar page for "${topic}" topic`);
    }
  });

  return {
    clusters: Object.fromEntries(clusters),
    totalClusters: clusters.size,
    recommendations,
  };
}

/**
 * Generate breadcrumb navigation
 * @param {string} currentPath - Current page path
 * @param {Object} siteStructure - Site structure
 * @returns {Array<Object>} - Breadcrumb items
 */
export function generateBreadcrumbs(currentPath, siteStructure = {}) {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
  ];

  const pathParts = currentPath.split('/').filter(p => p);
  let currentUrl = '';

  pathParts.forEach((part, index) => {
    currentUrl += `/${part}`;
    const page = siteStructure[currentUrl];
    
    breadcrumbs.push({
      name: page?.title || formatPathPart(part),
      url: currentUrl,
      isLast: index === pathParts.length - 1,
    });
  });

  return breadcrumbs;
}

/**
 * Format path part for breadcrumb
 * @param {string} part - Path part
 * @returns {string} - Formatted name
 */
function formatPathPart(part) {
  return part
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Detect and fix broken internal links
 * @param {Array<Object>} pages - All pages with links
 * @param {Set<string>} validUrls - Set of valid URLs
 * @returns {Object} - Broken links report
 */
export function detectBrokenInternalLinks(pages, validUrls) {
  const brokenLinks = [];

  pages.forEach(page => {
    page.links?.forEach(link => {
      if (!validUrls.has(link)) {
        brokenLinks.push({
          sourcePage: page.url,
          brokenLink: link,
          anchor: link.anchor,
        });
      }
    });
  });

  return {
    brokenLinks,
    totalBroken: brokenLinks.length,
    affectedPages: new Set(brokenLinks.map(l => l.sourcePage)).size,
    recommendations: brokenLinks.map(l => 
      `Fix broken link "${l.brokenLink}" on page ${l.sourcePage}`
    ),
  };
}

/**
 * Calculate PageRank-like score for internal link equity
 * @param {Object} linkGraph - Link graph structure
 * @param {number} iterations - Number of iterations
 * @returns {Object} - Page scores
 */
export function calculateInternalPageRank(linkGraph, iterations = 10) {
  const dampingFactor = 0.85;
  const pages = Object.keys(linkGraph);
  const scores = {};
  
  // Initialize scores
  pages.forEach(page => {
    scores[page] = 1.0 / pages.length;
  });

  // Iterate
  for (let i = 0; i < iterations; i++) {
    const newScores = {};
    
    pages.forEach(page => {
      let sum = 0;
      
      // Find pages linking to this page
      pages.forEach(otherPage => {
        if (linkGraph[otherPage]?.includes(page)) {
          sum += scores[otherPage] / linkGraph[otherPage].length;
        }
      });
      
      newScores[page] = (1 - dampingFactor) + dampingFactor * sum;
    });
    
    Object.assign(scores, newScores);
  }

  // Normalize and sort
  const sortedPages = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([url, score]) => ({ url, score: score.toFixed(4) }));

  return {
    scores,
    topPages: sortedPages.slice(0, 10),
    lowEquityPages: sortedPages.slice(-10),
  };
}

export default {
  generateInternalLink,
  buildLinkGraph,
  calculateLinkDepth,
  suggestRelatedLinks,
  analyzeAnchorTextDistribution,
  buildTopicClusters,
  generateBreadcrumbs,
  detectBrokenInternalLinks,
  calculateInternalPageRank,
};
