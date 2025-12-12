/**
 * Supabase Client Configuration
 * 
 * This module provides configured Supabase clients for both server-side
 * and client-side usage in a Next.js application.
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Create singleton clients to avoid recreating on each request
let _supabase = null;
let _supabaseAdmin = null;

/**
 * Create Supabase client with realtime completely disabled
 * Note: We disable realtime to avoid Node.js 18+ stream compatibility issues
 * with the transformAlgorithm error in WebSocket streams
 */
function createSupabaseClient(key) {
  if (!supabaseUrl || !key) {
    return null;
  }
  
  const client = createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    db: {
      schema: 'public',
    },
    // Disable realtime completely
    realtime: {
      params: {
        eventsPerSecond: 0,
      },
      timeout: 0,
    },
    global: {
      headers: { 'x-my-custom-header': 'portfolio-app' },
    },
  });
  
  // Aggressively patch and disconnect realtime to prevent any WebSocket connections
  if (client.realtime) {
    // Immediately disconnect
    try {
      client.realtime.disconnect();
      // Remove all channels
      client.realtime.channels = [];
    } catch (e) {
      // Ignore errors
    }
    
    // Override channel method to return a no-op channel
    client.channel = () => ({
      subscribe: () => ({ unsubscribe: () => {} }),
      unsubscribe: () => {},
      on: () => ({ subscribe: () => {} }),
      send: () => Promise.resolve(),
    });
    
    // Override removeChannel
    client.removeChannel = () => Promise.resolve();
    client.removeAllChannels = () => Promise.resolve();
  }
  
  return client;
}

/**
 * Supabase client for client-side usage (browser)
 * Uses the anon key which respects Row Level Security (RLS)
 */
export function getSupabase() {
  if (!_supabase) {
    _supabase = createSupabaseClient(supabaseAnonKey);
  }
  return _supabase;
}

// Lazy getter for backward compatibility
export const supabase = {
  get from() {
    return getSupabase()?.from.bind(getSupabase());
  },
  get storage() {
    return getSupabase()?.storage;
  },
  get auth() {
    return getSupabase()?.auth;
  },
  get rpc() {
    return getSupabase()?.rpc.bind(getSupabase());
  },
};

/**
 * Supabase client for server-side usage
 * Uses the service role key which bypasses RLS
 * ONLY use this on the server-side (API routes, Server Components)
 */
export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = supabaseServiceRoleKey
      ? createSupabaseClient(supabaseServiceRoleKey)
      : getSupabase();
  }
  return _supabaseAdmin;
}

// Lazy getter for backward compatibility
export const supabaseAdmin = {
  get from() {
    return getSupabaseAdmin()?.from.bind(getSupabaseAdmin());
  },
  get storage() {
    return getSupabaseAdmin()?.storage;
  },
  get auth() {
    return getSupabaseAdmin()?.auth;
  },
  get rpc() {
    return getSupabaseAdmin()?.rpc.bind(getSupabaseAdmin());
  },
};

/**
 * Get the appropriate Supabase client based on context
 * @param {boolean} isServer - Whether this is being called from the server
 * @returns {SupabaseClient} The appropriate Supabase client
 */
export function getSupabaseClient(isServer = false) {
  return isServer ? getSupabaseAdmin() : getSupabase();
}

/**
 * Storage bucket names
 * Note: All files are in the 'portfolio' bucket with subfolders
 */
export const STORAGE_BUCKETS = {
  PORTFOLIO: 'portfolio',  // Main bucket containing all files
  // Subfolders within portfolio bucket
  IMAGES: 'images',
  PROJECTS: 'projects',
  BLOGS: 'blogs',
  ASSETS: 'assets',
  TECH_ICONS: 'tech-icons',
};

// Supabase storage base URL
const STORAGE_BASE_URL = supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/portfolio` : '';

/**
 * Get public URL for a file in Supabase Storage
 * All files are in the 'portfolio' bucket
 * @param {string} bucketOrPath - Either a subfolder name or direct path
 * @param {string} path - The file path (optional if bucketOrPath is the full path)
 * @returns {string} The public URL
 */
export function getStorageUrl(bucketOrPath, path) {
  if (!bucketOrPath && !path) return '';
  
  // Check if path is already a full URL FIRST (before combining)
  if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }
  
  // Check if bucketOrPath is already a full URL
  if (bucketOrPath && (bucketOrPath.startsWith('http://') || bucketOrPath.startsWith('https://'))) {
    return bucketOrPath;
  }
  
  // If path is provided, treat bucketOrPath as subfolder
  const fullPath = path ? `${bucketOrPath}/${path}` : bucketOrPath;
  
  // If it's a local path starting with /, map to storage
  if (fullPath.startsWith('/')) {
    const cleanPath = fullPath.substring(1); // Remove leading /
    
    // Check for known subfolder paths
    if (cleanPath.startsWith('projects/') || 
        cleanPath.startsWith('blogs/') || 
        cleanPath.startsWith('tech-icons/') || 
        cleanPath.startsWith('images/')) {
      return `${STORAGE_BASE_URL}/${cleanPath}`;
    }
    
    // For root-level files like /avatar.png, /hero.jpg, etc.
    // These are stored at the root of the portfolio bucket
    return `${STORAGE_BASE_URL}/${cleanPath}`;
  }
  
  // For paths without leading /, add them directly
  return `${STORAGE_BASE_URL}/${fullPath}`;
}

/**
 * Get the public URL for a file in the portfolio bucket
 * @param {string} subfolder - The subfolder within portfolio bucket (or empty for root)
 * @param {string} filename - The filename
 * @returns {string} The public URL
 */
export function getStoragePublicUrl(subfolder, filename) {
  if (!filename) return '';
  
  if (subfolder) {
    return `${STORAGE_BASE_URL}/${subfolder}/${filename}`;
  }
  return `${STORAGE_BASE_URL}/${filename}`;
}

/**
 * Helper to transform image paths in data objects
 * @param {Object|Array} data - The data to transform
 * @param {string[]} imageFields - Array of field names that contain image paths
 * @returns {Object|Array} Data with transformed image URLs
 */
export function transformImageUrls(data, imageFields = ['image', 'src', 'icon', 'profileImage', 'heroImage', 'avatarImage']) {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => transformImageUrls(item, imageFields));
  }
  
  if (typeof data === 'object') {
    const transformed = { ...data };
    
    for (const field of imageFields) {
      if (transformed[field]) {
        transformed[field] = getStorageUrl(STORAGE_BUCKETS.IMAGES, transformed[field]);
      }
    }
    
    return transformed;
  }
  
  return data;
}

export default supabase;
