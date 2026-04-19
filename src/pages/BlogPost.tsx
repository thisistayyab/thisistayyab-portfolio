import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../components/GlobalBackground';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { ShareButtons } from '../components/ShareButtons';
import { SEOHead } from '../components/SEOHead';
import { fetchPostBySlug, fetchPosts, incrementViewCount } from '../services/blogService';
import { Post } from '@/types/database';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { getOptimizedImageUrl, optimizeHtmlImages } from '@/lib/imageOptimizer';
import { BlogCTA } from '../components/BlogCTA';

interface BlogPostProps {
    isDesktop: boolean;
}

export function BlogPost({ isDesktop }: BlogPostProps) {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;
            setLoading(true);

            // Fetch current post
            const fetchedPost = await fetchPostBySlug(slug);

            if (fetchedPost) {
                setPost(fetchedPost);

                // Track view
                incrementViewCount(fetchedPost.id);

                // Fetch related posts (simple strategy: fetch all and filter out current, take top 3)
                // In a real app, filtering by category on backend is better
                const allPosts = await fetchPosts();
                const others = allPosts.filter(p => p.id !== fetchedPost.id).slice(0, 3);
                setRelatedPosts(others);
            }

            setLoading(false);
            window.scrollTo(0, 0);
        };

        loadPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020205] text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <>
                <SEOHead
                    title="Article not found | Tayyab"
                    description="This blog post does not exist or is no longer published."
                    noIndex
                />
                <GlobalBackground isDesktop={isDesktop} showTechIcons={false} />
                <main className="relative z-10 min-h-screen flex flex-col pt-32 text-white">
                    <div className="mb-4">
                        <AppAppBar />
                    </div>
                    <div className="flex-grow flex flex-col items-center justify-center px-4 pb-16">
                        <div className="text-center max-w-md">
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">Article not found</h1>
                            <p className="text-gray-400 mb-8">
                                The link may be wrong or this post may have been removed.
                            </p>
                            <Button onClick={() => navigate('/blog')} className="bg-blue-600 hover:bg-blue-500">
                                Back to articles
                            </Button>
                        </div>
                    </div>
                    <Footer />
                </main>
            </>
        );
    }

    // Convert date string if needed
    const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <SEOHead
                title={post.seo_title || post.title}
                description={post.seo_description || post.excerpt}
                keywords={post.seo_keywords || ''}
                ogTitle={post.seo_title || post.title}
                ogDescription={post.seo_description || post.excerpt}
                image={post.cover_image}
                type="article"
                publishedTime={post.published_at}
                author={post.author?.name || 'Tayyab'}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.seo_title || post.title,
                        "description": post.seo_description || post.excerpt,
                        "image": post.cover_image ? (post.cover_image.startsWith('http') ? post.cover_image : `https://thisistayyab.dev${post.cover_image}`) : undefined,
                        "author": {
                            "@type": "Person",
                            "name": post.author?.name || "Tayyab",
                            "url": "https://thisistayyab.dev"
                        },
                        "publisher": {
                            "@type": "Person",
                            "name": "Tayyab",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://thisistayyab.dev/assets/favicon.png"
                            }
                        },
                        "datePublished": post.published_at || post.created_at,
                        "dateModified": post.updated_at || post.published_at || post.created_at,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://thisistayyab.dev/blog/${post.slug}`
                        }
                    })
                }}
            />

            <GlobalBackground isDesktop={isDesktop} showTechIcons={true} />

            <main className="relative z-10 min-h-screen flex flex-col pt-32">
                <div className="mb-4"><AppAppBar /></div>

                <article className="flex-grow max-w-3xl mx-auto px-4 w-full" itemScope itemType="https://schema.org/BlogPosting">

                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Link to="/blog">
                            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-gray-400 hover:text-white" aria-label="Back to all articles">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Articles
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <header className="mb-8 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="flex flex-wrap gap-2 mb-4"
                        >
                            {post.tags?.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                            itemProp="headline"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6"
                        >
                            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <img
                                        src={post.author?.avatar_url || '/assets/profile.jpg'}
                                        alt={post.author?.name}
                                        className="w-10 h-10 rounded-full border border-white/10 object-cover"
                                        itemProp="image"
                                    />
                                    <span className="font-medium text-white" itemProp="name">{post.author?.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" aria-hidden="true" />
                                    <time itemProp="datePublished" dateTime={post.published_at}>{formattedDate}</time>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" aria-hidden="true" />
                                    <span>{post.read_time}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <ShareButtons title={post.title} slug={post.slug} />
                            </div>
                        </motion.div>
                    </header>


                    {/* Cover Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img
                            src={getOptimizedImageUrl(post.cover_image, { width: 1200 })}
                            alt={`Cover illustration for ${post.title}`}
                            className="w-full h-[250px] md:h-[400px] object-cover"
                            itemProp="image"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Card
                            className="bg-white/[0.03] backdrop-blur-[15px] border-white/10 p-6 md:p-10"
                            glowColor="rgba(59, 130, 246, 0.1)"
                            gradientColors={['#3b82f6', '#8b5cf6']}
                            hoverScale={false}
                            hoverLift={false}
                        >
                            <div
                                className="prose max-w-none w-full"
                            >
                                <div dangerouslySetInnerHTML={{ __html: optimizeHtmlImages(post.content) }} itemProp="articleBody" />
                            </div>
                        </Card>
                    </motion.div>

                    <hr className="my-16 border-white/10" />
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="max-w-[1200px] mx-auto px-4 w-full mb-20">
                        <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost, index) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                <BlogCTA />
                <Footer />
            </main>
        </>
    );
}
