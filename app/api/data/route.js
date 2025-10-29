import { NextResponse } from "next/server";
import {
  getAbout,
  getHeader,
  getServices,
  getTechnologies,
  getTimeline,
  getGallery,
  getSiteConfig,
  getPortfolio,
  getBlogs,
} from "@/lib/dataService";
import path from "path";
import fs from "fs/promises";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let data;

    // Handle special AI data files (raw JSON files)
    if (type === "rag-manifest") {
      const filePath = path.join(process.cwd(), "data", "rag-manifest.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      data = JSON.parse(fileContent);
      return NextResponse.json(data, {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    // Handle regular data types - now synchronous
    switch (type) {
      case "about":
        data = getAbout();
        break;
      case "header":
        data = getHeader();
        break;
      case "services":
        data = getServices();
        break;
      case "technologies":
        data = getTechnologies();
        break;
      case "timeline":
        data = getTimeline();
        break;
      case "gallery":
        data = getGallery();
        break;
      case "site-config":
        data = getSiteConfig();
        break;
      case "portfolio":
        data = getPortfolio();
        break;
      case "blogs":
        data = getBlogs();
        break;
      default:
        return NextResponse.json(
          { error: "Invalid data type specified" },
          { status: 400 }
        );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 }
    );
  }
}
