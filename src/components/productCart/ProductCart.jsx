import React, { useState, useEffect, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import myContext from '../../context/data/myContext';

const products = [
  // Your product objects here
  {
    id: 51,
    image: "https://assets.hyugalife.com/banner/feature/LactoseIntolerance-TEP-260x340_2_.png?compress=true&format=webp&q=75&w=260",
    title: "Product 1",
    description: "This is a description for product 1.",
    price: "$20",
    rating: 4.5,
  },
  {
    id: 61,
    image: "https://assets.hyugalife.com/banner/feature/ForBeginner-TEP-260x340_1_.png?compress=true&format=webp&q=75&w=260",
    title: "Product 2",
    description: "This is a description for product 2.",
    price: "$30",
    rating: 4.0,
  },
  {
    id: 29,
    image: "https://assets.hyugalife.com/catalog/product/h/s/hsjt16l1_12_.jpg?compress=true&format=webp&q=75&w=300&h=300",
    title: "Product 3",
    description: "This is a description for product 3.",
    price: "$25",
    rating: 3.5,
  },
  {
    id: 32,
    image: "https://assets.hyugalife.com/catalog/product/f/o/fop_no_shadow_uf_1kg.jpg?compress=true&format=webp&q=75&w=300&h=300",
    title: "Product 4",
    description: "This is a description for product 4.",
    price: "$35",
    rating: 5.0,
  },
  {
    id: 42,
    image: "https://assets.hyugalife.com/catalog/product/6/1/61lfd8xjpul._sl1500_.jpg?compress=true&format=webp&q=75&w=300&h=300",
    title: "Product 5",
    description: "This is a description for product 5.",
    price: "$40",
    rating: 4.8,
  },
];

const ProductCrat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsToShow(2);
      setIsMobile(true);
    } else if (window.innerWidth < 1024) {
      setItemsToShow(3);
      setIsMobile(false);
    } else {
      setItemsToShow(4);
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(products.length / itemsToShow) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(products.length / itemsToShow) - 1 : prevIndex - 1
    );
  };

  const translateXValue = (100 / itemsToShow) * currentIndex;

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div {...handlers} className="via-red-500 to-pink-500 py-8">
      <h1 className="text-3xl font-bold text-black ml-9" style={{ color: mode === 'dark' ? 'white' : '' }}>
        Proteins Tailored to Your Goals
      </h1>

      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div className="relative w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translateXValue}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 p-4"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="border rounded-lg bg-white shadow-md h-full flex flex-col justify-between">
                  <div className="w-full h-40 flex justify-center items-center bg-gray-200 rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-500">{product.price}</p>
                    <p className="text-gray-700 text-sm mt-2">{product.description}</p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className={`mr-1 ${index < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditionally render arrows based on screen size */}
        {!isMobile && (
          <>
            {/* Left Arrow */}
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white-600 text-black p-2 mb-4 rounded-full focus:outline-none z-10 shadow-lg hover:bg-blue-700 transition"
              onClick={prevSlide}
            >
              <FaArrowLeft className="text-lg" /> {/* Decreased icon size */}
            </button>

            {/* Right Arrow */}
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white-600 text-black p-2 mb-4 rounded-full focus:outline-none z-10 shadow-lg hover:bg-blue-700 transition"
              onClick={nextSlide}
            >
              <FaArrowRight className="text-lg" /> {/* Decreased icon size */}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCrat;
