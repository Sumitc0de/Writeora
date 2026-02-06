import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthButton from "../AuthButton";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // console.log(user)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      setMobileMenu(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const isHomed = location.pathname === "/";
  const isLoggedIn = !!user;

  const Navigations = [
    { name: "Discover", route: "/discover" },
    { name: "Write", route: "/create" },
    { name: "Learn", route: "/learn" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact-us" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full h-[72px] bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-6 lg:px-20 transition-all duration-300">

      {/* LOGO */}
      <div className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-white group cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-lg bg-[#F5C542] flex items-center justify-center text-black shadow-[0_0_15px_rgba(245,197,66,0.5)] group-hover:scale-105 transition-transform">
          <Sparkles size={18} fill="black" />
        </div>
        <span>Writeora<span className="text-[#F5C542]">.ai</span></span>
      </div>

      {/* DESKTOP NAV */}
      {user && location.pathname !== "/" && (
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] rounded-full border border-white/[0.05]">
          {Navigations.map((n) => {
            const isActive = location.pathname === n.route;
            return (
              <Link
                key={n.route}
                to={n.route}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-[#F5C542] text-black shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                {n.name}
              </Link>
            );
          })}
        </nav>
      )}

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* MOBILE MENU BUTTON */}
        {user && location.pathname !== "/" && (
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* AUTH / PROFILE */}
        {isHomed ? (
          <div className="flex items-center gap-3">
            <button onClick={handleLogin} className="text-sm font-medium text-gray-300 hover:text-white transition">Log in</button>
            <button onClick={handleSignup} className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]">Sign up</button>
          </div>
        ) : isLoggedIn ? (
          <div ref={dropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] pl-2 pr-4 py-1.5 rounded-full hover:bg-white/[0.08] transition-all"
            >
              <img
                src={user?.avatar.url || `https://ui-avatars.com/api/?name=${user?.name}&background=F5C542&color=000`}
                alt="Profile"
                className="w-8 h-8 rounded-full border bg-contain border-white/10"
              />
              <span className="text-sm font-medium text-gray-200 max-w-[100px] truncate">
                {user?.name || "User"}
              </span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1A1A1A] border border-white/[0.08] rounded-xl shadow-2xl backdrop-blur-md overflow-hidden animate-dropdown">
                <div className="p-2 border-b border-white/[0.05]">
                  <div className="text-xs text-gray-500 px-3 py-2 uppercase tracking-wider">Account</div>
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition">
                    Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition">
                    Settings
                  </Link>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <AuthButton handleLogin={handleLogin} handleSignup={handleSignup} />
        )}
      </div>

      {/* MOBILE NAV MENU */}
      {mobileMenu && (
        <div className="absolute top-[72px] left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.1] md:hidden shadow-2xl">
          <nav className="flex flex-col p-6 gap-2">
            {Navigations.map((n) => (
              <Link
                key={n.route}
                to={n.route}
                onClick={() => setMobileMenu(false)}
                className="p-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition"
              >
                {n.name}
              </Link>
            ))}
            <div className="h-px bg-white/[0.1] my-2"></div>
            <Link to="/profile" onClick={() => setMobileMenu(false)} className="p-4 text-lg text-gray-300 hover:text-white">Profile</Link>
            <button onClick={handleLogout} className="p-4 text-left text-lg text-red-500 hover:bg-red-500/10 rounded-xl">Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
