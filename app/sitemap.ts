import type { MetadataRoute } from "next"

import { getPublishedPostsForSitemap } from "@/lib/blog/queries"
import { SITE_URL } from "@/lib/site"

const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/experience`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/testimonials`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPostsForSitemap()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.updated_at || post.published_at || new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...postEntries]
}
