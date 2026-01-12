import { motion } from 'framer-motion';
import AppAppBar from './Appbar';
import { socialLinksHeader } from '../data/socialLinks';
import { Button } from './ui/button';
import { SocialIcon } from './ui/social-icon';

function Header() {
  // Helper to determine platform name from href
  const getPlatformName = (href: string): string => {
    if (href.includes('github')) return 'GitHub';
    if (href.includes('linkedin')) return 'LinkedIn';
    if (href.includes('leetcode')) return 'LeetCode';
    if (href.startsWith('mailto:')) return 'Email';
    return '';
  };

  return (
    <header className="relative overflow-hidden pt-[100px] bg-transparent">
      <AppAppBar />
      
      {/* Structured Data for Social Profiles */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://thisistayyab.dev/#person',
            name: 'Tayyab',
            jobTitle: 'Full-Stack Web Developer & AI/ML Enthusiast',
            url: 'https://thisistayyab.dev',
            sameAs: socialLinksHeader
              .filter(link => !link.href.startsWith('mailto:'))
              .map(link => link.href),
            email: socialLinksHeader
              .find(link => link.href.startsWith('mailto:'))
              ?.href.replace('mailto:', ''),
          }),
        }}
      />
      
      {/* Header Social Icons - Desktop Only */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
        {socialLinksHeader.map((link, i) => (
          <SocialIcon
            key={i}
            Icon={link.Icon}
            size={48}
            iconSize={link.size}
            href={link.href}
            ariaLabel={link.ariaLabel}
            color={link.color}
            platformName={getPlatformName(link.href)}
          />
        ))}
      </div>

      {/* Header Container */}
      <div className="max-w-[1200px] mx-auto px-4 pt-40 pb-32 flex items-center justify-center min-h-[80vh] relative overflow-hidden" id="home">
        {/* Animated Background Circles */}
        <div className="absolute w-[300px] h-[300px] bg-blue-500 top-[10%] left-[10%] opacity-15 rounded-full blur-[80px] animate-float pointer-events-none z-0" style={{ animationDelay: '0s' }} />
        <div className="absolute w-[250px] h-[250px] bg-purple-500 top-[60%] right-[15%] opacity-12 rounded-full blur-[80px] animate-float pointer-events-none z-0" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[200px] h-[200px] bg-pink-500 bottom-[10%] left-1/2 -translate-x-1/2 opacity-10 rounded-full blur-[80px] animate-float pointer-events-none z-0" style={{ animationDelay: '4s' }} />

        {/* Header Content */}
        <div className="text-center max-w-[900px] mx-auto relative z-[2]">
          <motion.h4
            className="mb-6 text-[1.3rem] font-medium bg-gradient-to-br from-slate-400 to-blue-400 bg-clip-text text-transparent tracking-[2px] uppercase"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Crafting Digital Excellence
          </motion.h4>
          
          <motion.h1
            className="mb-8 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.2] bg-gradient-to-br from-white via-slate-400 to-blue-400 bg-clip-text text-transparent animate-text-shimmer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Hi, I'm <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-name-glow relative">Tayyab</span>. Full-Stack Web Developer & AI/ML Enthusiast.
          </motion.h1>
          
          <motion.p
            className="mb-10 text-[#94a3b8] text-[1.1rem] leading-[1.8] max-w-[700px] mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            I'm a passionate web developer and computer engineering student with 3+ years of hands-on experience in building full-stack applications. I specialize in creating clean, responsive UIs with React and robust backends using modern technologies.<br /><br />
            Beyond development, I've solved over 1150+ LeetCode problems, strengthening my core in Data Structures and Algorithms — giving me an edge in building optimized, scalable solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              asChild
              variant="default"
              glowColor="rgba(59, 130, 246, 0.6)"
              className="hover:scale-105 active:scale-95"
            >
              <a href="#contact">
                Hire Me Now
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default Header;
