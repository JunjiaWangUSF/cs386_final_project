import React, { useState } from "react";
import axios from "axios";
import Itinerary from "./Itinerary";
import { data } from "react-router-dom";
const TravelAdvisorForm = () => {
  const loginStatus = localStorage.getItem("isLoggedIn");
  if (loginStatus !== "true") {
    window.location.href = "/login";
  }
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    preferences: "",
  });

  const [itineraryData, setItineraryData] = useState(null);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post(
        "http://localhost:8000/trip/recommendation",
        formData,
        { withCredentials: true }
      );

      if (res.status === 401) {
        alert("Please login first");
      } else {
        console.log(JSON.stringify(res.data));
        setItineraryData(JSON.stringify(res.data));
        console.log(itineraryData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center ">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Travel Advisor
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Destination */}
            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Paris, New York, Tokyo"
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Preferences */}
            <div>
              <label
                htmlFor="preferences"
                className="block text-sm font-medium text-gray-700"
              >
                Preferences
              </label>
              <textarea
                id="preferences"
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., nature, museums, food experiences"
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Get Recommendations
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center ">
        {itineraryData && <Itinerary data={itineraryData} />}
      </div>

    </>
  );
};

export default TravelAdvisorForm;
