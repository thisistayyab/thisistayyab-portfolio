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

/** Prefer AVIF for JSON-LD / OG absolute URLs (smaller, modern). */
export function imageSeoUrl(path: string, siteUrl: string) {
  return `${siteUrl}${imageAvifPath(path)}`
}
