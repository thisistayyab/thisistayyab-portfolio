import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { blogPostPageMetadata } from "@/lib/blog/metadata"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog/queries"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
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

  return (
    <article className="mx-auto max-w-3xl px-5 pt-[calc(88px+2rem)] pb-16 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
      <div
        className="prose prose-invert mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
