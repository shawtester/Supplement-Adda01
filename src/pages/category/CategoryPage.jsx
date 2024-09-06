// pages/category/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCart from '../../components/productCart/ProductCart';
import Layout from '../../components/layout/Layout'

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <Layout>
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Category: {categoryName}</h2>
      <ProductCart category={categoryName} />
    </div>
    </Layout>
    
  );
};

export default CategoryPage;
