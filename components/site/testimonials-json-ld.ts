import type { HomeTestimonial } from "@/components/site/testimonial-card"
import { pageFragmentId } from "@/lib/json-ld-ids"
import { SITE_BRAND } from "@/lib/site"

export function testimonialsListId(siteUrl: string, pagePath: string) {
  return pageFragmentId(
    siteUrl,
    pagePath === "/" ? "/" : "/testimonials",
    "testimonials-list",
  )
}

/**
 * Client quotes as Quotation — not Review schema.
 * Google rejects self-serving Review markup and does not support Person/Organization as itemReviewed.
 */
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
        "@type": "Quotation",
        text: item.quote,
        creator: {
          "@type": "Person",
          name: item.name,
          jobTitle: item.role,
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
      "@id": `${siteUrl}/#website`,
      name: SITE_BRAND,
      url: `${siteUrl}/`,
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
