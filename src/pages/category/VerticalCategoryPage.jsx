import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/cartSlice';
import Layout from '../../components/layout/Layout';
import SmallCrousel from './SmallCrousel'; // Unused import, remove if not needed

SwiperCore.use([Navigation, Pagination, Mousewheel]);

const VerticalPriceDropsSlider = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Redirect if screen width is larger than 1024px
    if (window.innerWidth > 1024) {
      navigate('/'); // Redirect to homepage
      return; // Exit early to avoid further rendering
    }

    const fetchProducts = async () => {
      try {
        const productsRef = collection(fireDB, 'products');
        const q = categoryName ? query(productsRef, where('category', '==', categoryName)) : productsRef;
        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, [categoryName, navigate]); // Add navigate to the dependency array

  const handleAddToCart = (product) => {
    const selectedOption = selectedOptions[product.id] || { weight: null };
    dispatch(addToCart({ ...product, ...selectedOption, quantity: 1 }));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleOptionChange = (id, type, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [id]: {
        ...prevOptions[id],
        [type]: value,
      },
    }));
  };

  return (
    <Layout>
      <div className="relative w-full h-[500px] overflow-hidden bg-white">
        <Swiper
          direction="vertical"
          spaceBetween={20}
          slidesPerView={1}
          mousewheel={true}
          grabCursor={true}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {products.map((product) => {
            const inCart = cartItems.find((item) => item.id === product.id);
            return (
              <SwiperSlide key={product.id} className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="w-full h-[40%]">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover:contain rounded"
                  />
                </div>
                <div className="w-full h-[60%] flex flex-col justify-between text-center p-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-500 line-through">{product.price1}</p>
                    <p className="text-lg font-bold text-red-500">{product.price2}</p>
                    <p className="text-gray-700 mt-2 text-sm line-clamp-3">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    {inCart ? (
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecreaseQuantity(product.id)}
                          disabled={inCart.quantity <= 1}
                          className="px-4 py-2 bg-red-500 text-white rounded-l-lg hover:bg-red-600"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 bg-gray-200">{inCart.quantity}</span>
                        <button
                          onClick={() => handleIncreaseQuantity(product.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Layout>
  );
};

export default VerticalPriceDropsSlider;
