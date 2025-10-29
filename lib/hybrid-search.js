/**
 * Hybrid Search Engine
 * Combines semantic embeddings with BM25 keyword matching for improved retrieval
 */

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "will",
  "with",
  "the",
  "this",
  "but",
  "they",
  "have",
]);

export class HybridSearch {
  constructor() {
    this.bm25Index = null;
    this.k1 = 1.5; // BM25 term frequency saturation parameter
    this.b = 0.75; // BM25 length normalization parameter
  }

  /**
   * Tokenize and clean text
   */
  tokenize(text) {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2 && !STOPWORDS.has(token));
  }

  /**
   * Build BM25 inverted index from documents
   */
  buildBM25Index(documents) {
    console.log(
      "[HybridSearch] Building BM25 index for",
      documents.length,
      "documents"
    );

    const index = {
      docCount: documents.length,
      avgDocLength: 0,
      docLengths: [],
      termFreqs: {}, // term -> [{ docId, freq }]
      docIds: [],
    };

    let totalLength = 0;

    // First pass: collect term frequencies
    documents.forEach((doc, docId) => {
      const text = `${doc.summary || ""} ${JSON.stringify(doc.data || {})}`;
      const tokens = this.tokenize(text);

      index.docIds.push(doc.id);
      index.docLengths.push(tokens.length);
      totalLength += tokens.length;

      // Count term frequencies for this doc
      const termCounts = {};
      tokens.forEach((token) => {
        termCounts[token] = (termCounts[token] || 0) + 1;
      });

      // Update inverted index
      Object.entries(termCounts).forEach(([term, freq]) => {
        if (!index.termFreqs[term]) {
          index.termFreqs[term] = [];
        }
        index.termFreqs[term].push({ docId, freq });
      });
    });

    index.avgDocLength = totalLength / documents.length;

    // Calculate IDF for each term
    index.idf = {};
    Object.entries(index.termFreqs).forEach(([term, postings]) => {
      const docFreq = postings.length;
      index.idf[term] = Math.log(
        (index.docCount - docFreq + 0.5) / (docFreq + 0.5) + 1
      );
    });

    this.bm25Index = index;
    console.log(
      "[HybridSearch] Index built:",
      Object.keys(index.termFreqs).length,
      "unique terms"
    );

    return index;
  }

  /**
   * Calculate BM25 score for a query and document
   */
  calculateBM25(query, docId) {
    if (!this.bm25Index) return 0;

    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) return 0;

    const index = this.bm25Index;
    const docLength = index.docLengths[docId] || 0;
    let score = 0;

    queryTokens.forEach((term) => {
      const postings = index.termFreqs[term];
      if (!postings) return;

      const posting = postings.find((p) => p.docId === docId);
      if (!posting) return;

      const tf = posting.freq;
      const idf = index.idf[term] || 0;
      const norm =
        this.k1 * (1 - this.b + this.b * (docLength / index.avgDocLength));

      score += idf * ((tf * (this.k1 + 1)) / (tf + norm));
    });

    return score;
  }

  /**
   * Normalize scores to 0-1 range
   */
  normalizeScores(scores) {
    if (scores.length === 0) return scores;
    const max = Math.max(...scores.map((s) => s.score));
    const min = Math.min(...scores.map((s) => s.score));
    const range = max - min || 1;

    return scores.map((item) => ({
      ...item,
      score: (item.score - min) / range,
    }));
  }

  /**
   * Hybrid search combining semantic and keyword matching
   */
  hybridSearch(query, documents, queryEmbedding, options = {}) {
    const {
      semanticWeight = 0.7,
      keywordWeight = 0.3,
      cosineSimilarityFn = null,
    } = options;

    if (!this.bm25Index) {
      console.log("[HybridSearch] Building BM25 index on first search");
      this.buildBM25Index(documents);
    }

    const results = [];

    documents.forEach((doc, idx) => {
      // Semantic score (cosine similarity)
      let semanticScore = 0;
      if (queryEmbedding && doc.embedding && cosineSimilarityFn) {
        semanticScore = cosineSimilarityFn(queryEmbedding, doc.embedding);
      }

      // Keyword score (BM25)
      const bm25Score = this.calculateBM25(query, idx);

      // Combined hybrid score
      const hybridScore =
        semanticScore * semanticWeight + bm25Score * keywordWeight;

      results.push({
        ...doc,
        semanticScore,
        bm25Score,
        hybridScore,
        originalIndex: idx,
      });
    });

    // Normalize BM25 scores
    const maxBM25 = Math.max(...results.map((r) => r.bm25Score), 1);
    results.forEach((r) => {
      r.bm25Score = r.bm25Score / maxBM25;
      // Recalculate hybrid with normalized BM25
      r.hybridScore =
        r.semanticScore * semanticWeight + r.bm25Score * keywordWeight;
    });

    console.log(
      "[HybridSearch] Top result scores:",
      results.slice(0, 3).map((r) => ({
        id: r.id,
        semantic: r.semanticScore.toFixed(3),
        bm25: r.bm25Score.toFixed(3),
        hybrid: r.hybridScore.toFixed(3),
      }))
    );

    return results;
  }

  /**
   * Load BM25 index from cache
   */
  loadFromCache() {
    try {
      const cached = localStorage.getItem("rag_bm25_index");
      if (cached) {
        this.bm25Index = JSON.parse(cached);
        console.log("[HybridSearch] Loaded BM25 index from cache");
        return true;
      }
    } catch (error) {
      console.warn("[HybridSearch] Failed to load cache:", error.message);
    }
    return false;
  }

  /**
   * Save BM25 index to cache
   */
  saveToCache() {
    try {
      if (this.bm25Index) {
        localStorage.setItem("rag_bm25_index", JSON.stringify(this.bm25Index));
        console.log("[HybridSearch] Saved BM25 index to cache");
      }
    } catch (error) {
      console.warn("[HybridSearch] Failed to save cache:", error.message);
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    localStorage.removeItem("rag_bm25_index");
    this.bm25Index = null;
  }
}

export default HybridSearch;
