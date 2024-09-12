import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title: '',
    price1: '',
    price2: '',
    imageUrl: '',
    category: '',
    description: '',
    weight1: '',
    weight2: '',
    flavour1: '',   // New field for Flavour 1
    flavour2: '',   // New field for Flavour 2
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [product, setProduct] = useState([]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  // Add Product
// Add Product
const addProduct = async () => {
  // Check if all required fields are filled
  if (
    !products.title || !products.price1 ||
    !products.weight1 || !products.imageUrl ||
    !products.category || !products.description
  ) {
    return toast.error("All fields are required");
  }

  setLoading(true);

  try {
    // Add the product to Firestore
    const productRef = collection(fireDB, 'products');
    await addDoc(productRef, products);
    toast.success("Product added successfully");

    // Reset form fields
    setProducts({
      title: '',
      price1: '',
      price2: '',
      imageUrl: '',
      category: '',
      description: '',
      weight1: '',
      weight2: '',
      flavour1: '',   // Reset flavour fields
      flavour2: '',   // Reset flavour fields
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });

    // Optionally redirect after adding product
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 800);

  } catch (error) {
    // If product fails to add
    console.log(error);
    toast.error("Failed to add product");
  } finally {
    setLoading(false);
  }

  // Call getProductData after successfully adding the product
  await getProductData();
};

  
    
  

  // Get Product Data
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // Edit product
  const edithandle = (item) => {
    console.log('Selected product for editing:', item);
    setProducts(item);
  };

  // Update Product
  const updateProduct = async (product) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", product.id), product);
      toast.success("Product updated successfully");
      await getProductData();
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'products', item.id));
      toast.success('Product Deleted successfully');
      getProductData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle input changes for product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, edithandle, addProduct, updateProduct, deleteProduct, product, getProductData, handleInputChange
    }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
