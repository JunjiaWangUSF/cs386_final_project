import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { ensureAuthenticated } from "../middleware/middleware.js";
const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

router.post("/recommendation", async (req, res) => {
  const { destination, startDate, endDate, preferences } = req.body;

  // Generate a structured prompt requesting a JSON response
  const prompt = `Plan a detailed trip to ${destination} from ${startDate} to ${endDate}. 
My preferences are: ${preferences}. Provide a comprehensive itinerary in JSON format with the following structure:
{
  "destination": "", // The destination for the trip
  "startDate": "", // Start date of the trip
  "endDate": "", // End date of the trip
  "preferences": "", // User's travel preferences
  "itinerary": [ // An array of daily activities
    {
      "day": 1, // Day number
      "activities": [ // List of detailed activities for the day
        {
          "time": "", // Time of the activity (e.g., Morning, Afternoon, Evening)
          "location": "", // Location of the activity
          "description": "" // A brief description of the activity
        }
      ]
    }
  ]
}

Make sure each day's activities include:
- Morning, afternoon, and evening plans.
- Specific locations, landmarks, or events.
- Recommendations for meals (breakfast, lunch, and dinner) based on preferences.
- Notes on transportation or tips for exploring the area.

Plan the trip as if you are a local travel expert crafting a personalized experience.`;

  try {
    // Make a request to the OpenAI API
    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a travel advisor assistant. Respond only with a JSON object that matches the provided structure.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Step 1: Extract the raw response
    let responseText = openAIResponse.data.choices[0].message.content.trim();

    // Step 2: Clean the response (remove markdown delimiters if present)
    const codeBlockDelimiters = ["```json", "```", "```javascript", "```js"];
    codeBlockDelimiters.forEach((delimiter) => {
      if (responseText.startsWith(delimiter)) {
        responseText = responseText.slice(delimiter.length).trim();
      }
      if (responseText.endsWith("```")) {
        responseText = responseText.slice(0, -3).trim();
      }
    });

    // Step 3: Parse and Validate JSON

    let itineraryData;
    try {
      itineraryData = JSON.parse(responseText);


      itineraryData = itineraryData.itinerary;
      itineraryData.forEach((itinerary) => {

        itinerary.activities.forEach((activity) => {

        });
      });
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return res.status(500).send("Failed to parse travel recommendation.");
    }

    // Step 5: Return the Cleaned and Validated JSON
    res.status(200).json(itineraryData);
  } catch (error) {
    console.error("Error during recommendation request:", error);
    res
      .status(500)
      .send("An error occurred while fetching travel recommendations.");
  }
});

export default router;
