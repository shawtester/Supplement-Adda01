

import React from 'react';

const Speed = ({ product }) => {
    return (
        <div className="bg-white border border-light-red rounded-lg overflow-hidden shadow-md flex flex-col w-full h-80 transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-100">
            <div className="flex-shrink-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                />
            </div>
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">₹{product.price}</p>
               
            </div>
        </div>
    );
};

export default Speed;
