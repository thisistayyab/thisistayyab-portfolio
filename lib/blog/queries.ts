import { BLOG_AUTHOR, BLOG_POSTS } from "@/lib/blog/posts"
import type { BlogPostMeta, BlogPostSummary } from "@/lib/blog/types"

function toSummary(meta: BlogPostMeta): BlogPostSummary {
  return {
    ...meta,
    readTime: `${meta.readTimeMinutes} min read`,
    author: BLOG_AUTHOR,
  }
}

/** Built once at module load: the registry is static, so there is nothing to cache or revalidate. */
const PUBLISHED_POSTS: readonly BlogPostSummary[] = [...BLOG_POSTS]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map(toSummary)

/** All published posts, newest first. */
export function getPublishedPosts(): BlogPostSummary[] {
  return [...PUBLISHED_POSTS]
}

export function getFeaturedPosts(limit = 3): BlogPostSummary[] {
  return PUBLISHED_POSTS.slice(0, limit)
}

export function getPostBySlug(slug: string): BlogPostSummary | null {
  return PUBLISHED_POSTS.find((post) => post.slug === slug) ?? null
}

export function getAllPostSlugs(): string[] {
  return PUBLISHED_POSTS.map((post) => post.slug)
}

/** Posts sharing the most tags with `tags`, topped up with the newest posts. */
export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostSummary[] {
  const others = PUBLISHED_POSTS.filter((post) => post.slug !== currentSlug)

  const ranked = others
    .map((post) => ({ post, shared: post.tags.filter((tag) => tags.includes(tag)).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map(({ post }) => post)

  const filler = others.filter((post) => !ranked.includes(post))

  return [...ranked, ...filler].slice(0, limit)
}

/** Most recent content change across all posts — used for blog index lastmod and the feed. */
export function getLatestPostUpdate(): string | null {
  return PUBLISHED_POSTS.reduce<string | null>(
    (latest, post) => (!latest || post.updatedAt > latest ? post.updatedAt : latest),
    null,
  )
}
