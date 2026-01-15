import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services as localServices } from '../data/servicesData';
// import { supabase } from '../lib/supabase'; // COMMENTED OUT - Using mock data for performance
// import { getIcon } from '../lib/iconMapping'; // Not needed with mock data
import { Card } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

function Services() {
  const [services, setServices] = useState(localServices);
  const [loading, setLoading] = useState(false); // No loading needed with mock data
  const baseUrl = 'https://thisistayyab.dev';

  // COMMENTED OUT - Using mock data directly for performance
  // useEffect(() => {
  //   fetchServices();
  // }, []);

  // const fetchServices = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('services')
  //       .select('*')
  //       .eq('is_active', true)
  //       .order('display_order', { ascending: true });

  //     if (error) throw error;

  //     // Transform Supabase data to match component format
  //     const transformed = data?.map((s) => ({
  //       id: s.service_id,
  //       title: s.title,
  //       Icon: getIcon(s.icon_name) || localServices[0]?.Icon,
  //       iconSize: s.icon_size,
  //       color: s.color,
  //       description: s.description,
  //       features: s.features,
  //       keywords: s.keywords,
  //     })) || [];

  //     setServices(transformed.length > 0 ? transformed : localServices);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching services:', error);
  //     setServices(localServices);
  //     setLoading(false);
  //   }
  // };

  // Inject structured data for SEO
  useEffect(() => {
    const existingScript = document.getElementById('services-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create comprehensive structured data for Services
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${baseUrl}/#services`,
      "name": "Tayyab - Full Stack Web Development Services",
      "description": "Professional full-stack web development services by Tayyab, an expert developer specializing in React, Node.js, Express.js, MongoDB, MERN stack, responsive web design, SEO optimization, cloud deployment, API development, and performance optimization. 3+ years of experience building scalable web applications.",
      "url": `${baseUrl}/#services`,
      "provider": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tayyab",
        "jobTitle": "Full Stack Developer",
        "email": "thisistayyab@outlook.com",
        "url": baseUrl,
        "sameAs": [
          "https://github.com/thisistayyab",
          "https://pk.linkedin.com/in/thisistayyab",
          "https://www.upwork.com/freelancers/~015384474940802080"
        ]
      },
      "areaServed": "Worldwide",
      "serviceType": services.flatMap(service => service.keywords),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Development Services Catalog",
        "itemListElement": services.map((service, index) => ({
          "@type": "Offer",
          "position": index + 1,
          "itemOffered": {
            "@type": "Service",
            "@id": `${baseUrl}/#service-${service.id}`,
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "Person",
              "@id": `${baseUrl}/#person`,
              "name": "Tayyab"
            },
            "serviceType": service.keywords,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "USD",
              "price": "Contact for pricing"
            }
          }
        }))
      }
    };

    // ItemList for services
    const itemListData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/#services-list`,
      "name": "Web Development Services - Full Stack Developer Services",
      "description": "Comprehensive list of web development services offered by Tayyab including full-stack development, responsive design, database management, cloud deployment, SEO optimization, security implementation, performance optimization, and API development.",
      "itemListElement": services.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "@id": `${baseUrl}/#service-${service.id}`,
          "name": service.title,
          "description": service.description,
          "provider": {
            "@type": "Person",
            "name": "Tayyab",
            "jobTitle": "Full Stack Developer"
          }
        }
      }))
    };

    const script1 = document.createElement('script');
    script1.id = 'services-structured-data';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.id = 'services-itemlist-data';
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(itemListData);
    document.head.appendChild(script2);

    return () => {
      const cleanup1 = document.getElementById('services-structured-data');
      const cleanup2 = document.getElementById('services-itemlist-data');
      if (cleanup1) cleanup1.remove();
      if (cleanup2) cleanup2.remove();
    };
  }, [services]);

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
      id="services"
      aria-labelledby="services-heading"
      role="region"
    >
      {/* Floating background circles */}
      <div
        className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-blue-500 rounded-full blur-[100px] opacity-[0.15] z-0 animate-float"
        aria-hidden="true"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-[20%] left-[15%] w-[300px] h-[300px] bg-purple-500 rounded-full blur-[100px] opacity-[0.12] z-0 animate-float"
        aria-hidden="true"
        style={{ animationDelay: '3s' }}
      />

      {/* Header */}
      <motion.div
        className="relative z-[2] text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2
          id="services-heading"
          className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white via-slate-300 to-blue-400 bg-clip-text text-transparent"
        >
          Full Stack Web Development Services | React & Node.js Expert
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Expert full-stack web development services specializing in React, Node.js, Express.js, MongoDB, MERN stack development, responsive web design, SEO optimization, cloud deployment, API development, and performance optimization. Building scalable, modern web applications with 3+ years of professional experience.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading services...</p>
        </div>
      ) : (
        <>
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 relative z-[1] items-stretch">
        {services.map((service, i) => {
          const Icon = service.Icon;
          const rgbColor = hexToRgb(service.color);

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex h-full"
            >
              <Card
                glowColor={`rgba(${rgbColor}, 0.15)`}
                gradientColors={[service.color, `rgba(${rgbColor}, 0.3)`]}
                hoverScale={true}
                hoverLift={true}
                className="h-full w-full flex flex-col group/service-card py-8 px-6"
                style={{
                  '--service-color': service.color,
                  '--service-color-rgb': rgbColor,
                } as React.CSSProperties}
                contentClassName="h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Top content */}
                  <div>
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-lg flex items-center justify-center mb-5 flex-shrink-0",
                        "bg-white/5 border border-white/10",
                        "transition-all duration-300 ease-in-out",
                        "group-hover/service-card:scale-110 group-hover/service-card:rotate-[5deg]",
                        "group-hover/service-card:bg-white/10"
                      )}
                      style={{
                        color: service.color,
                      } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      <Icon size={service.iconSize} />
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-xl font-bold mb-3 relative z-[3] flex-shrink-0",
                        "bg-clip-text text-transparent",
                        "transition-all duration-300"
                      )}
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #ffffff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      } as React.CSSProperties}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-[1.6] opacity-90 mb-4 relative z-[3] flex-1">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-4 relative z-[3]">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                          <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button - Fixed at bottom */}
                  <div className="relative z-[3] mt-auto">
                    <Button
                      asChild
                      variant="default"
                      glowColor={service.color}
                      className="w-full"
                      style={{
                        borderColor: service.color,
                        color: service.color,
                      } as React.CSSProperties}
                    >
                      <Link
                        to="/contact"
                        aria-label={`Get ${service.title} service - Contact Tayyab`}
                      >
                        Get Service
                      </Link>
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

      {/* Additional SEO Content - Hidden but accessible to crawlers */}
      <div className="sr-only" aria-hidden="false">
        <h3>Web Development Services Offered</h3>
        <p>
          Professional full-stack web development services including React development, Node.js development, Express.js development, MongoDB development, MERN stack development, responsive web design, UI/UX design, frontend development, backend development, API development, RESTful API development, database design, cloud deployment, DevOps services, SEO optimization, search engine optimization, performance optimization, security implementation, authentication development, JavaScript development, TypeScript development, custom web development, and professional web development solutions.
        </p>
        <h3>Technologies and Skills</h3>
        <p>
          Expert in React, Next.js, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Material-UI, RESTful APIs, GraphQL, JWT authentication, OAuth, AWS, Vercel, Netlify, Git, GitHub, Docker, and modern web development tools and frameworks.
        </p>
        <h3>Service Areas</h3>
        <p>
          Providing web development services worldwide including custom web application development, e-commerce development, portfolio website development, business website development, startup website development, SaaS application development, and enterprise web solutions.
        </p>
      </div>
    </section>
  );
}

export default Services;
