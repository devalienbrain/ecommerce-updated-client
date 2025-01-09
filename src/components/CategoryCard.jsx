import React from "react";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-white p-6 border rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:border-blue-600 transition duration-300 ease-in-out text-center group"
    >
      {/* Category Background Image */}
      <div className="absolute inset-0 bg-gray-100 group-hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={category.image || "https://via.placeholder.com/150"}
          alt={category.name}
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
