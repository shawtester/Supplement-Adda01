import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Layout from '../../components/layout/Layout';
import { fireDB } from '../../firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { AiOutlineTool, AiOutlineInfoCircle, AiOutlineFileText } from 'react-icons/ai';
import { GiFactory } from 'react-icons/gi';

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [mainImage, setMainImage] = useState(null); // State to hold the main image
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', id);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setMainImage(productData.imageUrls[0]); // Set the first image as the main image initially
          setSelectedWeight(productData.weight1);
          setSelectedFlavor(productData.flavour1);
        } else {
          console.log(`Product with ID ${id} does not exist.`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && selectedWeight && selectedFlavor) {
      const priceToUse = product.price1; // Adjust based on selected attributes
      dispatch(addToCart({
        ...product,
        price: priceToUse,
        flavour: selectedFlavor,
        weight: selectedWeight,
        quantity,
      }));
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image); // Set the clicked thumbnail image as the main image
  };

  const staticData = {
    howToUse: "Use this product by mixing one scoop with 8-10 oz of water or milk. Shake well and enjoy.",
    productInfo: "This is a high-quality product designed for fitness enthusiasts. It includes essential nutrients and vitamins.",
    additionalInfo: "For best results, use in conjunction with a balanced diet and regular exercise.",
    manufacturerInfo: "Manufactured by XYZ Company, known for its commitment to quality and customer satisfaction.",
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="text-sm md:text-base">Back</span>
          </button>

          <div className="lg:w-4/5 mx-auto flex flex-wrap flex-col md:flex-row">
            {/* Left Side with Main Image and Thumbnails */}
            <div className="md:w-1/2 w-full flex">
              <div className="flex flex-col space-y-2 mr-4">
                {product.imageUrls?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="object-cover w-32 h-32 cursor-pointer"
                    onClick={() => handleImageClick(image)} // Handle click event
                  />
                ))}
              </div>
              <div className="relative w-full h-96 max-w-lg overflow-hidden">
                <img
                  src={mainImage} // Use the selected main image
                  alt={product.title}
                  className="object-contain w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* Details on the Right Side */}
            <div className="md:w-1/2 w-full md:pl-10 flex flex-col">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-medium mb-1">{product.title}</h1>

              <p className="leading-relaxed border-b-2 mb-5 pb-5 text-sm md:text-base">{product.description}</p>

              <div className="flex items-center mb-4">
                <span className="title-font font-medium text-xl md:text-2xl text-gray-900">₹{product.price1}</span>
                {product.price2 && (
                  <span className="text-red-500 ml-4 text-lg line-through">₹{product.price2}</span>
                )}
              </div>

              {/* Selectable Weight Buttons */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Select Weight:</h3>
                <div className="flex space-x-2">
                  {product.weight1 && (
                    <button
                      onClick={() => setSelectedWeight(product.weight1)}
                      className={`px-4 py-2 rounded ${selectedWeight === product.weight1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.weight1}
                    </button>
                  )}
                  {product.weight2 && (
                    <button
                      onClick={() => setSelectedWeight(product.weight2)}
                      className={`px-4 py-2 rounded ${selectedWeight === product.weight2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.weight2}
                    </button>
                  )}
                </div>
              </div>

              {/* Selectable Flavor Buttons */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">Select Flavor:</h3>
                <div className="flex space-x-2">
                  {product.flavour1 && (
                    <button
                      onClick={() => setSelectedFlavor(product.flavour1)}
                      className={`px-4 py-2 rounded ${selectedFlavor === product.flavour1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.flavour1}
                    </button>
                  )}
                  {product.flavour2 && (
                    <button
                      onClick={() => setSelectedFlavor(product.flavour2)}
                      className={`px-4 py-2 rounded ${selectedFlavor === product.flavour2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {product.flavour2}
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Additional Sections with Icons */}
          <div className="mt-4">
            <div className="flex items-start mb-5">
              <AiOutlineTool className="text-indigo-600 text-2xl md:text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">How to Use</h3>
                <p className="mt-3 text-gray-500 text-sm md:text-base">{staticData.howToUse}</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <AiOutlineInfoCircle className="text-indigo-600 text-2xl md:text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">Product Information</h3>
                <p className="mt-3 text-gray-500 text-sm md:text-base">{staticData.productInfo}</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <AiOutlineFileText className="text-indigo-600 text-2xl md:text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">Additional Information</h3>
                <p className="mt-3 text-gray-500 text-sm md:text-base">{staticData.additionalInfo}</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <GiFactory className="text-indigo-600 text-2xl md:text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">Manufacturer Info</h3>
                <p className="mt-3 text-gray-500 text-sm md:text-base">{staticData.manufacturerInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
