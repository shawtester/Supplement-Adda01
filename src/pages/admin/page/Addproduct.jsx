import React, { useState, useContext } from 'react';
import myContext from '../../../context/data/myContext';
import { storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [message, setMessage] = useState('');
    const [imageFiles, setImageFiles] = useState([{ file: null }]); // Array to hold image files

    const handleInputChange = (e) => {
        setProducts({
            ...products,
            [e.target.name]: e.target.value || ""
        });
    };

    const handleImageChange = (index, files) => {
        const newFiles = [...imageFiles];
        newFiles[index].file = files[0]; // Store the file for the specific input
        setImageFiles(newFiles);
    };

    const handleAddImageInput = () => {
        setImageFiles([...imageFiles, { file: null }]); // Add a new input for another image
    };

    const handleImageUpload = () => {
        const uploadPromises = [];
        setUploading(true);
        setMessage(''); // Clear messages before starting upload
        setUploadProgress([]); // Reset upload progress

        imageFiles.forEach(({ file }, index) => {
            if (!file) return; // Skip if no file is selected

            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            const progressHandler = (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress((prev) => {
                    const updatedProgress = [...prev];
                    updatedProgress[index] = progress; // Update progress for the specific image
                    return updatedProgress;
                });
            };

            const uploadPromise = new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    progressHandler,
                    (error) => {
                        reject("Failed to upload image. Please try again.");
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });

            uploadPromises.push(uploadPromise);
        });

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                setProducts({ ...products, imageUrls: downloadURLs });
                setImageUploaded(true);
                setUploading(false);
                setMessage('Images successfully uploaded!');
            })
            .catch((error) => {
                setMessage(error);
                setUploading(false);
            });
    };

    const handleFormSubmit = () => {
        handleImageUpload(); // Upload images first
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
                    type="text"
                    name="weight1"
                    onChange={handleInputChange}
                    value={products.weight1 || ""}
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                    placeholder="e.g. 100g, 1kg"
                />
                <input
                    type="text"
                    name="weight2"
                    onChange={handleInputChange}
                    value={products.weight2 || ""}
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                    placeholder="e.g. 100g, 1kg"
                />
                <input
                    type="text"
                    name='flavour1'
                    onChange={handleInputChange}
                    value={products.flavour1 || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Flavour 1'
                />
                <input
                    type="text"
                    name='flavour2'
                    onChange={handleInputChange}
                    value={products.flavour2 || ""}
                    className='bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Flavour 2'
                />

                {/* Render image inputs dynamically */}
                {imageFiles.map((image, index) => (
                    <div key={index} className="flex items-center mb-4">
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(index, e.target.files)}
                            className='bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        />
                    </div>
                ))}

                <button
                    onClick={handleAddImageInput}
                    className='bg-blue-500 text-white font-bold px-4 py-2 rounded-lg mb-4'>
                    Add Another Image
                </button>

                {uploading && <div className="text-yellow-500 mb-4">Uploading images... {uploadProgress.map((progress, index) => (
                    <div key={index}>Image {index + 1}: {progress ? progress.toFixed(0) : 0}%</div>
                ))}</div>}
                {imageUploaded && <div className="text-green-500 mb-4">Images successfully uploaded!</div>}

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
                    onClick={handleFormSubmit}
                    className='bg-yellow-500 w-full text-black font-bold px-4 py-2 rounded-lg'>
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default AddProduct;
