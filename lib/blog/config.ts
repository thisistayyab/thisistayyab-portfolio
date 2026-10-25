export const BLOG_INDEX_PATH = "/blog" as const

/** Every cover image is exported at 16:9, 1200×675, WebP. */
export const BLOG_COVER_DIMENSIONS = { width: 1200, height: 675 } as const
export const BLOG_COVER_TYPE = "image/webp" as const

export function blogPostPath(slug: string) {
  return `${BLOG_INDEX_PATH}/${slug}` as const
}

export function isBlogPath(pathname: string) {
  return pathname === BLOG_INDEX_PATH || pathname.startsWith(`${BLOG_INDEX_PATH}/`)
}

export const blogIndexMetadata = {
  title: "Blog | Full Stack Development — React & Next.js",
  description:
    "Read Tayyab's blog on full stack development: React, Next.js, Node.js, PostgreSQL, SaaS architecture, APIs, performance, and AI automation.",
  keywords: [
    "full stack development blog",
    "React articles",
    "Next.js tutorials",
    "Node.js blog",
    "web development articles",
    "SaaS development",
    "API design",
    "Tayyab developer blog",
  ],
} as const
