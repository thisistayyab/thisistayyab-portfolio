import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteCompression from "vite-plugin-compression"
import { visualizer } from "rollup-plugin-visualizer"
import { imagetools } from "vite-imagetools"
import viteImagemin from "vite-plugin-imagemin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Ensure React 19 compatibility
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
    // Image optimization with imagetools - Auto-convert ALL imported images to WebP
    imagetools({
      // Automatically convert PNG, JPG, JPEG to WebP for all imports
      defaultDirectives: (url) => {
        const ext = url.pathname.split('.').pop()?.toLowerCase();
        if (ext && ['png', 'jpg', 'jpeg'].includes(ext)) {
          return new URLSearchParams({
            format: 'webp',
            quality: '85',
          });
        }
        return new URLSearchParams();
      },
      // Force WebP conversion for all image imports
      extendDefaultDirectives: (url) => {
        const ext = url.pathname.split('.').pop()?.toLowerCase();
        if (ext && ['png', 'jpg', 'jpeg'].includes(ext)) {
          return new URLSearchParams({
            format: 'webp',
            quality: '85',
          });
        }
        return new URLSearchParams();
      },
    }),
    // Automatic image optimization during build
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      webp: {
        quality: 80,
      },
    }),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression (better than gzip, ~20% better compression)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Bundle analyzer (only in analyze mode: npm run build:analyze)
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure proper module resolution for React
    dedupe: ['react', 'react-dom'],
  },
  build: {
    // Production optimizations
    target: 'esnext',
    minify: 'esbuild', // esbuild is faster than terser, but terser can be better for size
    cssMinify: true,
    sourcemap: false, // Disable sourcemaps in production for smaller builds
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            // Normalize path separators for cross-platform compatibility
            const normalizedId = id.replace(/\\/g, '/');
            
            // CRITICAL: React and react-dom MUST be in the same chunk
            // Match exact React core packages only (not react-icons, react-router, etc.)
            const isReactCore = 
              (normalizedId.includes('node_modules/react/') || normalizedId.includes('node_modules\\react\\')) &&
              !normalizedId.includes('react-icons') &&
              !normalizedId.includes('react-router');
            
            const isReactDOM = 
              normalizedId.includes('node_modules/react-dom/') || 
              normalizedId.includes('node_modules\\react-dom\\');
            
            const isScheduler = 
              normalizedId.includes('node_modules/scheduler/') || 
              normalizedId.includes('node_modules\\scheduler\\');
            
            if (isReactCore || isReactDOM || isScheduler) {
              return 'react-vendor';
            }
            
            if (normalizedId.includes('framer-motion')) {
              return 'framer-vendor';
            }
            if (normalizedId.includes('lucide-react')) {
              return 'lucide-vendor';
            }
            if (normalizedId.includes('react-icons')) {
              return 'icons-vendor';
            }
            if (normalizedId.includes('recharts')) {
              return 'recharts-vendor';
            }
            if (normalizedId.includes('react-simple-maps')) {
              return 'maps-vendor';
            }
            if (normalizedId.includes('world-countries') || normalizedId.includes('cities.json')) {
              return 'data-vendor';
            }
            if (normalizedId.includes('react-router')) {
              return 'router-vendor';
            }
            if (normalizedId.includes('supabase')) {
              return 'supabase-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
        },
        // Optimize chunk file names
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Chunk size warnings threshold (increased for large libraries)
    chunkSizeWarningLimit: 2000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'framer-motion',
      'lucide-react',
      'react-icons',
    ],
    exclude: [],
    // Force React to be pre-bundled together
    esbuildOptions: {
      target: 'esnext',
    },
  },
  // Performance optimizations
  server: {
    // Enable HTTP/2 server push
    http2: true,
  },
})