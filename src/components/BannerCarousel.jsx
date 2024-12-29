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
      imgUrl: "https://i.ibb.co.com/kyLT0s7/rb-20156.png",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-100",
    },
    {
      title: "Effortless Property Management",
      description:
        "Whether you're a buyer, seller, or agent, manage inventories and transactions effortlessly with our smart platform.",
      imgUrl: "https://i.ibb.co.com/yRRqHsN/rb-2148431747.png",
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle automatic sliding
  const autoSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Use useEffect to trigger automatic sliding at regular intervals
  useEffect(() => {
    const interval = setInterval(autoSlide, 7000); // Change every 7 seconds for a slower transition
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="carousel w-full relative overflow-hidden rounded-md">
      <div className="carousel-inner relative w-full flex transition-all duration-1000 ease-in-out">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`carousel-item relative w-full ${
              banner.bgColor
            } flex-shrink-0 transition-transform duration-1000 ease-in-out ${
              index === currentIndex
                ? "translate-x-0"
                : index === (currentIndex + 1) % banners.length
                ? "translate-x-full"
                : "translate-x-[-100%]"
            }`}
          >
            {/* Left Text Section */}
            <div className="w-full md:w-1/2 px-5 md:px-10 flex flex-col justify-center text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                {banner.title}
              </h1>
              <p className="text-sm md:text-lg mb-6">{banner.description}</p>
            </div>

            {/* Right Image Section */}
            <div className="hidden md:block md:w-1/2">
              <img
                src={banner.imgUrl}
                alt="Banner"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
