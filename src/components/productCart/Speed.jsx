import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/cartSlice';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavour, setSelectedFlavour] = useState(product.flavour1);
  const [selectedWeight, setSelectedWeight] = useState(product.weight1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [timer, setTimer] = useState('');
  const [rating, setRating] = useState(4.5);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const generateRating = () => (Math.random() * (5 - 4.5) + 4.5).toFixed(1);
    setRating(generateRating());

    const savedQuantity = localStorage.getItem(`product-quantity-${product.id}`);
    if (savedQuantity) {
      setQuantity(parseInt(savedQuantity, 10));
      setAddedToCart(true);
    }
  }, [product.id]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const distance = midnight - now;

      if (distance < 0) {
        setTimer('Expired');
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimer(`${hours}h ${minutes}m ${seconds}s left`);
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    
    if (quantity > 0) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price1,
        flavour: selectedFlavour,
        weight: selectedWeight,
        quantity,
      }));
      setAddedToCart(true);
      localStorage.setItem(`product-quantity-${product.id}`, quantity);
    } else {
      console.warn('Quantity must be greater than 0');
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(increaseQuantity(product.id));
    localStorage.setItem(`product-quantity-${product.id}`, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(decreaseQuantity(product.id));
      localStorage.setItem(`product-quantity-${product.id}`, newQuantity);
    } else {
      dispatch(removeFromCart(product.id));
      setQuantity(1);
      localStorage.removeItem(`product-quantity-${product.id}`);
    }
  };

  const handleImageClick = () => {
    navigate(`/productinfo/${product.id}`);
  };

  const handleFlavourClick = (flavour, e) => {
    e.stopPropagation();
    setSelectedFlavour(flavour);
  };

  const handleWeightClick = (weight, e) => {
    e.stopPropagation();
    setSelectedWeight(weight);
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col w-full max-w-xs h-[600px] mx-auto border border-gray-200">
      {/* Image container: 45% of card height */}
      <div className="relative w-full h-[45%] cursor-pointer overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="object-fit:fill w-full h-full p-4"
          onClick={handleImageClick}
        />
        {/* Rating */}
        <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
          <span className="font-bold">{rating}</span>
          <svg className="w-4 h-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
          </svg>
        </div>
        <div style={{ backgroundColor: '#f5deb3', color: '#d2691e' }} className="absolute bottom-0 left-0 p-2 text-xs rounded-tr-lg">
          {timer}
        </div>
      </div>

      {/* Content Section: 55% of card height */}
      <div className="flex flex-col p-4 flex-grow relative">
        {/* Title and Description */}
        <h2 className="text-xl font-semibold mb-2 truncate">{product.title}</h2>
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{product.description}</p>

        {/* Flavour Selection */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {product.flavour1 && (
            <span
              onClick={(e) => handleFlavourClick(product.flavour1, e)}
              className={`cursor-pointer px-2 py-1 rounded-md ${selectedFlavour === product.flavour1 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-700'} hover:bg-blue-200 transition duration-300`}
            >
              {product.flavour1}
            </span>
          )}
          {product.flavour2 && (
            <span
              onClick={(e) => handleFlavourClick(product.flavour2, e)}
              className={`cursor-pointer px-2 py-1 rounded-md ${selectedFlavour === product.flavour2 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-700'} hover:bg-blue-200 transition duration-300`}
            >
              {product.flavour2}
            </span>
          )}
        </div>

        {/* Weight Selection */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {product.weight1 && (
            <span
              onClick={(e) => handleWeightClick(product.weight1, e)}
              className={`cursor-pointer px-2 py-1 rounded-md ${selectedWeight === product.weight1 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-700'} hover:bg-blue-200 transition duration-300`}
            >
              {product.weight1} 
            </span>
          )}
          {product.weight2 && (
            <span
              onClick={(e) => handleWeightClick(product.weight2, e)}
              className={`cursor-pointer px-2 py-1 rounded-md ${selectedWeight === product.weight2 ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-700'} hover:bg-blue-200 transition duration-300`}
            >
              {product.weight2} 
            </span>
          )}
        </div>

        {/* Price Section */}
        <div className="absolute bottom-4 left-4">
          <p className="text-lg font-semibold text-gray-800">₹{product.price1}</p>
          <p className="text-sm text-gray-500 line-through">₹{product.price2}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-4 right-4">
          {addedToCart ? (
            <div className="flex items-center space-x-2">
              <button onClick={handleDecrease} className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600">-</button>
              <span className="font-bold text-lg">{quantity}</span>
              <button onClick={handleIncrease} className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600">+</button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart} 
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
