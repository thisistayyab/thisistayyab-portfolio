import { cache } from "react"
import { unstable_cache } from "next/cache"

import { mapSupabasePost, POST_SELECT, POST_SUMMARY_SELECT, toPostSummary } from "@/lib/blog/map"
import type { BlogPost, BlogPostSummary, SitemapPostEntry } from "@/lib/blog/types"
import { FALLBACK_PUBLISHED_POSTS } from "@/lib/blog/fallback-posts"
import { getSupabasePublicClientOrNull } from "@/lib/supabase/public"

export type { SitemapPostEntry }

/** ISR revalidation interval (24 hours). On-demand revalidation triggers on CMS publish/update. */
export const BLOG_REVALIDATE_SECONDS = 86400
export const BLOG_CACHE_TAG = "blog-posts"

export function getBlogPostCacheTag(slug: string): string {
  return `blog-post-${slug}`
}

const VALID_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isValidBlogSlug(slug: string): boolean {
  return Boolean(slug && slug.length >= 2 && slug.length <= 160 && VALID_SLUG_REGEX.test(slug))
}

function getSupabase() {
  return getSupabasePublicClientOrNull()
}

const fetchPublishedPostsSummaryCached = unstable_cache(
  async (): Promise<BlogPostSummary[]> => {
    const supabase = getSupabase()
    if (!supabase) return []

    const { data, error } = await supabase
      .from("posts")
      .select(POST_SUMMARY_SELECT)
      .eq("published", true)
      .order("published_at", { ascending: false })

    if (error || !data?.length) {
      if (error) console.error("[blog] getPublishedPosts:", error.message)
      return []
    }

    return data.map((row) => toPostSummary(mapSupabasePost(row)))
  },
  ["blog-published-posts-summary-v2"],
  {
    revalidate: BLOG_REVALIDATE_SECONDS,
    tags: [BLOG_CACHE_TAG],
  },
)

export const getPublishedPosts = cache(async (): Promise<BlogPostSummary[]> => {
  return fetchPublishedPostsSummaryCached()
})

export const getFeaturedPosts = cache(async (limit = 3): Promise<BlogPostSummary[]> => {
  const posts = await getPublishedPosts()
  return posts.slice(0, limit)
})

function fetchSinglePostCached(slug: string): Promise<BlogPost | null> {
  return unstable_cache(
    async (): Promise<BlogPost | null> => {
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
    },
    ["blog-post-by-slug-v2", slug],
    {
      revalidate: BLOG_REVALIDATE_SECONDS,
      tags: [BLOG_CACHE_TAG, getBlogPostCacheTag(slug)],
    },
  )()
}

export const getPostBySlug = cache(async (rawSlug: string): Promise<BlogPost | null> => {
  const slug = rawSlug?.trim() ?? ""
  if (!isValidBlogSlug(slug)) {
    return null
  }

  return fetchSinglePostCached(slug)
})

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

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const fallbackSlugs = FALLBACK_PUBLISHED_POSTS.map((p) => p.slug)
  const publishedPosts = await getPublishedPosts()
  const dbSlugs = publishedPosts.map((p) => p.slug).filter(Boolean)
  return Array.from(new Set([...dbSlugs, ...fallbackSlugs]))
})

export const getPublishedPostsForSitemap = cache(async (): Promise<SitemapPostEntry[]> => {
  const publishedPosts = await getPublishedPosts()

  const postMap = new Map<string, SitemapPostEntry>()
  for (const post of FALLBACK_PUBLISHED_POSTS) {
    postMap.set(post.slug, post)
  }
  for (const post of publishedPosts) {
    postMap.set(post.slug, {
      slug: post.slug,
      updated_at: post.updated_at ?? post.published_at ?? null,
      published_at: post.published_at ?? null,
      cover_image: post.cover_image ?? null,
    })
  }

  const merged = Array.from(postMap.values())
  return merged.sort((a, b) => {
    const dateA = a.published_at ?? ""
    const dateB = b.published_at ?? ""
    return dateB.localeCompare(dateA)
  })
})

