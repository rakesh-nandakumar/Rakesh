/**
 * File Storage Utility
 * All files are served from Supabase Storage
 * Works with files referenced in JSON data files and components
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_STORAGE_BUCKET = "portfolio";

/**
 * Resolves a file path to Supabase storage URL
 * @param {string} path - The original path (e.g., "/blogs/leetcode.png" or "avatar.png")
 * @returns {string} - The resolved Supabase URL
 */
export function resolveAssetUrl(path) {
  if (!path) return path;

  // If it's already a full URL, return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Always use Supabase storage
  if (SUPABASE_URL) {
    // Remove leading slash if present
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${cleanPath}`;
  }

  // Fallback: return original path (should not happen in production)
  console.warn(
    `⚠️ Supabase URL not configured. Falling back to system path: ${path}`
  );
  return path;
}

/**
 * Processes an object and resolves all asset URLs based on storage mode
 * Works recursively through nested objects and arrays
 * @param {any} data - The data to process
 * @param {string[]} assetFields - Array of field names that contain asset paths
 * @returns {any} - Processed data with resolved URLs
 */
export function resolveDataAssets(
  data,
  assetFields = [
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
  ]
) {
  if (!data) return data;

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map((item) => resolveDataAssets(item, assetFields));
  }

  // Handle objects
  if (typeof data === "object") {
    const processed = {};
    for (const [key, value] of Object.entries(data)) {
      // If this field is an asset field, resolve the URL
      if (assetFields.includes(key) && typeof value === "string") {
        processed[key] = resolveAssetUrl(value);
      }
      // Recursively process nested objects/arrays
      else if (typeof value === "object") {
        processed[key] = resolveDataAssets(value, assetFields);
      }
      // Keep other values as-is
      else {
        processed[key] = value;
      }
    }
    return processed;
  }

  // Return primitives as-is
  return data;
}

/**
 * Check if Supabase storage is properly configured
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  return !!SUPABASE_URL;
}

/**
 * Get Supabase storage bucket name
 * @returns {string}
 */
export function getStorageBucket() {
  return SUPABASE_STORAGE_BUCKET;
}

/**
 * Get the full Supabase storage URL
 * @returns {string}
 */
export function getSupabaseUrl() {
  return SUPABASE_URL;
}

/**
 * Backward compatibility helper.
 * Legacy code expected a storage mode switch (system|supabase). We now always
 * use Supabase, but some routes/tests still import getStorageMode. Exporting
 * this stub prevents build errors and makes migration incremental.
 * @returns {string} 'supabase'
 */
export function getStorageMode() {
  return "supabase";
}
