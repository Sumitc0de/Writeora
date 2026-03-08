import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../components/Background";
import { Lock } from "lucide-react";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "admin123") { // Mock password
            localStorage.setItem("admin", "true");
            navigate("/admin/dashboard");
        } else {
            alert("Invalid password (hint: admin123)");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
            <Background />
            <div className="z-10 bg-[#1A1A1A] p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#F5C542]/10 p-4 rounded-full border border-[#F5C542]/20 text-[#F5C542]">
                        <Lock size={32} />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-1">Admin Access</h2>
                <p className="text-gray-500 text-center mb-8 text-sm">Restricted Area. Authorized Personnel Only.</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white mb-6 focus:border-[#F5C542] focus:outline-none transition-colors"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#F5C542] text-black font-bold py-3 rounded-lg hover:bg-[#F5C542]/90 transition-colors"
                    >
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
