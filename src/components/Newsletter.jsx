import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Simulate subscription logic (replace with actual API call)
    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Stay Updated!
        </h2>
        <p className="text-gray-600 mt-3">
          Subscribe to our newsletter to receive the latest updates on products,
          exclusive deals, and insights for users, vendors, and admins.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-3/4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Subscribe
          </button>
        </div>
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              message.includes("Thank you") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
