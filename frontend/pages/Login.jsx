import React, { useEffect, useState } from "react";
import { Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

const Login = () => {
  const { user, loading, login, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect away if already logged in (wait for auth loading to finish)
  useEffect(() => {
    if (!loading && user) {
      navigate("/discover", { replace: true });
    }
  }, [user, loading, navigate]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/discover", { replace: true });
    } catch (err) {
      setFormError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // While auth is resolving, show nothing or a small loader (prevents flicker)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E0C0A] text-yellow-500">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0E0C0A] text-gray-100 relative">
      {/* 🔙 Back Button (top-left corner) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition"
      >
        <ArrowLeft size={22} />
        <span className="hidden sm:block text-sm">Back</span>
      </button>

      {/* ===== Left Side: Form ===== */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="bg-[#1A1713] w-full max-w-md p-8 rounded-2xl border border-[#2A2520] shadow-lg">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-8 text-sm">
            Continue your creative journey with Writeora ✍️
          </p>

          {/* ⚠️ Error Message */}
          {(formError || error) && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle size={18} />
              <p>{formError || error}</p>
            </div>
          )}

          {/* ✅ Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 📧 Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2 text-sm"
              >
                Email
              </label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3">
                <Mail className="text-yellow-500 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email" // ✅ helps autofill
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200"
                  required
                />
              </div>
            </div>

            {/* 🔒 Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 mb-2 text-sm"
              >
                Password
              </label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3">
                <Lock className="text-yellow-500 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password" // ✅ stops Chrome “data breach” popups
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-400 ml-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* 🔘 Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg 
                transition-all duration-200 ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-400"
                }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* 🧭 Signup Redirect */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* ===== Right Side: Brand Section ===== */}
      <div className="hidden md:flex flex-1 bg-[#1A1713] flex-col items-center justify-center border-l border-[#2A2520] p-12">
        <img
          src="/favicon.png"
          alt="Writeora Logo"
          className="w-16 h-16 mb-4"
        />
        <h2 className="text-3xl font-bold text-yellow-500 mb-3">
          Writeora.ai
        </h2>
        <p className="text-gray-400 text-center max-w-sm">
          Empowering creators to share knowledge, ideas, and learning content
          with the help of AI — fast, simple, and beautifully.
        </p>
      </div>
    </div>
  );
};

export default Login;
