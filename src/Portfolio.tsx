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
