import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/about.webp';
import { RiMailLine, RiGithubLine, RiLinkedinLine } from 'react-icons/ri';
import cv from "../assets/Tayyab's CV.pdf"

function About() {
  return (
    <section className="section__container about__container" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Colorful background circles */}
      <div className="about__bg-circle about__bg-circle-1"></div>
      <div className="about__bg-circle about__bg-circle-2"></div>
      <div className="about__image image-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        <img src={aboutImg} alt="about" loading="lazy" />
      </div>
      <div className="about__content" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2
          className="section__header"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Hi There, I’m Tayyab
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          A dedicated full-stack web developer and computer engineering student with a strong passion for crafting seamless user experiences. My development journey began with a love for both logic and design — and has grown into a mission to build clean, responsive, and impactful digital products.
        </motion.p>
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          With over 1150+ LeetCode problems solved, I bring deep algorithmic thinking to every project. This blend of creativity and problem-solving allows me to develop web solutions that are not only visually appealing but also highly efficient.
        </motion.h4>
        <motion.div
          className="about__btns"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a color='white' href={cv} download className="btn download__btn">
            Download CV
          </a>
          <a className="circle-icon" href="mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A" aria-label="Email Me"><RiMailLine size={20} /></a>
          <a className="circle-icon" href="https://github.com/thisistayyab" aria-label="GitHub Profile"><RiGithubLine size={20} /></a>
          <a className="circle-icon" href="https://www.linkedin.com/in/thisistayyab/" aria-label="LinkedIn Profile"><RiLinkedinLine size={20} /></a>
        </motion.div>
      </div>
    </section>
  );
}

export default About; 