/**
 * RAG Preview API
 * Test RAG context generation without saving to database
 */

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseData";

export async function POST(request) {
  try {
    const { manifest, query, maxTokens = 2000 } = await request.json();

    if (!manifest || !query) {
      return NextResponse.json(
        { error: "Missing required fields: manifest and query are required" },
        { status: 400 }
      );
    }

    let context = "PREVIEW CONTEXT:\n\n";
    let totalTokens = 0;
    const tablesProcessed = [];

    // Get sections from manifest
    const sections = manifest.sections || {};

    // Sort sections by priority
    const sortedSections = Object.entries(sections)
      .filter(([, config]) => config.enabled)
      .sort(([, a], [, b]) => (a.priority || 999) - (b.priority || 999));

    for (const [sectionName, config] of sortedSections) {
      try {
        if (!config.table || !config.columns) continue;

        const limit = 5; // Default preview limit

        const { data, error } = await supabase
          .from(config.table)
          .select(config.columns.join(", "))
          .is("deleted_at", null)
          .limit(limit);

        if (error) {
          console.error(`Preview error for ${config.table}:`, error);
          continue;
        }

        if (!data || data.length === 0) continue;

        let sectionContext = `${sectionName.toUpperCase()}:\n`;

        for (const item of data) {
          let summary = config.template || JSON.stringify(item);

          // Simple placeholder replacement
          for (const [key, value] of Object.entries(item)) {
            if (value && typeof value !== "object") {
              summary = summary.replace(new RegExp(`\\{${key}\\}`, "g"), value);
            } else if (Array.isArray(value)) {
              summary = summary.replace(
                new RegExp(`\\{${key}\\}`, "g"),
                value.join(", ")
              );
            }
          }

          sectionContext += `- ${summary}\n`;
        }

        sectionContext += "\n";

        // Rough token estimation (4 chars ≈ 1 token)
        const sectionTokens = sectionContext.length / 4;

        if (totalTokens + sectionTokens > maxTokens) {
          break; // Stop if we exceed token limit
        }

        context += sectionContext;
        totalTokens += sectionTokens;
        tablesProcessed.push(config.table);
      } catch (err) {
        console.error(`Preview processing error for ${sectionName}:`, err);
      }
    }

    return NextResponse.json({
      context,
      tokenEstimate: totalTokens,
      tablesIncluded: tablesProcessed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[RAG Preview API] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview", message: error.message },
      { status: 500 }
    );
  }
}
