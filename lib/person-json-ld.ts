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
    jobTitle: "Full Stack Web Developer",
    description,
    url: personId(siteUrl),
    image: {
      "@type": "ImageObject",
      url: imageSeoUrl(PROFILE_IMAGE, siteUrl),
      caption: "Tayyab — Full Stack Developer",
    },
    email: profileEmail,
    sameAs: [...profileSameAs],
    knowsAbout: [
      "Relay",
      "WebRTC",
      "Socket.IO",
      "Real-Time Communication",
      "Peer-to-Peer File Transfer",
      "AuditBloc",
      "Web Accessibility",
      "WCAG Compliance",
      "Tillqorin",
      "Tillqorin POS",
      "Retail Billing Systems",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "REST API",
      "FastAPI",
      "Web Application Development",
      "SaaS Development",
      "Full Stack Development",
      "Algorithms and Data Structures",
    ],
  }
}
