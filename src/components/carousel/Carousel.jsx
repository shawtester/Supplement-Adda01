import React, { useState, useEffect } from 'react';
import './arousel.css'; // Updated external CSS
import A1 from '../../assets/Images/A1.jpg';
import A2 from '../../assets/Images/A2.jpg';
import A3 from '../../assets/Images/A3.jpg';

const images = [A1, A2, A3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="C">
      <div
        className="C-W"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="C-S">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button className="C-A left" onClick={prevSlide}>
        &#10094;
      </button>

      {/* Right Arrow */}
      <button className="C-A right" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="C-Dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`C-Dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
