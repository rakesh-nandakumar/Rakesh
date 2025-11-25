/**
 * Advanced Keyword & Intent Optimization
 * Handles TF-IDF, semantic keywords, LSI, entity optimization
 */

// Stopwords for TF-IDF calculation
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 
  'by', 'can', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 
  'might', 'more', 'most', 'must', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 
  'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 
  'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 
  'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 
  'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your', 'yours', 'yourself', 
  'yourselves'
]);

/**
 * Calculate Term Frequency (TF)
 * @param {string} term - The term to calculate frequency for
 * @param {string} content - The content to analyze
 * @returns {number} - Term frequency
 */
export function calculateTF(term, content) {
  const words = content.toLowerCase().split(/\s+/);
  const termCount = words.filter(word => word.includes(term.toLowerCase())).length;
  return termCount / words.length;
}

/**
 * Calculate TF-IDF scores for content
 * @param {string} content - Content to analyze
 * @param {Array<string>} keywords - Keywords to check
 * @returns {Object} - TF-IDF scores
 */
export function calculateTFIDF(content, keywords) {
  const scores = {};
  const contentLower = content.toLowerCase();
  const words = contentLower.split(/\s+/).filter(w => !STOPWORDS.has(w) && w.length > 2);
  const totalWords = words.length;

  keywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const occurrences = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
    const tf = occurrences / totalWords;
    // Simplified IDF (in production, you'd compare against corpus)
    const idf = Math.log(1 + (1 / (occurrences + 1)));
    scores[keyword] = tf * idf;
  });

  return scores;
}

/**
 * Generate semantic (LSI) keywords
 * @param {string} primaryKeyword - Primary keyword
 * @returns {Array<string>} - Related semantic keywords
 */
export function generateSemanticKeywords(primaryKeyword) {
  const semanticMap = {
    'full stack developer': [
      'software engineer',
      'web developer',
      'backend developer',
      'frontend developer',
      'fullstack engineer',
      'web application developer',
      'software development engineer',
      'full-stack programmer'
    ],
    'laravel': [
      'laravel framework',
      'php framework',
      'laravel development',
      'laravel developer',
      'php laravel',
      'laravel web development',
      'laravel application',
      'laravel mvc'
    ],
    'react': [
      'react.js',
      'react framework',
      'react developer',
      'react development',
      'react web app',
      'react component',
      'react hooks',
      'react frontend'
    ],
    'vue': [
      'vue.js',
      'vue framework',
      'vue developer',
      'vue development',
      'vue components',
      'vuejs framework',
      'vue web app'
    ],
    'aws': [
      'amazon web services',
      'aws cloud',
      'aws services',
      'aws developer',
      'cloud computing',
      'aws infrastructure',
      'aws deployment'
    ],
    'portfolio': [
      'projects',
      'work samples',
      'case studies',
      'project showcase',
      'developer portfolio',
      'work examples',
      'project gallery'
    ],
    'blog': [
      'articles',
      'posts',
      'technical blog',
      'developer blog',
      'programming articles',
      'tech articles',
      'coding blog'
    ]
  };

  const keyword = primaryKeyword.toLowerCase();
  for (const [key, values] of Object.entries(semanticMap)) {
    if (keyword.includes(key)) {
      return values;
    }
  }
  return [];
}

/**
 * Extract entities from content (Named Entity Recognition simplified)
 * @param {string} content - Content to extract entities from
 * @returns {Object} - Extracted entities by type
 */
export function extractEntities(content) {
  const entities = {
    technologies: [],
    frameworks: [],
    languages: [],
    services: [],
    companies: []
  };

  const techPatterns = {
    technologies: [
      /\b(MongoDB|PostgreSQL|MySQL|Redis|Elasticsearch|Docker|Kubernetes|Git|GitHub|GitLab)\b/gi,
      /\b(AWS|Azure|GCP|Heroku|Vercel|Netlify|DigitalOcean)\b/gi
    ],
    frameworks: [
      /\b(Laravel|React|Vue\.?js|Next\.?js|Express|Django|Flask|Spring|Angular)\b/gi,
      /\b(Bootstrap|Tailwind|Material-UI|Ant Design)\b/gi
    ],
    languages: [
      /\b(JavaScript|TypeScript|Python|PHP|Java|C\+\+|C#|Go|Rust|Ruby)\b/gi,
      /\b(HTML|CSS|SQL|GraphQL)\b/gi
    ],
    services: [
      /\b(API|REST API|GraphQL API|Microservices|CI\/CD|DevOps)\b/gi,
      /\b(Authentication|Authorization|OAuth|JWT)\b/gi
    ]
  };

  for (const [category, patterns] of Object.entries(techPatterns)) {
    patterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      entities[category].push(...matches.map(m => m.trim()));
    });
    // Remove duplicates
    entities[category] = [...new Set(entities[category])];
  }

  return entities;
}

/**
 * Generate long-tail keyword variations
 * @param {string} primaryKeyword - Primary keyword
 * @param {string} location - Optional location
 * @returns {Array<string>} - Long-tail variations
 */
export function generateLongTailKeywords(primaryKeyword, location = '') {
  const modifiers = {
    quality: ['best', 'top', 'professional', 'experienced', 'expert', 'senior'],
    action: ['hire', 'find', 'looking for', 'need', 'search for'],
    location: location ? [location, `in ${location}`, `near ${location}`] : [],
    time: ['2024', '2025', 'freelance', 'contract', 'full-time'],
    specificity: ['for startups', 'for enterprise', 'remote', 'consultant']
  };

  const variations = [];
  
  // Combine with quality modifiers
  modifiers.quality.forEach(mod => {
    variations.push(`${mod} ${primaryKeyword}`);
  });

  // Combine with action words
  modifiers.action.forEach(action => {
    variations.push(`${action} ${primaryKeyword}`);
  });

  // Combine with location
  modifiers.location.forEach(loc => {
    variations.push(`${primaryKeyword} ${loc}`);
  });

  // Combine with specificity
  modifiers.specificity.forEach(spec => {
    variations.push(`${primaryKeyword} ${spec}`);
  });

  return variations;
}

/**
 * Analyze search intent from query
 * @param {string} query - Search query
 * @returns {Object} - Intent analysis
 */
export function analyzeSearchIntent(query) {
  const queryLower = query.toLowerCase();
  
  const intentPatterns = {
    informational: [
      /^(what|why|how|when|where|who|which)/i,
      /\b(guide|tutorial|learn|explain|understand|meaning|definition)\b/i
    ],
    navigational: [
      /\b(login|signin|account|dashboard|profile|portfolio)\b/i,
      /\b(official|website|homepage)\b/i
    ],
    transactional: [
      /\b(buy|purchase|order|download|get|hire|contact|request)\b/i,
      /\b(price|cost|quote|free|discount)\b/i
    ],
    commercial: [
      /\b(best|top|review|compare|vs|versus|alternative)\b/i,
      /\b(recommended|recommended|should i|which)\b/i
    ]
  };

  const intent = {
    type: 'informational',
    confidence: 0,
    signals: []
  };

  for (const [type, patterns] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(queryLower)) {
        intent.type = type;
        intent.confidence += 0.3;
        intent.signals.push(pattern.source);
      }
    }
  }

  intent.confidence = Math.min(intent.confidence, 1);
  return intent;
}

/**
 * Check for keyword cannibalization
 * @param {Array<Object>} pages - Pages with their keywords
 * @returns {Array<Object>} - Cannibalization issues
 */
export function detectCannibalization(pages) {
  const keywordMap = new Map();
  const issues = [];

  pages.forEach(page => {
    page.keywords.forEach(keyword => {
      if (!keywordMap.has(keyword)) {
        keywordMap.set(keyword, []);
      }
      keywordMap.get(keyword).push(page.url);
    });
  });

  keywordMap.forEach((urls, keyword) => {
    if (urls.length > 1) {
      issues.push({
        keyword,
        urls,
        severity: urls.length > 2 ? 'high' : 'medium',
        recommendation: 'Consider consolidating content or differentiating keywords'
      });
    }
  });

  return issues;
}

/**
 * Optimize for featured snippet format
 * @param {string} content - Content to format
 * @param {string} format - Desired format (paragraph, list, table)
 * @returns {string} - Formatted content
 */
export function formatForFeaturedSnippet(content, format = 'paragraph') {
  switch (format) {
    case 'paragraph':
      // Keep first 50-60 words
      const words = content.split(' ').slice(0, 60).join(' ');
      return words + (content.split(' ').length > 60 ? '...' : '');
    
    case 'list':
      // Extract or create bullet points
      const sentences = content.split(/[.!?]+/).filter(s => s.trim());
      return sentences.slice(0, 5).map(s => `• ${s.trim()}`).join('\n');
    
    case 'table':
      // Simple key-value extraction
      return content;
    
    default:
      return content;
  }
}

/**
 * Calculate keyword density
 * @param {string} content - Content to analyze
 * @param {string} keyword - Keyword to check
 * @returns {Object} - Density analysis
 */
export function calculateKeywordDensity(content, keyword) {
  const words = content.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  let occurrences = 0;
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const phrase = words.slice(i, i + keywordWords.length).join(' ');
    if (phrase === keyword.toLowerCase()) {
      occurrences++;
    }
  }

  const density = (occurrences / totalWords) * 100;
  
  return {
    occurrences,
    density: density.toFixed(2),
    totalWords,
    recommendation: density < 0.5 ? 'Consider adding more keyword mentions' :
                    density > 2.5 ? 'Keyword density too high, reduce usage' :
                    'Keyword density is optimal'
  };
}

/**
 * Generate query variations for clustering
 * @param {string} primaryQuery - Primary search query
 * @returns {Array<string>} - Query variations
 */
export function generateQueryVariations(primaryQuery) {
  const variations = [];
  const words = primaryQuery.split(' ');
  
  // Singular/plural variations
  variations.push(primaryQuery);
  
  // Synonym substitutions (simplified)
  const synonyms = {
    'developer': ['engineer', 'programmer', 'coder'],
    'create': ['build', 'develop', 'make'],
    'website': ['site', 'web app', 'web application'],
    'best': ['top', 'leading', 'premier']
  };
  
  words.forEach((word, index) => {
    if (synonyms[word.toLowerCase()]) {
      synonyms[word.toLowerCase()].forEach(syn => {
        const newWords = [...words];
        newWords[index] = syn;
        variations.push(newWords.join(' '));
      });
    }
  });
  
  return [...new Set(variations)];
}

export default {
  calculateTF,
  calculateTFIDF,
  generateSemanticKeywords,
  extractEntities,
  generateLongTailKeywords,
  analyzeSearchIntent,
  detectCannibalization,
  formatForFeaturedSnippet,
  calculateKeywordDensity,
  generateQueryVariations
};
