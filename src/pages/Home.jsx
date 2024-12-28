import React from "react";
import Banner from "../components/Banner";
import Products from "./Products";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <Banner />
      <Categories />
      <div className="mt-16">
        <Products />
      </div>
    </div>
  );
};

export default Home;
