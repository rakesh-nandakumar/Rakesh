// Utility functions for blog data
import fs from "fs";
import path from "path";

const BLOGS_FILE_PATH = path.join(process.cwd(), "data", "blogs.json");

export async function getAllBlogs() {
  try {
    const fileContents = fs.readFileSync(BLOGS_FILE_PATH, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading blogs data:", error);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.id === slug) || null;
}

export async function getRelatedBlogs(currentBlog, limit = 3) {
  if (!currentBlog) return [];

  const blogs = await getAllBlogs();
  return blogs
    .filter(
      (blog) =>
        blog.category === currentBlog.category && blog.id !== currentBlog.id
    )
    .slice(0, limit);
}

export async function getAllBlogSlugs() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => blog.id);
}
