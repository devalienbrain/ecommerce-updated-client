import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddRecentlyViewed }) => {
  const handleAddRecentlyViewed = () => {
    onAddRecentlyViewed(product.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 hover:underline"
          onClick={handleAddRecentlyViewed} // Add to recently viewed on click
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
