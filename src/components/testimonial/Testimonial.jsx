import React from 'react';

const Testimonial = () => {
  const features = [
    {
      icon: '🌿', // You can replace this with an actual icon or image
      title: 'Natural Products',
      description: 'Only the finest natural ingredients.',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your orders in no time.',
    },
    {
      icon: '💲',
      title: 'Affordable Prices',
      description: 'High-quality products at competitive prices.',
    },
    {
      icon: '🛒',
      title: 'Wide Range',
      description: 'Explore a wide range of products.',
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
