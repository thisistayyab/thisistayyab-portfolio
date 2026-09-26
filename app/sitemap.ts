import type { MetadataRoute } from "next"

import { getPublishedPostsForSitemap } from "@/lib/blog/queries"
import { formatSitemapDate } from "@/lib/blog/utils"
import { SITE_URL } from "@/lib/site"

/** Bump when static page content meaningfully changes. */
const SITEMAP_FRESHNESS_DATE = "2026-09-26"

/**
 * Update these dates whenever the page content meaningfully changes.
 * Google uses lastModified as the primary freshness signal.
 */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/about`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/projects`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/projects/auditbloc`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/projects/tillqorin`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/experience`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/testimonials`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/contact`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/privacy`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, lastModified: SITEMAP_FRESHNESS_DATE, changeFrequency: "yearly", priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getPublishedPostsForSitemap>> = []
  try {
    posts = await getPublishedPostsForSitemap()
  } catch (error) {
    console.error("[sitemap] getPublishedPostsForSitemap:", error)
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: formatSitemapDate(post.updated_at ?? post.published_at, SITEMAP_FRESHNESS_DATE),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const latestPostDate =
    posts.length > 0
      ? posts.reduce((latest, post) => {
          const current = formatSitemapDate(post.updated_at ?? post.published_at, SITEMAP_FRESHNESS_DATE)
          return current > latest ? current : latest
        }, formatSitemapDate(posts[0].updated_at ?? posts[0].published_at, SITEMAP_FRESHNESS_DATE))
      : SITEMAP_FRESHNESS_DATE

  const blogIndexEntry: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.9 },
  ]

  return [...staticRoutes, ...blogIndexEntry, ...postEntries]
}
