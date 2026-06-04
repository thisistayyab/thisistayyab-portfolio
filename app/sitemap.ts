import type { MetadataRoute } from "next"

import { getPublishedPostsForSitemap } from "@/lib/blog/queries"
import { SITE_URL } from "@/lib/site"

/**
 * Update these dates whenever the page content meaningfully changes.
 * Google uses lastModified as the primary freshness signal.
 */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: "2026-06-04", changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/about`, lastModified: "2026-06-04", changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/projects`, lastModified: "2026-06-04", changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/experience`, lastModified: "2026-06-04", changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/testimonials`, lastModified: "2026-06-04", changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services`, lastModified: "2026-06-04", changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/contact`, lastModified: "2026-06-04", changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/privacy`, lastModified: "2026-05-31", changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, lastModified: "2026-05-31", changeFrequency: "yearly", priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostsForSitemap()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.updated_at || post.published_at || new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Blog index lastModified = most recent post date (or static fallback)
  const latestPostDate = posts.length > 0
    ? posts.reduce((latest, post) => {
        const d = post.updated_at || post.published_at
        return d && d > latest ? d : latest
      }, posts[0].updated_at || posts[0].published_at || "2026-06-04")
    : "2026-06-04"

  const blogIndexEntry: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.9 },
  ]

  return [...staticRoutes, ...blogIndexEntry, ...postEntries]
}
