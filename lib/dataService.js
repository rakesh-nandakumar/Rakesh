/**
 * Data Service Layer
 *
 * This service provides a unified API to fetch data from JSON files in the /data directory.
 * All data is loaded synchronously for optimal performance and SEO.
 * Supports switchable file storage between system files and Supabase.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolveDataAssets } from "./fileStorage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");

// Cache for JSON data to avoid repeated file reads
const dataCache = new Map();

/**
 * Read JSON file from the data directory with caching and asset resolution
 * @param {string} filename - Name of the JSON file
 * @param {string[]} imageFields - Array of field names that contain image paths
 */
function readJSONFile(filename, imageFields) {
  const cacheKey = `${filename}_${process.env.FILE_STORAGE_MODE || "system"}`;

  // Check cache first
  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey);
  }

  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(data);

  // Resolve asset URLs based on FILE_STORAGE_MODE
  const resolved = resolveDataAssets(parsed, imageFields);

  // Cache the resolved data
  dataCache.set(cacheKey, resolved);

  return resolved;
}

/**
 * Clear the data cache (useful for development)
 */
export function clearDataCache() {
  dataCache.clear();
}

/**
 * Get About data
 */
export function getAbout() {
  return readJSONFile("about.json", [
    "profileImage",
    "heroImage",
    "cvLink",
    "cv",
    "resume",
  ]);
}

/**
 * Get all Blogs
 */
export function getBlogs() {
  return readJSONFile("blogs.json", ["image"]);
}

/**
 * Get a single Blog by slug
 */
export function getBlogBySlug(slug) {
  const blogs = readJSONFile("blogs.json", ["image"]);
  return blogs.find((blog) => blog.id === slug || blog.slug === slug);
}

/**
 * Get featured Blogs
 */
export function getFeaturedBlogs(limit = 3) {
  const blogs = readJSONFile("blogs.json", ["image"]);
  return blogs.filter((blog) => blog.featured).slice(0, limit);
}

/**
 * Get all Portfolio items
 */
export async function getPortfolio() {
  try {
    // Try to use Supabase first
    const { getPortfolios } = await import("./supabaseData.js");
    return await getPortfolios();
  } catch (error) {
    console.warn("Supabase unavailable, falling back to JSON");
    return readJSONFile("portfolio.json", ["image"]);
  }
}

/**
 * Helper function to generate slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get a single Portfolio item by slug
 */
export async function getPortfolioBySlug(slug) {
  try {
    const { getPortfolios } = await import("./supabaseData.js");
    const portfolio = await getPortfolios();
    return portfolio.find((item) => {
      const itemSlug = item.slug || generateSlug(item.title);
      return itemSlug === slug;
    });
  } catch (error) {
    console.warn("Supabase unavailable, falling back to JSON");
    const portfolio = readJSONFile("portfolio.json", ["image"]);
    return portfolio.find((item) => {
      const itemSlug = item.slug || generateSlug(item.title);
      return itemSlug === slug;
    });
  }
}

/**
 * Get featured Portfolio items
 */
export async function getFeaturedPortfolio(limit = 6) {
  try {
    const { getPortfolios } = await import("./supabaseData.js");
    const portfolio = await getPortfolios({ featured: true });
    return portfolio.slice(0, limit);
  } catch (error) {
    console.warn("Supabase unavailable, falling back to JSON");
    const portfolio = readJSONFile("portfolio.json", ["image"]);
    return portfolio.filter((item) => item.featured).slice(0, limit);
  }
}

/**
 * Get Services data
 */
export function getServices() {
  return readJSONFile("services.json");
}

/**
 * Get Technologies data
 */
export function getTechnologies() {
  return readJSONFile("technologies.json", ["icon"]);
}

/**
 * Get Timeline data
 */
export function getTimeline() {
  return readJSONFile("timeline.json");
}

/**
 * Get Header data
 */
export function getHeader() {
  return readJSONFile("header.json");
}

/**
 * Get Gallery data
 */
export function getGallery() {
  return readJSONFile("gallery.json", ["src"]);
}

/**
 * Get Site Config data
 */
export function getSiteConfig() {
  return readJSONFile("site-config.json");
}

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
  clearDataCache,
};

export default dataService;
