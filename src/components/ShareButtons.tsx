import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

// Custom Button component that mimics SocialIcon styling exactly
const ShareIconButton = ({
    icon: Icon,
    onClick,
    href,
    color,
    label,
    className
}: {
    icon: any,
    onClick?: () => void,
    href?: string,
    color: string,
    label: string,
    className?: string
}) => {
    const size = 48;
    const iconSize = 24;

    const Component = href ? 'a' : 'button';
    const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

    return (
        <Component
            {...props}
            aria-label={label}
            title={label}
            className={cn(
                "social-icon flex items-center justify-center rounded-[8px] bg-white/5 backdrop-blur-[10px] border border-white/10 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden no-underline shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-[1] hover:-translate-y-[5px] hover:scale-110 hover:border-[var(--icon-hover-color)]/40 hover:bg-white/5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--icon-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-offset-[3px]",
                className
            )}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                '--icon-color': color,
                '--icon-hover-color': color,
            } as React.CSSProperties}
        >
            {/* Top gradient border */}
            <span
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--icon-hover-color)] to-white rounded-t-lg scale-x-0 origin-left transition-transform duration-[400ms] ease-in-out group-hover:scale-x-100 z-[2]"
                aria-hidden="true"
            />

            {/* Radial glow background */}
            <span
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,var(--icon-hover-color)_0%,transparent_70%)] opacity-0 transition-opacity duration-[400ms] ease-in-out pointer-events-none z-0 group-hover:opacity-20"
                aria-hidden="true"
            />

            {/* Icon wrapper */}
            <span
                className="relative z-[1] transition-transform duration-300 ease-in-out"
                style={{ color: color }}
                aria-hidden="true"
            >
                <Icon size={iconSize} />
            </span>
        </Component>
    );
};

export function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const url = `https://thisistayyab.dev/blog/${slug}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: '#1DA1F2',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: '#0A66C2',
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: '#1877F2',
        },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setIsOpen(false);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this article: ${title}`,
                    url: url
                });
                setIsOpen(false); // Close custom menu if open
            } catch (error) {
                console.log('Error sharing:', error);
                // If user cancels or error, we could open custom menu or just do nothing.
                // Usually if user cancels native share, we don't want to popup the custom one immediately.
                // But if navigator.share fails for some reason other than cancel, fallback might be nice.
                // For now, let's only open custom if navigator.share is NOT supported.
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="relative flex items-center z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.8 }}
                        className="flex gap-3 mr-3"
                    >
                        {shareLinks.map((link) => (
                            <motion.div key={link.name} whileHover={{ y: -5 }}>
                                <ShareIconButton
                                    icon={link.icon}
                                    href={link.url}
                                    color={link.color}
                                    label={`Share on ${link.name}`}
                                />
                            </motion.div>
                        ))}
                        <motion.div whileHover={{ y: -5 }}>
                            <ShareIconButton
                                icon={Link2}
                                onClick={copyToClipboard}
                                color="#E2E8F0"
                                label="Copy Link"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div whileTap={{ scale: 0.9 }}>
                <ShareIconButton
                    icon={isOpen ? X : Share2}
                    onClick={handleShare}
                    color="#3B82F6"
                    label={isOpen ? "Close share menu" : "Share article"}
                />
            </motion.div>
        </div>
    );
}
