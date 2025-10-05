import { useState } from "react";
import axios from "axios";

export default function SpiceForm({ token, onSpiceAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5001/spices", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ Spice added successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      if (onSpiceAdded) onSpiceAdded(res.data);
    } catch (err) {
      setMessage("❌ Error adding spice");
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 my-4">
      <h2 className="text-xl font-bold mb-2">Add New Spice</h2>
      {message && <p className="mb-2 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Spice Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Spice
        </button>
      </form>
    </div>
  );
}
