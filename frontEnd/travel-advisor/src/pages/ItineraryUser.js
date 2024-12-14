import React, { useState, useEffect } from "react";
import axios from "axios";

const ItineraryUser = ({ userName, itinerary }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-center text-xl font-bold text-gray-800">{userName}'s Itinerary</h3>
            {itinerary.map((dayItinerary) => (
                <div key={dayItinerary.day} className="my-4">
                    <h4 className="text-lg font-semibold text-center text-blue-600 bg-gray-100 p-2 rounded">
                        Day {dayItinerary.day}
                    </h4>
                    {dayItinerary.activities.map((activity, index) => (
                        <div key={index} className="flex mb-4 items-center">
                            <div className="flex-1">
                                <h5 className="font-semibold text-gray-700">{activity.location}</h5>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
export default ItineraryUser;