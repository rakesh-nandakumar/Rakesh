# Data Structure Guide

This project uses **JSON files** as the single source of truth for all content and configuration. All data is stored in the `/data` directory and is loaded synchronously for optimal performance and SEO.

## Data Directory Structure

```
/data
├── about.json          # About page content
├── blogs.json          # Blog posts collection
├── gallery.json        # Gallery images
├── header.json         # Header/navigation configuration
├── portfolio.json      # Portfolio projects
├── rag-manifest.json   # AI/RAG system configuration
├── services.json       # Services offered
├── site-config.json    # Global site configuration
├── technologies.json   # Tech stack/skills
└── timeline.json       # Career timeline
```

## Data Service API

All data fetching is done through the `dataService` module located at `/lib/dataService.js`. This provides a unified, cached API for accessing JSON data.

### Available Functions

```javascript
import {
  getAbout, // Get about page data
  getBlogs, // Get all blog posts
  getBlogBySlug, // Get single blog by slug
  getFeaturedBlogs, // Get featured blogs (default: 3)
  getPortfolio, // Get all portfolio items
  getPortfolioBySlug, // Get single portfolio item by slug
  getFeaturedPortfolio, // Get featured portfolio items (default: 6)
  getServices, // Get services data
  getTechnologies, // Get technologies/skills
  getTimeline, // Get career timeline
  getHeader, // Get header configuration
  getGallery, // Get gallery images
  getSiteConfig, // Get global site config
  clearDataCache, // Clear cached data (development)
} from "@/lib/dataService";
```

### Performance Optimization

The data service includes built-in caching to avoid repeated file reads:

- **First read**: Data is read from JSON file and cached in memory
- **Subsequent reads**: Data is returned from cache instantly
- **Cache clearing**: Use `clearDataCache()` in development when updating JSON files

## Usage Examples

### In Server Components (Recommended)

```javascript
// app/page.js
import { getSiteConfig, getFeaturedBlogs } from "@/lib/dataService";

export default function HomePage() {
  const config = getSiteConfig();
  const blogs = getFeaturedBlogs(3);

  return (
    <div>
      <h1>{config.siteName}</h1>
      {/* Render blogs */}
    </div>
  );
}
```

### In API Routes

```javascript
// app/api/blogs/route.js
import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/dataService";

export async function GET() {
  const blogs = getBlogs();

  return NextResponse.json(blogs, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
```

### For Static Generation

```javascript
// app/blogs/[slug]/page.js
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/blogUtils";

// Generate all blog pages at build time
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  return {
    title: blog.title,
    description: blog.excerpt,
    // ... more metadata
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  return <div>{/* Render blog */}</div>;
}
```

## SEO Optimization

### Static Generation (ISR)

All pages use Next.js 15's App Router with static generation:

- **Blog posts**: Pre-rendered at build time using `generateStaticParams()`
- **Portfolio items**: Pre-rendered at build time
- **Main pages**: Server-side rendered with data loaded synchronously

### Metadata Generation

Every page includes comprehensive metadata:

```javascript
export async function generateMetadata({ params }) {
  return {
    title: '...',
    description: '...',
    keywords: [...],
    openGraph: {
      title: '...',
      description: '...',
      images: [...]
    },
    twitter: {
      card: 'summary_large_image',
      // ...
    },
    alternates: {
      canonical: 'https://...'
    }
  };
}
```

### Structured Data

All pages include JSON-LD structured data for rich search results:

- **WebSite**: Global site information
- **Person**: Author/developer information
- **BlogPosting**: Blog articles
- **Article**: Portfolio projects
- **BreadcrumbList**: Navigation hierarchy

## Data Schema Examples

### Blog Post (blogs.json)

```json
{
  "slug": "blog-post-slug",
  "title": "Blog Post Title",
  "excerpt": "Brief description...",
  "content": "Full markdown content...",
  "image": "/blogs/image.jpg",
  "category": "Technology",
  "tags": ["React", "Next.js"],
  "author": "Rakesh Nandakumar",
  "date": "2025-01-01",
  "readTime": "5 min read",
  "featured": true,
  "published": true
}
```

### Portfolio Item (portfolio.json)

```json
{
  "title": "Project Title",
  "slug": "project-slug",
  "shortDescription": "Brief description",
  "description": "Detailed description",
  "image": "/projects/image.jpg",
  "technologies": ["React", "Node.js"],
  "category": "Web Development",
  "featured": true,
  "status": "completed",
  "link": "https://...",
  "github": "https://github.com/..."
}
```

### Site Config (site-config.json)

```json
{
  "siteName": "Site Name",
  "siteUrl": "https://...",
  "ChatAssistantEnabled": true,
  "BlogEnabled": true,
  "ProjectsEnabled": true,
  "ServicesEnabled": true,
  "TechnologiesEnabled": true
}
```

## Performance Best Practices

### 1. Use Server Components

Always prefer server components for data fetching to ensure data is available at build time:

```javascript
// ✅ Good - Server Component
export default function Page() {
  const data = getData();
  return <div>{data}</div>;
}

// ❌ Avoid - Client Component with useEffect
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(res => setData(res.json()));
  }, []);
}
```

### 2. Static Generation

Use `generateStaticParams()` for dynamic routes to pre-render all pages:

```javascript
export async function generateStaticParams() {
  const items = getAllItems();
  return items.map((item) => ({ slug: item.slug }));
}
```

### 3. Cache API Responses

When you must use API routes, add cache headers:

```javascript
return NextResponse.json(data, {
  headers: {
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  },
});
```

## Development Workflow

### Adding New Content

1. **Edit JSON file** in `/data` directory
2. **Restart dev server** if data cache needs clearing
3. **Rebuild** for production deployment

### Updating Blog Posts

```bash
# 1. Edit the blog in data/blogs.json
# 2. The blog will be available immediately in development
# 3. For production, rebuild:
npm run build
```

### Adding New Data Types

1. **Create JSON file** in `/data` directory
2. **Add function** in `/lib/dataService.js`:

```javascript
export function getNewDataType() {
  return readJSONFile("new-data-type.json");
}
```

3. **Update exports** at the bottom of dataService.js

## Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build for production (pre-renders all pages)
npm run build

# Start production server
npm start
```

### Vercel Deployment

The site is optimized for Vercel deployment:

- All pages are pre-rendered at build time
- Incremental Static Regeneration (ISR) for dynamic content
- Edge-cached API routes for optimal performance
- Automatic compression and optimization

### Environment Variables

No environment variables required for data fetching! All data is local.

Optional variables:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact form
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# ReCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

## Troubleshooting

### Data Not Updating

If your JSON changes aren't reflected:

1. **Development**: Restart the dev server
2. **Production**: Rebuild the site (`npm run build`)

### Cache Issues

If you need to clear the cache in development:

```javascript
import { clearDataCache } from "@/lib/dataService";

// In your development code
clearDataCache();
```

### Build Errors

Common issues and solutions:

1. **JSON Syntax Error**: Validate your JSON files
2. **Missing Fields**: Ensure all required fields are present in JSON
3. **Slug Conflicts**: Ensure all slugs are unique

## Best Practices

### ✅ DO

- Keep JSON files properly formatted and validated
- Use descriptive, SEO-friendly slugs
- Include all required metadata fields
- Optimize images before adding to JSON
- Use featured flags to highlight content
- Keep content organized and consistent

### ❌ DON'T

- Don't store large files in JSON (use file references instead)
- Don't duplicate content across JSON files
- Don't use dynamic imports in server components
- Don't fetch from API routes in server components (use direct data access)
- Don't forget to rebuild when deploying JSON changes

## Migration from Database

If you were previously using a database (like MongoDB), migrating to JSON is simple:

1. **Export your data** from the database to JSON format
2. **Place JSON files** in the `/data` directory
3. **Remove database code** and dependencies
4. **Update imports** to use the data service
5. **Rebuild and deploy**

Benefits of JSON over database:

- ✅ Faster page loads (no database queries)
- ✅ Better SEO (static generation)
- ✅ Simpler deployment (no database setup)
- ✅ Version control for content
- ✅ No database costs or maintenance

---

**Last Updated**: January 2025  
**Maintained by**: Rakesh Nandakumar
