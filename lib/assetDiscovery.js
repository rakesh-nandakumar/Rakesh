/**
 * Asset Discovery Service
 * Scans all JSON files and extracts all file references
 * Supports images, icons, PDFs, and any other file types
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");

/**
 * Fields that typically contain file paths
 * Comprehensive list covering all possible asset types
 */
const ASSET_FIELDS = [
  "image",
  "icon",
  "src",
  "profileImage",
  "heroImage",
  "cvLink",
  "cv",
  "resume",
  "pdf",
  "file",
  "document",
  "attachment",
  "thumbnail",
  "cover",
  "banner",
  "logo",
  "avatar",
  "photo",
  "media",
  "video",
  "audio",
];

/**
 * File extensions we consider as assets
 */
const ASSET_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".avif",
  ".pdf",
  ".doc",
  ".docx",
  ".mp4",
  ".webm",
  ".mov",
  ".mp3",
  ".wav",
  ".ogg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
];

/**
 * Recursively extract asset paths from any data structure
 */
function extractAssetPaths(data, collected = new Set()) {
  if (!data) return collected;

  if (Array.isArray(data)) {
    data.forEach((item) => extractAssetPaths(item, collected));
  } else if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      // Check if this field name suggests it's an asset
      const isAssetField = ASSET_FIELDS.includes(key.toLowerCase());

      if (isAssetField && typeof value === "string") {
        // Check if it's a local path (not external URL)
        if (value.startsWith("/") && !value.startsWith("//")) {
          const ext = path.extname(value).toLowerCase();
          if (ASSET_EXTENSIONS.includes(ext) || ext === "") {
            collected.add(value);
          }
        }
      } else if (typeof value === "object") {
        extractAssetPaths(value, collected);
      }
    });
  }

  return collected;
}

/**
 * Scan all JSON files in data directory
 * Note: This function is deprecated as data is now stored in Supabase
 */
export function discoverAllAssets() {
  const assets = new Set();

  try {
    // Check if data directory exists (backwards compatibility)
    if (!fs.existsSync(DATA_DIR)) {
      console.log("Data directory not found - using Supabase for data storage");
      return assets;
    }

    const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));

    files.forEach((file) => {
      try {
        const filePath = path.join(DATA_DIR, file);
        const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
        extractAssetPaths(content, assets);
      } catch (error) {
        console.error(`Error reading ${file}:`, error.message);
      }
    });
  } catch (error) {
    console.error("Error scanning data directory:", error.message);
  }

  return Array.from(assets).sort();
}

/**
 * Get assets by category
 */
export function categorizeAssets(assetPaths) {
  const categories = {
    images: [],
    icons: [],
    documents: [],
    media: [],
    other: [],
  };

  assetPaths.forEach((assetPath) => {
    const ext = path.extname(assetPath).toLowerCase();
    const pathLower = assetPath.toLowerCase();

    if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"].includes(ext)) {
      if (pathLower.includes("icon") || pathLower.includes("tech-icons")) {
        categories.icons.push(assetPath);
      } else {
        categories.images.push(assetPath);
      }
    } else if ([".pdf", ".doc", ".docx"].includes(ext)) {
      categories.documents.push(assetPath);
    } else if (
      [".mp4", ".webm", ".mov", ".mp3", ".wav", ".ogg"].includes(ext)
    ) {
      categories.media.push(assetPath);
    } else if ([".svg"].includes(ext)) {
      categories.icons.push(assetPath);
    } else {
      categories.other.push(assetPath);
    }
  });

  return categories;
}

/**
 * Get asset manifest with metadata
 */
export async function getAssetManifest() {
  const assets = await discoverAllAssets();
  const categorized = categorizeAssets(assets);

  return {
    assets: categorized,
    totalAssets: assets.length,
    cacheVersion: "v1.0.0",
    categories: {
      images: categorized.images.length,
      icons: categorized.icons.length,
      documents: categorized.documents.length,
      media: categorized.media.length,
      other: categorized.other.length,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if asset exists in public directory
 */
export function assetExists(assetPath) {
  const publicPath = path.join(
    process.cwd(),
    "public",
    assetPath.startsWith("/") ? assetPath.substring(1) : assetPath
  );
  return fs.existsSync(publicPath);
}

/**
 * Get assets that exist vs missing
 */
export function validateAssets() {
  const assets = discoverAllAssets();
  const existing = [];
  const missing = [];

  assets.forEach((asset) => {
    if (assetExists(asset)) {
      existing.push(asset);
    } else {
      missing.push(asset);
    }
  });

  return { existing, missing };
}

// Export for use in other modules
export default {
  discoverAllAssets,
  categorizeAssets,
  getAssetManifest,
  assetExists,
  validateAssets,
};
