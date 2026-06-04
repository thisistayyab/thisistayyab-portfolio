import type { HomeTestimonial } from "@/components/site/testimonial-card"
import { pageFragmentId, personId } from "@/lib/json-ld-ids"

export function testimonialsListId(siteUrl: string, pagePath: string) {
  return pageFragmentId(
    siteUrl,
    pagePath === "/" ? "/" : "/testimonials",
    "testimonials-list",
  )
}

export function buildTestimonialsItemListJsonLd(
  items: HomeTestimonial[],
  siteUrl: string,
  pagePath: string,
  description: string,
) {
  const listId = testimonialsListId(siteUrl, pagePath)

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": listId,
    name: "Client testimonials",
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: item.name,
          jobTitle: item.role,
        },
        reviewBody: item.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: item.rating ?? 5,
          bestRating: 5,
          worstRating: 1,
        },
        itemReviewed: {
          "@type": "Person",
          "@id": personId(siteUrl),
          name: "Tayyab",
          jobTitle: "Full Stack Web Developer",
          url: personId(siteUrl),
        },
        ...(item.image ? { image: `${siteUrl}${item.image}` } : {}),
      },
    })),
  }
}

export function buildTestimonialsWebPageJsonLd(siteUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/testimonials`,
    name: "Client testimonials",
    description,
    url: `${siteUrl}/testimonials`,
    isPartOf: {
      "@type": "WebSite",
      name: "Tayyab Portfolio",
      url: siteUrl,
    },
    mainEntity: {
      "@id": testimonialsListId(siteUrl, "/testimonials"),
    },
  }
}

export function buildTestimonialsBreadcrumbJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimonials",
        item: `${siteUrl}/testimonials`,
      },
    ],
  }
}
