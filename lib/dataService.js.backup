/**
 * Data Service Layer
 *
 * This service provides a unified API to fetch data from JSON files in the /data directory.
 * All data is loaded synchronously for optimal performance and SEO.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");

// Cache for JSON data to avoid repeated file reads
const dataCache = new Map();

/**
 * Read JSON file from the data directory with caching
 */
function readJSONFile(filename) {
  // Check cache first
  if (dataCache.has(filename)) {
    return dataCache.get(filename);
  }

  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(data);

  // Cache the parsed data
  dataCache.set(filename, parsed);

  return parsed;
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
  return readJSONFile("about.json");
}

/**
 * Get all Blogs
 */
export function getBlogs() {
  return readJSONFile("blogs.json");
}

/**
 * Get a single Blog by slug
 */
export function getBlogBySlug(slug) {
  const blogs = readJSONFile("blogs.json");
  return blogs.find((blog) => blog.id === slug || blog.slug === slug);
}

/**
 * Get featured Blogs
 */
export function getFeaturedBlogs(limit = 3) {
  const blogs = readJSONFile("blogs.json");
  return blogs.filter((blog) => blog.featured).slice(0, limit);
}

/**
 * Get all Portfolio items
 */
export function getPortfolio() {
  return readJSONFile("portfolio.json");
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
export function getPortfolioBySlug(slug) {
  const portfolio = readJSONFile("portfolio.json");
  // Generate slug from title if not present
  return portfolio.find((item) => {
    const itemSlug = item.slug || generateSlug(item.title);
    return itemSlug === slug;
  });
}

/**
 * Get featured Portfolio items
 */
export function getFeaturedPortfolio(limit = 6) {
  const portfolio = readJSONFile("portfolio.json");
  return portfolio.filter((item) => item.featured).slice(0, limit);
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
  return readJSONFile("technologies.json");
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
  return readJSONFile("gallery.json");
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
