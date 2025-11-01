export default function StructuredData({ data, type = "WebSite" }) {
  if (!data) return null;

  let structuredData = {};

  switch (type) {
    case "WebSite":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: data.name || "Rakesh Nandakumar Portfolio",
        url: data.url || "https://rakeshn.com",
        description:
          data.description || "Full Stack Developer & Software Engineer",
        author: {
          "@type": "Person",
          name: "Rakesh Nandakumar",
          url: "https://rakeshn.com/about",
          jobTitle: "Full Stack Developer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance",
          },
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://rakeshn.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      };
      break;

    case "Person":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.name || "Rakesh Nandakumar",
        url: data.url || "https://rakeshn.com",
        image: data.image || "https://rakeshn.com/avatar.png",
        jobTitle: data.jobTitle || "Full Stack Developer",
        description:
          data.description ||
          "Experienced Full Stack Developer with 3+ years in Laravel, React, Vue.js, and AWS",
        email: data.email || "hello@rakeshnandakumar.com",
        telephone: data.telephone,
        address: data.address && {
          "@type": "PostalAddress",
          addressLocality: data.address.city,
          addressRegion: data.address.state,
          addressCountry: data.address.country,
        },
        sameAs: data.socialProfiles || [
          "https://linkedin.com/in/rakesh-nandakumar",
          "https://github.com/rakesh-nandakumar",
          "https://twitter.com/rakesh_dev",
        ],
        knowsAbout: data.skills || [
          "JavaScript",
          "TypeScript",
          "React",
          "Vue.js",
          "Laravel",
          "PHP",
          "Node.js",
          "AWS",
          "Docker",
          "MySQL",
          "PostgreSQL",
        ],
        alumniOf: data.education,
        worksFor: {
          "@type": "Organization",
          name: data.company || "Freelance",
        },
      };
      break;

    case "BlogPosting":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author || "Rakesh Nandakumar",
          url: "https://rakeshn.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "Rakesh Nandakumar",
          logo: {
            "@type": "ImageObject",
            url: "https://rakeshn.com/avatar.png",
          },
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url,
        },
        keywords: data.keywords || data.tags,
        articleSection: data.category,
        wordCount: data.wordCount,
        timeRequired: data.readingTime && `PT${data.readingTime}M`,
        inLanguage: "en-US",
      };
      break;

    case "Article":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author || "Rakesh Nandakumar",
        },
        publisher: {
          "@type": "Organization",
          name: "Rakesh Nandakumar",
          logo: {
            "@type": "ImageObject",
            url: "https://rakeshn.com/avatar.png",
          },
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        mainEntityOfPage: data.url,
      };
      break;

    case "CreativeWork":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: data.name,
        description: data.description,
        image: data.image,
        url: data.url,
        creator: {
          "@type": "Person",
          name: "Rakesh Nandakumar",
        },
        dateCreated: data.dateCreated,
        genre: data.category,
        keywords: data.technologies,
        license: data.license,
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
