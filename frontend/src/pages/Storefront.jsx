import React, { useEffect, useState, useContext } from "react";
import SpiceCard from "../components/SpiceCard";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Storefront = () => {
  const [spices, setSpices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5001/spices")
      .then((res) => {
        setSpices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching spices:", err);
        setLoading(false);
      });
  }, []);

  const filteredSpices = spices.filter((spice) =>
    spice.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to SpiceStore
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Premium spices from around the world
            </p>

            {user && (
              <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4 mb-6">
                <p className="font-semibold text-lg">
                  Welcome back, {user.name}!
                </p>
                <p className="text-sm text-orange-100 mt-1">
                  {user.role === "admin"
                    ? "You have admin access"
                    : "Happy shopping!"}
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for spices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-gray-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all"
                />
                <svg
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? "Search Results" : "All Spices"}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredSpices.length}{" "}
            {filteredSpices.length === 1 ? "spice" : "spices"} available
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
          </div>
        ) : filteredSpices.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-xl">
              {searchTerm
                ? "No spices found matching your search"
                : "No spices available"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Spices Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpices.map((spice) => (
              <SpiceCard
                key={spice._id}
                spice={spice}
                onAddToCart={() => addToCart(spice)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Storefront;
