import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Post, Author, Category } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, X, Save, Eye, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PostsManagement() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    // const [loading, setLoading] = useState(true); // Removed unused
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
        fetchAuthors();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        // setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                author:authors(*),
                categories:post_categories(
                    category:categories(*)
                )
            `)
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching posts:', error);
        else {
            // Map the nested categories structure
            const mappedPosts = data?.map(post => ({
                ...post,
                author: post.author,
                categories: post.categories?.map((c: any) => c.category) || []
            })) || [];
            setPosts(mappedPosts);
        }
        // setLoading(false);
    };

    const fetchAuthors = async () => {
        const { data } = await supabase.from('authors').select('*');
        if (data) setAuthors(data);
    };

    const fetchCategories = async () => {
        const { data } = await supabase.from('categories').select('*');
        if (data) setCategories(data);
    };

    const handleSave = async () => {
        if (!currentPost.title || !currentPost.slug || !currentPost.author_id) {
            alert('Title, Slug, and Author are required.');
            return;
        }

        let postId = currentPost.id;

        const postData = {
            title: currentPost.title,
            slug: currentPost.slug,
            excerpt: currentPost.excerpt,
            content: currentPost.content,
            cover_image: currentPost.cover_image,
            author_id: currentPost.author_id,
            published: currentPost.published || false,
            published_at: currentPost.published ? (currentPost.published_at || new Date().toISOString()) : null,
            seo_title: currentPost.seo_title,
            seo_description: currentPost.seo_description,
            seo_keywords: currentPost.seo_keywords,
            read_time: currentPost.read_time
        };

        if (postId) {
            // Update Post
            const { error } = await supabase.from('posts').update(postData).eq('id', postId);
            if (error) {
                console.error('Error updating post:', error);
                return;
            }
        } else {
            // Create Post
            const { data, error } = await supabase.from('posts').insert([postData]).select();
            if (error) {
                console.error('Error creating post:', error);
                return;
            }
            postId = data[0].id;
        }

        // Handle Categories (Delete all and re-insert for simplicity)
        if (postId) {
            await supabase.from('post_categories').delete().eq('post_id', postId);
            if (selectedCategories.length > 0) {
                const categoryInserts = selectedCategories.map(catId => ({
                    post_id: postId,
                    category_id: catId
                }));
                await supabase.from('post_categories').insert(categoryInserts);
            }
        }

        setIsEditing(false);
        setCurrentPost({});
        setSelectedCategories([]);
        fetchPosts();

        // Notify search engines to re-crawl sitemap when a post is published (sitemap is dynamic and already includes new posts)
        if (postData.published) {
            const sitemapUrl = encodeURIComponent('https://thisistayyab.dev/sitemap.xml');
            try {
                await Promise.allSettled([
                    fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`),
                    fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`)
                ]);
            } catch {
                // Non-blocking; sitemap is still updated on next request
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure? This cannot be undone.')) return;
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) console.error('Error deleting post:', error);
        else fetchPosts();
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Auto-generate slug
    const handleTitleChange = (title: string) => {
        if (!currentPost.id) { // Only auto-gen if new
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setCurrentPost(prev => ({ ...prev, title, slug }));
        } else {
            setCurrentPost(prev => ({ ...prev, title }));
        }
    };

    const toggleCategory = (catId: string) => {
        setSelectedCategories(prev =>
            prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
        );
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="bg-black/20 border-white/10 pl-10 text-white placeholder:text-gray-500 focus:bg-black/40 transition-all rounded-lg"
                    />
                </div>
                <Button
                    onClick={() => { setCurrentPost({ published: false }); setSelectedCategories([]); setIsEditing(true); }}
                    className="w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4 mr-2" /> New Post
                </Button>
            </div>

            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-zinc-900/90 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl space-y-8"
                    >
                        <div className="flex justify-between items-center border-b border-white/10 pb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    {currentPost.id ? 'Edit Article' : 'Create New Article'}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Draft your masterpiece below.
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="hover:bg-white/10 rounded-full">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content Info */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Title</label>
                                    <Input
                                        value={currentPost.title || ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value)}
                                        className="bg-black/30 border-white/10 text-white font-bold text-xl h-12 px-4 focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="Enter a catchy title..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Slug</label>
                                    <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-md px-3 py-2 text-gray-400 text-sm">
                                        <span>domain.com/blog/</span>
                                        <input
                                            value={currentPost.slug || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                            className="bg-transparent border-none outline-none text-white w-full font-mono"
                                            placeholder="post-slug"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Excerpt</label>
                                    <Textarea
                                        value={currentPost.excerpt || ''}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                        className="bg-black/30 border-white/10 text-white h-24 focus:ring-2 focus:ring-blue-500/50"
                                        placeholder="Brief summary for search results and previews..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Content</label>
                                    <Textarea
                                        value={currentPost.content || ''}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                        className="bg-black/30 border-white/10 text-white font-mono text-sm min-h-[500px] focus:ring-2 focus:ring-blue-500/50 p-4 leading-relaxed"
                                        placeholder="<p>Write your article here...</p>"
                                    />
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                                    <h4 className="text-white font-semibold flex items-center gap-2">
                                        <Save className="w-4 h-4 text-blue-400" />
                                        Publishing
                                    </h4>
                                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/5">
                                        <span className="text-sm text-gray-300">Status</span>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={currentPost.published || false}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                                                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                                            />
                                            <span className={`text-sm font-medium ${currentPost.published ? "text-green-400" : "text-yellow-400"}`}>
                                                {currentPost.published ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                                            Save
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                                    <h4 className="text-white font-semibold">Metadata</h4>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Author</label>
                                        <select
                                            value={currentPost.author_id || ''}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentPost({ ...currentPost, author_id: e.target.value })}
                                            className="w-full bg-black/30 border border-white/10 rounded-md p-2.5 text-white outline-none focus:border-blue-500 text-sm"
                                        >
                                            <option value="">Select Author</option>
                                            {authors.map(a => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Cover Image</label>
                                        <Input
                                            value={currentPost.cover_image || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPost({ ...currentPost, cover_image: e.target.value })}
                                            className="bg-black/30 border-white/10 text-white text-sm"
                                            placeholder="https://..."
                                        />
                                        {currentPost.cover_image && (
                                            <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border border-white/10">
                                                <img src={currentPost.cover_image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Categories</label>
                                        <div className="max-h-40 overflow-y-auto p-2 bg-black/30 rounded-lg border border-white/5 space-y-1">
                                            {categories.map(cat => (
                                                <label key={cat.id} className="flex items-center gap-2 p-1 hover:bg-white/5 rounded cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(cat.id)}
                                                        onChange={() => toggleCategory(cat.id)}
                                                        className="rounded border-gray-600 bg-gray-700 text-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-300">{cat.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid gap-4"
                    >
                        {filteredPosts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
                                <p className="text-gray-400 max-w-sm mx-auto mb-6">
                                    We couldn't find any posts matching "{searchTerm}". Try adjusting your search or create a new one.
                                </p>
                                <Button onClick={() => { setSearchTerm(''); }} variant="outline">
                                    Clear Search
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredPosts.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-sm hover:shadow-xl"
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-full sm:w-32 h-20 bg-black/30 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 text-gray-700 flex items-center justify-center">
                                            {post.cover_image ? (
                                                <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs">No Image</span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow min-w-0 space-y-1">
                                            <h4 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                                                {post.title}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5 font-mono">
                                                    /{post.slug}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    {post.author?.avatar_url ? (
                                                        <img src={post.author.avatar_url} className="w-4 h-4 rounded-full" alt="" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full bg-gray-700" />
                                                    )}
                                                    {post.author?.name || 'Unknown'}
                                                </span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                <span>
                                                    {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status & Stats */}
                                        <div className="flex items-center gap-6 sm:ml-auto">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'}`} />
                                                <span className={`text-xs font-semibold uppercase tracking-wider ${post.published ? 'text-green-400' : 'text-yellow-400'}`}>
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1.5 text-gray-400" title="Views">
                                                <Eye className="w-4 h-4" />
                                                <span className="text-sm font-mono font-medium">{post.view_count || 0}</span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1 pl-4 border-l border-white/10 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10" onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" onClick={() => {
                                                    setCurrentPost(post);
                                                    setSelectedCategories(post.categories?.map(c => c.id) || []);
                                                    setIsEditing(true);
                                                }}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={() => handleDelete(post.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
