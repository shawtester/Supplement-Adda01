import React, { useState, useEffect } from 'react';


const images = [
  {
    src:'https://media.istockphoto.com/id/519959752/photo/whey-protein-with-dumbbells-and-shaker-sports-bodybuilding-sup.jpg?s=1024x1024&w=is&k=20&c=02ciGv2A_cID00hfA7QDGEtV4fU7Qhekxp440BLnIvI=',
    title: "",
    buttonLabel: "Learn More 1",
    buttonLink: "#"
  },
  {
    src:   "https://media.istockphoto.com/id/623619804/photo/sports-nutrition-with-sports-equipment.jpg?s=1024x1024&w=is&k=20&c=BK38SFblRMy-Q5bbAhlt6AvamRTS6NuQyNHb-aBSgNA=",
    title: "",
    buttonLabel: "Learn More 2",
    buttonLink: "#"
  },
  {
    src:   "https://media.istockphoto.com/id/1297918197/photo/background-with-dumbbells-and-bottle-for-drink-sport-and-fitness-after-work-exercise-in-the.jpg?s=1024x1024&w=is&k=20&c=gNFlR-c5ScQPdilFJsK2UDyGa-1r6M8W-zCqLc1QiTg=",
    title: "",
    buttonLabel: "Learn More 3",
    buttonLink: "#"
  },
  {
    
    src:   "https://media.istockphoto.com/id/1396682358/photo/3d-rendering.jpg?s=1024x1024&w=is&k=20&c=1WW_7DYPzTQZVlPmIfjJK8COImmHQeeGEtXkw5bYKZ0=",
    title: "",
    buttonLabel: "Learn More 3",
    buttonLink: "#"
  },


  {
    
    src:   "https://media.istockphoto.com/id/1396686167/photo/3d-rendering.jpg?s=1024x1024&w=is&k=20&c=EwOFuSUa9wSrW7oC1or0LUbGgUsQWkkUxZI0PTFrCYo=",
    title: "",
    buttonLabel: "Learn More 3",
    buttonLink: "#"
  },
  
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Image container with increased height */}
      <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <h2 className="text-white text-3xl font-bold mb-4">{image.title}</h2>
              {/* Button code removed */}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
