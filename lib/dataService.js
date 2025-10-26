/**
 * Data Service Layer
 *
 * This service provides a unified API to fetch data from either JSON files or MongoDB
 * based on the DATA_MODE environment variable.
 *
 * Usage:
 * - Set DATA_MODE=mongodb in .env to use MongoDB
 * - Set DATA_MODE=json in .env to use local JSON files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dbConnect from "./mongodb.js";

// Import models
import About from "../models/About.js";
import Blog from "../models/Blog.js";
import Portfolio from "../models/Portfolio.js";
import Service from "../models/Service.js";
import Technology from "../models/Technology.js";
import Timeline from "../models/Timeline.js";
import Header from "../models/Header.js";
import Gallery from "../models/Gallery.js";
import SiteConfig from "../models/SiteConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const DATA_MODE = process.env.DATA_MODE || "json"; // Default to 'json' if not set

/**
 * Read JSON file from the data directory
 */
function readJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

/**
 * Get About data
 */
export async function getAbout() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const about = await About.findOne().lean();
    return about;
  }
  return readJSONFile("about.json");
}

/**
 * Get all Blogs
 */
export async function getBlogs() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const blogs = await Blog.find().sort({ date: -1 }).lean();
    return blogs;
  }
  return readJSONFile("blogs.json");
}

/**
 * Get a single Blog by slug
 */
export async function getBlogBySlug(slug) {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    // Try to find by id field (which acts as slug in blog data)
    const blog = await Blog.findOne({ id: slug }).lean();
    return blog;
  }
  const blogs = readJSONFile("blogs.json");
  return blogs.find((blog) => blog.id === slug || blog.slug === slug);
}

/**
 * Get featured Blogs
 */
export async function getFeaturedBlogs(limit = 3) {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const blogs = await Blog.find({ featured: true })
      .sort({ date: -1 })
      .limit(limit)
      .lean();
    return blogs;
  }
  const blogs = readJSONFile("blogs.json");
  return blogs.filter((blog) => blog.featured).slice(0, limit);
}

/**
 * Get all Portfolio items
 */
export async function getPortfolio() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const portfolio = await Portfolio.find().sort({ order: 1 }).lean();
    return portfolio;
  }
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
export async function getPortfolioBySlug(slug) {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    // Try to find by slug first
    let item = await Portfolio.findOne({ slug }).lean();
    // If not found, try to find by generating slug from title
    if (!item) {
      const allItems = await Portfolio.find().lean();
      item = allItems.find((p) => generateSlug(p.title) === slug);
    }
    return item;
  }
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
export async function getFeaturedPortfolio(limit = 6) {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const portfolio = await Portfolio.find({ featured: true })
      .sort({ order: 1 })
      .limit(limit)
      .lean();
    return portfolio;
  }
  const portfolio = readJSONFile("portfolio.json");
  return portfolio.filter((item) => item.featured).slice(0, limit);
}

/**
 * Get Services data
 */
export async function getServices() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const service = await Service.findOne().lean();
    return service;
  }
  return readJSONFile("services.json");
}

/**
 * Get Technologies data
 */
export async function getTechnologies() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const technologies = await Technology.find().sort({ order: 1 }).lean();
    return technologies;
  }
  return readJSONFile("technologies.json");
}

/**
 * Get Timeline data
 */
export async function getTimeline() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const timeline = await Timeline.findOne().lean();
    return timeline;
  }
  return readJSONFile("timeline.json");
}

/**
 * Get Header data
 */
export async function getHeader() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const header = await Header.findOne().lean();
    return header;
  }
  return readJSONFile("header.json");
}

/**
 * Get Gallery data
 */
export async function getGallery() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const gallery = await Gallery.find().sort({ order: 1 }).lean();
    return gallery;
  }
  return readJSONFile("gallery.json");
}

/**
 * Get Site Config data
 */
export async function getSiteConfig() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const config = await SiteConfig.findOne().lean();
    return config;
  }
  return readJSONFile("site-config.json");
}

/**
 * Get current data mode
 */
export function getDataMode() {
  return DATA_MODE;
}

/**
 * Check if using MongoDB
 */
export function isUsingMongoDB() {
  return DATA_MODE === "mongodb";
}

/**
 * Check if using JSON files
 */
export function isUsingJSON() {
  return DATA_MODE === "json";
}

// Default export with all functions
export default {
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
  getDataMode,
  isUsingMongoDB,
  isUsingJSON,
};
