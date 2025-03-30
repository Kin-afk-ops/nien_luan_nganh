"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import ProductListContainer from "@/components/HomeProducts/ProductListContainer";
import SliderBanner from "@/components/SliderBanner.tsx/SliderBanner";
import "../styles/globalStyle.css"
import HomePage from "./HomePage/HomePage";
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div className="container">
         
        <HomePage />

      
    </div>
  );
}