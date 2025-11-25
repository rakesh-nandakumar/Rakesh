/**
 * Advanced Sitemap Generation
 * Generates multiple sitemaps with proper priorities and change frequencies
 */

import { getAllBlogSlugs } from '@/lib/blogUtils';
import { getPortfolios } from '@/lib/supabaseData';

const BASE_URL = 'https://rakeshn.com';

/**
 * Generate pages sitemap
 * @returns {Array} - Sitemap entries for static pages
 */
export async function generatePagesSitemap() {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return staticPages;
}

/**
 * Generate blogs sitemap
 * @returns {Array} - Sitemap entries for blog posts
 */
export async function generateBlogsSitemap() {
  try {
    const blogSlugs = await getAllBlogSlugs();
    
    return blogSlugs.map((slug) => ({
      url: `${BASE_URL}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating blog sitemap entries:', error);
    return [];
  }
}

/**
 * Generate portfolio sitemap
 * @returns {Array} - Sitemap entries for portfolio items
 */
export async function generatePortfolioSitemap() {
  try {
    const portfolioData = await getPortfolios();
    
    return (portfolioData || []).map((project) => {
      const slug = (project.title || project.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return {
        url: `${BASE_URL}/portfolio/${slug}`,
        lastModified: new Date(project.updated_at || project.created_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.8,
      };
    });
  } catch (error) {
    console.error('Error generating portfolio sitemap:', error);
    return [];
  }
}

/**
 * Generate images sitemap
 * @returns {Array} - Sitemap entries for images
 */
export async function generateImagesSitemap() {
  const images = [];

  try {
    // Add hero image
    images.push({
      loc: `${BASE_URL}/hero.jpg`,
      title: 'Rakesh Nandakumar - Full Stack Developer',
      caption: 'Professional full stack developer with expertise in Laravel, React, and Vue.js',
    });

    // Add avatar
    images.push({
      loc: `${BASE_URL}/avatar.png`,
      title: 'Rakesh Nandakumar Profile Picture',
      caption: 'Professional profile photo of Rakesh Nandakumar',
    });

    // Add portfolio images
    const portfolioData = await getPortfolios();
    (portfolioData || []).forEach((project) => {
      if (project.image) {
        images.push({
          loc: project.image,
          title: project.title || project.name,
          caption: project.description || `Portfolio project: ${project.title}`,
        });
      }
    });

    return images;
  } catch (error) {
    console.error('Error generating images sitemap:', error);
    return images;
  }
}

/**
 * Calculate sitemap priority based on page type and importance
 * @param {string} pageType - Type of page
 * @param {Object} metadata - Page metadata
 * @returns {number} - Priority value (0-1)
 */
export function calculateSitemapPriority(pageType, metadata = {}) {
  const basePriorities = {
    homepage: 1.0,
    about: 0.9,
    contact: 0.8,
    portfolio_index: 0.9,
    portfolio_item: 0.8,
    blog_index: 0.9,
    blog_post: 0.7,
    category: 0.6,
    tag: 0.5,
  };

  let priority = basePriorities[pageType] || 0.5;

  // Boost priority for frequently updated content
  if (metadata.updateFrequency === 'high') {
    priority = Math.min(1.0, priority + 0.1);
  }

  // Boost priority for featured content
  if (metadata.featured) {
    priority = Math.min(1.0, priority + 0.1);
  }

  return priority;
}

/**
 * Calculate change frequency based on update history
 * @param {Array<Date>} updateDates - Array of update dates
 * @returns {string} - Change frequency
 */
export function calculateChangeFrequency(updateDates) {
  if (!updateDates || updateDates.length < 2) {
    return 'monthly';
  }

  // Calculate average days between updates
  const intervals = [];
  for (let i = 1; i < updateDates.length; i++) {
    const diff = updateDates[i] - updateDates[i - 1];
    intervals.push(diff);
  }

  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const avgDays = avgInterval / (1000 * 60 * 60 * 24);

  if (avgDays <= 1) return 'daily';
  if (avgDays <= 7) return 'weekly';
  if (avgDays <= 30) return 'monthly';
  if (avgDays <= 365) return 'yearly';
  return 'yearly';
}

/**
 * Generate sitemap index (points to multiple sitemaps)
 * @returns {Object} - Sitemap index structure
 */
export function generateSitemapIndex() {
  return {
    sitemaps: [
      {
        loc: `${BASE_URL}/sitemap.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${BASE_URL}/sitemap-pages.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${BASE_URL}/sitemap-blogs.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${BASE_URL}/sitemap-portfolio.xml`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${BASE_URL}/sitemap-images.xml`,
        lastmod: new Date().toISOString(),
      },
    ],
  };
}

/**
 * Validate sitemap entry
 * @param {Object} entry - Sitemap entry
 * @returns {boolean} - Valid or not
 */
export function validateSitemapEntry(entry) {
  if (!entry.url || typeof entry.url !== 'string') {
    return false;
  }

  if (entry.priority && (entry.priority < 0 || entry.priority > 1)) {
    return false;
  }

  const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  if (entry.changeFrequency && !validFrequencies.includes(entry.changeFrequency)) {
    return false;
  }

  return true;
}

export default {
  generatePagesSitemap,
  generateBlogsSitemap,
  generatePortfolioSitemap,
  generateImagesSitemap,
  calculateSitemapPriority,
  calculateChangeFrequency,
  generateSitemapIndex,
  validateSitemapEntry,
};
