import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteMetaTags {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  image?: string;
  type?: string;
  publishedTime?: string;
  author?: string;
}

const BLOG_POST_PATH = /^\/blog\/[^/]+$/;

const notFoundMeta: RouteMetaTags = {
  title: '404 - Page Not Found | Tayyab',
  description:
    'The page you requested could not be found. Return to the portfolio home or browse articles on the blog.',
  keywords: '404, page not found, Tayyab portfolio',
};

const routeMetaTags: Record<string, RouteMetaTags> = {
  '/': {
    title: 'Tayyab - Full Stack Developer | React, Next.js & Node.js Expert',
    description:
      'Hire Tayyab — full stack developer building fast, scalable web apps with React, Next.js, Node.js, and PostgreSQL. 3+ years experience, 1,150+ LeetCode problems, 15+ projects completed.',
    keywords:
      'Tayyab, Full Stack Developer, React developer, Next.js developer, Node.js developer, PostgreSQL developer, REST API developer, freelance web developer, full stack for hire, web application development, SaaS developer, portfolio',
  },
  '/about': {
    title: 'About Tayyab | Full Stack Developer — Background & Achievements',
    description:
      'Meet Tayyab, a full stack web developer with 3+ years of experience, 15+ projects shipped, and 1,150+ LeetCode problems solved. Expert in React, Next.js, Node.js, and PostgreSQL.',
    keywords:
      'About Tayyab, full stack developer biography, React developer background, Node.js developer profile, web developer achievements, hire full stack developer',
  },
  '/projects': {
    title: 'Projects - Web Development Portfolio | Tayyab',
    description:
      "View Tayyab's portfolio of full-stack web development projects built with React, Node.js, Express.js, MongoDB, and modern web technologies. Including MenuOrderAI, Taynio Chat, Taylance CRM, and more.",
    keywords:
      'Web development projects, React projects, Node.js projects, full stack projects, portfolio projects, MERN stack projects, web applications',
  },
  '/experience': {
    title: 'Experience - Professional Background | Tayyab',
    description:
      "Explore Tayyab's professional work experience and educational background as a full-stack web developer. 3+ years of experience building scalable web applications.",
    keywords:
      'Full stack developer experience, web developer work history, React developer experience, professional background, software engineer experience',
  },
  '/testimonials': {
    title: 'Testimonials - Client Reviews | Tayyab',
    description:
      'Read client testimonials and reviews from satisfied customers who have worked with Tayyab on web development projects. See what clients say about working with this full-stack developer.',
    keywords:
      'Developer testimonials, client reviews, web developer reviews, freelance developer testimonials, React developer reviews',
  },
  '/services': {
    title: 'Services - Web Development Services | Tayyab',
    description:
      'Browse professional web development services including full-stack development, React, Node.js, MongoDB, WordPress development, SEO optimization, and AI integration services.',
    keywords:
      'Web development services, React development services, Node.js development services, full stack development services, WordPress development, freelance web developer',
  },
  '/insights': {
    title: 'Insights - Articles & Tips | Tayyab',
    description:
      'Latest articles and tips on web development, React, Node.js, and performance — highlighted on the portfolio.',
    keywords: 'developer insights, web development articles, React tips, Node.js, portfolio blog section',
  },
  '/contact': {
    title: 'Contact - Get In Touch | Tayyab',
    description:
      'Get in touch with Tayyab for web development projects, collaborations, and opportunities. Available for freelance work. Specializing in React, Node.js, Express, MongoDB, and MERN stack development.',
    keywords:
      'Contact web developer, hire full stack developer, freelance developer contact, React developer hire, web development services contact',
  },
  '/blog': {
    title: 'Blog - Insights & Articles | Tayyab',
    description:
      'Read articles and insights on web development, React, Node.js, performance optimization, and the future of tech. Written by Tayyab, full-stack developer.',
    keywords: 'web development blog, React blog, Node.js articles, developer insights, tech blog, full stack developer blog',
  },
  '/privacy': {
    title: "Privacy Policy | Tayyab's Portfolio",
    description: 'Privacy policy for thisistayyab.dev. How we collect, use, and protect your information.',
    keywords: 'privacy policy, data protection',
  },
  '/terms': {
    title: "Terms of Service | Tayyab's Portfolio",
    description: 'Terms of service for thisistayyab.dev. Usage terms and conditions.',
    keywords: 'terms of service, terms and conditions',
  },
  '/login': {
    title: 'Admin Login | Tayyab',
    description: 'Sign in to manage portfolio content.',
    keywords: 'login',
  },
  '/dashboard': {
    title: 'Dashboard | Tayyab',
    description: 'Portfolio content management.',
    keywords: 'dashboard',
  },
};

function resolveBaseMeta(pathname: string): RouteMetaTags {
  if (routeMetaTags[pathname]) {
    return routeMetaTags[pathname];
  }
  if (pathname.startsWith('/dashboard')) {
    return routeMetaTags['/dashboard'];
  }
  if (BLOG_POST_PATH.test(pathname)) {
    return routeMetaTags['/blog'];
  }
  return notFoundMeta;
}

function pathShouldNoIndex(pathname: string): boolean {
  if (pathname === '/login') return true;
  if (pathname.startsWith('/dashboard')) return true;
  if (routeMetaTags[pathname]) return false;
  if (BLOG_POST_PATH.test(pathname)) return false;
  return true;
}

export interface SEOHeadProps extends Partial<RouteMetaTags> {
  /** When true (e.g. missing blog post), tell crawlers not to index this URL. */
  noIndex?: boolean;
}

const baseUrl = 'https://thisistayyab.dev';

const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const SEOHead: React.FC<SEOHeadProps> = props => {
  const location = useLocation();
  const baseMeta = resolveBaseMeta(location.pathname);

  const meta: RouteMetaTags = {
    ...baseMeta,
    ...props,
    title: props.title ?? baseMeta.title,
    description: props.description ?? baseMeta.description,
  };

  const noIndex = Boolean(props.noIndex) || pathShouldNoIndex(location.pathname);

  useEffect(() => {
    document.title = meta.title;

    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('description', meta.description);
    updateMetaTag('title', meta.title);
    updateMetaTag('robots', noIndex ? 'noindex, follow' : INDEX_ROBOTS);

    if (meta.keywords) {
      updateMetaTag('keywords', meta.keywords);
    }

    updateMetaTag('og:title', meta.ogTitle || meta.title, 'property');
    updateMetaTag('og:description', meta.ogDescription || meta.description, 'property');
    updateMetaTag('og:url', `${baseUrl}${location.pathname}`, 'property');
    updateMetaTag('og:type', meta.type || 'website', 'property');

    if (meta.image) {
      updateMetaTag('og:image', meta.image.startsWith('http') ? meta.image : `${baseUrl}${meta.image}`, 'property');
      updateMetaTag('twitter:image', meta.image.startsWith('http') ? meta.image : `${baseUrl}${meta.image}`);
    }

    if (meta.publishedTime) {
      updateMetaTag('article:published_time', meta.publishedTime, 'property');
    }

    if (meta.author) {
      updateMetaTag('article:author', meta.author, 'property');
    }

    updateMetaTag('twitter:title', meta.ogTitle || meta.title);
    updateMetaTag('twitter:description', meta.ogDescription || meta.description);
    updateMetaTag('twitter:url', `${baseUrl}${location.pathname}`);

    const canonicalPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${canonicalPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [
    location.pathname,
    meta.title,
    meta.description,
    meta.keywords,
    meta.ogTitle,
    meta.ogDescription,
    meta.image,
    meta.type,
    meta.publishedTime,
    meta.author,
    noIndex,
  ]);

  return null;
};
