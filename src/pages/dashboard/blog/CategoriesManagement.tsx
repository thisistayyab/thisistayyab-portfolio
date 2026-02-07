import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, X, Save, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CategoriesManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({});

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) console.error('Error fetching categories:', error);
        else setCategories(data || []);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!currentCategory.name || !currentCategory.slug) return;

        if (currentCategory.id) {
            // Update
            const { error } = await supabase
                .from('categories')
                .update({
                    name: currentCategory.name,
                    slug: currentCategory.slug,
                })
                .eq('id', currentCategory.id);

            if (error) console.error('Error updating category:', error);
        } else {
            // Create
            const { error } = await supabase
                .from('categories')
                .insert([{
                    name: currentCategory.name,
                    slug: currentCategory.slug,
                }]);

            if (error) console.error('Error creating category:', error);
        }

        setIsEditing(false);
        setCurrentCategory({});
        fetchCategories();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure? This will remove this category from all posts.')) return;

        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) console.error('Error deleting category:', error);
        else fetchCategories();
    };

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setCurrentCategory(prev => ({ ...prev, name, slug: prev.slug || slug }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Categories</h2>
                <Button onClick={() => { setCurrentCategory({}); setIsEditing(true); }}>
                    <Plus className="w-4 h-4 mr-2" /> Add Category
                </Button>
            </div>

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-zinc-900 border border-white/10 p-6 rounded-lg space-y-4 mb-6"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">
                            {currentCategory.id ? 'Edit Category' : 'New Category'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Name</label>
                                <Input
                                    value={currentCategory.name || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
                                    placeholder="Category Name"
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Slug</label>
                                <Input
                                    value={currentCategory.slug || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                                    placeholder="category-slug"
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" /> Save Category
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading categories...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map(category => (
                        <div key={category.id} className="bg-zinc-900/50 border border-white/5 p-4 rounded-lg flex items-center justify-between hover:border-white/10 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">{category.name}</h4>
                                    <p className="text-xs text-gray-500 font-mono">{category.slug}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300" onClick={() => { setCurrentCategory(category); setIsEditing(true); }}>
                                    <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300" onClick={() => handleDelete(category.id)}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500 bg-white/5 rounded-lg border border-dashed border-white/10">
                            No categories found. Create one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
