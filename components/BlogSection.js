import { getBlogs } from "@/lib/supabaseDataService";
import BlogSectionClient from "./BlogSectionClient";

const BlogSection = async () => {
  // Fetch blogs data from Supabase
  const blogsData = await getBlogs();

  return <BlogSectionClient blogsData={blogsData} />;
};

export default BlogSection;
