import type { Metadata } from "next"

import { NotFoundContent } from "@/components/site/not-found-content"
import { BLOG_INDEX_PATH } from "@/lib/blog/config"

export const metadata: Metadata = {
  title: { absolute: "Article Not Found | Tayyab" },
  robots: { index: false, follow: true },
}

export default function BlogPostNotFound() {
  return (
    <NotFoundContent
      title="Article not found"
      description="This post may have been removed, is still a draft, or the URL is incorrect."
      backHref={BLOG_INDEX_PATH}
      backLabel="Back to blog"
    />
  )
}
