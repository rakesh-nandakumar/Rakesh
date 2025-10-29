import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/dataService";

export async function GET() {
  try {
    const blogs = getBlogs();

    // Return with cache headers for better performance
    return NextResponse.json(blogs, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
