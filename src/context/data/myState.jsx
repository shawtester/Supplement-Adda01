import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query,deleteDoc,doc,setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


function MyState(props) {
  const [mode, setMode] = useState('light');  
  const [loading, setLoading] = useState(false); 

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      setTimeout(()=>{
        window.location.href='/dashboard'
      },1300)
      getProductData()
      closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);


  const edithandle = (item) => {
    setProducts(item)
  }
 
  // update product
  

  const updateProduct = async () => {
    setLoading(true);
    try {
        await setDoc(doc(fireDB, "products", products.id), products);
        toast.success("Product Updated successfully");
        await getProductData(); // Ensure this completes before redirecting
        // Wait a short period before redirecting
        setTimeout(() => {
            setLoading(false); // Ensure loading state is reset
            window.location.href = '/dashboard';
        }, 3000); // 1.5 seconds delay
    } catch (error) {
        console.error("Failed to update product", error);
        toast.error("Failed to update product");
        setLoading(false); // Ensure loading state is reset even if there's an error
    }
    // Reset product state
    setProducts("");
};






  //delete Product

  const deleteProduct = async (item) => {
    setLoading(true);
  
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully');
      getProductData(); // Refresh products after deletion
    } catch (error) {
      toast.error('Product Deletion Failed');
      console.error("Error deleting product: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading,setLoading,
      products, setProducts,addProduct,edithandle,updateProduct,deleteProduct,product,getProductData }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState