export const metadata = {
  title: "Contact - Get In Touch",
  description:
    "Contact Rakesh Nandakumar for freelance work, technical consulting, web development projects, or collaboration opportunities. Available for Laravel, React, Vue.js, and AWS projects.",
  keywords: [
    "Contact",
    "Hire Developer",
    "Freelance Developer",
    "Full Stack Developer Contact",
    "Technical Consulting",
    "Web Development Services",
    "Collaboration",
    "Get In Touch",
  ],
  openGraph: {
    title: "Contact | Rakesh Nandakumar",
    description:
      "Get in touch for freelance work, technical consulting, or collaboration opportunities.",
    type: "website",
    url: "/contact",
    images: [
      {
        url: "/images/contact1.png",
        width: 1200,
        height: 630,
        alt: "Contact Rakesh Nandakumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Rakesh Nandakumar",
    description:
      "Get in touch for freelance work, technical consulting, or collaboration opportunities.",
    images: ["/images/contact1.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }) {
  // Structured data for Contact page
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Person",
      name: "Rakesh Nandakumar",
      jobTitle: "Full Stack Developer",
      email: "contact@rakeshnandakumar.com",
      url: "https://rakeshn.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Professional Services",
        availableLanguage: ["English"],
      },
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
