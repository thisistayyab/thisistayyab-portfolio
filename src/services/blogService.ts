import { supabase } from '@/lib/supabase';
import { Post } from '@/types/database';
import { blogPosts, BlogPost } from '@/data/blogPosts';

// In-memory cache to reduce API requests (TTL: 5 min for list, 10 min for single post)
const CACHE_TTL_MS = 5 * 60 * 1000;
const SINGLE_POST_CACHE_TTL_MS = 10 * 60 * 1000;
let postsCache: { data: Post[]; at: number } | null = null;
const postBySlugCache = new Map<string, { data: Post; at: number }>();

// Calculate read time based on content length
export const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/g).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
};

// Mapper for local fallback data
const mapLocalPost = (local: BlogPost): Post => {
    return {
        id: local.id,
        slug: local.slug,
        title: local.title,
        excerpt: local.excerpt,
        content: local.content,
        cover_image: local.coverImage,
        author_id: 'local', // Placeholder
        published: true,
        published_at: new Date(local.date).toISOString(), // Approximate
        featured: false,
        seo_title: local.seo.title,
        seo_description: local.seo.description,
        seo_keywords: local.seo.keywords,
        read_time: local.readTime,
        view_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),

        author: {
            id: 'local-author',
            name: local.author.name,
            avatar_url: local.author.avatar,
            created_at: new Date().toISOString()
        },
        tags: local.tags
    } as Post;
};

// Fetch all published posts (cached to reduce API requests)
export const fetchPosts = async (): Promise<Post[]> => {
    const now = Date.now();
    if (postsCache && (now - postsCache.at) < CACHE_TTL_MS) {
        return postsCache.data;
    }
    try {
        const { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                author:authors(*),
                categories:post_categories(
                    category:categories(*)
                )
            `)
            .eq('published', true)
            .order('published_at', { ascending: false });

        if (error || !data || data.length === 0) {
            console.warn('Supabase fetch failed or empty, falling back to local data.', error);
            return blogPosts.map(mapLocalPost);
        }

        const mapped = mapPosts(data);
        postsCache = { data: mapped, at: now };
        return mapped;
    } catch (e) {
        console.error("Exception fetching posts", e);
        return blogPosts.map(mapLocalPost);
    }
};

// Fetch a single post by slug (cached to reduce API requests)
export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
    const now = Date.now();
    const cached = postBySlugCache.get(slug);
    if (cached && (now - cached.at) < SINGLE_POST_CACHE_TTL_MS) {
        return cached.data;
    }
    try {
        const { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                author:authors(*),
                categories:post_categories(
                    category:categories(*)
                )
            `)
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.warn('Supabase fetch failed or not found, looking in local data.', error);
            const local = blogPosts.find(p => p.slug === slug);
            if (local) return mapLocalPost(local);
            return null;
        }

        const mapped = mapPost(data);
        postBySlugCache.set(slug, { data: mapped, at: now });
        return mapped;
    } catch (e) {
        console.error("Exception fetching post", e);
        const local = blogPosts.find(p => p.slug === slug);
        if (local) return mapLocalPost(local);
        return null;
    }
};

// Increment view count (at most once per post per session to avoid request spam)
export const incrementViewCount = async (postId: string) => {
    if (postId.startsWith('local')) return;
    const key = `view_count_${postId}`;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(key)) return;
    try {
        const { error } = await supabase.rpc('increment_view_count', { p_id: postId });
        if (!error && typeof sessionStorage !== 'undefined') sessionStorage.setItem(key, '1');
        if (error) console.error('Error incrementing view count:', error);
    } catch {
        // Non-blocking
    }
};

// Helper: Map Supabase response to cleaner internal Post structure
// (Supabase returns nested arrays for joins, we might want to flatten categories)
const mapPost = (row: any): Post => {
    if (!row) return row;

    // Flatten categories
    const categories = row.categories?.map((c: any) => c.category) || [];
    const tags = categories.map((c: any) => c.name);

    return {
        ...row,
        author: row.author, // Already joined object
        categories: categories,
        tags: tags,
        read_time: row.read_time || calculateReadTime(row.content || ''),
    };
};

const mapPosts = (rows: any[]): Post[] => {
    if (!rows) return [];
    return rows.map(mapPost);
};
