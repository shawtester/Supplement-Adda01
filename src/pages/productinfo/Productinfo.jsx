import React, { useState } from 'react';

function ProductInfo() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex flex-col lg:flex-row items-start">
        {/* Product Image Section */}
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
          <div className="w-full h-0 pb-[100%] relative">
            <img
              alt="product"
              className="absolute top-0 left-0 w-full h-full object-contain"
              src="https://assets.hyugalife.com/catalog/product/h/v/hvpc74t5_1.jpg?compress=true&format=webp&q=75&w=300&h=300"
            />
          </div>
        </div>

        {/* Product Information Section */}
        <div className="lg:w-1/2 w-full lg:pl-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Whoosh Lite Sneakers - White
          </h2>
          <p className="text-gray-500 mb-4">
            A perfect blend of comfort and style. The Whoosh Lite Sneakers are designed for everyday wear with breathable fabric and a lightweight sole.
          </p>

          <div className="flex items-center mb-5">
            <span className="text-2xl font-semibold text-gray-900">$79.99</span>
            <span className="ml-4 text-gray-500 line-through">$99.99</span>
            <span className="ml-4 text-green-500">20% Off</span>
          </div>

          <div className="flex items-center mb-5">
            <span className="mr-4">Size:</span>
            <select className="border-gray-300 border rounded p-2">
              <option>US 6</option>
              <option>US 7</option>
              <option>US 8</option>
              <option>US 9</option>
              <option>US 10</option>
            </select>
          </div>

          <div className="flex items-center mb-5">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border-gray-300 border rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 text-gray-500"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 text-gray-500"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 transition duration-300">
              Add to Cart
            </button>
            <button className="ml-4 bg-gray-200 text-gray-600 px-8 py-2 rounded hover:bg-gray-300 transition duration-300">
              Buy Now
            </button>
          </div>

          <p className="mt-4 text-gray-500">
            Free shipping on orders over $50. Easy returns within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
