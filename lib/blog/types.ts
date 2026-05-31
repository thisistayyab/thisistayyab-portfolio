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
