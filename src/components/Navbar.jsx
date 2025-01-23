import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger, CiLogout, CiUser } from "react-icons/ci";
import NavLinks from "./shared/NavLinks";
import { useUser } from "../provider/UserContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const { user, logout } = useUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar sticky top-0 z-50 bg-white  px-6 py-4 max-w-7xl mx-auto flex justify-between items-center font-semibold">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/wQ61YwM/ecommerce-logo.png"
          alt="logo"
          className="w-9 hover:scale-105 transition-transform"
        />
        <span className="text-2xl font-bold text-gray-800 hover:text-green-500 transition-colors">
          E-Commerce
        </span>
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="lg:hidden text-2xl text-gray-700 focus:outline-none focus:ring focus:ring-green-300"
        aria-label="Toggle menu"
      >
        <CiMenuBurger />
      </button>

      {/* Nav Links and Profile Section */}
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } lg:flex items-center gap-6 transition-all duration-300`}
      >
        {/* Nav Links */}
        <NavLinks />

        {/* Profile Dropdown */}
        {user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 focus:outline-none focus:ring focus:ring-green-300"
              onClick={() => setShowDetails((prev) => !prev)}
              aria-label="User menu"
            >
              <CiUser className="text-2xl text-gray-700 hover:text-green-500 transition-colors" />
            </button>
            {showDetails && (
              <div
                ref={detailsRef}
                className="absolute right-0 top-12 bg-white shadow-lg p-4 rounded-md border w-48 transition-transform duration-200 transform scale-95 hover:scale-100"
              >
                <p className="text-sm text-gray-600">
                  {user?.email || "user@example.com"}
                </p>
                <Link
                  to="/dashboard"
                  className="block mt-3 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Dashboard
                </Link>
                {/* Logout Button */}
                <button
                  onClick={() =>
                    window.confirm("Are you sure you want to logout?") &&
                    logout()
                  }
                  className="px-4 py-2 rounded-3xl border border-red-600 hover:border-red-700 bg-red-600 hover:bg-red-700 text-white"
                >
                  <CiLogout className="inline-block mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Login Button */}
            <Link to="/login">
              <button className="px-4 py-2 rounded-md border border-green-400 hover:border-red-500 hover:bg-red-500 hover:text-white">
                Login
              </button>
            </Link>
            {/* Register Button */}
            <Link to="/register">
              <button className="px-4 py-2 rounded-md bg-green-600 border border-green-600 hover:border-green-500 hover:bg-green-500 text-white">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
