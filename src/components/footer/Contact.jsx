import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

const Contact = () => {
  return (
    <>
 
    <Navbar/>
    <div className="container mx-auto px-6 py-12 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Contact Us</h1>
      <p className="text-lg mb-6 text-gray-700">
        If you have any questions or need further information, feel free to reach out to us using the contact details below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Information Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <FaEnvelope className="text-blue-600 mr-4" size={24} />
              <p className="text-lg">
                For general inquiries, please email us at{' '}
                <a href="mailto:info@yourcompany.com" className="text-blue-500 hover:text-blue-400">info@supplementadda.in</a>.
              </p>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="text-green-600 mr-4" size={24} />
              <p className="text-lg">
                You can also reach us by phone at{' '}
                <a href="tel:+1234567890" className="text-blue-500 hover:text-blue-400">+919315214742</a>.
              </p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-red-600 mr-4" size={24} />
              <p className="text-lg">
              B-Block, Street No.12, House No.106, Khajoori Khas, Delhi-110094.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
