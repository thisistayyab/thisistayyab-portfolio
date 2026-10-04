import type { MetadataRoute } from "next"

import { getPublishedPostsForSitemap } from "@/lib/blog/queries"
import { blogImageUrl, formatSitemapDate } from "@/lib/blog/utils"
import { auditblocProject } from "@/lib/data/auditbloc-project"
import { relayProject } from "@/lib/data/relay-project"
import { tillqorinProject } from "@/lib/data/tillqorin-project"
import { youtubeDownloaderProject } from "@/lib/data/youtube-downloader-project"
import { featuredOgImageUrl, projectImageUrl, SITE_URL } from "@/lib/site"

/** Bump when static page content meaningfully changes. */
const SITEMAP_FRESHNESS_DATE = "2026-10-05"

/**
 * Update these dates whenever the page content meaningfully changes.
 * Google uses lastModified as the primary freshness signal.
 */
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}/`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "weekly",
    priority: 1,
    images: [featuredOgImageUrl()],
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [`${SITE_URL}/images/about.avif`],
  },
  {
    url: `${SITE_URL}/projects`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [featuredOgImageUrl()],
  },
  {
    url: `${SITE_URL}/projects/auditbloc`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [projectImageUrl(auditblocProject.image)],
  },
  {
    url: `${SITE_URL}/projects/tillqorin`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [projectImageUrl(tillqorinProject.image)],
  },
  {
    url: `${SITE_URL}/projects/relay`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [projectImageUrl(relayProject.image)],
  },
  {
    url: `${SITE_URL}/projects/youtube-downloader`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [projectImageUrl(youtubeDownloaderProject.image)],
  },
  {
    url: `${SITE_URL}/experience`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [featuredOgImageUrl()],
  },
  {
    url: `${SITE_URL}/testimonials`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [featuredOgImageUrl()],
  },
  {
    url: `${SITE_URL}/services`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [featuredOgImageUrl()],
  },
  {
    url: `${SITE_URL}/contact`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [featuredOgImageUrl()],
  },
  {
    url: `${SITE_URL}/privacy`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_URL}/terms`,
    lastModified: SITEMAP_FRESHNESS_DATE,
    changeFrequency: "yearly",
    priority: 0.3,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getPublishedPostsForSitemap>> = []
  try {
    posts = await getPublishedPostsForSitemap()
  } catch (error) {
    console.error("[sitemap] getPublishedPostsForSitemap:", error)
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const postImage = blogImageUrl(post.cover_image)
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: formatSitemapDate(post.updated_at ?? post.published_at, SITEMAP_FRESHNESS_DATE),
      changeFrequency: "monthly",
      priority: 0.7,
      images: postImage ? [postImage] : [featuredOgImageUrl()],
    }
  })

  const latestPostDate =
    posts.length > 0
      ? posts.reduce((latest, post) => {
          const current = formatSitemapDate(post.updated_at ?? post.published_at, SITEMAP_FRESHNESS_DATE)
          return current > latest ? current : latest
        }, formatSitemapDate(posts[0].updated_at ?? posts[0].published_at, SITEMAP_FRESHNESS_DATE))
      : SITEMAP_FRESHNESS_DATE

  const blogIndexEntry: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [featuredOgImageUrl()],
    },
  ]

  return [...staticRoutes, ...blogIndexEntry, ...postEntries]
}
