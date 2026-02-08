import React, { useState } from "react";
import { Mail, Lock, User, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import Background from "../src/components/Background";
import Button from "../src/components/Button";

const Signup = () => {
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
    } catch (err) {
      setFormError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      <Background />

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition z-20 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#F5C542] group-hover:text-black transition-colors">
          <ArrowLeft size={16} />
        </div>
        <span className="hidden sm:block text-sm font-medium">Back to Home</span>
      </button>

      {/* ===== Left Side: Form ===== */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 md:px-12 z-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Create Account
            </h2>
            <p className="text-gray-400 text-lg">
              Join our community of creators and thinkers.
            </p>
          </div>

          {/* ⚠️ Error Message */}
          {(formError || error) && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm backdrop-blur-sm">
              <AlertCircle size={18} />
              <p>{formError || error}</p>
            </div>
          )}

          {/* ✅ Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <div className="group relative">
                <div className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#F5C542] transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5C542]/50 focus:bg-white/[0.05] transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <div className="group relative">
                <div className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#F5C542] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5C542]/50 focus:bg-white/[0.05] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="group relative">
                <div className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#F5C542] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5C542]/50 focus:bg-white/[0.05] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-xs font-medium text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="group relative">
                <div className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-[#F5C542] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#F5C542]/50 focus:bg-white/[0.05] transition-all"
                  required
                />
              </div>
            </div>

            {/* 🔘 Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full !rounded-xl !py-3.5 text-base mt-2 flex justify-center items-center gap-2 group"
            >
              {isLoading ? (
                <>Creating Account...</>
              ) : (
                <>Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </Button>
          </form>

          {/* Login Redirect */}
          <div className="mt-8 text-center bg-white/[0.02] py-4 rounded-xl border border-white/[0.05]">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:text-[#F5C542] font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ===== Right Side: Brand Section ===== */}
      <div className="hidden md:flex flex-1 relative bg-[#0F0D0A] items-center justify-center overflow-hidden border-l border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,197,66,0.08),transparent_50%)]"></div>
        <div className="relative z-10 text-center max-w-md px-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#F5C542] to-yellow-200 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(245,197,66,0.3)]">
            <span className="text-4xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Journey
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Join thousands of writers leveraging AI to create better content, faster.
          </p>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>
    </div>
  );
};

export default Signup;