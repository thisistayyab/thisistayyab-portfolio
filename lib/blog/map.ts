import type { BlogAuthor, BlogPost, BlogPostSummary } from "@/lib/blog/types"
import { calculateReadTime, parseSeoKeywords } from "@/lib/blog/utils"

type SupabaseCategoryJoin = {
  category: { id: string; name: string; slug: string } | null
}

type SupabasePostRow = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  published: boolean
  published_at: string | null
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  seo_keywords: unknown
  read_time: string | null
  view_count: number | null
  created_at?: string
  updated_at?: string
  author: BlogAuthor | null
  categories?: SupabaseCategoryJoin[] | null
}

function mapAuthor(author: BlogAuthor | null): BlogAuthor | null {
  if (!author) return null
  return {
    id: author.id,
    name: author.name,
    avatar_url: author.avatar_url,
  }
}

function mapTags(categories: SupabaseCategoryJoin[] | null | undefined): string[] {
  if (!categories?.length) return []
  return categories
    .map((row) => row.category?.name)
    .filter((name): name is string => Boolean(name))
}

export function mapSupabasePost(row: SupabasePostRow): BlogPost {
  const content = row.content ?? ""
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content,
    cover_image: row.cover_image,
    published: row.published,
    published_at: row.published_at,
    featured: row.featured,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    seo_keywords: parseSeoKeywords(row.seo_keywords),
    read_time: row.read_time || calculateReadTime(content),
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
  }
}

export const POST_SELECT = `
  *,
  author:authors(id, name, avatar_url),
  categories:post_categories(
    category:categories(id, name, slug)
  )
` as const
