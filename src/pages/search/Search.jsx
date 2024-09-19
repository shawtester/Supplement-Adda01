import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import ProductCart from '../../components/productCart/ProductCart';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig'; // Correct Firebase config import

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch products based on search input
  const fetchSearchResults = async () => {
    setLoading(true); // Show loading before data fetch

    try {
      // Convert the search input to lowercase for case-insensitive search
      const lowerCaseSearchInput = searchInput.toLowerCase();

      // Fetch all products from Firestore
      const querySnapshot = await getDocs(collection(fireDB, 'products'));
      const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Filter products based on the title in a case-insensitive manner
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseSearchInput)
      );

      setFilteredProducts(filtered); // Update the state with the filtered products
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  // Trigger search on input change
  useEffect(() => {
    if (searchInput.trim() === '') {
      // If the search input is empty, clear the filteredProducts
      setFilteredProducts([]);
    } else {
      // Fetch search results when the input changes
      fetchSearchResults();
    }
  }, [searchInput]);

  return (
    <Layout>
      <div className="flex justify-center mt-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a product"
          className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-3/4 sm:w-96"
        />
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCart
              key={product.id}
              title={product.title}
              category={product.category}
              // Pass necessary product details to ProductCart
            />
          ))
        ) : searchInput.trim() === '' ? (
          // Show category products when there's no search input
          <>
            <p className="text-center font-bold text-lg mt-4">
              🔍 <span>Search here for the best products 💪</span>
            </p>
            {/* Display default category products */}
            <ProductCart category="Whey" heading="Category AA" />
            <ProductCart category="Isolated" heading="Category B" />
            <ProductCart category="Gainers" heading="Category C" />
            <ProductCart category="Creatine" heading="Category D" />
            <ProductCart category="Pre-Workout" heading="Category D" />
          </>
        ) : (
          // Message when no matching products are found
          <p className="text-center font-bold text-lg mt-4">
            😔 <span>No products found for the search term.</span>
          </p>
        )
      )}
    </Layout>
  );
};

export default Search;
