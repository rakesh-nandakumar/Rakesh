# Rakesh Nandakumar - Portfolio & Blog

A high-performance, SEO-optimized portfolio and blog built with Next.js 15, featuring Supabase backend, cloud storage, and comprehensive SEO optimization.

## 🚀 Features

- **SEO First**: Complete metadata, structured data, and semantic HTML
- **High Performance**: Static generation, CDN delivery, and efficient caching
- **Supabase Backend**: Normalized database with PostgreSQL
- **Cloud Storage**: All assets served from Supabase Storage CDN
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4
- **Responsive Design**: Mobile-first, fully responsive layout
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Blog System**: Markdown support with syntax highlighting
- **Portfolio Showcase**: Dynamic project pages with detailed information
- **Contact Form**: Secure form with ReCAPTCHA integration
- **AI Chat Assistant**: Gemini-powered chat with RAG system

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (data, chat, RAG)
│   ├── blogs/             # Blog pages
│   ├── portfolio/         # Portfolio pages
│   └── ...                # Other pages
├── components/            # React components
├── data/                  # JSON data files (migration reference only)
├── lib/                   # Utility functions & services
│   ├── supabase.js       # Supabase client
│   ├── rag.js            # RAG system for AI chat
│   └── fileStorage.js    # Asset URL resolver
├── public/               # Static assets (minimal)
│   ├── assets/           # CSS, fonts only
│   └── sw.js             # Service Worker
├── scripts/              # Migration & utility scripts
├── supabase/             # Database migrations
└── styles/               # Global styles
```

## 🗄️ Data Architecture

- **Database**: Supabase PostgreSQL (23 normalized tables)
- **Storage**: Supabase Storage CDN (portfolio bucket)
- **Assets**: All images served from https://evgqbzyytamqezwdymkb.supabase.co
- **Caching**: Server-side caching (60-300s TTL)

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **React**: React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Feather](https://feathericons.com/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) + remark-gfm
- **Forms**: [React Hook Form](https://react-hook-form.com/)

### Backend & Database

- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Storage**: Supabase Storage (CDN-backed)
- **Authentication**: JWT + bcrypt (planned admin panel)
- **API**: Next.js API Routes

### AI & Analytics

- **AI Chat**: Google Gemini API
- **RAG System**: Server-side context retrieval
- **Analytics**: Google Analytics 4

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Supabase Configuration (Required)
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Email Configuration (for contact form)
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   GMAIL_RECIPIENT=recipient@email.com

   # ReCAPTCHA (for contact form)
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key

   # Google Analytics (optional)
   GA_MEASUREMENT_ID=G-XXXXXXXXXX

   # Gemini AI (for chat assistant)
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Set up Supabase database** (First time only)

   ```bash
   # Run database migrations
   node scripts/migrate-normalized-to-supabase.js

   # Migrate assets to Supabase Storage
   npm run migrate-assets
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

All content is managed through Supabase database. Use the admin panel (coming soon) or direct database access.

### Database Tables

- `profiles` - Personal information
- `portfolios` - Project showcase
- `blogs` - Blog posts
- `timeline` - Work experience & education
- `technologies` - Tech stack
- `services` - Services offered
- `galleries` - Image gallery
- `site_configs` - Site configuration

### Asset Management

All images are stored in Supabase Storage (`portfolio` bucket) and served via CDN.

```javascript
// Images automatically resolve to Supabase URLs
<img src="/hero.jpg" />
// → https://evgqbzyytamqezwdymkb.supabase.co/.../hero.jpg
```

### Adding Blog Posts (via Database)

```sql
-- Insert new blog post
INSERT INTO blogs (slug, title, excerpt, content, image, category, publish_date, featured)
VALUES (
  'my-new-post',
  'My New Blog Post',
  'Short description...',
  'Full markdown content...',
  'https://evgqbzyytamqezwdymkb.supabase.co/storage/v1/object/public/portfolio/blogs/my-image.png',
  'Technology',
  '2025-11-15',
  false
);

-- Add tags
INSERT INTO blog_tags (blog_id, tag)
VALUES
  ((SELECT id FROM blogs WHERE slug = 'my-new-post'), 'Next.js'),
  ((SELECT id FROM blogs WHERE slug = 'my-new-post'), 'React');
```

Edit `data/blogs.json`:

```json
{
  "slug": "your-blog-post-slug",
  "title": "Your Blog Post Title",
  "excerpt": "Brief description...",
  "content": "Full markdown content...",
  "image": "/blogs/image.jpg",
  "category": "Technology",
  "tags": ["React", "Next.js"],
  "author": "Your Name",
  "date": "2025-01-01",
  "readTime": "5 min read",
  "featured": true
}
```

### Adding Portfolio Projects

Edit `data/portfolio.json`:

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
  "link": "https://project-url.com",
  "github": "https://github.com/user/repo"
}
```

### Site Configuration

Edit `data/site-config.json` to toggle features:

```json
{
  "siteName": "Your Name",
  "ChatAssistantEnabled": true,
  "BlogEnabled": true,
  "ProjectsEnabled": true,
  "ServicesEnabled": true,
  "TechnologiesEnabled": true
}
```

For complete documentation, see [DATA_STRUCTURE.md](./DATA_STRUCTURE.md)

## 🎨 Customization

### Updating Personal Info

1. **Profile Image**: Replace `public/profileImg.jpg`
2. **About Content**: Edit `data/about.json`
3. **Header/Nav**: Edit `data/header.json`
4. **Services**: Edit `data/services.json`
5. **Timeline**: Edit `data/timeline.json`

### Styling

- **Global Styles**: `app/globals.css`
- **Component Styles**: Individual CSS files in `styles/`
- **Tailwind Config**: `tailwind.config.js`

## 📊 SEO Optimization

This project is fully optimized for search engines:

- ✅ **Static Generation**: All pages pre-rendered for instant loading
- ✅ **Meta Tags**: Complete title, description, keywords
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Structured Data**: JSON-LD for rich search results
- ✅ **Sitemap**: Auto-generated at `/sitemap.xml`
- ✅ **RSS Feed**: Available at `/api/rss`
- ✅ **Canonical URLs**: Proper URL canonicalization
- ✅ **Image Optimization**: Next.js Image component with WebP/AVIF
- ✅ **Performance**: Lighthouse score 95+

## 🏗️ Building for Production

```bash
# Build the production version
npm run build

# Start the production server
npm start
```

### Build Optimization

The build process:

- Pre-renders all static pages
- Generates optimized images
- Minifies CSS and JavaScript
- Creates service worker for caching
- Generates sitemap and RSS feed

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

The site will be automatically deployed on every push to main.

### Other Platforms

This is a standard Next.js app and can be deployed to:

- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, SEO, Accessibility)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Total Bundle Size**: < 200KB (gzipped)

Performance optimizations:

- Static generation for all pages
- Image optimization with WebP/AVIF
- Code splitting and lazy loading
- Efficient caching strategy
- Minimal JavaScript bundle

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run analyze      # Analyze bundle size
```

## 📚 Documentation

- [Data Structure Guide](./DATA_STRUCTURE.md) - Complete guide to JSON-based content
- [Local Assets Migration](./LOCAL_ASSETS_MIGRATION.md) - Asset management guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rakesh Nandakumar**

- Website: [rakeshnandakumar.com](https://rakeshn.com)
- GitHub: [@rakesh-nandakumar](https://github.com/rakesh-nandakumar)
- LinkedIn: [Rakesh Nandakumar](https://linkedin.com/in/rakesh-nandakumar)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting Platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Feather Icons](https://feathericons.com/) - Icon Library

---

Made with ❤️ by Rakesh Nandakumar
