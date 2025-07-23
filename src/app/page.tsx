/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import HeroSection from "@/components/home/HeroSection"
import AboutSection from "@/components/home/AboutSection"
import CoursesSection from "@/components/home/CoursesSection"
import ContactSection from "@/components/home/ContactSection"
import FullPageScroll from "@/components/FullPageScroll";

const LandingPage = () => {
 
  return (
   <div>
    <Header />
     <FullPageScroll>
      {/* Slide 1 */}
      <Hero />
      {/* Slide 2 */}
      <Hero />

      <Hero />
      <Footer/>
    </FullPageScroll>
    
   </div>
  )
};

export default LandingPage;
