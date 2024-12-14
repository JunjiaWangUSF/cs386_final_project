import React, { useState, useEffect } from "react";
import logo from "../images/logo.jpg"; // Replace with your actual logo file path
import axios from "axios";
const Navbar = () => {
  // Track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on component mount
  useEffect(() => {
    // Check localStorage for "isLoggedIn" flag
    const userStatus = localStorage.getItem("isLoggedIn");
    if (userStatus === "true") {
      setIsLoggedIn(true); // If "isLoggedIn" is true, user is logged in
    }
  }, []);

  // Handle the logout action
  const handleLogout = () => {
    // Remove the "isLoggedIn" flag from localStorage
    localStorage.removeItem("isLoggedIn");

    try {
      // Send a POST request to the logout endpoint
      axios.post("http://localhost:8000/auth/logout", { withCredentials: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }


    setIsLoggedIn(false); // Update state to reflect logged out status
    window.location.href = "/";
  };

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
          <a href="/itinerary" className="text-2xl hover:text-gray-400">
            Share experiences
          </a>
          <a href="/travel-advisor" className="text-2xl hover:text-gray-400">
            Next Stops
          </a>
        </div>

        {/* User Account */}
        <div>
          {!isLoggedIn ? (
            <>
              <a
                href="/signup"
                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                Signup
              </a>
              <span className="mx-2"></span>
              <a
                href="/login"
                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
