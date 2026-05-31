import type { BlogPost, BlogPostSummary } from "@/lib/blog/types"

/** Server-side blog data access — wired to Supabase when the CMS is migrated. */
export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  return []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  void slug
  return null
}

export async function getAllPostSlugs(): Promise<string[]> {
  return []
}
