export const metadata = {
  title: "Blog",
  description:
    "Read Rakesh Nandakumar's insights on web development, software engineering, Laravel, React, Vue.js, AWS, and the latest tech trends and tutorials.",
  keywords: [
    "Tech Blog",
    "Web Development Blog",
    "Laravel Tutorials",
    "React Tips",
    "Vue.js Guides",
    "AWS Articles",
    "Software Engineering",
  ],
  openGraph: {
    title: "Blog - Rakesh Nandakumar",
    description:
      "Read Rakesh Nandakumar's insights on web development, software engineering, and the latest tech trends.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: "https://rakeshnandakumar.com/blogs",
  },
};

export default function BlogsLayout({ children }) {
  // Structured data for Blog section
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rakesh Nandakumar's Tech Blog",
    description:
      "Insights on web development, software engineering, and modern technologies",
    url: "https://rakeshnandakumar.com/blogs",
    author: {
      "@type": "Person",
      name: "Rakesh Nandakumar",
      jobTitle: "Full Stack Developer",
      url: "https://rakeshnandakumar.com",
    },
    publisher: {
      "@type": "Person",
      name: "Rakesh Nandakumar",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://rakeshnandakumar.com/blogs",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogStructuredData),
        }}
      />
      {children}
    </>
  );
}
