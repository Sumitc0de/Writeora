import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthButton from "../AuthButton";
import { useAuth } from "../../context/AuthContext";


function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // console.log(user)

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // ✅ Logout + redirect to landing page
  const handleLogout = async () => {
    try {
      await logout();      // Clears token + user
      setOpen(false);      // Close dropdown

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogin = async ()=>{
try{
  if(!user){
    navigate("/login");
  }else{
    navigate('/discover');
  }
}catch(err){
  console.error("LogIn failed:", err)
}
  }


  const isHomed = location.pathname === '/';
  const isLoggedIn = !!user;

  const Navigations = [
    { name: "Discover", route: "/discover" },
    { name: "Learn", route: "/learn" },
    { name: "About", route: "/about" },
    { name: "Contact Us", route: "/contact-us" },
  ];

  return (
    <header className="w-full z-50 fixed top-0 h-20 backdrop-blur-md bg-[#130F0B] flex items-center justify-between px-6 lg:px-28 transition-colors duration-300">
      {/* ✅ Logo */}
      <div className="text-4xl font-bold text-white">
        <Link to="/">
          Write<span className="text-yellow-500">ora.</span>
        </Link>
      </div>

      {/* ✅ Navigation Links (only visible when logged in) */}
      {user && location.pathname == '/discover' &&(
        <nav className="hidden md:flex items-center gap-6">
          {Navigations.map((n) => {
            const isActive = location.pathname === n.route;
            return (
              <Link
                key={n.route}
                to={n.route}
                className={`transition-colors text-lg duration-200 ${
                  isActive
                    ? "text-yellow-500 font-semibold"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                {n.name}
              </Link>
            );
          })}
        </nav>
      )}



      {/* ✅ Auth Section */}
<div className="flex items-center gap-4">
  {isHomed ? (
    // 🏠 Landing Page → Always show login & signup buttons
    <AuthButton handleLogin={handleLogin} navigate={navigate} />
  ) : isLoggedIn ? (
    // 👤 Not on home page → user logged in → show profile dropdown
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#1C1813] hover:bg-[#241F1A] 
          text-gray-100 border border-[#2A2520] px-3 py-2 rounded-xl transition-all"
      >
        <img
          src={
            user?.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgmNDDrkYKiQyONYsHR_3HM510JJNSrEkgEg&s"
          }
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-yellow-400">
          {user?.user?.name || "User"}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-yellow-400 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 w-48 bg-[#1C1813] border border-[#2A2520]
          text-gray-200 shadow-lg rounded-xl mt-2 z-50"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-[#241F1A] text-yellow-400 rounded-t-xl transition"
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-[#241F1A] text-yellow-400 transition"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-[#241F1A] rounded-b-xl transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    // ❌ Not on home page → user not logged in → show login & signup
    <AuthButton handleLogin={handleLogin} navigate={navigate} />
  )}
</div>

    </header>
  );
}

export default Header;
