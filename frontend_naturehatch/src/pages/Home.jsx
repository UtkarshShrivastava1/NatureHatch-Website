import React from 'react'
// import Hero from '../components/Hero'
import  HeroSection from '../components/HeroSection'
import BestSeller from '../components/NewBestSeller'
import PremiumEggCollection from '../components/NewLatestCollection'
// import OurPolicy from '../components/OurPolicy'
// import Login from './Login'

const Home = () => {
  return (
    <div>
      
      <HeroSection/>
      {/* <HeroSection/> */}
      <PremiumEggCollection/>
      <BestSeller/> 
      {/* <OurPolicy/> */}
    </div>
  )
}

export default Home
