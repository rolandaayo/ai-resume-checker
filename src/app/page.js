import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Content from './components/Content'
import Footer from './components/Footer'

export default function page() {
  return (
    <div>
      <Navbar/> 
      <Hero/>
      <Content/>
      <Footer/>
    </div>
  )
}
