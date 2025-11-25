/**
 * Server-Side RAG (Retrieval-Augmented Generation) System
 * Fetches context from Supabase based on admin-configured manifest
 */

import { supabase } from "./supabaseData";

// Cache for RAG config (5 minutes)
let configCache = null;
let configCacheTime = 0;
const CONFIG_CACHE_TTL = 300000; // 5 minutes

/**
 * Load RAG configuration from Supabase
 */
export async function loadRagConfig() {
  // Return cached config if valid
  if (configCache && Date.now() - configCacheTime < CONFIG_CACHE_TTL) {
    return configCache;
  }

  try {
    const { data, error } = await supabase
      .from("rag_config")
      .select("key, value");

    if (error) {
      console.error("[RAG] Failed to load config:", error);
      return getDefaultConfig();
    }

    const config = {};
    data.forEach((row) => {
      config[row.key] = row.value;
    });

    // Cache the config
    configCache = {
      manifest: config.manifest_json || getDefaultManifest(),
      enabledSections: config.enabled_sections || getDefaultEnabledSections(),
    };
    configCacheTime = Date.now();

    return configCache;
  } catch (err) {
    console.error("[RAG] Error loading config:", err);
    return getDefaultConfig();
  }
}

/**
 * Default manifest if database is not configured
 */
function getDefaultManifest() {
  return {
    version: "2.0.0",
    tables: {
      profiles: {
        priority: "critical",
        alwaysInclude: true,
        query: "*",
        summaryTemplate:
          "{name} is a developer with expertise in {title}. {short_bio}",
      },
      contacts: {
        priority: "high",
        alwaysInclude: true,
        query: "*, contact_types(name, icon)",
        itemSummaryTemplate: "Contact via {contact_types.name}: {value}",
      },
      timelines: {
        priority: "high",
        query:
          "*, timeline_categories(name), timeline_technologies(technology)",
        itemSummaryTemplate: "{title} ({time}): {short_description}",
      },
      portfolios: {
        priority: "high",
        query: "*, portfolio_technologies(technology)",
        itemSummaryTemplate:
          "Project: {title} - {short_description}. Live: {live_link}",
      },
      blogs: {
        priority: "medium",
        query: "title, excerpt, slug, category, date",
        itemSummaryTemplate: "Blog: {title} ({date}) - {excerpt}",
      },
    },
    retrievalRules: {
      defaultTopK: 6,
      maxItemsPerTable: {
        timelines: 4,
        portfolios: 3,
        blogs: 3,
      },
    },
  };
}

function getDefaultEnabledSections() {
  return {
    profiles: true,
    contacts: true,
    timelines: true,
    portfolios: true,
    blogs: true,
  };
}

function getDefaultConfig() {
  return {
    manifest: getDefaultManifest(),
    enabledSections: getDefaultEnabledSections(),
  };
}

/**
 * Retrieve context from Supabase based on user query
 */
export async function retrieveContext(userQuery, options = {}) {
  try {
    const config = await loadRagConfig();
    const { manifest, enabledSections } = config;
    const { maxTokens = 2000 } = options;

    let context = "PORTFOLIO CONTEXT:\n\n";
    let tokenEstimate = 0;

    // Filter tables by enabled sections
    const activeTables = Object.entries(manifest.tables)
      .filter(([tableName]) => enabledSections[tableName] !== false)
      .sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return (
          priorityOrder[a[1].priority || "medium"] -
          priorityOrder[b[1].priority || "medium"]
        );
      });

    for (const [tableName, tableConfig] of activeTables) {
      // Stop if we're approaching token limit
      if (tokenEstimate > maxTokens) break;

      try {
        const limit = manifest.retrievalRules.maxItemsPerTable[tableName] || 5;

        const { data, error } = await supabase
          .from(tableName)
          .select(tableConfig.query)
          .is("deleted_at", null)
          .limit(limit);

        if (error) {
          console.error(`[RAG] Error fetching ${tableName}:`, error);
          continue;
        }

        if (!data || data.length === 0) continue;

        // Add section header
        context += `${tableName.toUpperCase()}:\n`;

        // Process each item
        for (const item of data) {
          let summary =
            tableConfig.itemSummaryTemplate ||
            tableConfig.summaryTemplate ||
            JSON.stringify(item);

          // Replace template variables
          summary = replacePlaceholders(summary, item);

          context += `- ${summary}\n`;
          tokenEstimate += summary.length / 4; // Rough token estimate
        }

        context += "\n";
      } catch (err) {
        console.error(`[RAG] Error processing ${tableName}:`, err);
        continue;
      }
    }

    return {
      context,
      tokenEstimate,
      tablesIncluded: activeTables.map(([name]) => name),
    };
  } catch (err) {
    console.error("[RAG] Error retrieving context:", err);
    return {
      context: "Error retrieving portfolio context.",
      tokenEstimate: 0,
      tablesIncluded: [],
    };
  }
}

/**
 * Replace placeholders in template with actual values
 */
function replacePlaceholders(template, data, prefix = "") {
  let result = template;

  for (const [key, value] of Object.entries(data)) {
    const placeholder = prefix ? `{${prefix}.${key}}` : `{${key}}`;

    if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        // Handle arrays (e.g., technologies)
        const arrayValue = value
          .map((item) => {
            if (typeof item === "object") {
              return Object.values(item)
                .filter((v) => v)
                .join(", ");
            }
            return item;
          })
          .filter((v) => v)
          .join(", ");
        result = result.replace(
          new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          arrayValue || ""
        );
      } else {
        // Handle nested objects
        result = replacePlaceholders(result, value, key);
      }
    } else {
      // Simple replacement
      result = result.replace(
        new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
        value || ""
      );
    }
  }

  // Clean up any remaining placeholders
  result = result.replace(/\{[^}]+\}/g, "");

  return result.trim();
}

/**
 * Clear RAG config cache (useful for admin updates)
 */
export function clearRagCache() {
  configCache = null;
  configCacheTime = 0;
}
