import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the external CSS
import A1 from '../../assets/Images/A1.jpg';
import A2 from '../../assets/Images/A2.jpg';
import A3 from '../../assets/Images/A3.jpg';


const images = [A1, A2, A3]; // Array of imported images

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
