import React, { useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { RiMailLine, RiSendPlaneLine } from 'react-icons/ri';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>('');

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('');
    if (!form.current) return;
    
    emailjs.sendForm(
      serviceId,
      templateId,
      form.current,
      publicKey
    )
      .then(
        () => {
          setStatus('Message sent successfully!');
          form.current?.reset();
        },
        () => {
          setStatus('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <section className="section__container contact__container" id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Colorful background elements */}
      <div className="contact__bg-circle contact__bg-circle-1"></div>
      <div className="contact__bg-circle contact__bg-circle-2"></div>
      
      <motion.h2
        className="section__header contact__header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        Contact Me
      </motion.h2>
      
      <motion.p
        className="section__description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        Let's work together to bring your ideas to life. I'm always open to discussing new projects and opportunities.
      </motion.p>

      <motion.form
        className="contact__form"
        ref={form}
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="input__row">
          <div className="contact__input-wrapper">
            <RiMailLine className="contact__input-icon" />
            <input type="text" name="user_name" placeholder="Your Name" required />
          </div>
          <div className="contact__input-wrapper">
            <RiMailLine className="contact__input-icon" />
            <input type="email" name="user_email" placeholder="Your Email" required />
          </div>
        </div>
        <div className="contact__input-wrapper">
          <RiMailLine className="contact__input-icon" />
          <input type="text" name="subject" placeholder="Subject" required />
        </div>
        <div className="contact__input-wrapper">
          <textarea name="message" placeholder="Message" required rows={5}></textarea>
        </div>
        <motion.button
          className="btn contact__submit"
          type="submit"
          whileTap={{ scale: 0.95 }}
        >
          <RiSendPlaneLine size={18} />
          Send Message
        </motion.button>
        {status && (
          <motion.div
            className={`contact__status ${status.includes('success') ? 'contact__status--success' : 'contact__status--error'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {status}
          </motion.div>
        )}
      </motion.form>
    </section>
  );
}

export default Contact;
