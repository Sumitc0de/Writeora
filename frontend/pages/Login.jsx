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

  useEffect(() => {
    if (!loading && user) {
      navigate("/discover", { replace: true });
    }
  }, [user, loading, navigate]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E0C0A] text-yellow-500">
        <div className="animate-pulse">Checking session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0E0C0A] text-gray-100 relative">
      
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition z-10"
      >
        <ArrowLeft size={22} />
        <span className="hidden sm:block text-sm">Back</span>
      </button>

      {/* ===== Left Side: Form ===== */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 md:px-12">
        <div className="bg-[#1A1713] w-full max-w-md p-6 md:p-8 rounded-2xl border border-[#2A2520] shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2 md:mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-6 md:mb-8 text-sm">
            Continue your creative journey with Writeora ✍️
          </p>

          {/* ⚠️ Error Message */}
          {(formError || error) && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              <p>{formError || error}</p>
            </div>
          )}

          {/* ✅ Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-1.5 text-sm">
                Email
              </label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3 focus-within:border-yellow-500 transition-colors">
                <Mail className="text-yellow-500 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-300 mb-1.5 text-sm">
                Password
              </label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3 focus-within:border-yellow-500 transition-colors">
                <Lock className="text-yellow-500 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-medium text-gray-500 hover:text-yellow-500 ml-2 uppercase tracking-wider"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forget Password  */}

            <div className="w-full h-fit text-sm text-yellow-500 underline">
              <a href="">Forgetten Password ?</a>
            </div>

            {/* 🔘 Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg mt-2
                transition-all duration-200 ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-yellow-400 active:scale-[0.98]"
                }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* 🧭 Signup Redirect */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-500 hover:underline font-medium">
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
        <p className="text-gray-400 text-center max-w-sm leading-relaxed">
          Empowering creators to share knowledge, ideas, and learning content
          with the help of AI — fast, simple, and beautifully.
        </p>
      </div>
    </div>
  );
};

export default Login;