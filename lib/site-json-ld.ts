import { personId } from "@/lib/json-ld-ids"
import { SITE_BRAND } from "@/lib/site"

export function buildWebSiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_BRAND,
    url: `${siteUrl}/`,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      "@id": personId(siteUrl),
      name: "Tayyab",
      url: personId(siteUrl),
    },
  }
}
