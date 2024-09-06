import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample data with only images
const productSections = [
  { id: 1, image: 'https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75' },
  { id: 2, image: 'https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75' },
  { id: 3, image: 'https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75' },
  { id: 4, image: 'https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75' }, 
  { id: 5, image: 'https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75' },
  { id: 6, image: 'https://assets.hyugalife.com/banner/feature/Whey_protein_7_.png?compress=true&format=webp&q=75' },
];

const ProductCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4 block sm:hidden"> {/* Show only on mobile screens */}
      <Slider {...settings}>
        {productSections.map((section) => (
          <div key={section.id} className="p-2">
            {/* Card with internal padding removed */}
            <div className="bg-white border border-light-red rounded-lg overflow-hidden shadow-md w-24 h-19">
              <img src={section.image} alt={`Product ${section.id}`} className="w-full h-full object-cover" /> {/* Ensure image covers container */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
