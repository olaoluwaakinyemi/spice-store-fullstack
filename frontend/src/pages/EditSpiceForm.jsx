import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

const EditSpiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null); // holds new file
  const [previewUrl, setPreviewUrl] = useState(""); // preview of current/new image

  // Fetch spice data
  useEffect(() => {
    axios
      .get(`${API_URL}/spices/${id}`)
      .then((res) => {
        const { name, price, description, imageUrl } = res.data;
        setFormData({ name, price, description });
        setPreviewUrl(imageUrl || ""); // preview current image
      })
      .catch((err) => console.error("Error fetching spice:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // show new image preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile); // only send if a new file is selected
      }

      await axios.put(`${API_URL}/spices/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin"); // go back to admin dashboard
    } catch (err) {
      console.error("Error updating spice:", err);
      alert("Failed to update spice.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Spice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Spice Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-32 w-full object-cover rounded mt-2"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSpiceForm;
