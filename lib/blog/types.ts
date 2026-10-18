export type BlogAuthor = {
  id: string
  name: string
  avatar_url: string | null
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string | null
  published: boolean
  published_at: string | null
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
  read_time: string | null
  view_count: number
  tags: string[]
  author: BlogAuthor | null
  updated_at?: string | null
}

export type BlogAuthorRecord = BlogAuthor & {
  bio?: string | null
  created_at?: string
}

export type BlogCategory = {
  id: string
  name: string
  slug: string
  description?: string | null
}

export type BlogPostSummary = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image"
  | "published_at"
  | "read_time"
  | "tags"
  | "author"
>

export type SitemapPostEntry = {
  slug: string
  updated_at: string | null
  published_at: string | null
  cover_image: string | null
}

