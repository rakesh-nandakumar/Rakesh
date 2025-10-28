import Link from "next/link";
import { Suspense } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

export const metadata = {
  title: "404 - Page Not Found | Rakesh Nandakumar",
  description:
    "Oops! The page you're looking for doesn't exist. Explore Rakesh Nandakumar's portfolio, blog posts, and full-stack development projects instead.",
  robots: {
    index: false,
    follow: true, // Allow following other links on the page
  },
  openGraph: {
    title: "404 - Page Not Found | Rakesh Nandakumar",
    description:
      "The page you're looking for doesn't exist. Explore my portfolio and blog instead.",
    type: "website",
  },
};

// Popular pages to suggest
const popularPages = [
  {
    href: "/",
    label: "Home",
    description: "Learn about my skills and experience",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    description: "View my latest projects and work",
  },
  {
    href: "/blogs",
    label: "Blog",
    description: "Read my articles on web development",
  },
  { href: "/about", label: "About", description: "Get to know more about me" },
  {
    href: "/contact",
    label: "Contact",
    description: "Get in touch for opportunities",
  },
];

function SearchSuggestions() {
  return (
    <div className="search-suggestions">
      <h3>Popular Pages</h3>
      <div className="suggestions-grid">
        {popularPages.map((page) => (
          <Link key={page.href} href={page.href} className="suggestion-card">
            <h4>{page.label}</h4>
            <p>{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <>
      {/* Structured Data for 404 page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "404 - Page Not Found",
            description: "The requested page could not be found.",
            url: "https://rakeshnandakumar.com/404",
            mainEntity: {
              "@type": "Thing",
              name: "404 Error",
              description: "Page not found error",
            },
          }),
        }}
      />

      <div className="error-page-inner rn-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner text-center">
                <div className="section-title text-center">
                  <h2
                    className="title"
                    role="banner"
                    style={{ color: "var(--color-primary)" }}
                  >
                    404
                  </h2>
                  <h2 className="title">Page Not Found</h2>
                  <p className="subtitle mt-5">
                    Oops! The page you&apos;re looking for seems to have
                    wandered off. Don&apos;t worry, it happens to the best of
                    us. Let&apos;s get you back on track!
                  </p>
                </div>

                <div className="error-actions mt-5">
                  <Link
                    href="/"
                    className="rn-btn mr-3"
                    aria-label="Return to homepage"
                  >
                    Back to Home
                  </Link>

                  <Link
                    href="/contact"
                    className="rn-btn btn-outline"
                    aria-label="Contact for help"
                  >
                    Report Issue
                  </Link>
                </div>

                <Suspense
                  fallback={
                    <LoadingIndicator
                      size="small"
                      message="Loading suggestions"
                      variant="dots"
                    />
                  }
                >
                  <SearchSuggestions />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
