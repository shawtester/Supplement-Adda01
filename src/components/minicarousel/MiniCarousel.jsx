import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarouselA.css'; // Import your custom styles here

// Import local images
import Category1 from '../../assets/Images/Category1.jpg';  // Update the image paths accordingly
import Category2 from '../../assets/Images/Category2.jpg';
import Category3 from '../../assets/Images/Category3.jpg'; 
import Category4 from '../../assets/Images/Category4.jpg'; 
import Category5 from '../../assets/Images/Category5.jpg'; 

const MiniCarousel = () => {
  const navigate = useNavigate();

  // Redirect to home page if screen width is larger than 768px (tablet/desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navigate('/'); // Redirect to the homepage
      }
    };

    // Check screen size on component mount
    handleResize();

    // Add resize event listener to handle window size change
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const categories = [
    { id: 1, name: 'Whey', imageUrl:Category1},
    { id: 2, name: 'Isolated', imageUrl:Category2},
    { id: 3, name: 'Gainers', imageUrl:Category3},
    { id: 4, name: 'Pre-Workout', imageUrl:Category4},
    { id: 5, name: 'Creatine',imageUrl:Category5},
  ];

  const handleCardClick = (categoryName) => {
    navigate(`/category/${categoryName}/vertical`);
    console.log("Category Name:", categoryName);

  };

  return (
    <div className="carousel-containerr">
      <div className="carousel-wrapper">
        {categories.map((category) => (
          <div
            key={category.id}
            className="carousel-item"
            onClick={() => handleCardClick(category.name)}
          >
            <img src={category.imageUrl} alt={category.name} className="carousel-image" />
            <div className="carousel-caption">
              <h3>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCarousel;
