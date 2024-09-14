import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate, useParams } from 'react-router-dom';

const VerticalCategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slider, setSlider] = useState(null); // To store the slider instance
  const [lastTap, setLastTap] = useState(0); // To store the last tap time
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productQuery = categoryName
        ? query(collection(fireDB, "products"), where("category", "==", categoryName))
        : query(collection(fireDB, "products"));
      const querySnapshot = await getDocs(productQuery);
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    if (slider) {
      slider.slickGoTo(0); // Move to the first slide after loading
    }
  }, [slider, products]);

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(productToAdd));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Function to handle double-tap gesture
  const handleDoubleTap = (id) => {
    const now = Date.now();
    if (now - lastTap < 300) { // 300ms threshold for double-tap
      handleProductClick(id);
    }
    setLastTap(now);
  };

  const settings = {
    dots: false,
    infinite: true, // Enable infinite scrolling
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true, // Enable vertical sliding
    verticalSwiping: true, // Enable vertical swiping
    nextArrow: null, // Remove next arrow
    prevArrow: null, // Remove prev arrow
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-8 relative overflow-hidden">
      <h2 className="text-left text-2xl font-bold mb-4">
        {categoryName ? `Products in ${categoryName}` : "All Products"}
      </h2>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-2xl font-extrabold text-gray-800">We Are Finding the Best Products for You</p>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products.length === 0 ? (
        <p>No products available for category {categoryName}</p>
      ) : (
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleAddToCart(product)}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 object-cover rounded-md"
                onTouchEnd={() => handleDoubleTap(product.id)} // Handle double-tap
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 mt-2">${product.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default VerticalCategoryPage;
