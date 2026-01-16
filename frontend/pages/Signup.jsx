import React, { useState } from "react";
import { User, Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext"; 

const Signup = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth(); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      await fetchUser();
      navigate("/discover");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0E0C0A] text-gray-100 relative">
      
      {/* 🔙 Back Button - Fixed position for accessibility */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition z-10"
      >
        <ArrowLeft size={22} />
        <span className="hidden sm:block text-sm">Back</span>
      </button>

      {/* ===== Left Side: Form ===== */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 md:px-12">
        {/* REMOVED fixed h-80 to allow content to grow */}
        <div className="bg-[#1A1713] w-full max-w-md p-6 md:p-8 rounded-2xl border border-[#2A2520] shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2 md:mb-4">Create Account</h2>
          <p className="text-gray-400 mb-6 md:mb-8 text-sm">
            Start sharing your insights and tutorials on Writeora 🚀
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-1.5 text-sm">
                Full Name
              </label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3 focus-within:border-yellow-500 transition-colors">
                <User className="text-yellow-500 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="off"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200 text-sm"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-1.5 text-sm">
                Email
              </label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3 focus-within:border-yellow-500 transition-colors">
                <Mail className="text-yellow-500 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200 text-sm"
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
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  autoComplete="off"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg mt-2
              transition-all duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400 active:scale-[0.98]"
              }`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Login
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
        <h2 className="text-3xl font-bold text-yellow-500 mb-3">Writeora.ai</h2>
        <p className="text-gray-400 text-center max-w-sm">
          Join a community of learners and writers shaping knowledge for the next generation.
        </p>
      </div>
    </div>
  );
};

export default Signup;