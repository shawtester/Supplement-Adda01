// components/categoryCarousel/CategoryCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import CategoryImage1 from '../../assets/Images/Category1.jpg'; // Import local images
import CategoryImage2 from '../../assets/Images/Category2.jpg';
import CategoryImage3 from '../../assets/Images/Category3.jpg';
import CategoryImage4 from '../../assets/Images/Category4.jpg';

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
    imageUrl: CategoryImage3,
    route: '/category/Isolated',
  },
  // Add more categories as needed
];

const ShopByCategory = () => {
  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold mb-6 pl-9">Shop By Category</h2>
      <Swiper
        spaceBetween={20}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 }, // Adjusted for better fit on small screens
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
            className="relative"
          >
            <Link to={category.route} className="w-full h-full block">
              <div className="flex-shrink-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-48 object-fit:fill" // Corrected class name
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopByCategory;
