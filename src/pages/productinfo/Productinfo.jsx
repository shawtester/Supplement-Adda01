import React from 'react';
import Layout from '../../components/layout/Layout';
import ReactImageMagnify from 'react-image-magnify';

function ProductInfo() {
    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-4 py-16 mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="relative w-full lg:w-1/2 px-4">
                            <div className="relative">
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: 'Product Image',
                                            isFluidWidth: true,
                                            src: 'https://assets.hyugalife.com/catalog/product/a/t/atom_isolate_1kg_choco_hazel_front.png?compress=true&format=webp&q=75&w=300&h=300'
                                        },
                                        largeImage: {
                                            src: 'https://dummyimage.com/1200x1200',
                                            width: 1200,
                                            height: 1200
                                        },
                                        lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
                                        enlargedImageContainerStyle: {
                                            position: 'absolute',
                                            right: '-320px', // Adjust based on your layout
                                            top: '0',
                                            width: '300px',
                                            height: '300px',
                                            overflow: 'hidden',
                                            border: '1px solid #ccc',
                                            zIndex: 10 // Ensure it appears above other content
                                        },
                                        enlargedImageStyle: {
                                            width: '100%',
                                            height: '100%'
                                        }
                                    }}
                                />
                                <img
                                    alt="Product"
                                    src="https://dummyimage.com/600x600"
                                    className="object-cover object-center rounded"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0 relative">
                            <div className="absolute inset-0 bg-gray-100 p-6 flex flex-col justify-between">
                                <div className="mb-6">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                                        BRAND NAME
                                    </h2>
                                    <h1 className="text-gray-900 text-2xl lg:text-3xl title-font font-medium mb-3">
                                        The Catcher in the Rye
                                    </h1>
                                    <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                        Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                                        sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps
                                        cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
                                        tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean
                                        shorts keytar banjo tattooed umami cardigan.
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        $58.00
                                    </span>
                                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                        Add To Cart
                                    </button>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
