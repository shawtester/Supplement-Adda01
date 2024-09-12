import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';


const categories = [
  {
    title: "Category Whey ",
    imageUrl: "https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75",
    route: "/category/Whey/vertical",
  },
  {
    title: "Category B",
    imageUrl: "https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75",
    route: "/category/B/vertical",
  },
  {
    title: "Category C",
    imageUrl: "https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75",
    route: "/category/C/vertical",
  },
  {
    title: "Category D",
    imageUrl: "https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75",
    route: "/category/D/vertical",
  },
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