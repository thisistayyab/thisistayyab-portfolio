import { SITE_URL } from "@/lib/site"

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]+>/g, " ").split(/\s+/g).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  return `${minutes} min read`
}

export function parseSeoKeywords(value: unknown): string[] | null {
  if (!value) return null
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean)
  }
  if (typeof value === "string") {
    const trimmed = value.trim()
    if (!trimmed) return null
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed) as unknown
        if (Array.isArray(parsed)) {
          return parsed.map(String).filter(Boolean)
        }
      } catch {
        // fall through to comma split
      }
    }
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return null
}

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function blogImageUrl(src: string | null | undefined): string | undefined {
  if (!src) return undefined
  if (src.startsWith("http://") || src.startsWith("https://")) return src
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`
}

export function formatBlogDate(iso: string | null | undefined) {
  if (!iso) return "Recently"
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/** No-op: Google deprecated the public sitemap ping endpoint; submit via Search Console instead. */
export async function pingSearchEnginesForSitemap() {}
