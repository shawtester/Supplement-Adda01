import React, { useEffect, useState, Suspense, lazy } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = lazy(() => import('./Speed'));

const ProductCart = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productQuery = category
        ? query(collection(fireDB, "products"), where("category", "==", category))
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
  }, [category]);

  const handleAddToCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: 1, // Set default quantity to 1
    };
    dispatch(addToCart(productToAdd));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);  // Navigate to the product info page
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
          navigation
          modules={[Navigation]}
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
            products.map((product, index) => (
              <SwiperSlide key={index} className="relative">
                <div onClick={() => handleProductClick(product.id)}>
                  <ProductCard product={product} />
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </SwiperSlide>
            ))
          ) : (
            <p>No products available for category {category}</p>
          )}
        </Swiper>
      </Suspense>
    </div>
  );
};

export default ProductCart;
