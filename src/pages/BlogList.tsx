import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../components/GlobalBackground';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { BlogCard } from '../components/BlogCard';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { fetchPosts } from '../services/blogService';
import { Post } from '@/types/database';

interface BlogListProps {
    isDesktop: boolean;
}

export function BlogList({ isDesktop }: BlogListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const data = await fetchPosts();
            setPosts(data);
            setLoading(false);
        };
        loadPosts();
        window.scrollTo(0, 0);
    }, []);

    // Extract all unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

    // JSON-LD for blog index (helps search engines discover article URLs)
    useEffect(() => {
        if (posts.length === 0) return;
        const baseUrl = 'https://thisistayyab.dev';
        const scriptId = 'blog-list-jsonld';
        const existing = document.getElementById(scriptId);
        if (existing) existing.remove();
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${baseUrl}/blog#page`,
            name: 'Blog - Insights & Articles | Tayyab',
            description: 'Articles on web development, React, Node.js, and the future of tech.',
            url: `${baseUrl}/blog`,
            isPartOf: { '@id': 'https://thisistayyab.dev/#website' },
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: posts.slice(0, 50).map((post, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `${baseUrl}/blog/${post.slug}`,
                    name: post.title,
                })),
            },
        });
        document.head.appendChild(script);
        return () => {
            const el = document.getElementById(scriptId);
            if (el) el.remove();
        };
    }, [posts]);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020205] text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <>
            <SEOHead />
            <GlobalBackground isDesktop={isDesktop} showTechIcons={true} />

            <main className="relative z-10 min-h-screen flex flex-col pt-32">
                <div className="mb-4"><AppAppBar /></div>

                <section className="flex-grow max-w-[1200px] mx-auto px-4 w-full">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Insights & Articles
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Thoughts on web development, performance optimization, and the future of tech.
                        </p>
                    </motion.div>

                    {/* Search and Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-12 space-y-6"
                    >
                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Tags */}
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                <Button
                                    variant={selectedTag === null ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedTag(null)}
                                    className="rounded-full"
                                >
                                    All
                                </Button>
                                {allTags.map(tag => (
                                    <Button
                                        key={tag}
                                        variant={selectedTag === tag ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                        className="rounded-full"
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Blog Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p>No articles found matching your criteria.</p>
                            <Button
                                variant="link"
                                onClick={() => { setSearchTerm(''); setSelectedTag(null); }}
                                className="mt-4 text-blue-400 hover:text-blue-300"
                            >
                                Clear filters
                            </Button>
                        </div>
                    )}
                </section>

                <Footer />
            </main>
        </>
    );
}
