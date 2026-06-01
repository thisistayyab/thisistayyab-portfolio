import { profileEmail, profileSameAs, SITE_URL } from "@/lib/site"

export function buildContactBreadcrumbJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  }
}

export function buildContactPageJsonLd(siteUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact`,
    name: "Contact Tayyab",
    description,
    url: `${siteUrl}/contact`,
    isPartOf: {
      "@type": "WebSite",
      name: "Tayyab Portfolio",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "Person",
      name: "Tayyab",
      jobTitle: "Full Stack Developer",
      email: profileEmail,
      url: siteUrl,
      sameAs: [...profileSameAs],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Project inquiries",
        email: profileEmail,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    },
  }
}

export function buildContactFaqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
