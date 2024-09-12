import React from 'react';

export default function Checkout() {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 p-4">
      
      {/* Order Summary Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {/* Map through products here */}
        <div className="flex justify-between border-b py-4">
          <div className="flex gap-4">
            <img src="https://assets.hyugalife.com/catalog/product/h/v/hvpc74t5_1.jpg?compress=true&format=webp&q=75&w=300&h=300" alt="Product" className="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 className="font-semibold">Product Name</h3>
              <p className="text-gray-600">Quantity: 1</p>
            </div>
            
            
          </div>
          <p className="font-bold"> ₹ XX.XX</p>
        </div>



        <div className="flex justify-between border-b py-4">
          <div className="flex gap-4">
            <img src="https://assets.hyugalife.com/catalog/product/h/v/hvpc74t5_1.jpg?compress=true&format=webp&q=75&w=300&h=300" alt="Product" className="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 className="font-semibold">Product Name</h3>
              <p className="text-gray-600">Quantity: 1</p>
            </div>
            
            
          </div>
          <p className="font-bold">$XX.XX</p>
        </div>



        
        {/* End of product mapping */}
        <div className="mt-4 text-right">
          <p className="font-semibold">Total: $XX.XX</p>
        </div>
      </div>

      {/* Payment Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
            <input type="text" id="cardNumber" className="mt-1 block w-full p-2.5 border rounded-md" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input type="text" id="expiryDate" className="mt-1 block w-full p-2.5 border rounded-md" />
            </div>
            <div className="w-1/2">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <input type="text" id="cvv" className="mt-1 block w-full p-2.5 border rounded-md" />
            </div>
          </div>
          <div>
            <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input type="text" id="billingAddress" className="mt-1 block w-full p-2.5 border rounded-md" />
          </div>
          <button type="submit" className="w-full bg-violet-600 text-white p-2.5 rounded-lg">Place Order</button>
        </form>
      </div>
      
    </div>
  );
}
