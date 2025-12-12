/**
 * Supabase Data Service Layer
 *
 * This service provides a unified API to fetch data from Supabase.
 * All data fetching is done through optimized queries with proper caching.
 *
 * This replaces the previous JSON-based data service.
 */

import {
  supabaseAdmin,
  getStorageUrl,
  STORAGE_BUCKETS,
  getSupabaseAdmin,
} from "./supabase";
import { cache } from "react";

// Supabase storage base URL for default images
const SUPABASE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio`
  : "";

// Helper to get storage URL with fallback
const getDefaultImageUrl = (filename) =>
  SUPABASE_STORAGE_URL ? `${SUPABASE_STORAGE_URL}/${filename}` : `/${filename}`;

// In-memory cache for server-side data
const dataCache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute cache TTL

/**
 * Get cached data or fetch from Supabase
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function to fetch data if not cached
 * @returns {Promise<any>} The data
 */
async function getCachedData(key, fetchFn) {
  const cached = dataCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchFn();
  dataCache.set(key, { data, timestamp: Date.now() });
  return data;
}

/**
 * Clear the data cache
 */
export function clearDataCache() {
  dataCache.clear();
}

/**
 * Get default about data when Supabase is not available
 */
function getDefaultAbout() {
  return {
    name: "Rakesh Nandakumar",
    title: ["Full Stack Developer", "Software Engineer", "Cloud Architect"],
    profileImage: getDefaultImageUrl("profileImg.png"),
    avatarImage: getDefaultImageUrl("avatar.png"),
    heroImage: getDefaultImageUrl("hero.jpg"),
    cvLink: getDefaultImageUrl("cv.pdf"),
    shortBio:
      "Full Stack Developer passionate about creating innovative solutions.",
    longBio: "",
    contact: {},
  };
}

/**
 * Transform profile data from Supabase to match expected format
 */
function transformProfileData(profile, titles, contacts, contactTypes) {
  if (!profile) return null;

  // Build contact object from contacts table
  const contact = {};
  if (contacts && contactTypes) {
    const contactTypeMap = new Map(contactTypes.map((ct) => [ct.id, ct.name]));
    contacts.forEach((c) => {
      const typeName = contactTypeMap.get(c.type_id);
      if (typeName) {
        contact[typeName] = c.value;
      }
    });
  }

  // Helper to get image URL - files are at bucket root, not in subfolders
  const getImageUrl = (dbValue, defaultFile) => {
    if (!dbValue) return getDefaultImageUrl(defaultFile);
    // If it's already a full URL, return as-is
    if (dbValue.startsWith("http://") || dbValue.startsWith("https://")) {
      return dbValue;
    }
    // Otherwise, assume it's relative to bucket root
    return getDefaultImageUrl(dbValue);
  };

  return {
    name: profile.name,
    title: titles?.map((t) => t.title) || [],
    profileImage: getImageUrl(profile.profile_image, "profileImg.png"),
    avatarImage: getImageUrl(profile.avatar_image, "avatar.png"),
    heroImage: getImageUrl(profile.hero_image, "hero.jpg"),
    cvLink: profile.cv_link || getDefaultImageUrl("cv.pdf"),
    contactImage: profile.contact_image
      ? getImageUrl(profile.contact_image, null)
      : null,
    shortBio: profile.short_bio,
    longBio: profile.long_bio,
    contact,
  };
}

/**
 * Get About/Profile data
 */
export const getAbout = cache(async () => {
  return getCachedData("about", async () => {
    try {
      if (!getSupabaseAdmin()) {
        console.error("Supabase client not initialized");
        return getDefaultAbout();
      }

      // Fetch profile with related data
      const { data: profiles, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .is("deleted_at", null)
        .limit(1)
        .single();

      if (profileError) throw profileError;

      // Fetch profile titles
      const { data: titles } = await supabaseAdmin
        .from("profile_titles")
        .select("title")
        .eq("profile_id", profiles.id)
        .is("deleted_at", null);

      // Fetch contacts
      const { data: contacts } = await supabaseAdmin
        .from("contacts")
        .select("type_id, value")
        .eq("profile_id", profiles.id)
        .is("deleted_at", null);

      // Fetch contact types
      const { data: contactTypes } = await supabaseAdmin
        .from("contact_types")
        .select("id, name")
        .is("deleted_at", null);

      return transformProfileData(profiles, titles, contacts, contactTypes);
    } catch (error) {
      console.error("Error fetching about data:", error);
      // Return fallback data
      return {
        name: "Rakesh Nandakumar",
        title: [
          "Software Engineer",
          "Technical Consultant",
          "Full Stack Developer",
        ],
        profileImage: getDefaultImageUrl("profileImg.png"),
        heroImage: getDefaultImageUrl("hero.jpg"),
        cvLink: getDefaultImageUrl("cv.pdf"),
        shortBio: "Full-stack developer with 3+ years of experience.",
        longBio: "",
        contact: {},
      };
    }
  });
});

/**
 * Transform blog data from Supabase to match expected format
 */
function transformBlogData(blog, tags = []) {
  return {
    id: blog.id,
    slug: blog.slug,
    image: getStorageUrl(STORAGE_BUCKETS.BLOGS, blog.image),
    category: blog.category,
    title: blog.title,
    excerpt: blog.excerpt,
    readTime: blog.read_time,
    publishDate: blog.publish_date,
    date: blog.publish_date,
    content: blog.content,
    featured: blog.featured,
    tags: tags.map((t) => t.tag),
    author: "Rakesh Nandakumar",
  };
}

/**
 * Get all Blogs
 */
export const getBlogs = cache(async () => {
  return getCachedData("blogs", async () => {
    try {
      // Fetch all blogs
      const { data: blogs, error } = await supabaseAdmin
        .from("blogs")
        .select("*")
        .is("deleted_at", null)
        .order("publish_date", { ascending: false });

      if (error) throw error;

      // Fetch all blog tags
      const { data: allTags } = await supabaseAdmin
        .from("blog_tags")
        .select("blog_id, tag")
        .is("deleted_at", null);

      // Group tags by blog_id
      const tagsByBlogId = new Map();
      allTags?.forEach((tag) => {
        if (!tagsByBlogId.has(tag.blog_id)) {
          tagsByBlogId.set(tag.blog_id, []);
        }
        tagsByBlogId.get(tag.blog_id).push(tag);
      });

      return blogs.map((blog) =>
        transformBlogData(blog, tagsByBlogId.get(blog.id) || [])
      );
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  });
});

/**
 * Get a single Blog by slug
 */
export const getBlogBySlug = cache(async (slug) => {
  try {
    // Fetch blog by slug
    const { data: blog, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .is("deleted_at", null)
      .single();

    if (error) throw error;
    if (!blog) return null;

    // Fetch blog tags
    const { data: tags } = await supabaseAdmin
      .from("blog_tags")
      .select("tag")
      .eq("blog_id", blog.id)
      .is("deleted_at", null);

    return transformBlogData(blog, tags || []);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
});

/**
 * Get featured Blogs
 */
export const getFeaturedBlogs = cache(async (limit = 3) => {
  try {
    const { data: blogs, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .eq("featured", true)
      .is("deleted_at", null)
      .order("publish_date", { ascending: false })
      .limit(limit);

    if (error) throw error;

    // Fetch tags for these blogs
    const blogIds = blogs.map((b) => b.id);
    const { data: allTags } = await supabaseAdmin
      .from("blog_tags")
      .select("blog_id, tag")
      .in("blog_id", blogIds)
      .is("deleted_at", null);

    const tagsByBlogId = new Map();
    allTags?.forEach((tag) => {
      if (!tagsByBlogId.has(tag.blog_id)) {
        tagsByBlogId.set(tag.blog_id, []);
      }
      tagsByBlogId.get(tag.blog_id).push(tag);
    });

    return blogs.map((blog) =>
      transformBlogData(blog, tagsByBlogId.get(blog.id) || [])
    );
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
});

/**
 * Transform portfolio data from Supabase to match expected format
 */
function transformPortfolioData(
  portfolio,
  technologies = [],
  keyFeatures = []
) {
  // Generate slug from title
  const slug = portfolio.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    id: portfolio.id,
    slug,
    image: getStorageUrl(STORAGE_BUCKETS.PROJECTS, portfolio.image),
    category: portfolio.category,
    title: portfolio.title,
    shortDescription: portfolio.short_description,
    longDescription: portfolio.long_description,
    featured: portfolio.featured,
    status: portfolio.status,
    progress: portfolio.progress,
    liveLink: portfolio.live_link,
    githubLink: portfolio.github_link,
    type: portfolio.type,
    technologies: technologies.map((t) => t.technology),
    keyFeatures: keyFeatures.map((f) => ({
      feature: f.feature,
      description: f.description,
    })),
  };
}

/**
 * Get all Portfolio items
 */
export const getPortfolio = cache(async () => {
  return getCachedData("portfolio", async () => {
    try {
      // Fetch all portfolios
      const { data: portfolios, error } = await supabaseAdmin
        .from("portfolios")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch all technologies and key features
      const portfolioIds = portfolios.map((p) => p.id);

      const [techResult, featuresResult] = await Promise.all([
        supabaseAdmin
          .from("portfolio_technologies")
          .select("portfolio_id, technology")
          .in("portfolio_id", portfolioIds)
          .is("deleted_at", null),
        supabaseAdmin
          .from("portfolio_key_features")
          .select("portfolio_id, feature, description")
          .in("portfolio_id", portfolioIds)
          .is("deleted_at", null),
      ]);

      // Group by portfolio_id
      const techByPortfolioId = new Map();
      techResult.data?.forEach((t) => {
        if (!techByPortfolioId.has(t.portfolio_id)) {
          techByPortfolioId.set(t.portfolio_id, []);
        }
        techByPortfolioId.get(t.portfolio_id).push(t);
      });

      const featuresByPortfolioId = new Map();
      featuresResult.data?.forEach((f) => {
        if (!featuresByPortfolioId.has(f.portfolio_id)) {
          featuresByPortfolioId.set(f.portfolio_id, []);
        }
        featuresByPortfolioId.get(f.portfolio_id).push(f);
      });

      return portfolios.map((portfolio) =>
        transformPortfolioData(
          portfolio,
          techByPortfolioId.get(portfolio.id) || [],
          featuresByPortfolioId.get(portfolio.id) || []
        )
      );
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      return [];
    }
  });
});

/**
 * Get a single Portfolio item by slug
 */
export const getPortfolioBySlug = cache(async (slug) => {
  try {
    const portfolios = await getPortfolio();
    return portfolios.find((item) => item.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching portfolio by slug:", error);
    return null;
  }
});

/**
 * Get featured Portfolio items
 */
export const getFeaturedPortfolio = cache(async (limit = 6) => {
  try {
    const portfolios = await getPortfolio();
    return portfolios.filter((item) => item.featured).slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured portfolio:", error);
    return [];
  }
});

/**
 * Transform service data from Supabase
 */
function transformServiceData(service) {
  return {
    title: service.title,
    icon: service.icon,
    description: service.description,
  };
}

/**
 * Get Services data
 */
export const getServices = cache(async () => {
  return getCachedData("services", async () => {
    try {
      const { data: services, error } = await supabaseAdmin
        .from("services")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return {
        headline: "Services I Offer",
        subheadline: "Comprehensive technical solutions for modern challenges",
        services: services.map(transformServiceData),
      };
    } catch (error) {
      console.error("Error fetching services:", error);
      return { headline: "", subheadline: "", services: [] };
    }
  });
});

/**
 * Transform technology data from Supabase
 */
function transformTechnologyData(tech) {
  return {
    name: tech.name,
    icon: getStorageUrl(STORAGE_BUCKETS.TECH_ICONS, tech.icon),
    description: tech.description,
    darkMode: tech.dark_mode || false,
  };
}

/**
 * Get Technologies data
 */
export const getTechnologies = cache(async () => {
  return getCachedData("technologies", async () => {
    try {
      const { data: technologies, error } = await supabaseAdmin
        .from("technologies")
        .select("*")
        .is("deleted_at", null)
        .order("name", { ascending: true });

      if (error) throw error;

      return technologies.map(transformTechnologyData);
    } catch (error) {
      console.error("Error fetching technologies:", error);
      return [];
    }
  });
});

/**
 * Transform timeline data from Supabase
 */
function transformTimelineData(
  timeline,
  technologies = [],
  links = [],
  categoryName
) {
  return {
    id: timeline.id,
    category: timeline.category_id,
    categoryName,
    time: timeline.time,
    title: timeline.title,
    "short-description": timeline.short_description,
    "long-description": timeline.long_description,
    status: timeline.status,
    description: timeline.description,
    technologies: technologies.map((t) => t.technology),
    links: links.map((l) => ({ [l.type]: l.url })),
  };
}

/**
 * Get Timeline data
 */
export const getTimeline = cache(async () => {
  return getCachedData("timeline", async () => {
    try {
      // Fetch categories
      const { data: categories, error: catError } = await supabaseAdmin
        .from("timeline_categories")
        .select("id, name")
        .is("deleted_at", null);

      if (catError) throw catError;

      // Create category map
      const categoryMap = new Map();
      const categoryNameMap = new Map();
      categories.forEach((cat) => {
        categoryMap.set(cat.name, cat.id);
        categoryNameMap.set(cat.id, cat.name);
      });

      // Fetch timelines
      const { data: timelines, error: timelineError } = await supabaseAdmin
        .from("timelines")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (timelineError) throw timelineError;

      // Fetch technologies and links
      const timelineIds = timelines.map((t) => t.id);

      const [techResult, linksResult] = await Promise.all([
        supabaseAdmin
          .from("timeline_technologies")
          .select("timeline_id, technology")
          .in("timeline_id", timelineIds)
          .is("deleted_at", null),
        supabaseAdmin
          .from("timeline_links")
          .select("timeline_id, type, url")
          .in("timeline_id", timelineIds)
          .is("deleted_at", null),
      ]);

      // Group by timeline_id
      const techByTimelineId = new Map();
      techResult.data?.forEach((t) => {
        if (!techByTimelineId.has(t.timeline_id)) {
          techByTimelineId.set(t.timeline_id, []);
        }
        techByTimelineId.get(t.timeline_id).push(t);
      });

      const linksByTimelineId = new Map();
      linksResult.data?.forEach((l) => {
        if (!linksByTimelineId.has(l.timeline_id)) {
          linksByTimelineId.set(l.timeline_id, []);
        }
        linksByTimelineId.get(l.timeline_id).push(l);
      });

      // Build category object for backward compatibility
      const category = {};
      categories.forEach((cat) => {
        category[cat.name] = cat.id;
      });

      return {
        category,
        timeline: timelines.map((timeline) =>
          transformTimelineData(
            timeline,
            techByTimelineId.get(timeline.id) || [],
            linksByTimelineId.get(timeline.id) || [],
            categoryNameMap.get(timeline.category_id)
          )
        ),
      };
    } catch (error) {
      console.error("Error fetching timeline:", error);
      return { category: {}, timeline: [] };
    }
  });
});

/**
 * Transform header data from Supabase
 */
function transformHeaderData(header, navigations = [], ctas = []) {
  // Sort by sort_order
  const sortedNav = [...navigations].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );
  const sortedCtas = [...ctas].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return {
    // Include avatar URL from server to avoid hydration mismatch
    avatar: getDefaultImageUrl("avatar.png"),
    navigation: sortedNav.map((nav) => ({
      label: nav.label,
      href: nav.href,
    })),
    ctaButton:
      sortedCtas.length > 0
        ? {
            label: sortedCtas[0].label,
            href: sortedCtas[0].href,
            target: sortedCtas[0].target || "_blank",
          }
        : null,
  };
}

/**
 * Get Header data
 */
export const getHeader = cache(async () => {
  return getCachedData("header", async () => {
    try {
      // Fetch header
      const { data: headers, error: headerError } = await supabaseAdmin
        .from("headers")
        .select("*")
        .is("deleted_at", null)
        .limit(1);

      if (headerError) throw headerError;
      if (!headers || headers.length === 0) {
        return {
          navigation: [],
          ctaButton: null,
        };
      }

      const headerId = headers[0].id;

      // Fetch navigations and CTAs
      const [navResult, ctaResult] = await Promise.all([
        supabaseAdmin
          .from("header_navigations")
          .select("*")
          .eq("header_id", headerId)
          .is("deleted_at", null),
        supabaseAdmin
          .from("header_ctas")
          .select("*")
          .eq("header_id", headerId)
          .is("deleted_at", null),
      ]);

      return transformHeaderData(
        headers[0],
        navResult.data || [],
        ctaResult.data || []
      );
    } catch (error) {
      console.error("Error fetching header:", error);
      return {
        avatar: getDefaultImageUrl("avatar.png"),
        navigation: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Blogs", href: "/blogs" },
          { label: "Contact", href: "/contact" },
        ],
        ctaButton: {
          label: "Download CV",
          href: getDefaultImageUrl("cv.pdf"),
          target: "_blank",
        },
      };
    }
  });
});

/**
 * Transform gallery data from Supabase
 */
function transformGalleryData(gallery) {
  return {
    id: gallery.id,
    src: getStorageUrl(STORAGE_BUCKETS.IMAGES, gallery.src),
    title: gallery.title,
    description: gallery.description,
    date: gallery.date,
    location: gallery.location,
    category: gallery.category,
  };
}

/**
 * Get Gallery data
 */
export const getGallery = cache(async () => {
  return getCachedData("gallery", async () => {
    try {
      const { data: galleries, error } = await supabaseAdmin
        .from("galleries")
        .select("*")
        .is("deleted_at", null)
        .order("date", { ascending: false });

      if (error) throw error;

      return galleries.map(transformGalleryData);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      return [];
    }
  });
});

/**
 * Transform site config from Supabase
 */
function transformSiteConfig(configs) {
  const configObj = {};

  configs.forEach((config) => {
    // The database already has keys in PascalCase format (e.g., ChatAssistantEnabled)
    // So we use the key directly
    const key = config.key;

    if (config.type === "boolean") {
      configObj[key] = config.value_boolean;
    } else if (config.type === "enum") {
      configObj[key] = config.value_enum;
    } else {
      // For string type, the value might be in a value field
      configObj[key] = config.value_boolean ?? config.value_enum ?? true;
    }
  });

  // Set defaults for any missing config
  return {
    ChatAssistantEnabled: configObj.ChatAssistantEnabled ?? true,
    GalleryEnabled: configObj.GalleryEnabled ?? false,
    BlogEnabled: configObj.BlogEnabled ?? true,
    ProjectsEnabled: configObj.ProjectsEnabled ?? true,
    TemplatesEnabled: configObj.TemplatesEnabled ?? true,
    TechnologiesEnabled: configObj.TechnologiesEnabled ?? true,
    TimelineEnabled: configObj.TimelineEnabled ?? true,
    ServicesEnabled: configObj.ServicesEnabled ?? true,
  };
}

/**
 * Get Site Config data
 */
export const getSiteConfig = cache(async () => {
  return getCachedData("site-config", async () => {
    try {
      const { data: configs, error } = await supabaseAdmin
        .from("site_configs")
        .select("*")
        .is("deleted_at", null);

      if (error) throw error;

      return transformSiteConfig(configs || []);
    } catch (error) {
      console.error("Error fetching site config:", error);
      // Return default config
      return {
        ChatAssistantEnabled: true,
        GalleryEnabled: false,
        BlogEnabled: true,
        ProjectsEnabled: true,
        TemplatesEnabled: true,
        TechnologiesEnabled: true,
        TimelineEnabled: true,
        ServicesEnabled: true,
      };
    }
  });
});

/**
 * Get all blog slugs for static generation
 */
export const getAllBlogSlugs = cache(async () => {
  try {
    const { data: blogs, error } = await supabaseAdmin
      .from("blogs")
      .select("slug")
      .is("deleted_at", null);

    if (error) throw error;

    return blogs.map((b) => b.slug);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
});

/**
 * Get all portfolio slugs for static generation
 */
export const getAllPortfolioSlugs = cache(async () => {
  try {
    const portfolios = await getPortfolio();
    return portfolios.map((p) => p.slug);
  } catch (error) {
    console.error("Error fetching portfolio slugs:", error);
    return [];
  }
});

// Default export with all functions
const dataService = {
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
};

export default dataService;
