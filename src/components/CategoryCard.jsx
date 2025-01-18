import React from "react";
import { FaLeaf, FaCarrot, FaAppleAlt, FaSeedling } from "react-icons/fa"; // Example icons

const CategoryCard = ({ category, onClick }) => {
  // Static icons for categories (add more as needed)
  const categoryIcons = {
    Vegetables: <FaCarrot className="text-orange-500 text-4xl" />,
    Fruits: <FaAppleAlt className="text-red-500 text-4xl" />,
    Plants: <FaLeaf className="text-green-500 text-4xl" />,
    Seeds: <FaSeedling className="text-lime-500 text-4xl" />,
    Default: <FaLeaf className="text-blue-500 text-4xl" />, // Default icon
  };

  const icon = categoryIcons[category.name] || categoryIcons.Default;

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 p-6 border rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out text-center group"
    >
      {/* Static Icon */}
      <div className="flex justify-center items-center mb-4">{icon}</div>

      {/* Category Name and Description */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700">
          {category.name || "Unknown Category"}
        </h3>
        <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-800">
          {category.description ||
            "Explore our wide range of products in this category."}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
