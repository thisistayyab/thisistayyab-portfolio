import { imageSeoUrl } from "@/lib/image"
import { personId } from "@/lib/json-ld-ids"
import { PROFILE_IMAGE, profileEmail, profileSameAs } from "@/lib/site"

export const DEFAULT_PERSON_DESCRIPTION =
  "Tayyab (Tayyab Aslam) is a Full Stack Developer and AI Software Engineer specializing in production React, Next.js, TypeScript, Node.js, FastAPI, PostgreSQL, and Supabase web applications for global startups and businesses."

/** Canonical Person entity emitted on / and /about with consistent @id and jobTitle. */
export function buildPersonJsonLd(siteUrl: string, description: string = DEFAULT_PERSON_DESCRIPTION) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(siteUrl),
    name: "Tayyab",
    alternateName: ["Tayyab Aslam", "thisistayyab", "Tayyab Full Stack Developer"],
    jobTitle: "Full Stack Developer",
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      occupationalCategory: "15-1252.00",
      skills: "React, Next.js, TypeScript, Node.js, FastAPI, PostgreSQL, Supabase, SaaS Architecture, AI Integration",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Central Punjab",
    },
    description,
    url: `${siteUrl}/`,
    mainEntityOfPage: `${siteUrl}/about`,
    image: {
      "@type": "ImageObject",
      url: imageSeoUrl(PROFILE_IMAGE, siteUrl),
      caption: "Tayyab — Full Stack Developer",
    },
    email: profileEmail,
    sameAs: [...profileSameAs],
    knowsAbout: [
      "Full Stack Web Development",
      "SaaS Architecture",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "REST API Design",
      "AI Application Development",
      "WebRTC & Real-Time Communication",
      "Socket.IO",
      "Web Accessibility (WCAG 2.2)",
      "Playwright Browser Automation",
      "Retail POS & Billing Systems",
      "CRM & Enterprise Dashboards",
      "Tillqorin POS",
      "AuditBloc",
      "Taylance CRM",
      "Relay",
    ],
  }
}
