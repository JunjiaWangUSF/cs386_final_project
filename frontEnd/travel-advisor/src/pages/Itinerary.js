import axios from "axios";
import React from "react";

const Itinerary = ({ data }) => {
  data = JSON.parse(data);
  if (!data || !Array.isArray(data)) {
    return <p>No itinerary data available.</p>;
  }
  const handleClick = () => {
    axios.post("http://localhost:8000/mytrip/share", data, { withCredentials: true });
    window.location.href = "/itinerary";
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 py-6">
          Your Itinerary
        </h1>
        <div className="space-y-6 px-6 pb-6">
          {data.map((day, index) => (
            <div key={index} className="border-t pt-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Day {day.day}
              </h2>
              <ul className="mt-4 space-y-4">
                {day.activities.map((activity, idx) => (
                  <li
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="font-bold">{activity.time}: </span>
                      {activity.location}
                    </p>
                    <p className="text-gray-600">{activity.description}</p>
                    {activity.recommendation && (
                      <p className="text-gray-500 italic mt-2">
                        <span className="font-semibold text-indigo-500">
                          Recommendation:
                        </span>{" "}
                        {activity.recommendation}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full bg-indigo-600 text-white py-4 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleClick}>Share your itinerary</button>
    </div>
  );
};

export default Itinerary;
