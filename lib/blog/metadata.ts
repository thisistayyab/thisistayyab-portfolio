import type { Metadata } from "next"

import { blogIndexMetadata, BLOG_INDEX_PATH } from "@/lib/blog/config"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"

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
}): Metadata {
  const url = `${SITE_URL}${BLOG_INDEX_PATH}/${post.slug}`
  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt

  const imageUrl = post.cover_image?.startsWith("http")
    ? post.cover_image
    : post.cover_image
      ? `${SITE_URL}${post.cover_image.startsWith("/") ? post.cover_image : `/${post.cover_image}`}`
      : undefined

  return {
    title: { absolute: title },
    description,
    keywords: post.seo_keywords ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}
