import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

function AdminSpiceCard({ spice, onDelete }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this spice?")) return;

    try {
      await axios.delete(`${API_URL}/spices/${spice._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(spice._id);
    } catch (err) {
      console.error("Error deleting spice:", err);
      alert("Failed to delete spice.");
    }
  };

  const handleEdit = () => {
    navigate(`/admin/edit/${spice._id}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <img
        src={spice.imageUrl}
        alt={spice.name}
        className="w-full h-40 object-cover mb-3 rounded"
      />
      <h3 className="text-lg font-bold">{spice.name}</h3>
      <p className="text-gray-700">${spice.price}</p>
      <p className="text-sm text-gray-500 mb-3">{spice.description}</p>

      <div className="flex justify-between">
        <button
          onClick={handleEdit}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminSpiceCard;
