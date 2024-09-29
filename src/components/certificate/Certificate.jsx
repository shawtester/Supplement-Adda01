import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './certi.css'; // Import custom styles

// Import local images
import cert1 from '../../assets/certificates/certificate1.jpg';
import cert2 from '../../assets/certificates/certificate2.jpg';

// Sample certificate data
const certificates = [
  { id: 1, title: 'Certificate of Achievement', img: cert1 },
  { id: 2, title: 'Certificate of Excellence', img: cert2 },
];

const CertificateCarousel = () => {
  return (
    <div className="certificate-carousel">
      <h2 className="text-2xl font-bold text-center mb-6">Our Certificates</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={1} // Always show one slide
        navigation
        pagination={{ clickable: true }}
      >
        {certificates.map((cert) => (
          <SwiperSlide key={cert.id} className="swiper-slide">
            <div className="certificate-card">
              <img src={cert.img} alt={cert.title} className="certificate-image" />
              <h3 className="certificate-title">{cert.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CertificateCarousel;
