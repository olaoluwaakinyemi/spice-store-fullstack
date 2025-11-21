import React, { useEffect, useState } from "react";
import AdminSpiceCard from "../components/AdminSpiceCard";
import { useNavigate } from "react-router-dom";
import SpiceForm from "../components/SpiceForm";
import { API_URL } from "../../config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [spices, setSpices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/spices`)
      .then((res) => res.json())
      .then((data) => setSpices(data))
      .catch((err) => console.error("Error fetching spices:", err));
  }, []);

  const handleEdit = (spice) => {
    navigate(`/admin/edit/${spice._id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this spice?")) return;

    try {
      await fetch(`${API_URL}/spices/${id}`, {
        method: "DELETE",
      });
      setSpices(spices.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting spice:", err);
    }
  };

  const handleSpiceAdded = (spice) => {
    setSpices([...spices, spice]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section - Mobile Optimized */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your spice inventory
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
                />
              </svg>
              <span>{showAddForm ? "Cancel" : "Add New Spice"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  Total Spices
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {spices.length}
                </p>
              </div>
              <div className="bg-orange-100 rounded-full p-2 sm:p-3">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  In Stock
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {spices.filter((s) => s.stock > 0).length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-2 sm:p-3">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-red-500 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  Low Stock
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {spices.filter((s) => s.stock > 0 && s.stock < 10).length}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-2 sm:p-3">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add Spice Form - Mobile Optimized */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Add New Spice
            </h2>
            <SpiceForm onSpiceAdded={handleSpiceAdded} />
          </div>
        )}

        {/* Spices Grid - Mobile Optimized */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            All Spices
          </h2>
          {spices.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-600 text-base sm:text-lg">
                No spices yet
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Click "Add New Spice" to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {spices.map((spice) => (
                <AdminSpiceCard
                  key={spice._id}
                  spice={spice}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
