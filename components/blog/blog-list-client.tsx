"use client"

import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import { BlogCard } from "@/components/blog/blog-card"
import type { BlogPostSummary } from "@/lib/blog/types"
import { cn } from "@/lib/utils"

type BlogListClientProps = {
  posts: BlogPostSummary[]
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [search, setSearch] = useState("")
  const [tag, setTag] = useState<string | null>(null)

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      const matchesTag = !tag || post.tags.includes(tag)
      return matchesSearch && matchesTag
    })
  }, [posts, search, tag])

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="relative mx-auto block max-w-xl">
          <span className="sr-only">Search articles</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            className={cn(
              "w-full rounded-full border border-white/10 bg-[rgba(8,12,26,0.85)] py-3 pr-4 pl-11 text-sm text-white",
              "placeholder:text-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/30",
            )}
          />
        </label>

        {allTags.length > 0 ? (
          <ul className="flex list-none flex-wrap justify-center gap-2" role="list" aria-label="Filter by topic">
            <li>
              <button
                type="button"
                onClick={() => setTag(null)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  tag === null
                    ? "border-blue-500/50 bg-blue-500/15 text-white"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white",
                )}
              >
                All
              </button>
            </li>
            {allTags.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => setTag(item)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    tag === item
                      ? "border-violet-500/50 bg-violet-500/15 text-white"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white",
                  )}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-slate-500">
          No articles match your search. Try another keyword or clear filters.
        </p>
      ) : (
        <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" role="list">
          {filtered.map((post, index) => (
            <li key={post.slug} className="list-none">
              <BlogCard post={post} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
