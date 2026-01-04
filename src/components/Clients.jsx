import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import client1 from '../assets/client-1.webp';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

function Clients() {
  return (
    <section className="section__container client__container" id="client" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Colorful background circles */}
      <div className="client__bg-circle client__bg-circle-1"></div>
      <div className="client__bg-circle client__bg-circle-2"></div>
      
      <motion.p
        className="section__subheader"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        Testimonials
      </motion.p>
      
      <motion.h2
        className="section__header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        What Clients Say About Me
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          className="swiper"
        >
          <SwiperSlide>
            <div className="client__card">
              <img className='client__img' src={client1} alt="client" />
            </div>
          </SwiperSlide>
        {/* <SwiperSlide>
          <div className="client__card">
            <img src={client2} alt="client" />
            <div>
              <p>
                His expertise in managing our Shopify store has been a game-changer. From product listings to seamless integrations and performance optimization, everything is handled with precision. Our sales have increased, the customer experience has improved, and we finally have peace of mind knowing our store is in expert hands.
              </p>
              <h4>Hafiz Abeer Ahmad <span>Marketing Director</span></h4>
              <div className="client__ratings">
                <span><RiStarFill /></span>
                <span><RiStarFill /></span>
                <span><RiStarFill /></span>
                <span><RiStarFill /></span>
                <span><RiStarFill /></span>
              </div>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>
      </motion.div>
    </section>
  );
}

export default Clients; 