export interface Author {
    id: string;
    name: string;
    avatar_url: string;
    bio?: string;
    social_links?: any;
    created_at: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    created_at: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    cover_image: string;
    author_id: string; // Foreign Key
    published: boolean;
    published_at: string;
    featured: boolean;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    read_time?: string;
    view_count: number;
    created_at: string;
    updated_at: string;

    // Virtual fields (joined)
    author?: Author;
    categories?: Category[];
    tags?: string[]; // Mapped from categories
}
