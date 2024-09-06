import React, { useState, useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                setErrorMessage("Image upload failed. Please try again.");
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProducts({ ...products, imageUrl: downloadURL });
                    setImageUploaded(true);
                    setUploading(false);
                    setErrorMessage('Image successfully uploaded!');
                });
            }
        );
    };

    const handleAddProduct = () => {
        // Log the products object to debug the issue
        console.log('Products:', products);

        // Check if all required fields are empty and an image URL or uploaded image is provided
        const isFieldsEmpty = !products.title && !products.price && !products.category && !products.description;

        if (isFieldsEmpty && !products.imageUrl && !imageUploaded) {
            setErrorMessage("Please fill in at least one field or upload an image.");
            return;
        }

        // Validate that all required fields are filled except imageUrl or image file
        if (!products.title || !products.price || !products.category || !products.description) {
            setErrorMessage("All fields are required.");
            return;
        }

        // If the user has not uploaded an image file and has not provided an image URL
        if (!products.imageUrl && !imageUploaded) {
            setErrorMessage("Please provide an image URL or upload an image.");
            return;
        }

        // Proceed to add the product if all validations pass
        addProduct();
        setErrorMessage('Product successfully added!');
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 px-6 py-6 rounded-xl w-full max-w-lg'>
                <h1 className='text-center text-white text-2xl mb-4 font-bold'>Add Product</h1>
                {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
                <div>
                    <input
                        type="text"
                        name='title'
                        onChange={handleInputChange}
                        value={products.title || ""}
                        className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product title'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='price'
                        onChange={handleInputChange}
                        value={products.price || ""}
                        className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product price'
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name='image'
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    />
                    {uploading && <div className="text-yellow-500 mb-4">Uploading image... {uploadProgress.toFixed(0)}%</div>}
                    {imageUploaded && <div className="text-green-500 mb-4">Image successfully uploaded!</div>}
                </div>
                <div>
                    <input
                        type="text"
                        name='imageUrl'
                        onChange={handleInputChange}
                        value={products.imageUrl || ""}
                        className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product image URL (optional if uploaded)'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='category'
                        onChange={handleInputChange}
                        value={products.category || ""}
                        className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product category'
                    />
                </div>
                <div>
                    <textarea
                        cols="30"
                        rows="5"
                        name='description'
                        onChange={handleInputChange}
                        value={products.description || ""}
                        className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Product description'>
                    </textarea>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={handleAddProduct}
                        className='bg-yellow-500 w-full text-black font-bold px-4 py-2 rounded-lg'>
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
