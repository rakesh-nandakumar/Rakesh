"use client";

import { Clock, ArrowUpRight, Search } from "react-feather";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";

const BlogsPageClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogsData, setBlogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load blogs on client side from Supabase API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch("/api/data?entity=blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogsData(data);
        } else {
          console.error("Failed to load blogs from API");
          setBlogsData([]);
        }
      } catch (error) {
        console.error("Failed to load blogs:", error);
        setBlogsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Filter blogs based on search term
  const displayBlogs = blogsData.filter((blog) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(searchLower) ||
      blog.excerpt?.toLowerCase().includes(searchLower) ||
      blog.category?.toLowerCase().includes(searchLower) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      blog.author?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      {/* Start News Area */}
      <div className="mt-20 rn-blog-area rn-section-gap" id="blog">
        <div className="mx-10">
          <div className="row">
            <div className="col-lg-12">
              <div
                data-aos="fade-up"
                data-aos-duration={500}
                data-aos-delay={100}
                data-aos-once="true"
                className="section-title text-center"
              >
                <span className="subtitle">
                  Insights, tutorials, and thoughts on software development
                </span>
                <h2 className="title">Technical Blog</h2>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="row mt--40">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="search-wrapper">
                <div className="search-input-group">
                  <div className="search-icon">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search blogs by title, category, tags, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="clear-search"
                      onClick={() => setSearchTerm("")}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="search-results-count mt-3 text-lg">
                    Found {displayBlogs.length} blog
                    {displayBlogs.length !== 1 ? "s" : ""} matching &quot;
                    {searchTerm}&quot;
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row row--12 mt--30 mt_md--10 mt_sm--10">
            {isLoading ? (
              <div className="col-12">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading blogs...</p>
                </div>
              </div>
            ) : displayBlogs.length > 0 ? (
              displayBlogs.map((blog, index) => (
                <BlogCard key={blog.slug || index} blog={blog} delay={100 + index * 50} />
              ))
            ) : searchTerm ? (
              <div className="col-12">
                <div className="text-center py-5">
                  <h4 className="title">No blogs found</h4>
                  <p className="text-muted">
                    No blogs match your search criteria. Try different keywords
                    or
                    <button
                      className="btn btn-link p-0 ms-1"
                      onClick={() => setSearchTerm("")}
                    >
                      clear your search
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="col-12">
                <div className="text-center py-5">
                  <h4 className="title">No blogs available</h4>
                  <p className="text-muted">
                    Check back later for new content.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End News Area */}
    </>
  );
};

export default BlogsPageClient;
