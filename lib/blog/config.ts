export const BLOG_INDEX_PATH = "/blog" as const
export const HOME_BLOG_SECTION_ID = "blog" as const

export function blogPostPath(slug: string) {
  return `${BLOG_INDEX_PATH}/${slug}` as const
}

export function isBlogPath(pathname: string) {
  return pathname === BLOG_INDEX_PATH || pathname.startsWith(`${BLOG_INDEX_PATH}/`)
}

export const blogIndexMetadata = {
  title: "Blog - Insights & Articles | Tayyab",
  description:
    "Articles on web development, React, Next.js, Node.js, performance, and the future of tech — written by Tayyab.",
  keywords: [
    "web development blog",
    "React articles",
    "Next.js tips",
    "Node.js tutorials",
    "developer insights",
    "full stack blog",
  ],
} as const
