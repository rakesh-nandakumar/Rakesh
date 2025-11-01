"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import Image from "next/image";
import HireMePopup from "./HireMePopup";
import TableOfContents from "./TableOfContents";
import RelatedContent from "./RelatedContent";
import BreadcrumbSchema from "./BreadcrumbSchema";
import { SmartLink } from "./SmartLink";
import "highlight.js/styles/github-dark.css";

export default function BlogContent({ blog, relatedBlogs }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://rakeshn.com" },
          { name: "Blog", url: "https://rakeshn.com/blogs" },
          {
            name: blog.title,
            url: `https://rakeshn.com/blogs/${blog.slug}`,
          },
        ]}
      />

      <div className="rn-blog-area rn-section-gap mt-20 light-mode">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className="row">
            <div className="col-lg-12">
              <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                <ol className="breadcrumb-list">
                  <li className="breadcrumb-item">
                    <SmartLink href="/" className="breadcrumb-link">
                      Home
                    </SmartLink>
                  </li>
                  <li className="breadcrumb-item">
                    <SmartLink href="/blogs" className="breadcrumb-link">
                      Blog
                    </SmartLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {blog.title}
                  </li>
                </ol>
              </nav>
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
                className="section-title text-center"
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
                    <span className="meta-label">Read Time</span>
                    <span className="meta-value">
                      {blog.readingTime || blog.readTime}
                    </span>
                  </div>
                  {blog.wordCount && (
                    <div className="meta-item">
                      <span className="meta-label">Words</span>
                      <span className="meta-value">
                        {blog.wordCount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {blog.publishDate && (
                    <div className="meta-item">
                      <span className="meta-label">Published Date</span>
                      <span className="meta-value">
                        {new Date(
                          blog.date || blog.publishDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
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
                  className="blog-featured-image col-lg-12"
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
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-content-wrapper">
                <article
                  className="blog-article"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      h1: ({ children }) => (
                        <h1
                          className="content-h1"
                          id={children
                            .toString()
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        >
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2
                          className="content-h2"
                          id={children
                            .toString()
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        >
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3
                          className="content-h3"
                          id={children
                            .toString()
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        >
                          {children}
                        </h3>
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

            {/* Sidebar with Table of Contents */}
            <div className="col-lg-4">
              <div className="blog-sidebar">
                <TableOfContents content={blog.content} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <div className="container">
        <RelatedContent
          currentSlug={blog.slug}
          currentTags={blog.tags || []}
          currentCategory={blog.category}
          type="blog"
          maxItems={3}
        />
      </div>
      <HireMePopup showOnMount={true} />
    </>
  );
}
