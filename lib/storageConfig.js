/**
 * Supabase Storage Configuration
 * 
 * This file provides constants and helper functions for accessing
 * Supabase storage URLs in client-side components.
 */

/**
 * Get the storage base URL (computed fresh each time to handle env loading)
 */
function getStorageBase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/portfolio` : '';
}

/**
 * Get the full URL for a file in Supabase storage
 * @param {string} path - The path to the file (can include subfolders)
 * @returns {string} The full public URL
 */
export function getStorageImageUrl(path) {
  if (!path) return '';
  
  // If already a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Get storage base fresh each call
  const storageBase = getStorageBase();
  
  // Return full storage URL or fallback to local path
  return storageBase ? `${storageBase}/${cleanPath}` : `/${cleanPath}`;
}

// Pre-defined URLs for common assets - use getters for lazy evaluation
export const STORAGE_URLS = {
  get avatar() { return getStorageImageUrl('avatar.png'); },
  get profileImg() { return getStorageImageUrl('profileImg.png'); },
  get hero() { return getStorageImageUrl('hero.jpg'); },
  get heroMobile() { return getStorageImageUrl('hero-mobile.jpg'); },
  get cv() { return getStorageImageUrl('cv.pdf'); },
  get favicon() { return getStorageImageUrl('favicon.ico'); },
};

export default STORAGE_URLS;
