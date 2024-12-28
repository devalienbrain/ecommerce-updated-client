import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import { CiLocationArrow1 } from "react-icons/ci";

const Navbar = () => {
  const { user, logout } = useUser();
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);

  const adminAvatar = "https://i.ibb.co/qjQ0dt1/manager.png";
  const userAvatar = "https://i.ibb.co/VvKP7TQ/user.png";

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
    <div className="navbar shadow-sm px-6 py-4 w-full lg:w-3/4 mx-auto bg-white">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="https://i.ibb.co/wQ61YwM/ecommerce-logo.png"
            alt="logo"
            className="w-9"
          />
          <span className="text-xl font-extrabold bg-gradient-to-tr bg-clip-text text-transparent from-green-700 via-black to-red-500">
            E-Commerce
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-3 text-sm font-semibold">
        {user ? (
          <div className="flex items-center gap-4 relative">
            {/* User Avatar */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDetails((prev) => !prev)}
              aria-expanded={showDetails}
              aria-label="User menu"
            >
              <img
                src={user?.role === "Admin" ? adminAvatar : userAvatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full"
                onError={(e) => (e.target.src = userAvatar)}
              />
            </div>

            {/* User Details Popup */}
            {showDetails && (
              <div
                ref={detailsRef}
                className="absolute top-12 right-0 bg-white shadow-lg border rounded-lg p-3 text-center z-10 w-52 transform transition-transform duration-200 ease-in-out"
              >
                <p className="font-medium text-xs text-gray-700 ">
                  {user?.email}
                </p>
                <p className="text-sm text-gray-600 ">
                  Role:{" "}
                  <span className="font-bold capitalize">{user?.role}</span>
                </p>
                <div className="flex justify-center items-center gap-1">
                  <Link
                    to="/dashboard"
                    className="hover:underline inline-block text-sm font-semibold text-blue-600 "
                  >
                    Go to Dashboard
                  </Link>
                  <CiLocationArrow1 />
                </div>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={() =>
                window.confirm("Are you sure you want to logout?") && logout()
              }
              className="px-4 py-2 rounded-3xl border border-red-600 hover:border-red-700 bg-red-600 hover:bg-red-700 text-white"
            >
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
