import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser since we can't assume dotenv is installed
const loadEnv = () => {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        if (fs.existsSync(envPath)) {
            const envConfig = fs.readFileSync(envPath, 'utf-8');
            const env = {};
            envConfig.split('\n').forEach((line) => {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            });
        }
    } catch (e) {
        console.warn('Could not load .env file, relying on process.env');
    }
};

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const BASE_URL = 'https://thisistayyab.dev'; // Hardcoded based on context, or use env

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables. Sitemap generation skipped.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const generateSitemap = async () => {
    console.log('Generating sitemap...');

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
        return;
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

    // 4. Write to public/sitemap.xml
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log(`Sitemap generated successfully with ${posts?.length || 0} articles!`);
};

generateSitemap();
