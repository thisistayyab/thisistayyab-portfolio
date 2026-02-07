/**
 * Utility to optimize images using a free global CDN (wsrv.nl).
 * Automatically converts images to WebP and handles resizing/compression.
 */

interface ImageOptions {
    width?: number;
    height?: number;
    quality?: number;
}

export const getOptimizedImageUrl = (url: string | undefined | null, options: ImageOptions = {}): string => {
    if (!url) return '/assets/placeholder.jpg'; // Return a default placeholder if no URL

    // If it's a local asset (starts with /) or a data URL, return as is
    if (url.startsWith('/') || url.startsWith('data:')) {
        return url;
    }

    try {
        const { width, height, quality = 80 } = options;
        const encodedUrl = encodeURIComponent(url);

        // Base params: output=webp, default quality
        let params = `?url=${encodedUrl}&output=webp&q=${quality}`;

        if (width) params += `&w=${width}`;
        if (height) params += `&h=${height}`;

        return `https://wsrv.nl/${params}`;
    } catch (e) {
        console.error("Error optimizing image URL:", e);
        return url;
    }
};

/**
 * Optimizes all images within an HTML string (for blog content)
 */
export const optimizeHtmlImages = (htmlContent: string): string => {
    if (!htmlContent) return '';

    // Regex to find img tags and their src attributes
    return htmlContent.replace(/<img[^>]+src="([^">]+)"[^>]*>/g, (match, src) => {
        // If it's already optimized or local, leave it
        if (src.includes('wsrv.nl') || src.startsWith('/') || src.startsWith('data:')) {
            return match;
        }

        const optimizedSrc = getOptimizedImageUrl(src);
        return match.replace(src, optimizedSrc);
    });
};
