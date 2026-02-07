import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '@/types/database';
import { getOptimizedImageUrl } from '@/lib/imageOptimizer';

interface BlogCardProps {
    post: Post | any; // Allow relaxed type for migration
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    // Adapter for different data shapes (Supabase snake_case vs legacy camelCase)
    const coverImage = post.cover_image || post.coverImage;
    const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString()
        : (post.date || 'Recently');
    const readTime = post.read_time || post.readTime;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="h-full group"
        >
            <Card
                className="p-0 overflow-hidden h-full flex flex-col border-white/10"
                glowColor="rgba(59, 130, 246, 0.1)"
                hoverScale={false}
                hoverLift={false}
            >
                {/* Image Container */}
                <div className="relative w-full h-[220px] overflow-hidden bg-[linear-gradient(135deg,#1e1e2f,#2d2d44)] m-0 p-0">
                    <Link to={`/blog/${post.slug}`} className="absolute inset-0 block">
                        <img
                            src={getOptimizedImageUrl(coverImage, { width: 800 })}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                            style={{ minWidth: '100%', minHeight: '100%' }}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.3)_100%)] opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:opacity-100 z-[1]" />
                    </Link>

                    {/* Tags Overlay */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-[2] pointer-events-none">
                        {post.tags?.slice(0, 2).map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium text-white bg-blue-600/80 backdrop-blur-md rounded-full border border-blue-400/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow bg-black/20 relative z-[2] text-left">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{readTime}</span>
                        </div>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="group-hover:no-underline">
                        <h3 className="text-xl font-bold mb-3 text-white bg-[linear-gradient(135deg,#ffffff,#94a3b8)] bg-clip-text text-transparent transition-all duration-300 ease-in-out group-hover:bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] group-hover:bg-clip-text line-clamp-2">
                            {post.title}
                        </h3>
                    </Link>

                    <p className="text-[0.95rem] text-[#94a3b8] mb-6 leading-[1.6] opacity-90 line-clamp-3 flex-grow">
                        {post.excerpt}
                    </p>

                    <Link to={`/blog/${post.slug}`} className="mt-auto block">
                        <Button
                            variant="default"
                            className="w-full"
                            aria-label={`Read article: ${post.title}`}
                        >
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
}
