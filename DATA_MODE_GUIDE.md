# Data Mode Configuration Guide

This project supports fetching data from either **JSON files** or **MongoDB** database, controlled by the `DATA_MODE` environment variable.

## Quick Start

### 1. Set the Data Mode

In your `.env` file, set the `DATA_MODE` variable:

```env
# Use MongoDB
DATA_MODE=mongodb

# OR use JSON files
DATA_MODE=json
```

### 2. MongoDB Setup (if using MongoDB mode)

Make sure you have the `MONGODB_URI` configured in your `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### 3. Migration (First Time Setup for MongoDB)

If you're switching to MongoDB for the first time, migrate your JSON data to MongoDB:

```bash
npm run migrate
```

This will:

- Connect to your MongoDB database
- Read all JSON files from the `data/` folder
- Insert the data into MongoDB collections
- Preserve the exact structure of your data

## How It Works

### Data Service Layer

All data fetching goes through `/lib/dataService.js`, which provides a unified API:

```javascript
import { getBlogs, getPortfolio, getAbout, ... } from '@/lib/dataService';

// This will fetch from MongoDB or JSON based on DATA_MODE
const blogs = await getBlogs();
const portfolio = await getPortfolio();
const about = await getAbout();
```

### Available Data Service Functions

#### Blog Functions

- `getBlogs()` - Get all blogs
- `getBlogBySlug(slug)` - Get a single blog by slug
- `getFeaturedBlogs(limit)` - Get featured blogs

#### Portfolio Functions

- `getPortfolio()` - Get all portfolio items
- `getPortfolioBySlug(slug)` - Get a single portfolio item
- `getFeaturedPortfolio(limit)` - Get featured portfolio items

#### Other Data Functions

- `getAbout()` - Get about data
- `getServices()` - Get services data
- `getTechnologies()` - Get technologies data
- `getTimeline()` - Get timeline data
- `getHeader()` - Get header/navigation data
- `getGallery()` - Get gallery data
- `getSiteConfig()` - Get site configuration

#### Utility Functions

- `getDataMode()` - Returns current data mode ('json' or 'mongodb')
- `isUsingMongoDB()` - Returns true if using MongoDB
- `isUsingJSON()` - Returns true if using JSON files

## API Endpoints

The following API endpoints are available for client-side data fetching:

### GET /api/blogs

Fetch all blogs

```javascript
fetch("/api/blogs")
  .then((res) => res.json())
  .then((blogs) => console.log(blogs));
```

### GET /api/portfolio

Fetch all portfolio items

```javascript
fetch("/api/portfolio")
  .then((res) => res.json())
  .then((portfolio) => console.log(portfolio));
```

### GET /api/data?type={type}

Fetch specific data type. Available types:

- `about`
- `header`
- `services`
- `technologies`
- `timeline`
- `gallery`
- `site-config`

```javascript
fetch("/api/data?type=about")
  .then((res) => res.json())
  .then((aboutData) => console.log(aboutData));
```

## MongoDB Collections

When using MongoDB mode, data is stored in these collections:

| Collection     | Model         | Description               |
| -------------- | ------------- | ------------------------- |
| `about`        | About.js      | About/profile information |
| `blogs`        | Blog.js       | Blog posts                |
| `portfolio`    | Portfolio.js  | Portfolio projects        |
| `services`     | Service.js    | Services offered          |
| `technologies` | Technology.js | Technology stack          |
| `timeline`     | Timeline.js   | Career timeline           |
| `header`       | Header.js     | Navigation header         |
| `gallery`      | Gallery.js    | Gallery images            |
| `siteconfig`   | SiteConfig.js | Site configuration        |

## Data Structure

### JSON Files (data/ folder)

```
data/
  ├── about.json
  ├── blogs.json
  ├── portfolio.json
  ├── services.json
  ├── technologies.json
  ├── timeline.json
  ├── header.json
  ├── gallery.json
  └── site-config.json
```

### MongoDB Models (models/ folder)

```
models/
  ├── About.js
  ├── Blog.js
  ├── Portfolio.js
  ├── Service.js
  ├── Technology.js
  ├── Timeline.js
  ├── Header.js
  ├── Gallery.js
  └── SiteConfig.js
```

## Switching Between Modes

You can switch between JSON and MongoDB at any time:

### Switch to MongoDB

1. Set `DATA_MODE=mongodb` in `.env`
2. Ensure MongoDB is properly configured
3. Restart your dev server: `npm run dev`

### Switch to JSON

1. Set `DATA_MODE=json` in `.env`
2. Restart your dev server: `npm run dev`

## Benefits

### MongoDB Mode

✅ Scalable for large datasets  
✅ Real-time updates possible  
✅ Advanced querying capabilities  
✅ Can add admin interface for content management  
✅ Better performance for large datasets

### JSON Mode

✅ Simple and straightforward  
✅ No database setup required  
✅ Easy to version control  
✅ Fast for small datasets  
✅ Good for static content

## Troubleshooting

### MongoDB Connection Issues

```bash
# Test MongoDB connection
node -e "require('dotenv').config(); require('./lib/mongodb.js').default();"
```

### Migration Issues

```bash
# Re-run migration (will clear and re-insert data)
npm run migrate
```

### Check Current Data Mode

Add this to any server component:

```javascript
import { getDataMode } from "@/lib/dataService";
console.log("Current data mode:", getDataMode());
```

## Advanced Usage

### Custom Data Fetching

You can extend the data service to add custom functions:

```javascript
// In lib/dataService.js

export async function getCustomData() {
  if (DATA_MODE === "mongodb") {
    await dbConnect();
    const data = await CustomModel.find().lean();
    return data;
  }
  return readJSONFile("custom-data.json");
}
```

### Hybrid Mode

You can even mix modes for different data types by modifying the dataService functions individually.

## Production Considerations

1. **Environment Variables**: Ensure `DATA_MODE` is set in production
2. **MongoDB**: Use connection pooling and proper indexes
3. **Caching**: Consider adding Redis or similar for frequently accessed data
4. **Backups**: Regular backups of MongoDB or version control for JSON
5. **Monitoring**: Monitor MongoDB performance and queries

## Summary

- ✅ Added `DATA_MODE` environment variable
- ✅ Created unified data service layer
- ✅ Updated all pages and components
- ✅ Created API endpoints for client-side fetching
- ✅ Migration script for MongoDB setup
- ✅ Seamless switching between data sources

For questions or issues, please refer to the project documentation or open an issue.
