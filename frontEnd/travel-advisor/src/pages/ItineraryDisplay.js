import React, { useState, useEffect } from "react";
import axios from "axios"; // Use axios for data fetching (or you can use fetch)

// Sample itinerary data (used for local testing without MongoDB)
// const sampleItineraries = [
//     {
//         userName: "John Doe",
//         itinerary: [
//             {
//                 day: 1,
//                 activities: [
//                     {
//                         time: "Morning",
//                         location: "Wangfujing Snack Street",
//                         description:
//                             "Start your day at Wangfujing Snack Street, a bustling food market offering a wide range of local delicacies.",
//                         image: "https://via.placeholder.com/300?text=Wangfujing+Snack+Street"
//                     },
//                     {
//                         time: "Afternoon",
//                         location: "Forbidden City",
//                         description:
//                             "Explore the iconic Forbidden City, a UNESCO World Heritage site that showcases China’s imperial history.",
//                         image: "https://via.placeholder.com/300?text=Forbidden+City"
//                     },
//                     {
//                         time: "Evening",
//                         location: "Quanjude Roast Duck Restaurant",
//                         description:
//                             "Indulge in a traditional Peking Duck dinner at Quanjude, a renowned restaurant known for its authentic dishes.",
//                         image: "https://via.placeholder.com/300?text=Quanjude+Roast+Duck"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         userName: "Jane Smith",
//         itinerary: [
//             {
//                 day: 1,
//                 activities: [
//                     {
//                         time: "Morning",
//                         location: "Tiananmen Square",
//                         description:
//                             "Visit the historic Tiananmen Square, one of the largest public squares in the world.",
//                         image: "https://via.placeholder.com/300?text=Tiananmen+Square"
//                     },
//                     {
//                         time: "Afternoon",
//                         location: "Great Wall of China",
//                         description:
//                             "Explore the Great Wall of China, one of the most famous landmarks in the world.",
//                         image: "https://via.placeholder.com/300?text=Great+Wall+of+China"
//                     },
//                     {
//                         time: "Evening",
//                         location: "Peking Duck Restaurant",
//                         description:
//                             "Enjoy a delicious Peking Duck meal at one of Beijing's top-rated restaurants.",
//                         image: "https://via.placeholder.com/300?text=Peking+Duck"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         userName: "Alice Brown",
//         itinerary: [
//             {
//                 day: 1,
//                 activities: [
//                     {
//                         time: "Morning",
//                         location: "Summer Palace",
//                         description:
//                             "Take a peaceful stroll through the Summer Palace, an imperial garden and lake park.",
//                         image: "https://via.placeholder.com/300?text=Summer+Palace"
//                     },
//                     {
//                         time: "Afternoon",
//                         location: "Beihai Park",
//                         description:
//                             "Explore the beautiful Beihai Park, one of the oldest and most well-preserved imperial gardens in China.",
//                         image: "https://via.placeholder.com/300?text=Beihai+Park"
//                     },
//                     {
//                         time: "Evening",
//                         location: "Nanjing Road",
//                         description:
//                             "Conclude your day with a visit to Nanjing Road, a famous shopping street in Shanghai.",
//                         image: "https://via.placeholder.com/300?text=Nanjing+Road"
//                     }
//                 ]
//             }
//         ]
//     }
// ];

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
                                {/* <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-xs">
                                    Learn More
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const ItineraryDisplay = () => {

    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus !== "true") {
        window.location.href = "/login";
    }
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get("http://localhost:8000/trip/get-all", { withCredentials: true })
                    .then((res) => {
                        setItineraries(res.data);
                    })
                console.log(itineraries);
                setLoading(false);
            } catch (err) {
                setError("Error fetching itinerary data");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
