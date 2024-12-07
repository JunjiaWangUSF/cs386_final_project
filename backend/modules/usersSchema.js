import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema(
  {
    _id: Number,
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { _id: false }
);

userSchema.plugin(AutoIncrement, { id: "user_id_counter", inc_field: "_id" });

const User = mongoose.model("User", userSchema);

export default User;
