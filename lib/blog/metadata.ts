import type { Metadata } from "next"

import { blogIndexMetadata, BLOG_INDEX_PATH } from "@/lib/blog/config"
import { buildPageMetadata } from "@/lib/site-metadata"
import {
  FEATURED_OG_ALT,
  FEATURED_OG_DIMENSIONS,
  featuredOgImageUrl,
  SITE_BRAND,
  SITE_URL,
} from "@/lib/site"

export function blogIndexPageMetadata(): Metadata {
  return buildPageMetadata({
    title: blogIndexMetadata.title,
    description: blogIndexMetadata.description,
    canonicalPath: BLOG_INDEX_PATH,
    keywords: blogIndexMetadata.keywords,
  })
}

export function blogPostPageMetadata(post: {
  slug: string
  title: string
  excerpt: string
  seo_title?: string | null
  seo_description?: string | null
  seo_keywords?: string[] | null
  cover_image?: string | null
  published_at?: string | null
  updated_at?: string | null
  tags?: string[]
  author?: { name: string } | null
}): Metadata {
  const url = `${SITE_URL}${BLOG_INDEX_PATH}/${post.slug}`
  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt

  const imageUrl = post.cover_image?.startsWith("http")
    ? post.cover_image
    : post.cover_image
      ? `${SITE_URL}${post.cover_image.startsWith("/") ? post.cover_image : `/${post.cover_image}`}`
      : undefined

  const ogImages = imageUrl
    ? [{ url: imageUrl, alt: post.title }]
    : [
        {
          url: featuredOgImageUrl(),
          alt: FEATURED_OG_ALT,
          width: FEATURED_OG_DIMENSIONS.width,
          height: FEATURED_OG_DIMENSIONS.height,
          type: "image/jpeg",
        },
      ]

  return {
    title: { absolute: title },
    description,
    ...(post.seo_keywords?.length ? { keywords: post.seo_keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      siteName: SITE_BRAND,
      locale: "en_US",
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: post.author ? [post.author.name] : undefined,
      tags: post.tags?.length ? post.tags : undefined,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
  }
}
