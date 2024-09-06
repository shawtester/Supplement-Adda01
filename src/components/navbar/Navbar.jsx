import React, { Fragment, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { BsFillCloudSunFill } from 'react-icons/bs';
import myContext from '../../context/data/myContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const context = useContext(myContext);
  const { toggleMode, mode } = context;
  const user = JSON.parse(localStorage.getItem('user'));

  // Get total cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/";
  };

  return (
    <div className="bg-white sticky top-0 z-50 overflow-x-hidden">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          {/* Menu code... */}
        </Dialog>
      </Transition.Root>

      {/* Desktop */}
      <header className="relative bg-white">
        <p
          className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '',
            color: mode === 'dark' ? 'white' : '',
          }}
        >
          Get free delivery on orders over ₹300
        </p>

        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === 'dark' ? '#282c34' : '',
            color: mode === 'dark' ? 'white' : '',
          }}
        >
          <div className="flex h-16 items-center justify-between overflow-x-auto">
            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to={'/'} className="flex">
                <div className="flex">
                  <h1
                    className="text-2xl font-bold text-black px-2 py-1 rounded"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    E-Bharat
                  </h1>
                </div>
              </Link>
            </div>

            <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
              <Link
                to={'/order'}
                className="text-sm font-medium text-gray-700"
                style={{ color: mode === 'dark' ? 'white' : '' }}
              >
                Order
              </Link>

              {user?.user?.email === 'aman05cmj@gmail.com' && (
                <Link
                  to={'/dashboard'}
                  className="text-sm font-medium text-gray-700"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Admin
                </Link>
              )}

              {user ? (
                <a
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Logout
                </a>
              ) : (
                <Link
                  to={'/signup'}
                  className="text-sm font-medium text-gray-700"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Signup
                </Link>
              )}

              {/* Search Icon */}
              <Link
                to="/search"
                className="text-gray-700 hover:text-gray-800"
              >
                <FaSearch size={24} style={{ color: mode === 'dark' ? 'white' : '' }} />
              </Link>

              {/* Cart */}
              <Link to={'/cart'} className="relative text-gray-700 hover:text-gray-800">
                <FaShoppingCart size={24} style={{ color: mode === 'dark' ? 'white' : '' }} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs font-bold px-2 py-1">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Dark/Light mode toggle */}
              <div className="flex-shrink-0">
                <BsFillCloudSunFill
                  onClick={toggleMode}
                  className="inline-block text-black bg-white shadow-2xl rounded-full mx-2"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                  size={30}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
