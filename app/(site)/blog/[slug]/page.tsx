import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BlogCard } from "@/components/blog/blog-card"
import { BlogShareButtons } from "@/components/blog/blog-share-buttons"
import { PostViewTracker } from "@/components/blog/post-view-tracker"
import { CtaLink } from "@/components/site/cta-link"
import { JsonLd } from "@/components/site/json-ld"
import { BLOG_INDEX_PATH } from "@/lib/blog/config"
import { buildBlogBreadcrumbJsonLd, buildBlogPostingJsonLd } from "@/lib/blog/json-ld"
import { blogPostPageMetadata } from "@/lib/blog/metadata"
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog/queries"
import { blogImageUrl, formatBlogDate, sanitizeBlogContentHtml } from "@/lib/blog/utils"
import { contentCardClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

/** ISR — 24 hours; keep in sync with `BLOG_REVALIDATE_SECONDS` in `lib/blog/queries.ts` */
export const revalidate = 86400
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("[blog] generateStaticParams:", error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    }
  }

  return blogPostPageMetadata(post)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = await getRelatedPosts(slug, post.tags, 3)
  const cover = blogImageUrl(post.cover_image)

  return (
    <>
      <PostViewTracker postId={post.id} />
      <JsonLd data={buildBlogPostingJsonLd(post)} />
      <JsonLd data={buildBlogBreadcrumbJsonLd(slug, post.title)} />

      <article
        className="relative mx-auto max-w-3xl px-5 pt-[calc(88px+2rem)] pb-16 sm:px-6 lg:px-4"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <Link
          href={BLOG_INDEX_PATH}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 no-underline transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to blog
        </Link>

        {post.tags.length > 0 ? (
          <ul className="mb-4 flex list-none flex-wrap gap-2" aria-label="Article topics">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <h1
          className="text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
          itemProp="headline"
        >
          {post.title}
        </h1>

        <div className="mt-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            {post.author ? (
              <div
                className="flex items-center gap-2"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                {post.author.avatar_url ? (
                  <Image
                    src={blogImageUrl(post.author.avatar_url) ?? post.author.avatar_url}
                    alt={`${post.author.name} avatar`}
                    width={40}
                    height={40}
                    className="size-10 rounded-full border border-white/10 object-cover"
                    itemProp="image"
                  />
                ) : (
                  <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-xs font-bold text-white">
                    {post.author.name.charAt(0)}
                  </span>
                )}
                <span className="font-medium text-white" itemProp="name">
                  {post.author.name}
                </span>
              </div>
            ) : null}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden="true" />
              <time itemProp="datePublished" dateTime={post.published_at ?? undefined}>
                {formatBlogDate(post.published_at)}
              </time>
            </span>
            {post.read_time ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {post.read_time}
              </span>
            ) : null}
          </div>
          <BlogShareButtons title={post.title} slug={post.slug} />
        </div>

        {cover ? (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src={cover}
              alt={`Cover image for ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
              itemProp="image"
            />
          </div>
        ) : null}

        <div
          className={cn(contentCardClassName, "blog-prose rounded-2xl border border-white/10 p-6 sm:p-10")}
          dangerouslySetInnerHTML={{ __html: sanitizeBlogContentHtml(post.content) }}
          itemProp="articleBody"
        />
      </article>

      {related.length > 0 ? (
        <section
          className="relative mx-auto max-w-[1200px] border-t border-white/10 px-5 py-16 sm:px-6 lg:px-4"
          aria-labelledby="related-articles-heading"
        >
          <h2 id="related-articles-heading" className="mb-8 text-2xl font-bold text-white">
            Related articles
          </h2>
          <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-3" role="list">
            {related.map((item) => (
              <li key={item.id} className="list-none">
                <BlogCard post={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-6 lg:px-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-slate-950/80 to-blue-950/40 p-8 text-center">
          <h2 className="text-xl font-bold text-white">Building something similar?</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            I help teams ship SaaS, APIs, and full stack products — from architecture to production.
          </p>
          <div className="mt-6 flex justify-center">
            <CtaLink href="/contact" title="Contact Tayyab for your project">
              Let&apos;s talk about your project
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
