import { ComponentType } from 'react';
import { RiCodeSSlashLine, RiSmartphoneLine, RiDatabaseLine, RiCloudLine, RiSearchLine, RiShieldCheckLine, RiSpeedUpLine, RiCustomerServiceLine } from 'react-icons/ri';
import { SiWordpress } from 'react-icons/si';

export interface Service {
  id: number;
  title: string;
  Icon: ComponentType<{ size?: number }>;
  iconSize: number;
  color: string;
  description: string;
  features: string[];
  keywords: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    Icon: RiCodeSSlashLine,
    iconSize: 32,
    color: '#3b82f6',
    description: 'Comprehensive full-stack web development services using React, Node.js, Express.js, and MongoDB. Build scalable, high-performance web applications with modern MERN stack architecture. Expert in creating responsive frontend interfaces and robust backend APIs.',
    features: [
      'React & Next.js Development',
      'Node.js & Express.js Backend',
      'MongoDB Database Design',
      'RESTful API Development',
      'Real-time Applications',
      'Authentication & Security'
    ],
    keywords: [
      'Full Stack Developer',
      'MERN Stack Development',
      'React Developer',
      'Node.js Developer',
      'Express.js Development',
      'MongoDB Developer',
      'Web Application Development',
      'Full Stack Web Developer',
      'JavaScript Developer',
      'TypeScript Developer',
      'RESTful API Development',
      'Backend Development',
      'Frontend Development'
    ]
  },
  {
    id: 2,
    title: 'Responsive Web Design',
    Icon: RiSmartphoneLine,
    iconSize: 32,
    color: '#8b5cf6',
    description: 'Modern, mobile-first responsive web design that works flawlessly across all devices. Create beautiful, user-friendly interfaces with Tailwind CSS, Material-UI, and custom CSS. Focus on accessibility, performance, and user experience.',
    features: [
      'Mobile-First Design',
      'Tailwind CSS Styling',
      'Material-UI Components',
      'Cross-Browser Compatibility',
      'Accessibility (WCAG)',
      'Performance Optimization'
    ],
    keywords: [
      'Web Design',
      'Responsive Design',
      'UI/UX Design',
      'Frontend Design',
      'Mobile Responsive',
      'Tailwind CSS',
      'Material-UI',
      'User Interface Design',
      'User Experience Design',
      'Accessible Web Design',
      'Cross-Platform Design'
    ]
  },
  {
    id: 3,
    title: 'Database Design & Management',
    Icon: RiDatabaseLine,
    iconSize: 32,
    color: '#10b981',
    description: 'Expert database design and management services using MongoDB, MySQL, and PostgreSQL. Design efficient database schemas, optimize queries, and implement data security best practices. Ensure data integrity and scalability.',
    features: [
      'MongoDB Database Design',
      'SQL Database Optimization',
      'Database Schema Design',
      'Data Migration',
      'Query Optimization',
      'Data Security & Backup'
    ],
    keywords: [
      'Database Development',
      'MongoDB Developer',
      'Database Design',
      'Database Management',
      'NoSQL Database',
      'SQL Database',
      'Database Optimization',
      'Data Modeling',
      'Database Architecture'
    ]
  },
  {
    id: 4,
    title: 'Cloud Deployment & DevOps',
    Icon: RiCloudLine,
    iconSize: 32,
    color: '#06b6d4',
    description: 'Professional cloud deployment and DevOps services. Deploy applications to Vercel, Netlify, AWS, and other cloud platforms. Set up CI/CD pipelines, configure environments, and ensure reliable hosting solutions.',
    features: [
      'Vercel & Netlify Deployment',
      'AWS Cloud Services',
      'CI/CD Pipeline Setup',
      'Environment Configuration',
      'Domain & SSL Setup',
      'Performance Monitoring'
    ],
    keywords: [
      'Cloud Deployment',
      'DevOps Services',
      'Vercel Deployment',
      'Netlify Deployment',
      'AWS Services',
      'CI/CD Pipeline',
      'Cloud Hosting',
      'Server Deployment',
      'Infrastructure Setup'
    ]
  },
  {
    id: 6,
    title: 'Security & Authentication',
    Icon: RiShieldCheckLine,
    iconSize: 32,
    color: '#ef4444',
    description: 'Robust security implementation and authentication systems. Implement JWT authentication, OAuth integration, data encryption, and security best practices. Protect applications from vulnerabilities and ensure data privacy.',
    features: [
      'JWT Authentication',
      'OAuth Integration',
      'Data Encryption',
      'Security Audits',
      'Vulnerability Testing',
      'Privacy Compliance'
    ],
    keywords: [
      'Web Security',
      'Authentication Development',
      'JWT Authentication',
      'OAuth Integration',
      'Security Implementation',
      'Data Security',
      'Application Security',
      'Cybersecurity Services'
    ]
  },
  {
    id: 7,
    title: 'Performance Optimization',
    Icon: RiSpeedUpLine,
    iconSize: 32,
    color: '#ec4899',
    description: 'Advanced performance optimization services to enhance website speed and user experience. Implement code splitting, lazy loading, caching strategies, and optimize images. Achieve faster load times and better Core Web Vitals scores.',
    features: [
      'Code Splitting',
      'Lazy Loading',
      'Image Optimization',
      'Caching Strategies',
      'Bundle Optimization',
      'Core Web Vitals'
    ],
    keywords: [
      'Performance Optimization',
      'Website Speed Optimization',
      'Page Speed Optimization',
      'Performance Tuning',
      'Web Performance',
      'Load Time Optimization',
      'Core Web Vitals',
      'Performance Audit'
    ]
  },
  {
    id: 8,
    title: 'API Development & Integration',
    Icon: RiCustomerServiceLine,
    iconSize: 32,
    color: '#14b8a6',
    description: 'Professional RESTful API development and third-party API integration services. Build scalable APIs with Express.js, implement API documentation, handle rate limiting, and integrate payment gateways, social media APIs, and more.',
    features: [
      'RESTful API Development',
      'API Documentation',
      'Third-Party Integration',
      'Payment Gateway Integration',
      'Rate Limiting & Security',
      'API Testing & Debugging'
    ],
    keywords: [
      'API Development',
      'RESTful API',
      'API Integration',
      'Express.js API',
      'API Design',
      'Third-Party APIs',
      'Payment Integration',
      'API Documentation',
      'Web API Development'
    ]
  },
  {
    id: 9,
    title: 'WordPress Development & Services',
    Icon: SiWordpress,
    iconSize: 32,
    color: '#21759b',
    description: 'Expert WordPress development and customization services. Build custom WordPress themes, plugins, and websites with responsive design, SEO optimization, and performance tuning. Specialize in converting designs to WordPress, e-commerce integration with WooCommerce, and creating content management systems.',
    features: [
      'Custom WordPress Themes',
      'WordPress Plugin Development',
      'WooCommerce Integration',
      'WordPress SEO Optimization',
      'Performance Optimization',
      'Content Management Setup'
    ],
    keywords: [
      'WordPress Developer',
      'WordPress Development',
      'WordPress Customization',
      'WordPress Theme Development',
      'WordPress Plugin Development',
      'WooCommerce Development',
      'WordPress SEO',
      'WordPress Website Design',
      'WordPress Maintenance',
      'WordPress Migration',
      'WordPress Optimization',
      'Custom WordPress Solutions',
      'WordPress CMS Development'
    ]
  }
];
