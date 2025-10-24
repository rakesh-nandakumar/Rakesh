/**
 * MongoDB Migration Script
 *
 * This script migrates data from JSON files to MongoDB Atlas.
 * It preserves the exact structure of the data.
 *
 * Usage: node scripts/migrate-to-mongodb.js
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from  .env BEFORE importing mongodb
dotenv.config({ path: path.join(__dirname, "../.env") });

import dbConnect from "../lib/mongodb.js";

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

const DATA_DIR = path.join(__dirname, "../data");

// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  data: (msg) => console.log(`${colors.cyan}→${colors.reset} ${msg}`),
};

/**
 * Read JSON file
 */
function readJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

/**
 * Clear a collection
 */
async function clearCollection(Model, collectionName) {
  try {
    await Model.deleteMany({});
    log.info(`Cleared ${collectionName} collection`);
  } catch (error) {
    log.error(`Error clearing ${collectionName}: ${error.message}`);
    throw error;
  }
}

/**
 * Migrate About data
 */
async function migrateAbout() {
  log.info("Migrating About data...");
  const data = readJSONFile("about.json");

  await clearCollection(About, "about");

  const about = new About(data);
  await about.save();

  log.success(`About data migrated successfully`);
  log.data(`Name: ${data.name}`);
}

/**
 * Migrate Blogs data
 */
async function migrateBlogs() {
  log.info("Migrating Blogs data...");
  const data = readJSONFile("blogs.json");

  await clearCollection(Blog, "blogs");

  const blogs = await Blog.insertMany(data);

  log.success(`${blogs.length} blogs migrated successfully`);
  log.data(`Featured blogs: ${blogs.filter((b) => b.featured).length}`);
}

/**
 * Migrate Portfolio data
 */
async function migratePortfolio() {
  log.info("Migrating Portfolio data...");
  const data = readJSONFile("portfolio.json");

  await clearCollection(Portfolio, "portfolio");

  const portfolios = await Portfolio.insertMany(data);

  log.success(`${portfolios.length} portfolio items migrated successfully`);
  log.data(
    `Categories: ${[...new Set(portfolios.map((p) => p.category))].join(", ")}`
  );
}

/**
 * Migrate Services data
 */
async function migrateServices() {
  log.info("Migrating Services data...");
  const data = readJSONFile("services.json");

  await clearCollection(Service, "services");

  const service = new Service(data);
  await service.save();

  log.success(`Services data migrated successfully`);
  log.data(`Total services: ${data.services.length}`);
}

/**
 * Migrate Technologies data
 */
async function migrateTechnologies() {
  log.info("Migrating Technologies data...");
  const data = readJSONFile("technologies.json");

  await clearCollection(Technology, "technologies");

  const technologies = await Technology.insertMany(data);

  log.success(`${technologies.length} technologies migrated successfully`);
  log.data(`Technologies: ${technologies.map((t) => t.name).join(", ")}`);
}

/**
 * Migrate Timeline data
 */
async function migrateTimeline() {
  log.info("Migrating Timeline data...");
  const data = readJSONFile("timeline.json");

  await clearCollection(Timeline, "timeline");

  const timeline = new Timeline(data);
  await timeline.save();

  log.success(`Timeline data migrated successfully`);
  log.data(`Timeline entries: ${data.timeline.length}`);
}

/**
 * Migrate Header data
 */
async function migrateHeader() {
  log.info("Migrating Header data...");
  const data = readJSONFile("header.json");

  await clearCollection(Header, "header");

  const header = new Header(data);
  await header.save();

  log.success(`Header data migrated successfully`);
  log.data(`Navigation items: ${data.navigation.length}`);
}

/**
 * Migrate Gallery data
 */
async function migrateGallery() {
  log.info("Migrating Gallery data...");
  const data = readJSONFile("gallery.json");

  await clearCollection(Gallery, "gallery");

  const galleries = await Gallery.insertMany(data);

  log.success(`${galleries.length} gallery items migrated successfully`);
  log.data(
    `Categories: ${[...new Set(galleries.map((g) => g.category))].join(", ")}`
  );
}

/**
 * Migrate Site Config data
 */
async function migrateSiteConfig() {
  log.info("Migrating Site Config data...");
  const data = readJSONFile("site-config.json");

  await clearCollection(SiteConfig, "siteconfig");

  const config = new SiteConfig(data);
  await config.save();

  log.success(`Site Config data migrated successfully`);
  const enabledFeatures = Object.entries(data)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);
  log.data(`Enabled features: ${enabledFeatures.join(", ")}`);
}

/**
 * Main migration function
 */
async function migrate() {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 Starting MongoDB Migration");
  console.log("=".repeat(60) + "\n");

  try {
    // Connect to MongoDB
    log.info("Connecting to MongoDB...");
    await dbConnect();
    log.success("Connected to MongoDB Atlas\n");

    // Run migrations
    await migrateAbout();
    console.log("");

    await migrateBlogs();
    console.log("");

    await migratePortfolio();
    console.log("");

    await migrateServices();
    console.log("");

    await migrateTechnologies();
    console.log("");

    await migrateTimeline();
    console.log("");

    await migrateHeader();
    console.log("");

    await migrateGallery();
    console.log("");

    await migrateSiteConfig();
    console.log("");

    console.log("=".repeat(60));
    log.success("✨ Migration completed successfully!");
    console.log("=".repeat(60) + "\n");

    process.exit(0);
  } catch (error) {
    console.log("\n" + "=".repeat(60));
    log.error(`Migration failed: ${error.message}`);
    console.error(error);
    console.log("=".repeat(60) + "\n");
    process.exit(1);
  }
}

// Run migration
migrate();
