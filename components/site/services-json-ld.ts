import type { PortfolioService } from "@/components/site/service-card"
import { pageFragmentId, personId } from "@/lib/json-ld-ids"

export function servicesListId(siteUrl: string, pagePath: string) {
  const path = pagePath === "/" ? "/" : "/services"
  return pageFragmentId(siteUrl, path, "services-list")
}

export function buildServicesItemListJsonLd(
  services: PortfolioService[],
  siteUrl: string,
  pagePath: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": servicesListId(siteUrl, pagePath),
    name: "Full stack software development services",
    description,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        "@id": `${siteUrl}/services#${service.slug}`,
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Person",
          "@id": personId(siteUrl),
          name: "Tayyab",
          jobTitle: "Full Stack Developer",
          url: personId(siteUrl),
        },
        areaServed: "Worldwide",
      },
    })),
  }
}

export function buildServicesWebPageJsonLd(siteUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/services`,
    name: "Full stack software development services",
    description,
    url: `${siteUrl}/services`,
    isPartOf: {
      "@type": "WebSite",
      name: "Tayyab Portfolio",
      url: siteUrl,
    },
    mainEntity: {
      "@id": servicesListId(siteUrl, "/services"),
    },
  }
}

export function buildServicesBreadcrumbJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  }
}

export function buildServicesFaqJsonLd(
  items: readonly { question: string; answer: string }[],
) {
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
