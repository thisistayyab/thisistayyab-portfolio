import { imageSeoUrl } from "@/lib/image"
import { personId } from "@/lib/json-ld-ids"
import { PROFILE_IMAGE, profileEmail, profileSameAs } from "@/lib/site"

/** Canonical Person entity — emit only on /about to avoid conflicting @id graphs. */
export function buildPersonJsonLd(siteUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(siteUrl),
    name: "Tayyab",
    jobTitle: "Founder of Taylance Tech & Full Stack Web Developer",
    description,
    url: personId(siteUrl),
    image: imageSeoUrl(PROFILE_IMAGE, siteUrl),
    email: profileEmail,
    sameAs: [...profileSameAs],
    worksFor: {
      "@type": "Organization",
      name: "Taylance Tech",
      url: "https://taylancetech.com",
      founder: { "@id": personId(siteUrl) },
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "REST API",
      "GraphQL",
      "Web Application Development",
      "SaaS Development",
      "Full Stack Development",
    ],
  }
}
