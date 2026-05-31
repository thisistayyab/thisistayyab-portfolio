import type { Metadata } from "next"

import { blogIndexMetadata, BLOG_INDEX_PATH } from "@/lib/blog/config"
import { SITE_URL } from "@/lib/site"

export function blogIndexPageMetadata(): Metadata {
  const url = `${SITE_URL}${BLOG_INDEX_PATH}`

  return {
    title: blogIndexMetadata.title,
    description: blogIndexMetadata.description,
    keywords: [...blogIndexMetadata.keywords],
    alternates: { canonical: url },
    openGraph: {
      title: blogIndexMetadata.title,
      description: blogIndexMetadata.description,
      url,
      type: "website",
    },
  }
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

  return {
    title,
    description,
    keywords: post.seo_keywords ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image ? [{ url: post.cover_image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  }
}
