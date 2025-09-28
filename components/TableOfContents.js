"use client";

import { useState, useEffect } from "react";

export default function TableOfContents({ content, className = "" }) {
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!content) return;

    // Generate TOC from content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const tocItems = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      tocItems.push({
        id,
        title,
        level,
        depth: level - 1,
      });
    }

    setToc(tocItems);
  }, [content]);

  useEffect(() => {
    if (typeof window === "undefined" || toc.length === 0) return;

    const observerOptions = {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav
      className={`table-of-contents ${className}`}
      aria-label="Table of Contents"
    >
      <h3 className="toc-title">Table of Contents</h3>
      <ul className="toc-list">
        {toc.map(({ id, title, level }) => (
          <li
            key={id}
            className={`toc-item toc-level-${level} ${
              activeId === id ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToHeading(id)}
              className="toc-link"
              title={title}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .table-of-contents {
          background: var(--bg-color-secondary, #f8f9fa);
          border: 1px solid var(--border-color, #e9ecef);
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem 0;
          position: sticky;
          top: 2rem;
          max-height: 70vh;
          overflow-y: auto;
        }

        .toc-title {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-color-primary, #212529);
        }

        .toc-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .toc-item {
          margin: 0.25rem 0;
        }

        .toc-level-2 {
          padding-left: 1rem;
        }

        .toc-level-3 {
          padding-left: 2rem;
        }

        .toc-link {
          display: block;
          color: var(--text-color-secondary, #6c757d);
          text-decoration: none;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          line-height: 1.4;
          transition: all 0.2s ease;
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          cursor: pointer;
        }

        .toc-link:hover {
          background: var(--bg-color-hover, #e9ecef);
          color: var(--text-color-primary, #212529);
        }

        .toc-item.active .toc-link {
          background: var(--primary-color, #007bff);
          color: white;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .table-of-contents {
            position: relative;
            top: auto;
            max-height: none;
          }
        }
      `}</style>
    </nav>
  );
}
