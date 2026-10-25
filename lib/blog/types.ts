export type BlogAuthor = {
  name: string
  avatarUrl: string | null
}

export type BlogFaqItem = {
  question: string
  answer: string
}

/**
 * Registry entry for one post (`lib/blog/posts.ts`). The article body lives in
 * `lib/blog/content/<slug>.tsx`.
 */
export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  /** Absolute URL or site-relative path. `null` falls back to the site OG image. */
  coverImage: string | null
  /** ISO 8601 timestamp. */
  publishedAt: string
  /** ISO 8601 timestamp. Bump only when the content meaningfully changes. */
  updatedAt: string
  readTimeMinutes: number
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  tags: string[]
  /** Structured FAQ items for Schema.org FAQPage JSON-LD. */
  faq?: readonly BlogFaqItem[]
}

/** A post as rendered on listings, article pages, the feed, and JSON-LD. */
export type BlogPostSummary = BlogPostMeta & {
  readTime: string
  author: BlogAuthor
}
