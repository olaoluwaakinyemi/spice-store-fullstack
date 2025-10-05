import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const isAdmin = user?.role === "admin";
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="font-bold text-2xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent hover:from-orange-300 hover:to-red-400 transition-all"
            >
              SpiceStore
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`hover:text-orange-400 transition-colors relative ${
                  isActive("/") ? "text-orange-400" : ""
                }`}
              >
                Store
                {isActive("/") && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-400"></span>
                )}
              </Link>

              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="hover:text-orange-400 transition-colors flex items-center space-x-1"
                  >
                    <span>Admin</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showAdminMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showAdminMenu && (
                    <div className="absolute top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/users"
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Manage Users
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {isLoggedIn && (
                <Link
                  to="/profile"
                  className={`hover:text-orange-400 transition-colors relative ${
                    isActive("/profile") ? "text-orange-400" : ""
                  }`}
                >
                  Profile
                  {isActive("/profile") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-400"></span>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Right Side - Cart and Auth */}
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="flex items-center space-x-2 hover:text-orange-400 transition-colors relative"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>({cart.reduce((sum, item) => sum + item.qty, 0)})</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 hidden md:block">
                  Hi,{" "}
                  <span className="text-orange-400 font-medium">
                    {user.name}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
