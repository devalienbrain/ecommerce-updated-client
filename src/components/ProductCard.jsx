
// import React from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product, onAddRecentlyViewed }) => {
//   const handleAddRecentlyViewed = () => {
//     onAddRecentlyViewed(product.id);
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300">
//       <div className="relative group">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-cover rounded-md mb-4"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-md">
//           <Link
//             to={`/product/${product.id}`}
//             className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//             onClick={handleAddRecentlyViewed}
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//       <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
//       <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
//       <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
//     </div>
//   );
// };

// export default ProductCard;



import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product, onAddRecentlyViewed }) => {
  const handleAddRecentlyViewed = () => {
    onAddRecentlyViewed(product.id);
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Sale/Badge */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
        Bestseller
      </div>

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-md">
          <Link
            to={`/product/${product.id}`}
            className="text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
            onClick={handleAddRecentlyViewed}
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Title and Description */}
      <h3 className="text-lg font-bold text-gray-800 truncate">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {product.description || "No description available."}
      </p>

      {/* Pricing and Rating */}
      <div className="flex items-center justify-between mt-4">
        {/* Price */}
        <div>
          <p className="text-lg font-bold text-green-600">
            ${product.price}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product.originalPrice || (product.price + 10)}
          </p>
        </div>

        {/* Ratings */}
        <div className="flex items-center text-yellow-500 text-sm">
          {[...Array(product.rating || 4)].map((_, i) => (
            <AiFillStar key={i} />
          ))}
          {[...Array(5 - (product.rating || 4))].map((_, i) => (
            <AiOutlineStar key={i} />
          ))}
          <span className="text-gray-600 text-xs ml-1">({product.reviews || 150} reviews)</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-600 text-sm font-semibold hover:underline"
          onClick={handleAddRecentlyViewed}
        >
          More Details
        </Link>
        <button
          className="flex items-center gap-2 bg-gray-100 text-blue-600 px-3 py-2 rounded-lg shadow hover:bg-blue-600 hover:text-white transition-colors"
          title="Add to Cart"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
