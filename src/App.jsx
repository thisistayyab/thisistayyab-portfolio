import React from 'react'
import './App.css'
import Header from './components/Header';
import Experience from './components/Experience';
import About from './components/About';
import Banner from './components/Banner';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeCustomization from './themes';
import { motion } from 'framer-motion';
import techIcons from './techIcons.jsx'
import Clients from './components/Clients.jsx';
import RippleBackground from './components/RippleBackground';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(() => window.innerWidth >= 768);
  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
}


function App() {
  const isDesktop = useIsDesktop();
  return (
    <ThemeCustomization>
      <RippleBackground />
      {/* Global Animated Background: Blurred Circles and Tech Icons */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 200,
          height: 200,
          background: '#ee9821',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.3,
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 250,
          height: 250,
          background: '#f8f208',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.2,
          zIndex: 1,
        }} />
        {/* Tech Icons: animated on desktop, still on mobile */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
          {isDesktop
            ? techIcons.map((item, i) => (
              <motion.img
                key={i}
                src={item.src}
                alt="tech icon"
                style={{ position: 'absolute', width: 40, height: 40, top: item.top, left: item.left, opacity: 0.18, willChange: 'transform' }}
                initial={{ y: -20, x: 0 }}
                animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                transition={{ duration: item.duration, repeat: Infinity }}
              />
            ))
            : techIcons.map((item, i) => (
              <img
                key={i}
                src={item.src}
                alt="tech icon"
                style={{ position: 'absolute', width: 40, height: 40, top: item.top, left: item.left, opacity: 0.18 }}
              />
            ))}
        </div>
      </div>
      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <Header />
        <About />
        <Banner />
        <Projects />
        <Experience />
        <Clients />
        <Services />
        <Contact />
        <Footer />
      </div>
    </ThemeCustomization>
  )
}

export default App
