import { SITE_URL } from "@/lib/site"

export function blogImageUrl(src: string | null | undefined): string | undefined {
  if (!src) return undefined
  if (src.startsWith("http://") || src.startsWith("https://")) return src
  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`
}

/** Fixed to UTC so the prerendered date never depends on the build machine's timezone. */
export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

/** YYYY-MM-DD for sitemap `lastmod`. */
export function formatSitemapDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10)
}
