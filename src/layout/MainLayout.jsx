import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
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
    <div className="flex flex-col min-h-screen">
      <div
        className={`sticky top-0 z-50 transition-colors duration-300  ${
          isScrolled ? "bg-white shadow-xl" : ""
        }`}
      >
        <Navbar />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="bg-gray-50 ">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
