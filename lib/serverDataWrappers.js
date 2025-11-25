/**
 * Server Component Data Wrappers
 * Fetch data from Supabase and pass to client components
 */
import {
  getProfile,
  getHeader,
  getSiteConfig,
  getTimeline,
  getTechnologies,
  getServices,
  getGallery,
  getPortfolios,
  getBlogs,
} from "@/lib/supabaseData";

// Profile wrapper
export async function ProfileDataWrapper({ children }) {
  const data = await getProfile();
  return children(data);
}

// Header wrapper
export async function HeaderDataWrapper({ children }) {
  const [headerData, aboutData, siteConfig] = await Promise.all([
    getHeader(),
    getProfile(),
    getSiteConfig(),
  ]);
  return children({ headerData, aboutData, siteConfig });
}

// Timeline wrapper
export async function TimelineDataWrapper({ children }) {
  const data = await getTimeline();
  return children(data);
}

// Technologies wrapper
export async function TechnologiesDataWrapper({ children }) {
  const data = await getTechnologies();
  return children(data);
}

// Services wrapper
export async function ServicesDataWrapper({ children }) {
  const data = await getServices();
  return children(data);
}

// Gallery wrapper
export async function GalleryDataWrapper({ children }) {
  const data = await getGallery();
  return children(data);
}

// Portfolio wrapper
export async function PortfolioDataWrapper({ children, featured = null }) {
  const data = await getPortfolios({ featured });
  return children(data);
}

// Blogs wrapper
export async function BlogsDataWrapper({
  children,
  featured = null,
  limit = null,
}) {
  const data = await getBlogs({ featured, limit });
  return children(data);
}
