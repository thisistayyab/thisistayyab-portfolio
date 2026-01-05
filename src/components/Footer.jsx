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
            <a className="circle-icon" style={{ '--icon-color': '#0078d4' }} href="mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A"><RiMailLine size={24} /></a>
            <a className="circle-icon" style={{ '--icon-color': '#ffffff' }} href="https://github.com/thisistayyab"><RiGithubFill size={24} /></a>
            <a className="circle-icon" style={{ '--icon-color': '#0077b5' }} href="https://www.linkedin.com/in/thisistayyab/"><RiLinkedinFill size={24} /></a>
            <a className="circle-icon" style={{ '--icon-color': '#ffa116' }} href="https://leetcode.com/u/thisistayyab/"><SiLeetcode size={24} /></a>
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
            <a href="#">Website Design</a>
            <a href="#">Website Development</a>
            <a href="#">DSA Mastery</a>
            <a href="#">API Development</a>
            <a href="#">SEO</a>
            <a href="#">App Development</a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <div className="footer__links">
            <a href="mailto:thisistayyab@outlook.com">thisistayyab@outlook.com</a>
            <a href="#">Pakistan</a>
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