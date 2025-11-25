import { generateBlogsSitemap } from '@/lib/seo/sitemapGenerator';

export default async function sitemap() {
  return await generateBlogsSitemap();
}
