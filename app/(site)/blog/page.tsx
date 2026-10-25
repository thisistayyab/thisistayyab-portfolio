import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { BlogListClient } from "@/components/blog/blog-list-client"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { blogIndexMetadata } from "@/lib/blog/config"
import { buildBlogBreadcrumbJsonLd, buildBlogIndexJsonLd } from "@/lib/blog/json-ld"
import { blogIndexPageMetadata } from "@/lib/blog/metadata"
import { getPublishedPosts } from "@/lib/blog/queries"

export const metadata = blogIndexPageMetadata()

export default function BlogIndexPage() {
  const posts = getPublishedPosts()

  return (
    <>
      <JsonLd data={buildBlogIndexJsonLd(posts, blogIndexMetadata.description)} />
      <JsonLd data={buildBlogBreadcrumbJsonLd()} />

      <header className="relative overflow-hidden border-b border-white/[0.06] pt-28 pb-12 sm:pt-32 sm:pb-16">
        <HeaderGraphBackground />
        <PageHeaderStagger className="relative z-[1] mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-4">
          <PageHeaderItem>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 no-underline transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>
          </PageHeaderItem>

          <PageHeaderItem>
            <p className="mb-4 text-center text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
              Blog
            </p>
          </PageHeaderItem>
          <PageHeaderItem>
            <h1 className="mx-auto max-w-4xl text-center text-[clamp(2rem,5vw,3.15rem)] leading-[1.12] font-bold tracking-tight text-white">
              Full stack development{" "}
              <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
                articles &amp; case studies
              </span>
            </h1>
          </PageHeaderItem>
          <PageHeaderItem>
            <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
          </PageHeaderItem>
          <PageHeaderItem>
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
              {blogIndexMetadata.description}
            </p>
          </PageHeaderItem>
        </PageHeaderStagger>
      </header>

      <MotionSection className="relative mx-auto max-w-[1200px] px-5 pt-12 pb-20 sm:px-6 lg:px-4">
        <h2 id="blog-articles-heading" className="sr-only">
          Published articles
        </h2>
        <BlogListClient posts={posts} />
      </MotionSection>
    </>
  )
}
