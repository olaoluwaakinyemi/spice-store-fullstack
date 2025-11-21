import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const AdminUserManagement = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    // Check authentication
    if (!token || !user) {
      console.error("No token or user found");
      navigate("/login");
      return;
    }

    // Check admin role
    if (user.role !== "admin") {
      console.error("User is not admin");
      navigate("/");
      return;
    }

    fetchUsers();
  }, [token, user, navigate]);

  const fetchUsers = async () => {
    // Double-check token exists
    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      console.error("No auth token available");
      setError("Authentication required. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      console.log(
        "Fetching users with token:",
        authToken.substring(0, 20) + "..."
      );

      const res = await axios.get(`${API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Users fetched successfully:", res.data.length);
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);

      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        // Clear invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(err.response?.data?.error || "Failed to fetch users");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId, currentRole) => {
    setError("");
    setSuccess("");

    const newRole = currentRole === "admin" ? "user" : "admin";
    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      setError("Authentication required");
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/auth/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      setSuccess(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user role:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(err.response?.data?.error || "Failed to update role");
      }
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setError("");
    setSuccess("");

    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      setError("Authentication required");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`${API_URL}/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setSuccess("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(err.response?.data?.error || "Failed to delete user");
      }
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      setError("Authentication required");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/admin/create-user`, newUser, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setSuccess("User created successfully");
      setNewUser({ name: "", email: "", password: "", role: "user" });
      setShowCreateForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(err.response?.data?.error || "Failed to create user");
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {users.length} total users
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium min-h-[44px] flex items-center justify-center space-x-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>{showCreateForm ? "Cancel" : "Create New User"}</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm sm:text-base">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm sm:text-base">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {success}
          </div>
        </div>
      )}

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Create New User</h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg text-base"
                style={{ fontSize: "16px" }}
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full p-3 border rounded-lg text-base"
                style={{ fontSize: "16px" }}
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                minLength="6"
                className="w-full p-3 border rounded-lg text-base"
                style={{ fontSize: "16px" }}
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                className="w-full p-3 border rounded-lg text-base"
                style={{ fontSize: "16px" }}
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 min-h-[44px] font-medium"
            >
              Create User
            </button>
          </form>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.provider || "email"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => toggleAdminRole(user._id, user.role)}
                      className={`px-4 py-2 rounded min-h-[44px] ${
                        user.role === "admin"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white transition-colors`}
                    >
                      {user.role === "admin" ? "Demote" : "Promote"}
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded min-h-[44px] transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-lg truncate">
                  {user.name || "N/A"}
                </h3>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Provider: {user.provider || "email"}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => toggleAdminRole(user._id, user.role)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium min-h-[44px] ${
                  user.role === "admin"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors`}
              >
                {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="flex-1 sm:flex-initial px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium min-h-[44px] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600">No users found</p>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
