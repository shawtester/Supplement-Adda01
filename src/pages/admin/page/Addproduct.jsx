import React, { useState, useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct, fetchProducts } = context;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [message, setMessage] = useState('');  // Manage message state here

    const handleInputChange = (e) => {
        setProducts({
            ...products,
            [e.target.name]: e.target.value || ""
        });
    };

    const handleImageUpload = (file) => {
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);
        setMessage(''); // Clear messages before starting upload

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                setMessage("Failed to upload image. Please try again.");
                setUploading(false);
                return; // Exit the function in case of error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProducts({ ...products, imageUrl: downloadURL });
                    setImageUploaded(true);
                    setUploading(false);
                    setMessage('Image successfully uploaded!'); // Success message for image upload
                });
            }
        );
    };

    const handleFormSubmit = () => {
        addProduct();  
    };


    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 px-6 py-6 rounded-xl w-full max-w-lg'>
                <h1 className='text-center text-white text-2xl mb-4 font-bold'>Add Product</h1>
                {message && <div className={`text-center mb-4 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</div>}
                
                {/* Input fields */}
                <input
                    type="text"
                    name='title'
                    onChange={handleInputChange}
                    value={products.title || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product Name'
                />
                <input
                    type="text"
                    name='price1'
                    onChange={handleInputChange}
                    value={products.price1 || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product price 1'
                />
                <input
                    type="text"
                    name='price2'
                    onChange={handleInputChange}
                    value={products.price2 || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product price 2'
                />
                 <input
  type="text" // Using text type to allow for number + unit
  name="weight1"
  onChange={handleInputChange}
  value={products.weight1 || ""}
  className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
  placeholder="e.g. 100g, 1kg" // Give users an example of expected input
/>

               <input
  type="text" // Using text type to allow for number + unit
  name="weight2"
  onChange={handleInputChange}
  value={products.weight2 || ""}
  className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
  placeholder="e.g. 100g, 1kg" // Give users an example of expected input
/>


                {/* Flavour 1 Display */}
                <input
                    type="text"
                    name='flavour1'
                    onChange={handleInputChange}
                    value={products.flavour1 || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Flavour 1'
                />
                {/* Flavour 2 Display */}
                <input
                    type="text"
                    name='flavour2'
                    onChange={handleInputChange}
                    value={products.flavour2 || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Flavour 2'
                />

                <input
                    type="file"
                    name='image'
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                />

                {uploading && <div className="text-yellow-500 mb-4">Uploading image... {uploadProgress.toFixed(0)}%</div>}
                {imageUploaded && <div className="text-green-500 mb-4">Image successfully uploaded!</div>}
                <input
                    type="text"
                    name='imageUrl'
                    onChange={handleInputChange}
                    value={products.imageUrl || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product image URL (optional if uploaded)'
                />
                <input
                    type="text"
                    name='category'
                    onChange={handleInputChange}
                    value={products.category || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product category'
                />
                <textarea
                    cols="30"
                    rows="5"
                    name='description'
                    onChange={handleInputChange}
                    value={products.description || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product Description'>
                </textarea>
                <button
                    onClick={handleFormSubmit}  // Changed to handleFormSubmit
                    className='bg-yellow-500 w-full text-black font-bold px-4 py-2 rounded-lg'>
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
