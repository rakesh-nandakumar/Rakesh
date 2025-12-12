/**
 * Data Service Layer
 *
 * This service provides a unified API to fetch data from Supabase.
 * It replaces the previous JSON file-based data fetching approach.
 * 
 * For server components, use the async functions directly.
 * For client components, data should be fetched via API routes or passed as props.
 */

// Re-export all functions from supabaseDataService
export {
  getAbout,
  getBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  getPortfolio,
  getPortfolioBySlug,
  getFeaturedPortfolio,
  getServices,
  getTechnologies,
  getTimeline,
  getHeader,
  getGallery,
  getSiteConfig,
  getAllBlogSlugs,
  getAllPortfolioSlugs,
  clearDataCache,
} from './supabaseDataService';

// Default export
export { default } from './supabaseDataService';
