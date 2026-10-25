import { ArrowLeft, Calendar, Clock } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BlogCard } from "@/components/blog/blog-card"
import { BlogShareButtons } from "@/components/blog/blog-share-buttons"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { CtaLink } from "@/components/site/cta-link"
import { buildFaqJsonLd } from "@/components/site/faq-json-ld"
import { GlassSurface } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { contentCardClassName } from "@/components/site/site-styles"
import { BLOG_INDEX_PATH } from "@/lib/blog/config"
import { renderBlogPostBody } from "@/lib/blog/content"
import { buildBlogBreadcrumbJsonLd, buildBlogPostingJsonLd } from "@/lib/blog/json-ld"
import { blogPostPageMetadata } from "@/lib/blog/metadata"
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog/queries"
import { blogImageUrl, formatBlogDate } from "@/lib/blog/utils"
import { cn } from "@/lib/utils"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

/** Posts are local files: every slug is prerendered and unknown slugs 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return post ? blogPostPageMetadata(post) : {}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const related = getRelatedPosts(slug, post.tags, 3)
  const seoImageUrl = blogImageUrl(post.coverImage)
  const showUpdated = post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10)

  return (
    <>
      <JsonLd data={buildBlogPostingJsonLd(post)} />
      <JsonLd data={buildBlogBreadcrumbJsonLd(slug, post.title)} />
      {post.faq && post.faq.length > 0 ? <JsonLd data={buildFaqJsonLd(post.faq)} /> : null}

      <article itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="dateModified" content={post.updatedAt} />
        {seoImageUrl ? <meta itemProp="image" content={seoImageUrl} /> : null}

        <header className="relative overflow-hidden border-b border-white/[0.06] pt-28 pb-10 sm:pt-32 sm:pb-12">
          <HeaderGraphBackground />
          <PageHeaderStagger className="relative z-[1] mx-auto max-w-3xl px-5 sm:px-6 lg:px-4">
            <PageHeaderItem>
              <Link
                href={BLOG_INDEX_PATH}
                className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 no-underline transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to blog
              </Link>
            </PageHeaderItem>

            {post.tags.length > 0 ? (
              <PageHeaderItem>
                <ul className="mb-4 flex list-none flex-wrap gap-2" aria-label="Article topics">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </PageHeaderItem>
            ) : null}

            <PageHeaderItem>
              <h1
                className="text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
                itemProp="headline"
              >
                {post.title}
              </h1>
            </PageHeaderItem>

            <PageHeaderItem>
              <div className="mt-6 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <div
                    className="flex items-center gap-2.5"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    {post.author.avatarUrl ? (
                      <Image
                        src={post.author.avatarUrl}
                        alt={`${post.author.name} avatar`}
                        width={40}
                        height={40}
                        className="size-10 rounded-full border border-white/10 object-cover"
                      />
                    ) : (
                      <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-xs font-bold text-white">
                        {post.author.name.charAt(0)}
                      </span>
                    )}
                    <Link
                      href="/about"
                      className="font-medium text-white no-underline transition-colors hover:text-blue-300"
                      itemProp="url"
                    >
                      <span itemProp="name">{post.author.name}</span>
                    </Link>
                  </div>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4" aria-hidden="true" />
                    <time itemProp="datePublished" dateTime={post.publishedAt}>
                      {formatBlogDate(post.publishedAt)}
                    </time>
                  </span>
                  {showUpdated ? (
                    <span className="text-xs text-slate-500">
                      (Updated {formatBlogDate(post.updatedAt)})
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
                <BlogShareButtons title={post.title} slug={post.slug} />
              </div>
            </PageHeaderItem>
          </PageHeaderStagger>
        </header>

        <MotionSection className="relative mx-auto max-w-3xl px-5 pt-10 pb-16 sm:px-6 lg:px-4">
          {post.coverImage ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div
            className={cn(
              contentCardClassName,
              "blog-prose rounded-2xl border border-white/10 p-6 sm:p-10",
            )}
            itemProp="articleBody"
          >
            {renderBlogPostBody(slug)}
          </div>
        </MotionSection>
      </article>

      {related.length > 0 ? (
        <MotionSection
          className="relative mx-auto max-w-[1200px] border-t border-white/10 px-5 py-16 sm:px-6 lg:px-4"
          aria-labelledby="related-articles-heading"
        >
          <h2 id="related-articles-heading" className="mb-8 text-2xl font-bold text-white">
            Related articles
          </h2>
          <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-3" role="list">
            {related.map((item) => (
              <li key={item.slug} className="list-none">
                <BlogCard post={item} />
              </li>
            ))}
          </ul>
        </MotionSection>
      ) : null}

      <MotionSection className="mx-auto max-w-3xl px-5 pb-20 sm:px-6 lg:px-4">
        <GlassSurface
          rim="violet"
          className={cn(
            contentCardClassName,
            "rounded-2xl border border-white/10 p-8 text-center sm:p-10",
          )}
        >
          <h2 className="text-xl font-bold text-white sm:text-2xl">Building something similar?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            I help startups and engineering teams ship SaaS platforms, REST APIs, accessibility
            tooling, and full stack web products — from architecture to production.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <CtaLink href="/contact" title="Contact Tayyab for your project">
              Let&apos;s talk about your project
            </CtaLink>
            <CtaLink href="/projects" variant="secondary" title="Explore Tayyab's live projects">
              Explore live projects
            </CtaLink>
          </div>
        </GlassSurface>
      </MotionSection>
    </>
  )
}
