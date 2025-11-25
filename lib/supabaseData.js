/**
 * Supabase Data Access Layer
 * Centralized data fetching with caching, error handling, and optimized queries
 * All data comes from normalized Supabase tables
 */
import { createClient } from "@supabase/supabase-js";
// import { withCache } from "./cache";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase environment variables!");
  throw new Error("Missing Supabase environment variables");
}

// Create Supabase client (client-side safe)
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      "x-application-name": "rakesh-portfolio",
    },
  },
});

// Server-side client with service role (use only in API routes/server components)
export function getServerSupabase() {
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SERVICE_KEY) {
    console.warn("Service role key not found, using anon key");
    return supabase;
  }
  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

// Timeout wrapper for queries
async function withTimeout(promise, timeoutMs = 10000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Query timeout")), timeoutMs)
    ),
  ]);
}

// ============================================================================
// PROFILE DATA
// ============================================================================

export async function getProfile() {
  // Temporarily disabled cache
  // return withCache('profile', async () => {
  try {
    const query = supabase
      .from("profiles")
      .select(
        `
          *,
          profile_titles (title),
          contacts (
            id,
            value,
            contact_types (name, icon)
          )
        `
      )
      .is("deleted_at", null)
      .single();

    const { data, error } = await withTimeout(query, 5000);

    if (error) {
      console.error("Profile fetch error:", error);
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }

    if (!data) {
      throw new Error("No profile data found");
    }

    // Transform to match old JSON structure for backward compatibility
    return {
      name: data.name,
      title: data.profile_titles?.map((t) => t.title) || [],
      profileImage: data.profile_image,
      avatarImage: data.avatar_image,
      heroImage: data.hero_image,
      cvLink: data.cv_link,
      contactImage: data.contact_image,
      shortBio: data.short_bio,
      longBio: data.long_bio,
      contact: Object.fromEntries(
        (data.contacts || []).map((c) => [
          c.contact_types?.name || "unknown",
          c.value,
        ])
      ),
    };
  } catch (error) {
    console.error("Error in getProfile:", error);
    throw error;
  }
  // }, 300000); // 5 minutes cache
}

// ============================================================================
// TIMELINE DATA
// ============================================================================

export async function getTimeline() {
  const { data, error } = await supabase
    .from("timelines")
    .select(
      `
      *,
      timeline_categories (id, name),
      timeline_technologies (technology),
      timeline_links (type, url)
    `
    )
    .is("deleted_at", null)
    .order("id", { ascending: false });

  if (error) throw new Error(`Failed to fetch timeline: ${error.message}`);

  // Get category mapping
  const categoryMap = {
    "Work Experience": 1,
    Education: 2,
  };

  // Transform to match old JSON structure
  return {
    category: categoryMap,
    timeline: data.map((item) => ({
      category: item.timeline_categories.id,
      time: item.time,
      title: item.title,
      "short-description": item.short_description,
      "long-description": item.long_description,
      status: item.status,
      description: item.description,
      technologies: item.timeline_technologies.map((t) => t.technology),
      links: item.timeline_links.map((l) => ({ [l.type]: l.url })),
    })),
  };
}

// ============================================================================
// TECHNOLOGIES DATA
// ============================================================================

export async function getTechnologies() {
  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: true });

  if (error) throw new Error(`Failed to fetch technologies: ${error.message}`);

  // Transform to match old JSON structure
  return data.map((tech) => ({
    name: tech.name,
    icon: tech.icon,
    description: tech.description,
    darkMode: tech.dark_mode,
  }));
}

// ============================================================================
// SERVICES DATA
// ============================================================================

export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: true });

  if (error) throw new Error(`Failed to fetch services: ${error.message}`);

  // Transform to match old JSON structure
  return {
    services: data.map((svc) => ({
      title: svc.title,
      icon: svc.icon,
      description: svc.description,
    })),
  };
}

// ============================================================================
// HEADER DATA
// ============================================================================

export async function getHeader() {
  const { data, error } = await supabase
    .from("headers")
    .select(
      `
      *,
      header_navigations (label, href, sort_order),
      header_ctas (label, href, target, sort_order)
    `
    )
    .is("deleted_at", null)
    .single();

  if (error) throw new Error(`Failed to fetch header: ${error.message}`);

  // Sort navigation by sort_order
  const navigation = data.header_navigations
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((n) => ({ label: n.label, href: n.href }));

  // Get first CTA button
  const cta = data.header_ctas.sort((a, b) => a.sort_order - b.sort_order)[0];

  // Transform to match old JSON structure
  return {
    navigation,
    ctaButton: cta
      ? {
          label: cta.label,
          href: cta.href,
          target: cta.target,
        }
      : null,
  };
}

// ============================================================================
// SITE CONFIG DATA
// ============================================================================

export async function getSiteConfig() {
  const { data, error } = await supabase
    .from("site_configs")
    .select("*")
    .is("deleted_at", null);

  if (error) throw new Error(`Failed to fetch site config: ${error.message}`);

  // Transform to match old JSON structure (flat key-value object)
  return Object.fromEntries(
    data.map((config) => [
      config.key,
      config.type === "boolean" ? config.value_boolean : config.value_enum,
    ])
  );
}

// ============================================================================
// GALLERY DATA
// ============================================================================

export async function getGallery() {
  const { data, error } = await supabase
    .from("galleries")
    .select("*")
    .is("deleted_at", null)
    .order("date", { ascending: false });

  if (error) throw new Error(`Failed to fetch gallery: ${error.message}`);

  // Transform to match old JSON structure
  return data.map((item) => ({
    id: item.id,
    src: item.src,
    title: item.title,
    description: item.description,
    date: item.date,
    location: item.location,
    category: item.category,
  }));
}

// ============================================================================
// PORTFOLIO DATA
// ============================================================================

export async function getPortfolios({ featured = null } = {}) {
  let query = supabase
    .from("portfolios")
    .select(
      `
      *,
      portfolio_key_features (feature, description),
      portfolio_technologies (technology)
    `
    )
    .is("deleted_at", null);

  if (featured !== null) {
    query = query.eq("featured", featured);
  }

  const { data, error } = await query.order("id", { ascending: false });

  if (error) throw new Error(`Failed to fetch portfolios: ${error.message}`);

  // Transform to match old JSON structure
  return data.map((item) => ({
    image: item.image,
    category: item.category,
    title: item.title,
    shortDescription: item.short_description,
    longDescription: item.long_description,
    keyFeatures: item.portfolio_key_features.map((kf) => ({
      feature: kf.feature,
      description: kf.description,
    })),
    technologies: item.portfolio_technologies.map((t) => t.technology),
    featured: item.featured,
    status: item.status,
    progress: item.progress,
    liveLink: item.live_link,
    githubLink: item.github_link,
    type: item.type,
  }));
}

export async function getPortfolioByTitle(title) {
  const { data, error } = await supabase
    .from("portfolios")
    .select(
      `
      *,
      portfolio_key_features (feature, description),
      portfolio_technologies (technology)
    `
    )
    .eq("title", title)
    .is("deleted_at", null)
    .single();

  if (error) throw new Error(`Failed to fetch portfolio: ${error.message}`);

  // Transform to match old JSON structure
  return {
    image: data.image,
    category: data.category,
    title: data.title,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    keyFeatures: data.portfolio_key_features.map((kf) => ({
      feature: kf.feature,
      description: kf.description,
    })),
    technologies: data.portfolio_technologies.map((t) => t.technology),
    featured: data.featured,
    status: data.status,
    progress: data.progress,
    liveLink: data.live_link,
    githubLink: data.github_link,
    type: data.type,
  };
}

// ============================================================================
// BLOG DATA
// ============================================================================

export async function getBlogs({ featured = null, limit = null } = {}) {
  let query = supabase
    .from("blogs")
    .select(
      `
      *,
      blog_tags (tag)
    `
    )
    .is("deleted_at", null);

  if (featured !== null) {
    query = query.eq("featured", featured);
  }

  query = query.order("publish_date", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw new Error(`Failed to fetch blogs: ${error.message}`);

  // Transform to match old JSON structure
  return data.map((blog) => ({
    slug: blog.slug,
    image: blog.image,
    category: blog.category,
    title: blog.title,
    excerpt: blog.excerpt,
    readTime: blog.read_time,
    publishDate: blog.publish_date,
    tags: blog.blog_tags.map((t) => t.tag),
    content: blog.content,
    featured: blog.featured,
  }));
}

export async function getBlogBySlug(slug) {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      blog_tags (tag)
    `
    )
    .eq("slug", slug)
    .is("deleted_at", null)
    .single();

  if (error) throw new Error(`Failed to fetch blog: ${error.message}`);

  // Transform to match old JSON structure
  return {
    slug: data.slug,
    image: data.image,
    category: data.category,
    title: data.title,
    excerpt: data.excerpt,
    readTime: data.read_time,
    publishDate: data.publish_date,
    tags: data.blog_tags.map((t) => t.tag),
    content: data.content,
    featured: data.featured,
  };
}

export async function getBlogsByCategory(category, limit = 3) {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      blog_tags (tag)
    `
    )
    .eq("category", category)
    .is("deleted_at", null)
    .order("publish_date", { ascending: false })
    .limit(limit);

  if (error)
    throw new Error(`Failed to fetch blogs by category: ${error.message}`);

  return data.map((blog) => ({
    slug: blog.slug,
    image: blog.image,
    category: blog.category,
    title: blog.title,
    excerpt: blog.excerpt,
    readTime: blog.read_time,
    publishDate: blog.publish_date,
    tags: blog.blog_tags.map((t) => t.tag),
    content: blog.content,
    featured: blog.featured,
  }));
}

// ============================================================================
// CACHE HELPERS (Next.js 15 App Router)
// ============================================================================

// Cache helper wrappers. If you enable Next.js experimental `useCache` feature
// you can replace these with functions that include the "use cache" directive
// for better server component caching. Leaving plain wrappers keeps the code
// compatible with the current Next.js config.
export const getCachedProfile = async () => getProfile();
export const getCachedTimeline = async () => getTimeline();
export const getCachedTechnologies = async () => getTechnologies();
export const getCachedServices = async () => getServices();
export const getCachedHeader = async () => getHeader();
export const getCachedSiteConfig = async () => getSiteConfig();
export const getCachedGallery = async () => getGallery();
export const getCachedPortfolios = async (options) => getPortfolios(options);
export const getCachedBlogs = async (options) => getBlogs(options);
