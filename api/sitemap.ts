import { createClient } from '@supabase/supabase-js';

const BASE_URL = 'https://thisistayyab.dev';

// Static routes always included (so sitemap never 500s; GSC can always crawl)
const staticRoutes: { path: string; changefreq: string; priority: string }[] = [
    { path: '', changefreq: 'weekly', priority: '1.0' },
    { path: '/llms.txt', changefreq: 'monthly', priority: '0.7' },
    { path: '/about', changefreq: 'monthly', priority: '0.9' },
    { path: '/projects', changefreq: 'weekly', priority: '0.9' },
    { path: '/experience', changefreq: 'monthly', priority: '0.9' },
    { path: '/testimonials', changefreq: 'monthly', priority: '0.8' },
    { path: '/services', changefreq: 'monthly', priority: '0.9' },
    { path: '/insights', changefreq: 'weekly', priority: '0.85' },
    { path: '/blog', changefreq: 'weekly', priority: '0.9' },
    { path: '/contact', changefreq: 'monthly', priority: '0.9' },
    { path: '/privacy', changefreq: 'yearly', priority: '0.5' },
    { path: '/terms', changefreq: 'yearly', priority: '0.5' }
];

function buildSitemapXml(posts: { slug: string; updated_at?: string; created_at?: string }[] | null): string {
    const today = new Date().toISOString().split('T')[0];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

    for (const { path, changefreq, priority } of staticRoutes) {
        sitemap += `
    <url>
        <loc>${BASE_URL}${path || '/'}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
    }

    const seenSlugs = new Set<string>();
    posts?.forEach(post => {
        if (!post.slug || seenSlugs.has(post.slug)) return;
        seenSlugs.add(post.slug);
        const lastMod = new Date(post.updated_at || post.created_at || today).toISOString().split('T')[0];
        sitemap += `
    <url>
        <loc>${BASE_URL}/blog/${encodeURIComponent(post.slug)}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    });

    sitemap += `
</urlset>`;
    return sitemap;
}

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    // Shorter cache (5 min) so Google discovers new pages and blog posts sooner
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');

    let posts: { slug: string; updated_at?: string; created_at?: string }[] | null = null;
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

    if (SUPABASE_URL && SUPABASE_KEY) {
        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
            const { data, error } = await supabase
                .from('posts')
                .select('slug, updated_at, created_at')
                .eq('published', true)
                .not('slug', 'is', null);
            if (!error) posts = data;
            else console.error('Error fetching posts for sitemap:', error);
        } catch (e) {
            console.error(e);
        }
    }

    const xml = buildSitemapXml(posts);
    res.status(200).send(xml);
}
