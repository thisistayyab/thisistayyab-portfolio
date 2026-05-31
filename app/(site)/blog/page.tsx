import Link from "next/link"

import { JsonLd } from "@/components/site/json-ld"
import { BLOG_INDEX_PATH, blogIndexMetadata } from "@/lib/blog/config"
import { blogIndexPageMetadata } from "@/lib/blog/metadata"
import { getPublishedPosts } from "@/lib/blog/queries"
import { SITE_URL } from "@/lib/site"

export const metadata = blogIndexPageMetadata()

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}${BLOG_INDEX_PATH}#page`,
          name: blogIndexMetadata.title,
          description: blogIndexMetadata.description,
          url: `${SITE_URL}${BLOG_INDEX_PATH}`,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}${BLOG_INDEX_PATH}/${post.slug}`,
              name: post.title,
            })),
          },
        }}
      />

      <div className="mx-auto max-w-[1200px] px-5 pt-[calc(88px+2rem)] pb-16 sm:px-6 lg:px-4">
        <header className="mb-10">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
            Insights
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            {blogIndexMetadata.description}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-slate-500">
            Articles will appear here once the blog CMS is connected.{" "}
            <Link href="/" className="text-blue-400 underline-offset-4 hover:underline">
              Back to home
            </Link>
          </p>
        ) : null}
      </div>
    </>
  )
}
