import Link from "next/link"

import { BlogListClient } from "@/components/blog/blog-list-client"
import { JsonLd } from "@/components/site/json-ld"
import { BLOG_INDEX_PATH, blogIndexMetadata } from "@/lib/blog/config"
import { buildBlogBreadcrumbJsonLd, buildBlogIndexJsonLd } from "@/lib/blog/json-ld"
import { blogIndexPageMetadata } from "@/lib/blog/metadata"
import { getPublishedPosts } from "@/lib/blog/queries"

export const metadata = blogIndexPageMetadata()
/** ISR — keep in sync with `BLOG_REVALIDATE_SECONDS` in `lib/blog/queries.ts` */
export const revalidate = 300

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <JsonLd data={buildBlogIndexJsonLd(posts, blogIndexMetadata.description)} />
      <JsonLd data={buildBlogBreadcrumbJsonLd()} />

      <div className="relative mx-auto max-w-[1200px] px-5 pt-[calc(88px+2rem)] pb-20 sm:px-6 lg:px-4">
        <div
          className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-violet-600/10 blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]"
          aria-hidden="true"
        />

        <header className="relative z-[2] mx-auto mb-12 max-w-3xl text-center lg:mb-14">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">Blog</p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] leading-[1.12] font-bold tracking-tight text-white">
            Full stack development{" "}
            <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              articles
            </span>
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{blogIndexMetadata.description}</p>
        </header>

        <div className="relative z-[2]">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
              <p className="text-slate-400">
                New articles are on the way. Check back soon or{" "}
                <Link href="/contact" className="text-blue-400 underline-offset-4 hover:underline">
                  get in touch
                </Link>{" "}
                about a project.
              </p>
              <p className="mt-4">
                <Link href="/" className="text-sm text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline">
                  Back to home
                </Link>
              </p>
            </div>
          ) : (
            <BlogListClient posts={posts} />
          )}
        </div>
      </div>
    </>
  )
}
