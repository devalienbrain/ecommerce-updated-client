// import React from "react";
// import Banner from "../components/Banner";
// import Products from "./Products";
// import Categories from "./Categories";
// import Navbar from "../components/Navbar";

// const Home = () => {
//   return (
//     <>
//       <div className="bg-black text-white sticky top-0">
//         <Navbar />
//       </div>
//       <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
//         <Banner />
//         <Categories />
//         <div className="mt-16">
//           <Products />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Products from "./Products";
import Categories from "./Categories";
import Navbar from "../components/Navbar";

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
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <Navbar />
      </div>
      <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
        <Banner />
        <Categories />
        <div className="mt-16">
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
