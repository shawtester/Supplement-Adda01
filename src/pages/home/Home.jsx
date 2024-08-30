import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCart from '../../components/productCart/ProductCart'
import Testimonial from '../../components/testimonial/Testimonial'
import Track from '../../components/track/Track';
import Footer from '../../components/footer/Footer';
import Banner from '../../components/banner/Banner'

const Home = () => {
  return (
    <Layout>
      <HeroSection/>
      <Filter/>
      <ProductCart/>
   
      <Testimonial/>
      <Banner/>
      <Track/>
      <Footer/>
    </Layout>
  
  )
}

export default Home