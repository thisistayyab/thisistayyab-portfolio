import { NextResponse } from "next/server"

import { BLOG_INDEX_PATH } from "@/lib/blog/config"
import { getPublishedPosts } from "@/lib/blog/queries"
import { SITE_BRAND, SITE_URL } from "@/lib/site"

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getPublishedPosts()

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${SITE_URL}${BLOG_INDEX_PATH}/${post.slug}`
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date().toUTCString()

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.author ? `<author>tayyab@taylancetech.com (${escapeXml(post.author.name)})</author>` : ""}
      ${post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ") ?? ""}
    </item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_BRAND)}</title>
    <link>${SITE_URL}${BLOG_INDEX_PATH}</link>
    <description>Articles on full stack web development, React, Next.js, Node.js, and SaaS architecture by Tayyab.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`

  return new NextResponse(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
