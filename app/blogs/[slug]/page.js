import {
  getAllBlogSlugs,
  getBlogBySlug,
  getRelatedBlogs,
} from "../../../lib/blogUtils";
import BlogContent from "../../../components/BlogContent";
import { notFound } from "next/navigation";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${blog.title}`,
    description: blog.excerpt,
    keywords: [
      blog.category,
      ...blog.tags,
      "Rakesh Nandakumar",
      "Tech Blog",
    ].join(", "),
    authors: [{ name: blog.author, url: "https://rakeshnandakumar.com" }],
    creator: blog.author,
    publisher: "Rakesh Nandakumar",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.date,
      modifiedTime: blog.updatedDate || blog.date,
      authors: [blog.author],
      section: blog.category,
      tags: blog.tags,
      images: blog.image
        ? [
            {
              url: blog.image,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [
            {
              url: "/hero.jpg",
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      creator: "@rakesh_dev",
      images: blog.image ? [blog.image] : ["/hero.jpg"],
    },
    alternates: {
      canonical: `https://rakeshnandakumar.com/blogs/${params.slug}`,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Main blog post page component
export default async function BlogPost({ params }) {
  const { slug } = params;

  // Get blog data at build time
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs
  const relatedBlogs = await getRelatedBlogs(blog);

  return <BlogContent blog={blog} relatedBlogs={relatedBlogs} />;
}
