import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteMetaTags {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
}

const routeMetaTags: Record<string, RouteMetaTags> = {
  '/': {
    title: 'Tayyab - Full Stack Developer | React & Node.js Expert',
    description: 'Hire Tayyab - Expert Full Stack Developer specializing in React, Node.js, Express, MongoDB. 3+ years experience, 1150+ LeetCode problems solved.',
    keywords: 'Tayyab, Full Stack Developer, React developer, Node.js developer, Express developer, MongoDB developer, JavaScript developer, TypeScript developer, MERN stack developer, web development services, portfolio, React portfolio, Node.js portfolio, full stack web development',
  },
  '/about': {
    title: 'About Tayyab - Full Stack Developer | Professional Background',
    description: 'Learn about Tayyab - A dedicated full-stack web developer with 3+ years of experience, 1150+ LeetCode problems solved, and expertise in React, Node.js, Express, and MongoDB.',
    keywords: 'About Tayyab, Full Stack Developer background, React developer experience, Node.js developer profile, web developer portfolio, computer engineering student',
  },
  '/projects': {
    title: 'Projects - Web Development Portfolio | Tayyab',
    description: 'View Tayyab\'s portfolio of full-stack web development projects built with React, Node.js, Express.js, MongoDB, and modern web technologies. Including MenuOrderAI, Taynio Chat, Taylance CRM, and more.',
    keywords: 'Web development projects, React projects, Node.js projects, full stack projects, portfolio projects, MERN stack projects, web applications',
  },
  '/experience': {
    title: 'Experience - Professional Background | Tayyab',
    description: 'Explore Tayyab\'s professional work experience and educational background as a full-stack web developer. 3+ years of experience building scalable web applications.',
    keywords: 'Full stack developer experience, web developer work history, React developer experience, professional background, software engineer experience',
  },
  '/testimonials': {
    title: 'Testimonials - Client Reviews | Tayyab',
    description: 'Read client testimonials and reviews from satisfied customers who have worked with Tayyab on web development projects. See what clients say about working with this full-stack developer.',
    keywords: 'Developer testimonials, client reviews, web developer reviews, freelance developer testimonials, React developer reviews',
  },
  '/services': {
    title: 'Services - Web Development Services | Tayyab',
    description: 'Browse professional web development services including full-stack development, React, Node.js, MongoDB, WordPress development, SEO optimization, and AI integration services.',
    keywords: 'Web development services, React development services, Node.js development services, full stack development services, WordPress development, freelance web developer',
  },
  '/profiles': {
    title: 'Profiles - Professional Platforms | Tayyab',
    description: 'Explore Tayyab\'s professional profiles on GitHub, LinkedIn, Upwork, Fiverr, LeetCode, Credly, and other platforms. Connect on your preferred platform.',
    keywords: 'GitHub profile, LinkedIn profile, Upwork profile, Fiverr profile, LeetCode profile, developer profiles',
  },
  '/contact': {
    title: 'Contact - Get In Touch | Tayyab',
    description: 'Get in touch with Tayyab for web development projects, collaborations, and opportunities. Available for freelance work. Specializing in React, Node.js, Express, MongoDB, and MERN stack development.',
    keywords: 'Contact web developer, hire full stack developer, freelance developer contact, React developer hire, web development services contact',
  },
};

const baseUrl = 'https://thisistayyab.dev';

export const SEOHead: React.FC = () => {
  const location = useLocation();
  const meta = routeMetaTags[location.pathname] || routeMetaTags['/'];

  useEffect(() => {
    // Update title
    document.title = meta.title;

    // Update or create meta description
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Update meta description
    updateMetaTag('description', meta.description);
    
    // Update meta title
    updateMetaTag('title', meta.title);

    // Update keywords if provided
    if (meta.keywords) {
      updateMetaTag('keywords', meta.keywords);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', meta.ogTitle || meta.title, 'property');
    updateMetaTag('og:description', meta.ogDescription || meta.description, 'property');
    updateMetaTag('og:url', `${baseUrl}${location.pathname}`, 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:title', meta.ogTitle || meta.title);
    updateMetaTag('twitter:description', meta.ogDescription || meta.description);
    updateMetaTag('twitter:url', `${baseUrl}${location.pathname}`);

    // Update canonical URL (already handled in Appbar.tsx, but ensure it's set)
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${baseUrl}${location.pathname}`);

  }, [location.pathname, meta.title, meta.description]);

  return null;
};
