"use client";

import { useTheme } from "../contexts/ThemeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import Image from "next/image";
import "highlight.js/styles/github-dark.css";

export default function BlogContent({ blog, relatedBlogs }) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

    return (
      <>
        <div
          className={`rn-blog-area rn-section-gap mt-20 ${
            isDarkMode ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="container">
            {/* Breadcrumb */}
            <div className="row">
              <div className="col-lg-12">
                <div className="blog-breadcrumb">
                  <Link href="/blogs" className="breadcrumb-link">
                    Blogs
                  </Link>
                  <span className="breadcrumb-separator">/</span>
                  <span className="breadcrumb-current">{blog.title}</span>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="row">
              <div className="col-lg-12">
                <div
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={100}
                  data-aos-once="true"
                  className="section-title text-center rn-section-gap"
                >
                  <span className="subtitle">{blog.category}</span>
                  <h2 className="title">{blog.title}</h2>
                </div>

                <div
                  className="blog-hero-content text-center"
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={200}
                  data-aos-once="true"
                >
                  <p className="blog-excerpt">{blog.excerpt}</p>

                  <div className="blog-meta float-right">
                    <div className="meta-item">
                      <span className="meta-label">Published</span>
                      <span className="meta-value">
                        {new Date(blog.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Read Time</span>
                      <span className="meta-value">{blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="row mt--50">
              <div className="col-lg-12">
                <div
                  className="blog-image-wrapper"
                  data-aos="fade-up"
                  data-aos-duration={500}
                  data-aos-delay={300}
                  data-aos-once="true"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={1000}
                    height={400}
                    className="blog-featured-image"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div className="blog-tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="blog-tag mr-5">
                       #{tag} 
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <section className="blog-content">
          <div className="container">
            <div className="blog-content-wrapper">
              <article className="blog-article">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="content-h1">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="content-h2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="content-h3">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="content-p">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="content-quote">
                        {children}
                      </blockquote>
                    ),
                    code: ({ inline, children, ...props }) =>
                      inline ? (
                        <code className="inline-code" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="code-block" {...props}>
                          {children}
                        </code>
                      ),
                    ul: ({ children }) => (
                      <ul className="content-ul">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="content-ol">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="content-li">{children}</li>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="content-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="related-blogs">
            <div className="container">
              <h2 className="related-title">Related Articles</h2>
              <div className="related-grid">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blogs/${relatedBlog.id}`}
                    className="related-card"
                  >
                    <div className="related-card-image">
                      <Image
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        width={300}
                        height={200}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="related-card-content">
                      <span className="related-category">
                        {relatedBlog.category}
                      </span>
                      <h3 className="related-title">{relatedBlog.title}</h3>
                      <p className="related-excerpt">{relatedBlog.excerpt}</p>
                      <div className="related-meta">
                        <span>{relatedBlog.readTime}</span>
                        <span>•</span>
                        <span>
                          {new Date(
                            relatedBlog.publishDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
    );
}
