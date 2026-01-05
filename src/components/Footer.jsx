import React from 'react';
import { RiMailLine, RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import { SiLeetcode } from 'react-icons/si';

function Footer() {
  return (
    <footer className="footer">
      <div className="section__container footer__container">
        <div className="footer__col">
          <h5>Tayyab's Portfolio</h5>
          <p>
            Building digital experiences that are fast, beautiful, and user-focused. Let's connect and create something amazing together!
          </p>
          <div className="footer__socials">
            <a
              className="circle-icon"
              style={{ '--icon-color': '#0078d4' }}
              href="mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A"
              aria-label="Email Tayyab"
            >
              <RiMailLine size={24} />
            </a>
            <a
              className="circle-icon"
              style={{ '--icon-color': '#ffffff' }}
              href="https://github.com/thisistayyab"
              aria-label="Visit Tayyab's GitHub profile"
            >
              <RiGithubFill size={24} />
            </a>
            <a
              className="circle-icon"
              style={{ '--icon-color': '#0077b5' }}
              href="https://www.linkedin.com/in/thisistayyab/"
              aria-label="Visit Tayyab's LinkedIn profile"
            >
              <RiLinkedinFill size={24} />
            </a>
            <a
              className="circle-icon"
              style={{ '--icon-color': '#ffa116' }}
              href="https://leetcode.com/u/thisistayyab/"
              aria-label="Visit Tayyab's LeetCode profile"
            >
              <SiLeetcode size={24} />
            </a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Links</h4>
          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#project">Projects</a>
            <a href="#service">Services</a>
            <a href="#client">Clients</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Services</h4>
          <div className="footer__links">
            <a href="#service">Website Design</a>
            <a href="#service">Website Development</a>
            <a href="#experience">DSA Mastery</a>
            <a href="#service">API Development</a>
            <a href="#service">SEO</a>
            <a href="#service">App Development</a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <div className="footer__links">
            <a href="mailto:thisistayyab@outlook.com">thisistayyab@outlook.com</a>
            <span>Pakistan</span>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        &copy; {new Date().getFullYear()} Tayyab's Portfolio. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 