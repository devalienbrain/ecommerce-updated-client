import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import {
  CiLocationArrow1,
  CiLogout,
  CiMenuBurger,
  CiUser,
} from "react-icons/ci";
import NavLinks from "./shared/NavLinks";

const Navbar = () => {
  const { user, logout } = useUser();
  const [showDetails, setShowDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const detailsRef = useRef(null);

  // Close details when clicking outside
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
    <div className="navbar shadow-sm px-6 py-4 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="https://i.ibb.co/wQ61YwM/ecommerce-logo.png"
            alt="logo"
            className="w-9"
          />
          <span className="text-xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-green-600 to-red-600">
            E-Commerce
          </span>
        </Link>

        {/* Hamburger Icon for mobile */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="lg:hidden text-2xl text-gray-600"
          aria-label="Menu"
        >
          <CiMenuBurger />
        </button>
      </div>

      {/* Navigation Links & User section */}
      <div
        className={`lg:flex items-center gap-4 text-sm font-semibold lg:w-auto w-full flex-col lg:flex-row ${
          showMenu ? "flex" : "hidden"
        }`}
      >
        <NavLinks />

        {user ? (
          <div className="flex items-center gap-4 relative">
            {/* User Avatar */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDetails((prev) => !prev)}
              aria-expanded={showDetails}
              aria-label="User menu"
            >
              <CiUser className="w-8 h-8" />
            </div>

            {/* User Details Popup */}
            {showDetails && (
              <div
                ref={detailsRef}
                className="absolute top-12 right-0 bg-white shadow-lg border rounded-lg p-4 text-center z-10 w-56 transform transition-transform duration-200 ease-in-out"
              >
                <p className="font-medium text-xs text-gray-700 mb-1">
                  {user?.email}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Role:{" "}
                  <span className="font-bold capitalize">{user?.role}</span>
                </p>
                <div className="flex justify-center items-center gap-1">
                  <Link
                    to="/dashboard"
                    className="hover:underline inline-block text-sm font-semibold text-blue-600"
                  >
                    Go to Dashboard
                  </Link>
                  <CiLocationArrow1 />
                </div>
              </div>
            )}

            {/* Logout Button with React Icon */}
            <button
              onClick={() =>
                window.confirm("Are you sure you want to logout?") && logout()
              }
              className="flex items-center gap-2 px-4 py-2 rounded-3xl border border-red-600 hover:border-red-700 bg-red-600 hover:bg-red-700 text-white"
            >
              <CiLogout />
              Logout
            </button>
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
