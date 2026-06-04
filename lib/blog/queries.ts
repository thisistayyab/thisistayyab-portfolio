import { mapSupabasePost, POST_SELECT, toPostSummary } from "@/lib/blog/map"
import type { BlogPost, BlogPostSummary } from "@/lib/blog/types"
import { getSupabasePublicClientOrNull } from "@/lib/supabase/public"

export const BLOG_REVALIDATE_SECONDS = 300

function getSupabase() {
  return getSupabasePublicClientOrNull()
}

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (error || !data?.length) {
    if (error) console.error("[blog] getPublishedPosts:", error.message)
    return []
  }

  return data.map((row) => toPostSummary(mapSupabasePost(row)))
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPostSummary[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error || !data?.length) {
    if (error) console.error("[blog] getFeaturedPosts:", error.message)
    return []
  }

  return data.map((row) => toPostSummary(mapSupabasePost(row)))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (error || !data) {
    if (error) console.error("[blog] getPostBySlug:", error.message)
    return null
  }

  return mapSupabasePost(data)
}

export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3,
): Promise<BlogPostSummary[]> {
  const posts = await getPublishedPosts()
  const others = posts.filter((p) => p.slug !== currentSlug)

  if (!tags.length) {
    return others.slice(0, limit)
  }

  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)

  const withSharedTags = scored.filter((item) => item.score > 0).map((item) => item.post)
  if (withSharedTags.length >= limit) {
    return withSharedTags.slice(0, limit)
  }

  const filler = others.filter((p) => !withSharedTags.includes(p))
  return [...withSharedTags, ...filler].slice(0, limit)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true)
    .not("slug", "is", null)

  if (error || !data) {
    if (error) console.error("[blog] getAllPostSlugs:", error.message)
    return []
  }

  return data.map((row) => row.slug as string)
}

export type SitemapPostEntry = {
  slug: string
  updated_at: string | null
  published_at: string | null
}

export async function getPublishedPostsForSitemap(): Promise<SitemapPostEntry[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("posts")
    .select("slug, updated_at, published_at, created_at")
    .eq("published", true)
    .not("slug", "is", null)

  if (error) {
    throw new Error(`[blog] getPublishedPostsForSitemap: ${error.message}`)
  }

  if (!data) {
    return []
  }

  return data.map((row) => ({
    slug: row.slug as string,
    updated_at: (row.updated_at as string | null) ?? null,
    published_at: (row.published_at as string | null) ?? (row.created_at as string | null) ?? null,
  }))
}
