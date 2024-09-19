import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-gray-100 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Us Section */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-white">About Us</h2>
            <p className="mb-4 leading-relaxed">
            Welcome to Supplement Adda, your premier source for top-tier sports nutrition and wellness supplements. At Supplement Adda, we believe in empowering individuals to achieve their fitness and health goals by providing access to premium-quality products backed by science and innovation.
            </p>
            <p className="text-sm text-gray-300">© 2024 Your Company. All rights reserved.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg">Home</a>
              </li>
              <li>
                <a href="/search" className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg">Products</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg">About</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-blue-400 transition duration-300 text-lg">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 text-white">Contact Us</h2>
            <p className="mb-4 text-lg">
              Email: <a href="mailto:info@yourcompany.com" className="text-blue-400 hover:text-blue-300"> info@supplementadda.in</a>
            </p>
            <p className="text-lg">
              Phone: <a href="tel:+1234567890" className="text-blue-400 hover:text-blue-300">+919315214742
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center mt-12 space-x-8">
        <a href="https://www.instagram.com/thesupplementadda/" target='blank' className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
            <FaInstagram size={28} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
            <FaFacebookF size={28} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
            <FaTwitter size={28} />
          </a>
          
          <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
            <FaLinkedinIn size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
