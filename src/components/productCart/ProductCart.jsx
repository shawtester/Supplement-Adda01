import React, { useEffect, useState, Suspense, lazy } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = lazy(() => import('./Speed'));

const ProductCart = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Fetch products based on category
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productQuery = category
        ? query(collection(fireDB, "products"), where("category", "==", category))
        : query(collection(fireDB, "products"));
      const querySnapshot = await getDocs(productQuery);
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
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
  }, [category]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      dispatch(increaseQuantity(product.id)); // Increase quantity if item is already in the cart
    } else {
      const productToAdd = {
        ...product,
        quantity: 1,
      };
      dispatch(addToCart(productToAdd)); // Add new item to the cart
    }
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="w-full py-8 relative">
      <h2 className="text-left text-2xl font-bold mb-4">
        {category ? `Products in ${category}` : "All Products"}
      </h2>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-2xl font-extrabold text-gray-800">We Are Finding the Best Products for You</p>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      
      <Suspense fallback={<div>Loading...</div>}>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="mySwiper relative"
        >
          {products.length > 0 ? (
            products.map((product, index) => {
              const cartItem = cartItems.find(item => item.id === product.id); // Check if product is already in cart

              return (
                <SwiperSlide key={index} className="relative">
                  <div onClick={() => handleProductClick(product.id)}>
                    <ProductCard product={product} />
                  </div>
                  
                  <div className="mt-4 flex flex-col items-center space-y-2">
                    {cartItem ? (
                      <div className="flex items-center">
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none"
                          onClick={() => handleDecreaseQuantity(product.id)} // Decrease quantity
                        >
                          -
                        </button>
                        <span className="mx-2">{cartItem.quantity}</span> {/* Show current quantity */}
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none"
                          onClick={() => handleIncreaseQuantity(product.id)} // Increase quantity
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <p>No products available for category {category}</p>
          )}
        </Swiper>
      </Suspense>
    </div>
  );
};

export default ProductCart;
