import React from 'react';
import { motion } from 'framer-motion';
import headerImg from '../assets/header.webp';
import { RiMailLine, RiGithubFill, RiLinkedinFill, RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { SiLeetcode } from 'react-icons/si';
import LaserBeam from './LaserBeam';
import AppAppBar from './Appbar';


function Header() {

  return (
    <header className="header" style={{ position: 'relative', overflow: 'hidden' }}>
      <AppAppBar />
      {/* Header Content */}
      <div className="header__socials">
        <a className="circle-icon" style={{ '--icon-color': '#0078d4' }} href="mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A" aria-label="Email Me"><RiMailLine size={24} /></a>
        <a className="circle-icon" style={{ '--icon-color': '#ffffff' }} href="https://github.com/thisistayyab" aria-label="Visit GitHub Profile"><RiGithubFill size={24} /></a>
        <a className="circle-icon" style={{ '--icon-color': '#0077b5' }} href="https://www.linkedin.com/in/thisistayyab/" aria-label="Visit LinkedIn Profile"><RiLinkedinFill size={24} /></a>
        <a className="circle-icon" style={{ '--icon-color': '#ffa116' }} href="https://leetcode.com/u/thisistayyab/" aria-label="Visit LeetCode Profile"><SiLeetcode size={24} /></a>
      </div>
      <div className="section__container header__container" id="home" style={{ position: 'relative', zIndex: 5 }}>
        {/* Colorful animated background elements */}
        <div className="header__bg-gradient"></div>
        <div className="header__bg-circle header__bg-circle-1"></div>
        <div className="header__bg-circle header__bg-circle-2"></div>
        <div className="header__bg-circle header__bg-circle-3"></div>

        <div className="header__content" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.h4
            className="header__subtitle"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Crafting Digital Excellence
          </motion.h4>
          <motion.h1
            className="header__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Hi, I'm <span className="header__name">Tayyab</span>. Full-Stack Web Developer & AI/ML Enthusiast.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            I’m a passionate web developer and computer engineering student with 3+ years of hands-on experience in building full-stack applications. I specialize in creating clean, responsive UIs with React and robust backends using modern technologies.<br /><br />
            Beyond development, I've solved over 1150+ LeetCode problems, strengthening my core in Data Structures and Algorithms — giving me an edge in building optimized, scalable solutions.
          </motion.p>
          <motion.a
            href="#contact"
            className="btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me Now
          </motion.a>
        </div>
      </div>
    </header>
  );
}

export default Header; 