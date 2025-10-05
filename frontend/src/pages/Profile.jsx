// frontend/src/pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    axios
      .get("http://localhost:5001/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setName(res.data.name || "");
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5001/auth/me",
        { name, password: password || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Profile updated");
      setPassword("");
    } catch (err) {
      setMsg("Update failed");
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Verified:</strong> {user.verified ? "Yes" : "No"}
        </p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow">
        {msg && <p className="text-green-600 mb-2">{msg}</p>}
        <label className="block mb-2">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <label className="block mb-2">Change Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Leave blank to keep current password"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Order history</h2>
        <p className="text-sm text-gray-600">
          (Implement order storage on backend to show orders here.)
        </p>
      </div>
    </div>
  );
}
