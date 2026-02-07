export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown content
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'mastering-react-performance-optimization-2024',
    title: 'Mastering React Performance Optimization in 2024',
    excerpt: 'Discover advanced techniques to speed up your React applications, from code splitting to efficient state management and rendering optimizations.',
    content: `
      <h2>Introduction</h2>
      <p>Performance is paramount in modern web development. Users expect instant interactions and smooth animations. In this comprehensive guide, we'll explore actionable strategies to supercharge your React applications.</p>
      
      <h3>1. Code Splitting with React.lazy and Suspense</h3>
      <p>Bundle bloat is a common performance killer. By using <code>React.lazy</code> and <code>Suspense</code>, you can load components only when they are needed.</p>
      <pre><code>const HeavyComponent = React.lazy(() => import('./HeavyComponent'));</code></pre>
      
      <h3>2. Memoization with useMemo and useCallback</h3>
      <p>Prevent unnecessary re-renders by memoizing complex calculations and functions. However, use these hooks purely for expensive operations to avoid overhead.</p>
      
      <h3>3. Virtualization for Long Lists</h3>
      <p>Rendering thousands of DOM elements is slow. Libraries like <code>react-window</code> or <code>react-virtuoso</code> render only the visible items, drastically improving performance.</p>
      
      <h3>4. State Management Best Practices</h3>
      <p>Keep state as local as possible. When using global state (Context, Redux, Zustand), ensure that updates don't trigger re-renders in unrelated components.</p>
      
      <h2>Conclusion</h2>
      <p>Optimizing React apps is an ongoing process. By implementing these techniques, you'll ensure a better user experience and improved SEO rankings.</p>
    `,
    date: 'February 2, 2026',
    readTime: '5 min read',
    author: {
      name: 'Tayyab',
      avatar: '/assets/profile.jpg', // Ensure this path is correct or generic
    },
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop',
    tags: ['React', 'Performance', 'Web Development'],
    seo: {
      title: 'Mastering React Performance Optimization | Tayyab',
      description: 'Learn advanced React performance optimization techniques for 2024. Code splitting, memoization, and more.',
      keywords: 'React performance, code splitting, useMemo, react-window, web optimization',
    }
  },
  {
    id: '2',
    slug: 'nextjs-vs-create-react-app-which-one-to-choose',
    title: 'Next.js vs Vite/Create React App: Making the Right Choice',
    excerpt: 'A detailed comparison of Next.js and client-side React frameworks. Understand server-side rendering, static site generation, and when to use which.',
    content: `
      <h2>The Landscape of React Frameworks</h2>
      <p>Choosing the right tool for your project is critical. While Create React App (CRA) was once the standard, Vite has taken over for client-side apps, and Next.js reigns supreme for full-stack React.</p>
      
      <h3>Next.js: The Full-Stack Powerhouse</h3>
      <p>Next.js offers Server-Side Rendering (SSR) and Static Site Generation (SSG) out of the box. This means better SEO and initial load performance.</p>
      <ul>
        <li><strong>Pros:</strong> specific SEO features, API routes, automatic routing.</li>
        <li><strong>Cons:</strong> steeper learning curve, hosting complexity.</li>
      </ul>
      
      <h3>Vite: The Lightning Fast Dev Tool</h3>
      <p>For Single Page Applications (SPAs) where SEO isn't the primary concern (like dashboards), Vite provides an incredible developer experience with instant HMR.</p>
      
      <h2>Verdict</h2>
      <p>Use <strong>Next.js</strong> for public-facing websites, blogs, and e-commerce. Use <strong>Vite</strong> for dashboards, internal tools, and learning projects.</p>
    `,
    date: 'January 28, 2026',
    readTime: '4 min read',
    author: {
      name: 'Tayyab',
      avatar: '/assets/profile.jpg',
    },
    coverImage: 'https://images.unsplash.com/photo-1618477247222-ac591305ec62?q=80&w=2070&auto=format&fit=crop',
    tags: ['Next.js', 'Vite', 'React', 'Comparison'],
    seo: {
      title: 'Next.js vs Vite: 2024 Framework Comparison | Tayyab',
      description: 'Deciding between Next.js and Vite? Read this guide to understand the pros, cons, and best use cases for each React framework.',
      keywords: 'Next.js vs Vite, React frameworks, SSR vs SPA, web development tools',
    }
  },
  {
    id: '3',
    slug: 'importance-of-seo-in-modern-web-development',
    title: 'Why SEO Strategy is Crucial for Web Developers',
    excerpt: 'SEO is not just for marketers. Learn why technical SEO, semantic HTML, and core web vitals are essential skills for modern developers.',
    content: `
      <h2>SEO is a Developer's Responsibility</h2>
      <p>Gone are the days when you could just build a site and hand it off to an SEO specialist. Modern search engines look deep into your code structure.</p>
      
      <h3>Core Web Vitals</h3>
      <p>Google explicitly ranks sites based on performance metrics: LCP (Loading), INP (Interactivity), and CLS (Visual Stability).</p>
      
      <h3>Semantic HTML</h3>
      <p>Using correct tags like <code>&lt;article&gt;</code>, <code>&lt;nav&gt;</code>, and <code>&lt;main&gt;</code> helps search engines understand your content hierarchy.</p>
      
      <h3>Accessibility Overlap</h3>
      <p>Great SEO often means great accessibility. Alt text for images, proper heading structures, and keyboard navigation helps both bots and humans.</p>
      
      <h2>Final Thoughts</h2>
      <p>Integrating SEO best practices into your development workflow ensures your beautiful code actually gets seen by the world.</p>
    `,
    date: 'January 15, 2026',
    readTime: '3 min read',
    author: {
      name: 'Tayyab',
      avatar: '/assets/profile.jpg',
    },
    coverImage: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=2070&auto=format&fit=crop',
    tags: ['SEO', 'Web Vitals', 'Development'],
    seo: {
      title: 'Technical SEO Guide for Developers | Tayyab',
      description: 'Understand the importance of technical SEO, Core Web Vitals, and semantic HTML in modern web development.',
      keywords: 'Technical SEO, Core Web Vitals, semantic HTML, web development SEO',
    }
  }
];
