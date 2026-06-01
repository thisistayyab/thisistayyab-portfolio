import Link from "next/link"

import { BLOG_INDEX_PATH } from "@/lib/blog/config"

export default function BlogPostNotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 pt-[calc(88px+3rem)] pb-20 text-center">
      <h1 className="text-2xl font-bold text-white">Article not found</h1>
      <p className="mt-3 text-slate-400">
        This post may have been removed or the URL is incorrect.
      </p>
      <Link
        href={BLOG_INDEX_PATH}
        className="mt-8 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-blue-500"
      >
        Back to blog
      </Link>
    </div>
  )
}
