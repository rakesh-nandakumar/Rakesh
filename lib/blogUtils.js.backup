// Utility functions for blog data
import {
  getBlogs,
  getBlogBySlug as getDataServiceBlogBySlug,
} from "./dataService.js";

export function getAllBlogs() {
  try {
    return getBlogs();
  } catch (error) {
    console.error("Error reading blogs data:", error);
    return [];
  }
}

export function getBlogBySlug(slug) {
  try {
    return getDataServiceBlogBySlug(slug);
  } catch (error) {
    console.error("Error getting blog by slug:", error);
    return null;
  }
}

export function getRelatedBlogs(currentBlog, limit = 3) {
  if (!currentBlog) return [];

  const blogs = getAllBlogs();
  return blogs
    .filter(
      (blog) =>
        blog.category === currentBlog.category && blog.slug !== currentBlog.slug
    )
    .slice(0, limit);
}

export function getAllBlogSlugs() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => blog.slug);
}
