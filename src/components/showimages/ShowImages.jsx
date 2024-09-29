import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles

// Import local images
import img1 from '../../assets/Show/slide1.png';
import img2 from '../../assets/show/slide2.png';
import img3 from '../../assets/show/slide3.png';
import img4 from '../../assets/show/slide4.png';
import img5 from '../../assets/show/slide5.png';
import img6 from '../../assets/show/slide6.png';
import img7 from '../../assets/show/slide7.png'

const CarouselComponent = () => {
  const slides = [
    { id: 1, img: img1, title: "DIGESTION" },
    { id: 2, img: img2, title: "HAIRLOSS" },
    { id: 3, img: img3, title: "MUSCLE RECOVERY" },
    { id: 4, img: img4, title: "HEALTHY AGING" },
    { id: 5, img: img5, title: "HAIRLOSS" },
    { id: 6, img: img6, title: "WEIGHT MANAGEMENT" },
    { id: 7, img: img7, title: "STRESS,SLEEP & FOCUS" },
  ];

  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const getBackgroundColor = (index) => {
    return index % 2 === 0 ? 'bg-red-500' : 'bg-green-500';
  };

  const slideToPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const slideToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="relative w-full mt-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-6">
        Tackle Your Biggest Worries This Month
      </h2>

      <Swiper
        ref={swiperRef}
        className="swiper-container"
        spaceBetween={20}
        slidesPerView={4}
        onSlideChange={onSlideChange}
        loop={false}
        speed={600}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className={`flex flex-col items-center transition-transform duration-300 transform hover:scale-105 shadow-lg`}>
              {/* Image with Margin and Shadow */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-64 object-cover:contain m-4 shadow-md rounded-lg"
              />
              {/* Title Background with Alternating Color and Maximum Rounded Bottom Corners */}
              <div className={`w-full p-6 text-white text-center h-24 flex items-center justify-center ${getBackgroundColor(index)} text-xl font-bold rounded-b-3xl`}>
                {slide.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Arrow Button */}
      {currentIndex > 0 && (
        <button
          className="absolute z-50 top-1/2 left-4 transform -translate-y-1/2 text-2xl text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
          onClick={slideToPrev}
        >
          &#10094; {/* HTML Entity for left arrow */}
        </button>
      )}

      {/* Right Arrow Button */}
      {currentIndex < slides.length - 1 && (
        <button
          className="absolute z-50 top-1/2 right-4 transform -translate-y-1/2 text-2xl text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
          onClick={slideToNext}
        >
          &#10095; {/* HTML Entity for right arrow */}
        </button>
      )}
    </div>
  );
};

export default CarouselComponent;
