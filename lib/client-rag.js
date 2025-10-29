/**
 * Client-Side RAG (Retrieval-Augmented Generation) Engine
 *
 * Enhanced with:
 * - Hybrid Search (Semantic + BM25 keyword matching)
 * - Query Enhancement (synonyms, intent detection, variations)
 * - Contextual Re-ranking (LLM scoring, MMR diversity, temporal boosting)
 * - Smart Chunking (semantic boundaries, hierarchical parent-child)
 * - Conversation history context
 *
 * Architecture:
 * 1. Load manifest (rag-manifest.json) - defines how to process each JSON
 * 2. Load source JSONs (about, timeline, portfolio, etc.)
 * 3. Generate summaries using templates from manifest
 * 4. Create embeddings for semantic search
 * 5. Perform RAG: query -> search -> retrieve -> build prompt -> call Gemini
 */

import HybridSearch from "./hybrid-search.js";
import QueryEnhancer from "./query-enhancer.js";
import ContextualReranker from "./reranker.js";
import SmartChunker from "./chunker.js";

const CONFIG = {
  EMBEDDING_MODEL: "text-embedding-004",
  CHAT_MODEL: "gemini-2.0-flash-exp",
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.7,
  CACHE_VERSION: "4.0.0", // Bumped for hybrid search + enhancements
  CACHE_TTL: 24 * 60 * 60 * 1000,
  // Retry configuration for handling overloaded models
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // Initial delay in ms (1 second)
  RETRY_MULTIPLIER: 2, // Exponential backoff multiplier
  // Feature flags
  ENABLE_HYBRID_SEARCH: true,
  ENABLE_QUERY_ENHANCEMENT: true,
  ENABLE_LLM_RERANKING: false, // Slower, optional
  ENABLE_DIVERSITY: true,
  ENABLE_TEMPORAL_BOOSTING: true,
  ENABLE_CONVERSATION_CONTEXT: true,
  ENABLE_SMART_CHUNKING: false, // Experimental
};

export class ClientRAG {
  constructor() {
    this.manifest = null;
    this.sourceData = {};
    this.embeddings = [];
    this.apiKey = null;
    this.isInitialized = false;
    this.conversationHistory = [];

    // Initialize enhancement modules
    this.hybridSearch = new HybridSearch();
    this.queryEnhancer = new QueryEnhancer();
    this.reranker = new ContextualReranker(this);
    this.chunker = new SmartChunker({ chunkSize: 500, chunkOverlap: 100 });
  }

  async initialize() {
    try {
      console.log("[RAG] Starting initialization...");
      this.manifest = await this.loadJSON("/api/data?type=rag-manifest");
      if (!this.manifest || !this.manifest.files) {
        throw new Error("Invalid manifest format: missing 'files' property");
      }
      console.log(
        "[RAG] Manifest loaded:",
        Object.keys(this.manifest.files).length,
        "files"
      );
      await this.loadSourceData();
      console.log("[RAG] Source data loaded");

      // Load or build embeddings
      const cachedEmbeddings = this.loadFromCache("rag_embeddings");
      const cachedVersion = this.loadFromCache("rag_version");
      if (cachedEmbeddings && cachedVersion === CONFIG.CACHE_VERSION) {
        console.log("[RAG] Using cached embeddings");
        this.embeddings = cachedEmbeddings;
      } else {
        console.log("[RAG] Generating embeddings...");
        await this.generateAllEmbeddings();
        this.saveToCache("rag_embeddings", this.embeddings);
        this.saveToCache("rag_version", CONFIG.CACHE_VERSION);
      }

      // Load or build BM25 index for hybrid search
      if (CONFIG.ENABLE_HYBRID_SEARCH) {
        const loaded = this.hybridSearch.loadFromCache();
        if (!loaded || cachedVersion !== CONFIG.CACHE_VERSION) {
          console.log("[RAG] Building BM25 index...");
          this.hybridSearch.buildBM25Index(this.embeddings);
          this.hybridSearch.saveToCache();
        }
      }

      this.isInitialized = true;
      console.log(
        "[RAG] Initialization complete!",
        this.embeddings.length,
        "embeddings ready"
      );
      return {
        success: true,
        embeddingsCount: this.embeddings.length,
        filesLoaded: Object.keys(this.sourceData).length,
      };
    } catch (error) {
      console.error("[RAG] Initialization failed:", error);
      throw new Error(`Failed to initialize RAG: ${error.message}`);
    }
  }

  async loadSourceData() {
    const fileNames = Object.keys(this.manifest.files);
    for (const fileName of fileNames) {
      try {
        const typeName = fileName.replace(".json", "");
        const data = await this.loadJSON(`/api/data?type=${typeName}`);
        this.sourceData[fileName] = data;
      } catch (error) {
        console.warn(`[RAG] Failed to load ${fileName}:`, error.message);
        this.sourceData[fileName] = null;
      }
    }
  }

  generateSummaries() {
    const summaries = [];
    for (const [fileName, config] of Object.entries(this.manifest.files)) {
      const sourceData = this.sourceData[fileName];
      if (!sourceData) continue;

      // Handle arrays (either at root level or nested)
      if (config.isRootArray || config.itemArrayPath) {
        let items = [];

        if (config.isRootArray) {
          // Data is already an array at root level
          items = Array.isArray(sourceData) ? sourceData : [];
        } else if (config.itemArrayPath) {
          // Data is nested in an object
          items = this.getNestedValue(sourceData, config.itemArrayPath) || [];
        }

        items.forEach((item, index) => {
          const summary = this.applyTemplate(
            config.itemSummaryTemplate,
            item,
            config
          );
          const includedFields = this.extractIncludedFields(
            item,
            config.fields
          );
          summaries.push({
            id: `${fileName}:${index}`,
            fileName,
            itemIndex: index,
            type: "item",
            summary,
            priority: config.priority,
            data: includedFields,
            fullData: item,
            metadata: {
              category: item.category,
              title: item.title,
              status: item.status,
            },
          });
        });
      } else {
        // Handle single object files
        const summary = this.applyTemplate(
          config.summaryTemplate,
          sourceData,
          config
        );
        const includedFields = this.extractIncludedFields(
          sourceData,
          config.fields
        );
        summaries.push({
          id: fileName,
          fileName,
          type: "file",
          summary,
          priority: config.priority,
          alwaysInclude: config.alwaysInclude,
          data: includedFields,
          fullData: sourceData,
          metadata: {},
        });
      }
    }
    return summaries;
  }

  applyTemplate(template, data, config) {
    if (!template)
      return JSON.stringify(this.extractIncludedFields(data, config.fields));
    return template.replace(/\{([^}]+)\}/g, (_, path) => {
      const value = this.getNestedValue(data, path);
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object") return JSON.stringify(value);
      return value || "";
    });
  }

  extractIncludedFields(data, fieldRules) {
    if (!fieldRules) return data;
    const result = {};
    const includeAll = fieldRules.include?.includes("*");
    if (includeAll) {
      Object.assign(result, data);
    } else {
      fieldRules.include?.forEach((path) => {
        const value = this.getNestedValue(data, path);
        if (value !== undefined) this.setNestedValue(result, path, value);
      });
    }
    fieldRules.exclude?.forEach((path) => {
      this.deleteNestedValue(result, path);
    });
    return result;
  }

  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  setNestedValue(obj, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      current[key] = current[key] || {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  deleteNestedValue(obj, path) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => current?.[key], obj);
    if (target) delete target[lastKey];
  }

  async generateAllEmbeddings() {
    if (!this.apiKey)
      throw new Error("API key not set. Call setApiKey() first.");
    const summaries = this.generateSummaries();
    this.embeddings = [];
    for (const summary of summaries) {
      try {
        const embedding = await this.embed(summary.summary);
        this.embeddings.push({ ...summary, embedding });
      } catch (error) {
        console.error(`[RAG] Failed to embed ${summary.id}:`, error.message);
      }
    }
    return this.embeddings;
  }

  async embed(text) {
    return await this.retryWithBackoff(async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.EMBEDDING_MODEL}:embedContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: `models/${CONFIG.EMBEDDING_MODEL}`,
            content: { parts: [{ text }] },
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `Embedding API error: ${error.error?.message || response.statusText}`
        );
      }
      const data = await response.json();
      return data.embedding.values;
    });
  }

  async search(query, options = {}) {
    const {
      topK = this.manifest.retrievalRules.defaultTopK,
      minScore = this.manifest.retrievalRules.minSimilarityScore,
      includeAlways = true,
    } = options;

    console.log("[RAG:Search] Processing query:", query);

    // Step 1: Query Enhancement
    let enhancedQuery = query;
    let queryEmbedding = null;
    let intents = [];

    if (CONFIG.ENABLE_QUERY_ENHANCEMENT) {
      const enhanced = await this.queryEnhancer.enhance(query, this);
      enhancedQuery = enhanced.expandedQuery;
      queryEmbedding = enhanced.embedding || (await this.embed(query));
      intents = enhanced.intents;
      console.log(
        "[RAG:Search] Query enhanced, primary intent:",
        enhanced.primaryIntent
      );
    } else {
      queryEmbedding = await this.embed(query);
    }

    // Step 2: Hybrid Search (Semantic + BM25)
    let results;
    if (CONFIG.ENABLE_HYBRID_SEARCH) {
      results = this.hybridSearch.hybridSearch(
        enhancedQuery,
        this.embeddings,
        queryEmbedding,
        {
          semanticWeight: 0.7,
          keywordWeight: 0.3,
          cosineSimilarityFn: this.cosineSimilarity.bind(this),
        }
      );
    } else {
      // Fallback to semantic-only search
      results = this.embeddings.map((item) => {
        const similarity = this.cosineSimilarity(
          queryEmbedding,
          item.embedding
        );
        return { ...item, similarity, hybridScore: similarity };
      });
    }

    // Apply priority boost
    results.forEach((r) => {
      const priorityBoost =
        this.manifest.retrievalRules.priorityBoost[r.priority] || 1.0;
      r.hybridScore = r.hybridScore * priorityBoost;
    });

    // Apply intent-based boosting
    if (CONFIG.ENABLE_QUERY_ENHANCEMENT && intents.length > 0) {
      results = this.queryEnhancer.applyIntentBoosting(results, intents);
    }

    // Filter by minimum score
    let filtered = results.filter(
      (r) => (r.similarity || r.hybridScore) >= minScore
    );

    // Include "always include" items
    if (includeAlways) {
      const alwaysIncluded = this.embeddings
        .filter((e) => e.alwaysInclude)
        .map((item) => ({
          ...item,
          similarity: 1.0,
          hybridScore: 1.0,
          alwaysIncluded: true,
        }));
      const existingIds = new Set(filtered.map((r) => r.id));
      alwaysIncluded.forEach((item) => {
        if (!existingIds.has(item.id)) filtered.unshift(item);
      });
    }

    // Sort by score
    filtered.sort((a, b) => (b.hybridScore || 0) - (a.hybridScore || 0));

    // Step 3: Re-ranking
    if (
      CONFIG.ENABLE_LLM_RERANKING ||
      CONFIG.ENABLE_DIVERSITY ||
      CONFIG.ENABLE_TEMPORAL_BOOSTING
    ) {
      filtered = await this.reranker.rerank(query, filtered, {
        useLLM: CONFIG.ENABLE_LLM_RERANKING,
        useDiversity: CONFIG.ENABLE_DIVERSITY,
        useTemporal: CONFIG.ENABLE_TEMPORAL_BOOSTING,
        useContext:
          CONFIG.ENABLE_CONVERSATION_CONTEXT &&
          this.conversationHistory.length > 0,
        conversationHistory: this.conversationHistory,
      });
    }

    // Return top-K results
    const finalResults = filtered.slice(0, topK + (includeAlways ? 2 : 0));
    console.log("[RAG:Search] Returning", finalResults.length, "results");

    return finalResults;
  }

  cosineSimilarity(a, b) {
    let dotProduct = 0,
      magnitudeA = 0,
      magnitudeB = 0;
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  buildPrompt(query, retrievedItems) {
    const systemInstructions = this.manifest.systemInstructions || {};
    const systemPrompt = `${
      systemInstructions.role ||
      "You are an AI assistant for Rakesh Nandakumar's portfolio website."
    }

${
  systemInstructions.personality ||
  "Be professional, knowledgeable, and helpful."
}

Guidelines:
${(
  systemInstructions.guidelines || [
    "Provide accurate information based on the provided context",
    "Be concise and professional",
    "If information is not in context, say so",
  ]
)
  .map((g) => `- ${g}`)
  .join("\n")}

Response Format: ${
      systemInstructions.responseFormat ||
      "Keep responses concise but informative"
    }`;
    const contextSections = retrievedItems
      .map(
        (item, idx) =>
          `[Source ${idx + 1}: ${item.fileName}${
            item.itemIndex !== undefined ? ` - Item ${item.itemIndex}` : ""
          }]\n${item.summary}\n\nData: ${JSON.stringify(item.data, null, 2)}`
      )
      .join("\n\n---\n\n");
    const userPrompt = `Context:\n${contextSections}\n\nQuestion: ${query}\n\nAnswer:`;
    return {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      sources: retrievedItems.map((item) => ({
        id: item.id,
        fileName: item.fileName,
        similarity: item.similarity,
        summary: item.summary,
        hasFullData: !!item.fullData,
      })),
    };
  }

  /**
   * Retry helper with exponential backoff for handling overloaded API
   */
  async retryWithBackoff(fn, maxRetries = CONFIG.MAX_RETRIES) {
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        const isRetryable = 
          error.message?.includes('overloaded') ||
          error.message?.includes('429') ||
          error.message?.includes('503') ||
          error.message?.includes('rate limit');
        
        if (!isRetryable || attempt === maxRetries) {
          throw error;
        }

        const delay = CONFIG.RETRY_DELAY * Math.pow(CONFIG.RETRY_MULTIPLIER, attempt);
        console.log(`[RAG] API overloaded, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw lastError;
  }

  async chat(query, options = {}) {
    if (!this.isInitialized)
      throw new Error("RAG not initialized. Call initialize() first.");
    try {
      // Track conversation history for context boosting
      this.conversationHistory.push({
        role: "user",
        content: query,
        timestamp: Date.now(),
      });
      // Keep only last 10 messages
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      const cacheKey = `rag_query_${this.hashString(query)}`;
      const cached = this.loadFromCache(cacheKey);
      if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
        console.log("[RAG] Using cached response");
        return { ...cached, fromCache: true };
      }
      const retrievedItems = await this.search(query, options);
      console.log("[RAG] Retrieved", retrievedItems.length, "items");
      const { messages, sources } = this.buildPrompt(query, retrievedItems);
      const systemPrompt =
        messages.find((m) => m.role === "system")?.content || "";
      const userPrompt =
        messages.find((m) => m.role === "user")?.content || query;

      // Use retry mechanism for API call
      const data = await this.retryWithBackoff(async () => {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.CHAT_MODEL}:generateContent?key=${this.apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
              ],
              generationConfig: {
                temperature: CONFIG.TEMPERATURE,
                maxOutputTokens: CONFIG.MAX_TOKENS,
              },
            }),
          }
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            `Chat API error: ${error.error?.message || response.statusText}`
          );
        }
        return await response.json();
      });

      const answer = data.candidates[0].content.parts[0].text;

      // Track assistant response in conversation history
      this.conversationHistory.push({
        role: "assistant",
        content: answer,
        timestamp: Date.now(),
      });
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      const result = {
        answer,
        sources,
        usage: {
          total_tokens: data.usageMetadata?.totalTokenCount || 0,
          prompt_tokens: data.usageMetadata?.promptTokenCount || 0,
          completion_tokens: data.usageMetadata?.candidatesTokenCount || 0,
        },
        model: CONFIG.CHAT_MODEL,
        timestamp: Date.now(),
      };
      this.saveToCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error("[RAG] Chat error:", error);
      throw error;
    }
  }

  async fetchFullDetails(sourceId) {
    const item = this.embeddings.find((e) => e.id === sourceId);
    if (!item) throw new Error(`Source ${sourceId} not found`);
    return {
      id: item.id,
      fileName: item.fileName,
      summary: item.summary,
      fullData: item.fullData,
      metadata: item.metadata,
    };
  }

  setApiKey(key) {
    this.apiKey = key;
    this.saveToCache("rag_api_key", key);
  }

  loadApiKey() {
    const key = this.loadFromCache("rag_api_key");
    if (key) {
      this.apiKey = key;
      return true;
    }
    return false;
  }

  getApiKey() {
    return this.apiKey;
  }

  clearCache() {
    ["rag_embeddings", "rag_version", "rag_api_key", "rag_bm25_index"].forEach(
      (key) => localStorage.removeItem(key)
    );
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("rag_query_")) localStorage.removeItem(key);
    });
    // Clear module-specific caches
    if (this.hybridSearch) this.hybridSearch.clearCache();
    console.log("[RAG] All caches cleared");
  }

  clearEmbeddingsCache() {
    localStorage.removeItem("rag_embeddings");
    localStorage.removeItem("rag_version");
    localStorage.removeItem("rag_bm25_index"); // BM25 index depends on embeddings
    this.embeddings = [];
    this.isInitialized = false;
    if (this.hybridSearch) this.hybridSearch.clearCache();
    console.log("[RAG] Embeddings and BM25 caches cleared");
  }

  getCacheStats() {
    let queryCount = 0,
      totalSize = 0,
      embeddingsSize = 0,
      bm25Size = 0;

    Object.keys(localStorage).forEach((key) => {
      const item = localStorage.getItem(key);
      const itemSize = item ? item.length : 0;

      if (key.startsWith("rag_")) {
        if (key === "rag_embeddings") {
          embeddingsSize = itemSize;
        } else if (key === "rag_bm25_index") {
          bm25Size = itemSize;
        } else if (key.startsWith("rag_query_")) {
          queryCount++;
        }
        totalSize += itemSize;
      }
    });

    return {
      queryCacheCount: queryCount,
      embeddingsCount: this.embeddings.length,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      embeddingsSizeKB: (embeddingsSize / 1024).toFixed(2),
      bm25IndexSizeKB: (bm25Size / 1024).toFixed(2),
      version: CONFIG.CACHE_VERSION,
    };
  }

  async loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok)
      throw new Error(`Failed to load ${path}: ${response.statusText}`);
    return response.json();
  }

  saveToCache(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("[RAG] Cache save failed:", error.message);
    }
  }

  loadFromCache(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn("[RAG] Cache load failed:", error.message);
      return null;
    }
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }
}

export default ClientRAG;
