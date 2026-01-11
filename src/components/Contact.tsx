import { useEffect, useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { RiMailLine, RiSendPlaneLine, RiUserLine, RiMessageLine } from 'react-icons/ri';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface InputWrapperProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function InputWrapper({ icon, children, className }: InputWrapperProps) {
  return (
    <div
      className={cn(
        "relative group",
        "bg-white/5 backdrop-blur-[10px]",
        "border border-white/10 rounded-lg",
        "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "overflow-hidden",
        "focus-within:border-blue-500/40",
        "focus-within:shadow-[0_8px_24px_rgba(59,130,246,0.15)]",
        className
      )}
    >
      {/* Top gradient border on focus */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-0.5",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
          "scale-x-0 origin-left transition-transform duration-300 ease-in-out",
          "group-focus-within:scale-x-100"
        )}
        aria-hidden="true"
      />
      
      {/* Icon */}
      <div
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2",
          "text-white/50 transition-colors duration-300",
          "group-focus-within:text-blue-500",
          "z-10 pointer-events-none"
        )}
      >
        {icon}
      </div>
      
      {/* Input/Textarea */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseUrl = 'https://thisistayyab.dev';

  // Inject structured data for SEO
  useEffect(() => {
    const existingScript = document.getElementById('contact-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${baseUrl}/#contact`,
      "name": "Contact Tayyab - Full Stack Developer",
      "description": "Get in touch with Tayyab, a full-stack web developer specializing in React, Node.js, Express, MongoDB, and MERN stack development. Available for freelance projects, collaborations, and web development opportunities.",
      "url": `${baseUrl}/#contact`,
      "mainEntity": {
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
      "potentialAction": {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/#contact`,
          "actionPlatform": [
            "http://schema.org/WebSite",
            "https://schema.org/EmailAction"
          ]
        },
        "result": {
          "@type": "Message",
          "name": "Contact Form Submission"
        }
      }
    };

    const script = document.createElement('script');
    script.id = 'contact-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById('contact-structured-data');
      if (cleanup) cleanup.remove();
    };
  }, []);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    
    if (!form.current) {
      return;
    }
    
    // Get form data
    const formData = new FormData(form.current);
    const name = (formData.get('user_name') as string)?.trim();
    const email = (formData.get('user_email') as string)?.trim();
    const subject = (formData.get('subject') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();
    
    // Validate all fields
    if (!name) {
      setStatus({
        type: 'error',
        message: 'Please enter your name.'
      });
      return;
    }
    
    if (!email) {
      setStatus({
        type: 'error',
        message: 'Please enter your email address.'
      });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    if (!subject) {
      setStatus({
        type: 'error',
        message: 'Please enter a subject.'
      });
      return;
    }
    
    if (!message) {
      setStatus({
        type: 'error',
        message: 'Please enter a message.'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );
      
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      form.current.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly at thisistayyab@outlook.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="max-w-[1200px] mx-auto px-4 py-20 pb-32 relative overflow-hidden min-h-[600px]"
      id="contact"
      aria-labelledby="contact-heading"
      role="region"
      style={{ scrollMarginTop: '200px' }}
    >
      {/* Floating background circles */}
      <div
        className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-purple-500 rounded-full blur-[100px] opacity-[0.15] z-0 animate-float"
        aria-hidden="true"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-[20%] left-[15%] w-[300px] h-[300px] bg-pink-500 rounded-full blur-[100px] opacity-[0.12] z-0 animate-float"
        aria-hidden="true"
        style={{ animationDelay: '3s' }}
      />

      {/* Header */}
      <motion.div
        className="relative z-[2] text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2
          id="contact-heading"
          className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white via-slate-300 to-blue-400 bg-clip-text text-transparent"
        >
          Contact Me
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Let's work together to bring your ideas to life. I'm always open to discussing new projects, creative opportunities, and innovative solutions.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-[700px] mx-auto relative z-[2] space-y-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
        aria-label="Contact form"
        noValidate
      >
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="user_name" className="sr-only">
              Your Name
            </label>
            <InputWrapper icon={<RiUserLine size={20} />}>
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-slate-400/70 outline-none text-base"
                aria-label="Your name"
                aria-required="true"
              />
            </InputWrapper>
          </div>

          <div className="space-y-2">
            <label htmlFor="user_email" className="sr-only">
              Your Email
            </label>
            <InputWrapper icon={<RiMailLine size={20} />}>
              <input
                type="email"
                id="user_email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-slate-400/70 outline-none text-base"
                aria-label="Your email address"
                aria-required="true"
              />
            </InputWrapper>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <InputWrapper icon={<RiMailLine size={20} />}>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
              className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-slate-400/70 outline-none text-base"
              aria-label="Message subject"
              aria-required="true"
            />
          </InputWrapper>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <div
            className={cn(
              "relative group",
              "bg-white/5 backdrop-blur-[10px]",
              "border border-white/10 rounded-lg",
              "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "overflow-hidden",
              "focus-within:border-blue-500/40",
              "focus-within:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
            )}
          >
            {/* Top gradient border on focus */}
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-0.5",
                "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                "scale-x-0 origin-left transition-transform duration-300 ease-in-out",
                "group-focus-within:scale-x-100"
              )}
              aria-hidden="true"
            />
            
            {/* Icon - positioned at top for textarea */}
            <div
              className={cn(
                "absolute left-3 top-4",
                "text-white/50 transition-colors duration-300",
                "group-focus-within:text-blue-500",
                "z-10 pointer-events-none"
              )}
            >
              <RiMessageLine size={20} />
            </div>
            
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              required
              rows={5}
              className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-slate-400/70 resize-y min-h-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              aria-label="Your message"
              aria-required="true"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="pt-2"
        >
          <Button
            type="submit"
            variant="default"
            className="w-full gap-2 cursor-pointer"
            disabled={isSubmitting}
            aria-label="Send message"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RiSendPlaneLine size={18} />
                Send Message
              </>
            )}
          </Button>
        </motion.div>

        {/* Status Alert */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant={status.type === 'error' ? 'destructive' : 'default'}
              className={cn(
                status.type === 'success' && "bg-green-500/10 border-green-500/30 text-green-400",
                status.type === 'error' && "bg-red-500/10 border-red-500/30"
              )}
              role="alert"
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="size-4 text-green-400" />
              ) : (
                <XCircle className="size-4 text-red-400" />
              )}
              <AlertDescription className={cn(
                status.type === 'success' && "text-green-400",
                status.type === 'error' && "text-red-400"
              )}>
                {status.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </motion.form>
    </section>
  );
}

export default Contact;
