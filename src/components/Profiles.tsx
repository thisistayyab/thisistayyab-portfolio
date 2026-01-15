import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profiles as localProfiles } from '../data/profiles';
// import { supabase } from '../lib/supabase'; // COMMENTED OUT - Using mock data for performance
// import { getIcon } from '../lib/iconMapping'; // Not needed with mock data
import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

function Profiles() {
  const [profiles, setProfiles] = useState(localProfiles);
  const [loading, setLoading] = useState(false); // No loading needed with mock data
  const baseUrl = 'https://thisistayyab.dev';

  // COMMENTED OUT - Using mock data directly for performance
  // useEffect(() => {
  //   fetchProfiles();
  // }, []);

  // const fetchProfiles = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .select('*')
  //       .eq('is_active', true)
  //       .order('display_order', { ascending: true });

  //     if (error) throw error;

  //     const transformed = data?.map((p) => ({
  //       id: p.profile_id,
  //       name: p.name,
  //       Icon: getIcon(p.icon_name) || localProfiles[0]?.Icon,
  //       iconSize: p.icon_size,
  //       color: p.color,
  //       description: p.description,
  //       link: p.link,
  //       button: p.button,
  //     })) || [];

  //     setProfiles(transformed.length > 0 ? transformed : localProfiles);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching profiles:', error);
  //     setProfiles(localProfiles);
  //     setLoading(false);
  //   }
  // };

  // Inject structured data into document head for SEO
  useEffect(() => {
    // Remove existing script if any
    const existingScript = document.getElementById('profiles-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data for Profiles section
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/#profiles`,
      "name": "Tayyab's Professional Profiles - Full Stack Developer Online Presence",
      "description": "Professional online profiles and platforms where Tayyab showcases his full-stack development expertise. Connect on LinkedIn, GitHub, Upwork, Fiverr, Freelancer, LeetCode, Credly, and other professional platforms. Expert MERN stack developer available for freelance projects and collaborations.",
      "itemListElement": profiles.map((profile, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "ProfilePage",
          "@id": `${baseUrl}/#profile-${profile.id}`,
          "name": `${profile.name} Profile - ${profile.name === 'GitHub' ? 'Code Repository' : profile.name === 'LinkedIn' ? 'Professional Network' : profile.name === 'LeetCode' ? 'Coding Challenges' : profile.name === 'Credly' ? 'Certifications' : 'Freelance Platform'}`,
          "description": profile.description,
          "url": profile.link,
          "mainEntity": {
            "@type": "Person",
            "@id": `${baseUrl}/#person`,
            "name": "Tayyab",
            "url": baseUrl,
            "jobTitle": "Full Stack Developer",
            "sameAs": profiles.map(p => p.link)
          },
          "about": {
            "@type": "Thing",
            "name": profile.name === 'GitHub' ? "Software Development" :
              profile.name === 'LinkedIn' ? "Professional Networking" :
                profile.name === 'LeetCode' ? "Algorithm and Data Structure Practice" :
                  profile.name === 'Credly' ? "Professional Certifications" :
                    "Freelance Web Development Services"
          }
        }
      }))
    };

    // Breadcrumb schema for Profiles section
    const existingBreadcrumb = document.getElementById('profiles-breadcrumb-data');
    if (!existingBreadcrumb) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#profiles-breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Profiles",
            "item": `${baseUrl}/#profiles`
          }
        ]
      };

      const script2 = document.createElement('script');
      script2.id = 'profiles-breadcrumb-data';
      script2.type = 'application/ld+json';
      script2.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script2);
    }

    // Inject ItemList schema
    const script1 = document.createElement('script');
    script1.id = 'profiles-structured-data';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    return () => {
      const script1Cleanup = document.getElementById('profiles-structured-data');
      const script2Cleanup = document.getElementById('profiles-breadcrumb-data');
      if (script1Cleanup) script1Cleanup.remove();
      if (script2Cleanup) script2Cleanup.remove();
    };
  }, [profiles]);

  // Helper to convert hex to RGB for CSS variables
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '59, 130, 246';
  };

  // Helper to get gradient colors from profile color
  const getGradientColors = (color: string): string[] => {
    // Convert hex to RGB and create gradient
    const rgb = hexToRgb(color);
    const [r, g, b] = rgb.split(', ').map(Number);

    // Create complementary colors for gradient
    const secondaryR = Math.min(255, r + 30);
    const secondaryG = Math.min(255, g + 30);
    const secondaryB = Math.min(255, b + 30);

    return [color, `rgb(${secondaryR}, ${secondaryG}, ${secondaryB})`];
  };

  return (
    <section
      className="max-w-[1200px] mx-auto px-4 py-20 relative overflow-hidden"
      id="profiles"
      aria-labelledby="profiles-heading"
      role="region"
    >
      {/* Header */}
      <motion.div
        className="relative z-[2] text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2
          id="profiles-heading"
          className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white via-slate-300 to-blue-400 bg-clip-text text-transparent"
        >
          My Professional Profiles
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Connect with me on various platforms to explore my work, certifications, and professional journey as a full-stack developer
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading profiles...</p>
        </div>
      ) : (
        <>
          {/* Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 relative z-[1] items-stretch">
        {profiles.map((profile, i) => {
          const Icon = profile.Icon;
          const gradientColors = getGradientColors(profile.color);
          const rgbColor = hexToRgb(profile.color);

          return (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex h-full"
            >
              <Card
                glowColor={`rgba(${rgbColor}, 0.15)`}
                gradientColors={[profile.color, `rgba(${rgbColor}, 0.3)`]}
                hoverScale={true}
                hoverLift={true}
                className="h-full w-full flex flex-col group/profile-card py-10 px-8"
                style={{
                  '--profile-color': profile.color,
                  '--profile-color-rgb': rgbColor,
                } as React.CSSProperties}
                contentClassName="h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Top content */}
                  <div>
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-16 h-16 rounded-lg flex items-center justify-center mb-6 flex-shrink-0",
                        "bg-white/5 border border-white/10",
                        "transition-all duration-300 ease-in-out",
                        "group-hover/profile-card:scale-110 group-hover/profile-card:rotate-[5deg]",
                        "group-hover/profile-card:bg-white/10",
                        "profile-icon"
                      )}
                      style={{
                        color: profile.color,
                        '--profile-color-rgb': rgbColor,
                      } as React.CSSProperties & { '--profile-color-rgb': string }}
                      aria-hidden="true"
                    >
                      <Icon size={profile.iconSize} />
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-[1.4rem] font-bold mb-4 relative z-[3] flex-shrink-0",
                        "bg-clip-text text-transparent",
                        "transition-all duration-300",
                        "profile-title-gradient"
                      )}
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #ffffff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        '--profile-color': profile.color,
                        '--profile-color-rgb': rgbColor,
                      } as React.CSSProperties & { '--profile-color': string; '--profile-color-rgb': string }}
                    >
                      {profile.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-[0.95rem] leading-[1.7] opacity-90 mb-6 relative z-[3]">
                      {profile.description}
                    </p>
                  </div>

                  {/* Button - Fixed at bottom */}
                  <div className="relative z-[3]">
                    <Button
                      asChild
                      variant="default"
                      glowColor={profile.color}
                      className="w-full"
                      style={{
                        borderColor: profile.color,
                        color: profile.color,
                        '--glow-primary': `rgba(${rgbColor}, 0.6)`,
                        '--glow-secondary': `rgba(${rgbColor}, 0.3)`,
                      } as React.CSSProperties}
                    >
                      <a
                        href={profile.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${profile.name} profile - ${profile.description}`}
                      >
                        {profile.button}
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
          </div>
        </>
      )}
    </section>
  );
}

export default Profiles;
