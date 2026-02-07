import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { fetchPosts } from '../services/blogService';
import { Post } from '@/types/database';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function HomeBlog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                // Take only the first 3 posts for the home page
                setPosts(data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch posts for home blog", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    // If loading, we can show a skeleton or just return null/loader
    // For now, let's just show the structure but empty, or a small loader
    // But to keep it smooth, maybe just render nothing until loaded or keep existing structure

    if (loading) {
        return (
            <section className="max-w-[1200px] mx-auto px-4 py-20 relative" id="blog">
                <div className="flex justify-center items-center h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            </section>
        );
    }

    return (
        <section
            className="max-w-[1200px] mx-auto px-4 py-20 relative"
            id="blog"
            aria-labelledby="blog-heading"
        >
            {/* Background Elements */}
            <div
                className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"
                aria-hidden="true"
            />

            <motion.div
                className="mb-16 flex flex-col items-center gap-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 id="blog-heading" className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Latest Articles
                </h2>
                <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                    Insights on web development, performance optimization, and the future of tech.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {posts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                ))}
            </div>

            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <Link to="/blog">
                    <Button variant="default" size="lg" className="group">
                        View All Articles
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </motion.div>
        </section>
    );
}

export default HomeBlog;
