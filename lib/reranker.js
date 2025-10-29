/**
 * Contextual Re-ranking Engine
 * LLM-based relevance scoring, MMR for diversity, and temporal boosting
 */

export class ContextualReranker {
  constructor(ragInstance) {
    this.ragInstance = ragInstance;
    this.lambda = 0.7; // MMR diversity parameter (0=max diversity, 1=max relevance)
  }

  /**
   * Use LLM to score relevance of each result to the query
   */
  async llmRerank(query, results, options = {}) {
    const { batchSize = 10, apiKey = null } = options;

    if (!apiKey && !this.ragInstance?.apiKey) {
      console.warn("[Reranker] No API key available, skipping LLM reranking");
      return results;
    }

    const key = apiKey || this.ragInstance.apiKey;
    const batches = [];

    // Process in batches to avoid token limits
    for (let i = 0; i < results.length; i += batchSize) {
      batches.push(results.slice(i, i + batchSize));
    }

    console.log(
      "[Reranker] LLM reranking",
      results.length,
      "items in",
      batches.length,
      "batches"
    );

    const rerankedResults = [];

    for (const batch of batches) {
      try {
        // Build prompt for batch scoring
        const itemsText = batch
          .map(
            (item, idx) =>
              `[${idx + 1}] ${
                item.summary || JSON.stringify(item.data).slice(0, 200)
              }`
          )
          .join("\n\n");

        const prompt = `Rate the relevance of each item to the query on a scale of 0-10.
Query: "${query}"

Items:
${itemsText}

Respond with ONLY a JSON array of scores in order: [score1, score2, ...]
Each score should be a number from 0 (not relevant) to 10 (highly relevant).`;

        // Use retry mechanism from ragInstance if available
        const data = await (this.ragInstance?.retryWithBackoff
          ? this.ragInstance.retryWithBackoff(async () => {
              const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                      temperature: 0.1,
                      maxOutputTokens: 200,
                    },
                  }),
                }
              );

              if (!response.ok) {
                const error = await response.json();
                throw new Error(
                  `LLM reranking failed: ${
                    error.error?.message || response.statusText
                  }`
                );
              }

              return await response.json();
            })
          : (async () => {
              const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                      temperature: 0.1,
                      maxOutputTokens: 200,
                    },
                  }),
                }
              );

              if (!response.ok) {
                throw new Error(`LLM reranking failed: ${response.statusText}`);
              }

              return await response.json();
            })());

        const text = data.candidates[0].content.parts[0].text;

        // Parse scores from response
        const scores = JSON.parse(text.match(/\[[\d,.\s]+\]/)?.[0] || "[]");

        // Apply scores to batch
        batch.forEach((item, idx) => {
          const llmScore = (scores[idx] || 5) / 10; // Normalize to 0-1
          rerankedResults.push({
            ...item,
            llmScore,
            rerankScore: item.hybridScore * 0.6 + llmScore * 0.4, // Blend with hybrid score
          });
        });
      } catch (error) {
        console.warn("[Reranker] LLM reranking batch failed:", error.message);
        // Fallback: use original scores
        batch.forEach((item) => {
          rerankedResults.push({
            ...item,
            llmScore: 0.5,
            rerankScore: item.hybridScore,
          });
        });
      }
    }

    return rerankedResults;
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(a, b) {
    if (!a || !b || a.length !== b.length) return 0;

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

  /**
   * Maximal Marginal Relevance (MMR) for diversity
   * Selects items that are relevant but diverse from already selected items
   */
  calculateMMR(results, lambda = null) {
    if (results.length <= 1) return results;

    const l = lambda !== null ? lambda : this.lambda;
    const selected = [];
    const remaining = [...results];

    console.log("[Reranker] Applying MMR with lambda=", l);

    // Select first item (highest score)
    remaining.sort(
      (a, b) =>
        (b.rerankScore || b.hybridScore) - (a.rerankScore || a.hybridScore)
    );
    selected.push(remaining.shift());

    // Iteratively select diverse items
    while (remaining.length > 0) {
      let bestScore = -Infinity;
      let bestIdx = 0;

      remaining.forEach((item, idx) => {
        const relevance = item.rerankScore || item.hybridScore;

        // Calculate max similarity to already selected items
        let maxSimilarity = 0;
        if (item.embedding) {
          selected.forEach((selectedItem) => {
            if (selectedItem.embedding) {
              const sim = this.cosineSimilarity(
                item.embedding,
                selectedItem.embedding
              );
              maxSimilarity = Math.max(maxSimilarity, sim);
            }
          });
        }

        // MMR score = lambda * relevance - (1-lambda) * max_similarity
        const mmrScore = l * relevance - (1 - l) * maxSimilarity;

        if (mmrScore > bestScore) {
          bestScore = mmrScore;
          bestIdx = idx;
        }
      });

      selected.push(remaining.splice(bestIdx, 1)[0]);
    }

    // Add MMR rank
    selected.forEach((item, idx) => {
      item.mmrRank = idx + 1;
    });

    console.log("[Reranker] MMR reordering complete, diversity improved");
    return selected;
  }

  /**
   * Apply temporal boosting to recent content
   */
  applyTemporalBoosting(results, options = {}) {
    const { decayRate = 0.1, maxBoost = 1.2 } = options;
    const now = Date.now();

    results.forEach((item) => {
      // Try to extract date from various fields
      let itemDate = null;

      if (item.data?.publishDate || item.data?.date) {
        itemDate = new Date(item.data.publishDate || item.data.date);
      } else if (item.data?.time) {
        // Try to parse timeline dates (e.g., "Sept 2024 - Present")
        const match = item.data.time.match(/(\w+\s+\d{4})/);
        if (match) {
          itemDate = new Date(match[1]);
        }
      }

      if (itemDate && !isNaN(itemDate.getTime())) {
        const ageInDays = (now - itemDate.getTime()) / (1000 * 60 * 60 * 24);
        const temporalBoost = Math.max(
          1.0,
          maxBoost - (ageInDays * decayRate) / 365
        );

        item.temporalBoost = temporalBoost;
        item.rerankScore =
          (item.rerankScore || item.hybridScore) * temporalBoost;
      }
    });

    return results;
  }

  /**
   * Apply conversation history context
   */
  applyConversationContext(results, conversationHistory) {
    if (!conversationHistory || conversationHistory.length === 0) {
      return results;
    }

    // Extract topics from recent conversation
    const recentTopics = new Set();
    conversationHistory.slice(-3).forEach((msg) => {
      if (msg.role === "user") {
        const words = msg.content.toLowerCase().split(/\s+/);
        words.forEach((word) => {
          if (word.length > 4) recentTopics.add(word);
        });
      }
    });

    console.log(
      "[Reranker] Conversation topics:",
      Array.from(recentTopics).join(", ")
    );

    // Boost results that match conversation topics
    results.forEach((item) => {
      const itemText = `${item.summary} ${JSON.stringify(
        item.data
      )}`.toLowerCase();
      let topicMatches = 0;

      recentTopics.forEach((topic) => {
        if (itemText.includes(topic)) {
          topicMatches++;
        }
      });

      if (topicMatches > 0) {
        const contextBoost = 1.0 + topicMatches * 0.1;
        item.contextBoost = contextBoost;
        item.rerankScore =
          (item.rerankScore || item.hybridScore) * contextBoost;
      }
    });

    return results;
  }

  /**
   * Full re-ranking pipeline
   */
  async rerank(query, results, options = {}) {
    const {
      useLLM = false,
      useDiversity = true,
      useTemporal = true,
      useContext = false,
      conversationHistory = null,
      lambda = null,
    } = options;

    console.log("[Reranker] Starting rerank pipeline:", {
      items: results.length,
      useLLM,
      useDiversity,
      useTemporal,
      useContext,
    });

    let reranked = [...results];

    // Initialize rerankScore with hybridScore
    reranked.forEach((item) => {
      if (!item.rerankScore) {
        item.rerankScore = item.hybridScore || item.similarity || 0;
      }
    });

    // 1. LLM-based relevance scoring (optional, slower)
    if (useLLM) {
      reranked = await this.llmRerank(query, reranked);
    }

    // 2. Temporal boosting
    if (useTemporal) {
      reranked = this.applyTemporalBoosting(reranked);
    }

    // 3. Conversation context
    if (useContext && conversationHistory) {
      reranked = this.applyConversationContext(reranked, conversationHistory);
    }

    // 4. Sort by rerank score
    reranked.sort((a, b) => (b.rerankScore || 0) - (a.rerankScore || 0));

    // 5. Apply MMR for diversity
    if (useDiversity) {
      reranked = this.calculateMMR(reranked, lambda);
    }

    console.log(
      "[Reranker] Reranking complete. Top 3 scores:",
      reranked.slice(0, 3).map((r) => ({
        id: r.id,
        rerank: r.rerankScore?.toFixed(3),
        llm: r.llmScore?.toFixed(3),
        temporal: r.temporalBoost?.toFixed(2),
        context: r.contextBoost?.toFixed(2),
      }))
    );

    return reranked;
  }

  /**
   * Set MMR lambda parameter
   */
  setLambda(lambda) {
    this.lambda = Math.max(0, Math.min(1, lambda));
  }
}

export default ContextualReranker;
