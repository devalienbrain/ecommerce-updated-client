import React, { useState, useEffect } from "react";
import { useUser } from "../../../provider/UserContext";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const userId = user?.id;
  const axiosInstance = useAxios();

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/api/cart?userId=${userId}`)
        .then((response) => setCartItems(response?.data || []))
        .catch((error) =>
          console.error("Error fetching cart items for user:", error)
        );
    }
  }, [userId]);

  const handleRemove = () => {
    if (selectedItemId) {
      axiosInstance
        .delete(`/api/cart/${selectedItemId}`)
        .then(() => {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item?.id !== selectedItemId)
          );
          setShowModal(false);
          setSelectedItemId(null);
        })
        .catch((error) =>
          console.error("Error removing item from cart:", error)
        );
    }
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item?.product?.price * item?.quantity,
    0
  );

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl md:text-4xl font-black">My Cart</h1>
        <button
          className={`flex items-center px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            totalPrice > 0
              ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Proceed to checkout"
          disabled={totalPrice === 0}
        >
          <Link
            to="/dashboard/checkout"
            state={{ totalPrice, cartItems }}
            className="flex items-center"
          >
            <FiShoppingCart className="mr-2 text-xl" />
            Checkout
          </Link>
        </button>
      </div>
      <div className="text-lg font-semibold mb-7">
        Total Price:{" "}
        <span className="text-green-600">${totalPrice.toFixed(2)}</span>
      </div>
      <hr className="mb-7" />
      {cartItems?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems?.map((item) => (
            <div
              key={item?.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{item?.product?.name}</h3>
                <p>Price: ${item?.product?.price}</p>
                <p>Quantity: {item?.quantity}</p>
              </div>
              <button
                onClick={() => openModal(item?.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                aria-label={`Remove ${item?.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you want to remove this item from your cart?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
