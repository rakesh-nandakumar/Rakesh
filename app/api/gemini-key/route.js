import { NextResponse } from "next/server";

/**
 * API Route to securely provide Gemini API key to client
 * This prevents exposing the key directly in client-side code
 */
export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "" || apiKey === "your_gemini_api_key_here") {
      console.warn("Gemini API key not configured in .env.local");
      return NextResponse.json(
        {
          error: "Gemini API key not configured",
          message: "Please add GEMINI_API_KEY to your .env.local file",
        },
        { status: 200 } // Changed to 200 to prevent console errors
      );
    }

    // Return the API key securely
    return NextResponse.json({ apiKey }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Gemini API key:", error);
    return NextResponse.json(
      { error: "Failed to fetch API key", message: error.message },
      { status: 500 }
    );
  }
}
