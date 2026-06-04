/** Fragment URL for JSON-LD on the homepage (`/#fragment`) or a path (`/path#fragment`). */
export function pageFragmentId(siteUrl: string, pagePath: string, fragment: string) {
  if (pagePath === "/") return `${siteUrl}/#${fragment}`
  return `${siteUrl}${pagePath}#${fragment}`
}

export function personId(siteUrl: string) {
  return `${siteUrl}/about`
}
