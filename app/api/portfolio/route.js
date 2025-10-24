import { NextResponse } from "next/server";
import { getPortfolio } from "@/lib/dataService";

export async function GET() {
  try {
    const portfolio = await getPortfolio();
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}
