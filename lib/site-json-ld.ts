import { personId } from "@/lib/json-ld-ids"

export function buildWebSiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Tayyab — Full Stack Developer",
    url: siteUrl,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      "@id": personId(siteUrl),
      name: "Tayyab",
      url: siteUrl,
    },
  }
}
