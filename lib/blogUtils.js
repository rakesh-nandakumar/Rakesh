// Utility functions for blog data
import {
  getBlogs,
  getBlogBySlug as getSupabaseBlogBySlug,
} from "./supabaseData.js";

export async function getAllBlogs() {
  try {
    return await getBlogs();
  } catch (error) {
    console.error("Error reading blogs data:", error);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  try {
    return await getSupabaseBlogBySlug(slug);
  } catch (error) {
    console.error("Error getting blog by slug:", error);
    return null;
  }
}

export async function getRelatedBlogs(currentBlog, limit = 3) {
  if (!currentBlog) return [];

  const blogs = await getAllBlogs();
  return blogs
    .filter(
      (blog) =>
        blog.category === currentBlog.category && blog.slug !== currentBlog.slug
    )
    .slice(0, limit);
}

export async function getAllBlogSlugs() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => blog.slug);
}
