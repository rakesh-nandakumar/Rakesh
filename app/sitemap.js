import {
  getAllBlogSlugs,
  getAllPortfolioSlugs,
} from "@/lib/supabaseDataService";

export default async function sitemap() {
  const baseUrl = "https://rakeshn.com";
  const currentDate = new Date().toISOString();

  // Static pages with proper priorities and change frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamic blog pages - with error handling
  let blogPages = [];
  try {
    const blogSlugs = await getAllBlogSlugs();
    blogPages = blogSlugs.map((slug) => ({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating blog sitemap entries:", error);
  }

  // Dynamic portfolio pages - with error handling
  let portfolioPages = [];
  try {
    const portfolioSlugs = await getAllPortfolioSlugs();
    portfolioPages = portfolioSlugs.map((slug) => ({
      url: `${baseUrl}/portfolio/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating portfolio sitemap entries:", error);
  }

  return [...staticPages, ...blogPages, ...portfolioPages];
}
