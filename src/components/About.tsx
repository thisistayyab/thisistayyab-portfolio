import { motion } from 'framer-motion';
import aboutImg from '../assets/about.webp';
import cv from "../assets/Tayyab's CV.pdf";
import { socialLinks } from '../data/socialLinks';
import { SocialIcon } from './ui/social-icon';
import { Button } from './ui/button';
import { Card } from './ui/card';

function About() {
  const baseUrl = 'https://thisistayyab.dev';
  
  // Helper to determine platform name from href
  const getPlatformName = (href: string): string => {
    if (href.includes('github')) return 'GitHub';
    if (href.includes('linkedin')) return 'LinkedIn';
    if (href.includes('leetcode')) return 'LeetCode';
    if (href.startsWith('mailto:')) return 'Email';
    return '';
  };

  // Get social profile URLs for sameAs
  const socialProfileUrls = socialLinks
    .filter(link => !link.href.startsWith('mailto:'))
    .map(link => link.href);

  return (
    <section 
      className="max-w-[1200px] mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 relative overflow-hidden" 
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Colorful background circles - decorative */}
      <div 
        className="absolute w-[300px] h-[300px] bg-blue-500 top-[20%] left-[60%] opacity-15 rounded-full blur-[100px] animate-float pointer-events-none z-0" 
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div 
        className="absolute w-[250px] h-[250px] bg-pink-500 bottom-[10%] right-[10%] opacity-12 rounded-full blur-[100px] animate-float pointer-events-none z-0" 
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />
      
      {/* About Image Card */}
      <Card 
        className="relative z-[2] max-w-[450px] mx-auto p-4 hover:scale-100"
        hoverScale={false}
        hoverLift={false}
        glowColor="rgba(59, 130, 246, 0.1)"
      >
        <img
          src={aboutImg}
          alt="Tayyab - Full Stack Web Developer and Computer Engineering Student portrait photo. Professional developer specializing in React, Node.js, Express, and MongoDB with 3+ years of experience."
          loading="lazy"
          width="450"
          height="600"
          className="w-full block rounded-2xl relative z-[2]"
        />
      </Card>

      {/* About Content */}
      <article className="relative z-[2]">
        <motion.h2
          id="about-heading"
          className="text-4xl font-semibold mb-6 text-left bg-gradient-to-br from-white via-slate-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Tayyab — Full Stack Developer | React & Node.js Expert
        </motion.h2>
        
        <motion.p
          className="mb-8 text-[#94a3b8] text-[1.05rem] leading-[1.8]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          A dedicated <strong>full-stack web developer</strong> and <strong>computer engineering student</strong> with a strong passion for crafting seamless user experiences. My development journey began with a love for both logic and design — and has grown into a mission to build clean, responsive, and impactful digital products.
        </motion.p>
        
        <motion.blockquote
          id="leetcode-achievement"
          className="p-8 mb-8 text-base font-normal text-[#94a3b8] bg-white/5 backdrop-blur-[10px] border-t border-r border-b border-white/10 rounded-xl transition-all duration-300 ease-in-out hover:bg-white/5 hover:border-[rgba(59,130,246,0.3)] hover:translate-x-[5px] hover:scale-100 hover:shadow-[0_8px_24px_rgba(59,130,246,0.1)] leading-[1.7] relative"
          style={{
            borderLeft: '4px solid',
            borderImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6) 1',
            paddingLeft: '2rem',
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          itemScope
          itemType="https://schema.org/Quote"
          role="region"
          aria-label="LeetCode Problem Solving Achievement"
          aria-describedby="leetcode-description"
        >
          <meta itemProp="text" content="With over 1150+ LeetCode problems solved, I bring deep algorithmic thinking to every project. This blend of creativity and problem-solving allows me to develop web solutions that are not only visually appealing but also highly efficient." />
          <span id="leetcode-description" className="sr-only">LeetCode problem solving achievement demonstrating algorithmic thinking skills</span>
          <p>
            With over <strong>1150+ LeetCode problems solved</strong>, I bring deep <strong>algorithmic thinking</strong> to every project. This blend of creativity and problem-solving allows me to develop web solutions that are not only visually appealing but also highly efficient.
          </p>
        </motion.blockquote>
        
        <motion.nav
          className="flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          aria-label="About section actions"
        >
          <Button
            asChild
            variant="default"
            glowColor="rgba(59, 130, 246, 0.6)"
            aria-label="Download Tayyab's CV - Full Stack Developer Resume"
          >
            <a 
              href={cv} 
              download
              itemScope
              itemType="https://schema.org/MediaObject"
              title="Download CV - Tayyab's Full Stack Developer Resume PDF"
            >
              <span itemProp="name">Download CV</span>
              <meta itemProp="encodingFormat" content="application/pdf" />
              <meta itemProp="contentUrl" content={`${baseUrl}/src/assets/Tayyab's CV.pdf`} />
              <meta itemProp="description" content="Tayyab's professional resume and CV as a Full Stack Web Developer" />
            </a>
          </Button>
          
          <div 
            className="flex items-center gap-4"
            role="list"
            aria-label="Social media profiles"
          >
            {socialLinks.map((link, i) => (
              <div key={i} role="listitem">
                <SocialIcon
                  Icon={link.Icon}
                  size={48}
                  iconSize={link.size}
                  href={link.href}
                  ariaLabel={link.ariaLabel}
                  color={link.color}
                  platformName={getPlatformName(link.href)}
                />
              </div>
            ))}
          </div>
        </motion.nav>
      </article>
    </section>
  );
}

export default About;
