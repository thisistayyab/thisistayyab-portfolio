import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Experience from './components/Experience';
import About from './components/About';
import Banner from './components/Banner';
import Projects from './components/Projects';
import Services from './components/Services';
import Profiles from './components/Profiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { GlobalBackground } from './components/GlobalBackground';
import Clients from './components/Clients';
import { trackPageView } from './lib/analytics';

interface PortfolioProps {
  isDesktop: boolean;
}

function Portfolio({ isDesktop }: PortfolioProps) {
  // Page view tracking is handled in App.tsx to avoid duplicates

  return (
    <>
      {/* Global Animated Background: Blurred Circles and Tech Icons */}
      <GlobalBackground isDesktop={isDesktop} showTechIcons={true} />
      {/* Hidden SEO Content - Visible to search engines, hidden from users */}
      <div className="sr-only" aria-hidden="true">
        <h1>thisistayyab - This is Tayyab - Full Stack Developer</h1>
        <p>thisistayyab developer, this is tayyab developer, This is Tayyab developer, thisistayyab= developer. Professional full stack web development services by thisistayyab. Expert React, Node.js, Express, MongoDB developer. this is tayyab portfolio showcasing web development projects and services.</p>
        <p>thisistayyab portfolio, this is tayyab portfolio, This is Tayyab portfolio. Hire thisistayyab for custom web development, React applications, Node.js backend services, MongoDB database design, and full stack solutions.</p>
        <p>thisistayyab= full stack developer, this is tayyab full stack developer, This is Tayyab full stack developer. Specializing in MERN stack development, TypeScript, WordPress development, and AI integration services.</p>
        <p>Search terms: thisistayyab, this is tayyab, This is Tayyab, thisistayyab=, thisistayyab developer, this is tayyab developer, This is Tayyab developer, thisistayyab portfolio, this is tayyab portfolio, This is Tayyab portfolio</p>
      </div>
      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        style={{ position: 'relative', zIndex: 5 }}
      >
        <Header />
        <About />
        <Banner />
        <Projects />
        <Experience />
        <Clients />
        <Services />
        <Profiles />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default Portfolio;
