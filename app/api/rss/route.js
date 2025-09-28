import { NextResponse } from "next/server";
import blogData from "@/data/blogs.json";

export async function GET() {
  const siteUrl = "https://rakeshnandakumar.com";
  const feedTitle = "Rakesh Nandakumar - Blog";
  const feedDescription =
    "Latest articles and insights from Rakesh Nandakumar on Full Stack Development, Laravel, React, and AWS.";

  // Sort blogs by date (newest first)
  const sortedBlogs = blogData
    .filter((blog) => blog.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20); // Latest 20 posts

  const lastBuildDate = new Date().toUTCString();
  const mostRecentPost = sortedBlogs[0];
  const pubDate = mostRecentPost
    ? new Date(mostRecentPost.date).toUTCString()
    : lastBuildDate;

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${feedTitle}</title>
    <description>${feedDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <ttl>1440</ttl>
    <generator>Next.js RSS Generator</generator>
    <managingEditor>hello@rakeshnandakumar.com (Rakesh Nandakumar)</managingEditor>
    <webMaster>hello@rakeshnandakumar.com (Rakesh Nandakumar)</webMaster>
    <image>
      <url>${siteUrl}/avatar.png</url>
      <title>${feedTitle}</title>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    
    ${sortedBlogs
      .map((blog) => {
        const postUrl = `${siteUrl}/blogs/${blog.slug}`;
        const postDate = new Date(blog.date).toUTCString();
        const categories = blog.tags
          ? blog.tags
              .map((tag) => `<category>${escapeXml(tag)}</category>`)
              .join("\n      ")
          : "";

        return `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <description>${escapeXml(
        blog.excerpt || blog.description || ""
      )}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <author>hello@rakeshnandakumar.com (Rakesh Nandakumar)</author>
      ${categories}
      ${
        blog.image
          ? `<enclosure url="${siteUrl}${blog.image}" type="image/jpeg" />`
          : ""
      }
      <content:encoded><![CDATA[
        ${
          blog.image
            ? `<img src="${siteUrl}${blog.image}" alt="${escapeXml(
                blog.title
              )}" style="max-width: 100%; height: auto; margin-bottom: 1rem;" />`
            : ""
        }
        <p>${escapeXml(blog.excerpt || blog.description || "")}</p>
        <p><a href="${postUrl}">Read the full article →</a></p>
      ]]></content:encoded>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
