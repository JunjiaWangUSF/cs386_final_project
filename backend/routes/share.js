import express, { Router } from "express";
import axios from "axios";
import Itinerary from "../modules/itinerarySchema.js";
import { ensureAuthenticated } from "../middleware/middleware.js";
const router = express.Router();
router.post("/share", ensureAuthenticated, async (req, res) => {


    const itinerary = req.body;
    const date = new Date();

    try {
        const newItinerary = new Itinerary({ itinerary, date, userName: req.user.email });
        await newItinerary.save();
        res.status(200).json({ message: "Itinerary shared successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});

router.get("/get-all", ensureAuthenticated, async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ message: "An error occurred. Please try again later." });
    }
});

export default router;