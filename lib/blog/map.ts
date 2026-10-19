import type { BlogAuthor, BlogPost, BlogPostSummary } from "@/lib/blog/types"
import { calculateReadTime, parseSeoKeywords } from "@/lib/blog/utils"

type SupabaseCategoryJoin = {
  category:
    | { id: string; name: string; slug: string }
    | { id: string; name: string; slug: string }[]
    | null
}

type SupabasePostRow = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content?: string | null
  cover_image: string | null
  published: boolean
  published_at: string | null
  featured: boolean
  seo_title?: string | null
  seo_description?: string | null
  seo_keywords?: unknown
  read_time: string | null
  view_count?: number | null
  created_at?: string
  updated_at?: string
  author: BlogAuthor | BlogAuthor[] | null
  categories?: SupabaseCategoryJoin[] | null
}

/**
 * Ensures any legacy "Founder / Co-Founder at Taylance Tech" role phrasing is normalized
 * to "Full Stack Developer" while preserving all real project/brand names and links.
 */
export function sanitizeBlogText(input: string | null | undefined): string {
  if (!input) return ""
  return input
    .replace(/\b(?:Co-?Founder|Founder)\s+(?:&\s+[^\s,]+\s+)?at\s+Taylance\s+Tech\b/gi, "Full Stack Developer")
    .replace(/\b(?:Co-?Founder|Founder)\s+of\s+Taylance\s+Tech\b/gi, "Full Stack Developer")
}

function mapAuthor(author: BlogAuthor | BlogAuthor[] | null): BlogAuthor | null {
  const resolved = Array.isArray(author) ? (author[0] ?? null) : author
  if (!resolved) return null
  return {
    id: resolved.id,
    name: sanitizeBlogText(resolved.name) || "Tayyab",
    avatar_url: resolved.avatar_url,
  }
}

function mapTags(categories: SupabaseCategoryJoin[] | null | undefined): string[] {
  if (!categories?.length) return []
  return categories
    .map((row) => {
      const cat = Array.isArray(row.category) ? row.category[0] : row.category
      return cat?.name
    })
    .filter((name): name is string => Boolean(name))
}

export function mapSupabasePost(row: SupabasePostRow): BlogPost {
  const content = sanitizeBlogText(row.content)
  const rawKeywords = parseSeoKeywords(row.seo_keywords)
  const sanitizedKeywords = rawKeywords
    ? rawKeywords.map((kw) => sanitizeBlogText(kw)).filter(Boolean)
    : null

  return {
    id: row.id,
    slug: row.slug,
    title: sanitizeBlogText(row.title),
    excerpt: sanitizeBlogText(row.excerpt),
    content,
    cover_image: row.cover_image,
    published: row.published,
    published_at: row.published_at,
    featured: row.featured,
    seo_title: row.seo_title ? sanitizeBlogText(row.seo_title) : null,
    seo_description: row.seo_description ? sanitizeBlogText(row.seo_description) : null,
    seo_keywords: sanitizedKeywords,
    read_time: row.read_time || (content ? calculateReadTime(content) : "6 min read"),
    view_count: row.view_count ?? 0,
    tags: mapTags(row.categories),
    author: mapAuthor(row.author),
    updated_at: row.updated_at ?? row.published_at ?? row.created_at ?? null,
  }
}

export function toPostSummary(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    cover_image: post.cover_image,
    published_at: post.published_at,
    read_time: post.read_time,
    tags: post.tags,
    author: post.author,
    updated_at: post.updated_at ?? post.published_at ?? null,
  }
}

/**
 * Lightweight select for list, featured, related, and sitemap queries.
 * Excludes the large `content` HTML column so Vercel ISR Data Cache reads/writes stay tiny.
 */
export const POST_SUMMARY_SELECT = `
  id,
  slug,
  title,
  excerpt,
  cover_image,
  published,
  published_at,
  featured,
  read_time,
  view_count,
  created_at,
  updated_at,
  author:authors(id, name, avatar_url),
  categories:post_categories(
    category:categories(id, name, slug)
  )
` as const

export const POST_SELECT = `
  *,
  author:authors(id, name, avatar_url),
  categories:post_categories(
    category:categories(id, name, slug)
  )
` as const
