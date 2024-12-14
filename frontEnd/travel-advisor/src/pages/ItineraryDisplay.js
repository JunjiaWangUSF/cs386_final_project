import React, { useState, useEffect } from "react";
import axios from "axios";

import ItineraryUser from "../pages/ItineraryUser";

const ItineraryDisplay = () => {
    // First, check if the user is logged in **before** using any hooks
    // const loginStatus = localStorage.getItem("isLoggedIn");

    // // If not logged in, redirect to login page.
    // if (loginStatus !== "true") {
    //     window.location.href = "/login";
    //     return null; // Stop rendering the component until the redirect occurs
    // }

    // Use hooks unconditionally, as we know the user is logged in.
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Correcting the useEffect to ensure async data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/mytrip/get-all", { withCredentials: true });

                console.log(response.data);
                console.log(JSON.stringify(response.data));
                //let data = JSON.parse(response.data);
                // Assuming the response data is already in the correct format (array)
                setItineraries(response.data); // Update state with fetched data
                setLoading(false); // Set loading state to false after data is loaded
            } catch (err) {
                setError("Error fetching itinerary data");
                setLoading(false); // Set loading state to false in case of an error
            }
        };

        fetchData(); // Invoke the async function to fetch data
    }, []); // Empty dependency array ensures this runs once after component mounts

    if (loading) return <div className="text-center mt-5">Loading itineraries...</div>;
    if (error) return <div className="text-center mt-5 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto my-4">
            <h2 className="text-center mb-6 text-2xl font-semibold">User Itineraries</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {itineraries.map((userItinerary, idx) => (
                    <div key={idx} className="col-span-1">
                        <ItineraryUser
                            userName={userItinerary.userName}
                            itinerary={userItinerary.itinerary}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItineraryDisplay;
