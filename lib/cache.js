/**
 * In-Memory Cache Layer for Server-Side Data
 * Reduces database queries and improves performance
 */

class Cache {
  constructor() {
    this.store = new Map();
    this.timestamps = new Map();
  }

  set(key, value, ttl = 60000) {
    // Default 60 seconds TTL
    this.store.set(key, value);
    this.timestamps.set(key, Date.now() + ttl);
  }

  get(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp || Date.now() > timestamp) {
      // Expired or doesn't exist
      this.delete(key);
      return null;
    }
    return this.store.get(key);
  }

  delete(key) {
    this.store.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.store.clear();
    this.timestamps.clear();
  }

  // Get cache stats
  stats() {
    return {
      size: this.store.size,
      keys: Array.from(this.store.keys()),
    };
  }
}

// Singleton instance
const cache = new Cache();

// Cache wrapper function
export async function withCache(key, fetcher, ttl = 60000) {
  const cached = cache.get(key);
  if (cached !== null) {
    return cached;
  }

  const data = await fetcher();
  cache.set(key, data, ttl);
  return data;
}

// Export cache instance
export { cache };
export default cache;
