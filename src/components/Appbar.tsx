import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/favicon.png';
import { navItems } from '../data/navigation';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { trackLinkClick } from '../lib/analytics';

export default function AppAppBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('/');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = 'https://thisistayyab.dev';

  // Update canonical link based on current route
  useEffect(() => {
    const updateCanonical = () => {
      const canonicalUrl = `${baseUrl}${location.pathname}`;

      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    };

    updateCanonical();
  }, [location.pathname]);

  // Initialize active section from current route
  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  // Listen for programmatic scrolls (from ScrollToSection) and lock active section
  useEffect(() => {
    // Check if scroll was triggered by programmatic navigation (from scroll detection)
    const scrollTriggered = sessionStorage.getItem('scroll-navigation') === 'true';

    if (!scrollTriggered) {
      // This is a user-initiated navigation (click), immediately lock the active section
      setActiveSection(location.pathname);
      setIsProgrammaticScroll(true);

      // Wait until we're actually at the target section before re-enabling scroll detection
      const routeToSection: Record<string, string> = {
        '/': 'home',
        '/about': 'about',
        '/projects': 'project',
        '/experience': 'experience',
        '/testimonials': 'client',
        '/services': 'services',
        '/profiles': 'profiles',
        '/contact': 'contact',
      };

      const targetSectionId = routeToSection[location.pathname];

      if (targetSectionId) {
        // Check periodically until we reach the target section
        let attempts = 0;
        const maxAttempts = 40; // 4 seconds max (40 * 100ms)
        const intervalId = setInterval(() => {
          attempts++;
          const targetElement = document.getElementById(targetSectionId);

          if (targetElement) {
            const scrollPosition = window.scrollY + 200;
            const { offsetTop, offsetHeight } = targetElement;
            const threshold = offsetTop + 100;

            // Check if we're actually at the target section
            if (scrollPosition >= threshold && scrollPosition < offsetTop + offsetHeight) {
              // We've reached the target, re-enable scroll detection
              clearInterval(intervalId);
              setIsProgrammaticScroll(false);
              return;
            }
          }

          // Timeout after max attempts
          if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            setIsProgrammaticScroll(false);
          }
        }, 100);

        return () => clearInterval(intervalId);
      } else {
        // For home route, disable for shorter time
        setTimeout(() => {
          setIsProgrammaticScroll(false);
        }, 1000);
      }
    }
  }, [location.pathname]);

  // Active section detection based on scroll position and route
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Don't update during programmatic scrolling (user clicked a nav link)
      if (isProgrammaticScroll) {
        // Keep active section locked to current route
        if (activeSection !== location.pathname) {
          setActiveSection(location.pathname);
        }
        return;
      }

      if (isScrolling) {
        return;
      }

      // Process immediately - no throttling or delays
      // Re-fetch sections on each scroll to ensure elements are available
      const sections = navItems.map(item => ({
        id: item.sectionId,
        element: document.getElementById(item.sectionId),
        href: item.href,
      })).filter(s => s.element !== null);

      const scrollPosition = window.scrollY + 200; // Offset for navbar height
      const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = window.scrollY;
      
      let foundSection = false;
      let currentSection = '';

      // Find the section that contains the current scroll position
      // Check sections in order based on scroll direction for faster detection
      const sortedSections = [...sections].sort((a, b) => {
        if (!a.element || !b.element) return 0;
        return a.element.offsetTop - b.element.offsetTop;
      });

      // When scrolling down, check from top to bottom
      // When scrolling up, check from bottom to top
      const checkOrder = scrollDirection === 'down' 
        ? sortedSections 
        : [...sortedSections].reverse();

      for (const section of checkOrder) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          const sectionStart = offsetTop;
          const sectionEnd = offsetTop + offsetHeight;
          
          // Check if scroll position is within section bounds
          // Trigger at section start for instant updates
          const threshold = sectionStart;
          
          if (scrollPosition >= threshold && scrollPosition < sectionEnd) {
            currentSection = section.href;
            foundSection = true;
            break;
          }
        }
      }

      // Update state if section changed
      if (foundSection && currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        
        // Update URL using React Router navigate (without triggering scroll)
        if (location.pathname !== currentSection) {
          setIsScrolling(true);
          sessionStorage.setItem('scroll-navigation', 'true');
          navigate(currentSection, { replace: true });
          setIsScrolling(false);
        }
      }

      // Handle top of page (home section)
      if (!foundSection && window.scrollY < 100) {
        if (activeSection !== '/') {
          setActiveSection('/');
          if (location.pathname !== '/') {
            setIsScrolling(true);
            sessionStorage.setItem('scroll-navigation', 'true');
            navigate('/', { replace: true });
            setIsScrolling(false);
          }
        }
      }
    };

    // Listen to scroll events immediately
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial check - no delay
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname, navigate, isScrolling, isProgrammaticScroll, activeSection]);

  return (
    <div>
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
          <div className="flex items-center relative rounded-[8px] backdrop-blur-[20px] border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(59,130,246,0.1)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.2)] hover:border-white/20 py-3 px-3 sm:px-4 lg:px-5">
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            {/* Logo and Title */}
            <div className="flex items-center gap-1 flex-shrink-0" itemScope itemType="https://schema.org/Organization">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/"
                  aria-label="Go to home page - Tayyab's Portfolio"
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                  tabIndex={0}
                  onClick={(e) => {
                    // Remove focus after mouse click to prevent focus ring
                    (e.currentTarget as HTMLElement).blur();
                  }}
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
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link
                  to="/"
                  aria-label="Go to home page - Tayyab's Portfolio"
                  className="block"
                >
                  <div className="font-bold tracking-[1px] text-[17px] block bg-gradient-to-br from-white via-slate-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap" itemProp="name">
                    <span aria-hidden="true">ayyab's Portfolio</span>
                    <span className="sr-only">Tayyab's Portfolio - Full Stack Web Developer and AI/ML Enthusiast</span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Desktop Nav - Left aligned with margin - Show only on large screens (1024px+) */}
            <ul className="hidden lg:flex items-center gap-2 ml-6 p-2 list-none" role="menubar" aria-label="Main navigation menu">
              {navItems.map((item, index) => {
                const linkDescriptions: Record<string, string> = {
                  'Home': 'Return to the home page showcasing Tayyab\'s portfolio introduction and overview',
                  'About': 'Learn about Tayyab\'s background, skills, and experience as a Full Stack Developer',
                  'Projects': 'View Tayyab\'s portfolio of web development projects and applications',
                  'Testimonials': 'Read client testimonials and feedback about Tayyab\'s work',
                  'Experience': 'Explore Tayyab\'s professional experience and career journey',
                  'Services': 'Browse professional web development services including full-stack development, React, Node.js, MongoDB, SEO optimization, and more',
                  'Profiles': 'Explore Tayyab\'s professional profiles on GitHub, LinkedIn, Upwork, Fiverr, LeetCode, Credly, and other platforms',
                  'Contact': 'Get in touch with Tayyab for web development projects and opportunities'
                };
                return (
                  <li key={item.label} role="none" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      whileHover={{ y: -5 }}
                    >
                      <Link
                        to={item.href}
                        role="menuitem"
                        aria-label={linkDescriptions[item.label] || `Navigate to ${item.label} section`}
                        aria-description={linkDescriptions[item.label] || `Go to ${item.label} section of Tayyab's portfolio`}
                        title={`${linkDescriptions[item.label] || `Go to ${item.label} section`} - Tayyab's Portfolio`}
                        aria-current={activeSection === item.href ? 'page' : undefined}
                        className={`group relative text-white/90 no-underline px-4 py-3 bg-transparent rounded-[10px] font-medium text-[0.95rem] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/5 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:bg-white/5 ${activeSection === item.href
                            ? 'bg-white/10 text-white'
                            : ''
                          }`}
                        itemProp="url"
                        tabIndex={0}
                        onClick={(e) => {
                          // Remove focus after mouse click to prevent focus ring
                          (e.currentTarget as HTMLElement).blur();
                          // Immediately update active section and disable scroll detection
                          setActiveSection(item.href);
                          setIsProgrammaticScroll(true);
                          trackLinkClick(item.label, item.href, `nav-${item.label.toLowerCase()}`);
                        }}
                      >
                        <span itemProp="name">{item.label}</span>
                        <meta itemProp="position" content={String(index + 1)} />
                        <span
                          className={`nav-underline absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-sm ${activeSection === item.href
                              ? 'w-full'
                              : 'w-0 group-hover:w-full'
                            }`}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Nav - Show on mobile and tablet (up to 1023px) */}
            <div className="flex lg:hidden flex-shrink-0 ml-auto">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  aria-label="Open mobile navigation menu"
                  aria-expanded={open}
                  aria-controls="mobile-navigation-menu"
                  onClick={() => setOpen(true)}
                  className="text-white hover:bg-white/10 w-10 h-10 p-0 flex items-center justify-center min-h-0 [&_svg]:!size-7 [&_svg]:shrink-0"
                >
                  <Menu strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </motion.div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                  side="top"
                  id="mobile-navigation-menu"
                  aria-label="Mobile navigation menu"
                  aria-modal="true"
                  className="bg-[#0b0c10] h-screen p-2 top-[var(--template-frame-height,0px)] [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:w-10 [&>button]:h-10 [&>button]:top-4 [&>button]:right-4 [&>button>svg]:w-5 [&>button>svg]:h-5 [&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-0 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:p-0 [&>button]:focus-visible:outline-none [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-blue-500 [&>button]:focus-visible:ring-offset-2"
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
                              'Services': 'Browse professional web development services including full-stack development, React, Node.js, MongoDB, SEO optimization, and more',
                              'Profiles': 'Explore Tayyab\'s professional profiles on GitHub, LinkedIn, Upwork, Fiverr, LeetCode, Credly, and other platforms',
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
                                  <Link
                                    to={item.href}
                                    role="menuitem"
                                    aria-label={linkDescriptions[item.label] || `Navigate to ${item.label} section`}
                                    aria-description={linkDescriptions[item.label] || `Go to ${item.label} section of Tayyab's portfolio`}
                                    title={`${linkDescriptions[item.label] || `Go to ${item.label} section`} - Tayyab's Portfolio`}
                                    aria-current={activeSection === item.href ? 'page' : undefined}
                                    className={`block text-white py-3 px-4 hover:bg-white/5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:bg-white/5 ${activeSection === item.href
                                        ? 'bg-white/10 font-semibold'
                                        : ''
                                      }`}
                                    onClick={(e) => {
                                      // Remove focus after mouse click to prevent focus ring
                                      (e.currentTarget as HTMLElement).blur();
                                      // Immediately update active section and disable scroll detection
                                      setActiveSection(item.href);
                                      setIsProgrammaticScroll(true);
                                      trackLinkClick(item.label, item.href, `mobile-nav-${item.label.toLowerCase()}`);
                                      setOpen(false);
                                    }}
                                    tabIndex={0}
                                  >
                                    {item.label}
                                  </Link>
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
    </div>
  );
}
