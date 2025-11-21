// Register.jsx - Similar mobile optimizations
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

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
    } finally {
      setLoading(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Join SpiceStore today
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
              style={{ fontSize: "16px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
              style={{ fontSize: "16px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
              style={{ fontSize: "16px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium min-h-[44px] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Sign in
          </Link>
        </p>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuthRegister(googleProvider, "google")}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] space-x-2"
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>

          <button
            onClick={() => handleOAuthRegister(facebookProvider, "facebook")}
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px] space-x-2"
          >
            <FaFacebookF className="text-blue-600 text-xl" />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
