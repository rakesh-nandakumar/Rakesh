import {
  getAllBlogSlugs,
  getBlogBySlug,
  getRelatedBlogs,
} from "../../../lib/blogUtils";
import BlogContent from "../../../components/BlogContent";
import { notFound } from "next/navigation";
import { calculateReadingTime } from "@/lib/readingTime";
import StructuredData from "@/components/StructuredData";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

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
      canonical: `https://rakeshnandakumar.com/blogs/${slug}`,
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
  const { slug } = await params;

  // Get blog data at build time
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(blog.content || blog.excerpt || "");

  // Get related blogs
  const relatedBlogs = await getRelatedBlogs(blog);

  // Enhanced blog data with reading time
  const enhancedBlog = {
    ...blog,
    readingTime: readingTime.text,
    readingTimeMinutes: readingTime.minutes,
    wordCount: readingTime.words,
  };

  return (
    <>
      <StructuredData
        type="BlogPosting"
        data={{
          title: blog.title,
          description: blog.excerpt,
          image: blog.image
            ? `https://rakeshnandakumar.com${blog.image}`
            : "https://rakeshnandakumar.com/hero.jpg",
          author: blog.author || "Rakesh Nandakumar",
          datePublished: blog.date,
          dateModified: blog.updatedDate || blog.date,
          url: `https://rakeshnandakumar.com/blogs/${slug}`,
          keywords: blog.tags,
          category: blog.category,
          wordCount: readingTime.words,
          readingTime: readingTime.minutes,
        }}
      />

      <BlogContent blog={enhancedBlog} relatedBlogs={relatedBlogs} />
    </>
  );
}
