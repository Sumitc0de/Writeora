import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";


const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", form);
  };

  return (
    <div className="min-h-screen flex bg-[#0E0C0A] text-gray-100">
      {/* ===== Left Side: Form ===== */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="bg-[#1A1713] w-full max-w-md p-8 rounded-2xl border border-[#2A2520] shadow-lg">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Create Account</h2>
          <p className="text-gray-400 mb-8 text-sm">
            Start sharing your insights and tutorials on Writeora 🚀
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Full Name</label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3">
                <User className="text-yellow-500 w-5 h-5" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Email</label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3">
                <Mail className="text-yellow-500 w-5 h-5" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <div className="flex items-center bg-[#0E0C0A] border border-[#2A2520] rounded-lg px-3">
                <Lock className="text-yellow-500 w-5 h-5" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none px-2 py-3 text-gray-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-yellow-600 to-yellow-400 text-black font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all"
            >
              Sign Up
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
          src=""
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
