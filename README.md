# Rakesh Nandakumar - Portfolio & Blog

A high-performance, SEO-optimized portfolio and blog built with Next.js 15, featuring static generation, JSON-based content management, and comprehensive SEO optimization.

## 🚀 Features

- **SEO First**: Complete metadata, structured data, and semantic HTML
- **High Performance**: Static generation, image optimization, and efficient caching
- **JSON-Based CMS**: Simple, version-controlled content management
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4
- **Responsive Design**: Mobile-first, fully responsive layout
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Blog System**: Markdown support with syntax highlighting
- **Portfolio Showcase**: Dynamic project pages with detailed information
- **Contact Form**: Secure form with ReCAPTCHA integration
- **AI Chat Assistant**: Optional AI-powered chat interface

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── blogs/             # Blog pages
│   ├── portfolio/         # Portfolio pages
│   └── ...                # Other pages
├── components/            # React components
├── data/                  # JSON data files (content source)
├── lib/                   # Utility functions & services
├── public/               # Static assets
└── styles/               # Global styles
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **React**: React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Feather](https://feathericons.com/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Analytics**: Google Analytics

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

3. **Set up environment variables** (optional)

   Create a `.env` file in the root directory:

   ```env
   # Google Analytics (optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # Email configuration for contact form
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # ReCAPTCHA (optional, for contact form)
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key

   # Gemini API (optional, for AI chat)
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

All content is managed through JSON files in the `/data` directory. No database required!

### Adding Blog Posts

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

- Website: [rakeshnandakumar.com](https://rakeshnandakumar.com)
- GitHub: [@rakesh-nandakumar](https://github.com/rakesh-nandakumar)
- LinkedIn: [Rakesh Nandakumar](https://linkedin.com/in/rakesh-nandakumar)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting Platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Feather Icons](https://feathericons.com/) - Icon Library

---

Made with ❤️ by Rakesh Nandakumar
