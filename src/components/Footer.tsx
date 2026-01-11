import { useEffect } from 'react';
import { RiMailLine } from 'react-icons/ri';
import { socialLinksHeader } from '../data/socialLinks';
import { navItems } from '../data/navigation';
import { SocialIcon } from './ui/social-icon';
import { cn } from '@/lib/utils';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
              Tayyab's Portfolio
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Building digital experiences that are fast, beautiful, and user-focused. Let's connect and create something amazing together!
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinksHeader.map((link, i) => {
                // Helper to determine platform name from href
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
                    size={48}
                    iconSize={link.size}
                    href={link.href}
                    ariaLabel={link.ariaLabel}
                    color={link.color}
                    platformName={getPlatformName(link.href)}
                  />
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={cn(
                        "text-slate-400 text-sm transition-all duration-300",
                        "hover:text-white hover:translate-x-1",
                        "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:rounded",
                        "relative pl-5 group"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2",
                          "text-blue-500 opacity-0 -translate-x-2",
                          "transition-all duration-300",
                          "group-hover:opacity-100 group-hover:translate-x-0"
                        )}
                        aria-hidden="true"
                      >
                        →
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 relative inline-block">
              Services
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Website Design', href: '#about' },
                { label: 'Web Development', href: '#project' },
                { label: 'Full Stack Solutions', href: '#project' },
                { label: 'API Development', href: '#project' },
                { label: 'SEO Optimization', href: '#contact' },
              ].map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className={cn(
                      "text-slate-400 text-sm transition-all duration-300",
                      "hover:text-white hover:translate-x-1",
                      "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:rounded",
                      "relative pl-5 group"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2",
                        "text-blue-500 opacity-0 -translate-x-2",
                        "transition-all duration-300",
                        "group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                      aria-hidden="true"
                    >
                      →
                    </span>
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 relative inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:thisistayyab@outlook.com"
                  className={cn(
                    "text-slate-400 text-sm transition-all duration-300",
                    "hover:text-white hover:translate-x-1",
                    "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:rounded",
                    "flex items-center gap-2 group"
                  )}
                >
                  <RiMailLine size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>thisistayyab@outlook.com</span>
                </a>
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                </span>
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-[10px]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          aria-hidden="true"
        />
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <p className="text-center text-slate-400 text-sm">
            &copy; {currentYear} <span className="text-white font-medium">Tayyab's Portfolio</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
