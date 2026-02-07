import { useEffect } from 'react';
import { RiMailLine, RiMapPinLine } from 'react-icons/ri';
import { socialLinksHeader } from '../data/socialLinks';
import { navItems } from '../data/navigation';
import { SocialIcon } from './ui/social-icon';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

function Footer() {
  const baseUrl = 'https://thisistayyab.dev';
  const currentYear = new Date().getFullYear();

  // Inject structured data for SEO
  useEffect(() => {
    const existingScript = document.getElementById('footer-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WPFooter",
      "@id": `${baseUrl}/#footer`,
      "name": "Tayyab's Portfolio Footer",
      "description": "Footer section with navigation links, contact information, and social media profiles for Tayyab, a full-stack web developer.",
      "copyrightHolder": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tayyab",
        "url": baseUrl
      },
      "copyrightYear": currentYear,
      "url": baseUrl,
      "mainEntity": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tayyab",
        "jobTitle": "Full Stack Developer",
        "email": "thisistayyab@outlook.com",
        "url": baseUrl,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PK",
          "addressLocality": "Pakistan"
        },
        "sameAs": socialLinksHeader.map(link => link.href).filter(href => href.startsWith('http'))
      }
    };

    const script = document.createElement('script');
    script.id = 'footer-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById('footer-structured-data');
      if (cleanup) cleanup.remove();
    };
  }, [currentYear]);

  // Split navigation items into two columns for better layout
  const midPoint = Math.ceil(navItems.length / 2);
  const navCol1 = navItems.slice(0, midPoint);
  const navCol2 = navItems.slice(midPoint);

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-transparent to-black/30"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        aria-hidden="true"
      />

      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Tayyab's Portfolio
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Full-stack developer focused on building digital experiences that are fast, beautiful, and user-focused.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap mt-auto">
              {socialLinksHeader.map((link, i) => {
                const getPlatformName = (href: string): string => {
                  if (href.includes('github')) return 'GitHub';
                  if (href.includes('linkedin')) return 'LinkedIn';
                  if (href.includes('leetcode')) return 'LeetCode';
                  if (href.startsWith('mailto:')) return 'Email';
                  return '';
                };

                return (
                  <SocialIcon
                    key={i}
                    Icon={link.Icon}
                    size={44}
                    iconSize={link.size}
                    href={link.href}
                    ariaLabel={link.ariaLabel}
                    color={link.color}
                    platformName={getPlatformName(link.href)}
                    className="bg-white/5 border-white/5 hover:bg-white/10"
                  />
                );
              })}
            </div>
          </div>

          {/* Navigation Column (4 cols - split into 2 visual lists) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3">
                {navCol1.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {navCol2.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:thisistayyab@outlook.com"
                className="group bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all border border-white/5 hover:border-blue-500/30"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300">
                    <RiMailLine size={20} />
                  </div>
                  <span className="text-sm text-gray-400">Email Me</span>
                </div>
                <p className="text-white font-medium pl-[44px]">thisistayyab@outlook.com</p>
              </a>

              <div className="group bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <RiMapPinLine size={20} />
                  </div>
                  <span className="text-sm text-gray-400">Location</span>
                </div>
                <p className="text-white font-medium pl-[44px]">Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative border-t border-white/5 bg-black/40">
        <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Tayyab's Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
