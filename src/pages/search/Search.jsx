import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import ProductCart from '../../components/productCart/ProductCart';
import MyContext from '../../context/data/myContext'; // Adjust path if necessary
import CategoryCarousel from '../../components/shopbycate/ShopByCategory';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { getProductData, product } = useContext(MyContext); // Use context to get the products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProductData(); // Fetch products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [getProductData]);

  useEffect(() => {
    const results = product.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, product]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <CategoryCarousel/>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCart
              key={product.id}
              category={product.category}
              heading={product.title}
            />
          ))
        ) : (
          <div className="text-gray-500">No products found</div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
