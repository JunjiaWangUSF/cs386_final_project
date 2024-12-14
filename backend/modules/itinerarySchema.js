import mongoose from 'mongoose';
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);
const itinerarySchema = new mongoose.Schema(
  {
    itinerary: { type: Array, required: true },
    date: { type: Date, required: true },
    userName: { type: String, required: true }
  },
  { _id: false }
);

itinerarySchema.plugin(AutoIncrement, { id: "itinerary_id_counter", inc_field: "_id" });

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;