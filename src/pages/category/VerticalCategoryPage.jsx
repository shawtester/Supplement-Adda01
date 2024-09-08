import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SmallCarousel from './SmallCrousel';
import Layout from '../../components/layout/Layout';
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addToCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice'; // Import the decreaseQuantity action

const VerticalCategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Handle Add to Cart button
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // If product is already in the cart, increase quantity
      dispatch(increaseQuantity(product.id));
    } else {
      // Add product with quantity 1 if it's not in the cart
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  // Handle increasing the product quantity
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Handle decreasing the product quantity
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Handle product card click to navigate to product detail page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Fetch products based on categoryName
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productQuery = categoryName
        ? query(collection(fireDB, "products"), where("category", "==", categoryName))
        : query(collection(fireDB, "products"));
      const querySnapshot = await getDocs(productQuery);
      const allProducts = querySnapshot.docs.map(doc => {
        const productData = doc.data();
        // Convert Firestore timestamp to a serializable format
        if (productData.time && productData.time.toDate) {
          productData.time = productData.time.toDate().toISOString();
        }
        return { id: doc.id, ...productData };
      });
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navigate('/');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="w-full py-4 px-2">
        <SmallCarousel />
        <p className="mb-4">
          <b>Why Protein</b><br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus officia porro sit minus dolore dolor, sunt possimus, sequi repellendus similique consectetur. Excepturi libero obcaecati repellendus, voluptatem eum a velit, dolor mollitia vitae, possimus necessitatibus quo commodi natus quam qui similique nesciunt temporibus ducimus. Recusandae provident explicabo laudantium rerum, magni aspernatur!
        </p>

        <h1 className="text-2xl font-bold mb-4">Products in {categoryName}</h1>
        <div className="flex flex-col space-y-6">
          {products.map((product) => {
            const cartItem = cartItems.find(item => item.id === product.id); // Check if the item is in the cart

            return (
              <div key={product.id} className="bg-white border border-light-red rounded-lg overflow-hidden shadow-md flex items-center p-4">
                <div className="flex-shrink-0" onClick={() => handleProductClick(product.id)}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-xl font-bold mb-4">{product.price}</p>

                  {cartItem ? (
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none"
                        onClick={() => handleDecreaseQuantity(product.id)} // Decrease quantity
                      >
                        -
                      </button>
                      <span>{cartItem.quantity}</span> {/* Show current quantity */}
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={() => handleIncreaseQuantity(product.id)} // Increase quantity
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                      onClick={() => handleAddToCart(product)} // Add to cart if not already in cart
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default VerticalCategoryPage;
