import React from "react";

import background from "../images/background.jpg";
import paris from "../images/pairs.jpg";
import tokyo from "../images/tokyo.jpg";
import newyork from "../images/newyork.jpg";
const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Find the best places to visit, personalized travel advice, and real
            experiences from travelers like you.
          </p>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={paris} alt="Paris" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Paris, France</h3>
              <p className="text-gray-600">
                Explore the city of love with beautiful landmarks, art, and
                food.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={tokyo} alt="Tokyo" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Tokyo, Japan</h3>
              <p className="text-gray-600">
                Experience the vibrant culture, food, and nightlife of Tokyo.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={newyork}
              alt="New York"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">New York, USA</h3>
              <p className="text-gray-600">
                Discover the bustling cityscape and iconic sites of NYC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Experiences Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Recent Travel Experiences
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                "Amazing trip to Japan!"
              </h3>
              <p className="text-gray-600">
                "Tokyo was everything I dreamed of! The food, culture, and
                people made it an unforgettable experience."
              </p>
              <p className="text-gray-500 text-sm mt-2">Posted by Alex T.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">"Exploring Paris"</h3>
              <p className="text-gray-600">
                "Paris has a magic like no other. The architecture, the cafes,
                and the art made it feel like a dream!"
              </p>
              <p className="text-gray-500 text-sm mt-2">Posted by Jamie L.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
