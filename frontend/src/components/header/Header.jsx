import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthButton from "../AuthButton";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react"; // ✅ added 


function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);          // profile dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // ✅ mobile nav
  const dropdownRef = useRef(null);   // Dropdown refference
  const arrowDirectionRef = useRef();  // arrow refference 

  // DropDown user profile
  useEffect(() => {
    if (arrowDirectionRef.current) {
      arrowDirectionRef.current.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
      arrowDirectionRef.current.style.transition = "transform 0.3s ease";
    }
  }, [open]);

  /* ---------------- CLOSE DROPDOWNS ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      setMobileMenu(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  // Handle Login, redirect to /login route
  const handleLogin = () => {
    navigate("/login");
  };


  // Handle SignUp, redirect to /signup route
  const handleSignup = () => {
    navigate("/signup");
  };

  // Home route and checking for loggedIn User 
  const isHomed = location.pathname === "/";
  const isLoggedIn = !!user;

  const Navigations = [
    { name: "Discover", route: "/discover" },
    { name: "Write", route: "/create" },
    { name: "Learn", route: "/learn" },
    { name: "About", route: "/about" },
    { name: "Contact Us", route: "/contact-us" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full h-20 backdrop-blur-md bg-[#130F0B] border-b border-[#c9c1c15c] flex items-center justify-between px-6 lg:px-28">
      
      {/* LOGO */}
      <div className="text-2xl md:text-3xl font-bold text-white">
        <Link to="/">
          Write<span className="text-yellow-500">ora.</span>
        </Link>
      </div>

      {/* DESKTOP NAV */}
      {user && location.pathname !== "/" && (
        <nav className="hidden md:flex items-center gap-6">
          {Navigations.map((n) => {
            const isActive = location.pathname === n.route;
            return (
              <Link
                key={n.route}
                to={n.route}
                className={`text-lg transition ${
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

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        
        {/* MOBILE MENU BUTTON */}
        {user && location.pathname !== "/" && (
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-yellow-400"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}

        {/* AUTH / PROFILE */}
        {isHomed ? (
          <AuthButton handleLogin={handleLogin} handleSignup={handleSignup} />
        ) : isLoggedIn ? (
          <div ref={dropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-[#1C1813] border border-[#2A2520] px-3 py-2 rounded-xl"
            >
              <img
                src={user?.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-yellow-400 font-medium">
                {user?.name || "User"}
              </span>
              <ChevronDown  ref={arrowDirectionRef}/>
              <span>

              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1C1813] border border-[#2A2520] rounded-xl shadow-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-[#241F1A]">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-[#241F1A]">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-[#241F1A]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <AuthButton handleLogin={handleLogin} handleSignup={handleSignup} />
        )}
      </div>

      {/* MOBILE NAV MENU */}
      {mobileMenu && (
        <div className="absolute top-20 left-0 w-full bg-[#130F0B] border-t border-[#2A2520] md:hidden">
          <nav className="flex flex-col p-4 gap-3">
            {Navigations.map((n) => (
              <Link
                key={n.route}
                to={n.route}
                onClick={() => setMobileMenu(false)}
                className="text-gray-300 hover:text-yellow-400"
              >
                {n.name}
              </Link>
            ))}

            <Link
              to="/profile"
              onClick={() => setMobileMenu(false)}
              className="text-yellow-400"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenu(false)}
              className="text-yellow-400"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-red-500"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
