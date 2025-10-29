/**
 * Query Enhancement Engine
 * Expands queries with synonyms, detects intent, and generates variations
 */

export class QueryEnhancer {
  constructor() {
    // Domain-specific synonym dictionary for portfolio context
    this.synonyms = {
      // Skills & Experience
      skills: [
        "abilities",
        "expertise",
        "proficiency",
        "capabilities",
        "competencies",
      ],
      experience: ["background", "work history", "career", "expertise"],
      work: ["job", "employment", "position", "role", "career"],
      built: ["created", "developed", "made", "constructed", "engineered"],
      develop: ["build", "create", "engineer", "implement", "code"],

      // Projects
      project: ["work", "application", "system", "software", "product"],
      portfolio: ["projects", "work samples", "showcase", "examples"],

      // Technologies
      technology: ["tech", "stack", "tools", "framework", "platform"],
      language: ["programming language", "coding language"],
      framework: ["library", "platform", "tool"],

      // Services
      service: ["offering", "solution", "consulting"],
      help: ["assist", "support", "aid", "service"],

      // Contact
      contact: ["reach", "connect", "email", "message"],
      hire: ["employ", "recruit", "engage", "work with"],
    };

    // Intent patterns for different query types
    this.intentPatterns = {
      experience: [
        /work(ed|ing)?/i,
        /experience/i,
        /job/i,
        /career/i,
        /employment/i,
        /position/i,
        /role/i,
        /company/i,
        /employer/i,
      ],
      skills: [
        /skill/i,
        /tech/i,
        /language/i,
        /framework/i,
        /tool/i,
        /proficien/i,
        /expert/i,
        /know/i,
        /familiar/i,
        /capab/i,
      ],
      projects: [
        /project/i,
        /portfolio/i,
        /built/i,
        /created/i,
        /developed/i,
        /made/i,
        /work on/i,
        /application/i,
        /system/i,
        /software/i,
      ],
      education: [
        /education/i,
        /degree/i,
        /university/i,
        /college/i,
        /study/i,
        /graduate/i,
        /certificate/i,
        /course/i,
      ],
      contact: [
        /contact/i,
        /email/i,
        /reach/i,
        /connect/i,
        /hire/i,
        /available/i,
        /message/i,
        /talk/i,
        /discuss/i,
      ],
      services: [
        /service/i,
        /offer/i,
        /provide/i,
        /help/i,
        /consult/i,
        /solution/i,
      ],
      about: [
        /who/i,
        /about/i,
        /bio/i,
        /background/i,
        /introduction/i,
        /profile/i,
      ],
    };
  }

  /**
   * Expand query with synonyms
   */
  expandWithSynonyms(query) {
    const words = query.toLowerCase().split(/\s+/);
    const expandedTerms = new Set([query.toLowerCase()]);

    words.forEach((word) => {
      // Remove punctuation
      const cleanWord = word.replace(/[^\w]/g, "");

      // Check if word has synonyms
      Object.entries(this.synonyms).forEach(([key, synonymList]) => {
        if (cleanWord.includes(key) || key.includes(cleanWord)) {
          synonymList.forEach((syn) => expandedTerms.add(syn));
        }
      });
    });

    const expanded = Array.from(expandedTerms).join(" ");
    console.log("[QueryEnhancer] Expanded:", query, "→", expanded);
    return expanded;
  }

  /**
   * Detect user intent from query
   */
  analyzeIntent(query) {
    const detectedIntents = [];

    Object.entries(this.intentPatterns).forEach(([intent, patterns]) => {
      const matches = patterns.filter((pattern) => pattern.test(query));
      if (matches.length > 0) {
        detectedIntents.push({
          intent,
          confidence: matches.length / patterns.length,
          matches: matches.length,
        });
      }
    });

    // Sort by confidence
    detectedIntents.sort((a, b) => b.confidence - a.confidence);

    console.log(
      "[QueryEnhancer] Detected intents:",
      detectedIntents
        .map((i) => `${i.intent}(${(i.confidence * 100).toFixed(0)}%)`)
        .join(", ")
    );

    return detectedIntents;
  }

  /**
   * Generate query variations
   */
  generateVariations(query) {
    const variations = [query];

    // Add question variations
    const questionStarters = ["what", "which", "how", "when", "where", "who"];
    const isQuestion = questionStarters.some((q) =>
      query.toLowerCase().startsWith(q)
    );

    if (isQuestion) {
      // Convert question to statement
      const statement = query
        .replace(
          /^(what|which|how|when|where|who)\s+(is|are|was|were|do|does|did|can|could|would|should)\s+/i,
          ""
        )
        .replace(/\?$/, "");
      variations.push(statement);
    } else {
      // Add question form
      variations.push(`what is ${query}`);
      variations.push(`tell me about ${query}`);
    }

    // Add variations with expanded terms
    const expanded = this.expandWithSynonyms(query);
    if (expanded !== query) {
      variations.push(expanded);
    }

    console.log("[QueryEnhancer] Generated", variations.length, "variations");
    return variations;
  }

  /**
   * Apply intent-based boosting to search results
   */
  applyIntentBoosting(results, intents) {
    if (intents.length === 0) return results;

    const primaryIntent = intents[0].intent;
    const boostMap = {
      experience: { "timeline.json": 1.3 },
      skills: { "technologies.json": 1.3, "timeline.json": 1.2 },
      projects: { "portfolio.json": 1.4, "timeline.json": 1.1 },
      education: { "timeline.json": 1.3, "about.json": 1.1 },
      contact: { "about.json": 1.5 },
      services: { "services.json": 1.5 },
      about: { "about.json": 1.5, "timeline.json": 1.1 },
    };

    const boosts = boostMap[primaryIntent] || {};

    results.forEach((result) => {
      const boost = boosts[result.fileName] || 1.0;
      if (boost > 1.0) {
        result.hybridScore = result.hybridScore * boost;
        result.intentBoosted = true;
        result.intentBoost = boost;
      }
    });

    console.log("[QueryEnhancer] Applied intent boosting for:", primaryIntent);
    return results;
  }

  /**
   * Main enhancement pipeline
   */
  async enhance(query, ragInstance) {
    console.log("[QueryEnhancer] Enhancing query:", query);

    // 1. Detect intent
    const intents = this.analyzeIntent(query);

    // 2. Expand with synonyms
    const expandedQuery = this.expandWithSynonyms(query);

    // 3. Generate variations
    const variations = this.generateVariations(query);

    // 4. Generate embeddings for variations (average them)
    let avgEmbedding = null;
    if (ragInstance && typeof ragInstance.embed === "function") {
      try {
        const embeddings = await Promise.all(
          variations.slice(0, 3).map((v) => ragInstance.embed(v))
        );

        // Average the embeddings
        if (embeddings.length > 0 && embeddings[0]) {
          const dim = embeddings[0].length;
          avgEmbedding = new Array(dim).fill(0);

          embeddings.forEach((emb) => {
            emb.forEach((val, i) => {
              avgEmbedding[i] += val / embeddings.length;
            });
          });
        }
      } catch (error) {
        console.warn(
          "[QueryEnhancer] Failed to generate embeddings:",
          error.message
        );
      }
    }

    return {
      originalQuery: query,
      expandedQuery,
      variations,
      intents,
      embedding: avgEmbedding,
      primaryIntent: intents[0]?.intent || "general",
    };
  }

  /**
   * Add custom synonyms
   */
  addSynonyms(word, synonyms) {
    this.synonyms[word.toLowerCase()] = synonyms;
  }

  /**
   * Add custom intent pattern
   */
  addIntentPattern(intent, patterns) {
    if (!this.intentPatterns[intent]) {
      this.intentPatterns[intent] = [];
    }
    this.intentPatterns[intent].push(...patterns);
  }
}

export default QueryEnhancer;
