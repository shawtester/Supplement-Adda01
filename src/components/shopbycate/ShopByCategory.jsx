// components/categoryCarousel/CategoryCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Category A",
    imageUrl: "https://assets.hyugalife.com/catalog/product/f/o/fop_mk_2kg.jpg?compress=true&format=webp&q=75&w=300&h=300",
    route: "/category/A",
  },
  {
    title: "Category B",
    imageUrl: "https://assets.hyugalife.com/catalog/product/f/o/fop_mk_2kg.jpg?compress=true&format=webp&q=75&w=300&h=300",
    route: "/category/B",
  },
  {
    title: "Category C",
    imageUrl: "https://assets.hyugalife.com/catalog/product/f/o/fop_mk_2kg.jpg?compress=true&format=webp&q=75&w=300&h=300",
    route: "/category/C",
  },
  {
    title: "Category D",
    imageUrl: "https://assets.hyugalife.com/catalog/product/f/o/fop_mk_2kg.jpg?compress=true&format=webp&q=75&w=300&h=300",
    route: "/category/D",
  },
  // Add more categories as needed
];

const CategoryCarousel = () => {
  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold mb-6 pl-9">Shop By Category</h2>
      <Swiper
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 10 }, // Show 3 items on small screens
          640: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.route}
            className="relative" // Add margin here if needed
          >
            <Link to={category.route} className="w-full h-full block">
            <div className="flex-shrink-0 border-2 border-gray-300 rounded-lg overflow-hidden">
              
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-48 object-contain" // Use object-cover to maintain aspect ratio
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;
