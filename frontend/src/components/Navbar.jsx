import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent hover:from-orange-300 hover:to-red-400 transition-all z-50 relative"
          >
            SpiceStore
          </Link>

          {/* Desktop Navigation */}
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
                  className="hover:text-orange-400 transition-colors flex items-center space-x-1 min-h-[44px]"
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
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowAdminMenu(false)}
                    ></div>
                    <div className="absolute top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                      <Link
                        to="/admin"
                        className="block px-4 py-3 hover:bg-gray-700 transition-colors min-h-[44px]"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/users"
                        className="block px-4 py-3 hover:bg-gray-700 transition-colors min-h-[44px]"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Manage Users
                      </Link>
                    </div>
                  </>
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

          {/* Right Side - Cart and Auth */}
          <div className="flex items-center space-x-3 sm:space-x-4 z-50 relative">
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="flex items-center space-x-2 hover:text-orange-400 transition-colors relative min-h-[44px] min-w-[44px] justify-center"
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
              <span className="hidden sm:inline">
                ({cart.reduce((sum, item) => sum + item.qty, 0)})
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cart.reduce((sum, item) => sum + item.qty, 0)}
                </span>
              )}
            </Link>

            {/* Desktop Auth */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="hidden md:block px-4 py-2 min-h-[44px] bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-gray-300 text-sm">
                  Hi,{" "}
                  <span className="text-orange-400 font-medium">
                    {user.name}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 min-h-[44px] bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 w-64 h-full bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 py-4 space-y-2 overflow-y-auto h-full">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`block py-3 px-4 rounded-lg transition-colors min-h-[44px] flex items-center ${
              isActive("/")
                ? "bg-gray-700 text-orange-400"
                : "hover:bg-gray-700"
            }`}
          >
            Store
          </Link>

          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-colors min-h-[44px] flex items-center ${
                isActive("/profile")
                  ? "bg-gray-700 text-orange-400"
                  : "hover:bg-gray-700"
              }`}
            >
              Profile
            </Link>
          )}

          {isAdmin && (
            <>
              <div className="pt-2 pb-1 px-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Admin
                </p>
              </div>
              <Link
                to="/admin"
                onClick={closeMobileMenu}
                className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                onClick={closeMobileMenu}
                className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors min-h-[44px] flex items-center"
              >
                Manage Users
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-gray-700 mt-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block py-3 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-center font-medium min-h-[44px] flex items-center justify-center"
              >
                Login
              </Link>
            ) : (
              <>
                <div className="py-3 px-4 text-gray-300 text-sm">
                  Hi,{" "}
                  <span className="text-orange-400 font-medium">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left min-h-[44px] flex items-center"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
