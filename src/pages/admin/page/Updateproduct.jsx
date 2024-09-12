import React, { useState, useContext, useEffect } from 'react';
import myContext from '../../../context/data/myContext';
import { storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        if (state && state.product) {
            setProducts(state.product);
            setFlavors(state.product.flavors || []);
        }
    }, [state, setProducts]);

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

    const handleRemoveFlavor = (index) => {
        const updatedFlavors = flavors.filter((_, i) => i !== index);
        setFlavors(updatedFlavors);
    };

    const handleUpdateProduct = () => {
        // Log the products object to debug the issue
        console.log('Products:', products);

        // Check if all required fields are filled
        if (!products.title || !products.price1 || !products.category || !products.description || !products.weight1) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Check if the image URL or uploaded image is provided
        if (!products.imageUrl && !imageUploaded) {
            setErrorMessage("Please provide an image URL or upload an image.");
            return;
        }

        // Add flavors to the product object before updating
        const updatedProduct = { ...products, flavors };

        // Proceed to update the product if all validations pass
        updateProduct(updatedProduct).then(() => {
            setSuccessMessage('Product successfully updated!');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        }).catch((error) => {
            console.error('Error updating product:', error);
            setErrorMessage('Failed to update product.');
        });
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 px-6 py-8 rounded-xl w-full max-w-lg shadow-lg'>
                <h1 className='text-center text-white text-2xl mb-6 font-semibold'>Update Product</h1>
                {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
                <form className='space-y-4'>
                    <div>
                        <input
                            type="text"
                            name='title'
                            onChange={handleInputChange}
                            value={products.title || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product Name'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='price1'
                            onChange={handleInputChange}
                            value={products.price1 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product price 1'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='price2'
                            onChange={handleInputChange}
                            value={products.price2 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product price 2'
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name='weight1'
                            onChange={handleInputChange}
                            value={products.weight1 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Weight 1'
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name='weight2'
                            onChange={handleInputChange}
                            value={products.weight2 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Weight 2'
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name='image'
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                        />
                        {uploading && <div className="text-yellow-500 mt-2">Uploading image... {uploadProgress.toFixed(0)}%</div>}
                        {imageUploaded && <div className="text-green-500 mt-2">Image successfully uploaded!</div>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name='imageUrl'
                            onChange={handleInputChange}
                            value={products.imageUrl || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product image URL (optional if uploaded)'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name='category'
                            onChange={handleInputChange}
                            value={products.category || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
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
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product Description'>
                        </textarea>
                    </div>

                    {/* Flavours Dropdowns */}
                    <div>
                    <input
                            type="text"
                            name='flavour1'
                            onChange={handleInputChange}
                            value={products.flavour1 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product flavour1'
                        />
                         <input
                            type="text"
                            name='flavour2'
                            onChange={handleInputChange}
                            value={products.flavour2 || ""}
                            className='bg-gray-700 px-4 py-3 w-full rounded-lg text-white placeholder:text-gray-300 outline-none'
                            placeholder='Product flavour2'
                        />
                        
                    </div>

                    {/* Display added flavors with a remove button */}
                    <ul className="mt-4 space-y-2">
                        {flavors.map((flavor, index) => (
                            <li key={index} className="text-white flex justify-between items-center">
                                {flavor}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFlavor(index)}
                                    className="bg-red-600 px-2 py-1 text-white rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        type='button'
                        onClick={handleUpdateProduct}
                        className='bg-green-600 px-4 py-3 w-full rounded-lg text-white font-semibold'>
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
