/**
 * Smart Chunking Engine
 * Creates semantic chunks with overlap and hierarchical parent-child relationships
 */

export class SmartChunker {
  constructor(options = {}) {
    this.chunkSize = options.chunkSize || 500; // Target characters per chunk
    this.chunkOverlap = options.chunkOverlap || 100; // Overlap between chunks
    this.minChunkSize = options.minChunkSize || 100; // Minimum chunk size
  }

  /**
   * Find semantic boundaries (paragraphs and sentences)
   */
  findSemanticBoundaries(text) {
    if (!text) return [];

    const boundaries = [];

    // Find paragraph boundaries (double newlines or major breaks)
    const paragraphs = text.split(/\n\n+/);
    let offset = 0;

    paragraphs.forEach((para) => {
      if (para.trim().length > 0) {
        // Find sentence boundaries within paragraph
        const sentences = para.match(/[^.!?]+[.!?]+/g) || [para];

        sentences.forEach((sentence) => {
          const trimmed = sentence.trim();
          if (trimmed.length >= this.minChunkSize) {
            boundaries.push({
              text: trimmed,
              start: offset,
              end: offset + trimmed.length,
              type: "sentence",
            });
          }
          offset += sentence.length;
        });
      }
      offset += 2; // Account for paragraph break
    });

    return boundaries;
  }

  /**
   * Create semantic chunks with overlap
   */
  createSemanticChunks(text, metadata = {}) {
    if (!text || text.length <= this.chunkSize) {
      return [{ text, metadata, start: 0, end: text?.length || 0 }];
    }

    const chunks = [];
    const boundaries = this.findSemanticBoundaries(text);

    if (boundaries.length === 0) {
      // Fallback to character-based chunking
      return this.createCharacterChunks(text, metadata);
    }

    let currentChunk = "";
    let chunkStart = 0;
    let chunkBoundaries = [];

    boundaries.forEach((boundary, idx) => {
      const newText = currentChunk + " " + boundary.text;

      if (
        newText.length > this.chunkSize &&
        currentChunk.length >= this.minChunkSize
      ) {
        // Save current chunk
        chunks.push({
          text: currentChunk.trim(),
          metadata: { ...metadata, chunkIndex: chunks.length },
          start: chunkStart,
          end: boundary.start,
          boundaries: chunkBoundaries,
        });

        // Start new chunk with overlap
        const overlapStart = Math.max(0, chunkBoundaries.length - 2);
        currentChunk = chunkBoundaries
          .slice(overlapStart)
          .map((b) => b.text)
          .join(" ");
        chunkStart = chunkBoundaries[overlapStart]?.start || boundary.start;
        chunkBoundaries = chunkBoundaries.slice(overlapStart);
      }

      currentChunk = newText;
      chunkBoundaries.push(boundary);
    });

    // Add final chunk
    if (currentChunk.trim().length >= this.minChunkSize) {
      chunks.push({
        text: currentChunk.trim(),
        metadata: { ...metadata, chunkIndex: chunks.length },
        start: chunkStart,
        end: text.length,
        boundaries: chunkBoundaries,
      });
    }

    console.log(
      "[SmartChunker] Created",
      chunks.length,
      "semantic chunks from",
      text.length,
      "chars"
    );
    return chunks;
  }

  /**
   * Fallback character-based chunking
   */
  createCharacterChunks(text, metadata = {}) {
    const chunks = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + this.chunkSize, text.length);
      const chunkText = text.slice(start, end);

      chunks.push({
        text: chunkText,
        metadata: { ...metadata, chunkIndex: chunks.length },
        start,
        end,
      });

      start = end - this.chunkOverlap;
    }

    return chunks;
  }

  /**
   * Create hierarchical parent-child chunks
   */
  createHierarchicalChunks(data, config) {
    const hierarchicalChunks = [];

    // Handle single object vs array
    const items = Array.isArray(data) ? data : [data];

    items.forEach((item, itemIndex) => {
      // Parent chunk: high-level summary
      const parentId = `${config.fileName || "unknown"}:parent:${itemIndex}`;

      const parentSummary = config.itemSummaryTemplate
        ? this.applyTemplate(config.itemSummaryTemplate, item)
        : JSON.stringify(item).slice(0, 300);

      const parentChunk = {
        id: parentId,
        type: "parent",
        text: parentSummary,
        data: this.extractFields(item, config.fields),
        fullData: item,
        children: [],
        metadata: {
          itemIndex,
          fileName: config.fileName,
          category: item.category,
          title: item.title,
        },
      };

      // Child chunks: detailed content from long fields
      const longFields = ["longDescription", "description", "content", "bio"];
      const childChunks = [];

      longFields.forEach((field) => {
        if (item[field] && item[field].length > this.chunkSize) {
          const chunks = this.createSemanticChunks(item[field], {
            field,
            parentId,
            itemIndex,
          });

          chunks.forEach((chunk, chunkIdx) => {
            const childId = `${parentId}:child:${field}:${chunkIdx}`;
            childChunks.push({
              id: childId,
              type: "child",
              text: chunk.text,
              parentId: parentId,
              field: field,
              data: { [field]: chunk.text },
              metadata: {
                ...chunk.metadata,
                itemIndex,
                fileName: config.fileName,
                chunkIndex: chunkIdx,
              },
            });
          });
        }
      });

      parentChunk.children = childChunks.map((c) => c.id);
      hierarchicalChunks.push(parentChunk);
      hierarchicalChunks.push(...childChunks);
    });

    console.log(
      "[SmartChunker] Created hierarchical structure:",
      hierarchicalChunks.filter((c) => c.type === "parent").length,
      "parents,",
      hierarchicalChunks.filter((c) => c.type === "child").length,
      "children"
    );

    return hierarchicalChunks;
  }

  /**
   * Enrich child chunk matches with parent context
   */
  enrichWithParent(matchedChunks, allChunks) {
    const enriched = matchedChunks.map((chunk) => {
      if (chunk.type === "child" && chunk.parentId) {
        // Find parent
        const parent = allChunks.find((c) => c.id === chunk.parentId);

        if (parent) {
          return {
            ...chunk,
            parentContext: parent.text,
            parentData: parent.data,
            enriched: true,
          };
        }
      }
      return chunk;
    });

    const enrichedCount = enriched.filter((c) => c.enriched).length;
    if (enrichedCount > 0) {
      console.log(
        "[SmartChunker] Enriched",
        enrichedCount,
        "child chunks with parent context"
      );
    }

    return enriched;
  }

  /**
   * Apply template with placeholders
   */
  applyTemplate(template, data) {
    if (!template) return JSON.stringify(data).slice(0, 200);

    return template.replace(/\{([^}]+)\}/g, (match, path) => {
      const value = this.getNestedValue(data, path);
      if (Array.isArray(value)) return value.join(", ");
      if (typeof value === "object") return JSON.stringify(value);
      return value || "";
    });
  }

  /**
   * Get nested value from object
   */
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  /**
   * Extract specific fields based on config
   */
  extractFields(data, fieldConfig) {
    if (!fieldConfig) return data;

    const result = {};
    const includeAll = fieldConfig.include?.includes("*");

    if (includeAll) {
      Object.assign(result, data);
    } else if (fieldConfig.include) {
      fieldConfig.include.forEach((path) => {
        const value = this.getNestedValue(data, path);
        if (value !== undefined) {
          this.setNestedValue(result, path, value);
        }
      });
    }

    return result;
  }

  /**
   * Set nested value
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
   * Update chunking parameters
   */
  configure(options) {
    if (options.chunkSize) this.chunkSize = options.chunkSize;
    if (options.chunkOverlap) this.chunkOverlap = options.chunkOverlap;
    if (options.minChunkSize) this.minChunkSize = options.minChunkSize;
  }
}

export default SmartChunker;
