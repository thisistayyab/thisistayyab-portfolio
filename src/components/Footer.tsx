import React from 'react';
import { RiMailLine, RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import { SiLeetcode } from 'react-icons/si';
import { socialLinksHeader } from '../data/socialLinks';

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
            {socialLinksHeader.map((link, i) => {
              const Icon = link.Icon;
              return (
                <a
                  key={i}
                  className="circle-icon"
                  style={{ '--icon-color': link.color } as React.CSSProperties}
                  href={link.href}
                  aria-label={link.ariaLabel}
                >
                  <Icon size={link.size} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer__col">
          <h4>Links</h4>
          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#project">Projects</a>
            <a href="#profiles">Profiles</a>
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
