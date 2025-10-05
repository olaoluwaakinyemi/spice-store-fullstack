import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log("🔍 Current user from context:", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });

      console.log(
        "🔍 ENTIRE res.data object:",
        JSON.stringify(res.data, null, 2)
      );
      console.log("✅ Login response:", res.data);
      console.log("✅ Token:", res.data.token);
      console.log("✅ User:", res.data.user);

      // Call login from context
      login(res.data.token, res.data.user);

      console.log("✅ Called login() from context");

      // Check localStorage immediately after
      setTimeout(() => {
        console.log("✅ localStorage token:", localStorage.getItem("token"));
        console.log("✅ localStorage user:", localStorage.getItem("user"));
      }, 100);

      console.log("✅ About to navigate to /");
      navigate("/");
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError("Invalid email or password");
    }
  };

  const handleOAuthLogin = async (provider, type) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post("http://localhost:5001/auth/oauth", {
        name: user.displayName,
        email: user.email,
        provider: type,
      });

      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      console.error(`${type} login failed:`, err);
      setError(`${type} login failed`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Debug info */}
        {user && (
          <div className="bg-blue-100 p-2 mb-4 text-sm">
            <p>Logged in as: {user.name}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Not registered?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>

        <hr className="my-6" />

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleOAuthLogin(googleProvider, "google")}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleOAuthLogin(facebookProvider, "facebook")}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <FaFacebookF />
          </button>
        </div>
      </div>
    </div>
  );
}
