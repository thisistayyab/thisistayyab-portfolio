/** Strip extension so we can serve AVIF + WebP pairs from the same basename. */
export function imageBasePath(path: string) {
  return path.replace(/\.(avif|webp|jpe?g|png)$/i, "")
}

export function imageAvifPath(path: string) {
  return `${imageBasePath(path)}.avif`
}

export function imageWebpPath(path: string) {
  return `${imageBasePath(path)}.webp`
}

/**
 * Static assets that also ship a .jpg sibling under /public.
 * Only these may be mapped to .jpg for crawler-facing URLs — guessing would 404.
 */
const JPG_SIBLINGS = new Set([
  "/images/og",
  "/images/projects/auditbloc",
  "/images/projects/relay",
  "/images/projects/tillqorin",
  "/images/projects/youtube-downloader",
])

function normalize(path: string) {
  return imageBasePath(path.startsWith("/") ? path : `/${path}`)
}

/**
 * Absolute URL for crawler-facing images (JSON-LD ImageObject, Open Graph, Twitter).
 *
 * Prefers JPG where one exists, falls back to WebP, and never emits AVIF:
 * AVIF share images are still unsupported by X/Twitter, LinkedIn, Slack, iMessage,
 * and Mastodon crawlers (joost.blog/use-avif-webp-share-images), while WebP is
 * supported by every major platform. Only known .jpg siblings are used, so this
 * can never produce a 404 image URL.
 */
export function imageSeoUrl(path: string, siteUrl: string) {
  const base = normalize(path)
  const ext = JPG_SIBLINGS.has(base) ? ".jpg" : ".webp"
  return `${siteUrl}${base}${ext}`
}
