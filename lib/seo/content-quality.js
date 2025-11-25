/**
 * Content Quality & Readability Optimization
 * Handles readability scoring, content depth analysis, EEAT signals
 */

/**
 * Calculate Flesch Reading Ease score
 * @param {string} content - Content to analyze
 * @returns {Object} - Reading ease score and level
 */
export function calculateReadabilityScore(content) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const syllables = countSyllables(content);

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease
  const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  let level = 'Very Difficult';
  if (fleschScore >= 90) level = 'Very Easy';
  else if (fleschScore >= 80) level = 'Easy';
  else if (fleschScore >= 70) level = 'Fairly Easy';
  else if (fleschScore >= 60) level = 'Standard';
  else if (fleschScore >= 50) level = 'Fairly Difficult';
  else if (fleschScore >= 30) level = 'Difficult';

  return {
    score: Math.max(0, Math.min(100, fleschScore)).toFixed(1),
    level,
    avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
    avgSyllablesPerWord: avgSyllablesPerWord.toFixed(2),
    totalWords: words.length,
    totalSentences: sentences.length
  };
}

/**
 * Count syllables in text (simplified)
 * @param {string} text - Text to analyze
 * @returns {number} - Syllable count
 */
function countSyllables(text) {
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;

  words.forEach(word => {
    word = word.replace(/[^a-z]/g, '');
    if (word.length <= 3) {
      count++;
      return;
    }

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllableMatches = word.match(/[aeiouy]{1,2}/g);
    count += syllableMatches ? syllableMatches.length : 1;
  });

  return count;
}

/**
 * Analyze paragraph structure
 * @param {string} content - Content to analyze
 * @returns {Object} - Paragraph analysis
 */
export function analyzeParagraphStructure(content) {
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
  const words = content.split(/\s+/);

  const analysis = {
    totalParagraphs: paragraphs.length,
    avgWordsPerParagraph: (words.length / paragraphs.length).toFixed(1),
    longParagraphs: 0,
    shortParagraphs: 0,
    recommendations: []
  };

  paragraphs.forEach(para => {
    const paraWords = para.split(/\s+/).length;
    if (paraWords > 150) analysis.longParagraphs++;
    if (paraWords < 20 && paraWords > 5) analysis.shortParagraphs++;
  });

  if (analysis.longParagraphs > paragraphs.length * 0.3) {
    analysis.recommendations.push('Consider breaking up long paragraphs for better readability');
  }

  if (analysis.avgWordsPerParagraph > 100) {
    analysis.recommendations.push('Average paragraph length is high, aim for 50-75 words');
  }

  return analysis;
}

/**
 * Analyze sentence structure
 * @param {string} content - Content to analyze
 * @returns {Object} - Sentence analysis
 */
export function analyzeSentenceStructure(content) {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const analysis = {
    totalSentences: sentences.length,
    avgWordsPerSentence: 0,
    longSentences: 0,
    veryLongSentences: 0,
    recommendations: []
  };

  let totalWords = 0;
  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/).length;
    totalWords += words;
    if (words > 25) analysis.longSentences++;
    if (words > 35) analysis.veryLongSentences++;
  });

  analysis.avgWordsPerSentence = (totalWords / sentences.length).toFixed(1);

  if (analysis.avgWordsPerSentence > 20) {
    analysis.recommendations.push('Average sentence length is high, aim for 15-20 words');
  }

  if (analysis.veryLongSentences > 0) {
    analysis.recommendations.push(`${analysis.veryLongSentences} sentences are very long (>35 words)`);
  }

  return analysis;
}

/**
 * Check for passive voice usage
 * @param {string} content - Content to analyze
 * @returns {Object} - Passive voice analysis
 */
export function detectPassiveVoice(content) {
  const passivePatterns = [
    /\b(am|is|are|was|were|be|been|being)\s+(\w+ed|[\w]+en)\b/gi,
    /\b(has|have|had)\s+been\s+(\w+ed|[\w]+en)\b/gi
  ];

  let passiveCount = 0;
  const sentences = content.split(/[.!?]+/);

  sentences.forEach(sentence => {
    passivePatterns.forEach(pattern => {
      if (pattern.test(sentence)) {
        passiveCount++;
      }
    });
  });

  const percentage = ((passiveCount / sentences.length) * 100).toFixed(1);

  return {
    passiveSentences: passiveCount,
    totalSentences: sentences.length,
    percentage,
    recommendation: percentage > 10 ? 'Consider reducing passive voice usage' : 'Passive voice usage is acceptable'
  };
}

/**
 * Detect filler words and fluff
 * @param {string} content - Content to analyze
 * @returns {Object} - Filler word analysis
 */
export function detectFillerWords(content) {
  const fillerWords = [
    'actually', 'basically', 'certainly', 'definitely', 'essentially', 'extremely',
    'fairly', 'just', 'literally', 'obviously', 'quite', 'rather', 'really',
    'simply', 'somewhat', 'totally', 'truly', 'very', 'virtually'
  ];

  const words = content.toLowerCase().split(/\s+/);
  const found = {};
  let totalFillers = 0;

  fillerWords.forEach(filler => {
    const count = words.filter(w => w === filler).length;
    if (count > 0) {
      found[filler] = count;
      totalFillers += count;
    }
  });

  const percentage = ((totalFillers / words.length) * 100).toFixed(2);

  return {
    totalFillers,
    totalWords: words.length,
    percentage,
    fillerWords: found,
    recommendation: percentage > 2 ? 'Consider removing excessive filler words' : 'Filler word usage is acceptable'
  };
}

/**
 * Check content depth and completeness
 * @param {string} content - Content to analyze
 * @param {Array<string>} requiredTopics - Topics that should be covered
 * @returns {Object} - Depth analysis
 */
export function analyzeContentDepth(content, requiredTopics = []) {
  const contentLower = content.toLowerCase();
  const words = content.split(/\s+/);
  
  const depth = {
    wordCount: words.length,
    estimatedReadTime: Math.ceil(words.length / 200), // 200 words per minute
    topicCoverage: {},
    missingTopics: [],
    hasExamples: false,
    hasStatistics: false,
    hasLists: false,
    hasHeadings: false,
    recommendations: []
  };

  // Check topic coverage
  requiredTopics.forEach(topic => {
    if (contentLower.includes(topic.toLowerCase())) {
      depth.topicCoverage[topic] = true;
    } else {
      depth.missingTopics.push(topic);
    }
  });

  // Check for examples
  depth.hasExamples = /\b(for example|for instance|such as|like|e\.g\.|i\.e\.)\b/i.test(content);

  // Check for statistics
  depth.hasStatistics = /\d+%|\d+\s*(percent|users|customers|people|companies)/i.test(content);

  // Check for lists
  depth.hasLists = /^[\s]*[-•*]|^\d+\./m.test(content);

  // Check for headings
  depth.hasHeadings = /^#{1,6}\s+/m.test(content);

  // Recommendations
  if (words.length < 300) {
    depth.recommendations.push('Content is thin, aim for at least 300 words');
  }
  if (!depth.hasExamples) {
    depth.recommendations.push('Add concrete examples to improve clarity');
  }
  if (!depth.hasStatistics) {
    depth.recommendations.push('Consider adding data or statistics for credibility');
  }
  if (!depth.hasLists) {
    depth.recommendations.push('Add lists or bullet points for scannability');
  }
  if (depth.missingTopics.length > 0) {
    depth.recommendations.push(`Missing topics: ${depth.missingTopics.join(', ')}`);
  }

  return depth;
}

/**
 * Generate FAQ structured data
 * @param {Array<Object>} faqs - Array of {question, answer} objects
 * @returns {Object} - FAQ structured data
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Extract headings hierarchy
 * @param {string} content - Content to analyze (markdown or HTML)
 * @returns {Array<Object>} - Heading structure
 */
export function extractHeadingHierarchy(content) {
  const headings = [];
  
  // Match markdown headings
  const mdHeadingPattern = /^(#{1,6})\s+(.+)$/gm;
  let match;
  
  while ((match = mdHeadingPattern.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      type: 'markdown'
    });
  }

  // Check hierarchy issues
  const issues = [];
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i-1].level > 1) {
      issues.push(`Heading hierarchy skip at "${headings[i].text}"`);
    }
  }

  return {
    headings,
    totalHeadings: headings.length,
    hierarchyIssues: issues,
    hasH1: headings.some(h => h.level === 1),
    recommendation: issues.length > 0 ? 'Fix heading hierarchy' : 'Heading hierarchy is correct'
  };
}

/**
 * Check for EEAT signals (Experience, Expertise, Authoritativeness, Trust)
 * @param {string} content - Content to analyze
 * @param {Object} metadata - Author metadata
 * @returns {Object} - EEAT analysis
 */
export function analyzeEEAT(content, metadata = {}) {
  const signals = {
    experience: 0,
    expertise: 0,
    authoritativeness: 0,
    trustworthiness: 0,
    recommendations: []
  };

  const contentLower = content.toLowerCase();

  // Experience signals
  if (/\b(my experience|in my career|i've worked|i've been)\b/i.test(content)) {
    signals.experience += 0.3;
  }
  if (/\b(case study|project|client|real-world)\b/i.test(content)) {
    signals.experience += 0.2;
  }

  // Expertise signals
  if (metadata.authorBio || metadata.credentials) {
    signals.expertise += 0.3;
  }
  if (/\b(certified|certification|degree|years of experience|professional)\b/i.test(content)) {
    signals.expertise += 0.2;
  }

  // Authoritativeness signals
  if (/\b(research|study|according to|data shows|statistics)\b/i.test(content)) {
    signals.authoritativeness += 0.2;
  }
  if (metadata.publications || metadata.speaking) {
    signals.authoritativeness += 0.3;
  }

  // Trustworthiness signals
  if (/\b(source|reference|citation|documentation)\b/i.test(content)) {
    signals.trustworthiness += 0.2;
  }
  if (metadata.contactInfo || metadata.socialProof) {
    signals.trustworthiness += 0.2;
  }

  // Recommendations
  if (signals.experience < 0.3) {
    signals.recommendations.push('Add personal experience and real-world examples');
  }
  if (signals.expertise < 0.3) {
    signals.recommendations.push('Include credentials or expertise indicators');
  }
  if (signals.authoritativeness < 0.3) {
    signals.recommendations.push('Add data, research, or authoritative sources');
  }
  if (signals.trustworthiness < 0.3) {
    signals.recommendations.push('Include references, citations, or contact information');
  }

  return signals;
}

/**
 * Optimize content scannability
 * @param {string} content - Content to analyze
 * @returns {Object} - Scannability score and recommendations
 */
export function analyzeScannability(content) {
  const analysis = {
    score: 0,
    maxScore: 10,
    elements: {},
    recommendations: []
  };

  // Check for lists
  if (/^[\s]*[-•*]|^\d+\./m.test(content)) {
    analysis.score += 2;
    analysis.elements.lists = true;
  } else {
    analysis.recommendations.push('Add bullet points or numbered lists');
  }

  // Check for headings
  const headingCount = (content.match(/^#{1,6}\s+/gm) || []).length;
  if (headingCount >= 3) {
    analysis.score += 2;
    analysis.elements.headings = true;
  } else {
    analysis.recommendations.push('Add more headings and subheadings');
  }

  // Check for short paragraphs
  const paragraphs = content.split(/\n\n+/);
  const avgParaWords = paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / paragraphs.length;
  if (avgParaWords < 75) {
    analysis.score += 2;
    analysis.elements.shortParagraphs = true;
  } else {
    analysis.recommendations.push('Break content into shorter paragraphs');
  }

  // Check for visual breaks
  if (/\n---\n|\n\*\*\*\n/.test(content)) {
    analysis.score += 1;
    analysis.elements.visualBreaks = true;
  }

  // Check for bold/emphasis
  if (/\*\*\w+\*\*|__\w+__|\*\w+\*|_\w+_/g.test(content)) {
    analysis.score += 2;
    analysis.elements.emphasis = true;
  } else {
    analysis.recommendations.push('Use bold or italic for emphasis on key points');
  }

  // Check for white space
  const lines = content.split('\n');
  const emptyLines = lines.filter(l => l.trim() === '').length;
  if (emptyLines / lines.length > 0.2) {
    analysis.score += 1;
    analysis.elements.whiteSpace = true;
  } else {
    analysis.recommendations.push('Add more white space for better readability');
  }

  analysis.percentage = ((analysis.score / analysis.maxScore) * 100).toFixed(0);

  return analysis;
}

export default {
  calculateReadabilityScore,
  analyzeParagraphStructure,
  analyzeSentenceStructure,
  detectPassiveVoice,
  detectFillerWords,
  analyzeContentDepth,
  generateFAQSchema,
  extractHeadingHierarchy,
  analyzeEEAT,
  analyzeScannability
};
