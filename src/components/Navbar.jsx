
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import NavLinks from "./shared/NavLinks";
import { useUser } from "../provider/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <nav className="navbar sticky top-0 z-50  px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Logo Section */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/wQ61YwM/ecommerce-logo.png"
            alt="logo"
            className="w-10 hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold text-primary hover:text-secondary transition-colors">
            E-Commerce
          </span>
        </Link>
      </div>

      {/* Navbar Links for Large Screens */}
      <div className="navbar-center hidden lg:flex">
        <NavLinks isMobile={false} />
      </div>

      {/* User Actions */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              aria-label="User menu"
            >
              <CiUser className="text-2xl text-gray-700 hover:text-primary transition-colors" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48"
            >
              <li>
                <span className="text-sm text-gray-500">
                  {user?.email || "user@example.com"}
                </span>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.confirm("Are you sure you want to logout?") &&
                    logout()
                  }
                  className="text-red-500 hover:bg-red-100"
                >
                  <CiLogout className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-ghost gap-2">
                <FaSignInAlt />
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary gap-2">
                <FaUserPlus />
                Register
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="navbar-end lg:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="navbar-dropdown w-full bg-base-100 shadow-lg rounded-md mt-2 p-4 lg:hidden">
          <NavLinks isMobile={true} />
          <div className="mt-4">
            {user ? (
              <button
                onClick={() =>
                  window.confirm("Are you sure you want to logout?") &&
                  logout()
                }
                className="btn btn-error w-full"
              >
                <CiLogout className="mr-2" />
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login">
                  <button className="btn btn-outline w-full gap-2">
                    <FaSignInAlt />
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary w-full gap-2">
                    <FaUserPlus />
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
