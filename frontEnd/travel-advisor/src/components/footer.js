// src/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-lg font-semibold mb-2">
          Explore the World with Us
        </h2>
        <p className="text-gray-400 mb-4">
          Your travel companion for weather, advice, and shared experiences.
        </p>

        {/* Copyright */}
        <p className="text-gray-400">
          © 2024 Travel Mate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
