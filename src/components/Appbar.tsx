import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import logo from '../assets/favicon.png';
import { navItems } from '../data/navigation';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

export default function AppAppBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('#home');
  const baseUrl = 'https://thisistayyab.dev';

  // Update canonical link based on current hash
  useEffect(() => {
    const updateCanonical = () => {
      const hash = window.location.hash || '#home';
      const canonicalUrl = `${baseUrl}${hash === '#home' ? '/' : hash}`;
      
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    };

    updateCanonical();
    window.addEventListener('hashchange', updateCanonical);
    return () => window.removeEventListener('hashchange', updateCanonical);
  }, []);

  // Active section detection based on scroll position
  useEffect(() => {
    const sections = navItems.map(item => {
      const id = item.href.replace('#', '');
      return { id, element: document.getElementById(id), href: item.href };
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      // Check each section to see if it's in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.href);
            // Update URL hash without triggering scroll
            if (window.location.hash !== section.href) {
              window.history.replaceState(null, '', section.href);
            }
            break;
          }
        }
      }

      // Handle top of page (home section)
      if (window.scrollY < 100) {
        setActiveSection('#home');
        if (window.location.hash !== '#home' && window.location.hash !== '') {
          window.history.replaceState(null, '', '#home');
        }
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <motion.div>
      <nav 
        className="fixed top-[calc(var(--template-frame-height,0px)+28px)] left-0 right-0 z-[1100] flex justify-center px-3"
        role="navigation"
        aria-label="Main navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        {/* Structured Data for Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "name": "Main Navigation",
              "itemListElement": navItems.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.label,
                "url": `${baseUrl}${item.href}`
              }))
            })
          }}
        />
        <div className="w-full max-w-[1200px]">
          <div className="flex items-center relative rounded-[8px] backdrop-blur-[20px] border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(59,130,246,0.1)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.2)] hover:border-white/20 py-3 px-5">
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            {/* Logo and Title */}
            <div className="flex items-center gap-1 flex-shrink-0" itemScope itemType="https://schema.org/Organization">
              <motion.a
                href="#home"
                aria-label="Go to home page - Tayyab's Portfolio"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded"
                tabIndex={0}
              >
                <img
                  src={logo}
                  alt="Tayyab - Full Stack Web Developer and AI/ML Enthusiast Logo"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                  loading="eager"
                  itemProp="logo"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                />
              </motion.a>
              <motion.a
                href="#home"
                aria-label="Go to home page - Tayyab's Portfolio"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="font-bold tracking-[1px] text-[17px] block bg-gradient-to-br from-white via-slate-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap" itemProp="name">
                  <span aria-hidden="true">ayyab's Portfolio</span>
                  <span className="sr-only">Tayyab's Portfolio - Full Stack Web Developer and AI/ML Enthusiast</span>
                </div>
              </motion.a>
            </div>

            {/* Desktop Nav - Left aligned with margin */}
            <ul className="hidden sm:flex md:flex items-center gap-2 ml-6 p-2 list-none" role="menubar" aria-label="Main navigation menu">
              {navItems.map((item, index) => {
                const linkDescriptions: Record<string, string> = {
                  'Home': 'Return to the home page showcasing Tayyab\'s portfolio introduction and overview',
                  'About': 'Learn about Tayyab\'s background, skills, and experience as a Full Stack Developer',
                  'Projects': 'View Tayyab\'s portfolio of web development projects and applications',
                  'Testimonials': 'Read client testimonials and feedback about Tayyab\'s work',
                  'Experience': 'Explore Tayyab\'s professional experience and career journey',
                  'Services': 'Discover the web development services offered by Tayyab',
                  'Contact': 'Get in touch with Tayyab for web development projects and opportunities'
                };
                return (
                  <li key={item.label} role="none" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <a
                        href={item.href}
                        role="menuitem"
                        aria-label={linkDescriptions[item.label] || `Navigate to ${item.label} section`}
                        aria-description={linkDescriptions[item.label] || `Go to ${item.label} section of Tayyab's portfolio`}
                        title={`${linkDescriptions[item.label] || `Go to ${item.label} section`} - Tayyab's Portfolio`}
                        aria-current={activeSection === item.href ? 'page' : undefined}
                        className={`group relative text-white/90 no-underline px-4 py-3 bg-transparent rounded-[10px] font-medium text-[0.95rem] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/5 hover:text-white hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent focus:bg-white/5 ${
                          activeSection === item.href 
                            ? 'bg-white/10 text-white' 
                            : ''
                        }`}
                        itemProp="url"
                        tabIndex={0}
                        rel="prefetch"
                      >
                        <span itemProp="name">{item.label}</span>
                        <meta itemProp="position" content={String(index + 1)} />
                        <span 
                          className={`nav-underline absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-sm ${
                            activeSection === item.href 
                              ? 'w-full' 
                              : 'w-0 group-hover:w-full'
                          }`} 
                          aria-hidden="true" 
                        />
                      </a>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Nav */}
            <div className="flex sm:hidden md:hidden flex-shrink-0 ml-auto">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  aria-label="Open mobile navigation menu"
                  aria-expanded={open}
                  aria-controls="mobile-navigation-menu"
                  onClick={() => setOpen(true)}
                  className="text-white hover:bg-white/10 w-10 h-10 p-0 flex items-center justify-center min-h-0 [&_svg]:!size-7 [&_svg]:shrink-0"
                >
                  <Menu strokeWidth={1.5} aria-hidden="true"/>
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </motion.div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                  side="top"
                  id="mobile-navigation-menu"
                  aria-label="Mobile navigation menu"
                  aria-modal="true"
                  className="bg-[#0b0c10] h-screen p-2 top-[var(--template-frame-height,0px)] [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:w-10 [&>button]:h-10 [&>button]:top-4 [&>button]:right-4 [&>button>svg]:w-5 [&>button>svg]:h-5 [&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-0 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:p-0 [&>button]:focus:outline-none [&>button]:focus:ring-2 [&>button]:focus:ring-blue-500 [&>button]:focus:ring-offset-2"
                >
                  <SheetHeader>
                    <SheetTitle className="sr-only">Tayyab's Portfolio - Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <AnimatePresence>
                    {open && (
                      <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        role="navigation"
                        aria-label="Mobile navigation menu"
                        aria-modal="true"
                      >
                        <ul className="list-none" role="menu" aria-label="Navigation links">
                          {navItems.map((item, index) => {
                            const linkDescriptions: Record<string, string> = {
                              'Home': 'Return to the home page showcasing Tayyab\'s portfolio introduction and overview',
                              'About': 'Learn about Tayyab\'s background, skills, and experience as a Full Stack Developer',
                              'Projects': 'View Tayyab\'s portfolio of web development projects and applications',
                              'Testimonials': 'Read client testimonials and feedback about Tayyab\'s work',
                              'Experience': 'Explore Tayyab\'s professional experience and career journey',
                              'Services': 'Discover the web development services offered by Tayyab',
                              'Contact': 'Get in touch with Tayyab for web development projects and opportunities'
                            };
                            return (
                              <li key={item.label} role="none">
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1, duration: 0.3 }}
                                  whileHover={{ x: 10 }}
                                >
                                  <a
                                    href={item.href}
                                    role="menuitem"
                                    aria-label={linkDescriptions[item.label] || `Navigate to ${item.label} section`}
                                    aria-description={linkDescriptions[item.label] || `Go to ${item.label} section of Tayyab's portfolio`}
                                    title={`${linkDescriptions[item.label] || `Go to ${item.label} section`} - Tayyab's Portfolio`}
                                    aria-current={activeSection === item.href ? 'page' : undefined}
                                    className={`block text-white py-3 px-4 hover:bg-white/5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent focus:bg-white/5 ${
                                      activeSection === item.href 
                                        ? 'bg-white/10 font-semibold' 
                                        : ''
                                    }`}
                                    onClick={() => setOpen(false)}
                                    tabIndex={0}
                                    rel="prefetch"
                                  >
                                    {item.label}
                                  </a>
                                </motion.div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="my-6 border-t border-gray-800" aria-hidden="true" />
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
