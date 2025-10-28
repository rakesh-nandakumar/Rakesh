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
      return NextResponse.json(data);
    } // Handle regular data types
    switch (type) {
      case "about":
        data = await getAbout();
        break;
      case "header":
        data = await getHeader();
        break;
      case "services":
        data = await getServices();
        break;
      case "technologies":
        data = await getTechnologies();
        break;
      case "timeline":
        data = await getTimeline();
        break;
      case "gallery":
        data = await getGallery();
        break;
      case "site-config":
        data = await getSiteConfig();
        break;
      case "portfolio":
        data = await getPortfolio();
        break;
      case "blogs":
        data = await getBlogs();
        break;
      default:
        return NextResponse.json(
          { error: "Invalid data type specified" },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error.message },
      { status: 500 }
    );
  }
}
