/**
 * RAG Context API
 * Returns relevant context from Supabase for AI chat
 */

import { NextResponse } from "next/server";
import { retrieveContext } from "@/lib/rag";

export async function POST(request) {
  try {
    const { query, maxTokens } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const result = await retrieveContext(query, { maxTokens });

    return NextResponse.json({
      context: result.context,
      tokenEstimate: result.tokenEstimate,
      tablesIncluded: result.tablesIncluded,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[RAG API] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve context", message: error.message },
      { status: 500 }
    );
  }
}

// Allow GET for testing
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "What projects have you built?";

  try {
    const result = await retrieveContext(query, { maxTokens: 2000 });

    return NextResponse.json({
      context: result.context,
      tokenEstimate: result.tokenEstimate,
      tablesIncluded: result.tablesIncluded,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[RAG API] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve context", message: error.message },
      { status: 500 }
    );
  }
}
