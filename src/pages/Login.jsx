import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import
import { useUser } from "../provider/UserContext";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const navigate = useNavigate();
  const { login } = useUser();
  const axiosInstance = useAxios();
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear error message before submission

    try {
      // API call for login
      const { data } = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const token = data.token;
      const decoded = jwtDecode(token); // Decode token to get user ID

      // Fetch user details using the decoded ID
      const userResponse = await axiosInstance.get(
        `/api/users/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );

      // Save user and token in context
      login(userResponse.data, token);

      // Navigate to the dashboard after login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // setErrorMessage("Invalid credentials! Please try again.");
      setErrorMessage(error?.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white">
      {/* Left Section: Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src="https://i.ibb.co/W3C6PLH/login.png"
          alt="Login Illustration"
          className="w-3/4 md:w-full h-auto max-w-md"
        />
      </div>

      {/* Right Section: Login Card */}
      <div className="md:w-1/2 flex justify-center items-center p-6">
        <div className="card w-full max-w-sm">
          <form className="card-body" onSubmit={handleLogin}>
            <h2 className="card-title text-center font-black text-2xl text-gray-800">
              Login with Credentials
            </h2>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full font-bold bg-red-600 border border-red-600 text-white hover:bg-red-500 hover:border-red-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
