import { BLOG_INDEX_PATH } from "@/lib/blog/config"
import type { BlogPost, BlogPostSummary } from "@/lib/blog/types"
import { blogImageUrl } from "@/lib/blog/utils"
import { personId } from "@/lib/json-ld-ids"
import { SITE_BRAND, SITE_URL } from "@/lib/site"

export function buildBlogIndexJsonLd(posts: BlogPostSummary[], description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${BLOG_INDEX_PATH}`,
    name: "Blog | Tayyab — Full Stack Development Articles",
    description,
    url: `${SITE_URL}${BLOG_INDEX_PATH}`,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_BRAND, url: `${SITE_URL}/` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 50).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${BLOG_INDEX_PATH}/${post.slug}`,
        name: post.title,
      })),
    },
  }
}

export function buildBlogBreadcrumbJsonLd(slug?: string, postTitle?: string) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${BLOG_INDEX_PATH}` },
  ]

  if (slug && postTitle) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: postTitle,
      item: `${SITE_URL}${BLOG_INDEX_PATH}/${slug}`,
    })
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  }
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const url = `${SITE_URL}${BLOG_INDEX_PATH}/${post.slug}`
  const image = blogImageUrl(post.cover_image)

  const published = post.published_at || post.updated_at || new Date().toISOString()

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    url,
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    image: image ? [image] : undefined,
    author: {
      "@type": "Person",
      "@id": personId(SITE_URL),
      name: post.author?.name || "Tayyab",
      url: personId(SITE_URL),
    },
    publisher: {
      "@type": "Person",
      "@id": personId(SITE_URL),
      name: "Tayyab",
      url: personId(SITE_URL),
    },
    datePublished: published,
    dateModified: post.updated_at || post.published_at || published,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.length ? post.tags.join(", ") : post.seo_keywords?.join(", "),
    articleSection: post.tags[0] || "Full Stack Development",
    wordCount: post.content.replace(/<[^>]+>/g, " ").split(/\s+/g).filter(Boolean).length,
  }
}
