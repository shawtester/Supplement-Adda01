import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <>
   
    <Navbar/>

    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-8">About Us</h1>
      <p className="text-lg mb-4">
        We are a dedicated team committed to delivering high-quality products that enhance your lifestyle. Our commitment to excellence and innovation drives us to provide the best for our customers.
      </p>
      <p className="text-lg mb-4">
        Our journey began with a passion for creating products that cater to the needs and preferences of our customers. Over the years, we have expanded our range and improved our services to ensure that we meet and exceed your expectations.
      </p>
      <p className="text-lg">
        Thank you for choosing us. We look forward to continuing to serve you with excellence.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default About;
