import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useUser } from "../../provider/UserContext";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const axiosInstance = useAxios();

  // State for form data and modal visibility
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userAddress: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Retrieve total price and cart items
  const totalPrice = state?.totalPrice || 0;
  const cartItems = state?.cartItems || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const payload = {
      userId: user?.id || "N/A",
      userEmail: user?.email || "N/A",
      userName: formData.userName || "N/A",
      userPhone: formData.userPhone || "N/A",
      userAddress: formData.userAddress || "N/A",
      totalPriceToPay: totalPrice,
      cartItems, // Include cart items in the payload
    };

    try {
      const response = await axiosInstance.post(
        "/api/payment",
        payload
      );
      console.log("Payment Successful:", response.data);
      // alert("Payment successful!");
      // navigate("/dashboard");
      // Redirect to the payment URL
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("No payment URL found.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to complete payment.");
    }
  };

  return (
    <div className="p-6 w-full lg:w-2/3 mx-auto my-6 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FiArrowLeft className="mr-2 text-2xl" />
        Go Back
      </button>

      <h1 className="text-2xl md:text-4xl font-bold mb-5">Checkout</h1>
      <div className="border p-6 rounded shadow">
        {/* Form for user details */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Name</label>
          <input
            type="text"
            name="userName"
            placeholder="Enter your name"
            value={formData.userName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            name="userPhone"
            placeholder="Enter your phone number"
            value={formData.userPhone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Address</label>
          <textarea
            name="userAddress"
            placeholder="Enter your address"
            value={formData.userAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Amount to Pay</label>
          <input
            type="text"
            value={`$${totalPrice.toFixed(2)}`}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Pay with SSLCommerz
        </button>
      </div>

      {/* Modal Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Are you sure to proceed with payment?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handlePayment();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

export default Checkout;
