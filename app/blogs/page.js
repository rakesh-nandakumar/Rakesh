import BlogsPageClient from "./BlogsPageClient";

export const metadata = {
  title: "Blog - Technical Articles & Tutorials",
  description:
    "Explore technical articles, tutorials, and insights on web development, software engineering, Laravel, React, and modern development practices.",
  keywords: [
    "Technical Blog",
    "Web Development",
    "Software Engineering",
    "Laravel Tutorials",
    "React Guides",
    "Programming",
    "Tech Articles",
  ],
  openGraph: {
    title: "Blog | Rakesh Nandakumar",
    description:
      "Explore technical articles, tutorials, and insights on web development and software engineering.",
    type: "website",
    url: "/blogs",
  },
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
