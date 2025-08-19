/* eslint-disable @next/next/no-img-element */
"use client";

import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 overflow-hidden">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center md:text-left px-6 md:px-12"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Explore the World with Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-lg">
          Discover unique destinations and unforgettable experiences.
        </p>
        <Link
          href="#destinations"
          className="inline-block mt-6 px-6 py-3 rounded-2xl bg-blue-600 text-white text-lg font-medium shadow-lg hover:bg-blue-700 transition"
        >
          Start Your Journey
        </Link>
      </motion.div>

      {/* Right 3D Scene from Spline */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-[350px] h-[350px] md:w-[600px] md:h-[600px]"
      >
        <Spline scene="https://prod.spline.design/MIXTiMCK5HGuPsZC/scene.splinecode" />
      </motion.div>
    </section>
  );
}






{/*import Spline from "@splinetool/react-spline/next";

const Test = () => {
  return (
    <div className="flex items-center justify-end min-h-screen bg-black w-full relative">
     
      <div
        className="absolute top-10 right-5 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, #FFD700 0%, rgba(255,215,0,0.2) 70%, transparent 100%)",
          filter: "blur(40px)",
          opacity: 0.7,
          zIndex: -5,
        }}
      ></div>
      <div className="">
        {" "}
        <Spline scene="https://prod.spline.design/MIXTiMCK5HGuPsZC/scene.splinecode" />
      </div>
    </div>
  );
};

export default Test;*/}
