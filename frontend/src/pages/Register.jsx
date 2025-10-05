import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../../config";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      // Use context login with token and user
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      const errorMsg =
        err.response?.data?.error || "Registration failed. Try again.";
      setError(
        errorMsg.includes("duplicate key")
          ? "Email already registered"
          : errorMsg
      );
    }
  };

  const handleOAuthRegister = async (provider, type) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(`${API_URL}/auth/oauth`, {
        name: user.displayName,
        email: user.email,
        provider: type,
      });

      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error(`${type} signup failed:`, err);
      setError(`${type} signup failed`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>

        <hr className="my-6" />

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleOAuthRegister(googleProvider, "google")}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleOAuthRegister(facebookProvider, "facebook")}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <FaFacebookF />
          </button>
        </div>
      </div>
    </div>
  );
}
