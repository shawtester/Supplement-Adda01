import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig'; // Make sure to correctly import your Firestore instance

const ProductImages = () => {
  const productId = 'FiTFDGOk5m8fuQ4MFYrp';
  const [productImages, setProductImages] = useState([]);

  // Fetch the product document from Firestore
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDocRef = doc(fireDB, 'products', productId); // Adjust the path to your Firestore collection
        const productDocSnap = await getDoc(productDocRef);

        if (productDocSnap.exists()) {
          const productData = productDocSnap.data();
          setProductImages(productData.imageUrls); // Get the imageUrls array from the document
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  // Render the first image if available
  return (
    <div className="image-gallery">
      {productImages.length > 0 ? (
        <img
          src={productImages[0]} // Display the first image
          alt={`Product Image 1`}
          className="w-32 h-32 object-cover m-2"
        />
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default ProductImages;
