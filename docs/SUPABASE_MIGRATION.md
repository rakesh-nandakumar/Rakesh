# Supabase Migration Guide

This document describes the migration from JSON-based data storage to Supabase database.

## Overview

The application has been migrated from reading data from local JSON files (`/data/*.json`) to fetching data from a Supabase PostgreSQL database. This provides several benefits:

- **Real-time updates**: Changes in the database are reflected immediately
- **Better scalability**: No need to rebuild the app for content changes
- **Admin interface ready**: Can easily connect a CMS/admin panel
- **File storage**: Uses Supabase Storage for images and assets
- **Type-safe queries**: Supabase provides typed responses

## Architecture Changes

### Before
```
Components → import JSON files → Static data at build time
```

### After
```
Server Components → Supabase Queries → Dynamic data with caching
Client Components → API Routes → Supabase Queries → Dynamic data
```

## File Structure

### New Core Files

```
lib/
├── supabase.js           # Supabase client configuration
├── supabaseDataService.js # All data fetching functions
└── blogUtils.js          # Updated blog utilities (async)
```

### Updated Components (Server/Client Split)

For each component that needs data:
- `Component.js` - Server component that fetches data
- `ComponentClient.js` - Client component that receives data as props

Example:
```
components/
├── HeroSection.js        # Server component - fetches data
├── HeroSectionClient.js  # Client component - renders UI
├── Header.js             # Server component
├── HeaderClient.js       # Client component
└── ...
```

### Updated Pages

All pages now use async data fetching:
- `app/page.js` - Home page
- `app/about/page.js` - About page
- `app/blogs/page.js` - Blog listing
- `app/blogs/[slug]/page.js` - Blog detail
- `app/portfolio/page.js` - Portfolio listing
- `app/portfolio/[slug]/page.js` - Portfolio detail

### Updated API Routes

- `app/api/data/route.js` - Universal data API
- `app/api/blogs/route.js` - Blog data API
- `app/api/portfolio/route.js` - Portfolio data API
- `app/api/rss/route.js` - RSS feed

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://evgqbzyytamqezwdymkb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Schema

The Supabase database includes these tables:

### Core Tables
- `profiles` - User profile information
- `profile_titles` - Multiple titles per profile
- `contact_types` - Types of contacts (email, phone, etc.)
- `contacts` - Contact information

### Content Tables
- `blogs` - Blog posts
- `blog_tags` - Tags for blog posts
- `blog_tag_relationships` - Many-to-many blog-tag relationships
- `portfolios` - Portfolio projects
- `portfolio_technologies` - Technologies used in projects
- `portfolio_key_features` - Key features of projects
- `services` - Services offered
- `service_features` - Features of services

### Navigation & UI
- `headers` - Header configuration
- `header_navigation` - Navigation items
- `header_features` - Feature items for mega menu
- `timelines` - Timeline events
- `galleries` - Gallery images
- `site_configs` - Site configuration

### Supporting Tables
- `technologies` - Technology/skill definitions
- `technology_categories` - Categories for technologies

## Storage Buckets

Supabase Storage buckets:
- `images` - Profile images, general images
- `projects` - Project screenshots and assets
- `blogs` - Blog post images
- `assets` - General assets
- `tech-icons` - Technology/skill icons

## Data Transformation

The `supabaseDataService.js` transforms Supabase data to match the existing JSON structure, ensuring backward compatibility.

Example transformation:
```javascript
// Supabase returns
{ name: 'John', profile_image: 'profile.jpg' }

// Transformed to
{ name: 'John', profileImage: '/images/profile.jpg' }
```

## Caching Strategy

1. **React cache()**: Server-side request deduplication
2. **In-memory cache**: 1-minute TTL for data
3. **API cache headers**: `Cache-Control: public, s-maxage=60`

## Migration Steps

1. Install Supabase package:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Set up environment variables in `.env.local`

3. Run the migration script:
   ```powershell
   .\migrate-to-supabase.ps1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Test all pages and functionality

## Rollback

If you need to rollback:

1. The original files are backed up with `.backup` extension
2. Run this command to restore:
   ```powershell
   Get-ChildItem -Recurse -Filter "*.backup" | ForEach-Object {
       $original = $_.FullName -replace '\.backup$', ''
       Move-Item $_.FullName $original -Force
   }
   ```

## Known Differences

### Client-side Data Fetching

Some components now fetch data client-side via API:
- `Footer` - Fetches about/header data
- `RelatedContent` - Fetches blogs/portfolio for related items
- `PortfolioPageClient` - Fetches portfolio with filter state
- `BlogsPageClient` - Fetches blogs with filter state

### Async Server Components

Page components are now async:
```javascript
// Before
export default function Page() { ... }

// After
export default async function Page() { ... }
```

### generateStaticParams

Static path generation now uses async queries:
```javascript
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

## Troubleshooting

### "Missing Supabase environment variables"
Ensure `.env.local` has all required variables.

### "Error fetching data"
Check Supabase dashboard for:
- Table exists
- RLS policies allow read access
- Service role key has correct permissions

### Images not loading
Verify:
- Storage buckets are public or have correct policies
- Image paths match storage structure

## Performance Monitoring

Monitor these metrics after migration:
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- API response times

Use the existing Web Vitals monitoring at `/api/web-vitals`.
