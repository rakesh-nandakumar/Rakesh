/**
 * JSON Data Loader with Asset Resolution
 * Server-side utility to load JSON files and resolve asset URLs
 */

import fs from "fs";
import path from "path";
import { resolveDataAssets } from "./fileStorage";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Load and process JSON data file with asset resolution
 * @param {string} filename - Name of the JSON file (e.g., 'blogs.json')
 * @param {string[]} imageFields - Optional custom image field names
 * @returns {any} - Processed data with resolved asset URLs
 */
export function loadJsonData(filename, imageFields) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Resolve asset URLs based on storage mode
    return resolveDataAssets(data, imageFields);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    throw error;
  }
}

/**
 * Load blogs data with resolved asset URLs
 * @returns {Array} - Array of blog posts
 */
export function loadBlogsData() {
  return loadJsonData("blogs.json", ["image"]);
}

/**
 * Load portfolio/projects data with resolved asset URLs
 * @returns {Array} - Array of portfolio items
 */
export function loadPortfolioData() {
  return loadJsonData("portfolio.json", ["image"]);
}

/**
 * Load about data with resolved asset URLs
 * @returns {Object} - About data
 */
export function loadAboutData() {
  return loadJsonData("about.json", ["profileImage", "heroImage"]);
}

/**
 * Load technologies data with resolved asset URLs
 * @returns {Array} - Array of technologies
 */
export function loadTechnologiesData() {
  return loadJsonData("technologies.json", ["icon"]);
}

/**
 * Load gallery data with resolved asset URLs
 * @returns {Array} - Array of gallery items
 */
export function loadGalleryData() {
  return loadJsonData("gallery.json", ["src"]);
}

/**
 * Load services data
 * @returns {Object} - Services data (services don't typically have image URLs)
 */
export function loadServicesData() {
  return loadJsonData("services.json");
}

/**
 * Load timeline data
 * @returns {Array} - Array of timeline items
 */
export function loadTimelineData() {
  return loadJsonData("timeline.json");
}

/**
 * Load site config
 * @returns {Object} - Site configuration
 */
export function loadSiteConfig() {
  return loadJsonData("site-config.json");
}

/**
 * Load header data
 * @returns {Object} - Header configuration
 */
export function loadHeaderData() {
  return loadJsonData("header.json");
}

/**
 * Generic data loader for any JSON file
 * @param {string} filename - Name of the JSON file
 * @param {string[]} imageFields - Optional array of image field names
 * @returns {any} - Loaded and processed data
 */
export function loadData(filename, imageFields) {
  return loadJsonData(filename, imageFields);
}
