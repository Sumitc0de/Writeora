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
        <span>Writeora</span>
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
          <div className="flex items-center gap-2">
            <button onClick={handleLogin} className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition">Log in</button>
            <button onClick={handleSignup} className="hidden sm:block px-2 sm:px-4 py-1.5 sm:py-2 bg-white text-black text-[11px] sm:text-sm font-semibold rounded-lg hover:bg-gray-200 transition shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap">Sign up</button>
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
        <div className="absolute top-[72px] left-0 w-full bg-[#050505]/98 backdrop-blur-xl border-b border-white/[0.1] md:hidden shadow-2xl animate-slideDown">
          <nav className="flex flex-col p-6 gap-2">
            {/* User Profile Header */}
            {user && (
              <div className="flex items-center gap-3 p-4 mb-2 bg-white/[0.03] border border-white/[0.05] rounded-xl">
                <img
                  src={user?.avatar.url || `https://ui-avatars.com/api/?name=${user?.name}&background=F5C542&color=000`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-[#F5C542]/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-white truncate">{user?.name || "User"}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              {Navigations.map((n) => {
                const isActive = location.pathname === n.route;
                return (
                  <Link
                    key={n.route}
                    to={n.route}
                    onClick={() => setMobileMenu(false)}
                    className={`flex items-center justify-between p-4 text-base font-medium rounded-xl transition-all ${isActive
                      ? "bg-[#F5C542] text-black"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                      }`}
                  >
                    <span>{n.name}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.1] my-3"></div>

            {/* Profile & Settings */}
            <div className="space-y-1">
              <Link
                to="/profile"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 p-4 text-base text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>My Profile</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 p-4 text-base text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </Link>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-4 text-left text-base text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition mt-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
