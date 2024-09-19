import React from 'react';
import './Test.css'; // Import external CSS

// Testimonial Component
const Testimonial = ({ name, message }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg testimonial-card">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-800">{message}</p>
    </div>
  );
};

// TestimonialPage Component
const TestimonialPage = () => {
  // Static testimonial data
  const testimonials = [
    {
      name: 'Priya Patel',
      message: "I'm so impressed with the quality of supplements I received from Supplement Adda. Not only did they help me achieve my fitness goals faster, but their prompt delivery and helpful customer support made the whole experience seamless. Thank you, Supplement Adda!",
    },
    {
      name: 'Amit Sharma',
      message: 'Supplement Adda exceeded my expectations in every way. From their informative website to the premium-quality products they offer, I couldn\'t be happier with my experience. I\'ll definitely be a returning customer.',
    },
    {
      name: 'Kavita Singh',
      message: 'I\'ve tried many supplement brands in the past, but none compare to Supplement Adda. Their products are effective, reasonably priced, and the customer service is exceptional. I\'m grateful to have found such a reliable source for my fitness needs.',
    },
    {
      name: 'Sandeep Gupta',
      message: 'Supplement Adda has been a game-changer for me. Their supplements have helped me push past my plateaus and achieve new personal bests in my workouts. I can\'t thank them enough for their commitment to quality and customer satisfaction.',
    },
    {
      name: 'Anjali Desai',
      message: 'As a fitness enthusiast, I\'m always on the lookout for high-quality supplements, and Supplement Adda delivers exactly that. Their diverse range of products caters to all my needs, and their attention to detail sets them apart. I\'m a loyal customer for life.',
    },
    {
      name: 'Rajesh Kumar',
      message: 'Supplement Adda has been my go-to for all my fitness needs. Their wide range of products and excellent customer service make them stand out from the rest. I highly recommend them to anyone serious about their health and fitness journey.',
    },
  ];

  return (
    <div className="bg-red-600 p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h1>
      <div className="hidden md:flex testimonial-container">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            name={testimonial.name}
            message={testimonial.message}
          />
        ))}
      </div>
      <div className="md:hidden testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            name={testimonial.name}
            message={testimonial.message}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialPage;
