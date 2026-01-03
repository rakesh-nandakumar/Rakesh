export const metadata = {
  title: "Contact Rakesh Nandakumar - Hire Full Stack Developer",
  description:
    "Contact Rakesh Nandakumar for freelance projects, technical consulting, full-stack web development, and collaboration opportunities. Expertise in Laravel, React, Vue.js, Next.js, Node.js, and AWS. Available for remote work worldwide.",
  keywords: [
    "Hire Full Stack Developer",
    "Freelance Web Developer",
    "Laravel Developer for Hire",
    "React Developer Contact",
    "Vue.js Consultant",
    "AWS Solutions Contact",
    "Technical Consulting Services",
    "Web Development Services India",
    "Remote Developer",
    "Full Stack Developer Contact",
    "Rakesh Nandakumar Contact",
    "Software Engineering Services",
  ],
  openGraph: {
    title: "Contact Rakesh Nandakumar | Hire Full Stack Developer",
    description:
      "Get in touch for freelance projects, technical consulting, or collaboration. Expert in Laravel, React, Vue.js, and AWS.",
    type: "website",
    url: "https://rakeshn.com/contact",
    images: [
      {
        url: "/images/contact1.png",
        width: 1200,
        height: 630,
        alt: "Contact Rakesh Nandakumar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Rakesh Nandakumar | Hire Full Stack Developer",
    description:
      "Get in touch for freelance projects, technical consulting, or collaboration opportunities.",
    images: ["/images/contact1.png"],
    creator: "@rakesh_dev",
  },
  alternates: {
    canonical: "https://rakeshn.com/contact",
  },
};

export default function ContactLayout({ children }) {
  // Comprehensive structured data for Contact page
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Rakesh Nandakumar",
    description: "Contact page for hiring and collaboration inquiries",
    url: "https://rakeshn.com/contact",
    mainEntity: {
      "@type": "Person",
      "@id": "https://rakeshn.com/#person",
      name: "Rakesh Nandakumar",
      givenName: "Rakesh",
      familyName: "Nandakumar",
      jobTitle: "Full Stack Developer",
      email: "hello@rakeshnandakumar.com",
      url: "https://rakeshn.com",
      image: "https://rakeshn.com/profileImg.jpg",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Professional Services",
        availableLanguage: ["English", "Hindi", "Malayalam"],
        areaServed: "Worldwide",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Development",
            description:
              "End-to-end web application development using Laravel, React, Vue.js, and Node.js",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical Consulting",
            description:
              "Expert advice on architecture, technology stack, and best practices",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AWS Cloud Solutions",
            description:
              "Cloud infrastructure setup, optimization, and management",
          },
        },
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rakeshn.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://rakeshn.com/contact",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      {children}
    </>
  );
}
