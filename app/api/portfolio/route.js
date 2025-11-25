import { NextResponse } from "next/server";
import { getPortfolios } from "@/lib/supabaseData";

export async function GET() {
  try {
    const portfolio = await getPortfolios();

    // Return with cache headers for better performance
    return NextResponse.json(portfolio, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}
