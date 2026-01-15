import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import Portfolio from './Portfolio';
import { trackPageView } from './lib/analytics';
import { SEOHead } from './components/SEOHead';

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => window.innerWidth >= 768);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
}

// Component to handle scroll to section on route change
function ScrollToSection() {
  const location = useLocation();
  const navigationRef = useRef<string | null>(null);
  const isUserNavigation = useRef<boolean>(false);
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Check if this navigation was triggered by scroll (via sessionStorage flag)
    const scrollTriggered = sessionStorage.getItem('scroll-navigation') === 'true';
    sessionStorage.removeItem('scroll-navigation');
    
    // If navigation was triggered by scroll detection, don't scroll
    // Only scroll if it's a user-initiated navigation (click, browser back/forward, etc.)
    if (scrollTriggered) {
      navigationRef.current = location.pathname;
      return;
    }

    // Check if this is a user-initiated navigation
    // User navigation is when the route changes but NOT from scroll detection
    const routeChanged = navigationRef.current !== location.pathname;
    
    if (routeChanged && !scrollTriggered) {
      // This is a user-initiated navigation (click, browser navigation, etc.)
      isUserNavigation.current = true;
      navigationRef.current = location.pathname;

      // Map routes to section IDs
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

      const sectionId = routeToSection[location.pathname];
      
      if (sectionId) {
        // For home route, scroll to top
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Function to scroll to element with retries
          const scrollToElement = (attempt = 0): void => {
            const element = document.getElementById(sectionId);
            if (element) {
              // Wait a bit more for any animations/transitions
              setTimeout(() => {
                const headerOffset = 120; // Account for fixed navbar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                  top: Math.max(0, offsetPosition),
                  behavior: 'smooth'
                });
              }, 50);
              return;
            }
            
            // Retry up to 10 times if element not found (for slow loading)
            if (attempt < 10) {
              setTimeout(() => scrollToElement(attempt + 1), 150);
            } else {
              console.warn(`Section with id "${sectionId}" not found after multiple attempts. Route: ${location.pathname}`);
            }
          };

          // Start scrolling attempt with initial delay
          setTimeout(() => scrollToElement(), 50);
        }
      }

      // Reset flag after a short delay
      setTimeout(() => {
        isUserNavigation.current = false;
      }, 500);
    } else if (!routeChanged) {
      // Route didn't change, just update the ref
      navigationRef.current = location.pathname;
    }

    // Only track page view if pathname actually changed (not just hash or query params)
    // This prevents duplicate tracking from location object changes
    if (lastTrackedPathRef.current !== location.pathname) {
      lastTrackedPathRef.current = location.pathname;
      trackPageView(location.pathname, document.title);
    }
  }, [location.pathname]); // Only depend on pathname, not the entire location object

  return null;
}

function App() {
  const isDesktop = useIsDesktop();

  // Track keyboard vs mouse navigation for focus rings
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only add class for Tab key (keyboard navigation)
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <SEOHead />
        <ScrollToSection />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/about" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/projects" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/experience" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/testimonials" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/services" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/profiles" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="/contact" element={<Portfolio isDesktop={isDesktop} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
