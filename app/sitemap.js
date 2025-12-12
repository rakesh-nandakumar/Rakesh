import { getAllBlogSlugs, getAllPortfolioSlugs } from "@/lib/supabaseDataService";

export default async function sitemap() {
  const baseUrl = "https://rakeshn.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog pages - with error handling
  let blogPages = [];
  try {
    const blogSlugs = await getAllBlogSlugs();
    blogPages = blogSlugs.map((slug) => ({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating portfolio sitemap entries:", error);
  }

  return [...staticPages, ...blogPages, ...portfolioPages];
}
