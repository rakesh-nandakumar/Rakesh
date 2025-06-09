export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Rakesh Nandakumar for full-stack development projects, technical consulting, or collaboration opportunities. Let's build something amazing together.",
  keywords: [
    "Contact",
    "Hire Developer",
    "Full Stack Developer Contact",
    "Technical Consulting",
    "Web Development Services",
    "Collaboration",
  ],
  openGraph: {
    title: "Contact - Rakesh Nandakumar",
    description:
      "Get in touch with Rakesh Nandakumar for full-stack development projects, technical consulting, or collaboration opportunities.",
    images: ["/profileImg.jpg"],
  },
  alternates: {
    canonical: "https://rakeshnandakumar.com/contact",
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
      url: "https://rakeshnandakumar.com",
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
