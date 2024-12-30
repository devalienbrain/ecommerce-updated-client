import React, { useEffect, useState } from "react";

const BannerCarousel = () => {
  const banners = [
    {
      title: "Find Your Dream Land Today!",
      description:
        "Explore premium land plots, flats, and properties at unbeatable prices. A platform built with modern technologies to offer seamless experiences.",
      imgUrl: "https://i.ibb.co/XpgVKyv/rb-1428.png",
      bgColor: "bg-gradient-to-r from-green-50 to-blue-100",
    },
    {
      title: "Secure Your Future Property",
      description:
        "Experience hassle-free buying and selling of land and flats with advanced search and reliable listings.",
      imgUrl: "https://i.ibb.co/kyLT0s7/rb-20156.png",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-100",
    },
    {
      title: "Effortless Property Management",
      description:
        "Whether you're a buyer, seller, or agent, manage inventories and transactions effortlessly with our smart platform.",
      imgUrl: "https://i.ibb.co/yRRqHsN/rb-2148431747.png",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 7000); // Slide every 7 seconds
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative overflow-hidden">
      {/* Full-width background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${banners[currentIndex]?.bgColor}`}
      ></div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-center h-[400px] md:h-[500px] lg:h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-between transform transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Text Section */}
            <div className="text-center md:text-left w-full md:w-1/2 pl-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-gray-800">
                {banner.title}
              </h1>
              <p className="text-sm md:text-lg text-gray-700 mb-6">
                {banner.description}
              </p>
            </div>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2">
              <img
                src={banner.imgUrl}
                alt="Banner"
                className="w-full h-auto max-w-xl rounded-lg "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
