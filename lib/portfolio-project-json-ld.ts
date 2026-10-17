import type { PortfolioProject } from "@/components/site/project-card"
import { personId } from "@/lib/json-ld-ids"
import { projectImageUrl } from "@/lib/site"

export function projectPortfolioUrl(siteUrl: string, project: PortfolioProject) {
  if (project.detailPath) return `${siteUrl}${project.detailPath}`
  return `${siteUrl}/projects#${project.slug}`
}

/** Rich SoftwareApplication schema for indexable portfolio project pages. */
export function buildPortfolioProjectSoftwareApplicationJsonLd(
  project: PortfolioProject,
  siteUrl: string,
) {
  const canonicalUrl = projectPortfolioUrl(siteUrl, project)
  const alternateNames = project.alternateName
    ? Array.isArray(project.alternateName)
      ? project.alternateName
      : [project.alternateName]
    : undefined

  const sameAs = [project.link, project.appUrl, project.githubUrl].filter(
    (url): url is string => Boolean(url),
  )

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": canonicalUrl,
    name: project.name,
    ...(alternateNames?.length ? { alternateName: alternateNames } : {}),
    description: project.description,
    url: canonicalUrl,
    ...(sameAs.length ? { sameAs } : {}),
    image: {
      "@type": "ImageObject",
      url: projectImageUrl(project.image),
      contentUrl: projectImageUrl(project.image),
      name: project.imageTitle,
      caption: project.imageAlt,
      description: project.imageAlt,
    },
    applicationCategory: project.applicationCategory ?? "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(project.seoKeywords?.length ? { keywords: project.seoKeywords.join(", ") } : {}),
    author: {
      "@type": "Person",
      "@id": personId(siteUrl),
      name: "Tayyab",
      url: personId(siteUrl),
      jobTitle: "Full Stack Web Developer",
    },
    creator: {
      "@type": "Person",
      "@id": personId(siteUrl),
      name: "Tayyab",
      url: personId(siteUrl),
    },
    ...(project.publisher
      ? {
          publisher: {
            "@type": "Organization",
            name: project.publisher.name,
            url: project.publisher.url,
          },
        }
      : {}),
    isPartOf: {
      "@type": "WebPage",
      "@id": `${siteUrl}/projects`,
      name: "Tayyab Web Development Projects",
      url: `${siteUrl}/projects`,
    },
  }
}

export function buildPortfolioProjectBreadcrumbJsonLd(
  siteUrl: string,
  project: PortfolioProject,
) {
  if (!project.detailPath) return null

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${siteUrl}${project.detailPath}`,
      },
    ],
  }
}
