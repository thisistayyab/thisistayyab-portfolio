import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

function Experience() {
  const baseUrl = 'https://thisistayyab.dev';

  // Inject structured data into document head for SEO
  useEffect(() => {
    // Remove existing script if any
    const existingScript = document.getElementById('experience-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data for Experience section
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/#experience`,
      "name": "Tayyab's Professional Experience and Education - Full Stack Developer Career",
      "description": "Professional work experience and educational background of Tayyab, a full-stack web developer specializing in React, Node.js, Express, MongoDB, and MERN stack development. Showcasing expertise in building scalable web applications and delivering high-quality software solutions.",
      "itemListElement": experiences.map((exp, index) => {
        const isWork = exp.type === 'work';
        const periodParts = exp.period.split(' - ');
        const startDate = periodParts[0];
        const endDate = periodParts[1] && !exp.period.includes('Present') ? periodParts[1] : undefined;
        
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": isWork ? {
            "@type": "OrganizationRole",
            "@id": `${baseUrl}/#experience-${exp.id}`,
            "roleName": exp.title,
            "description": exp.description,
            "startDate": startDate,
            "endDate": endDate,
            "numberedPosition": index + 1,
            "organizationName": exp.company,
            "organization": {
              "@type": "Organization",
              "name": exp.company,
              "sameAs": exp.company === 'Upwork' ? 'https://www.upwork.com' : 
                       exp.company === 'Fiverr' ? 'https://www.fiverr.com' : 
                       exp.company === 'Taylance Technologies' ? baseUrl : undefined
            },
            "skills": exp.technologies.join(", ")
          } : {
            "@type": "EducationalOccupationalCredential",
            "@id": `${baseUrl}/#experience-${exp.id}`,
            "name": exp.title,
            "description": exp.description,
            "credentialCategory": "degree",
            "educationalLevel": "Bachelor's Degree",
            "recognizedBy": {
              "@type": "Organization",
              "name": exp.company,
              "sameAs": "https://www.riphah.edu.pk"
            },
            "dateCreated": startDate,
            "validUntil": endDate,
            "competencyRequired": exp.technologies
          }
        };
      })
    };

    // Breadcrumb schema for Experience section (only if not already present globally)
    const existingBreadcrumb = document.getElementById('experience-breadcrumb-data');
    if (!existingBreadcrumb) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#experience-breadcrumb`,
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
            "name": "Experience",
            "item": `${baseUrl}/#experience`
          }
        ]
      };

      const script2 = document.createElement('script');
      script2.id = 'experience-breadcrumb-data';
      script2.type = 'application/ld+json';
      script2.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script2);
    }

    // Inject ItemList schema
    const script1 = document.createElement('script');
    script1.id = 'experience-structured-data';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    return () => {
      const script1Cleanup = document.getElementById('experience-structured-data');
      const script2Cleanup = document.getElementById('experience-breadcrumb-data');
      if (script1Cleanup) script1Cleanup.remove();
      if (script2Cleanup) script2Cleanup.remove();
    };
  }, []);

  // Helper to convert hex to RGB
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '59, 130, 246';
  };

  return (
    <section 
      className="max-w-[1200px] mx-auto px-4 py-20 relative overflow-hidden" 
      id="experience"
      aria-labelledby="experience-heading"
      role="region"
    >
      {/* Blurred Circle Background */}
      <div 
        className="absolute top-[30%] right-[10%] w-[200px] h-[200px] bg-blue-500 rounded-full blur-[100px] opacity-[0.15] z-0"
        aria-hidden="true"
      />

      {/* Header */}
      <motion.div
        className="relative z-[2] text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 
          id="experience-heading" 
          className="text-4xl font-semibold mb-4"
        >
          Professional Experience & Education - Full Stack Developer Career
        </h2>
        <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
          My journey in software development, from learning to building production-ready applications
        </p>
      </motion.div>

      {/* Experience Grid */}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-[2] mt-16 list-none"
        role="list"
        aria-label="Professional experience and education timeline"
      >
        {experiences.map((exp, i) => {
          const expId = `experience-${exp.id}`;
          const colorRgb = hexToRgb(exp.color);
          const Icon = exp.Icon;
          const isWork = exp.type === 'work';
          
          return (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
              viewport={{ once: true }}
              className="group"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <article
                id={expId}
                className="h-full"
                itemScope
                itemType={isWork ? "https://schema.org/JobPosting" : "https://schema.org/EducationalOccupationalCredential"}
              >
                <meta itemProp="position" content={String(i + 1)} />
                <Card
                  className="p-10 h-full relative backdrop-blur-[15px] experience-card bg-white/[0.03]"
                  glowColor={`rgba(${colorRgb}, 0.1)`}
                  gradientColors={[exp.color, isWork ? '#8b5cf6' : '#ec4899']}
                  hoverScale={false}
                  hoverLift={false}
                  style={{
                    '--experience-color': exp.color,
                    '--experience-color-rgb': colorRgb,
                  } as React.CSSProperties & { '--experience-color': string; '--experience-color-rgb': string; }}
                >
                  {/* Icon with shine effect */}
                  <div 
                    className="w-16 h-16 rounded-[8px] bg-white/5 flex items-center justify-center mb-6 border-[1.5px] border-white/10 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden group-hover:scale-110 group-hover:rotate-[5deg] experience-icon"
                    style={{ 
                      color: exp.color,
                      '--experience-color-rgb': colorRgb,
                    } as React.CSSProperties & { '--experience-color-rgb': string; }}
                    aria-hidden="true"
                  >
                    <span 
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.1),transparent)] rotate-45 transition-all duration-600 ease-in-out group-hover:animate-shine"
                      aria-hidden="true"
                    />
                    <span className="relative z-[1]">
                      <Icon size={exp.iconSize} />
                    </span>
                  </div>

                  {/* Badge */}
                  <Badge
                    className="mb-5 text-xs font-semibold uppercase tracking-[0.5px] rounded-[8px] border text-white experience-badge px-4 py-2"
                    style={{
                      background: `rgba(${colorRgb}, 0.15)`,
                      borderColor: `rgba(${colorRgb}, 0.3)`,
                      '--experience-color-rgb': colorRgb,
                    } as React.CSSProperties & { '--experience-color-rgb': string; }}
                    itemProp={isWork ? "employmentType" : "credentialCategory"}
                  >
                    {isWork ? 'Work' : 'Education'}
                  </Badge>

                  {/* Title */}
                  <h3 
                    className="text-2xl font-bold mb-2 text-white bg-clip-text text-transparent transition-all duration-300 ease-in-out experience-title"
                    style={{ 
                      '--title-gradient-default': 'linear-gradient(135deg, #ffffff, #94a3b8)',
                      '--title-gradient-hover': `linear-gradient(135deg, ${exp.color}, #8b5cf6)`,
                      backgroundImage: 'var(--title-gradient-default)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    } as React.CSSProperties & { '--title-gradient-default': string; '--title-gradient-hover': string; }}
                    itemProp={isWork ? "title" : "name"}
                  >
                    {exp.title}
                  </h3>

                  {/* Company/Organization and Period */}
                  <h4 
                    className="text-base font-medium text-[#94a3b8] mb-4"
                    itemProp={isWork ? "hiringOrganization" : "recognizedBy"}
                    itemScope
                    itemType="https://schema.org/Organization"
                  >
                    <span itemProp="name">{exp.company}</span>
                    <span className="opacity-60 font-normal"> • {exp.period}</span>
                    {isWork && <meta itemProp="datePosted" content={exp.period.split(' - ')[0]} />}
                    {!exp.period.includes('Present') && isWork && (
                      <meta itemProp="validThrough" content={exp.period.split(' - ')[1]} />
                    )}
                  </h4>

                  {/* Description */}
                  <p 
                    className="text-[#94a3b8] leading-[1.7] mb-6 text-[0.95rem]"
                    itemProp="description"
                  >
                    {exp.description}
                  </p>

                  {/* Technologies/Skills */}
                  <div 
                    className="flex flex-wrap gap-2"
                    aria-label={`Technologies and skills used: ${exp.technologies.join(', ')}`}
                    itemProp={isWork ? "skills" : "competencyRequired"}
                  >
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        data-tech-tag
                        className="px-4 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-[8px] text-[#94a3b8] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden group/tech hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                        style={{
                          '--experience-color': exp.color,
                          '--experience-color-rgb': colorRgb,
                        } as React.CSSProperties & { '--experience-color': string; '--experience-color-rgb': string; }}
                        role="listitem"
                        tabIndex={0}
                        aria-label={`Technology: ${tech}`}
                      >
                        <span
                          className="absolute top-0 -left-full w-full h-full 
                          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)]
                          transition-all duration-500 ease-in-out
                          group-hover/tech:left-full"
                          aria-hidden="true"
                        />
                        <span className="relative z-[1]">{tech}</span>
                      </span>
                    ))}
                  </div>
                </Card>
              </article>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}

export default Experience;
