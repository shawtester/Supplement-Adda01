import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Small.css'; // Custom CSS file

const Carousel = () => {
  const images = [
    'https://assets.hyugalife.com/banner/feature/JUNE-BAU-HPB-Web-1440x360_2__11.png?compress=true&format=webp&q=100&w=1216&h=304',
    'https://assets.hyugalife.com/banner/feature/JUNE-BAU-HPB-Web-1440x360_2__11.png?compress=true&format=webp&q=100&w=1216&h=304',
    'https://assets.hyugalife.com/banner/feature/JUNE-BAU-HPB-Web-1440x360_2__11.png?compress=true&format=webp&q=100&w=1216&h=304',
  ];

  
  
    // Slick slider settings with dots enabled
    const settings = {
      dots: true, // Enable dots
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      swipeToSlide: true,
      arrows: false, // Disable arrows
    };
  
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Carousel;
  