/**
 * Clear RAG cache endpoint
 * Called after admin updates configuration
 */

import { NextResponse } from "next/server";
import { clearRagCache } from "@/lib/rag";

export async function POST() {
  try {
    clearRagCache();
    return NextResponse.json({ success: true, message: "Cache cleared" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
