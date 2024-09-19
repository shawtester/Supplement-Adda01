import React from 'react'
import Layout from '../../components/layout/Layout'
import Carousel from '../../components/carousel/Carousel';

import ProductCart from '../../components/productCart/ProductCart'
import Testimonial from '../../components/testimonial/Testimonial'
import Track from '../../components/track/Track';
import Footer from '../../components/footer/Footer';
import Banner from '../../components/banner/Banner'
import MiniCarousel from '../../components/minicarousel/MiniCarousel'
import ShopByCategory from '../../components/shopbycate/ShopByCategory'

const Home = () => {
  return (
    <Layout>
      <MiniCarousel/>
      
      <Carousel/>
      
      <ProductCart category="Whey" heading="Category Whey"/>
      <ProductCart category="Isolated" heading="Category Whey"/>
      <ShopByCategory/>
      <ProductCart category="Gainers" heading="Category Whey"/>
      <ProductCart category="Pre-Workout" heading="Category Whey"/>
      <ProductCart category="Creatine" heading="Category Whey"/>
      <ProductCart category="Omega3" heading="Category Whey"/>
      
        
  
      
     
    
      <Testimonial/>
   
      

      <Track/>
      <Footer/>
    </Layout>
  
  )
}

export default Home