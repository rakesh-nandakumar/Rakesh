import { 
  generatePagesSitemap, 
  generateBlogsSitemap, 
  generatePortfolioSitemap 
} from "@/lib/seo/sitemapGenerator";

export default async function sitemap() {
  try {
    // Fetch all sitemap entries
    const [pages, blogs, portfolio] = await Promise.all([
      generatePagesSitemap(),
      generateBlogsSitemap(),
      generatePortfolioSitemap(),
    ]);

    // Combine all entries
    return [...pages, ...blogs, ...portfolio];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Return at least the static pages if dynamic content fails
    return [
      {
        url: "https://rakeshn.com",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: "https://rakeshn.com/about",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://rakeshn.com/portfolio",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: "https://rakeshn.com/blogs",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: "https://rakeshn.com/contact",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
}
