import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'

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
      
      <HeroSection/>
      
      <ProductCart category="Whey" heading="Category Whey"/>
    
      <Testimonial/>
      <ProductCart category="Isolated" heading="Category Isolated"/>
      <ShopByCategory/>
      <ProductCart category="Gainers" heading="Category Gainers" />
      <ProductCart category="Pre-Workout" heading="Category Pre-Workout"/>
      <ProductCart category="Creatine" heading="Creatine"/>

      <Banner/>
      <Track/>
      <Footer/>
    </Layout>
  
  )
}

export default Home