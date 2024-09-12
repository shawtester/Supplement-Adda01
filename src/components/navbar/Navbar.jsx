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
    <div className="w-full relative">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="ml-auto bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    ✖
                  </button>
                </div>
                <div className="mt-6 px-4">
                  <nav className="space-y-6">
                    <Link to="/order" className="text-gray-700 block">
                      Order
                    </Link>
                    {user?.user?.email === 'aman05cmj@gmail.com' && (
                      <Link to="/dashboard" className="text-gray-700 block">
                        Admin
                      </Link>
                    )}
                    {user ? (
                      <a
                        onClick={logout}
                        className="text-gray-700 block cursor-pointer"
                      >
                        Logout
                      </a>
                    ) : (
                      <Link to="/signup" className="text-gray-700 block">
                        Signup
                      </Link>
                    )}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop */}
      <header className="relative bg-white shadow">
        <p
          className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: mode === 'dark' ? 'red' : '#FF0008', // light red for light mode
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
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="bg-gray-100 p-2 rounded-md text-gray-700"
                onClick={() => setOpen(true)}
              >
                ☰
              </button>
            </div>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to={'/'} className="flex">
                <h1
                  className="text-2xl font-bold text-black px-2 py-1 rounded"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  SUPPLEMENT-ADDA
                </h1>
              </Link>
            </div>

            <div className="ml-auto flex items-center space-x-4 lg:space-x-6">
              {/* Desktop links */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to={'/order'}
                  className="text-sm font-medium pt-4 lg:pt-0"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Order
                </Link>

                {user?.user?.email === 'aman05cmj@gmail.com' && (
                  <Link
                    to={'/dashboard'}
                    className="text-sm font-medium pt-4 lg:pt-0"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    Admin
                  </Link>
                )}

                {user ? (
                  <a
                    onClick={logout}
                    className="text-sm font-medium cursor-pointer pt-4 lg:pt-0"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    Logout
                  </a>
                ) : (
                  <Link
                    to={'/signup'}
                    className="text-sm font-medium pt-4 lg:pt-0"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    Signup
                  </Link>
                )}
              </div>

              {/* Search Icon */}
              <Link to="/search" className="text-gray-700 hover:text-gray-800 pt-4 lg:pt-0">
                <FaSearch size={24} style={{ color: mode === 'dark' ? 'white' : '' }} />
              </Link>

              {/* Cart */}
              <Link to={'/cart'} className="relative text-gray-700 hover:text-gray-800 pt-4 lg:pt-0">
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
                  className="inline-block text-black bg-white shadow-2xl rounded-full mx-2 pt-4 lg:pt-0"
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
