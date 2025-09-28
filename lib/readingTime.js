import readingTime from "reading-time";

/**
 * Calculate reading time for content
 * @param {string} content - The content to analyze
 * @returns {Object} Reading time stats
 */
export function calculateReadingTime(content) {
  if (!content) return { text: "0 min read", minutes: 0, words: 0 };

  const stats = readingTime(content);
  return {
    text: stats.text,
    minutes: Math.ceil(stats.minutes),
    words: stats.words,
    time: stats.time,
  };
}

/**
 * Generate Table of Contents from content
 * @param {string} content - Markdown content
 * @returns {Array} TOC items
 */
export function generateTableOfContents(content) {
  if (!content) return [];

  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({
      id,
      title,
      level,
      depth: level - 1,
    });
  }

  return toc;
}

/**
 * Add IDs to headings in content for TOC navigation
 * @param {string} content - Markdown content
 * @returns {string} Content with heading IDs
 */
export function addHeadingIds(content) {
  if (!content) return "";

  return content.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, title) => {
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return `${hashes} ${title} {#${id}}`;
  });
}

/**
 * Extract excerpt from content
 * @param {string} content - Full content
 * @param {number} maxLength - Maximum length of excerpt
 * @returns {string} Excerpt
 */
export function extractExcerpt(content, maxLength = 160) {
  if (!content) return "";

  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
    .replace(/`([^`]+)`/g, "$1") // Remove inline code
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .trim();

  if (plainText.length <= maxLength) return plainText;

  return plainText.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}
