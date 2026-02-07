import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Author } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthorsManagement() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState<Partial<Author>>({});

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('authors')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching authors:', error);
        else setAuthors(data || []);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!currentAuthor.name) return;

        if (currentAuthor.id) {
            // Update
            const { error } = await supabase
                .from('authors')
                .update({
                    name: currentAuthor.name,
                    avatar_url: currentAuthor.avatar_url,
                    bio: currentAuthor.bio,
                    // social_links: currentAuthor.social_links // TODO: Add UI for social links
                })
                .eq('id', currentAuthor.id);

            if (error) console.error('Error updating author:', error);
        } else {
            // Create
            const { error } = await supabase
                .from('authors')
                .insert([{
                    name: currentAuthor.name,
                    avatar_url: currentAuthor.avatar_url,
                    bio: currentAuthor.bio,
                }]);

            if (error) console.error('Error creating author:', error);
        }

        setIsEditing(false);
        setCurrentAuthor({});
        fetchAuthors();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure? This might break posts linked to this author.')) return;

        const { error } = await supabase.from('authors').delete().eq('id', id);
        if (error) console.error('Error deleting author:', error);
        else fetchAuthors();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Authors</h2>
                <Button onClick={() => { setCurrentAuthor({}); setIsEditing(true); }}>
                    <Plus className="w-4 h-4 mr-2" /> Add Author
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
                            {currentAuthor.id ? 'Edit Author' : 'New Author'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Name</label>
                                <Input
                                    value={currentAuthor.name || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}
                                    placeholder="Author Name"
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Avatar URL</label>
                                <Input
                                    value={currentAuthor.avatar_url || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentAuthor({ ...currentAuthor, avatar_url: e.target.value })}
                                    placeholder="https://..."
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <label className="text-sm text-gray-400">Bio</label>
                                <Textarea
                                    value={currentAuthor.bio || ''}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentAuthor({ ...currentAuthor, bio: e.target.value })}
                                    placeholder="Short bio..."
                                    className="bg-black/50 border-white/10 text-white"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" /> Save Author
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading authors...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {authors.map(author => (
                        <div key={author.id} className="bg-zinc-900/50 border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:border-white/10 transition-colors group">
                            <img
                                src={author.avatar_url || '/assets/profile.jpg'}
                                alt={author.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-grow min-w-0">
                                <h4 className="text-white font-medium truncate">{author.name}</h4>
                                <p className="text-xs text-gray-500 truncate">{author.bio || 'No bio'}</p>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" onClick={() => { setCurrentAuthor(author); setIsEditing(true); }}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={() => handleDelete(author.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {authors.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500 bg-white/5 rounded-lg border border-dashed border-white/10">
                            No authors found. Create one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
