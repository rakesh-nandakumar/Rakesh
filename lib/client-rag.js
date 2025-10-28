/**
 * Client-Side RAG (Retrieval-Augmented Generation) Engine
 *
 * Automatically loads data from source JSON files and generates summaries on-the-fly.
 * NO manual summary maintenance required - updates to source JSONs are automatically reflected.
 *
 * Architecture:
 * 1. Load manifest (rag-manifest.json) - defines how to process each JSON
 * 2. Load source JSONs (about, timeline, portfolio, etc.)
 * 3. Generate summaries using templates from manifest
 * 4. Create embeddings for semantic search
 * 5. Perform RAG: query -> search -> retrieve -> build prompt -> call Gemini
 */

const CONFIG = {
  EMBEDDING_MODEL: "text-embedding-004",
  CHAT_MODEL: "gemini-2.0-flash-exp",
  MAX_TOKENS: 2000,
  TEMPERATURE: 0.7,
  CACHE_VERSION: "3.0.0",
  CACHE_TTL: 24 * 60 * 60 * 1000,
};

export class ClientRAG {
  constructor() {
    this.manifest = null;
    this.sourceData = {};
    this.embeddings = [];
    this.apiKey = null;
    this.isInitialized = false;
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
  }

  async search(query, options = {}) {
    const {
      topK = this.manifest.retrievalRules.defaultTopK,
      minScore = this.manifest.retrievalRules.minSimilarityScore,
      includeAlways = true,
    } = options;
    const queryEmbedding = await this.embed(query);
    const results = this.embeddings.map((item) => {
      const similarity = this.cosineSimilarity(queryEmbedding, item.embedding);
      const priorityBoost =
        this.manifest.retrievalRules.priorityBoost[item.priority] || 1.0;
      const boostedScore = similarity * priorityBoost;
      return { ...item, similarity, boostedScore };
    });
    let filtered = results.filter((r) => r.similarity >= minScore);
    filtered.sort((a, b) => b.boostedScore - a.boostedScore);
    if (includeAlways) {
      const alwaysIncluded = this.embeddings
        .filter((e) => e.alwaysInclude)
        .map((item) => ({
          ...item,
          similarity: 1.0,
          boostedScore: 1.0,
          alwaysIncluded: true,
        }));
      const existingIds = new Set(filtered.map((r) => r.id));
      alwaysIncluded.forEach((item) => {
        if (!existingIds.has(item.id)) filtered.unshift(item);
      });
    }
    return filtered.slice(0, topK + (includeAlways ? 2 : 0));
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

  async chat(query, options = {}) {
    if (!this.isInitialized)
      throw new Error("RAG not initialized. Call initialize() first.");
    try {
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
      const data = await response.json();
      const answer = data.candidates[0].content.parts[0].text;
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
    ["rag_embeddings", "rag_version", "rag_api_key"].forEach((key) =>
      localStorage.removeItem(key)
    );
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("rag_query_")) localStorage.removeItem(key);
    });
  }

  clearEmbeddingsCache() {
    localStorage.removeItem("rag_embeddings");
    localStorage.removeItem("rag_version");
    this.embeddings = [];
    this.isInitialized = false;
  }

  getCacheStats() {
    let queryCount = 0,
      totalSize = 0;
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
