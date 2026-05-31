import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems, scrollSyncNavItems } from '../data/navigation';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

const linkDescriptions: Record<string, string> = {
  Home: "Return to the home page showcasing Tayyab's portfolio introduction and overview",
  About: "Learn about Tayyab's background, skills, and experience as a Full Stack Developer",
  Projects: "View Tayyab's portfolio of web development projects and applications",
  Testimonials: "Read client testimonials and feedback about Tayyab's work",
  Experience: "Explore Tayyab's professional experience and career journey",
  Services: 'Browse professional web development services including full-stack development, React, Node.js, MongoDB, SEO optimization, and more',
  Insights: 'Read articles and tips on web development, React, Node.js, and performance',
  Contact: 'Get in touch with Tayyab for web development projects and opportunities',
};

const navLinks = navItems.filter(item => item.href !== '/contact');
const contactItem = navItems.find(item => item.href === '/contact');

function NavOrb() {
  return (
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-blue-400/40 blur-[4px]" />
      <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-blue-200 via-purple-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.75)]" />
    </span>
  );
}

export default function AppAppBar() {
  const [open, setOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('/');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = 'https://thisistayyab.dev';

  // Canonical link is now handled by SEOHead component to avoid duplicates
  // Removed duplicate canonical tag setting

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
        '/experience': 'experience',
        '/testimonials': 'client',
        '/services': 'services',
        '/insights': 'blog',
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

      const isPortfolioRoute = ['/', '/experience', '/testimonials', '/services', '/insights', '/contact'].includes(
        location.pathname
      );

      // Process immediately - no throttling or delays
      // Re-fetch sections on each scroll to ensure elements are available
      const sections = scrollSyncNavItems.map(item => ({
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

      // When on the portfolio page, the "blog" section (Insights) must map to /insights, not /blog,
      // so scrolling to Insights doesn’t navigate to the full blog page and cause a reload.
      if (foundSection && currentSection === '/blog' && isPortfolioRoute) {
        currentSection = '/insights';
      }

      // Update state if section changed (portfolio shell only — same DOM sections as nav)
      if (isPortfolioRoute && foundSection && currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);

        // Update URL using React Router navigate (without triggering scroll)
        if (location.pathname !== currentSection) {
          setIsScrolling(true);
          sessionStorage.setItem('scroll-navigation', 'true');
          navigate(currentSection, { replace: true });
          setIsScrolling(false);
        }
      }

      // Handle top of page (home section): only sync URL to "/" on the single-page portfolio shell.
      // On 404 and other pages there are no section elements, so foundSection stays false and this must not run.
      const isStandalonePage =
        location.pathname.startsWith('/blog') ||
        location.pathname.startsWith('/dashboard') ||
        ['/login', '/privacy', '/terms'].includes(location.pathname);
      // Don't override when user explicitly clicked "View All Articles" to go to blog
      const directBlogNav = sessionStorage.getItem('direct-nav-to-blog') === 'true';
      if (directBlogNav) {
        sessionStorage.removeItem('direct-nav-to-blog');
      }

      if (!foundSection && window.scrollY < 100 && !isStandalonePage && !directBlogNav && isPortfolioRoute) {
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

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    (e.currentTarget as HTMLElement).blur();
    setActiveSection(href);
    setIsProgrammaticScroll(true);
  };

  const letsTalkDesktopClassName = [
    'nav-cta group hidden shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-300 lg:inline-flex lg:ml-6',
    'hover:brightness-110',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    activeSection === '/contact' ? 'brightness-110' : '',
  ].join(' ');

  const letsTalkMobileClassName = [
    'nav-cta group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-300',
    'hover:brightness-110',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    activeSection === '/contact' ? 'brightness-110' : '',
  ].join(' ');

  const navLinkClassName = (href: string) =>
    [
      'shrink-0 rounded-full px-2.5 py-1.5 text-xs font-medium text-white/90 no-underline transition-all duration-300 sm:px-3 sm:py-2 sm:text-sm lg:px-3.5 lg:py-2',
      'hover:bg-blue-500/10 hover:text-white',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
      activeSection === href ? 'bg-blue-500/15 text-white shadow-[inset_0_0_12px_rgba(59,130,246,0.12)]' : '',
    ].join(' ');

  return (
    <div>
      <nav
        className="fixed top-[calc(var(--template-frame-height,0px)+20px)] left-0 right-0 z-[1100] flex justify-center px-5 sm:px-6 lg:px-4 pointer-events-none"
        role="navigation"
        aria-label="Main navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SiteNavigationElement',
              name: 'Main Navigation',
              itemListElement: navItems.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                url: `${baseUrl}${item.href}`,
              })),
            }),
          }}
        />

        <div className="nav-capsule pointer-events-auto flex w-full max-w-[min(100%,1200px)] min-w-0 items-center rounded-full px-5 py-2.5 sm:px-4 lg:w-auto lg:justify-center lg:gap-1 lg:px-6 lg:py-2.5">
          {/* Mobile — brand title left, hamburger right */}
          <div className="flex w-full items-center justify-between gap-4 px-1 lg:hidden">
            <Link
              to="/"
              className="nav-mobile-brand min-w-0 flex-1 truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Go to home page - Tayyab's Portfolio"
              onClick={e => handleNavClick('/', e)}
            >
              Tayyab&apos;s Portfolio
            </Link>

            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                variant="ghost"
                aria-label="Open navigation menu"
                aria-expanded={open}
                aria-controls="mobile-navigation-menu"
                onClick={() => setOpen(true)}
                className="h-9 w-9 min-h-0 rounded-none border-0 bg-transparent p-0 text-white shadow-none hover:bg-transparent hover:text-white/80 [&_svg]:!size-6 [&_svg]:shrink-0"
              >
                <Menu strokeWidth={1.75} aria-hidden="true" />
              </Button>
            </motion.div>
          </div>

          {/* Desktop — centered links + Let's Talk */}
          <ul
            className="hidden list-none items-center gap-1 lg:flex"
            role="menubar"
            aria-label="Main navigation menu"
          >
            {navLinks.map((item, index) => (
              <li key={item.label} role="none" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link
                  to={item.href}
                  role="menuitem"
                  aria-label={linkDescriptions[item.label] || `Navigate to ${item.label} section`}
                  title={`${linkDescriptions[item.label] || `Go to ${item.label} section`} - Tayyab's Portfolio`}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                  className={navLinkClassName(item.href)}
                  itemProp="url"
                  onClick={e => handleNavClick(item.href, e)}
                >
                  <span itemProp="name">{item.label}</span>
                  <meta itemProp="position" content={String(index + 1)} />
                </Link>
              </li>
            ))}
          </ul>

          {contactItem && (
            <Link
              to={contactItem.href}
              className={letsTalkDesktopClassName}
              aria-label={linkDescriptions.Contact}
              aria-current={activeSection === '/contact' ? 'page' : undefined}
              onClick={e => handleNavClick('/contact', e)}
            >
              <NavOrb />
              <span>Let&apos;s Talk</span>
            </Link>
          )}
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          id="mobile-navigation-menu"
          aria-label="Mobile navigation menu"
          aria-modal="true"
          className="nav-mobile-sheet top-[var(--template-frame-height,0px)] h-[calc(100dvh-var(--template-frame-height,0px))] w-[min(88vw,340px)] gap-0 border-0 bg-transparent p-0 shadow-none lg:hidden [&>button]:right-5 [&>button]:top-6 [&>button]:flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-none [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-none [&>button]:hover:bg-transparent [&>button]:hover:text-white/80 [&>button>svg]:h-5 [&>button>svg]:w-5 [&>button]:focus-visible:outline-none [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-blue-500"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Tayyab&apos;s Portfolio - Navigation Menu</SheetTitle>
          </SheetHeader>

          <div className="nav-mobile-sheet-panel flex h-full flex-col overflow-y-auto p-6 pt-20">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/70">Menu</p>
            <nav role="navigation" aria-label="Mobile navigation menu" className="flex flex-1 flex-col">
              <ul className="list-none space-y-2" role="menu" aria-label="Navigation links">
                {navLinks.map((item, index) => (
                  <li key={item.label} role="none">
                    <motion.div
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.22 }}
                    >
                      <Link
                        to={item.href}
                        role="menuitem"
                        aria-label={linkDescriptions[item.label] || `Navigate to ${item.label} section`}
                        aria-current={activeSection === item.href ? 'page' : undefined}
                        className={[
                          'nav-mobile-link block px-4 py-3.5 text-[0.95rem] font-medium text-white/90 no-underline transition-all duration-300',
                          activeSection === item.href ? 'nav-mobile-link--active' : '',
                        ].join(' ')}
                        onClick={e => {
                          handleNavClick(item.href, e);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              {contactItem && (
                <div className="mt-auto pt-8">
                  <Link
                    to={contactItem.href}
                    className={letsTalkMobileClassName}
                    aria-label={linkDescriptions.Contact}
                    aria-current={activeSection === '/contact' ? 'page' : undefined}
                    onClick={e => {
                      handleNavClick('/contact', e);
                      setOpen(false);
                    }}
                  >
                    <NavOrb />
                    <span>Let&apos;s Talk</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
