// import React from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product, onAddRecentlyViewed }) => {
//   const handleAddRecentlyViewed = () => {
//     onAddRecentlyViewed(product.id);
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-300">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-48 object-cover rounded-md mb-4"
//       />
//       <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
//       <p className="text-gray-600">{product.description}</p>
//       <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>

//       <div className="mt-4 flex justify-between items-center">
//         <Link
//           to={`/product/${product.id}`}
//           className="text-blue-600 hover:underline"
//           onClick={handleAddRecentlyViewed} // Add to recently viewed on click
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddRecentlyViewed }) => {
  const handleAddRecentlyViewed = () => {
    onAddRecentlyViewed(product.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-md">
          <Link
            to={`/product/${product.id}`}
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddRecentlyViewed}
          >
            View Details
          </Link>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
      <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
      <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
    </div>
  );
};

export default ProductCard;
