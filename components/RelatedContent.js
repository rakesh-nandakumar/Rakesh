"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function RelatedContent({
  currentSlug,
  currentTags = [],
  currentCategory = "",
  type = "blog", // 'blog' or 'portfolio'
  maxItems = 3,
}) {
  const [relatedItems, setRelatedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const entity = type === "blog" ? "blogs" : "portfolio";
        const response = await fetch(`/api/data?entity=${entity}`);
        
        if (!response.ok) {
          console.error("Failed to fetch related content data");
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();

        if (!data || !Array.isArray(data)) {
          setIsLoading(false);
          return;
        }

        // Filter out current item and find related ones
        const otherItems = data.filter((item) => item.slug !== currentSlug);

        // Calculate relevance scores
        const scoredItems = otherItems.map((item) => {
          let score = 0;

          // Category match (highest weight)
          if (currentCategory && item.category === currentCategory) {
            score += 10;
          }

          // Tag matches
          if (currentTags && currentTags.length > 0) {
            const itemTags = item.tags || item.technologies || [];
            const commonTags = currentTags.filter((tag) =>
              itemTags.some(
                (itemTag) =>
                  itemTag.toLowerCase().includes(tag.toLowerCase()) ||
                  tag.toLowerCase().includes(itemTag.toLowerCase())
              )
            );
            score += commonTags.length * 3;
          }

          // Date recency (newer items get slight boost)
          if (item.date) {
            const itemDate = new Date(item.date);
            const daysSincePublished =
              (Date.now() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSincePublished < 30) score += 2;
            else if (daysSincePublished < 90) score += 1;
          }

          return { ...item, score };
        });

        // Sort by score and take top items
        const related = scoredItems
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, maxItems);

        // If we don't have enough related items, add some recent ones
        if (related.length < maxItems) {
          const recentItems = otherItems
            .filter((item) => !related.find((r) => r.slug === item.slug))
            .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
            .slice(0, maxItems - related.length);

          related.push(...recentItems);
        }

        setRelatedItems(related.slice(0, maxItems));
      } catch (error) {
        console.error("Error fetching related content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, [currentSlug, currentTags, currentCategory, type, maxItems]);

  if (isLoading || relatedItems.length === 0) return null;

  const baseUrl = type === "blog" ? "/blogs" : "/portfolio";
  const itemType = type === "blog" ? "posts" : "projects";

  return (
    <section
      className="related-content"
      aria-labelledby="related-content-title"
    >
      <h3 id="related-content-title" className="related-title">
        Related {itemType}
      </h3>

      <div className="related-grid">
        {relatedItems.map((item) => (
          <article key={item.slug} className="related-card">
            <Link
              href={`${baseUrl}/${item.slug}`}
              className="related-link"
              aria-label={`Read more about ${item.title}`}
            >
              {item.image && (
                <div className="related-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={300}
                    height={200}
                  />
                </div>
              )}

              <div className="related-content-body">
                <h4 className="related-item-title">{item.title}</h4>

                {item.excerpt && (
                  <p className="related-excerpt">{item.excerpt}</p>
                )}

                <div className="related-meta">
                  {item.date && (
                    <time dateTime={item.date} className="related-date">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  )}

                  {item.category && (
                    <span className="related-category">{item.category}</span>
                  )}
                </div>

                {(item.tags || item.technologies) && (
                  <div className="related-tags">
                    {(item.tags || item.technologies)
                      .slice(0, 3)
                      .map((tag, index) => (
                        <span key={index} className="related-tag">
                          {tag}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      <style jsx>{`
        .related-content {
          margin: 3rem 0;
          padding: 2rem 0;
          border-top: 1px solid var(--border-color, #e9ecef);
        }

        .related-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--text-color-primary, #212529);
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .related-card {
          background: var(--bg-color-secondary, #f8f9fa);
          border: 1px solid var(--border-color, #e9ecef);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-color, #007bff);
        }

        .related-link {
          display: block;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }

        .related-image {
          width: 100%;
          height: 160px;
          overflow: hidden;
          background: var(--bg-color-tertiary, #dee2e6);
        }

        .related-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .related-card:hover .related-image img {
          transform: scale(1.05);
        }

        .related-content-body {
          padding: 1.25rem;
        }

        .related-item-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
          color: var(--text-color-primary, #212529);
        }

        .related-excerpt {
          font-size: 0.9rem;
          color: var(--text-color-secondary, #6c757d);
          line-height: 1.5;
          margin: 0 0 1rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .related-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.8rem;
        }

        .related-date {
          color: var(--text-color-tertiary, #868e96);
        }

        .related-category {
          background: var(--primary-color, #007bff);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .related-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .related-tag {
          background: var(--bg-color-tertiary, #dee2e6);
          color: var(--text-color-secondary, #6c757d);
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr;
          }

          .related-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
