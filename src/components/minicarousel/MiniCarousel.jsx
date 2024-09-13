import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import CategoryImage1 from '../../assets/Images/Category1.jpg'; // Import local images
import CategoryImage2 from '../../assets/Images/Category2.jpg';
import CategoryImage3 from '../../assets/Images/Category3.jpg';
import CategoryImage4 from '../../assets/Images/Category4.jpg';
import CategoryImage5 from '../../assets/Images/Category5.jpg';

const categories = [
  {
    title: 'Whey',
    imageUrl: CategoryImage1,
    route: '/category/Whey',
  },
  {
    title: 'Creatine',
    imageUrl: CategoryImage2,
    route: '/category/Creatine',
  },
  {
    title: 'Gainers',
    imageUrl: CategoryImage3,
    route: '/category/Gainers',
  },
  {
    title: 'Pre-Workout',
    imageUrl: CategoryImage4,
    route: '/category/Pre-Workout',
  },

  {
    title: 'Isolated',
    imageUrl: CategoryImage5,
    route: '/category/Isolated',
  },
  // Add more categories as needed
];



const ProductCarousel = () => {
  return (
    <div className="w-full py-2 block md:hidden"> {/* Show only on mobile/tablet */}
      <Swiper
        spaceBetween={5}
        navigation={false}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 5 }, // 3 cards on mobile
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
          1280: { slidesPerView: 4, spaceBetween: 15 },
        }}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.route} className="relative">
            <Link to={category.route} className="block">
              <div className="bg-white border border-light-red rounded-lg overflow-hidden shadow-md w-24 h-19"> {/* Adjusted card size */}
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-full object-cover" // Ensures the image fits within the card without cropping
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;