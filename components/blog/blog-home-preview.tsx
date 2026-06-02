import { ArrowRight } from "lucide-react"

import { BlogCard } from "@/components/blog/blog-card"
import { CtaLink } from "@/components/site/cta-link"
import type { BlogPostSummary } from "@/lib/blog/types"

type BlogHomePreviewProps = {
  posts: BlogPostSummary[]
}

export function BlogHomePreview({ posts }: BlogHomePreviewProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section
      className="relative mx-auto max-w-[1200px] scroll-mt-28 px-5 py-20 sm:px-6 lg:scroll-mt-32 lg:px-4"
      aria-labelledby="home-blog-heading"
    >
      <div
        className="pointer-events-none absolute top-1/4 -right-20 h-64 w-64 rounded-full bg-indigo-600/12 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">Blog</p>
          <h2
            id="home-blog-heading"
            className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
          >
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              articles
            </span>
          </h2>
          <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem]">
            Notes on full stack development, React, Next.js, SaaS, APIs, and shipping production software.
          </p>
        </div>

        <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" role="list">
          {posts.map((post, index) => (
            <li key={post.id} className="list-none">
              <BlogCard post={post} priority={index === 0} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <CtaLink href="/blog" variant="secondary" title="Read all blog articles">
            View all articles
            <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
