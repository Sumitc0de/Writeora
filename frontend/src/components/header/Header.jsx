import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../Button'
import '../../../global.css';

function Header() {
  const location = useLocation()

  const Navigations = [
    { name: "Discover", route: "/" },
    { name: "Learn", route: "/learn" },
    { name: "About", route: "/about" },
    { name: "Contact Us", route: "/contact-us" }
  ]

  return (
    <header className="w-full z-50 fixed top-0 h-20 backdrop-blur-md bg-[#130F0B] flex items-center justify-between px-6 lg:px-28 transition-colors duration-300">
      {/* 🔹 Brand Logo */}
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        <Link to="/">Write<span className="text-yellow-600 dark:text-yellow-400">ora.</span></Link>
      </div>

      {/* 🔹 Navigation Links */}
      <nav className="flex items-center gap-6">
        {Navigations.map((n) => {
          const isActive = location.pathname === n.route
          return (
            <Link
              key={n.route}
              to={n.route}
              className={`transition-colors text-lg duration-200 ${
                isActive
                  ? "text-yellow-600 dark:text-yellow-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400"
              }`}
            >
              {n.name}
            </Link>
          )
        })}
      </nav>

      {/* 🔹 Auth Buttons (Commented for now) */}
      {/*
      <div className="flex items-center gap-4">
        <Button className="bg-transparent border text-gray-800 dark:text-gray-200 font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-all">
          Login
        </Button>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all">
          Start Here
        </Button>
      </div>
      */}

     {/* 🔹 Account Section */}
<div className="relative group">
  <button className="flex items-center gap-2 bg-[#1C1813] hover:bg-[#241F1A] text-gray-100 border border-[#2A2520] p-2 rounded-xl transition-all">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgmNDDrkYKiQyONYsHR_3HM510JJNSrEkgEg&s"
      alt="Profile"
      className="w-8 h-8 rounded-full"
    />
    <span className="font-medium text-[#F5C542]">Sumit</span>

    {/* Down Arrow Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-[#F5C542] transition-transform duration-300 group-hover:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {/* Dropdown */}
  <div className="absolute right-0 mt-2 w-48 bg-[#1C1813] border border-[#2A2520] text-gray-200 shadow-lg rounded-xl hidden group-hover:block transition-all duration-200">
    <Link
      to="/profile"
      className="block px-4 py-2 hover:bg-[#241F1A] text-[#F5C542] rounded-t-xl"
    >
      Profile
    </Link>
    <Link
      to="/settings"
      className="block px-4 py-2 hover:bg-[#241F1A] text-[#F5C542]"
    >
      Settings
    </Link>
    <Link
      to="/logout"
      className="block px-4 py-2 text-red-500 hover:bg-[#241F1A] rounded-b-xl"
    >
      Logout
    </Link>
  </div>
</div>

    </header>
  )
}

export default Header
