/**
 * Unified Data API - fetches data from normalized Supabase tables
 * Usage: /api/data?type=blogs | portfolio | technologies | services | about | timeline | header | site-config | gallery
 */
import { NextResponse } from "next/server";
import {
  getProfile,
  getTimeline,
  getTechnologies,
  getServices,
  getHeader,
  getSiteConfig,
  getGallery,
  getPortfolios,
  getBlogs,
} from "@/lib/supabaseData";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || searchParams.get("entity");

  // Special raw JSON passthrough (AI manifest and system prompt) - now returning minimal config
  if (type === "rag-manifest") {
    // Return minimal RAG manifest config since data folder is deleted
    return NextResponse.json(
      {
        entities: [],
        enhancements: {
          enabled: false,
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }

  if (type === "ai-system-prompt") {
    // Return minimal AI prompt config since data folder is deleted
    return NextResponse.json(
      {
        systemPrompt: {
          role: "You are an AI assistant for Rakesh Nandakumar's portfolio.",
          guidelines: ["Be professional and helpful"],
          responseFormat: "Provide clear responses",
          personality: "professional",
          contactInfo: {
            businessInquiries: "Use the contact form for inquiries",
          },
        },
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }

  try {
    let data;

    switch (type) {
      case "about":
      case "profile":
        data = await getProfile();
        break;

      case "timeline":
        data = await getTimeline();
        break;

      case "technologies":
        data = await getTechnologies();
        break;

      case "services":
        data = await getServices();
        break;

      case "header":
        data = await getHeader();
        break;

      case "site-config":
      case "siteConfig":
        data = await getSiteConfig();
        break;

      case "gallery":
        data = await getGallery();
        break;

      case "portfolio":
        data = await getPortfolios();
        break;

      case "blogs":
        data = await getBlogs();
        break;

      default:
        console.error(`[API] Invalid type requested: ${type}`);
        return NextResponse.json(
          { error: "Invalid or missing type", type },
          { status: 400 }
        );
    }

    if (!data) {
      console.error(`[API] No data returned for type: ${type}`);
      return NextResponse.json(
        { error: "No data available", type },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "CDN-Cache-Control": "public, s-maxage=60",
        "Vercel-CDN-Cache-Control": "public, s-maxage=60",
      },
    });
  } catch (e) {
    console.error(`[API] Error fetching ${type}:`, e.message, e.stack);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        message: e.message,
        type,
      },
      { status: 500 }
    );
  }
}
