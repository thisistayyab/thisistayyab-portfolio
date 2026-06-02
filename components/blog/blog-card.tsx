import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

import { blogPostPath } from "@/lib/blog/config"
import type { BlogPostSummary } from "@/lib/blog/types"
import { blogImageUrl, formatBlogDate } from "@/lib/blog/utils"
import { contentCardClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

type BlogCardProps = {
  post: BlogPostSummary
  priority?: boolean
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const cover = blogImageUrl(post.cover_image)
  const href = blogPostPath(post.slug)

  return (
    <article
      className={cn(
        contentCardClassName,
        "group flex h-full flex-col overflow-hidden rounded-xl border border-white/10",
      )}
    >
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/80 to-violet-950/60"
        tabIndex={-1}
        aria-hidden={!cover}
      >
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element -- CMS cover URLs vary by host
          <img
            src={cover}
            alt={post.title}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020106]/80 via-transparent to-transparent opacity-80"
          aria-hidden="true"
        />
        {post.tags.length > 0 ? (
          <ul className="absolute top-3 left-3 z-[2] flex list-none flex-wrap gap-2" aria-label="Tags">
            {post.tags.slice(0, 2).map((tag) => (
              <li key={tag}>
                <span className="rounded-full border border-blue-400/25 bg-blue-600/75 px-2.5 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur-md">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden="true" />
            <time dateTime={post.published_at ?? undefined}>{formatBlogDate(post.published_at)}</time>
          </span>
          {post.read_time ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.read_time}
            </span>
          ) : null}
        </div>

        <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-violet-200 sm:text-xl">
          <Link href={href} className="no-underline">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 no-underline transition-colors hover:text-white"
        >
          Read article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
