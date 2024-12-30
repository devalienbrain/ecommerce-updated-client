import React, { useState, useEffect } from "react";
import Products from "./Products";
import Categories from "./Categories";
import Navbar from "../components/Navbar";
import OfferSection from "../components/OfferSection";
import ReviewSection from "../components/ReviewSection";
import BannerCarousel from "../components/BannerCarousel";
import Footer from "../components/Footer";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 z-50 transition-colors duration-300  ${
          isScrolled ? "bg-white shadow-xl" : ""
        }`}
      >
        <Navbar />
      </div>
      <div className="px-6 w-full lg:w-3/4 mx-auto min-h-screen">
        <BannerCarousel />
        {/* <Banner /> */}
        <OfferSection />
        <Categories />
        <div className="mt-16">
          <Products />
        </div>
        <ReviewSection />
      </div>
      <div className="bg-gray-50 ">
        <Footer />
      </div>
    </>
  );
};

export default Home;
