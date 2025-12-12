/**
 * Utility functions for blog data
 * Uses Supabase for data fetching
 */

import {
  getBlogs,
  getBlogBySlug as getDataServiceBlogBySlug,
  getAllBlogSlugs as getDataServiceAllBlogSlugs,
} from './supabaseDataService';

/**
 * Get all blogs
 * @returns {Promise<Array>} Array of blog objects
 */
export async function getAllBlogs() {
  try {
    return await getBlogs();
  } catch (error) {
    console.error('Error reading blogs data:', error);
    return [];
  }
}

/**
 * Get a single blog by slug
 * @param {string} slug - The blog slug
 * @returns {Promise<Object|null>} Blog object or null
 */
export async function getBlogBySlug(slug) {
  try {
    return await getDataServiceBlogBySlug(slug);
  } catch (error) {
    console.error('Error getting blog by slug:', error);
    return null;
  }
}

/**
 * Get related blogs based on category
 * @param {Object} currentBlog - The current blog object
 * @param {number} limit - Maximum number of related blogs to return
 * @returns {Promise<Array>} Array of related blog objects
 */
export async function getRelatedBlogs(currentBlog, limit = 3) {
  if (!currentBlog) return [];

  try {
    const blogs = await getAllBlogs();
    return blogs
      .filter(
        (blog) =>
          blog.category === currentBlog.category && blog.slug !== currentBlog.slug
      )
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting related blogs:', error);
    return [];
  }
}

/**
 * Get all blog slugs for static generation
 * @returns {Promise<Array<string>>} Array of blog slugs
 */
export async function getAllBlogSlugs() {
  try {
    return await getDataServiceAllBlogSlugs();
  } catch (error) {
    console.error('Error getting blog slugs:', error);
    return [];
  }
}
