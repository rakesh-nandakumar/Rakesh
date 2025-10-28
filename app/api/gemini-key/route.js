import { NextResponse } from "next/server";

/**
 * API Route to securely provide Gemini API key to client
 * This prevents exposing the key directly in client-side code
 */
export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Return the API key securely
    return NextResponse.json({ apiKey }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Gemini API key:", error);
    return NextResponse.json(
      { error: "Failed to fetch API key" },
      { status: 500 }
    );
  }
}
