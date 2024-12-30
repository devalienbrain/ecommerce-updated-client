import React from "react";
import Products from "./Products";
import Categories from "./Categories";
import OfferSection from "../components/OfferSection";
import ReviewSection from "../components/ReviewSection";
import BannerCarousel from "../components/BannerCarousel";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <div>
        <BannerCarousel />
      </div>
      <div className="px-6 min-h-screen max-w-7xl mx-auto">
        {/* <Banner /> */}
        <OfferSection />
        <Categories />
        <div className="mt-16">
          <Products />
        </div>
        <ReviewSection />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
