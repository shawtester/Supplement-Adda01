import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Calculate total price dynamically based on quantity
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20; // You can make this dynamic if needed

  // Sync cartItems with localStorage
  useEffect(() => {
    console.log(cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className={`h-screen pt-5 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items */}
          <div className="rounded-lg md:w-2/3">
            {cartItems.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className={`mb-6 rounded-lg border drop-shadow-xl p-6 sm:flex sm:justify-start ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <img src={item.imageUrl || 'https://dummyimage.com/400x400'} alt={item.title} className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="mt-1 text-xs font-semibold">₹{item.price}</p>
                      <p>Weight: {item.weight} kg</p>
                      <p>Flavour: {item.flavour}</p>
                    </div>
                    {/* Quantity Control */}
                    <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center">
                        <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">-</button>
                        <p className="px-2">{item.quantity}</p>
                        <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">+</button>
                      </div>
                      {/* Remove Item */}
                      <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-4 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className={`mt-6 h-full rounded-lg border p-6 shadow-md md:mt-0 md:w-1/3 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-2 flex justify-between">
              <p>Subtotal</p>
              <p>₹{totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">₹{totalPrice + shipping}</p>
                <p className="text-sm">Including GST</p>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 block rounded-lg bg-blue-600 py-2 text-center text-white hover:bg-blue-700">Checkout</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
