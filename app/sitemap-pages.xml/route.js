import { generatePagesSitemap } from '@/lib/seo/sitemapGenerator';

export default async function sitemap() {
  return await generatePagesSitemap();
}
