import type { Metadata } from "next"

import {
  BLOG_COVER_DIMENSIONS,
  BLOG_COVER_TYPE,
  blogIndexMetadata,
  blogPostPath,
  BLOG_INDEX_PATH,
} from "@/lib/blog/config"
import type { BlogPostSummary } from "@/lib/blog/types"
import { blogImageUrl } from "@/lib/blog/utils"
import { buildPageMetadata } from "@/lib/site-metadata"

export function blogIndexPageMetadata(): Metadata {
  return buildPageMetadata({
    title: blogIndexMetadata.title,
    description: blogIndexMetadata.description,
    canonicalPath: BLOG_INDEX_PATH,
    keywords: blogIndexMetadata.keywords,
  })
}

export function blogPostPageMetadata(post: BlogPostSummary): Metadata {
  const cover = blogImageUrl(post.coverImage)

  return buildPageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    canonicalPath: blogPostPath(post.slug),
    keywords: post.seoKeywords,
    openGraph: { type: "article" },
    ogImage: cover
      ? { url: cover, alt: post.title, ...BLOG_COVER_DIMENSIONS, type: BLOG_COVER_TYPE }
      : undefined,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  })
}
