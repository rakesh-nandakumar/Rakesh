import { NextResponse } from "next/server";
import {
  getAbout,
  getHeader,
  getServices,
  getTechnologies,
  getTimeline,
  getGallery,
  getSiteConfig,
} from "@/lib/dataService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let data;
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
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
