import React, { useState, useEffect } from "react";

const images = [
  "https://assets.hyugalife.com/banner/feature/01_Huygalife_Marine_Collagen_1440x360_1_1_1.jpg?compress=true&format=webp&q=75&w=1216&h=304",
  "https://assets.hyugalife.com/banner/feature/Web_2__2_2.jpg?compress=true&format=webp&q=75&w=1216&h=304",
  "https://assets.hyugalife.com/banner/feature/Pin_w_HT_web_10_4.jpg?compress=true&format=webp&q=75&w=1216&h=304",
];






const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayInterval = 3000;

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-6x4 mx-auto overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-20 sm:h-80 md:h-96 lg:h-[15rem]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-10"
        onClick={prevSlide}
      >
        &lt;
      </button>

      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-10"
        onClick={nextSlide}
      >
        &gt;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
