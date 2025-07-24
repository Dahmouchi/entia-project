/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import Signin from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import ThemeToggler from "./ThemeToggler";
import { LogIn } from "lucide-react";
import { motion } from 'framer-motion';

const Header: React.FC = () => {
 
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
   <header
  className={`fixed top-0 z-50 w-full pb-16 transition-all duration-300 ${sticky ? "shadow-lg lg:py-5" : "shadow-none py-4"}`}
>
  {/* Background Image */}
  <div className="absolute -top-8 inset-0 z-0 overflow-hidden">
    <img 
      src="/nav.png" 
      className="w-full h-full object-cover" 
      alt="Header background" 
    />
    {/* Optional overlay if you need to darken the background */}
    <div className="absolute inset-0 bg-opacity-20"></div>
  </div>

  {/* Content */}
  <div className="relative z-10">
    <div className="lg:py-0 py-0">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
        <img src="/images/logo/logo.png" className="h-auto w-30 lg:w-40" alt="" />
        <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
         <motion.button
      className="relative group px-6 lg:py-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></span>
      
      {/* Inner glow */}
      <span className="absolute inset-0 border-2 border-white/20 rounded-lg group-hover:border-white/40 transition-all duration-300"></span>
      
      {/* Shadow animation */}
      <motion.span 
        className="absolute inset-0 rounded-lg shadow-lg"
        initial={{ boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.1)' }}
        animate={{
          boxShadow: [
            '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.1)',
            '0 20px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.2)',
            '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.1)'
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: 'easeInOut'
        }}
      />
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <LogIn className="lg:text-lg text-sm" />
        <span>Connexion</span>
      </div>
    </motion.button>
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;
