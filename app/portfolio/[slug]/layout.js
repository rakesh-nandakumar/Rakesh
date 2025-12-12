import {
  getPortfolio,
  getPortfolioBySlug,
  getAllPortfolioSlugs,
} from "@/lib/supabaseDataService";

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Find project by slug using async Supabase query
  const project = await getPortfolioBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested portfolio project could not be found.",
    };
  }

  const projectUrl = `https://rakeshn.com/portfolio/${slug}`;

  return {
    title: `${project.title} - Portfolio | Rakesh Nandakumar`,
    description: project.longDescription || project.shortDescription,
    keywords: [
      project.title,
      project.category,
      ...(project.technologies || []),
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
