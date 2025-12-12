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
} from "@/lib/supabaseDataService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || searchParams.get("entity");

    let data;

    // Handle regular data types - all async from Supabase
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
      case "rag-manifest":
        // For RAG manifest, we can generate it from Supabase data
        const [aboutData, blogData, portfolioData, servicesData, techData] = await Promise.all([
          getAbout(),
          getBlogs(),
          getPortfolio(),
          getServices(),
          getTechnologies()
        ]);
        
        data = {
          version: "1.0",
          generated: new Date().toISOString(),
          sections: {
            about: aboutData,
            blogs: blogData,
            portfolio: portfolioData,
            services: servicesData,
            technologies: techData
          }
        };
        break;
      default:
        return NextResponse.json(
          { error: "Invalid data type specified" },
          { status: 400 }
        );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
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
