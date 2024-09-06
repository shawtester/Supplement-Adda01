import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Layout from '../../components/layout/Layout';
import { fireDB } from '../../firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import ReactImageMagnify from 'react-image-magnify';
import { AiOutlineTool, AiOutlineInfoCircle, AiOutlineFileText, AiOutlineTags } from 'react-icons/ai';
import { GiFactory } from 'react-icons/gi';

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(fireDB, 'products', id);
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
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
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  // Static data for additional sections
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
        <div className="container px-5 py-32 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full flex justify-center">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.title,
                    isFluidWidth: true,
                    src: product.imageUrl
                  },
                  largeImage: {
                    src: product.imageUrl,
                    width: 1200,
                    height: 1800
                  },
                  enlargedImageContainerStyle: {
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                  }
                }}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <p className="leading-relaxed border-b-2 mb-5 pb-5">
                {product.description}
              </p>
              <div className="flex items-center mb-4">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
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
          <div className="mt-10">
            <div className="flex items-start mb-5">
              <AiOutlineTool className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">How to Use</h3>
                <p className="mt-3 text-gray-500">{staticData.howToUse}</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <AiOutlineInfoCircle className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">Product Information</h3>
                <p className="mt-3 text-gray-500">{staticData.productInfo}</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <AiOutlineFileText className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">Additional Information</h3>
                <p className="mt-3 text-gray-500">{staticData.additionalInfo}</p>
              </div>
            </div>
            <div className="flex items-start">
              <GiFactory className="text-indigo-600 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">Manufacturer Info</h3>
                <p className="mt-3 text-gray-500">{staticData.manufacturerInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
