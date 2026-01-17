import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { testimonials as localTestimonials } from '../data/testimonials';
// import { supabase } from '../lib/supabase'; // COMMENTED OUT - Using mock data for performance
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

function Clients() {
  const [testimonials, setTestimonials] = useState(localTestimonials);
  const [loading, setLoading] = useState(false); // No loading needed with mock data
  const baseUrl = 'https://thisistayyab.dev';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const showCarousel = testimonials.length > 1;

  // COMMENTED OUT - Using mock data directly for performance
  // useEffect(() => {
  //   fetchTestimonials();
  // }, []);

  // const fetchTestimonials = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('testimonials')
  //       .select('*')
  //       .eq('is_active', true)
  //       .order('display_order', { ascending: true });

  //     if (error) throw error;

  //     const transformed = data?.map((t) => ({
  //       id: t.testimonial_id,
  //       clientName: t.client_name,
  //       clientRole: t.client_role,
  //       clientCompany: t.client_company,
  //       clientImage: t.client_image,
  //       platform: t.platform,
  //       platformUrl: t.platform_url,
  //       rating: t.rating,
  //       testimonial: t.testimonial,
  //       date: t.date,
  //       projectType: t.project_type,
  //     })) || [];

  //     setTestimonials(transformed.length > 0 ? transformed : localTestimonials);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching testimonials:', error);
  //     setTestimonials(localTestimonials);
  //     setLoading(false);
  //   }
  // };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!showCarousel) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [showCarousel, testimonials.length]);

  // Inject structured data for SEO
  useEffect(() => {
    // Remove existing script if any
    const existingScript = document.getElementById('testimonials-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data for Testimonials section
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/#client`,
      "name": "Client Testimonials and Reviews - Tayyab's Portfolio",
      "description": "Client testimonials and reviews from satisfied customers who have worked with Tayyab, a full-stack web developer. Read feedback about web development projects, quality of work, and professional service.",
      "itemListElement": testimonials.map((testimonial, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Review",
          "@id": `${baseUrl}/#${testimonial.id}`,
          "author": {
            "@type": "Person",
            "name": testimonial.clientName,
            "jobTitle": testimonial.clientRole,
            ...(testimonial.clientCompany && {
              "worksFor": {
                "@type": "Organization",
                "name": testimonial.clientCompany
              }
            })
          },
          "reviewBody": testimonial.testimonial,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": testimonial.rating,
            "bestRating": 5,
            "worstRating": 1
          },
          "datePublished": testimonial.date && /^\d{4}$/.test(testimonial.date)
            ? `${testimonial.date}-01-01`
            : testimonial.date || `${new Date().getFullYear()}-01-01`,
          "itemReviewed": {
            "@type": "ProfessionalService",
            "name": "Tayyab - Full Stack Web Development",
            "description": "Professional web development services including full-stack development, React, Node.js, Express, MongoDB, and MERN stack development.",
            "priceRange": "$$",
            "image": "https://thisistayyab.dev/assets/profile-C5yXg1a2.webp",
            "telephone": "+923001234567",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PK",
              "addressLocality": "Remote"
            },
            "serviceType": testimonial.projectType || "Web Development",
            "areaServed": "Worldwide"
          }
        }
      }))
    };

    // Breadcrumb schema for Testimonials section
    const existingBreadcrumb = document.getElementById('testimonials-breadcrumb-data');
    if (!existingBreadcrumb) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#testimonials-breadcrumb`,
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
            "name": "Testimonials",
            "item": `${baseUrl}/#client`
          }
        ]
      };

      const script2 = document.createElement('script');
      script2.id = 'testimonials-breadcrumb-data';
      script2.type = 'application/ld+json';
      script2.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script2);
    }

    // Inject ItemList schema
    const script1 = document.createElement('script');
    script1.id = 'testimonials-structured-data';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    return () => {
      const script1Cleanup = document.getElementById('testimonials-structured-data');
      const script2Cleanup = document.getElementById('testimonials-breadcrumb-data');
      if (script1Cleanup) script1Cleanup.remove();
      if (script2Cleanup) script2Cleanup.remove();
    };
  }, [testimonials]);

  if (loading) {
    return (
      <section className="max-w-[1200px] mx-auto px-4 py-20 relative" id="client" aria-labelledby="client-heading">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="max-w-[1200px] mx-auto px-4 py-20 relative overflow-hidden"
      id="client"
      aria-labelledby="testimonials-heading"
      role="region"
    >
      {/* Blurred Circle Background */}
      <div
        className="absolute w-[350px] h-[350px] bg-purple-500 top-[20%] left-[10%] rounded-full blur-[100px] opacity-[0.15] z-0 animate-float pointer-events-none"
        style={{ animationDelay: '0s' }}
        aria-hidden="true"
      />
      <div
        className="absolute w-[300px] h-[300px] bg-blue-500 bottom-[20%] right-[15%] rounded-full blur-[100px] opacity-[0.12] z-0 animate-float pointer-events-none"
        style={{ animationDelay: '3s' }}
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
        <p
          className="mb-4 text-lg font-semibold uppercase tracking-[2px] bg-gradient-to-r from-[#94a3b8] to-[#60a5fa] bg-clip-text text-transparent"
        >
          Testimonials
        </p>
        <h2
          id="testimonials-heading"
          className="text-4xl font-semibold mb-4 bg-gradient-to-br from-white via-[#94a3b8] to-[#60a5fa] bg-clip-text text-transparent"
        >
          What Clients Say About Me
        </h2>
        <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
          Real feedback from clients who have worked with me on their web development projects
        </p>
      </motion.div>

      {/* Testimonials Carousel */}
      <motion.div
        className="relative z-[2]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Carousel Container */}
        <div
          className="relative max-w-[900px] mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          {/* Carousel Navigation Buttons - Outside card, full height, with icons - Only visible on hover/focus */}
          {showCarousel && (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className={`hidden md:flex absolute left-0 top-0 bottom-0 -translate-x-16 w-16 items-center justify-center cursor-pointer z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-white/80" aria-hidden="true" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className={`hidden md:flex absolute right-0 top-0 bottom-0 translate-x-16 w-16 items-center justify-center cursor-pointer z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-white/80" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Carousel Content - All testimonials rendered in DOM for SEO */}
          <div className="relative overflow-hidden">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.id}
                  id={testimonial.id}
                  itemScope
                  itemType="https://schema.org/Review"
                  className={`h-full ${index === currentIndex ? 'relative z-10' : 'absolute inset-0 pointer-events-none z-0'}`}
                  animate={index === currentIndex ? { opacity: 1, x: 0 } : { opacity: 0, x: index < currentIndex ? -100 : 100 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  {/* Added itemReviewed for Microdata compliance */}
                  <div itemProp="itemReviewed" itemScope itemType="https://schema.org/ProfessionalService" style={{ display: 'none' }}>
                    <meta itemProp="name" content="Tayyab - Full Stack Web Development" />
                    <meta itemProp="description" content="Professional web development services including full-stack development, React, Node.js, Express, MongoDB, and MERN stack development." />
                    <meta itemProp="priceRange" content="$$" />
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <meta itemProp="addressLocality" content="Remote" />
                      <meta itemProp="addressCountry" content="PK" />
                    </div>
                  </div>
                  <Card
                    className="p-8 md:p-12 relative backdrop-blur-[15px] bg-white/[0.03] h-full min-h-[500px] flex flex-col"
                    glowColor="rgba(59, 130, 246, 0.1)"
                    gradientColors={["#3b82f6", "#8b5cf6", "#ec4899"]}
                    hoverScale={true}
                    hoverLift={true}
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 w-16 h-16 rounded-[8px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Quote className="w-8 h-8 text-blue-400" aria-hidden="true" />
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col items-center gap-6 flex-1">
                      {/* Client Image with Platform Badge */}
                      <div className="relative flex flex-col items-center">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-full cursor-pointer">
                          {testimonial.clientImage ? (
                            <img
                              src={testimonial.clientImage}
                              alt={`${testimonial.clientName} - ${testimonial.clientRole}${testimonial.clientCompany ? ` at ${testimonial.clientCompany}` : ''} testimonial. ${testimonial.testimonial.slice(0, 60)}...`}
                              loading="lazy"
                              width={96}
                              height={96}
                              className="w-full h-full rounded-full object-cover object-center border-2 border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 group-hover:border-[rgba(59,130,246,0.4)] group-hover:shadow-[0_16px_50px_rgba(59,130,246,0.2)]"
                              style={{ aspectRatio: '1 / 1' }}
                              onClick={() => setSelectedImage(testimonial.clientImage || null)}
                              itemProp="image"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedImage(testimonial.clientImage || null);
                                }
                              }}
                              aria-label="Click to view full-size client image"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/10 flex items-center justify-center text-2xl md:text-3xl font-bold text-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 group-hover:border-[rgba(59,130,246,0.4)] group-hover:shadow-[0_16px_50px_rgba(59,130,246,0.2)]">
                              {testimonial.clientName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          {/* Glow effect around image */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </div>

                        {/* Platform Badge */}
                        {testimonial.platform && (
                          <Badge
                            className="mt-4 text-xs font-semibold uppercase tracking-[0.5px] rounded-[8px] border bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-500/50 transition-all duration-300"
                            asChild={testimonial.platformUrl ? true : false}
                          >
                            {testimonial.platformUrl ? (
                              <a
                                href={testimonial.platformUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View client profile on ${testimonial.platform}`}
                                className="flex items-center gap-1.5 px-3 py-1.5"
                              >
                                <span>{testimonial.platform}</span>
                              </a>
                            ) : (
                              <span className="flex items-center gap-1.5 px-3 py-1.5">
                                {testimonial.platform}
                              </span>
                            )}
                          </Badge>
                        )}

                        {/* Rating Stars */}
                        <div
                          className="flex items-center justify-center gap-1 mt-3"
                          itemProp="reviewRating"
                          itemScope
                          itemType="https://schema.org/Rating"
                          aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
                        >
                          <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                          <meta itemProp="bestRating" content="5" />
                          <meta itemProp="worstRating" content="1" />
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 transition-all duration-300 ${i < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400 group-hover:scale-110'
                                : 'fill-transparent text-white/20'
                                }`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="text-center flex-1 w-full flex flex-col justify-between">
                        <blockquote
                          className="mb-6 text-[#94a3b8] text-lg md:text-xl leading-[1.8] font-normal relative z-[2] px-4 flex-1"
                          itemProp="reviewBody"
                        >
                          <span className="text-4xl text-blue-400/30 font-serif leading-none absolute -top-2 -left-2">"</span>
                          <span className="relative z-[1]">{testimonial.testimonial}</span>
                          <span className="text-4xl text-blue-400/30 font-serif leading-none absolute -bottom-6 -right-2">"</span>
                        </blockquote>

                        {/* Client Info */}
                        <div className="border-t border-white/10 pt-6 mt-auto">
                          <h3
                            className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"
                            itemProp="author"
                            itemScope
                            itemType="https://schema.org/Person"
                          >
                            <span itemProp="name">{testimonial.clientName}</span>
                          </h3>
                          <p className="text-[#94a3b8] text-base">
                            <span itemProp="jobTitle">{testimonial.clientRole}</span>
                            {testimonial.clientCompany && (
                              <>
                                {' '}• <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                                  <span itemProp="name">{testimonial.clientCompany}</span>
                                </span>
                              </>
                            )}
                          </p>
                          {testimonial.projectType && (
                            <p className="text-sm text-[#94a3b8]/70 mt-2">
                              <span className="font-medium">Project:</span> {testimonial.projectType}
                            </p>
                          )}
                          {testimonial.date && (
                            <meta itemProp="datePublished" content={testimonial.date} />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          {showCarousel && (
            <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial carousel indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'w-8 bg-blue-500'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                />
              ))}
            </div>
          )}
        </div>

        {/* Image Modal - Rendered via Portal to ensure it's above navbar */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(10,10,20,0.85)] backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).classList.contains("fixed")) {
                    setSelectedImage(null);
                  }
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Full-size client image"
              >
                <motion.article
                  className="bg-[rgba(30,30,47,0.95)] backdrop-blur-[20px] text-white p-6 sm:p-10 rounded-3xl max-w-[700px] w-[90%] max-h-[90vh] overflow-y-auto relative shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.2)] border border-white/10 cursor-default"
                  initial={{ scale: 0.8, opacity: 0, y: -50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 border border-white/20 rounded-[10px] text-white text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out z-10 hover:bg-white/20 hover:border-white/30 hover:rotate-90 hover:scale-110 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close image modal"
                  >
                    <X size={20} aria-hidden="true" />
                    <span className="sr-only">Close modal</span>
                  </button>

                  <img
                    src={selectedImage}
                    alt="Full-size client testimonial image"
                    className="w-full rounded-2xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                    loading="lazy"
                  />
                </motion.article>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </motion.div>

    </section>
  );
}

export default Clients;
