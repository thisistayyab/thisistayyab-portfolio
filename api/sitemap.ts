import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
    const BASE_URL = 'https://thisistayyab.dev';

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        return res.status(500).json({ error: 'Missing Supabase environment variables' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
        // 1. Static Routes
        const staticRoutes = [
            '',
            '/about',
            '/projects',
            '/experience',
            '/testimonials',
            '/services',
            '/insights', // Blog List
            '/profiles',
            '/contact',
            '/privacy',
            '/terms'
        ];

        // 2. Fetch Dynamic Blog Routes
        const { data: posts, error } = await supabase
            .from('posts')
            .select('slug, updated_at, created_at')
            .eq('published', true);

        if (error) {
            console.error('Error fetching posts for sitemap:', error);
            throw error;
        }

        // 3. Build XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add Static Routes
        staticRoutes.forEach(route => {
            sitemap += `
    <url>
        <loc>${BASE_URL}${route}</loc>
        <changefreq>weekly</changefreq>
        <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
        });

        // Add Dynamic Blog Posts
        posts?.forEach(post => {
            const lastMod = new Date(post.updated_at || post.created_at).toISOString().split('T')[0];
            sitemap += `
    <url>
        <loc>${BASE_URL}/blog/${post.slug}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
        });

        sitemap += `
</urlset>`;

        // 4. Return XML
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=59');
        res.status(200).send(sitemap);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error generating sitemap' });
    }
}
