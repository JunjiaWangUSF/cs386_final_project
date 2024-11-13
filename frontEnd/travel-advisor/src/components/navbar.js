// src/Navbar.js
import React from "react";
import logo from "../assests/logo.jpg"; // Replace with your actual logo file path

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with text */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-4xl font-semibold">
            <a href="/">Travel Mate</a>
          </span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <a href="/" className="text-2xl hover:text-gray-400">
            Home
          </a>
          <a href="/trips" className="text-2xl hover:text-gray-400">
            Share experiences
          </a>
          <a href="/weather" className="text-2xl hover:text-gray-400">
            Next Stops
          </a>
        </div>

        {/* User Account */}
        <div>
          <a
            href="/login"
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
