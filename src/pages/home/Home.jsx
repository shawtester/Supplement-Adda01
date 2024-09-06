import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
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
      
      <ProductCart category="A" heading="Category A"/>
    
      <Testimonial/>
      <ProductCart category="B" heading="Category B"/>
      <ShopByCategory/>
      <ProductCart category="C" heading="Category C"/>
      <ProductCart category="D" heading="Category D"/>

      <Banner/>
      <Track/>
      <Footer/>
    </Layout>
  
  )
}

export default Home