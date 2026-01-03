import BlogsPageClient from "./BlogsPageClient";

export const metadata = {
  title: "Tech Blog - Web Development Articles & Tutorials | Rakesh Nandakumar",
  description:
    "Explore in-depth technical articles, tutorials, and insights on web development, Laravel, React, Vue.js, Node.js, AWS, and modern software engineering practices. Learn from a Full Stack Developer with 3+ years experience.",
  keywords: [
    "Technical Blog",
    "Web Development Tutorials",
    "Software Engineering Articles",
    "Laravel Tutorials",
    "React.js Guides",
    "Vue.js Tips",
    "Node.js Tutorials",
    "AWS Best Practices",
    "Programming Blog",
    "Full Stack Development",
    "JavaScript Tutorials",
    "PHP Guides",
    "Developer Blog India",
  ],
  openGraph: {
    title: "Tech Blog | Rakesh Nandakumar - Full Stack Developer",
    description:
      "Explore technical articles, tutorials, and insights on web development, Laravel, React, and software engineering best practices.",
    type: "website",
    url: "https://rakeshn.com/blogs",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Rakesh Nandakumar Tech Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog | Rakesh Nandakumar",
    description:
      "Web development articles, tutorials, and software engineering insights.",
    creator: "@rakesh_dev",
  },
  alternates: {
    canonical: "https://rakeshn.com/blogs",
    types: {
      "application/rss+xml": "https://rakeshn.com/api/rss",
    },
  },
};

// JSON-LD structured data for blog listing
const blogListingSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Rakesh Nandakumar Tech Blog",
  description:
    "Technical articles and tutorials on web development and software engineering",
  url: "https://rakeshn.com/blogs",
  author: {
    "@type": "Person",
    name: "Rakesh Nandakumar",
    url: "https://rakeshn.com",
  },
  publisher: {
    "@type": "Person",
    name: "Rakesh Nandakumar",
  },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rakeshn.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://rakeshn.com/blogs",
      },
    ],
  },
};

export default function BlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListingSchema),
        }}
      />
      <BlogsPageClient />
    </>
  );
}
