import portfolioData from "@/data/portfolio.json";

export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    slug: project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug;

  // Find project by slug
  const project = portfolioData.find((item) => {
    const projectSlug = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return projectSlug === slug;
  });

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested portfolio project could not be found.",
    };
  }

  const projectUrl = `https://rakeshnandakumar.com/portfolio/${slug}`;

  return {
    title: `${project.title} - Portfolio | Rakesh Nandakumar`,
    description: project.longDescription || project.shortDescription,
    keywords: [
      project.title,
      project.category,
      ...project.technologies,
      "Rakesh Nandakumar",
      "Portfolio Project",
      "Full Stack Developer",
    ],
    openGraph: {
      title: `${project.title} - Portfolio | Rakesh Nandakumar`,
      description: project.longDescription || project.shortDescription,
      type: "article",
      url: projectUrl,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      siteName: "Rakesh Nandakumar Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Portfolio | Rakesh Nandakumar`,
      description: project.longDescription || project.shortDescription,
      images: [project.image],
    },
    alternates: {
      canonical: projectUrl,
    },
    other: {
      "article:author": "Rakesh Nandakumar",
      "article:section": project.category,
      "article:tag": project.technologies?.join(", "),
    },
  };
}

export default function PortfolioLayout({ children }) {
  return children;
}
