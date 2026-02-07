import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostsManagement } from './PostsManagement';
import { AuthorsManagement } from './AuthorsManagement';
import { CategoriesManagement } from './CategoriesManagement';

type BlogTab = 'posts' | 'authors' | 'categories';

export function BlogManagement() {
    const [activeTab, setActiveTab] = useState<BlogTab>('posts');

    const tabs: { id: BlogTab; label: string }[] = [
        { id: 'posts', label: 'Posts' },
        { id: 'authors', label: 'Authors' },
        { id: 'categories', label: 'Categories' },
    ];

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Blog Management
                </h1>
                <p className="text-gray-400 text-lg">
                    Create, manage, and publish your content with style.
                </p>
            </div>

            {/* Premium Tab Navigation */}
            <div className="flex items-center p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative ${activeTab === tab.id ? 'text-white shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeBlogTab"
                                className="absolute inset-0 bg-blue-600 rounded-lg"
                                style={{ zIndex: -1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area with smooth transition */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px]"
            >
                {activeTab === 'posts' && <PostsManagement />}
                {activeTab === 'authors' && <AuthorsManagement />}
                {activeTab === 'categories' && <CategoriesManagement />}
            </motion.div>
        </div>
    );
}
