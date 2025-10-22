/**
 * Client-Side RAG (Retrieval-Augmented Generation) Engine
 *
 * Automatically loads data from source JSON files and generates summaries on-the-fly.
 * NO manual summary maintenance required - updates to source JSONs are automatically reflected.
 *
 * Architecture:
 * 1. Load manifest (ai-data-manifest.json) - defines how to process each JSON
 * 2. Load source JSONs (about, timeline, portfolio, etc.)
 * 3. Generate summaries using templates from manifest
 * 4. Create embeddings for semantic search
 * 5. Perform RAG: query → search → retrieve → build prompt → call OpenAI
 */

const CONFIG = {
  EMBEDDING_MODEL: "text-embedding-3-small",
  CHAT_MODEL: "gpt-4o-mini",
  EMBEDDING_DIMENSIONS: 1536,
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.7,
  CACHE_VERSION: "2.0.0", // Increment to invalidate old cache
  CACHE_TTL: 24 * 60 * 60 * 1000, // 24 hours
};

export class ClientRAG {
  constructor() {
    this.manifest = null;
    this.sourceData = {}; // Raw JSON data from source files
    this.embeddings = []; // Generated embeddings with metadata
    this.apiKey = null;
    this.isInitialized = false;
  }

  /**
   * Initialize RAG system by loading manifest and source data
   */
  async initialize() {
    try {
      console.log("[RAG] Starting initialization...");

      // Load manifest
      this.manifest = await this.loadJSON("/data/ai-data-manifest.json");
      console.log(
        "[RAG] Manifest loaded:",
        Object.keys(this.manifest.files).length,
        "files"
      );

      // Load all source JSON files
      await this.loadSourceData();
      console.log("[RAG] Source data loaded");

      // Check if we have cached embeddings
      const cachedEmbeddings = this.loadFromCache("rag_embeddings");
      const cachedVersion = this.loadFromCache("rag_version");

      if (cachedEmbeddings && cachedVersion === CONFIG.CACHE_VERSION) {
        console.log("[RAG] Using cached embeddings");
        this.embeddings = cachedEmbeddings;
      } else {
        console.log(
          "[RAG] Generating embeddings (first time or cache invalidated)..."
        );
        await this.generateAllEmbeddings();
        this.saveToCache("rag_embeddings", this.embeddings);
        this.saveToCache("rag_version", CONFIG.CACHE_VERSION);
        console.log("[RAG] Embeddings cached");
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

  /**
   * Load all source JSON files defined in manifest
   */
  async loadSourceData() {
    const fileNames = Object.keys(this.manifest.files);

    for (const fileName of fileNames) {
      try {
        const data = await this.loadJSON(`/data/${fileName}`);
        this.sourceData[fileName] = data;
      } catch (error) {
        console.warn(`[RAG] Failed to load ${fileName}:`, error.message);
        this.sourceData[fileName] = null;
      }
    }
  }

  /**
   * Generate summaries from source data using manifest templates
   */
  generateSummaries() {
    const summaries = [];

    for (const [fileName, config] of Object.entries(this.manifest.files)) {
      const sourceData = this.sourceData[fileName];
      if (!sourceData) continue;

      // Handle array-based data (timeline, portfolio, blogs, etc.)
      if (config.itemArrayPath) {
        const items =
          this.getNestedValue(sourceData, config.itemArrayPath) || [];

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
            fileName: fileName,
            itemIndex: index,
            type: "item",
            summary: summary,
            priority: config.priority,
            data: includedFields,
            fullData: item, // Store for on-demand retrieval
            metadata: {
              category: item.category,
              title: item.title,
              status: item.status,
            },
          });
        });
      }
      // Handle single-object data (about, site-config, header)
      else {
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
          fileName: fileName,
          type: "file",
          summary: summary,
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

  /**
   * Apply template to data object
   * Template: "{name} is {title}" → "Rakesh is Software Engineer"
   */
  applyTemplate(template, data, config) {
    if (!template) {
      // Fallback: create summary from included fields
      return JSON.stringify(this.extractIncludedFields(data, config.fields));
    }

    return template.replace(/\{([^}]+)\}/g, (match, path) => {
      const value = this.getNestedValue(data, path);
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object") return JSON.stringify(value);
      return value || "";
    });
  }

  /**
   * Extract only included fields based on manifest rules
   */
  extractIncludedFields(data, fieldRules) {
    if (!fieldRules) return data;

    const result = {};
    const includeAll = fieldRules.include?.includes("*");

    if (includeAll) {
      Object.assign(result, data);
    } else {
      fieldRules.include?.forEach((path) => {
        const value = this.getNestedValue(data, path);
        if (value !== undefined) {
          this.setNestedValue(result, path, value);
        }
      });
    }

    // Remove excluded fields
    fieldRules.exclude?.forEach((path) => {
      this.deleteNestedValue(result, path);
    });

    return result;
  }

  /**
   * Get nested value from object using dot notation
   * Example: getNestedValue(obj, "contact.email")
   */
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  /**
   * Set nested value in object using dot notation
   */
  setNestedValue(obj, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      current[key] = current[key] || {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  /**
   * Delete nested value from object
   */
  deleteNestedValue(obj, path) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => current?.[key], obj);
    if (target) delete target[lastKey];
  }

  /**
   * Generate embeddings for all summaries
   */
  async generateAllEmbeddings() {
    if (!this.apiKey) {
      throw new Error("API key not set. Call setApiKey() first.");
    }

    const summaries = this.generateSummaries();
    this.embeddings = [];

    for (const summary of summaries) {
      try {
        const embedding = await this.embed(summary.summary);
        this.embeddings.push({
          ...summary,
          embedding: embedding,
        });
      } catch (error) {
        console.error(`[RAG] Failed to embed ${summary.id}:`, error.message);
      }
    }

    return this.embeddings;
  }

  /**
   * Generate embedding for text using OpenAI API
   */
  async embed(text) {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: CONFIG.EMBEDDING_MODEL,
        input: text,
        dimensions: CONFIG.EMBEDDING_DIMENSIONS,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Embedding API error: ${error.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.data[0].embedding;
  }

  /**
   * Semantic search using cosine similarity
   */
  async search(query, options = {}) {
    const {
      topK = this.manifest.retrievalRules.defaultTopK,
      minScore = this.manifest.retrievalRules.minSimilarityScore,
      includeAlways = true,
    } = options;

    // Generate query embedding
    const queryEmbedding = await this.embed(query);

    // Calculate similarity scores with priority boost
    const results = this.embeddings.map((item) => {
      const similarity = this.cosineSimilarity(queryEmbedding, item.embedding);
      const priorityBoost =
        this.manifest.retrievalRules.priorityBoost[item.priority] || 1.0;
      const boostedScore = similarity * priorityBoost;

      return {
        ...item,
        similarity: similarity,
        boostedScore: boostedScore,
      };
    });

    // Filter and sort
    let filtered = results.filter((r) => r.similarity >= minScore);
    filtered.sort((a, b) => b.boostedScore - a.boostedScore);

    // Include "always include" items
    if (includeAlways) {
      const alwaysIncluded = this.embeddings
        .filter((e) => e.alwaysInclude)
        .map((item) => ({
          ...item,
          similarity: 1.0,
          boostedScore: 1.0,
          alwaysIncluded: true,
        }));

      // Merge without duplicates
      const existingIds = new Set(filtered.map((r) => r.id));
      alwaysIncluded.forEach((item) => {
        if (!existingIds.has(item.id)) {
          filtered.unshift(item); // Add to beginning
        }
      });
    }

    // Return top K
    return filtered.slice(0, topK + (includeAlways ? 2 : 0));
  }

  /**
   * Cosine similarity between two vectors
   */
  cosineSimilarity(a, b) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

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

  /**
   * Build token-efficient prompt with retrieved context
   */
  buildPrompt(query, retrievedItems) {
    const systemPrompt = `You are an AI assistant for Rakesh Nandakumar's portfolio website. 
Answer questions about his experience, skills, projects, and services based on the provided context.

Guidelines:
- Use only the provided context to answer
- Be concise and professional
- Include specific details (dates, technologies, project names)
- If information is not in context, say "I don't have that information"
- Cite sources when relevant`;

    const contextSections = retrievedItems
      .map((item, idx) => {
        return `[Source ${idx + 1}: ${item.fileName}${
          item.itemIndex !== undefined ? ` - Item ${item.itemIndex}` : ""
        }]
${item.summary}

Data: ${JSON.stringify(item.data, null, 2)}`;
      })
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
   * Main chat function - complete RAG pipeline
   */
  async chat(query, options = {}) {
    if (!this.isInitialized) {
      throw new Error("RAG not initialized. Call initialize() first.");
    }

    try {
      // Check cache first
      const cacheKey = `rag_query_${this.hashString(query)}`;
      const cached = this.loadFromCache(cacheKey);

      if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
        console.log("[RAG] Using cached response");
        return {
          ...cached,
          fromCache: true,
        };
      }

      // 1. Semantic search
      const retrievedItems = await this.search(query, options);
      console.log("[RAG] Retrieved", retrievedItems.length, "items");

      // 2. Build prompt
      const { messages, sources } = this.buildPrompt(query, retrievedItems);

      // 3. Call OpenAI
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: CONFIG.CHAT_MODEL,
            messages: messages,
            max_tokens: CONFIG.MAX_TOKENS,
            temperature: CONFIG.TEMPERATURE,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `Chat API error: ${error.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const answer = data.choices[0].message.content;

      const result = {
        answer: answer,
        sources: sources,
        usage: data.usage,
        model: CONFIG.CHAT_MODEL,
        timestamp: Date.now(),
      };

      // Cache the response
      this.saveToCache(cacheKey, result);

      return result;
    } catch (error) {
      console.error("[RAG] Chat error:", error);
      throw error;
    }
  }

  /**
   * Fetch full details for a specific source item
   */
  async fetchFullDetails(sourceId) {
    const item = this.embeddings.find((e) => e.id === sourceId);
    if (!item) {
      throw new Error(`Source ${sourceId} not found`);
    }

    return {
      id: item.id,
      fileName: item.fileName,
      summary: item.summary,
      fullData: item.fullData,
      metadata: item.metadata,
    };
  }

  /**
   * Set OpenAI API key
   */
  setApiKey(key) {
    this.apiKey = key;
    this.saveToCache("rag_api_key", key);
  }

  /**
   * Load API key from cache
   */
  loadApiKey() {
    const key = this.loadFromCache("rag_api_key");
    if (key) {
      this.apiKey = key;
      return true;
    }
    return false;
  }

  /**
   * Get current API key
   */
  getApiKey() {
    return this.apiKey;
  }

  /**
   * Clear all caches
   */
  clearCache() {
    const keys = ["rag_embeddings", "rag_version", "rag_api_key"];
    keys.forEach((key) => localStorage.removeItem(key));

    // Clear query caches
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("rag_query_")) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    let queryCount = 0;
    let totalSize = 0;

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("rag_")) {
        queryCount++;
        totalSize += localStorage.getItem(key).length;
      }
    });

    return {
      queryCacheCount: queryCount,
      embeddingsCount: this.embeddings.length,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      version: CONFIG.CACHE_VERSION,
    };
  }

  // Helper methods
  async loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }
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
