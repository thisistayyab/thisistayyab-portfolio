import React from 'react';
import { motion } from 'framer-motion';
import headerImg from '../assets/header.webp';
import { RiMailLine, RiGithubLine, RiLinkedinLine, RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import LaserBeam from './LaserBeam';
import AppAppBar from './Appbar';


function Header() {

  return (
    <header className="header" style={{ position: 'relative', overflow: 'hidden' }}>
      <AppAppBar />
      {/* Header Content */}
      <div className="header__socials">
        <a className="circle-icon" href="mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A" aria-label="Email Me"><RiMailLine size={24} /></a>
        <a className="circle-icon" href="https://github.com/thisistayyab" aria-label="Visit GitHub Profile"><RiGithubLine size={24} /></a>
        <a className="circle-icon" href="https://www.linkedin.com/in/thisistayyab/" aria-label="Visit LinkedIn Profile"><RiLinkedinLine size={24} /></a>
      </div>
      <div className="section__container header__container" id="home" style={{ position: 'relative', zIndex: 5 }}>
        <LaserBeam top="100%" left="13%" color="blue" duration="6.0s" />
        <LaserBeam top="100%" left="13%" color="blue" duration="5.0s" />
        <div className="header__image">
          <img src={headerImg} alt="Tayyab (thisistayyab) - Full Stack Developer & Software Engineer" width="600" height="600" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className="header__content" style={{ textAlign: 'center' }}>
          <motion.h4
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Crafting Digital Excellence
          </motion.h4>
          <motion.h1
            className='fire'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Hi, I’m Tayyab. Full-Stack Web Developer & AI/ML Enthusiast.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            I’m a passionate web developer and computer engineering student with 3+ years of hands-on experience in building full-stack applications. I specialize in creating clean, responsive UIs with React and robust backends using modern technologies.<br /><br />
            Beyond development, I've solved over 1150+ LeetCode problems, strengthening my core in Data Structures and Algorithms — giving me an edge in building optimized, scalable solutions.
          </motion.p>
          <motion.button
            className="btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a href="#contact">Hire Me Now</a>
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default Header; 