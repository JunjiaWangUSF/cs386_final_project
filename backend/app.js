import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import passport from "./config/auth.js";
import path from "path"; // Import path module to serve React
import cors from "cors";
import connectDB from "./modules/db.js";
import recommendation from "./routes/recommendation.js";
import share from "./routes/share.js";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME || "localhost";

// Connect to MongoDB
connectDB(true, () => {
  console.log("MongoDB connected successfully.");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Session management
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Serve React build folder
app.use(express.static(path.resolve(__dirname, "frontEnd/build")));


// Routes
app.use("/auth", auth);
app.use("/trip", recommendation);
app.use("/mytrip", share);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontEnd/build", "index.html"));
});
// Start server
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("SIGINT received. Closing MongoDB connection...");
  connectDB(false, () => {
    console.log("MongoDB connection closed. Exiting...");
    process.exit(0);
  });
});
